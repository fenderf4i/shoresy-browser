// Exercise real source/bundle menu handlers without loading a game core.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../site/emulator');
for (const [name, file, bundled] of [['source','src/emulator.js',false], ['bundle','emulator.min.js',true]]) {
  let code = fs.readFileSync(path.join(root,file),'utf8');
  if (bundled) code = code.slice(code.indexOf('class EmulatorJS{'),code.indexOf('window.EmulatorJS=EmulatorJS')) + ';window.EmulatorJS=EmulatorJS;';
  const context = vm.createContext({window:{}, document:{}, setTimeout:()=>1, clearTimeout(){}});
  vm.runInContext(code,context);
  for (const trigger of ['downward','anywhere']) {
    const built = Symbol('menu constructed'), listeners = [];
    const engine = Object.create(context.window.EmulatorJS.prototype);
    const classes = new Set();
    Object.assign(engine, {
      started:true, elements:{parent:{appendChild(){throw built;}}}, on(){}, preGetSetting:()=>trigger,
      isPopupOpen:()=>false,
      addEventListener:(target,events,callback)=>{listeners.push({events,callback});},
      createElement:()=>({style:{}, classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c),toggle:c=>classes.has(c)?classes.delete(c):classes.add(c)}})
    });
    assert.throws(()=>engine.createBottomMenuBar(),e=>e===built);
    engine.handleSpecialOptions('menubarBehavior',trigger);
    engine.createBottomMenuBarListeners();
    for (const type of ['mousemove','click','mousedown','touchstart']) {
      for (const listener of listeners.filter(l=>l.events.split(' ').includes(type))) {
        listener.callback({pointerType:type==='touchstart'?'touch':undefined, clientY:99999, movementX:0, movementY:100});
      }
      assert.ok(classes.has('ejs_menu_bar_hidden'),`${name}: ${type} must not reveal the menu`);
    }
    engine.menu.toggle();
    assert.ok(!classes.has('ejs_menu_bar_hidden'),`${name}: explicit toggle opens menu`);
    engine.menu.close();
    assert.ok(classes.has('ejs_menu_bar_hidden'),`${name}: menu can close`);
    assert.equal(listeners.length,0,`${name}: saved movement settings must not attach auto-reveal listeners`);
    engine.elements.menuToggle = {style:{}};
    engine.handleSpecialOptions('menu-bar-button','hidden');
    assert.equal(engine.elements.menuToggle.style.opacity,1,`${name}: old hidden-button settings must not hide the only menu access`);
  }
  console.log(`PASS ${name}: bottom movement, clicks, touch starts, legacy settings and explicit menu toggle.`);
}
