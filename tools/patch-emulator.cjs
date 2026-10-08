// Keep the pinned minified bundle in sync with readable controller and menu fixes.
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const file = path.resolve(__dirname, '../site/emulator/emulator.min.js');
let source = fs.readFileSync(file, 'utf8');
const patches = [
  ['if(this.gamepadLabels){for(let e=0;e<this.gamepadSelection.length;e++)if(""===this.gamepadSelection[e]){this.gamepadSelection[e]=this.gamepad.gamepads[t.gamepadIndex].id+"_"+this.gamepad.gamepads[t.gamepadIndex].index;break}this.updateGamepadLabels()}', 'if(this.gamepadLabels){const pad=this.gamepad.gamepads.find(p=>p.index===t.gamepadIndex);if(!pad)return;const selection=pad.id+"_"+pad.index;if(this.gamepadSelection.includes(selection))return;for(let e=0;e<this.gamepadSelection.length;e++)if(""===this.gamepadSelection[e]){this.gamepadSelection[e]=selection;break}this.updateGamepadLabels()}'],
  ['this.gamepad.on("buttonup",this.gamepadEvent.bind(this))', 'this.gamepad.on("buttonup",this.gamepadEvent.bind(this)),this.gamepad.gamepads.forEach(p=>this.gamepad.dispatchEvent("connected",{gamepadIndex:p.index}))'],
  ['gamepadEvent(t){if(!this.started)return;const e=this.gamepadSelection.indexOf(this.gamepad.gamepads[t.gamepadIndex].id+"_"+this.gamepad.gamepads[t.gamepadIndex].index);', 'gamepadEvent(t){if(!this.started)return;const pad=this.gamepad.gamepads.find(p=>p.index===t.gamepadIndex);if(!pad)return;const e=this.gamepadSelection.indexOf(pad.id+"_"+pad.index);']
  ,["this.createBottomMenuBarListeners=()=>{const t=t=>{\"touch\"!==t.pointerType&&this.started&&!e&&document.pointerLockElement!==this.canvas&&(this.isPopupOpen()||n())},i=t=>{if(!this.started||e||document.pointerLockElement===this.canvas)return;if(this.isPopupOpen())return;const i=t.movementX,s=t.movementY,o=this.elements.menu.offsetHeight+30;if(t.clientY>=window.innerHeight-o)return void n();let a=Math.atan2(s,i)*(180/Math.PI);a<0&&(a+=360),a<85||a>95||n()};this.menu.mousemoveListener&&this.removeEventListener(this.menu.mousemoveListener),\"downward\"===(this.preGetSetting(\"menubarBehavior\")||\"downward\")?this.menu.mousemoveListener=this.addEventListener(this.elements.parent,\"mousemove\",i):this.menu.mousemoveListener=this.addEventListener(this.elements.parent,\"mousemove\",t),this.addEventListener(this.elements.parent,\"click\",t)},","this.createBottomMenuBarListeners=()=>{},"],
  ["this.menu.open(),this.isSafari&&this.isMobile","this.menu.close(),this.isSafari&&this.isMobile"],
  ["this.touch||this.hasTouchScreen){const t=this.createElement(\"div\");let e;t.innerHTML=","true){const t=this.createElement(\"button\");let e;t.type=\"button\",t.setAttribute(\"aria-label\",\"Game menu\"),t.innerHTML="],
  ["t.style.display=\"\",matchMedia(\"(pointer:fine)\").matches&&\"visible\"!==this.getSettingValue(\"menu-bar-button\")&&(t.style.opacity=0,this.changeSettingOption(\"menu-bar-button\",\"hidden\",!0))","t.style.display=\"\",t.style.opacity=\"\""],
  ["this.elements.menuToggle.style.opacity=\"visible\"===e?.5:0","this.elements.menuToggle.style.opacity=1"],
  ["c(this.localization(\"Menubar Mouse Trigger\"),\"menubarBehavior\",{downward:this.localization(\"Downward Movement\"),anywhere:this.localization(\"Movement Anywhere\")},\"downward\",v,!0),",""],
  ["c(this.localization(\"Menu Bar Button\"),\"menu-bar-button\",{visible:this.localization(\"visible\"),hidden:this.localization(\"hidden\")},\"visible\",t,!0),",""]
];
for (const [before, after] of patches) {
  if (source.includes(after)) continue;
  assert.equal(source.split(before).length - 1, 1, 'Upstream bundle changed; review the patch');
  source = source.replace(before, after);
}
fs.writeFileSync(file, source);
console.log('Controller and button-only menu fixes applied to EmulatorJS 4.2.3 bundle.');
