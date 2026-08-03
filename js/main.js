// ==========================================================================
// Oh F*ck, Now What? — site behavior
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initYear();
    renderVideos();
    initLightbox();
    initReveal();
    initCounters();
});

/* Mobile nav toggle -------------------------------------------------------- */
function initNav() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(link =>
          link.addEventListener('click', () => nav.classList.remove('open'))
                                        );
}

/* Footer year --------------------------------------------------------------*/
function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

/* Extract a YouTube video ID from any common URL format --------------------*/
function getYouTubeId(url) {
    try {
          const u = new URL(url);
          if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
          if (u.searchParams.has('v')) return u.searchParams.get('v');
          const parts = u.pathname.split('/');
          const embedIdx = parts.indexOf('embed');
          if (embedIdx !== -1 && parts[embedIdx + 1]) return parts[embedIdx + 1];
    } catch (e) {
          return null;
    }
    return null;
}

/* Build a Vimeo embed URL (id + optional private hash) from a vimeo.com link */
function getVimeoEmbed(url) {
    try {
          const u = new URL(url);
          if (!u.hostname.includes('vimeo.com')) return null;
          const parts = u.pathname.split('/').filter(Boolean);
          const id = parts[0];
          const hash = parts[1];
          if (!id) return null;
          return hash ? ('https://player.vimeo.com/video/' + id + '?h=' + hash) : ('https://player.vimeo.com/video/' + id);
    } catch (e) {
          return null;
    }
}

/* Render the video grid from js/videos.js -----------------------------------*/
function renderVideos() {
    const grid = document.getElementById('videoGrid');
    if (!grid) return;

  const videos = (typeof VIDEOS !== 'undefined') ? VIDEOS : [];

  if (!videos.length) {
        grid.innerHTML = '<div class="video-placeholder"><strong>New episodes are on the way</strong><p>Add your YouTube or Vimeo links in <code>js/videos.js</code> and they will show up here automatically.</p></div>';
        return;
  }

  grid.innerHTML = videos.map(v => {
        const ytId = getYouTubeId(v.url);
        const vimeoEmbed = !ytId ? getVimeoEmbed(v.url) : null;

                                  let embed;
        if (ytId) {
                embed = '<iframe src="https://www.youtube.com/embed/' + ytId + '" title="' + escapeHtml(v.title || 'Episode') + '" frameborder="0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        } else if (vimeoEmbed) {
                embed = '<iframe src="' + vimeoEmbed + '" title="' + escapeHtml(v.title || 'Episode') + '" frameborder="0" loading="lazy" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" allowfullscreen></iframe>';
        } else {
                embed = '<a href="' + v.url + '" target="_blank" rel="noopener">Watch Episode</a>';
        }

                                  const desc = v.description ? ('<p>' + escapeHtml(v.description) + '</p>') : '';

                                  return '<div class="video-card"><div class="video-thumb">' + embed + '</div><div class="video-info"><h3>' + escapeHtml(v.title || 'Untitled episode') + '</h3>' + desc + '</div></div>';
  }).join('');
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/* Simple photo lightbox ------------------------------------------------------*/
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.gallery-item').forEach(btn => {
        btn.addEventListener('click', () => {
                lightboxImg.src = btn.getAttribute('data-full');
                lightboxImg.alt = btn.querySelector('img')?.alt || '';
                lightbox.classList.add('open');
        });
  });

  const close = () => { lightbox.classList.remove('open'); lightboxImg.src = ''; };
    closeBtn?.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}


/* Scroll-reveal for key sections as they enter the viewport ----------------*/
function initReveal() {
    const targets = document.querySelectorAll('.about-media, .about-copy, .podcast-copy, .podcast-media, #videoGrid, .gallery-grid, .follow-inner, .reveal-stagger');
    if (!targets.length) return;

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || prefersReduced) {
        targets.forEach(el => el.classList.add('is-visible'));
        return;
    }

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

targets.forEach(el => observer.observe(el));
}

/* Animated count-up numbers in the stats strip ------------------------------*/
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setFinal = (el) => {
    const target = el.getAttribute('data-count');
    const suffix = el.getAttribute('data-suffix') || '';
    el.textContent = target + suffix;
};

if (!('IntersectionObserver' in window) || prefersReduced) {
    counters.forEach(setFinal);
    return;
}

const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(el => observer.observe(el));
}
