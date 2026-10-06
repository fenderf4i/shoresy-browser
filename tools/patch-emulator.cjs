// Keep the pinned minified bundle in sync with readable controller fixes.
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const file = path.resolve(__dirname, '../site/emulator/emulator.min.js');
let source = fs.readFileSync(file, 'utf8');
const patches = [
  ['if(this.gamepadLabels){for(let e=0;e<this.gamepadSelection.length;e++)if(""===this.gamepadSelection[e]){this.gamepadSelection[e]=this.gamepad.gamepads[t.gamepadIndex].id+"_"+this.gamepad.gamepads[t.gamepadIndex].index;break}this.updateGamepadLabels()}', 'if(this.gamepadLabels){const pad=this.gamepad.gamepads.find(p=>p.index===t.gamepadIndex);if(!pad)return;const selection=pad.id+"_"+pad.index;if(this.gamepadSelection.includes(selection))return;for(let e=0;e<this.gamepadSelection.length;e++)if(""===this.gamepadSelection[e]){this.gamepadSelection[e]=selection;break}this.updateGamepadLabels()}'],
  ['this.gamepad.on("buttonup",this.gamepadEvent.bind(this))', 'this.gamepad.on("buttonup",this.gamepadEvent.bind(this)),this.gamepad.gamepads.forEach(p=>this.gamepad.dispatchEvent("connected",{gamepadIndex:p.index}))'],
  ['gamepadEvent(t){if(!this.started)return;const e=this.gamepadSelection.indexOf(this.gamepad.gamepads[t.gamepadIndex].id+"_"+this.gamepad.gamepads[t.gamepadIndex].index);', 'gamepadEvent(t){if(!this.started)return;const pad=this.gamepad.gamepads.find(p=>p.index===t.gamepadIndex);if(!pad)return;const e=this.gamepadSelection.indexOf(pad.id+"_"+pad.index);']
];
for (const [before, after] of patches) {
  if (source.includes(after)) continue;
  assert.equal(source.split(before).length - 1, 1, 'Upstream bundle changed; review the patch');
  source = source.replace(before, after);
}
fs.writeFileSync(file, source);
console.log('Controller fixes applied to EmulatorJS 4.2.3 bundle.');
