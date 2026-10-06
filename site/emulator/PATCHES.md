# Local controller fixes for EmulatorJS 4.2.3

Modified on 2026-10-06 for this browser player. The original upstream source archive and license are retained.

- Find a controller by its browser `Gamepad.index` rather than treating that slot number as an offset in the handler's compact list. Browser slots can contain gaps.
- Replay already discovered controllers after registering the connection listener. The handler polls synchronously in its constructor, before that listener exists.

Readable changes are in `src/emulator.js`. `../../tools/patch-emulator.cjs` applies equivalent guarded replacements to `emulator.min.js`. Both builds are covered by `../../tools/test-gamepads.cjs` in the repository.
