(function(){
'use strict';
/* v8.9 - adds the full generated-style weapon collection as craftable items.
   Core navigation/save/daily/bestiary logic is untouched. */
const ROWS=[
['sword',['ブロンズソード','アイアンソード','スチールソード','ダークブレード','フレイムソード','アイスソード','サンダーソード','セイクリッド','ブラッドソード','エンバーソード']],
['greatsword',['アイアンブレイド','グレートソード','バスタードソード','ドラゴンブレイド','銀炎の大剣','氷輪の大剣','雷鳴の大剣','月影の大剣','深淵の大剣','王の大剣']],
['katana',['打刀','備前の太刀','妖刀・紅蓮','影切り','焔の太刀','氷蒼の太刀','雷光の太刀','星詠の太刀','雷鳴の太刀','天翔龍']],
['dual',['アイアンナイフ','ツインダガー','シャドウダガー','ブラッドクロウ','炎獄の双剣','氷晶の双剣','迅雷の双剣','月光の双剣','終焉の双剣','神獣の双剣']],
['lance',['アイアンスピア','ロングスピア','トライデント','ドラゴンスピア','紅蓮の槍','氷槍フロスト','雷槍ヴォルト','聖槍ルミナス','冥槍ハデス','龍神の槍']],
['axe',['バトルアックス','ウォーアックス','ハルバード','デスアックス','灼獄の斧','氷裂の斧','雷鳴の斧','聖戦の斧','冥王の斧','極天の斧']],
['hammer',['ウッドハンマー','アイアンハンマー','ウォーハンマー','ゴーレムハンマー','炎王の槌','氷河の槌','雷神の槌','聖霊の槌','冥界の槌','創世の槌']],
['bow',['ショートボウ','ハンターボウ','コンポジット','エルフボウ','災禍の弓','氷晶の弓','雷鳴の弓','星撃ちの弓','月陰の弓','天翔の弓']],
['scythe',['シックル','デスサイズ','ブラッドサイズ','ソウルサイズ','業火の鎌','氷葬の鎌','迅雷の鎌','月蝕の鎌','冥王の鎌','終焉の鎌']],
['staff',['ウッドスタッフ','メイジロッド','ウィザードロッド','ダークロッド','炎帝の杖','氷輝の杖','雷聖の杖','星屑の杖','虚無の杖','創星の杖']],
['other',['ナックル','クロー','チェーン','ウィップ','ブーメラン','シールド','トーテム','グローブ','ブラスター','魔導書']]
];
const THEMES=[
 {a:'#e9eef2',b:'#aab5bd',c:'#5d666d',d:'#d39b38',set:'bone',el:'none',r:1},
 {a:'#f4f4f4',b:'#bcc8d3',c:'#5a6771',d:'#6ea3d6',set:'wolf',el:'none',r:2},
 {a:'#d8dce5',b:'#7b8394',c:'#252a36',d:'#ffbe43',set:'none',el:'none',r:3},
 {a:'#6f668d',b:'#302744',c:'#100d18',d:'#ba3dff',set:'abyss',el:'dragon',r:3},
 {a:'#ff6b32',b:'#bc1f22',c:'#33090c',d:'#ffd069',set:'blaze',el:'fire',r:3},
 {a:'#9ae7ff',b:'#3e94ff',c:'#102863',d:'#dffaff',set:'frost',el:'ice',r:3},
 {a:'#ffe45a',b:'#d79b16',c:'#3a2b08',d:'#fff8b1',set:'storm',el:'thunder',r:3},
 {a:'#fff7d7',b:'#d9a845',c:'#4967d8',d:'#fff0a1',set:'astral',el:'thunder',r:4},
 {a:'#bd58ff',b:'#6c1fa5',c:'#1d082a',d:'#ff5c93',set:'abyss',el:'dragon',r:4},
 {a:'#fff1b2',b:'#f59b21',c:'#7440d7',d:'#ffffff',set:'dragon',el:'dragon',r:5}
];
const TYPES={sword:'剣',greatsword:'大剣',katana:'太刀',dual:'双剣',lance:'槍',axe:'斧',hammer:'ハンマー',bow:'弓',scythe:'鎌',staff:'杖',other:'特殊'};
function cost(r){return r===1?{small_fang:1}:r===2?{small_fang:2,medium_pelt:1}:r===3?{medium_pelt:2,large_horn:1}:r===4?{large_horn:2,shiny_ore:2}:{ancient_scale:3,shiny_ore:3}}
function ensureGear(){
 const seen=new Set(GEAR.map(g=>g&&g.id));
 ROWS.forEach(([type,names],ri)=>names.forEach((name,ci)=>{
   const t=THEMES[ci],id=`atlas89_${type}_${String(ci+1).padStart(2,'0')}`;
   if(seen.has(id))return;
   GEAR.push({id,name,slot:'weapon',icon:'⚔️',rarity:t.r,set:t.set,element:t.el,power:+(1.02+t.r*.025+(ci>=7?.02:0)).toFixed(2),cost:cost(t.r),skills:t.r>=4?{xp:.06,hardXp:.05}:{xp:.01*t.r},weaponType:type,_atlasRow:ri,_atlasCol:ci});
 }));
}
function theme(g){return THEMES[g._atlasCol||0]||THEMES[0]}
function px(points,fill,stroke='#081018',sw=3){return `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="miter"/>`}
function line(x1,y1,x2,y2,stroke,w=5){return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="square"/>`}
function glow(t){return `<g opacity=".95"><rect x="10" y="10" width="2" height="2" fill="${t.d}"/><rect x="98" y="18" width="3" height="3" fill="${t.d}"/><rect x="103" y="72" width="2" height="2" fill="${t.a}"/></g>`}
function bladeFill(t){return `<defs><linearGradient id="w89g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${t.a}"/><stop offset=".55" stop-color="${t.b}"/><stop offset="1" stop-color="${t.c}"/></linearGradient></defs>`}
function artBody(type,t,v){
 const F='url(#w89g)',G=t.d; let b='';
 if(type==='sword')b=px('22,94 34,80 76,28 91,35 49,87 35,101',F)+line(34,79,51,94,G,7)+line(29,97,41,85,'#5c351c',7);
 if(type==='greatsword')b=px('18,98 29,74 43,64 38,53 56,33 69,36 84,17 103,31 87,50 91,61 72,78 61,75 45,99',F)+line(33,84,50,101,G,8);
 if(type==='katana')b=`<path d="M18 94 Q48 80 92 27 L102 35 Q63 84 29 103Z" fill="${F}" stroke="#081018" stroke-width="3"/>`+line(26,88,43,101,G,6);
 if(type==='dual')b=px('18,91 31,47 45,52 53,29 59,55 47,79 37,101',F)+px('102,91 89,47 75,52 67,29 61,55 73,79 83,101',F)+line(38,78,55,69,G,5)+line(82,78,65,69,G,5);
 if(type==='lance')b=line(24,103,83,42,'#6a4932',8)+px('73,52 64,32 78,37 86,14 94,37 108,28 101,55 87,70',F)+line(76,41,95,48,G,4);
 if(type==='axe')b=line(32,100,66,61,'#6d4028',9)+px('48,61 54,28 69,37 83,20 104,34 86,51 92,67 68,62',F)+line(55,53,81,47,G,4);
 if(type==='hammer')b=line(51,101,66,58,'#6b4128',9)+`<rect x="36" y="30" width="54" height="35" rx="3" fill="${F}" stroke="#081018" stroke-width="4"/><rect x="28" y="37" width="12" height="22" fill="${t.c}" stroke="#081018" stroke-width="3"/><rect x="88" y="37" width="12" height="22" fill="${t.c}" stroke="#081018" stroke-width="3"/>`+line(40,42,87,54,G,4);
 if(type==='bow')b=`<path d="M31 25 Q8 60 31 96" fill="none" stroke="${t.a}" stroke-width="8"/><path d="M89 25 Q112 60 89 96" fill="none" stroke="${t.b}" stroke-width="8"/>`+line(31,25,89,96,'#d8c3a0',2)+line(89,25,31,96,'#d8c3a0',2)+line(18,60,101,60,G,3);
 if(type==='scythe')b=line(48,103,62,43,'#6d3d2b',8)+`<path d="M56 47 Q73 16 103 27 Q80 31 69 60Z" fill="${F}" stroke="#081018" stroke-width="4"/>`+line(58,48,94,31,G,3);
 if(type==='staff')b=line(44,103,62,47,'#70412b',8)+`<circle cx="66" cy="35" r="16" fill="${F}" stroke="#081018" stroke-width="4"/><circle cx="66" cy="35" r="6" fill="${G}"/>`+line(66,18,66,8,G,4);
 if(type==='other'){
   const shapes=[
    `<g>${px('29,77 39,50 51,55 57,36 67,57 59,82 43,88',F)}${px('91,77 81,50 69,55 63,36 53,57 61,82 77,88',F)}</g>`,
    px('18,78 33,50 49,57 43,83 29,94',F)+px('102,78 87,50 71,57 77,83 91,94',F),
    `<path d="M20 62 Q35 36 52 54 T84 54 T102 62" fill="none" stroke="${t.a}" stroke-width="8"/>`,
    `<path d="M22 92 Q47 32 74 54 Q97 73 72 92 Q54 104 42 86" fill="none" stroke="${t.a}" stroke-width="8"/>`,
    `<path d="M17 72 Q48 19 104 56 Q68 46 52 95 Q44 66 17 72Z" fill="${F}" stroke="#081018" stroke-width="4"/>`,
    `<path d="M27 25h66v52L60 102 27 77Z" fill="${F}" stroke="#081018" stroke-width="4"/><path d="M60 36v50M39 58h42" stroke="${G}" stroke-width="5"/>`,
    `<rect x="48" y="18" width="24" height="75" fill="${F}" stroke="#081018" stroke-width="4"/><path d="M35 42h50M37 22h46" stroke="${G}" stroke-width="5"/>`,
    `<g>${px('20,74 30,38 54,44 49,88 29,96',F)}${px('100,74 90,38 66,44 71,88 91,96',F)}</g>`,
    `<path d="M24 77h53l18-16 11 9-18 20H41l-17 10Z" fill="${F}" stroke="#081018" stroke-width="4"/><circle cx="83" cy="68" r="6" fill="${G}"/>`,
    `<path d="M24 30h72v61H24z" fill="${F}" stroke="#081018" stroke-width="4"/><path d="M30 36l30 12 30-12v48L60 72 30 84Z" fill="${t.c}" stroke="${G}" stroke-width="3"/>`
   ];
   b=shapes[v]||shapes[0];
 }
 return b;
}
function art(g,size=92){
 if(!g||!String(g.id||'').startsWith('atlas89_'))return '';
 const t=theme(g),type=g.weaponType||'sword',v=g._atlasCol||0;
 return `<svg class="weapon89-art" width="${size}" height="${size}" viewBox="0 0 120 120" shape-rendering="crispEdges" aria-hidden="true">${bladeFill(t)}${glow(t)}${artBody(type,t,v)}${v>=7?`<circle cx="60" cy="60" r="42" fill="none" stroke="${t.d}" stroke-width="1" opacity=".2"/>`:''}</svg>`;
}
function replace(box,g,size){if(!box||!g||!String(g.id||'').startsWith('atlas89_'))return;box.innerHTML=art(g,size);box.classList.add('weapon89-box')}
function patch(){
 document.querySelectorAll('#gearGrid .gear-item[data-gear]').forEach(btn=>{const g=gearById(btn.dataset.gear);if(!g||!String(g.id).startsWith('atlas89_'))return;replace(btn.querySelector('.gicon'),g,96);btn.classList.add('weapon89-card')});
 try{const g=gearById(selectedGear);if(g&&String(g.id).startsWith('atlas89_'))replace(document.querySelector('#gearDetail .detail-icon'),g,128)}catch(_){}
}
function rerender(){try{if(typeof renderGearGrid==='function')renderGearGrid();if(typeof renderGearDetail==='function')renderGearDetail()}catch(_){}requestAnimationFrame(patch)}
function observe(id){const e=document.getElementById(id);if(e)new MutationObserver(()=>requestAnimationFrame(patch)).observe(e,{childList:true,subtree:true})}
function boot(){
 ensureGear();
 const s=document.createElement('style');s.textContent=`
 .weapon89-art{display:block;width:100%;height:100%;image-rendering:pixelated;image-rendering:crisp-edges;filter:drop-shadow(0 2px 0 rgba(0,0,0,.9)) drop-shadow(0 0 6px rgba(255,196,76,.12))}
 .weapon89-box{padding:0!important;background:radial-gradient(circle at 50% 48%,rgba(255,190,70,.04),transparent 48%),#050404!important;overflow:hidden!important}
 .weapon89-card .gicon>.weapon89-art{width:98%!important;height:98%!important}
 #gearDetail .detail-icon>.weapon89-art{width:105%!important;height:105%!important}
 `;document.head.appendChild(s);
 rerender();patch();observe('gearGrid');observe('gearDetail');
 document.getElementById('nav')?.addEventListener('click',()=>setTimeout(rerender,0));
 document.getElementById('gearTabs')?.addEventListener('click',()=>setTimeout(rerender,0));
 document.getElementById('gearGrid')?.addEventListener('click',()=>setTimeout(patch,0));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();