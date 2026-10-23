import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let source = html.match(/<script>([\s\S]*?)<\/script>/)[1];
source = source.replace('\n})();', `
  globalThis.game = {
    setup: function(target, context) { canvas = target; ctx = context; state = 'playing'; },
    resize: resizeGameCanvas, coords: canvasCoords,
    addIon: function(ion) { niIons.push(ion); },
    ion: function() { return new NiIon(); },
    dimensions: function() { return {width:CANVAS_W,height:CANVAS_H}; }
  };
})();`);
const compact = {matches:true};
const sandbox = {
  window:{matchMedia:()=>compact, devicePixelRatio:3},
  document:{readyState:'loading',addEventListener() {}},
  localStorage:{getItem:()=>null}
};
vm.runInNewContext(source, sandbox);
let rect = {left:6, top:100, width:378, height:646};
let transform;
const canvas = {getBoundingClientRect:()=>rect};
sandbox.game.setup(canvas, {setTransform(...args) {transform=args;}});
sandbox.game.resize();
assert.equal(canvas.width,1134);
assert.equal(canvas.height,1938);
assert.equal(sandbox.game.dimensions().width,480);
let center=sandbox.game.coords(195,423);
assert.equal(center.x,240);
assert.equal(center.y,sandbox.game.dimensions().height/2);
assert.equal(transform[0],canvas.width/480);
const ion = sandbox.game.ion();
ion.x=240;ion.y=sandbox.game.dimensions().height/2;
sandbox.game.addIon(ion);
const oldY=ion.y;
ion.update(1);
assert.ok(Math.abs((ion.y-oldY)/sandbox.game.dimensions().height-1/500)<1e-9);
ion.y=oldY;
rect={left:6,top:62,width:826,height:256};
sandbox.game.resize();
assert.equal(sandbox.game.dimensions().width,800);
assert.equal(ion.x,400);
assert.equal(ion.y,sandbox.game.dimensions().height/2);
compact.matches=false;rect={left:0,top:0,width:822,height:513.75};
sandbox.game.resize();
assert.equal(sandbox.game.dimensions().width,800);
assert.equal(sandbox.game.dimensions().height,500);
center=sandbox.game.coords(411,256.875);
assert.equal(center.x,400);assert.equal(center.y,250);
console.log('PASS: high-density canvas scaling, tap coordinates, portrait-to-landscape position preservation, consistent fall duration, desktop dimensions.');
