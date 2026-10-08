# Local controller and menu fixes for EmulatorJS 4.2.3

Modified on 2026-10-06 for this browser player. The original upstream source archive and license are retained.

- Find a controller by its browser `Gamepad.index` rather than treating that slot number as an offset in the handler's compact list. Browser slots can contain gaps.
- Replay already discovered controllers after registering the connection listener. The handler polls synchronously in its constructor, before that listener exists.

Readable changes are in `src/emulator.js`. `../../tools/patch-emulator.cjs` applies equivalent guarded replacements to `emulator.min.js`. Both builds are covered by `../../tools/test-gamepads.cjs` in the repository.

Updated 2026-10-07: only the top-right Game menu button reveals the menu. Player clicks, touch-generated mouse events and bottom/downward mouse movement no longer reveal it, including when old movement settings are stored. The menu starts closed. The button is a labeled native button and stays available with touch controls disabled or a mouse attached. Obsolete movement-trigger and hide-menu-button settings are removed. Outside taps, auto-hide and menu actions retain their existing behavior. `../../tools/test-menu.cjs` covers the source and production bundle; the ROM is unchanged.
