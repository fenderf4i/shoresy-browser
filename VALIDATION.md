# Verification record

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
- GitHub Actions deployment completed successfully: https://github.com/fenderf4i/shoresy-browser/actions/runs/37455835374
- Every published runtime asset matches its local SHA-256 over HTTPS, including the unchanged ROM.
- The public GitHub Pages site boots to the custom Shoresy title in browser testing.

## Remaining checks

- Restart and save-state export/import. Automated download observation timed out in the local browser sessions; save restoration is not verified.
- Physical iPhone Safari and Android Chrome: multitouch while skating, audio after Play, rotation/browser chrome, download/import via Files, controller pairing, and interruption/reopening.

This record distinguishes browser execution from physical-device verification. No physical phone testing has been claimed.
