// Second Glance: level flow.
// Wires the scene, the panels, the HUD, the input, and the sound together.

import { SCENES, SCENE_NAMES } from './scenes.js';
import { renderScene } from './render-scene.js';
import { findDifferenceAt, remainingCount, markFoundDifference, drawHintRing, drawMissMark } from './differences.js';
import { crosshair, moveCrosshair, setCrosshair, checkCrosshair, attachPanelInput, attachKeyboard, hideMagnifier } from './input.js';
import {
  updateCounter, updateScore, updateBest, setSceneTabs, updateFoundList,
  setHintButton, setNextEnabled, setSoundButton, hideOverlays,
  showStart, showLevelComplete, showTimeUp, showWin, showPause, showHelp,
  startLevelTimer, stopTimer, pauseTimer, resumeTimer, timeLeft,
} from './hud.js';
import { unlockAudio, setMuted, isMuted, playClick, playFound, playWrong, playHint, playWin } from './audio.js';

const LEVEL_SECONDS = 90;

let levelIndex = 0;
let found = new Set();
let foundLabels = [];
let score = 0;
let levelStartScore = 0;
let hintsLeft = 3;
let levelComplete = false;
let playing = false;
let paused = false;
let totalSecondsUsed = 0;
let best = 0;

try {
  best = Number(window.localStorage.getItem('second-glance-best') || 0) || 0;
} catch (e) {
  best = 0;
}

function scene() {
  return SCENES[levelIndex];
}

function leftSvg() {
  return document.getElementById('svg-left');
}

function rightSvg() {
  return document.getElementById('svg-right');
}

function saveBest() {
  if (score > best) {
    best = score;
    try {
      window.localStorage.setItem('second-glance-best', String(best));
    } catch (e) {
      // Storage is optional; the game works without it.
    }
  }
  updateBest(best);
}

function refreshHud() {
  updateCounter(remainingCount(scene(), found), found.size, 8);
  updateScore(score);
  updateFoundList(foundLabels);
  setHintButton(hintsLeft);
  setNextEnabled(levelComplete);
}

function loadLevel(index) {
  levelIndex = index;
  found = new Set();
  foundLabels = [];
  hintsLeft = 3;
  levelComplete = false;
  paused = false;
  levelStartScore = score;
  renderScene(leftSvg(), scene(), 'left');
  renderScene(rightSvg(), scene(), 'right');
  setCrosshair('left', 320, 240);
  hideMagnifier();
  setSceneTabs(SCENE_NAMES, levelIndex, (i) => jumpToLevel(i));
  refreshHud();
  hideOverlays();
  if (playing) {
    startLevelTimer(LEVEL_SECONDS, null, onTimeUp);
  }
}

function jumpToLevel(index) {
  if (!playing) return;
  score = levelStartScore;
  loadLevel(index);
}

function onTimeUp() {
  if (levelComplete || !playing) return;
  playing = false;
  showTimeUp(found.size);
}

function finishLevel() {
  levelComplete = true;
  const used = LEVEL_SECONDS - timeLeft();
  stopTimer();
  totalSecondsUsed += used;
  playWin();
  saveBest();
  refreshHud();
  if (levelIndex === SCENES.length - 1) {
    showWin(score, totalSecondsUsed);
  } else {
    showLevelComplete(scene().name, used, score, foundLabels);
  }
}

function pick(panel, x, y) {
  if (!playing || paused || levelComplete) return;
  unlockAudio();
  const diff = findDifferenceAt(scene(), x, y, found);
  if (diff) {
    found.add(diff.id);
    foundLabels.push(diff.label);
    markFoundDifference(leftSvg(), rightSvg(), diff, found.size);
    playFound();
    score += 100;
    refreshHud();
    if (remainingCount(scene(), found) === 0) finishLevel();
    return;
  }
  // Clicking an already found spot does nothing.
  for (const d of scene().differences) {
    if (found.has(d.id) && Math.hypot(x - d.x, y - d.y) <= d.radius) return;
  }
  const mark = drawMissMark(panel === 'left' ? leftSvg() : rightSvg(), x, y);
  playWrong();
  score = Math.max(0, score - 25);
  updateScore(score);
  if (mark) setTimeout(() => mark.remove(), 600);
}

export function useHint() {
  if (!playing || paused || levelComplete) return;
  if (hintsLeft <= 0) return;
  const next = scene().differences.find((d) => !found.has(d.id));
  if (!next) return;
  unlockAudio();
  hintsLeft -= 1;
  score = Math.max(0, score - 50);
  const rings = drawHintRing(leftSvg(), rightSvg(), next);
  playHint();
  refreshHud();
  setTimeout(() => {
    for (const ring of rings) ring.remove();
  }, 3000);
}

function restartLevel() {
  if (!playing) return;
  score = levelStartScore;
  loadLevel(levelIndex);
}

function nextLevel() {
  if (!levelComplete) return;
  if (levelIndex < SCENES.length - 1) {
    loadLevel(levelIndex + 1);
  }
}

function togglePause() {
  if (!playing || levelComplete) return;
  if (paused) {
    paused = false;
    resumeTimer();
    hideOverlays();
  } else {
    paused = true;
    pauseTimer();
    showPause();
  }
}

function toggleMute() {
  setMuted(!isMuted());
  setSoundButton(isMuted());
}

function startGame() {
  unlockAudio();
  playClick();
  score = 0;
  totalSecondsUsed = 0;
  playing = true;
  loadLevel(0);
}

function bind(id, fn) {
  const node = document.getElementById(id);
  if (node) node.addEventListener('click', fn);
}

function init() {
  updateBest(best);
  setSoundButton(false);
  renderScene(leftSvg(), scene(), 'left');
  renderScene(rightSvg(), scene(), 'right');
  setSceneTabs(SCENE_NAMES, 0, (i) => jumpToLevel(i));
  updateCounter(8, 0, 8);
  updateScore(0);
  updateFoundList([]);
  setHintButton(3);
  setNextEnabled(false);
  showStart();

  attachPanelInput({ onPick: pick });
  attachKeyboard({
    onMove: (dx, dy) => { if (playing && !paused) moveCrosshair(dx, dy); },
    onCheck: () => { if (playing && !paused) checkCrosshair((panel, x, y) => pick(panel, x, y)); },
    onTab: () => {
      if (!playing) return;
      setCrosshair(crosshair.panel === 'left' ? 'right' : 'left', crosshair.x, crosshair.y);
    },
    onHint: () => useHint(),
    onRestart: () => restartLevel(),
    onNext: () => nextLevel(),
    onMute: () => toggleMute(),
    onLevel: (n) => jumpToLevel(n),
    onPause: () => togglePause(),
    onHelp: () => {
      if (playing && !paused) { paused = true; pauseTimer(); }
      showHelp();
    },
  });

  bind('start-btn', startGame);
  bind('hint-btn', () => useHint());
  bind('restart-btn', () => restartLevel());
  bind('next-btn', () => nextLevel());
  bind('help-btn', () => {
    if (playing && !paused) { paused = true; pauseTimer(); }
    showHelp();
  });
  bind('sound-btn', () => toggleMute());
  bind('complete-next', () => nextLevel());
  bind('complete-again', () => restartLevel());
  bind('retry-btn', () => { playing = true; restartLevel(); });
  bind('resume-btn', () => togglePause());
  bind('win-again-btn', () => startGame());
  bind('help-close-btn', () => {
    hideOverlays();
    if (playing && paused) { paused = false; resumeTimer(); }
  });
}

init();
