(function(){
'use strict';
const SPRITES={
 dagger:["....22..........","...2222.........","...24422........","....24422.......",".....24422......","......2442......","......2442......","......2442......","......2442......","......2332......","......2332......","......2332......","......2332......","......2332......","......1111......",".......11......."],
 greatsword:["......22........",".....2442.......","....244442......","...24444442.....","...244444442....","....2444442.....",".....244442.....","......24442.....",".......2442.....",".......2442.....",".......2442.....",".......2332.....","......233332....",".....1111111....",".......11.......",".......11......."],
 lance:["......22........",".....2442.......","....244442......","......2442......","......2442......","......2442......","......2442......","......2442......","......2442......","....3333333.....",".....33333......","......2332......","......2332......","......2332......",".....11111......",".......11......."],
 hammer:["...2222222......","..244444442.....","..244444442.....","..244444442.....","..244444442.....","...2222222......","......2442......","......2442......","......2442......","......2332......","......2332......","......2332......",".....11111......",".....11111......",".......11.......",".......11......."],
 dual:["..22......22....",".2442....2442...","..2442..2442....","...24422442.....","....244442......",".....2442.......",".....2442.......","..22..2442..22..",".2442.2442.2442.","..244244422442..","...2444444442...","....23322332....","....23322332....","....11111111....","......11........","......11........"],
 bow:["....22..........","...24422........","..2444442.......",".2442..2442.....","..22....2442....",".........2442...","....222222442...","..22444444442...","....222222442...",".........2442...",".........2442...",".........2332...",".........2332...","........11111...","..........11....","..........11...."],
 helm:[".....333333.....","....34444443....","...3442222443...","..344222222443..","..342266662243..","..342666666243..","..344266662443..","...3444444443...","....33333333....","......11........","................","................","................","................","................","................"],
 chest:["....33333333....","...3444444443...","..344422224443..","..342266666243..","..342666666243..","..342666666243..","..342666666243..","..344266662443..","...3444444443...","....33444433....",".....344443.....",".....344443.....",".....333333.....","................","................","................"],
 arms:["....33....33....","...3443..3443...","..344443344443..","..3422233222243.","..34266..66243..","..34266..66243..","..34266..66243..","...3423..3243...","....333..333....",".....11..11.....","................","................","................","................","................","................"],
 waist:["....33333333....","...3444444443...","..344422224443..","...3336666333...","..344666666443..","..342266662243..","...3333333333...","....11111111....","................","................","................","................","................","................","................","................"],
 legs:["....33333333....","...3444444443...","...3334444333...",".....342243.....",".....342243.....","....34422443....","....342..243....","....342..243....","....342..243....","....342..243....","....333..333....","....111..111....","...1111..1111...","................","................","................"],
 charm:["......33........",".....3443.......","....342243......",".....3443.......","......33........","......33........",".....3223.......","....324423......",".....3443.......","......33........","................","................","................","................","................","................"]
};
const PAL={
 bone:{1:'#201712',2:'#7a6353',3:'#b49474',4:'#e7d6b8',6:'#fff2cf'},
 wolf:{1:'#10171c',2:'#2c3c48',3:'#4f6878',4:'#91afc0',6:'#e6f4ff'},
 blaze:{1:'#1a0b08',2:'#541410',3:'#952419',4:'#dd4b25',6:'#ffc66f'},
 frost:{1:'#0b1217',2:'#234657',3:'#4b7b91',4:'#86d2f1',6:'#effdff'},
 storm:{1:'#151108',2:'#51420f',3:'#8c7419',4:'#e0c94c',6:'#fff4a7'},
 dragon:{1:'#11090b',2:'#401318',3:'#7a2028',4:'#bd303a',6:'#e0b45b'},
 abyss:{1:'#10070c',2:'#430d20',3:'#761433',4:'#c63d69',6:'#ffd3df'},
 astral:{1:'#0d0e1e',2:'#29245e',3:'#6052c5',4:'#90adff',6:'#f2fdff'},
 tide:{1:'#0b1218',2:'#15485f',3:'#2676a1',4:'#6fc9ed',6:'#dcfbff'},
 star:{1:'#151018',2:'#544466',3:'#836bab',4:'#c0a9ff',6:'#fff0bd'},
 horn:{1:'#15100c',2:'#5b3e2f',3:'#94694d',4:'#c89262',6:'#f8d9a1'},
 none:{1:'#15110e',2:'#513827',3:'#82583b',4:'#c58a5d',6:'#ffe4ae'}
};
function type(g){
 if(!g)return 'dagger';
 if(g.slot==='weapon'){
  const s=((g.id||'')+' '+(g.name||'')).toLowerCase();
  if(/lance|槍/.test(s))return 'lance';
  if(/hammer|槌|戦槌|ブレイカー/.test(s))return 'hammer';
  if(/bow|弓/.test(s))return 'bow';
  if(/dual|双/.test(s))return 'dual';
  if(/small|小刀/.test(s))return 'dagger';
  return 'greatsword';
 }
 return ({head:'helm',chest:'chest',arms:'arms',waist:'waist',legs:'legs',charm:'charm'})[g.slot]||'chest';
}
function palette(g){return PAL[g&&g.set]||PAL[g&&g.element]||PAL.none}
function art(g,size=54){
 const grid=SPRITES[type(g)]||SPRITES.dagger,p=palette(g),scale=4;let rect='';
 for(let y=0;y<grid.length;y++)for(let x=0;x<grid[y].length;x++){const c=grid[y][x];if(c!=='.'&&c!==' ')rect+=`<rect x="${x*scale}" y="${y*scale}" width="${scale}" height="${scale}" fill="${p[c]||p[4]}"/>`;}
 return `<svg class="pixel-sprite" width="${size}" height="${size}" viewBox="0 0 64 64" shape-rendering="crispEdges" aria-hidden="true">${rect}</svg>`;
}
function theme(g){try{return typeof gearTheme==='function'?gearTheme(g):{main:'#49392e',sub:'#17120f',trim:'#745c38'}}catch(_){return {main:'#49392e',sub:'#17120f',trim:'#745c38'}}}
function label(set){try{return typeof setLabel==='function'?setLabel(set):'装備'}catch(_){return '装備'}}
function elem(k){try{return typeof elementInfo==='function'?elementInfo(k):null}catch(_){return null}}
window.renderGearGrid=function(){
 const area=document.getElementById('gearGrid');if(!area)return;area.innerHTML='';
 const list=(Array.isArray(GEAR)?GEAR:[]).filter(g=>g&&g.slot===gearSlot);const crafted=Array.isArray(state.craftedGear)?state.craftedGear:[];const eq=state.equipped||{};
 if(!selectedGear||!list.some(g=>g.id===selectedGear))selectedGear=eq[gearSlot]||list[0]?.id||null;
 list.forEach(g=>{const made=crafted.includes(g.id),equipped=eq[g.slot]===g.id,r=Math.max(1,Math.min(5,Number(g.rarity)||1)),t=theme(g),e=g.slot==='weapon'?elem(g.element||'none'):null,b=document.createElement('button');b.type='button';b.dataset.gear=g.id;b.className=`gear-item r${r} ${selectedGear===g.id?'selected ':''}${made?'':'locked '}${r>=5?'legendary':''}`;b.style.background=`linear-gradient(145deg,${t.sub||'#17120f'},#100d0b)`;b.innerHTML=`<div class="gicon" style="border-color:${t.trim||'#745c38'}">${art(g,64)}${r>=5?'<span class="pixel-spark">✦</span>':''}</div><b>${escapeHtml(g.name||'名称未設定')}</b><div class="gmeta"><span class="tiny-badge rare">${'★'.repeat(r)}</span><span class="tiny-badge set">${label(g.set)}</span>${e?`<span class="tiny-badge power ${e.class||''}">${e.icon||''} ${e.label||''}</span>`:`<span class="tiny-badge power">防御 ${Number(g.defense)||0}</span>`}</div><small>${equipped?'装備中':made?'作成済み':'未作成'}</small>`;area.appendChild(b)});
};
window.renderGearDetail=function(){
 const area=document.getElementById('gearDetail');if(!area)return;const g=typeof gearById==='function'?gearById(selectedGear):null;if(!g){area.innerHTML='<div class="muted">装備を選択してください。</div>';return}
 const crafted=Array.isArray(state.craftedGear)?state.craftedGear:[],eq=state.equipped||{},inv=state.inventory||{},costObj=g.cost||{},skillsObj=g.skills||{},made=crafted.includes(g.id),equipped=eq[g.slot]===g.id,craftable=Object.entries(costObj).every(([m,n])=>(Number(inv[m])||0)>=(Number(n)||0));
 const cost=Object.entries(costObj).map(([m,n])=>`${MATS[m]||m} ${Number(inv[m])||0}/${Number(n)||0}`).join(' ・ ')||'なし';
 const skill=Object.entries(skillsObj).map(([k,v])=>`${k==='xp'?'獲得XP':k==='hardXp'?'高難度XP':k==='material'?'素材率':k} +${Math.round((Number(v)||0)*100)}%`).join(' / '),r=Math.max(1,Math.min(5,Number(g.rarity)||1)),e=g.slot==='weapon'?elem(g.element||'none'):null,t=theme(g);
 area.innerHTML=`<div class="detail-head"><div class="detail-icon ${r>=5?'legendary':''}" style="border-color:${t.trim||'#745c38'}">${art(g,78)}${r>=5?'<span class="pixel-spark">✦</span>':''}</div><div><div class="detail-name">${escapeHtml(g.name||'名称未設定')}</div><div class="stars">${'★'.repeat(r)}${'☆'.repeat(5-r)} ・ ${label(g.set)}</div>${e?`<div><span class="elem-badge ${e.class||''}">${e.icon||''} ${e.label||''}属性</span> 攻撃倍率 ×${(Number(g.power)||1).toFixed(2)}</div>`:`<div>防御力 ${Number(g.defense)||0}</div>`}<div class="skills">${skill||'固有スキルなし'}</div><div class="weapon-flavor">${r>=5?'禍々しい輪郭と輝きを纏った最上位ドット装備。':'狩猟感のある重厚なドット装備。'}</div></div></div><div class="costs">必要素材：${cost}</div><div class="detail-actions"><button class="btn gold" id="craftGear" ${made||!craftable?'disabled':''}>${made?'作成済み':craftable?'作成する':'素材不足'}</button><button class="btn primary" id="equipGear" ${made?'':'disabled'}>${equipped?'装備を外す':'装備する'}</button></div>`;
};
const oldRenderGear=window.renderGear;
window.renderGear=function(){
 if(typeof oldRenderGear==='function')oldRenderGear();
 const slots=document.getElementById('gearSlots');if(slots){slots.innerHTML='';SLOTS.forEach(([k,l])=>{const g=typeof gearById==='function'?gearById(state.equipped?.[k]):null,d=document.createElement('div');d.className='slot-pill'+(g?' filled':'');d.innerHTML=g?`<span class="slot-pixel">${art(g,26)}</span><span><b>${l}</b><br>${escapeHtml(g.name)}</span>`:`<span class="slot-empty">◇</span><span><b>${l}</b><br>—</span>`;slots.appendChild(d)})}
 let show=document.getElementById('pixelShowcase');if(!show){show=document.createElement('div');show.id='pixelShowcase';show.className='pixel-showcase';document.querySelector('.hunter-scene')?.appendChild(show)}show.innerHTML='';['weapon','head','chest'].forEach(k=>{const g=typeof gearById==='function'?gearById(state.equipped?.[k]):null;if(!g)return;const d=document.createElement('div');d.className='showcase-box'+((Number(g.rarity)||1)>=5?' legendary':'');d.innerHTML=art(g,42);show.appendChild(d)});
};
try{if(typeof render==='function')render()}catch(e){console.warn('pixel gear repaint skipped',e)}
})();