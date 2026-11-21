// Second Glance: sound with WebAudio oscillators only.
// No audio files, no network. Audio starts only after the first user
// gesture. The game plays silently when WebAudio is unavailable.

let ctx = null;
let muted = false;

function audioCtx() {
  if (ctx) return ctx;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  } catch (e) {
    ctx = null;
  }
  return ctx;
}

function tone(freq, startIn, dur, type, vol) {
  if (muted) return;
  const ac = audioCtx();
  if (!ac) return;
  try {
    if (ac.state === 'suspended') ac.resume();
    const t0 = ac.currentTime + startIn;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  } catch (e) {
    // Sound is never required for play.
  }
}

export function unlockAudio() {
  audioCtx();
}

export function setMuted(value) {
  muted = value;
  return muted;
}

export function isMuted() {
  return muted;
}

export function playClick() {
  tone(600, 0, 0.08, 'sine', 0.15);
}

export function playFound() {
  tone(880, 0, 0.15, 'sine', 0.2);
  tone(1320, 0.1, 0.2, 'sine', 0.2);
}

export function playWrong() {
  tone(150, 0, 0.2, 'triangle', 0.25);
}

export function playHint() {
  tone(440, 0, 0.25, 'sine', 0.15);
}

export function playWin() {
  tone(523, 0, 0.15, 'sine', 0.2);
  tone(659, 0.12, 0.15, 'sine', 0.2);
  tone(784, 0.24, 0.15, 'sine', 0.2);
  tone(1046, 0.36, 0.3, 'sine', 0.2);
}
