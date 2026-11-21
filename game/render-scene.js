// Second Glance: draw one scene into one panel.
// Each draw function returns SVG inner markup for a variant:
// 'left' is the original, 'right' is the changed panel.
// Flat saturated color, thick outlines, no gradients, no external references.
// All art is original and drawn in code.
// Every scene is full: repeated small objects fill the sky, water, ground,
// stalls and walls, and each difference is one object among many like it.

const OUT = '#20242e';

function rect(x, y, w, h, fill, sw = 3) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${OUT}" stroke-width="${sw}"/>`;
}
function circ(cx, cy, r, fill, sw = 3) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${OUT}" stroke-width="${sw}"/>`;
}
function ell(cx, cy, rx, ry, fill, sw = 3) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${OUT}" stroke-width="${sw}"/>`;
}
function poly(points, fill, sw = 3) {
  return `<polygon points="${points}" fill="${fill}" stroke="${OUT}" stroke-width="${sw}" stroke-linejoin="round"/>`;
}
function path(d, fill, sw = 3) {
  return `<path d="${d}" fill="${fill}" stroke="${OUT}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function line(x1, y1, x2, y2, stroke, sw = 3) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
}
function txt(x, y, str, size, fill) {
  return `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="bold" fill="${fill}" stroke="none">${str}</text>`;
}
function gull(x, y) {
  return path(`M ${x} ${y} q 8 -9 16 0 q 8 -9 16 0`, 'none', 3);
}
// A wooden crate with a plank line.
function crate(x, y) {
  return rect(x, y, 28, 30, '#c68a4b') + line(x, y + 15, x + 28, y + 15, OUT, 2);
}
// A coiled rope: two concentric circles.
function coil(x, y) {
  return circ(x, y, 13, '#c68a4b') + circ(x, y, 6, '#8b5e3c', 2);
}
// A butterfly, centred at (x, y), wings in two colors.
function butterfly(x, y, c1, c2) {
  return ell(x - 8, y, 9, 6, c1, 2) + ell(x + 8, y, 9, 6, c2, 2) + line(x, y - 6, x, y + 8, OUT, 2);
}
// A sitting cat, body centred at (x, y), head to the right, tail to the left.
function cat(x, y, color) {
  return ell(x, y, 20, 9, color) + circ(x + 18, y - 6, 8, color) + path(`M ${x - 18} ${y - 2} q -10 -6 -5 -12`, 'none', 3);
}

export function drawHarbor(variant) {
  const right = variant === 'right';
  let s = '';
  // Sky: sun, clouds, and a flock of gulls.
  s += rect(0, 0, 640, 220, '#ffcf99');
  s += circ(545, 68, 32, '#ffd166');
  s += ell(120, 60, 55, 18, '#ffffff');
  s += ell(300, 45, 45, 15, '#ffffff');
  s += ell(450, 130, 35, 12, '#ffffff');
  s += ell(40, 150, 30, 10, '#ffffff');
  // One gull of the flock is missing on the right.
  s += gull(320, 80);
  s += gull(420, 60);
  s += gull(60, 160);
  s += gull(380, 130);
  if (!right) s += gull(150, 70);
  s += gull(230, 55);
  s += gull(90, 110);
  // Hills and water: waves, buoys, and fish.
  s += poly('0,220 140,150 280,220', '#6a994e');
  s += rect(0, 220, 640, 140, '#219ebc');
  s += path('M 60 250 q 20 -8 40 0 q 20 8 40 0', 'none', 3);
  s += path('M 380 270 q 20 -8 40 0 q 20 8 40 0', 'none', 3);
  s += path('M 180 320 q 20 -8 40 0 q 20 8 40 0', 'none', 3);
  s += path('M 250 250 q 20 -8 40 0 q 20 8 40 0', 'none', 3);
  s += path('M 500 300 q 20 -8 40 0 q 20 8 40 0', 'none', 3);
  s += circ(280, 260, 8, '#e63946');
  s += circ(480, 285, 8, '#f4a261');
  s += ell(200, 280, 10, 5, '#f4a261');
  s += ell(350, 300, 10, 5, '#f4a261');
  // Lighthouse, right side, with its lamps.
  s += rect(505, 118, 34, 102, '#f1faee');
  s += rect(505, 145, 34, 12, '#e63946');
  s += rect(505, 180, 34, 12, '#e63946');
  s += rect(496, 90, 48, 12, '#333333');
  s += circ(520, 105, 14, right ? '#ffffff' : '#ffd166');
  s += rect(515, 125, 10, 10, '#90e0ef');
  s += rect(514, 190, 16, 30, '#6c4a2f');
  s += circ(522, 160, 5, '#ffd166', 2);
  // Harbour house, left side, with three windows.
  s += rect(40, 270, 110, 60, '#f1faee');
  s += poly('30,270 95,235 160,270', '#e63946');
  s += rect(55, 300, 20, 30, '#6c4a2f');
  s += rect(78, 288, 24, 22, right ? '#2b2d42' : '#ffd166');
  s += rect(115, 288, 20, 22, '#ffd166');
  s += circ(95, 252, 7, '#90e0ef');
  // Dock, posts with lamps, and a barrel.
  s += rect(0, 330, 640, 30, '#8b5e3c');
  s += rect(60, 330, 10, 40, '#6c4a2f');
  s += rect(180, 330, 10, 40, '#6c4a2f');
  s += rect(320, 330, 10, 40, '#6c4a2f');
  s += rect(450, 330, 10, 40, '#6c4a2f');
  s += rect(580, 330, 10, 40, '#6c4a2f');
  s += circ(65, 322, 6, '#ffd166');
  s += circ(585, 322, 6, '#ffd166');
  s += circ(610, 345, 12, '#8b5e3c');
  // Sand foreground: rope coils, shells, a starfish, pebbles.
  s += rect(0, 360, 640, 120, '#e9c46a');
  s += coil(120, 360);
  if (!right) s += coil(170, 360);
  s += coil(260, 390);
  s += coil(380, 400);
  s += ell(300, 430, 8, 5, '#f1faee');
  s += ell(450, 440, 8, 5, '#f1faee');
  s += poly('545,425 548,433 556,433 550,438 552,446 545,441 538,446 540,438 534,433 542,433', '#e63946', 2);
  s += circ(350, 450, 5, '#adb5bd');
  s += circ(420, 420, 4, '#adb5bd');
  // Crates stacked on the dock; one more joins the row on the right.
  s += crate(260, 270);
  s += crate(260, 300);
  s += crate(440, 300);
  s += crate(480, 300);
  if (right) {
    s += rect(545, 285, 30, 30, '#c68a4b');
    s += line(545, 300, 575, 300, OUT, 2);
  }
  // Boat 1, left-center, tall mast, flag, and a lantern.
  s += poly('170,300 250,300 235,325 185,325', '#e63946');
  s += line(210, 300, 210, 130, OUT, 4);
  s += poly('210,140 210,290 165,290', '#ffffff');
  s += right ? poly('208,138 178,145 208,152', '#f4a261') : poly('212,138 242,145 212,152', '#f4a261');
  s += line(210, 244, 222, 250, OUT, 2);
  s += circ(222, 250, 6, '#ffd166');
  // Boat 2, middle, with a lantern on its mast.
  s += poly('300,320 380,320 365,345 315,345', '#2a9d8f');
  s += line(340, 320, 340, 232, OUT, 4);
  s += poly('340,200 340,232 322,232', '#f4a261');
  if (!right) {
    s += line(340, 232, 330, 240, OUT, 2);
    s += circ(330, 240, 8, '#ffd166');
  }
  // Boat 3, right: a striped sail. Only the middle stripe changes color.
  s += poly('400,305 480,305 465,330 415,330', '#f4a261');
  s += line(440, 305, 440, 160, OUT, 4);
  s += poly('440,165 440,295 395,295', '#f1faee');
  s += poly('440,182 440,202 428,202 434,182', '#f4a261');
  s += poly('440,215 440,245 413,245 423,215', right ? '#4361ee' : '#e63946');
  s += poly('440,255 440,275 402,275 409,255', '#f4a261');
  s += poly('440,160 440,190 424,190', '#f4a261');
  s += line(440, 254, 452, 260, OUT, 2);
  s += circ(452, 260, 6, '#ffd166');
  return s;
}

export function drawGarden(variant) {
  const right = variant === 'right';
  let s = '';
  // Sky: sun, clouds, and birds.
  s += rect(0, 0, 640, 200, '#a8dadc');
  s += circ(540, 70, 30, '#ffd166');
  s += ell(110, 55, 50, 16, '#ffffff');
  s += ell(300, 40, 42, 14, '#ffffff');
  s += ell(420, 90, 40, 12, '#ffffff');
  s += gull(350, 60);
  s += gull(460, 100);
  s += poly('0,200 200,140 400,200', '#6a994e');
  s += poly('240,200 420,150 640,200', '#588157');
  s += rect(0, 200, 640, 280, '#80b918');
  // Cottage with a smoking chimney.
  s += rect(120, 200, 180, 140, '#f1faee');
  s += poly('105,200 210,140 315,200', '#e63946');
  s += rect(255, 130, 28, 40, '#8d99ae');
  if (!right) {
    s += circ(268, 108, 10, '#ffffff');
    s += circ(278, 95, 8, '#ffffff');
    s += circ(266, 82, 10, '#ffffff');
    s += circ(276, 68, 8, '#ffffff');
    s += circ(264, 55, 7, '#ffffff');
    s += circ(274, 42, 7, '#ffffff');
  }
  s += circ(210, 175, 8, '#90e0ef');
  s += rect(188, 260, 26, 80, right ? '#2a9d8f' : '#e63946');
  s += circ(206, 300, 3, '#ffd166', 2);
  s += rect(140, 230, 30, 30, '#90e0ef');
  s += line(155, 230, 155, 260, OUT, 2);
  s += rect(250, 230, 30, 30, '#90e0ef');
  s += line(265, 230, 265, 260, OUT, 2);
  // Laundry line with shirts, socks, and a towel.
  s += line(180, 140, 560, 140, OUT, 3);
  s += rect(178, 140, 4, 60, '#6c4a2f');
  s += rect(558, 140, 4, 60, '#6c4a2f');
  s += rect(200, 140, 30, 28, '#4361ee');
  if (!right) s += rect(260, 140, 14, 24, '#f4a261');
  s += rect(320, 140, 14, 24, '#e63946');
  s += rect(400, 140, 30, 28, '#ffd166');
  s += rect(460, 140, 30, 28, '#2a9d8f');
  s += rect(510, 140, 14, 24, '#f1faee');
  // Garden wall and a cat on it; another cat sits on the fence.
  s += rect(470, 200, 120, 30, '#b08968');
  if (!right) s += cat(500, 186, '#f4a261');
  s += cat(90, 326, '#f4a261');
  // Tree, right side, with apples.
  s += rect(560, 240, 18, 80, '#6c4a2f');
  s += circ(570, 220, 35, '#2a9d8f');
  s += circ(545, 245, 25, '#2a9d8f');
  s += circ(595, 245, 25, '#2a9d8f');
  // Path and gate.
  s += poly('210,340 260,340 280,480 190,480', '#e9c46a');
  if (right) {
    s += rect(362, 312, 40, 36, '#8b5e3c');
    s += line(362, 330, 402, 330, OUT, 2);
  } else {
    s += poly('362,312 398,322 398,348 362,348', '#8b5e3c');
  }
  s += rect(355, 308, 6, 44, '#6c4a2f');
  s += rect(402, 308, 6, 44, '#6c4a2f');
  // Fence run, left and right of the gate.
  s += rect(40, 330, 8, 40, '#8b5e3c');
  s += rect(90, 330, 8, 40, '#8b5e3c');
  s += rect(140, 330, 8, 40, '#8b5e3c');
  s += line(40, 340, 150, 340, OUT, 2);
  s += rect(460, 330, 8, 40, '#8b5e3c');
  s += rect(510, 330, 8, 40, '#8b5e3c');
  s += rect(560, 330, 8, 40, '#8b5e3c');
  s += line(460, 340, 570, 340, OUT, 2);
  // Flower bed: nine sunflowers and tulips between them.
  s += rect(40, 440, 560, 40, '#7f4f24');
  const heads = [60, 120, 180, 240, 300, 360, 420, 480, 540];
  for (const hx of heads) {
    if (right && hx === 300) continue;
    s += line(hx, 380, hx, 440, '#2a9d8f', 4);
    s += circ(hx, 375, 16, '#ffd60a');
    s += circ(hx, 375, 6, '#6c4a2f', 2);
  }
  // Watering cans, a bucket, and a rake.
  s += rect(70, 390, 40, 25, right ? '#4361ee' : '#2a9d8f');
  s += poly('110,395 130,400 110,408', right ? '#4361ee' : '#2a9d8f');
  s += path('M 70 395 q -12 -4 -10 -14', 'none', 3);
  s += rect(500, 395, 36, 22, '#e63946');
  s += poly('536,400 552,405 536,410', '#e63946');
  s += rect(575, 405, 24, 20, '#8b5e3c');
  // Butterflies: two always, one more on the right.
  s += butterfly(140, 270, '#e63946', '#4361ee');
  s += butterfly(330, 310, '#f4a261', '#2a9d8f');
  if (right) s += butterfly(460, 256, '#e63946', '#4361ee');
  // Bushes and stones.
  s += circ(60, 430, 20, '#588157');
  s += circ(90, 435, 16, '#588157');
  s += ell(520, 445, 18, 8, '#adb5bd');
  s += ell(560, 450, 14, 7, '#adb5bd');
  return s;
}

export function drawMarket(variant) {
  const right = variant === 'right';
  let s = '';
  // Night sky: moon, stars, and a string of twelve bulbs.
  s += rect(0, 0, 640, 200, '#1d3557');
  s += circ(560, 60, 24, '#f1faee');
  s += circ(80, 40, 3, '#ffffff', 1);
  s += circ(200, 30, 3, '#ffffff', 1);
  s += circ(340, 45, 3, '#ffffff', 1);
  s += circ(480, 30, 3, '#ffffff', 1);
  s += circ(140, 60, 3, '#ffffff', 1);
  s += circ(260, 25, 3, '#ffffff', 1);
  s += circ(400, 25, 3, '#ffffff', 1);
  s += circ(60, 80, 3, '#ffffff', 1);
  s += circ(360, 70, 3, '#ffffff', 1);
  s += circ(620, 80, 3, '#ffffff', 1);
  s += circ(300, 20, 3, '#ffffff', 1);
  s += circ(560, 110, 3, '#ffffff', 1);
  // String lights; one bulb of the twelve is dark on the right.
  s += path('M 0 40 Q 320 80 640 40', 'none', 2);
  const bulbs = [[30, 48], [80, 52], [130, 54], [180, 62], [230, 66], [280, 68], [330, 66], [380, 62], [430, 60], [480, 60], [520, 50], [580, 54]];
  for (const [bx, by] of bulbs) {
    const dark = right && bx === 430 && by === 60;
    s += circ(bx, by, 7, dark ? '#2b2d42' : '#ffd166');
  }
  s += rect(0, 200, 640, 280, '#2b2d42');
  // Signs: fruit board with a star, TEA with a star on the right, bread board below.
  s += rect(50, 95, 80, 28, '#f1faee');
  s += circ(76, 109, 8, '#e63946');
  s += ell(82, 100, 5, 3, '#2a9d8f', 2);
  s += poly('118,99 120,103 124,103 121,106 122,110 118,107 114,110 115,106 112,103 116,103', '#f4a261', 2);
  s += rect(320, 90, 90, 32, '#f1faee');
  s += txt(332, 113, 'TEA', 15, '#1d3557');
  if (right) s += poly('365,96 368,102 374,102 369,106 371,112 365,108 359,112 361,106 356,102 362,102', '#f4a261', 2);
  s += line(515, 180, 515, 192, OUT, 2);
  s += line(565, 180, 565, 192, OUT, 2);
  s += rect(505, 192, 70, 24, '#f1faee');
  s += ell(540, 204, 17, 8, '#c68a4b');
  s += line(528, 204, 552, 204, OUT, 2);
  // Stall 1, left, with a striped awning and paper lanterns.
  s += poly('40,150 80,150 85,180 50,180', '#e63946');
  s += poly('80,150 120,150 120,180 85,180', '#f1faee');
  s += poly('120,150 160,150 155,180 120,180', '#e63946');
  s += poly('160,150 200,150 190,180 155,180', '#f1faee');
  s += rect(50, 180, 8, 120, '#8b5e3c');
  s += rect(185, 180, 8, 120, '#8b5e3c');
  s += rect(40, 300, 170, 20, '#8b5e3c');
  s += ell(120, 150, 18, 24, right ? '#f4a261' : '#e63946');
  s += rect(112, 116, 16, 8, '#f4a261');
  s += rect(112, 178, 16, 8, '#f4a261');
  s += ell(250, 140, 20, 26, '#f4a261');
  s += ell(70, 185, 14, 18, '#ffd166');
  s += ell(150, 185, 14, 18, '#ffd166');
  // Stall 2, right, with a striped awning, a roof, and a cat.
  s += rect(440, 118, 160, 16, '#6c4a2f');
  if (!right) s += cat(520, 103, '#f4a261');
  s += poly('430,150 464,150 470,180 440,180', '#e63946');
  s += poly('464,150 498,150 500,180 470,180', right ? '#2a9d8f' : '#e63946');
  s += poly('498,150 532,150 530,180 500,180', '#e63946');
  s += poly('532,150 566,150 560,180 530,180', '#f1faee');
  s += poly('566,150 600,150 590,180 560,180', '#e63946');
  s += rect(440, 180, 8, 120, '#8b5e3c');
  s += rect(592, 180, 8, 120, '#8b5e3c');
  s += rect(430, 300, 170, 20, '#8b5e3c');
  s += ell(560, 150, 20, 26, '#e63946');
  s += ell(480, 185, 14, 18, '#ffd166');
  s += ell(590, 185, 14, 18, '#ffd166');
  s += ell(450, 185, 14, 18, '#ffd166');
  // A cat on the ground by the baskets.
  s += cat(140, 399, '#f4a261');
  // Apple crate: seven apples, one fewer on the right.
  s += rect(170, 310, 90, 40, '#8b5e3c');
  s += circ(180, 315, 9, '#e63946');
  s += circ(200, 308, 9, '#e63946');
  s += circ(220, 315, 9, '#e63946');
  s += circ(190, 328, 9, '#e63946');
  s += circ(240, 312, 9, '#e63946');
  s += circ(235, 330, 9, '#e63946');
  if (!right) s += circ(210, 320, 9, '#e63946');
  // Orange crate and a basket of lemons.
  s += rect(300, 315, 80, 35, '#8b5e3c');
  s += circ(315, 312, 9, '#f4a261');
  s += circ(335, 308, 9, '#f4a261');
  s += circ(355, 312, 9, '#f4a261');
  s += circ(370, 315, 9, '#f4a261');
  s += circ(325, 330, 9, '#f4a261');
  s += ell(405, 320, 25, 12, '#c68a4b');
  s += circ(398, 314, 7, '#ffd60a');
  s += circ(412, 310, 7, '#ffd60a');
  s += circ(420, 322, 7, '#ffd60a');
  // Jars on the counters: a row, one more on the right.
  s += rect(222, 285, 14, 20, '#90e0ef');
  s += rect(242, 285, 14, 20, '#ffd166');
  s += rect(292, 285, 14, 20, '#90e0ef');
  s += rect(312, 287, 12, 18, '#ffd166');
  if (right) s += rect(272, 288, 16, 20, '#ffd166');
  s += rect(450, 285, 14, 20, '#90e0ef');
  s += rect(470, 287, 12, 18, '#ffd166');
  s += rect(490, 285, 14, 20, '#90e0ef');
  s += rect(510, 285, 14, 20, '#ffd166');
  s += rect(530, 287, 12, 18, '#90e0ef');
  // Service bells on the counters; the bicycle bell is missing on the right.
  s += circ(120, 293, 7, '#ffd166');
  s += rect(112, 298, 16, 3, '#8b5e3c');
  s += circ(560, 293, 7, '#ffd166');
  s += rect(552, 298, 16, 3, '#8b5e3c');
  // Bicycle, right side.
  s += circ(470, 330, 22, 'none', 4);
  s += circ(540, 330, 22, 'none', 4);
  s += path('M 470 330 L 505 300 L 540 330 M 505 300 L 495 330 M 505 300 L 520 300', 'none', 3);
  s += line(505, 300, 520, 292, OUT, 3);
  if (!right) s += circ(480, 300, 6, '#ffd166');
  // Baskets on the ground.
  s += ell(90, 400, 30, 16, '#c68a4b');
  s += ell(590, 410, 26, 14, '#c68a4b');
  s += circ(90, 392, 8, '#2a9d8f', 2);
  s += circ(590, 402, 8, '#2a9d8f', 2);
  s += ell(320, 410, 28, 14, '#c68a4b');
  s += circ(320, 402, 7, '#2a9d8f', 2);
  s += ell(480, 430, 26, 13, '#c68a4b');
  s += circ(480, 422, 7, '#2a9d8f', 2);
  return s;
}

export function drawClocktower(variant) {
  const right = variant === 'right';
  let s = '';
  // Winter sky: moon and falling snow.
  s += rect(0, 0, 640, 240, '#b8d0e8');
  s += circ(90, 60, 26, '#f1faee');
  s += circ(200, 40, 4, '#ffffff', 1);
  s += circ(420, 50, 4, '#ffffff', 1);
  s += circ(540, 35, 4, '#ffffff', 1);
  s += circ(150, 90, 3, '#ffffff', 1);
  s += circ(480, 80, 3, '#ffffff', 1);
  s += circ(600, 110, 3, '#ffffff', 1);
  s += circ(60, 120, 3, '#ffffff', 1);
  s += circ(180, 150, 3, '#ffffff', 1);
  s += circ(260, 60, 3, '#ffffff', 1);
  s += circ(420, 120, 3, '#ffffff', 1);
  s += circ(500, 150, 3, '#ffffff', 1);
  s += circ(620, 180, 3, '#ffffff', 1);
  s += circ(80, 200, 3, '#ffffff', 1);
  s += circ(240, 180, 3, '#ffffff', 1);
  // Snow ground and drifts.
  s += rect(0, 360, 640, 120, '#ffffff');
  s += ell(120, 380, 90, 18, '#e9ecef');
  s += ell(480, 390, 110, 20, '#e9ecef');
  s += ell(300, 400, 70, 14, '#e9ecef');
  s += ell(60, 430, 80, 14, '#e9ecef');
  // Clocktower, centre, with six windows and a ticked clock face.
  s += rect(280, 110, 80, 250, '#8d99ae');
  s += poly('270,110 320,70 370,110', '#e63946');
  s += circ(320, 125, 30, '#f1faee');
  s += line(320, 100, 320, 95, OUT, 2);
  s += line(333, 103, 335, 99, OUT, 2);
  s += line(342, 113, 346, 110, OUT, 2);
  s += line(345, 125, 350, 125, OUT, 2);
  s += line(342, 138, 346, 140, OUT, 2);
  s += line(333, 147, 335, 151, OUT, 2);
  s += line(320, 150, 320, 155, OUT, 2);
  s += line(308, 147, 305, 151, OUT, 2);
  s += line(298, 138, 294, 140, OUT, 2);
  s += line(295, 125, 290, 125, OUT, 2);
  s += line(298, 113, 294, 110, OUT, 2);
  s += line(308, 103, 305, 99, OUT, 2);
  s += line(320, 125, 320, 108, OUT, 3);
  if (right) s += line(320, 125, 340, 115, OUT, 3);
  else s += line(320, 125, 320, 98, OUT, 3);
  s += circ(320, 125, 4, OUT, 2);
  s += rect(288, 168, 18, 24, '#ffd166');
  s += rect(318, 168, 18, 24, right ? '#2b2d42' : '#ffd166');
  s += rect(288, 220, 18, 24, '#ffd166');
  s += rect(318, 220, 18, 24, '#ffd166');
  s += rect(288, 270, 18, 24, '#ffd166');
  s += rect(318, 270, 18, 24, '#ffd166');
  s += rect(305, 300, 30, 60, '#6c4a2f');
  s += circ(320, 330, 3, '#ffd166', 2);
  s += `<circle cx="320" cy="322" r="9" fill="none" stroke="#2a9d8f" stroke-width="5"/>`;
  // House, left, with a chimney that smokes and shuttered windows.
  s += rect(40, 240, 110, 120, '#f1faee');
  s += poly('30,240 95,200 160,240', '#e63946');
  s += rect(122, 195, 16, 35, '#8d99ae');
  s += circ(130, 182, 8, '#ffffff');
  s += circ(137, 170, 6, '#ffffff');
  s += circ(126, 159, 5, '#ffffff');
  if (right) {
    s += rect(55, 270, 20, 24, '#8b5e3c');
  } else {
    s += rect(55, 270, 20, 24, '#90e0ef');
    s += rect(48, 270, 6, 24, '#8b5e3c');
    s += rect(76, 270, 6, 24, '#8b5e3c');
  }
  s += rect(108, 270, 6, 24, '#8b5e3c');
  s += rect(136, 270, 6, 24, '#8b5e3c');
  s += rect(115, 270, 20, 24, '#90e0ef');
  s += rect(85, 310, 24, 50, '#6c4a2f');
  s += `<circle cx="97" cy="335" r="10" fill="none" stroke="#2a9d8f" stroke-width="5"/>`;
  // House, right, with a smoking chimney and a wreath.
  s += rect(490, 240, 110, 120, '#f1faee');
  s += poly('480,240 545,200 610,240', '#e63946');
  s += rect(560, 200, 24, 40, '#8d99ae');
  if (!right) {
    s += circ(572, 180, 9, '#ffffff');
    s += circ(580, 166, 7, '#ffffff');
    s += circ(566, 154, 6, '#ffffff');
    s += circ(578, 140, 8, '#ffffff');
    s += circ(562, 128, 7, '#ffffff');
    s += circ(590, 168, 6, '#ffffff');
  }
  s += rect(505, 270, 20, 24, '#90e0ef');
  s += rect(565, 270, 20, 24, '#90e0ef');
  s += rect(498, 270, 6, 24, '#8b5e3c');
  s += rect(526, 270, 6, 24, '#8b5e3c');
  s += rect(558, 270, 6, 24, '#8b5e3c');
  s += rect(586, 270, 6, 24, '#8b5e3c');
  s += rect(535, 310, 24, 50, '#6c4a2f');
  s += circ(545, 250, 12, '#f1faee');
  s += line(545, 250, 545, 242, OUT, 2);
  s += line(545, 250, 551, 253, OUT, 2);
  // The wreath ring is added by renderScene (wreathRing), so its color can change.
  // Pine trees.
  s += poly('200,300 220,250 240,300', '#2a9d8f');
  s += rect(216, 300, 8, 20, '#6c4a2f');
  s += poly('600,320 620,270 640,320', '#2a9d8f');
  s += rect(616, 320, 8, 20, '#6c4a2f');
  s += poly('360,330 380,280 400,330', '#2a9d8f');
  s += rect(376, 330, 8, 18, '#6c4a2f');
  s += circ(220, 275, 4, '#e63946', 1);
  s += circ(620, 295, 4, '#e63946', 1);
  s += circ(380, 305, 3, '#e63946', 1);
  // Snowman, left, with a scarf; a second snowman stands on the right.
  s += circ(150, 355, 28, '#ffffff');
  s += circ(150, 315, 20, '#ffffff');
  s += circ(150, 285, 14, '#ffffff');
  s += rect(138, 268, 24, 10, '#333333');
  s += rect(142, 256, 16, 12, '#333333');
  if (!right) {
    s += rect(132, 300, 36, 10, '#e63946');
    s += rect(160, 300, 8, 18, '#e63946');
  }
  s += circ(145, 282, 2, OUT, 1);
  s += circ(155, 282, 2, OUT, 1);
  s += circ(520, 425, 22, '#ffffff');
  s += circ(520, 395, 16, '#ffffff');
  s += circ(520, 372, 11, '#ffffff');
  s += rect(510, 358, 20, 8, '#333333');
  s += rect(514, 348, 12, 10, '#333333');
  s += rect(506, 378, 28, 8, '#e63946');
  s += rect(528, 378, 6, 14, '#e63946');
  // A scarf draped over the fence.
  s += rect(258, 382, 24, 8, '#e63946');
  s += rect(276, 382, 5, 12, '#e63946');
  // Lampposts: one lamp of the three is white on the right.
  s += rect(247, 280, 6, 80, '#333333');
  s += circ(250, 272, 10, right ? '#ffffff' : '#ffd166');
  s += rect(467, 290, 6, 70, '#333333');
  s += circ(470, 282, 10, '#ffd166');
  s += rect(197, 380, 6, 50, '#333333');
  s += circ(200, 372, 9, '#ffd166');
  // Footprints in the snow: a trail, one more on the right.
  s += ell(360, 385, 8, 5, '#adb5bd', 2);
  s += ell(385, 395, 8, 5, '#adb5bd', 2);
  s += ell(405, 405, 8, 5, '#adb5bd', 2);
  s += ell(335, 372, 8, 5, '#adb5bd', 2);
  s += ell(315, 388, 8, 5, '#adb5bd', 2);
  s += ell(295, 402, 8, 5, '#adb5bd', 2);
  s += ell(455, 408, 8, 5, '#adb5bd', 2);
  s += ell(475, 420, 8, 5, '#adb5bd', 2);
  if (right) s += ell(425, 398, 8, 5, '#adb5bd', 2);
  // Fence.
  s += rect(240, 380, 8, 30, '#8b5e3c');
  s += rect(280, 380, 8, 30, '#8b5e3c');
  s += line(240, 390, 288, 390, OUT, 2);
  return s;
}

// Wreath color difference: the ring is drawn in drawClocktower through a
// colored stroke circle placed by renderScene below. This helper keeps the
// color change in one place.
function wreathRing(right) {
  return `<circle cx="547" cy="300" r="14" fill="none" stroke="${right ? '#e63946' : '#2a9d8f'}" stroke-width="6"/>`;
}

const DRAW = { harbor: drawHarbor, garden: drawGarden, market: drawMarket, clocktower: drawClocktower };

// Draw one scene into one panel's <svg> element.
// variant is 'left' or 'right'. A fresh <g class="markers"> layer is added
// on top for found-difference markers.
export function renderScene(svgEl, scene, variant) {
  const fn = DRAW[scene.draw];
  let markup = fn(variant);
  if (scene.draw === 'clocktower') markup += wreathRing(variant === 'right');
  svgEl.innerHTML = markup + '<g class="markers"></g>';
}
