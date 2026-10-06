# Verification record

## Standard Beta19 update - 2026-10-06

- Replaced the previous Standard 1.10 ROM with the exact standard Beta19 build, without modifying its binary contents.
- SHA-256: `20c98d314a4655d72067cd09ac3cac13f9d28b1d3f4dc132cc26989745b05da0`; size: 3,145,728 bytes.
- Local verification and HTTP verification passed for all 33 assets. JavaScript syntax and Git whitespace checks passed.
- A fresh Edge browser session rendered the Bulldogs/NOSHO startup artwork.
- GitHub Pages deployment of commit `a7970d85ad14fb3c1cfe5aafbad9395fb08a0799` succeeded: https://github.com/fenderf4i/shoresy-browser/actions/runs/37459972757
- HTTPS verification passed for every published runtime asset, including the exact Beta19 ROM. The live page visibly identifies Standard Beta19 and renders the custom boot artwork. A local screenshot is retained at `qa/beta19/published-beta19.png`.
- This update's Edge browser check confirms startup artwork; reaching the team menu and gameplay in the hosted Beta19 session is not separately confirmed.
- The source Beta19 build's separate Genesis Plus GX regression evidence confirms Sudbury as the default Home team and Winnipeg as Away, all 33 team selections, and responsive gameplay. This is source-build evidence, separate from the website checks.
- The previous website build remains recoverable at Git commit `c533e374d5c04ca9352a3cb248e00241729b4b26`.
- New ROM URL, game ID, and script version prevent reuse of the previous ROM cache. Existing save states are not migrated or verified against Beta19.

## Confirmed before publication

- The attachment is a 3 MiB binary with a SEGA GENESIS header.
- The served `.bin` matches the original SHA-256 exactly.
- EmulatorJS 4.2.3 and both Genesis Plus GX core variants are pinned and locally hosted.
- The custom NOSHO startup screen renders in Chromium browser testing.
- The Shoresy title, game setup, announcer introduction, and a live NHL match render.
- The on-screen START and C buttons advance the ROM menus; the emulator Pause and Play controls pause and resume.
- At 844 x 390, the landscape D-pad and A/B/C occupy the side margins; START remains reachable below the game.
- At 667 x 375, the landscape screen and controls fit within the viewport.
- At 393 x 852, the portrait screen and controls fit without horizontal scrolling.
- Touch controls can be switched off and back on at 393 x 852 without distorting the game; disabling them removes the lower control area. At 1280 x 800, disabling them also recalculates the viewport correctly.
- GitHub Actions deployment completed successfully: https://github.com/fenderf4i/shoresy-browser/actions/runs/37455835374
- Every published runtime asset matches its local SHA-256 over HTTPS, including the unchanged ROM.
- The public GitHub Pages site boots to the custom Shoresy title in browser testing.

## Remaining checks

- Restart and save-state export/import. Automated download observation timed out in the local browser sessions; save restoration is not verified.
- Physical iPhone Safari and Android Chrome: multitouch while skating, audio after Play, rotation/browser chrome, download/import via Files, controller pairing, and interruption/reopening.

This record distinguishes browser execution from physical-device verification. No physical phone testing has been claimed.

## Standard Release1.0 -2026-10-06

- Exact standard Release1.0 ROM: 3,145,728 bytes; SHA256 `14c0990fbe2afdf121a30e9198f7b8c9cf0b05eca3f6f562f642fc8e50514290`.
- New release labels, ROM URL, script version and game ID; prior Beta19 remains recoverable at commit `169d51daee15f0e312874aeb7d579c122bcce1e7`.
- Source-build Genesis Plus GX checks pass in both versions: Home/Away/mirror/NHL-only preview mappings across26 shared slots, Brett last in the14-player menu mapping, all14 actual player-card portraits pixel-identical, original card order/wrap,15 simulated seconds of default-team gameplay and responsive pause. These are source-build emulator tests, separate from web browser/hardware testing.
