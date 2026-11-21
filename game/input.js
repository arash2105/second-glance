// Second Glance: mouse, keyboard, magnifier, and crosshair.
// All positions are scene coordinates (0..640 by 0..480), shared by both panels.

export const crosshair = { panel: 'left', x: 320, y: 240 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Move the crosshair by (dx, dy) scene pixels and show it on its panel.
export function moveCrosshair(dx, dy) {
  crosshair.x = clamp(crosshair.x + dx, 0, 640);
  crosshair.y = clamp(crosshair.y + dy, 0, 480);
  placeCrosshair();
  return { panel: crosshair.panel, x: crosshair.x, y: crosshair.y };
}

export function setCrosshair(panel, x, y) {
  crosshair.panel = panel;
  crosshair.x = clamp(x, 0, 640);
  crosshair.y = clamp(y, 0, 480);
  placeCrosshair();
}

export function placeCrosshair() {
  for (const panel of ['left', 'right']) {
    const node = document.getElementById('crosshair-' + panel);
    if (!node) continue;
    const active = panel === crosshair.panel;
    node.style.display = active ? 'block' : 'none';
    node.style.left = (crosshair.x / 640 * 100) + '%';
    node.style.top = (crosshair.y / 480 * 100) + '%';
  }
}

// Check the crosshair position as a click. onCheck(panel, x, y) does the rest.
export function checkCrosshair(onCheck) {
  onCheck(crosshair.panel, crosshair.x, crosshair.y);
}

function scenePoint(svg, clientX, clientY) {
  const rect = svg.getBoundingClientRect();
  return {
    x: clamp((clientX - rect.left) / rect.width * 640, 0, 640),
    y: clamp((clientY - rect.top) / rect.height * 480, 0, 480),
  };
}

// Wire mouse input for both panels. callbacks: onPick(panel, x, y).
export function attachPanelInput(callbacks) {
  const leftSvg = document.getElementById('svg-left');
  const rightSvg = document.getElementById('svg-right');
  const pairs = [
    ['left', leftSvg, document.getElementById('panel-left')],
    ['right', rightSvg, document.getElementById('panel-right')],
  ];
  for (const [panel, svg, wrap] of pairs) {
    if (!svg || !wrap) continue;
    svg.addEventListener('pointermove', (event) => {
      const point = scenePoint(svg, event.clientX, event.clientY);
      setCrosshair(panel, point.x, point.y);
      showMagnifier(wrap, svg, event, point);
    });
    svg.addEventListener('pointerleave', () => {
      hideMagnifier();
    });
    svg.addEventListener('click', (event) => {
      const point = scenePoint(svg, event.clientX, event.clientY);
      setCrosshair(panel, point.x, point.y);
      callbacks.onPick(panel, point.x, point.y);
    });
  }
}

let magSvg = null;
let magPanel = null;

function showMagnifier(wrap, svg, event, point) {
  const lens = document.getElementById('magnifier');
  if (!lens) return;
  if (magPanel !== svg || !magSvg) {
    magPanel = svg;
    lens.innerHTML = '';
    magSvg = svg.cloneNode(true);
    magSvg.removeAttribute('id');
    magSvg.setAttribute('width', '1280');
    magSvg.setAttribute('height', '960');
    magSvg.style.position = 'absolute';
    magSvg.style.left = '0';
    magSvg.style.top = '0';
    lens.appendChild(magSvg);
  }
  // Centre the lens on the scene point at 2x zoom (lens is 140 px wide).
  magSvg.style.transform = 'translate(' + (-(point.x * 2 - 70)) + 'px,' + (-(point.y * 2 - 70)) + 'px)';
  lens.style.display = 'block';
  lens.style.left = (event.clientX - 70) + 'px';
  lens.style.top = (event.clientY - 70) + 'px';
}

export function hideMagnifier() {
  const lens = document.getElementById('magnifier');
  if (lens) lens.style.display = 'none';
  magSvg = null;
  magPanel = null;
}

// Wire keyboard input. callbacks: onMove(dx, dy), onCheck(), onTab(),
// onHint(), onRestart(), onNext(), onMute(), onLevel(n), onPause(), onHelp().
export function attachKeyboard(callbacks) {
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
      event.preventDefault();
      const step = event.shiftKey ? 2 : 8;
      if (key === 'ArrowLeft') callbacks.onMove(-step, 0);
      if (key === 'ArrowRight') callbacks.onMove(step, 0);
      if (key === 'ArrowUp') callbacks.onMove(0, -step);
      if (key === 'ArrowDown') callbacks.onMove(0, step);
      return;
    }
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      callbacks.onCheck();
      return;
    }
    if (key === 'Tab') {
      event.preventDefault();
      callbacks.onTab();
      return;
    }
    const lower = key.toLowerCase();
    if (lower === 'h') { callbacks.onHint(); return; }
    if (lower === 'r') { callbacks.onRestart(); return; }
    if (lower === 'n') { callbacks.onNext(); return; }
    if (lower === 'm') { callbacks.onMute(); return; }
    if (lower === 'p' || key === 'Escape') { callbacks.onPause(); return; }
    if (key === '?') { callbacks.onHelp(); return; }
    if (key >= '1' && key <= '4') { callbacks.onLevel(Number(key) - 1); }
  });
}
