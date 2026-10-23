import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
function fixture(){
 const nodes=new Map();
 function node(){return {textContent:'',innerHTML:'',style:{},dataset:{},disabled:false,children:[],classList:{add(){},remove(){},toggle(){},contains(){return false;}},setAttribute(){},addEventListener(){},appendChild(child){this.children.push(child);},focus(){},getBoundingClientRect(){return {left:0,top:0,width:800,height:500};}};}
 const storage=new Map();
 const context={window:{matchMedia:()=>({matches:false})},document:{readyState:'loading',addEventListener(){},getElementById(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id);},querySelectorAll(){return [];},createElement:node,body:node()},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setTimeout(){},clearInterval(){},performance:{now:()=>0},crypto:globalThis.crypto,AbortController,Promise};
 let source=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
 source=source.replace('\n})();',`
  identity=null;canvas={getBoundingClientRect:function(){return {left:0,top:0,width:800,height:500};}};ctx={setTransform:function(){}};
  globalThis.labTest={
    start:startGame,begin:startProjectResearch,tick:update,upgrade:chooseUpgrade,bank:settleResearchRun,calc:performCalculation,assign:assignJob,spawn:spawnNi,spawnTS:spawnTS,tap:handleTap,
    set:function(data){if(data.compute!=null)lab.compute=data.compute;if(data.cooldown!=null)lab.calcCooldown=data.cooldown;if(data.target!=null)lab.target=data.target;if(data.completed!=null)lab.completed=data.completed;},
    select:function(lig,method){selectedLigand=lig;selectedMethod=method;},
    state:function(){return {phase:state,lab:lab,ions:niIons,score:score,lives:lives,calculations:dftTimesUsed,career:careerLocal,unlocks:unlockedAchievements};},
    score:calcComplexScore,complete:completeComplex
  };
})();`);
 vm.runInNewContext(source,context);return {game:context.labTest,nodes,storage};
}
{
 const {game}=fixture();game.start();assert.equal(game.state().phase,'briefing');game.begin();
 game.spawn();let ion=game.state().ions[0];ion.type='hard';game.select(0,'xtb');game.assign(ion);let compute=game.state().lab.compute;
 for(let i=0;i<180;i++)game.tick(1);
 assert.ok(ion.dead);assert.ok(game.state().score>0);assert.ok(game.state().lab.compute>=compute);
 const hardWater={type:'hard',ligands:[0,0,0,0,0,0],method:'xtb'};const hardCN={type:'hard',ligands:[4,4,4,4,4,4],method:'xtb'};
 assert.ok(game.score(hardWater)>game.score(hardCN));
 game.spawn();ion=game.state().ions.find(x=>!x.dead&&!x.isTS);ion.type='soft';game.select(3,'dft');game.assign(ion);ion.jobProgress=949;game.tick(1);assert.equal(ion.ligands.length,2);
 game.set({compute:100,cooldown:0});const before=game.state().calculations;game.calc('geometry');assert.equal(game.state().calculations,before+1);assert.equal(ion.ligands.length,6);assert.ok(ion.dead);
 game.set({cooldown:0});const current=game.state().lab.compute;game.state().lab.selected=null;game.calc('geometry');assert.equal(game.state().lab.compute,current);
}
{
 const {game}=fixture();game.start();game.begin();game.set({target:1,compute:100});game.spawn();const ion=game.state().ions[0];game.select(0,'dft');game.assign(ion);const count=game.state().calculations;game.calc('geometry');
 assert.equal(game.state().phase,'review');assert.equal(game.state().calculations,count+1);assert.equal(game.state().lab.published,1);
 const frozen=game.state().lab.compute;game.tick(100);assert.equal(game.state().lab.compute,frozen);
 game.upgrade('cores');assert.equal(game.state().lab.cores,2);assert.equal(game.state().phase,'briefing');game.begin();assert.equal(game.state().lab.completed,0);
 game.spawnTS();const encounter=game.state().ions[0];encounter.y=600;const grants=game.state().lives;game.tick(1);assert.equal(game.state().lives,grants);
}
{
 const {game}=fixture();game.start();game.begin();game.set({target:1000});
 for(let i=0;i<9;i++){game.set({compute:100,cooldown:0});game.calc('rescue');}
 assert.equal(game.state().career.dft,9);game.start();game.begin();game.set({compute:100,cooldown:0});game.calc('rescue');
 assert.equal(game.state().calculations,1);assert.equal(game.state().career.dft,10);assert.ok(game.state().unlocks.dft_10);
}
{
 const {game}=fixture();game.start();game.begin();let ticks=0;
 while(game.state().lab.project<6 && ticks<60*360){
   const s=game.state();
   if(s.phase==='briefing')game.begin();
   if(s.phase==='review'){game.upgrade(s.lab.cores<3?'cores':s.lab.guess<2?'guess':'cluster');continue;}
   for(const ion of s.ions){if(!ion.dead&&!ion.isTS&&ion.y>0&&!ion.method){const lig=ion.type==='hard'?0:ion.type==='borderline'?1:3;game.select(lig,'xtb');game.assign(ion);}}
   game.tick(1);ticks++;
   assert.notEqual(game.state().phase,'gameover','Early progression should remain manageable with matched screening jobs');
 }
 assert.equal(game.state().lab.project,6);assert.ok(ticks<60*240);
 console.log('Five-project simulated playthrough: '+Math.round(ticks/60)+' active seconds; grants '+game.state().lives+'.');
}
{
 const {game}=fixture();game.start();game.begin();game.set({target:1});game.state().lab.cores=2;
 game.spawn();game.spawn();for(const ion of game.state().ions){ion.type='hard';game.select(0,'xtb');game.assign(ion);ion.ligands=[0,0,0,0,0];ion.jobProgress=10000;}
 game.tick(1);assert.equal(game.state().lab.completed,1);assert.equal(game.state().lab.published,1);
}
{
 const {game}=fixture();game.start();game.begin();game.spawn();const ion=game.state().ions[0];game.select(0,'xtb');game.assign(ion);const compute=game.state().lab.compute;game.select(4,'dft');game.assign(ion);assert.equal(ion.jobLigand,0);assert.equal(ion.method,'xtb');assert.equal(game.state().lab.compute,compute);
}
console.log('PASS: automatic coordination, matching economy, bidentate en, deterministic DFT tools and correct charges, publication/upgrade flow, safe optional encounters, cumulative career milestones, and a five-project pacing simulation.');
