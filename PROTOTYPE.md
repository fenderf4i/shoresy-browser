# Pregame scrap prototype 1.02

The experiment lives at `/prototype/`. The normal landing page and Release 1.01 ROM are unchanged.

- [50% chance per Bulldogs game](https://fenderf4i.github.io/shoresy-browser/prototype/)
- [Always show the scene](https://fenderf4i.github.io/shoresy-browser/prototype/?always=1)
- [Video with game audio](https://fenderf4i.github.io/shoresy-browser/prototype/pregame-scrap-preview.mp4)

One Bulldog approaches an opponent before the first faceoff, and the pair exchange punches using native game animations. The scene lasts about seven seconds. START skips after the first half second. Score, clock, stats, lineups, penalties, injuries and energy are restored before the opening faceoff resumes. Shootout mode and games without the Bulldogs are excluded. It occurs at most once per eligible game. All eight clean pregame conversations remain available.

Standard and Widescreen ROMs were verified in actual Genesis Plus GX using native controls and real save states, without test RAM edits. Each version passed 17 runtime scenarios covering home, away, same-team, early/middle/late skips, save/load, normal openings and return to active play. State invariants were checked throughout each scene and on cleanup, including all sixteen actors, the native faceoff background map and the gameplay RNG seed.

Probability testing covered 1,024 native game starts with varied menu timing: 490 scenes and 534 normal openings (47.85%). The threshold is one native draw from 0–99, triggering below 50. The always-show build changes only that threshold and the ROM checksum. It has a separate save identity from the 50% build and the normal release.

The 14.67-second preview records the actual 50% Standard ROM, including the approach, fight, restored faceoff and normal play, with stereo game audio. It is H.264/AAC MP4 for phone playback.

Physical iPhone, Android and controller verification remains for user review. This prototype stages one fighting pair while the other skaters watch. It does not stage a whole-team brawl.

Exact ROM hashes, per-role probability counts and recording provenance are in [site/prototype/provenance.json](site/prototype/provenance.json). Native patch source, full sample logs and the Standard/Widescreen downloads are archived in the existing private ROM repository under `work/game/pregame_fight_prototype` and `outputs/Shoresy_Pregame_Fight_Prototype_1_02`.
