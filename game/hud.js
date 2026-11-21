// Second Glance: counter, timer, score, scene tabs, and overlays.
// This module only touches the DOM. Game flow lives in game.js.

let timerId = null;
let timerLeft = 0;
let timerPaused = false;
let timerOnTick = null;
let timerOnTimeUp = null;

function el(id) {
  return document.getElementById(id);
}

export function updateCounter(remaining, foundCount, total) {
  const counter = el('counter');
  if (counter) counter.textContent = remaining + ' LEFT';
  const dots = el('dots');
  if (dots) {
    dots.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i < foundCount ? ' filled' : '');
      dots.appendChild(dot);
    }
  }
}

export function updateScore(score) {
  const node = el('score');
  if (node) node.textContent = 'Score ' + score;
}

export function updateBest(score) {
  const node = el('best-score');
  if (node) node.textContent = 'Best ' + score;
}

export function updateTimer(seconds) {
  const node = el('timer');
  if (!node) return;
  node.textContent = 'Time ' + Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
  node.classList.toggle('low', seconds <= 30);
}

function tickTimer() {
  if (timerPaused) return;
  timerLeft -= 1;
  updateTimer(timerLeft);
  if (timerOnTick) timerOnTick(timerLeft);
  if (timerLeft <= 0) {
    stopTimer();
    if (timerOnTimeUp) timerOnTimeUp();
  }
}

// Start a countdown for one level. onTick runs each second, onTimeUp at zero.
export function startLevelTimer(seconds, onTick, onTimeUp) {
  stopTimer();
  timerLeft = seconds;
  timerPaused = false;
  timerOnTick = onTick;
  timerOnTimeUp = onTimeUp;
  updateTimer(timerLeft);
  timerId = setInterval(tickTimer, 1000);
  return timerLeft;
}

export function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

export function pauseTimer() {
  timerPaused = true;
}

export function resumeTimer() {
  timerPaused = false;
}

export function timerRunning() {
  return timerId !== null;
}

export function timeLeft() {
  return timerLeft;
}

export function setSceneTabs(names, currentIndex, onSelect) {
  const tabs = el('scene-tabs');
  if (!tabs) return;
  tabs.innerHTML = '';
  names.forEach((name, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tab' + (i === currentIndex ? ' active' : '');
    btn.textContent = (i + 1) + '. ' + name;
    btn.addEventListener('click', () => onSelect(i));
    tabs.appendChild(btn);
  });
  const label = el('level-label');
  if (label) label.textContent = 'Level ' + (currentIndex + 1) + ' / ' + names.length;
  const sceneName = el('scene-name');
  if (sceneName) sceneName.textContent = names[currentIndex];
}

export function updateFoundList(labels) {
  const list = el('found-list');
  if (!list) return;
  list.innerHTML = '';
  for (const label of labels) {
    const chip = document.createElement('span');
    chip.className = 'found-chip';
    chip.textContent = label;
    list.appendChild(chip);
  }
  if (labels.length === 0) {
    const none = document.createElement('span');
    none.className = 'found-none';
    none.textContent = 'No differences found yet.';
    list.appendChild(none);
  }
}

export function setHintButton(left) {
  const btn = el('hint-btn');
  if (btn) {
    btn.textContent = 'Hint (' + left + ' left)';
    btn.disabled = left <= 0;
  }
}

export function setNextEnabled(enabled) {
  const btn = el('next-btn');
  if (btn) btn.disabled = !enabled;
}

export function setSoundButton(muted) {
  const btn = el('sound-btn');
  if (btn) btn.textContent = muted ? 'Sound off' : 'Sound on';
}

export function hideOverlays() {
  for (const overlay of document.querySelectorAll('.overlay')) {
    overlay.classList.add('hidden');
  }
}

export function showOverlay(id) {
  hideOverlays();
  const node = el(id);
  if (node) node.classList.remove('hidden');
}

export function showStart() {
  showOverlay('overlay-start');
}

export function showLevelComplete(sceneName, secondsUsed, score, labels) {
  const title = el('complete-title');
  if (title) title.textContent = sceneName + ' complete!';
  const stats = el('complete-stats');
  if (stats) stats.textContent = 'Time ' + secondsUsed + 's  |  Score ' + score;
  const list = el('complete-labels');
  if (list) list.textContent = labels.join('  |  ');
  showOverlay('overlay-complete');
}

export function showTimeUp(foundCount) {
  const text = el('timeup-text');
  if (text) text.textContent = 'Time up - you found ' + foundCount + ' of 8';
  showOverlay('overlay-timeup');
}

export function showWin(totalScore, totalSeconds) {
  const stats = el('win-stats');
  if (stats) {
    stats.textContent = 'You found all 32 differences!  Total score ' + totalScore + '  |  Total time ' + totalSeconds + 's';
  }
  showOverlay('overlay-win');
}

export function showPause() {
  showOverlay('overlay-pause');
}

export function showHelp() {
  showOverlay('overlay-help');
}
