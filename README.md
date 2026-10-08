# NHL26 Shoresy Browser Player

An automatic-loading browser player for **NHL26 Shoresy Edition — Standard 1.04** Genesis ROM. Designed for portrait play in iPhone Safari and Android Chrome, with landscape support, a home-screen manifest, touch D-pad / A / B / C / START, keyboard and controller mapping, pause/restart, and save-state download/import.

## Play

https://fenderf4i.github.io/shoresy-browser/

Tap **Play**, then press **START**. An internet connection is needed to load the site. This version does not promise offline play.

Open the emulator menu for pause, restart, save state, or load state. A save state is downloaded to the device; load the same file to resume. On iPhone, look in Files / Downloads. The save defaults to a downloaded file rather than promising that browser storage will survive eviction or private browsing. Accounts, cloud saves, and network multiplayer are outside this version.

Keyboard: arrow keys, A/S/D for Genesis A/B/C, Enter for START. Hardware controllers can be configured in the emulator control menu. Connect the controller, start the player, and press a controller button with the page active. Under **How to play → Check controller**, a local browser check shows whether the browser sees it and whether its buttons respond.

## Source integrity

Release **1.04** excludes Shoresy from hot/cold player mentions during his interviews. It retains four approved Jory Jordan / Shoresy pregame interviews, all
opening with “Jory Jordan, Sudbury Kids Sports Report.” Their portraits are separate
from Shoresy's optimized hockey photo used for the fight opener. All eight existing
clean conversations remain, including both originals. Bulldogs games randomly
select from twelve conversations; NHL-only games select from the original eight.

The hockey portrait says “Let's give 'em the lumber, boys!” for about three seconds
before the unchanged 50% five-skater brawl. START advances the line or skips the fight.
Every Bulldog wins and celebrates; the original faceoff and game state are restored.
The Jims retain maximum native fighting ratings. Once-per-period fights remain research.

The browser serves exact standalone `NHL26-Shoresy Edition-Standard-1.04.md` bytes
as `.bin`, without runtime patches. Size: 3,145,728 bytes. SHA-256:
`5b7bbbe7d38f683b7ae0559950363bbb4fb06b68d65b8c572374989f45d8aece`. A new ROM URL and game ID distinguish 1.04 from earlier saves.

See `site/roms/provenance.json` and the [actual release videos](site/brawl-preview/index.html).
All prior releases remain preserved.

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
