// ==========================================================================
// Oh F*ck, Now What? -- "Can you score on the Big Girl?" mini game
// ==========================================================================
//
// Pixel model: the stage, hoop, defender and ball are all fixed-size (not
// fluid), and every coordinate below was measured directly off the source
// images (rim position, hand position) so the shot lines up with the art
// and the block hotspot lines up with the actual hand in the photo.

document.addEventListener('DOMContentLoaded', initBballGame);

function initBballGame() {
  const stage = document.getElementById('bballStage');
  const defender = document.getElementById('bballDefender');
  const ball = document.getElementById('bballBall');
  const shootBtn = document.getElementById('bballShootBtn');
  const restartBtn = document.getElementById('bballRestartBtn');
  const scoreEl = document.getElementById('bballScore');
  const highEl = document.getElementById('bballHigh');
  const overlay = document.getElementById('bballOverlay');
  const callout = document.getElementById('bballCallout');

  if (!stage || !defender || !ball || !shootBtn || !overlay) return;

  const HIGH_SCORE_KEY = 'ofknw-bball-high-score';

  const STAGE_WIDTH = 230;
  const DEFENDER_WIDTH = 100;
  const HAND_LEFT = 2;
  const HAND_RIGHT = 36;
  const BALL_TARGET_X = 134;
  const BALL_HALF_WIDTH = 15;
  const RISE_DISTANCE = 155;
  const MAX_X = STAGE_WIDTH - DEFENDER_WIDTH;

  let score = 0;
  let highScore = 0;
  try {
    highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY), 10) || 0;
  } catch (e) {
    highScore = 0;
  }
  if (highEl) highEl.textContent = String(highScore);

  let posX = 0;
  let direction = 1;
  let speed = 70;
  let lastFrame = null;
  let shooting = false;
  let gameOver = false;
  let rafId = null;

  function frame(now) {
    if (lastFrame === null) lastFrame = now;
    const dt = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;

    if (!gameOver) {
      posX += direction * speed * dt;
      if (posX <= 0) { posX = 0; direction = 1; }
      if (posX >= MAX_X) { posX = MAX_X; direction = -1; }
      defender.style.transform = 'translateX(' + posX.toFixed(1) + 'px)';
    }
    rafId = requestAnimationFrame(frame);
  }

  function resetBall() {
    ball.style.transition = 'none';
    ball.style.transform = 'translate(-50%, 0)';
    void ball.offsetHeight;
    ball.style.transition = '';
  }

  function showCallout(text, color) {
    if (!callout) return;
    callout.textContent = text;
    callout.style.color = color;
    callout.classList.remove('show');
    void callout.offsetWidth;
    callout.classList.add('show');
  }

  function isBlocked() {
    const handLeft = posX + HAND_LEFT;
    const handRight = posX + HAND_RIGHT;
    const ballLeft = BALL_TARGET_X - BALL_HALF_WIDTH;
    const ballRight = BALL_TARGET_X + BALL_HALF_WIDTH;
    return handLeft <= ballRight && handRight >= ballLeft;
  }

  function shoot() {
    if (shooting || gameOver) return;
    shooting = true;
    shootBtn.disabled = true;

    const blocked = isBlocked();
    const travelMs = 420;

    ball.style.transition = 'transform ' + travelMs + 'ms cubic-bezier(0.22, 0.61, 0.36, 1)';
    ball.style.transform = 'translate(-50%, -' + (blocked ? Math.round(RISE_DISTANCE * 0.55) : RISE_DISTANCE) + 'px)';

    window.setTimeout(function () {
      if (blocked) {
        showCallout('BLOCKED!', '#E9C450');
        const handCenter = posX + (HAND_LEFT + HAND_RIGHT) / 2;
        const knockX = handCenter < BALL_TARGET_X ? 46 : -46;
        ball.style.transition = 'transform 380ms ease-in';
        ball.style.transform = 'translate(calc(-50% + ' + knockX + 'px), 44px)';
        endGame();
      } else {
        showCallout('SWISH!', '#2ECC71');
        score += 1;
        if (scoreEl) scoreEl.textContent = String(score);
        if (score > highScore) {
          highScore = score;
          if (highEl) highEl.textContent = String(highScore);
          try { localStorage.setItem(HIGH_SCORE_KEY, String(highScore)); } catch (e) {}
        }
        speed = Math.min(speed + 6, 220);
        shooting = false;
        shootBtn.disabled = false;
        window.setTimeout(resetBall, 260);
      }
    }, travelMs);
  }

  function endGame() {
    gameOver = true;
    shooting = false;
    shootBtn.disabled = true;
    window.setTimeout(function () {
      stage.classList.add('is-blocked');
      window.setTimeout(function () { stage.classList.remove('is-blocked'); }, 450);
    }, 380);
    window.setTimeout(function () { overlay.hidden = false; }, 760);
  }

  function restart() {
    score = 0;
    if (scoreEl) scoreEl.textContent = '0';
    speed = 70;
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

  rafId = requestAnimationFrame(frame);
}
