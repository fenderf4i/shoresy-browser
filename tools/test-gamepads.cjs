// Isolated regression checks, with simulated Gamepad API snapshots (no browser).
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../site/emulator');
const handler = fs.readFileSync(path.join(root, 'src/gamepad.js'), 'utf8');
function run(name, filename, bundled = false) {
  let code = fs.readFileSync(filename, 'utf8');
  if (bundled) {
    const start = code.indexOf('class EmulatorJS{');
    const end = code.indexOf('window.EmulatorJS=EmulatorJS', start);
    assert.ok(start >= 0 && end > start);
    code = code.slice(start, end) + ';window.EmulatorJS=EmulatorJS;';
  }
  for (const initialSlot of [0, 1, 3]) {
    const pad = (index, pressed = false) => ({ index, id: `Test pad ${index}`, axes: [0, 0], buttons: [{pressed:false}, {pressed:false}, {pressed}] });
    let browserPads = Array(initialSlot + 1).fill(null);
    browserPads[initialSlot] = pad(initialSlot);
    const context = vm.createContext({ window: {}, navigator: {getGamepads:()=>browserPads}, setTimeout:()=>1, clearTimeout:()=>{}, console });
    vm.runInContext(handler, context);
    context.GamepadHandler = context.window.GamepadHandler;
    vm.runInContext(code, context);
    const engine = Object.create(context.window.EmulatorJS.prototype);
    const element = () => ({style:{}, parentElement:{style:{}}, appendChild(){}, setAttribute(){}});
    Object.assign(engine, {
      elements:{parent:element()}, game:element(), createElement:element,
      createPopup:element, localization:text=>text, addEventListener:()=>[],
      createContextMenu(){}, createBottomMenuBar(){}, createCheatsMenu(){}, createNetplayMenu(){}, setVirtualGamepad(){},
      createControlSettingMenu(){this.gamepadLabels=Array.from({length:4},element);this.gamepadSelection=['','','',''];}
    });
    engine.bindListeners();
    assert.equal(engine.gamepadSelection[0], `Test pad ${initialSlot}_${initialSlot}`, `${name}: preconnected slot ${initialSlot} must be assigned`);
    let inputs = [];
    Object.assign(engine, {
      started:true, settingsMenu:{style:{display:'none'}}, isPopupOpen:()=>false,
      controlPopup:{parentElement:{parentElement:{getAttribute:()=>''}}},
      controls:{0:{8:{value2:'BUTTON_3'}},1:{8:{value2:'BUTTON_3'}},2:{},3:{}},
      gameManager:{simulateInput:(...args)=>inputs.push(args)}
    });
    browserPads[initialSlot] = pad(initialSlot, true);
    engine.gamepad.updateGamepadState();
    assert.deepEqual(inputs.pop(), [0,8,1], `${name}: press must reach Player 1`);
    browserPads[initialSlot] = pad(initialSlot);
    engine.gamepad.updateGamepadState();
    assert.deepEqual(inputs.pop(), [0,8,0], `${name}: release must reach Player 1`);
    const nextSlot = initialSlot + 2;
    browserPads[nextSlot] = pad(nextSlot);
    engine.gamepad.updateGamepadState();
    assert.equal(engine.gamepadSelection[1], `Test pad ${nextSlot}_${nextSlot}`, `${name}: hotplug with a slot gap`);
    browserPads[nextSlot] = pad(nextSlot, true);
    engine.gamepad.updateGamepadState();
    assert.deepEqual(inputs.pop(), [1,8,1], `${name}: sparse Player 2 input`);
    browserPads[initialSlot] = null;
    engine.gamepad.updateGamepadState();
    assert.equal(engine.gamepadSelection[0], '', `${name}: disconnect clears assignment`);
    browserPads[initialSlot] = pad(initialSlot);
    engine.gamepad.updateGamepadState();
    assert.equal(engine.gamepadSelection[0], `Test pad ${initialSlot}_${initialSlot}`, `${name}: reconnect works`);
    assert.doesNotThrow(()=>engine.gamepadEvent({gamepadIndex:999,type:'buttondown',label:'BUTTON_3'}));
  }
  console.log(`PASS ${name}: preconnected, sparse slots, presses/releases, hotplug, disconnect/reconnect.`);
}
run('readable source', path.join(root, 'src/emulator.js'));
run('production bundle', path.join(root, 'emulator.min.js'), true);
