# Release 1.07 — Smooth NOSHO pregame background

Both formats passed exact live tile/palette checks across eight team-role cases, all twelve native random outcomes, six complete conversations covering each announcer pair, portraits and timings, save/load, native gameplay transitions and clocks, unchanged team-selection pixels, scoped byte audit, independent rebuilds and clean-source IPS roundtrips. Physical devices were not newly tested.

# Release 1.06 — Winter evening arena

Both Standard and Widescreen passed eight total native matchups, ten-minute menu idles, exact menu save/load, gameplay clocks and pause/resume. The arena-only byte audit, unchanged UI/team palettes and overlay map, identical header backplate pixels, reset gameplay palettes and unchanged BROdude logo tiles passed. Independent builds and clean-source IPS roundtrips match. Physical devices were not newly tested.

# Release 1.05 — BROdude broadcast logo

- Standard/Widescreen native home, away, both-Bulldogs and NHL-only starts passed (8 matchups, 40 captured stages). Live logo tiles, unchanged HUD maps, period/timer/frame glyphs and palettes checked. Running clocks, pause/resume and exact save-state roundtrips passed.
- Both ROMs differ from 1.04 only within the 14 logo tiles and checksum (297 changed bytes each). All game code and other assets preserved. Independent rebuilds and clean-source IPS roundtrips pass.
- Native gameplay screenshots included. Physical MiSTer, iPhone and Android testing is not newly claimed.
- Both standalone ROMs and a ROM-only ZIP delivered in chat; future releases retain this delivery convention.

---

# Browser menu update — 2026-10-07

- Source and production-bundle menu regressions pass: bottom movement, clicks, touch starts and legacy mouse-trigger settings keep the menu closed; explicit toggle opens it. Old hidden-button settings cannot hide the only menu access. Existing controller-routing checks pass.
- Browser preview checked at desktop size and 390×844 portrait: bottom taps keep the menu closed, the top-right button opens it, touch START responds, touch controls remain visible, and Pause/Play work through the menu. Physical phones were not newly tested.
- Release 1.04 ROM bytes and game ID are unchanged. Emulator/script cache versions are updated; local asset verification passes.

---

# Release 1.04 — interview guest exclusion

- 192 native CPU edge cases across both formats passed, including forced guest selections, home/away hot/cold, other-pair/team guards and preserved native scratch/cursors/registers. These use an isolated test-only trampoline.
- 40 complete unmodified production conversations passed: all Jory scripts in each Bulldogs role plus existing-pair and NHL-only controls; name filtering, native text, portraits, timing, save/load and gameplay checks passed.
- 768 actual game starts produced 355 fights (46.22%); every result matched the native 50% rule. All 18 full popup/fight checks passed.
- Exact private rebuilds and clean-source IPS roundtrips passed; all dialogue, art, roster, ratings and brawl/RNG bytes are unchanged from 1.03. Actual 1.04 videos recorded with native game audio. Physical devices not newly tested.

Full evidence: private outputs/Bulldogs_NHL26_Release_1_04.

---

# Release1.03 — Jory interviews and lumber opener

- 88 full native conversations across both formats and all matchup roles passed: complete text/sequence, correct portraits and exact RAM/CRAM palettes, timing, fixed selection, save/load and A/C/Start/gameplay.
- 1536 actual production starts produced 726 fights (47.27%). Every start matched its 50% native draw. All twelve conversation choices were exercised per eligible role/version; NHL-only games excluded Jory and the fight.
- All 18 full fight/no-fight checks passed, including advance/skip, save/load, five wins/celebrations, unchanged game state, graphics/actor/map restoration and resumed play.
- Both private rebuilds and clean-source IPS roundtrips are byte-identical. Every-byte scope audit preserves all eight old scripts, native brawl/draw code, roster, ratings and other artwork. Approved popup matches prototype 03 exactly.
- Actual1.03 native interview and fight videos recorded with game audio. Physical devices not newly tested.

Full evidence: private `outputs/Bulldogs_NHL26_Release_1_03`. Hosted integrity: `site/roms/provenance.json`.

---

# Release 1.02 — five-skater pregame brawl

- 1536 actual production game starts across both versions and three Bulldogs matchup roles: 726 brawls (47.27%), every outcome matched its native 50% draw.
- All eight announcer choices exercised in every role/version; dialogue/routing bytes retained from Release 1.01.
- All 52 native runtime scenarios passed: five wins, mixed/staggered celebrations, facing/mirroring, goalie preservation, skips, save/load, restoration of actors, colors, faceoff map, and normal clock advancement. NHL-only exclusion passed.
- Byte audit: approved choreography identical; only probability threshold and checksum differ from the review ROM. Native fight engine/player loader unchanged. Maximum Jim fighting verified through native loading using a separate lineup-only fixture.
- Standard/Widescreen ROMs and clean-source IPS patches reproduce byte-for-byte; IPS roundtrips pass.
- Actual Release 1.02 video includes audio and return to normal play. Physical devices were not newly tested by these checks.

Release artifacts and complete evidence: private `outputs/Bulldogs_NHL26_Release_1_02`.
Public runtime integrity: `site/roms/provenance.json`.

---

# Release 1.01 - random pregame conversations (2026-10-06)

- Eight native choices: the original plus three approved additions for each pair. Every active conversation is free of swearing. Original wording is retained except profanity removal; the original French sequence is preserved.
- Both exact Release 1.00 source ROMs remain unchanged. New filenames follow Standard/Widescreen-1.01. Each new build is 3,145,728 bytes; all changes are guarded to pregame dialogue/routing/selection/timing slots and checksum.
- A second build through the private repository wrapper reproduces Standard/Widescreen MD, clean-source IPS and Build_Report byte-for-byte. IPS roundtrips pass.
- Actual Genesis Plus GX runs: **64 complete conversations** (8 choices x 4 matchup roles x 2 versions). Sudbury home, away, same-team and NHL-only all pass. Same-team scripts show 18 turns; other matchups show 20.
- **512 native RNG draws** from menu wait variations exercise every choice in every version/role. No forced selection, modified RAM or diagnostic ROM is used. The selection remains fixed through playback and save-state restore.
- Every active spoken text continuation remains within its selected paragraph. Leading player substitutions receive a compiler blank to avoid the native offset-zero truncation bug; approved visible wording is unchanged.
- Native word/punctuation timing, speaker-change pauses, VRAM banks, live/RAM palettes and portrait frame checks pass. A/C retain portrait state. All **16 independent early-skip checks** reach actual gameplay.
- Sixteen full home conversations were captured using the core's correct RGB565 output conversion. Contact sheets and selected full paragraphs were visually reviewed, including both approved Benny replacements and the Anik statistics exchange.
- Website asset hashes, exact final Standard ROM hash and both controller regression suites pass locally and over the local HTTP preview. The 1.01 page starts in Edge. Existing controller fixes and touch/aspect CSS are retained.
- Physical MiSTer, iPhone and Android validation remains a user check. Browser startup and native emulator verification do not establish physical-device testing.

The full private release evidence is in `outputs/Bulldogs_NHL26_Release_1_01/Validation` of the Shoresy ROM repository. The public website ships the exact verified Standard bytes; see `site/roms/provenance.json`.

---

# Verification record

## Controller detection fixes, 2026-10-06

- Readable and production EmulatorJS builds pass simulated Gamepad API regression checks: controllers connected before startup in browser slots 0, 1, and 3; hotplug with gaps; button presses and releases routed to the correct player; disconnect and reconnect; stale input events.
- Edge opens the independent controller check. It reports browser visibility separately from the emulator's Player 1 assignment.
- The user's physical 8BitDo controller remains pending a check with this updated version; simulated regression checks do not establish hardware compatibility.

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
