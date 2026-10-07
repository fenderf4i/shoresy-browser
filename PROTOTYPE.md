# Pregame scrap prototype 1.02

Revision 2 fixes the fighters facing away from each other. Their facing direction and sprite mirroring now follow their actual left/right positions. Regression checks catch the old error and verify both fighters on every choreographed frame for home, away and same-team matchups in both ROM versions. The preview video has been replaced with a recording of this corrected build.

The experiment lives at `/prototype/`. The normal landing page and Release 1.01 ROM are unchanged.

- [50% chance per Bulldogs game](https://fenderf4i.github.io/shoresy-browser/prototype/)
- [Always show the scene](https://fenderf4i.github.io/shoresy-browser/prototype/?always=1)
- [Video with game audio](https://fenderf4i.github.io/shoresy-browser/prototype/pregame-scrap-preview.mp4)

One Bulldog approaches an opponent before the first faceoff, and the pair exchange punches using native game animations. The scene lasts about seven seconds. START skips after the first half second. Score, clock, stats, lineups, penalties, injuries and energy are restored before the opening faceoff resumes. Shootout mode and games without the Bulldogs are excluded. It occurs at most once per eligible game. All eight clean pregame conversations remain available.

Standard and Widescreen ROMs were verified in actual Genesis Plus GX using native controls and real save states, without test RAM edits. Each version passed 17 runtime scenarios covering home, away, same-team, early/middle/late skips, save/load, normal openings and return to active play. State invariants were checked throughout each scene and on cleanup, including all sixteen actors, the native faceoff background map and the gameplay RNG seed.

Revision 2 was checked across 256 native game starts with varied menu timing: 120 scenes and 136 normal openings (46.88%). The coin-flip and initialization code are byte-identical to revision 1, which separately tested 1,024 starts (490 scenes). The threshold remains one native draw from 0–99, triggering below 50. The always-show build changes only that threshold and the ROM checksum. Revision 2 uses fresh ROM cache URLs and separate save identities so the previous prototype does not load accidentally.

The 14.67-second preview records the actual 50% Standard ROM, including the approach, fight, restored faceoff and normal play, with stereo game audio. It is H.264/AAC MP4 for phone playback.

Physical iPhone, Android and controller verification remains for user review. This prototype stages one fighting pair while the other skaters watch. It does not stage a whole-team brawl.

Exact ROM hashes, per-role probability counts and recording provenance are in [site/prototype/provenance.json](site/prototype/provenance.json). Native patch source, full sample logs and the Standard/Widescreen downloads are archived in the existing private ROM repository under `work/game/pregame_fight_prototype` and `outputs/Shoresy_Pregame_Fight_Prototype_1_02`.
