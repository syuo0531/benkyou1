(function(){
'use strict';
const SPRITES={
  dagger:["..2.............",".243............",".2453...........","..2453..........","...2453.........","....2452........","....2452........","....2452........","....2452........","....2352........","....2332........","....2332........","....2332........","....1111........",".....11.........","................"],
  greatsword:[".......22.......","......2452......",".....245552.....","....24566552....","...2456666552...","...2456666652...","....24566652....",".....245552.....","......24552.....",".......2452.....",".......2452.....","......23632.....",".....2336332....","....11111111....","......111.......","......11........"],
  longsword:["........2.......",".......242......","......24542.....",".....2455542....","....245666542...",".....24566542...","......2455542...",".......24542....","........2452....","........2452....","........2452....",".......23632....","......233332....","......111111....","........11......","........11......"],
  dual:[".22........22...","2452......2452..",".2452....2452...","..2452..2452....","...24522452.....","....246652......","....246652......","...24522452.....","..2452..2452....",".2452....2452...","2452......2452..","2352......2352..","1111......1111..",".11........11...","................","................"],
  lance:["........2.......",".......242......","......24642.....",".....2466642....",".......2462.....",".......2462.....",".......2462.....",".......2462.....","..333333666333..","....33366633....","......24662.....","......2462......","......2362......",".....11111......",".......11.......","................"],
  hammer:["..2222222.......",".245666652......","24566666652.....","245666666652....","245666666652....",".2456666652.....","..22366632......",".....2462.......",".....2462.......",".....2462.......",".....2462.......","....23632.......","....23332.......","...111111.......","....1111........",".....11........."],
  scythe:["..222222........",".24566652.......","2456666662......","2456666652......",".24566652.......","...245552.......","....2452........","....2452........","....2452........","....2452........","....2462........","...23632........","..2336332.......","..1111111.......","....111.........",".....11........."],
  bow:["...22...........","..2452..........",".245552.........","245..552........",".22..2452.......",".....24552......","...2456652......",".2456666662.....","...2456652......",".....24552......",".....24552......",".....23632......","....233332......","...1111111......",".....11.........",".....11........."],
  helm:["....333333......","...34555543.....","..3552666553....","..3526666253....","..3566666653....","..3552442553....","...35555553.....","....333333......","......11........","................","................","................","................","................","................","................"],
  chest:["....33333333....","...3555555553...","..356666666653..","..352266666253..","..356666666653..","..356666666653..","..355466664553..","...3555555553...","....33555533....","....35544553....","....34444443....",".....333333.....","................","................","................","................"],
  arms:["....33....33....","...3553..3553...","..356553356553..","..3522233222253.","..35666..66653..","..35666..66653..","..35666..66653..","...3523..3253...","....333..333....",".....11..11.....","................","................","................","................","................","................"],
  waist:["....33333333....","...3555555553...","..356666666653..","...3336666333...","..356666666653..","..352266662253..","...3333333333...","....11111111....","................","................","................","................","................","................","................","................"],
  legs:["....33333333....","...3555555553...","...3335555333...",".....352253.....",".....356653.....","....35666553....","....352..253....","....352..253....","....356..653....","....356..653....","....333..333....","....111..111....","...1111..1111...","................","................","................"],
  charm:["......33........",".....3553.......","....356653......",".....3553.......","......33........","......33........",".....3223.......","....324423......",".....3443.......","......33........","................","................","................","................","................","................"]
};
const PAL={
 bone:{1:'#1b130f',2:'#4c3427',3:'#7d6350',4:'#c9ae8c',5:'#e8d9bd',6:'#fff1cf'},
 wolf:{1:'#0e1418',2:'#293943',3:'#4a6170',4:'#7d98a9',5:'#bfd4e3',6:'#eef8ff'},
 blaze:{1:'#180906',2:'#4a100d',3:'#7f1b14',4:'#bd301b',5:'#f9622d',6:'#ffd076'},
 frost:{1:'#091116',2:'#1f4150',3:'#3f7188',4:'#79bfdf',5:'#c4efff',6:'#f6feff'},
 storm:{1:'#161108',2:'#55450f',3:'#8f7717',4:'#d1bc39',5:'#fff071',6:'#fff7bc'},
 dragon:{1:'#11080b',2:'#391118',3:'#671928',4:'#9e2540',5:'#da4e76',6:'#f1c56c'},
 abyss:{1:'#0d0609',2:'#300b19',3:'#591129',4:'#8c1d48',5:'#cc3b73',6:'#ffd7e2'},
 astral:{1:'#0d1122',2:'#283267',3:'#4957b3',4:'#6f8cff',5:'#b9d4ff',6:'#fff2b9'},
 none:{1:'#15110e',2:'#513827',3:'#82583b',4:'#c58a5d',5:'#f1c08f',6:'#fff0cf'}
};
const LORE={
  wep_abyss_reaper:'深淵の呪いを刃へ凝縮した魔鎌。血を啜るほど赤黒く脈動する。',
  wep_astral_blade:'星界の光と闇を束ねた聖邪の刃。振るうたび虹粒子が舞う。',
  wep_crimson_burst:'紅蓮の核を封じた破城大剣。叩きつけると灼熱の衝撃が走る。',
  wep_frost_veil:'氷晶の膜をまとった月影の太刀。静かに、しかし鋭く断ち切る。',
  wep_storm_howl:'雷鳴を食らう冥槍。突きの軌跡に紫電の残光を残す。'
};
function pickType(g){
  if(!g) return 'dagger';
  if(g.id==='wep_abyss_reaper'||/サイズ|scythe|鎌/.test((g.id||'')+(g.name||''))) return 'scythe';
  if(g.id==='wep_frost_veil'||/太刀|longsword/.test((g.id||'')+(g.name||''))) return 'longsword';
  if(/双/.test((g.id||'')+(g.name||''))) return 'dual';
  if(g.id==='wep_storm_howl'||/槍|lance/.test((g.id||'')+(g.name||''))) return 'lance';
  if(/槌|hammer|ブレイカー/.test((g.id||'')+(g.name||''))) return 'hammer';
  if(/弓|bow/.test((g.id||'')+(g.name||''))) return 'bow';
  if(g.id==='wep_small'||/小刀|dagger|knife|small/.test((g.id||'')+(g.name||''))) return 'dagger';
  if(g.slot==='weapon') return 'greatsword';
  return ({head:'helm',chest:'chest',arms:'arms',waist:'waist',legs:'legs',charm:'charm'})[g.slot]||'chest';
}
function palette(g){ return PAL[g&&g.set]||PAL[g&&g.element]||PAL.none }
function art(g,size=54){
  const grid=SPRITES[pickType(g)]||SPRITES.dagger,p=palette(g),scale=4;let rect='';
  for(let y=0;y<grid.length;y++)for(let x=0;x<grid[y].length;x++){const c=grid[y][x];if(c!=='.'&&c!==' ')rect+=`<rect x="${x*scale}" y="${y*scale}" width="${scale}" height="${scale}" fill="${p[c]||p[4]}"/>`;}
  return `<svg class="pixel-sprite" width="${size}" height="${size}" viewBox="0 0 64 64" shape-rendering="crispEdges" aria-hidden="true">${rect}</svg>`;
}
function theme(g){try{return typeof gearTheme==='function'?gearTheme(g):{main:'#49392e',sub:'#17120f',trim:'#745c38'}}catch(_){return {main:'#49392e',sub:'#17120f',trim:'#745c38'}}}
function label(set){try{return typeof setLabel==='function'?setLabel(set):'装備'}catch(_){return '装備'}}
function elem(k){try{return typeof elementInfo==='function'?elementInfo(k):null}catch(_){return null}}
function fx(g){const r=Number(g&&g.rarity)||1,s=g&&g.set,e=g&&g.element;let h='';if(r>=5&&(s==='astral'||e==='ice'))h+='<span class="pixel-spark">✦</span>';if(r>=5&&(s==='abyss'||s==='dragon'||e==='fire'||e==='dragon'))h+='<span class="pixel-flare">✹</span>';if(r>=5&&(s==='storm'||e==='thunder'))h+='<span class="pixel-zap">⚡</span>';return h}
function flavor(g){return LORE[g&&g.id]||((g&&g.slot==='weapon')?'シルエットから個性が際立つ、厨二心をくすぐる狩猟武器。':'シリーズの威圧感を宿した重厚ドット装備。')}
window.renderGearGrid=function(){
 const area=document.getElementById('gearGrid');if(!area)return;area.innerHTML='';
 const list=(Array.isArray(GEAR)?GEAR:[]).filter(g=>g&&g.slot===gearSlot),crafted=Array.isArray(state.craftedGear)?state.craftedGear:[],eq=state.equipped||{};
 if(!selectedGear||!list.some(g=>g.id===selectedGear))selectedGear=eq[gearSlot]||list[0]?.id||null;
 list.forEach(g=>{const made=crafted.includes(g.id),equipped=eq[g.slot]===g.id,r=Math.max(1,Math.min(5,Number(g.rarity)||1)),t=theme(g),e=g.slot==='weapon'?elem(g.element||'none'):null,b=document.createElement('button');b.type='button';b.dataset.gear=g.id;b.className=`gear-item r${r} ${selectedGear===g.id?'selected ':''}${made?'':'locked '}${r>=5?'legendary':''}`;b.style.background=`linear-gradient(145deg,${t.sub||'#17120f'},#100d0b)`;b.innerHTML=`<div class="gicon" style="border-color:${t.trim||'#745c38'}">${art(g,68)}${fx(g)}</div><b>${escapeHtml(g.name||'名称未設定')}</b><div class="gmeta"><span class="tiny-badge rare">${'★'.repeat(r)}</span><span class="tiny-badge set">${label(g.set)}</span>${e?`<span class="tiny-badge power ${e.class||''}">${e.icon||''} ${e.label||''}</span>`:`<span class="tiny-badge power">防御 ${Number(g.defense)||0}</span>`}</div><small>${equipped?'装備中':made?'作成済み':'未作成'}</small>`;area.appendChild(b)});
};
window.renderGearDetail=function(){
 const area=document.getElementById('gearDetail');if(!area)return;const g=typeof gearById==='function'?gearById(selectedGear):null;if(!g){area.innerHTML='<div class="muted">装備を選択してください。</div>';return}
 const crafted=Array.isArray(state.craftedGear)?state.craftedGear:[],eq=state.equipped||{},inv=state.inventory||{},costObj=g.cost||{},skillsObj=g.skills||{},made=crafted.includes(g.id),equipped=eq[g.slot]===g.id,craftable=Object.entries(costObj).every(([m,n])=>(Number(inv[m])||0)>=(Number(n)||0));
 const cost=Object.entries(costObj).map(([m,n])=>`${MATS[m]||m} ${Number(inv[m])||0}/${Number(n)||0}`).join(' ・ ')||'なし';
 const skill=Object.entries(skillsObj).map(([k,v])=>`${k==='xp'?'獲得XP':k==='hardXp'?'高難度XP':k==='material'?'素材率':k} +${Math.round((Number(v)||0)*100)}%`).join(' / '),r=Math.max(1,Math.min(5,Number(g.rarity)||1)),e=g.slot==='weapon'?elem(g.element||'none'):null,t=theme(g);
 area.innerHTML=`<div class="detail-head"><div class="detail-icon ${r>=5?'legendary':''}" style="border-color:${t.trim||'#745c38'}">${art(g,82)}${fx(g)}</div><div><div class="detail-name">${escapeHtml(g.name||'名称未設定')}</div><div class="stars">${'★'.repeat(r)}${'☆'.repeat(5-r)} ・ ${label(g.set)}</div>${e?`<div><span class="elem-badge ${e.class||''}">${e.icon||''} ${e.label||''}属性</span> 攻撃倍率 ×${(Number(g.power)||1).toFixed(2)}</div>`:`<div>防御力 ${Number(g.defense)||0}</div>`}<div class="skills">${skill||'固有スキルなし'}</div><div class="weapon-flavor">${flavor(g)}</div></div></div><div class="costs">必要素材：${cost}</div><div class="detail-actions"><button class="btn gold" id="craftGear" ${made||!craftable?'disabled':''}>${made?'作成済み':craftable?'作成する':'素材不足'}</button><button class="btn primary" id="equipGear" ${made?'':'disabled'}>${equipped?'装備を外す':'装備する'}</button></div>`;
};
const oldRenderGear=window.renderGear;
window.renderGear=function(){
 if(typeof oldRenderGear==='function')oldRenderGear();
 const slots=document.getElementById('gearSlots');if(slots){slots.innerHTML='';SLOTS.forEach(([k,l])=>{const g=typeof gearById==='function'?gearById(state.equipped?.[k]):null,d=document.createElement('div');d.className='slot-pill'+(g?' filled':'');d.innerHTML=g?`<span class="slot-pixel">${art(g,28)}</span><span><b>${l}</b><br>${escapeHtml(g.name)}</span>`:`<span class="slot-empty">◇</span><span><b>${l}</b><br>—</span>`;slots.appendChild(d)})}
 let show=document.getElementById('pixelShowcase');if(!show){show=document.createElement('div');show.id='pixelShowcase';show.className='pixel-showcase';document.querySelector('.hunter-scene')?.appendChild(show)}show.innerHTML='';['weapon','head','chest'].forEach(k=>{const g=typeof gearById==='function'?gearById(state.equipped?.[k]):null;if(!g)return;const d=document.createElement('div');d.className='showcase-box '+(g.set||'')+((Number(g.rarity)||1)>=5?' legendary':'');d.innerHTML=art(g,44)+fx(g);show.appendChild(d)});
};
try{if(typeof render==='function')render()}catch(e){console.warn('pixel77 repaint skipped',e)}
})();
