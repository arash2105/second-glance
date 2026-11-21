// Second Glance: scene definitions and differences.
// Data only. Drawing lives in render-scene.js.
// Every difference: id, x (0..640), y (0..480), radius (26..34), short English label,
// and one type: missing, added, recolored, count, or shape.
// No two differences in one level are closer than 60 px.
// The right panel is always the changed panel. Clicking either panel counts.

export const SCENE_NAMES = ['Lantern Harbor', 'Garden Cottage', 'Night Market', 'Snow Clocktower'];

export const SCENES = [
  {
    id: 'harbor',
    name: 'Lantern Harbor',
    difficulty: 'Easy',
    draw: 'harbor',
    differences: [
      { id: 'harbor-gull', x: 150, y: 70, radius: 30, label: 'Missing gull', type: 'missing' },
      { id: 'harbor-lamp', x: 520, y: 105, radius: 28, label: 'Lighthouse lamp color', type: 'recolored' },
      { id: 'harbor-crate', x: 560, y: 300, radius: 30, label: 'Extra crate', type: 'added' },
      { id: 'harbor-flag', x: 212, y: 145, radius: 28, label: 'Boat flag flipped', type: 'shape' },
      { id: 'harbor-boat-lantern', x: 330, y: 240, radius: 28, label: 'Missing boat lantern', type: 'missing' },
      { id: 'harbor-rope', x: 170, y: 360, radius: 28, label: 'One rope coil, not two', type: 'count' },
      { id: 'harbor-window', x: 90, y: 300, radius: 28, label: 'Harbour house window dark', type: 'recolored' },
      { id: 'harbor-sail', x: 425, y: 230, radius: 30, label: 'Sail color changed', type: 'recolored' },
    ],
  },
  {
    id: 'garden',
    name: 'Garden Cottage',
    difficulty: 'Medium',
    draw: 'garden',
    differences: [
      { id: 'garden-cat', x: 500, y: 180, radius: 30, label: 'Missing cat on the wall', type: 'missing' },
      { id: 'garden-sunflower', x: 300, y: 380, radius: 28, label: 'One sunflower missing', type: 'count' },
      { id: 'garden-sock', x: 260, y: 155, radius: 28, label: 'Missing sock on the line', type: 'missing' },
      { id: 'garden-can', x: 90, y: 400, radius: 28, label: 'Watering can color', type: 'recolored' },
      { id: 'garden-butterfly', x: 460, y: 260, radius: 28, label: 'Extra butterfly', type: 'added' },
      { id: 'garden-smoke', x: 270, y: 85, radius: 28, label: 'No chimney smoke', type: 'missing' },
      { id: 'garden-gate', x: 380, y: 330, radius: 30, label: 'Garden gate shut', type: 'shape' },
      { id: 'garden-door', x: 203, y: 300, radius: 28, label: 'Cottage door color', type: 'recolored' },
    ],
  },
  {
    id: 'market',
    name: 'Night Market',
    difficulty: 'Harder',
    draw: 'market',
    differences: [
      { id: 'market-lantern', x: 120, y: 150, radius: 28, label: 'Lantern color changed', type: 'recolored' },
      { id: 'market-apple', x: 210, y: 320, radius: 26, label: 'One apple missing', type: 'count' },
      { id: 'market-bell', x: 480, y: 300, radius: 26, label: 'Missing bicycle bell', type: 'missing' },
      { id: 'market-sign', x: 365, y: 105, radius: 28, label: 'Star added to the sign', type: 'added' },
      { id: 'market-cat', x: 522, y: 102, radius: 28, label: 'Missing cat on the roof', type: 'missing' },
      { id: 'market-jar', x: 280, y: 300, radius: 28, label: 'Extra jar on the counter', type: 'added' },
      { id: 'market-bulb', x: 430, y: 60, radius: 26, label: 'One bulb dark', type: 'recolored' },
      { id: 'market-awning', x: 480, y: 175, radius: 28, label: 'Awning color changed', type: 'recolored' },
    ],
  },
  {
    id: 'clocktower',
    name: 'Snow Clocktower',
    difficulty: 'Hardest',
    draw: 'clocktower',
    differences: [
      { id: 'snow-window', x: 327, y: 180, radius: 28, label: 'Tower window dark', type: 'recolored' },
      { id: 'snow-hand', x: 335, y: 105, radius: 28, label: 'Clock hand moved', type: 'shape' },
      { id: 'snow-scarf', x: 150, y: 302, radius: 28, label: 'Missing snowman scarf', type: 'missing' },
      { id: 'snow-wreath', x: 547, y: 300, radius: 28, label: 'Wreath color changed', type: 'recolored' },
      { id: 'snow-footprint', x: 425, y: 398, radius: 28, label: 'Extra footprint', type: 'added' },
      { id: 'snow-smoke', x: 572, y: 180, radius: 28, label: 'No chimney smoke', type: 'missing' },
      { id: 'snow-shutter', x: 65, y: 282, radius: 28, label: 'Shutter shut', type: 'shape' },
      { id: 'snow-lamp', x: 250, y: 272, radius: 28, label: 'Lamppost lamp color', type: 'recolored' },
    ],
  },
];
