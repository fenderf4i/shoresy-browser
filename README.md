# NHL26 Shoresy Browser Player

An automatic-loading browser player for the supplied **NHL26 Shoresy Edition — Standard 1.10** Genesis ROM. Designed for landscape play in iPhone Safari and Android Chrome, with portrait support, a home-screen manifest, touch D-pad / A / B / C / START, keyboard and controller mapping, pause/restart, and save-state download/import.

## Play

https://fenderf4i.github.io/shoresy-browser/

Turn the phone sideways, tap **Play**, then press **START**. An internet connection is needed to load the site. This version does not promise offline play.

Open the emulator menu for pause, restart, save state, or load state. A save state is downloaded to the device; load the same file to resume. On iPhone, look in Files / Downloads. The save defaults to a downloaded file rather than promising that browser storage will survive eviction or private browsing. Accounts, cloud saves, and network multiplayer are outside this version.

Keyboard: arrow keys, A/S/D for Genesis A/B/C, Enter for START. Hardware controllers can be configured in the emulator control menu.

## Source integrity

The attached `.md` is a Mega Drive binary, not a Markdown document. It is published as `.bin` with **no byte changes**.

- Size: 3,145,728 bytes
- SHA-256: `b6737382c9c28800066403fd85b4a030b378f2aba3f692dd2c028dc17b365f50`
- Version: user-supplied Standard 1.10
- Header base-game credit: JKline3 & von Ozbourne

The original attachment is never edited. See `site/roms/provenance.json`.

## Emulator

EmulatorJS **4.2.3**, with the official Genesis Plus GX WebGL1 and WebGL2 core archives, is served locally from `site/emulator/`. Threading is disabled to work without COOP/COEP headers on GitHub Pages. Upstream scripts and licenses are preserved; matching upstream source is included. The emulator may check its upstream CDN for an update notification, but game loading does not require a CDN-hosted script or core.

See the site's [credits](site/credits.html), [upstream EmulatorJS](https://github.com/EmulatorJS/EmulatorJS/tree/v4.2.3), and [Genesis Plus GX fork](https://github.com/EmulatorJS/Genesis-Plus-GX). Emulator software licensing does not grant rights to the supplied ROM or character artwork.

## Development and deployment

No package installation or build step is required. With Node 18 or newer:

```text
node tools/serve.cjs
node tools/verify.cjs http://127.0.0.1:4186/shoresy-browser/
```

Preview uses the same `/shoresy-browser/` subdirectory as GitHub Pages. It binds only to 127.0.0.1. After intentional asset changes, run `node tools/checksums.cjs`, then `node tools/verify.cjs` before committing.

Push `main` to run `.github/workflows/pages.yml`. The workflow verifies every asset and the exact ROM hash, then publishes only `site/`. GitHub Pages must be configured with **GitHub Actions** as its build source.

Verbose emulator diagnostics: append `?debug` to the URL. Normal play uses the pinned minified scripts.

## Verification

See [VALIDATION.md](VALIDATION.md). Desktop browser checks and phone-sized layout checks do not substitute for physical iPhone / Android testing.
