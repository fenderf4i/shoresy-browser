/* Independent browser Gamepad API check. Controller data stays on the device. */
(() => {
  'use strict';
  const dialog = document.querySelector('#controller-dialog');
  const status = document.querySelector('#controller-status');
  const list = document.querySelector('#controller-list');
  let timer;
  function update() {
    let pads;
    try {
      if (!navigator.getGamepads) throw new Error('This browser does not provide controller access.');
      pads = Array.from(navigator.getGamepads()).filter(Boolean);
    } catch (error) {
      status.textContent = error.message;
      list.replaceChildren();
      return;
    }
    status.textContent = pads.length ? 'Your browser detects a controller.' : 'No controller is visible to this browser yet. Keep this page active and press a button on the controller.';
    list.replaceChildren(...pads.map(pad => {
      const item = document.createElement('li');
      const active = pad.buttons.flatMap((button, index) => button.pressed ? [index + 1] : []);
      const axes = pad.axes.map((axis, index) => Math.abs(axis) > 0.2 ? `stick axis ${index + 1}: ${axis.toFixed(2)}` : '').filter(Boolean);
      item.textContent = `${pad.id} · slot ${pad.index} · ${pad.mapping === 'standard' ? 'standard mapping' : 'custom mapping'} · ${pad.buttons.length} buttons. ${active.length ? `Pressed: ${active.join(', ')}.` : 'No buttons pressed.'} ${axes.join(' · ')}`;
      return item;
    }));
  }
  document.querySelector('#controller-check-button').addEventListener('click', () => {
    document.querySelector('#help-dialog').close();
    dialog.showModal();
    update();
    clearInterval(timer);
    timer = setInterval(update, 100);
  });
  document.querySelector('#close-controller-check').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => clearInterval(timer));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
})();
