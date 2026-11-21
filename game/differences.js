// Second Glance: hit testing, found set, and markers.
// Scene coordinates are 0..640 by 0..480 and are the same for both panels.

// Find the unfound difference at scene point (x, y), or null.
export function findDifferenceAt(scene, x, y, found) {
  for (const d of scene.differences) {
    if (found.has(d.id)) continue;
    const dist = Math.hypot(x - d.x, y - d.y);
    if (dist <= d.radius) return d;
  }
  return null;
}

// How many differences are still hidden in this scene.
export function remainingCount(scene, found) {
  let n = 0;
  for (const d of scene.differences) {
    if (!found.has(d.id)) n++;
  }
  return n;
}

// Draw a numbered marker on BOTH panels for one found difference.
// The marker is a thick green circle with a white outline and the find's number.
export function markFoundDifference(leftSvg, rightSvg, diff, number) {
  for (const svg of [leftSvg, rightSvg]) {
    const layer = svg.querySelector('.markers');
    if (!layer) continue;
    const ns = svg.namespaceURI;
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', diff.x);
    circle.setAttribute('cy', diff.y);
    circle.setAttribute('r', diff.radius);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', '#ffffff');
    circle.setAttribute('stroke-width', '7');
    layer.appendChild(circle);
    const inner = document.createElementNS(ns, 'circle');
    inner.setAttribute('cx', diff.x);
    inner.setAttribute('cy', diff.y);
    inner.setAttribute('r', diff.radius - 3);
    inner.setAttribute('fill', 'none');
    inner.setAttribute('stroke', '#2a9d8f');
    inner.setAttribute('stroke-width', '4');
    layer.appendChild(inner);
    const label = document.createElementNS(ns, 'text');
    label.setAttribute('x', diff.x);
    label.setAttribute('y', diff.y + 7);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-family', 'Arial, Helvetica, sans-serif');
    label.setAttribute('font-size', '22');
    label.setAttribute('font-weight', 'bold');
    label.setAttribute('fill', '#2a9d8f');
    label.setAttribute('stroke', '#ffffff');
    label.setAttribute('stroke-width', '4');
    label.setAttribute('paint-order', 'stroke');
    label.textContent = String(number);
    layer.appendChild(label);
  }
}

// Draw a pulsing hint ring on BOTH panels around one unfound difference.
// Returns the ring elements so the caller can remove them after a few seconds.
export function drawHintRing(leftSvg, rightSvg, diff) {
  const rings = [];
  for (const svg of [leftSvg, rightSvg]) {
    const layer = svg.querySelector('.markers');
    if (!layer) continue;
    const ns = svg.namespaceURI;
    const ring = document.createElementNS(ns, 'circle');
    ring.setAttribute('cx', diff.x);
    ring.setAttribute('cy', diff.y);
    ring.setAttribute('r', diff.radius + 6);
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', '#f4a261');
    ring.setAttribute('stroke-width', '5');
    ring.setAttribute('class', 'hint-ring');
    layer.appendChild(ring);
    rings.push(ring);
  }
  return rings;
}

// Flash a small red X on one panel at a missed click (scene coordinates).
export function drawMissMark(svg, x, y) {
  const layer = svg.querySelector('.markers');
  if (!layer) return null;
  const ns = svg.namespaceURI;
  const g = document.createElementNS(ns, 'g');
  g.setAttribute('stroke', '#e63946');
  g.setAttribute('stroke-width', '5');
  g.setAttribute('stroke-linecap', 'round');
  const l1 = document.createElementNS(ns, 'line');
  l1.setAttribute('x1', x - 10);
  l1.setAttribute('y1', y - 10);
  l1.setAttribute('x2', x + 10);
  l1.setAttribute('y2', y + 10);
  const l2 = document.createElementNS(ns, 'line');
  l2.setAttribute('x1', x - 10);
  l2.setAttribute('y1', y + 10);
  l2.setAttribute('x2', x + 10);
  l2.setAttribute('y2', y - 10);
  g.appendChild(l1);
  g.appendChild(l2);
  layer.appendChild(g);
  return g;
}
