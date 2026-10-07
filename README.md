# NHL26 Shoresy Browser Player

An automatic-loading browser player for **NHL26 Shoresy Edition — Standard 1.01** Genesis ROM. Designed for portrait play in iPhone Safari and Android Chrome, with landscape support, a home-screen manifest, touch D-pad / A / B / C / START, keyboard and controller mapping, pause/restart, and save-state download/import.

## Play

https://fenderf4i.github.io/shoresy-browser/

Tap **Play**, then press **START**. An internet connection is needed to load the site. This version does not promise offline play.

Open the emulator menu for pause, restart, save state, or load state. A save state is downloaded to the device; load the same file to resume. On iPhone, look in Files / Downloads. The save defaults to a downloaded file rather than promising that browser storage will survive eviction or private browsing. Accounts, cloud saves, and network multiplayer are outside this version.

Keyboard: arrow keys, A/S/D for Genesis A/B/C, Enter for START. Hardware controllers can be configured in the emulator control menu. Connect the controller, start the player, and press a controller button with the page active. Under **How to play → Check controller**, a local browser check shows whether the browser sees it and whether its buttons respond.

## Source integrity

Release **1.01** retains the original conversation plus three approved additions for each announcer pair: eight native pregame conversations in total, with all swearing removed. The ROM chooses one conversation once per pregame; repeats are allowed, and a save state retains its choice. Sudbury home/away and NHL-only wording remains appropriate to the matchup. Same-team games omit the away-player exchange.

The browser serves the exact verified standalone `NHL26-Shoresy Edition-Standard-1.01.md` build under a `.bin` extension. No runtime ROM patches are applied.

- Size: 3,145,728 bytes
- SHA-256: `a15036d64ad511eb7b40f486372cdead29f3dadfda867528f403d0c10c0e1140`
- Version: Standard 1.01 (33 teams; Sudbury defaults to Home, Winnipeg to Away)
- Header base-game credit: JKline3 & von Ozbourne

Release 1.00 remains preserved at its existing ROM URL and in Git. Each build uses a distinct ROM URL and game ID so it loads fresh. Artwork, roster, ratings, gameplay, default teams and menu portrait order match Release 1.00. See `site/roms/provenance.json`.

## Emulator

EmulatorJS **4.2.3**, with the official Genesis Plus GX WebGL1 and WebGL2 core archives, is served locally from `site/emulator/`. Threading is disabled to work without COOP/COEP headers on GitHub Pages. Two local fixes handle controllers connected before startup and browser controller slots with gaps; see [PATCHES.md](site/emulator/PATCHES.md). Modified readable source, the original upstream archive, and licenses are included. The emulator may check its upstream CDN for an update notification, but game loading does not require a CDN-hosted script or core.

See the site's [credits](site/credits.html), [upstream EmulatorJS](https://github.com/EmulatorJS/EmulatorJS/tree/v4.2.3), and [Genesis Plus GX fork](https://github.com/EmulatorJS/Genesis-Plus-GX). Emulator software licensing does not grant rights to the supplied ROM or character artwork.

## Development and deployment

No package installation or build step is required. With Node 18 or newer:

```text
node tools/serve.cjs
node tools/test-gamepads.cjs
node tools/verify.cjs http://127.0.0.1:4186/shoresy-browser/
```

Preview uses the same `/shoresy-browser/` subdirectory as GitHub Pages. It binds only to 127.0.0.1. After intentional asset changes, run `node tools/checksums.cjs`, then `node tools/verify.cjs` before committing.

Push `main` to run `.github/workflows/pages.yml`. The workflow verifies every asset and the exact ROM hash, then publishes only `site/`. GitHub Pages must be configured with **GitHub Actions** as its build source.

Verbose emulator diagnostics: append `?debug` to the URL. Normal play uses the pinned minified scripts.

## Verification

See [VALIDATION.md](VALIDATION.md). Desktop browser checks and phone-sized layout checks do not substitute for physical iPhone / Android testing.
