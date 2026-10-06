/* Browser shell for an unmodified Genesis ROM. EmulatorJS is pinned to 4.2.3. */
(() => {
  "use strict";
  const status = document.querySelector("#load-status");
  const gameStatus = document.querySelector("#game-status");
  const toggle = document.querySelector("#touch-toggle");
  const dialog = document.querySelector("#help-dialog");
  const touch = matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0;
  let started = false;

  const setTouchLayout = (enabled) => {
    document.body.classList.toggle("touch-layout", enabled);
    toggle.checked = enabled;
  };
  setTouchLayout(touch);

  document.querySelector("#help-button").addEventListener("click", () => dialog.showModal());
  document.querySelector("#close-help").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  document.querySelector("#retry-button").addEventListener("click", () => location.reload());

  // Documented configuration; the ROM and both graphics core variants are local.
  window.EJS_player = "#game";
  window.EJS_core = "genesis_plus_gx";
  window.EJS_controlScheme = "segaMD";
  window.EJS_gameUrl = "roms/nhl26-shoresy-standard-release-1.0.bin";
  window.EJS_gameName = "NHL26 Shoresy Standard Release 1.0";
  window.EJS_gameID = 26100;
  window.EJS_pathtodata = "emulator/";
  window.EJS_threads = false;
  window.EJS_DEBUG_XX = new URLSearchParams(location.search).has("debug");
  window.EJS_startOnLoaded = false;
  window.EJS_startButtonName = "Play";
  window.EJS_alignStartButton = "center";
  window.EJS_backgroundImage = "../assets/rink.svg";
  window.EJS_backgroundColor = "#101b35";
  window.EJS_color = "#edc34a";
  window.EJS_volume = 0.6;
  window.EJS_language = "en-US";
  window.EJS_disableAutoLang = false;
  window.EJS_defaultOptions = {
    "virtual-gamepad": touch ? "enabled" : "disabled",
    "save-state-location": "download",
    "menu-bar-button": "visible"
  };
  window.EJS_Buttons = {
    playPause: true, restart: true, fullscreen: true, saveState: true, loadState: true,
    settings: true, gamepad: true, volume: true, mute: true,
    cheat: false, netplay: false, screenRecord: false, screenshot: true,
    saveSavFiles: false, loadSavFiles: false, quickSave: false, quickLoad: false,
    cacheManager: false, exitEmulation: false
  };
  window.EJS_defaultControls = {
    0: {
      1: { value: "a", value2: "BUTTON_2" },
      0: { value: "s", value2: "BUTTON_1" },
      8: { value: "d", value2: "BUTTON_3" },
      3: { value: "enter", value2: "START" },
      4: { value: "up arrow", value2: "DPAD_UP" },
      5: { value: "down arrow", value2: "DPAD_DOWN" },
      6: { value: "left arrow", value2: "DPAD_LEFT" },
      7: { value: "right arrow", value2: "DPAD_RIGHT" }
    },
    1: {}, 2: {}, 3: {}
  };
  window.EJS_VirtualGamepadSettings = [
    { type: "dpad", id: "dpad", location: "left", left: "50%", top: "50%", joystickInput: false, inputValues: [4, 5, 6, 7] },
    { type: "button", text: "A", id: "a", location: "right", right: 82, top: 74, bold: true, input_value: 1 },
    { type: "button", text: "B", id: "b", location: "right", right: 40, top: 4, bold: true, input_value: 0 },
    { type: "button", text: "C", id: "c", location: "right", right: 2, top: 74, bold: true, input_value: 8 },
    { type: "button", text: "START", id: "start", location: "center", left: 30, fontSize: 12, block: true, input_value: 3 }
  ];

  window.EJS_ready = () => { status.hidden = true; };
  window.EJS_onGameStart = () => {
    started = true;
    document.body.classList.add("playing");
    gameStatus.textContent = "Press START to hit the ice";
    status.hidden = true;
    document.querySelectorAll(".ejs_virtualGamepad_button").forEach((button) => {
      button.setAttribute("aria-label", button.textContent === "START" ? "Genesis START button" : `Genesis ${button.textContent} button`);
      button.setAttribute("role", "button");
      button.setAttribute("tabindex", "0");
      // Upstream handles real multitouch. Add mouse and keyboard activation for
      // these otherwise touch-only divs, using ordinary mapped keyboard events.
      const keys = { A: ["a", "KeyA", 65], B: ["s", "KeyS", 83], C: ["d", "KeyD", 68], START: ["Enter", "Enter", 13] };
      const key = keys[button.textContent];
      const activate = () => {
        if (!key) return;
        const root = document.querySelector("#game");
        const eventOptions = { key: key[0], code: key[1], keyCode: key[2], which: key[2], bubbles: true, cancelable: true };
        root.dispatchEvent(new KeyboardEvent("keydown", eventOptions));
        // Keep the press across multiple emulated frames, like a finger tap.
        setTimeout(() => root.dispatchEvent(new KeyboardEvent("keyup", eventOptions)), 100);
      };
      button.addEventListener("click", (event) => { if (event.pointerType !== "touch") activate(); });
      button.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); activate(); }
      });
    });
    // Do not use unsupported emulator internals to implement custom controls.
    syncTouchControls();
    // Upstream briefly hides controls during its initial resize animation.
    setTimeout(syncTouchControls, 300);
  };

  function syncTouchControls() {
    const parent = document.querySelector(".ejs_virtualGamepad_parent");
    if (parent && started) parent.style.display = toggle.checked ? "" : "none";
  }
  toggle.addEventListener("change", () => {
    setTouchLayout(toggle.checked);
    window.EJS_defaultOptions["virtual-gamepad"] = toggle.checked ? "enabled" : "disabled";
    syncTouchControls();
    // The canvas container changes size without the browser window changing.
    // Let the emulator recalculate its viewport, then restore control visibility
    // after its brief resize animation.
    window.dispatchEvent(new Event("resize"));
    setTimeout(syncTouchControls, 300);
  });
  window.addEventListener("resize", syncTouchControls);

  function showError(message) {
    status.hidden = true;
    document.querySelector("#error-message").textContent = message;
    document.querySelector("#load-error").hidden = false;
    gameStatus.textContent = "Connection or browser problem";
  }
  window.addEventListener("error", (event) => {
    if (event.filename?.includes("/emulator/") || event.target?.src?.includes("/emulator/")) {
      showError("The emulator couldn’t start. Reload the page, or try a current version of Safari or Chrome.");
    }
  }, true);
  window.addEventListener("unhandledrejection", (event) => {
    if (String(event.reason?.stack || event.reason).includes("/emulator/")) {
      showError("The emulator couldn’t start. Reload the page, or try a current version of Safari or Chrome.");
    }
  });
  // Surface the core's own errors, including failures after the loader succeeds.
  const observer = new MutationObserver(() => {
    const error = document.querySelector(".ejs_error_text");
    if (error) showError(`${error.textContent}. Check your connection and try again in Safari or Chrome.`);
  });
  observer.observe(document.querySelector("#game"), { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });

  const loader = document.createElement("script");
  loader.src = "emulator/loader.js";
  loader.onerror = () => showError("The game files couldn’t be reached. Check your connection, then try again.");
  document.body.appendChild(loader);
})();
