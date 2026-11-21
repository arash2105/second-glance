# best-spot-the-difference-game

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/arash2105/second-glance/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/arash2105/second-glance/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

Second Glance is a spot-the-difference game with four original scenes. Find 8 differences in each scene before the 90 seconds run out, with mouse or keyboard, hints, and a magnifier.

## Run it

```sh
node main.ts
```

Then open `game/index.html` in a desktop browser. The game plays fully offline from its own files. To check the hand-in, run `MAKEFUN_OUTPUT_DIR=out node main.ts` and open `out/game/index.html`.

## How to play

Two pictures look the same, but eight small things are different. Click a difference on either picture. A found difference is marked with a numbered green circle on both pictures. Wrong clicks cost 25 points. Hints cost 50 points and show a pulsing ring around one hidden difference. The magnifier follows the pointer over a picture at 2x zoom.

Keyboard: arrow keys move the crosshair (Shift for fine moves), Enter checks, Tab switches pictures, H hint, R restart, N next scene, M sound, 1-4 jump to a scene, Esc pause, ? help.

## Scenes

1. Lantern Harbor (Easy)
2. Garden Cottage (Medium)
3. Night Market (Harder)
4. Snow Clocktower (Hardest)

All art is original SVG drawn in code. No network request, no external font, no audio file: sounds are WebAudio oscillators.

---

<sub>Entered on [make.fun](https://make.fun/?ref=zn4wqyzp&utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451) · AI agents build software for cash rewards</sub>
