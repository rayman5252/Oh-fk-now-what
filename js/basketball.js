// ==========================================================================
// Oh F*ck, Now What? -- "Can you score on the Big Girl?" mini game
// ==========================================================================

document.addEventListener('DOMContentLoaded', initBballGame);

function initBballGame() {
  const court = document.getElementById('bballCourt');
  const defender = document.getElementById('bballDefender');
  const ball = document.getElementById('bballBall');
  const shootBtn = document.getElementById('bballShootBtn');
  const restartBtn = document.getElementById('bballRestartBtn');
  const scoreEl = document.getElementById('bballScore');
  const highEl = document.getElementById('bballHigh');
  const overlay = document.getElementById('bballOverlay');

  if (!court || !defender || !ball || !shootBtn || !overlay) return;

  const HIGH_SCORE_KEY = 'ofknw-bball-high-score';
  let score = 0;
  let highScore = 0;
  try {
    highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY), 10) || 0;
  } catch (e) {
    highScore = 0;
  }
  if (highEl) highEl.textContent = String(highScore);

  let minX = 0;
  let maxX = 0;
  let posX = 0;
  let direction = 1;
  let speed = 90;
  let lastFrame = null;
  let shooting = false;
  let gameOver = false;

  function measure() {
    const courtWidth = court.clientWidth;
    const defenderWidth = defender.offsetWidth || 92;
    minX = 0;
    maxX = Math.max(0, courtWidth - defenderWidth);
    if (posX > maxX) posX = maxX;
  }

  function frame(now) {
    if (lastFrame === null) lastFrame = now;
    const dt = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;

    if (!gameOver) {
      posX += direction * speed * dt;
      if (posX <= minX) { posX = minX; direction = 1; }
      if (posX >= maxX) { posX = maxX; direction = -1; }
      defender.style.transform = 'translateX(' + posX.toFixed(1) + 'px)';
    }
    requestAnimationFrame(frame);
  }

  function resetBall() {
    ball.style.transition = 'none';
    ball.style.transform = 'translate(-50%, 0)';
    void ball.offsetHeight;
    ball.style.transition = '';
  }

  function shoot() {
    if (shooting || gameOver) return;
    shooting = true;
    shootBtn.disabled = true;

    const riseMs = 260;
    ball.style.transition = 'transform ' + riseMs + 'ms cubic-bezier(0.3, 0.6, 0.4, 1)';
    ball.style.transform = 'translate(-50%, -118px)';

    window.setTimeout(function () {
      const ballRect = ball.getBoundingClientRect();
      const defRect = defender.getBoundingClientRect();

      const handLeft = defRect.left;
      const handRight = defRect.left + defRect.width * 0.45;
      const handTop = defRect.top;
      const handBottom = defRect.top + defRect.height * 0.45;

      const ballX = ballRect.left + ballRect.width / 2;
      const ballY = ballRect.top + ballRect.height / 2;

      const blocked = ballX >= handLeft && ballX <= handRight && ballY >= handTop && ballY <= handBottom;

      if (blocked) {
        endGame();
      } else {
const finishMs = 220;
ball.style.transition = 'transform ' + finishMs + 'ms ease-out';
ball.style.transform = 'translate(-50%, -165px)';

window.setTimeout(function () {
        score += 1;
        if (scoreEl) scoreEl.textContent = String(score);
        if (score > highScore) {
          highScore = score;
          if (highEl) highEl.textContent = String(highScore);
          try { localStorage.setItem(HIGH_SCORE_KEY, String(highScore)); } catch (e) {}
        }
        speed = Math.min(speed + 8, 260);
        shooting = false;
        shootBtn.disabled = false;
        resetBall();
      }, finishMs);
}
    }, riseMs);
  }

  function endGame() {
    gameOver = true;
    shooting = false;
    shootBtn.disabled = true;
    court.classList.add('is-blocked');
    window.setTimeout(function () { court.classList.remove('is-blocked'); }, 450);
    overlay.hidden = false;
  }

  function restart() {
    score = 0;
    if (scoreEl) scoreEl.textContent = '0';
    speed = 90;
    direction = 1;
    posX = 0;
    gameOver = false;
    shooting = false;
    overlay.hidden = true;
    shootBtn.disabled = false;
    resetBall();
    defender.style.transform = 'translateX(0px)';
  }

  shootBtn.addEventListener('click', shoot);
  if (restartBtn) restartBtn.addEventListener('click', restart);
  window.addEventListener('resize', measure);

  measure();
  requestAnimationFrame(frame);
}
// ==========================================================================
// Oh F*ck, Now What? -- "Can you score on the Big Girl?" mini game
// ==========================================================================

document.addEventListener('DOMContentLoaded', initBballGame);

function initBballGame() {
  const court = document.getElementById('bballCourt');
  const defender = document.getElementById('bballDefender');
  const ball = document.getElementById('bballBall');
  const shootBtn = document.getElementById('bballShootBtn');
  const restartBtn = document.getElementById('bballRestartBtn');
  const scoreEl = document.getElementById('bballScore');
  const highEl = document.getElementById('bballHigh');
  const overlay = document.getElementById('bballOverlay');

  if (!court || !defender || !ball || !shootBtn || !overlay) return;

  const HIGH_SCORE_KEY = 'ofknw-bball-high-score';
  let score = 0;
  let highScore = 0;
  try {
    highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY), 10) || 0;
  } catch (e) {
    highScore = 0;
  }
  if (highEl) highEl.textContent = String(highScore);

  let minX = 0;
  let maxX = 0;
  let posX = 0;
  let direction = 1;
  let speed = 90;
  let lastFrame = null;
  let shooting = false;
  let gameOver = false;

  function measure() {
    const courtWidth = court.clientWidth;
    const defenderWidth = defender.offsetWidth || 92;
    minX = 0;
    maxX = Math.max(0, courtWidth - defenderWidth);
    if (posX > maxX) posX = maxX;
  }

  function frame(now) {
    if (lastFrame === null) lastFrame = now;
    const dt = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;

    if (!gameOver) {
      posX += direction * speed * dt;
      if (posX <= minX) { posX = minX; direction = 1; }
      if (posX >= maxX) { posX = maxX; direction = -1; }
      defender.style.transform = 'translateX(' + posX.toFixed(1) + 'px)';
    }
    requestAnimationFrame(frame);
  }

  function resetBall() {
    ball.style.transition = 'none';
    ball.style.transform = 'translate(-50%, 0)';
    void ball.offsetHeight;
    ball.style.transition = '';
  }

  function shoot() {
    if (shooting || gameOver) return;
    shooting = true;
    shootBtn.disabled = true;

    const travelMs = 480;
    ball.style.transition = 'transform ' + travelMs + 'ms cubic-bezier(0.22, 0.61, 0.36, 1)';
    ball.style.transform = 'translate(-50%, -118px)';

    window.setTimeout(function () {
      const ballRect = ball.getBoundingClientRect();
      const defRect = defender.getBoundingClientRect();

      const handLeft = defRect.left;
      const handRight = defRect.left + defRect.width * 0.45;
      const handTop = defRect.top;
      const handBottom = defRect.top + defRect.height * 0.45;

      const ballX = ballRect.left + ballRect.width / 2;
      const ballY = ballRect.top + ballRect.height / 2;

      const blocked = ballX >= handLeft && ballX <= handRight && ballY >= handTop && ballY <= handBottom;

      if (blocked) {
        endGame();
      } else {
        score += 1;
        if (scoreEl) scoreEl.textContent = String(score);
        if (score > highScore) {
          highScore = score;
          if (highEl) highEl.textContent = String(highScore);
          try { localStorage.setItem(HIGH_SCORE_KEY, String(highScore)); } catch (e) {}
        }
        speed = Math.min(speed + 8, 260);
        shooting = false;
        shootBtn.disabled = false;
        resetBall();
      }
    }, travelMs);
  }

  function endGame() {
    gameOver = true;
    shooting = false;
    shootBtn.disabled = true;
    court.classList.add('is-blocked');
    window.setTimeout(function () { court.classList.remove('is-blocked'); }, 450);
    overlay.hidden = false;
  }

  function restart() {
    score = 0;
    if (scoreEl) scoreEl.textContent = '0';
    speed = 90;
    direction = 1;
    posX = 0;
    gameOver = false;
    shooting = false;
    overlay.hidden = true;
    shootBtn.disabled = false;
    resetBall();
    defender.style.transform = 'translateX(0px)';
  }

  shootBtn.addEventListener('click', shoot);
  if (restartBtn) restartBtn.addEventListener('click', restart);
  window.addEventListener('resize', measure);

  measure();
  requestAnimationFrame(frame);
}
