(function(){
'use strict';
if(typeof GEAR==='undefined'||!Array.isArray(GEAR)) return;
const oldIds=new Set(GEAR.filter(g=>g&&g.slot==='weapon').map(g=>g.id));
for(let i=GEAR.length-1;i>=0;i--) if(GEAR[i]&&GEAR[i].slot==='weapon') GEAR.splice(i,1);
const NAMES=[
'白銀の剣','鋼の大剣','黒鋼の大剣','骨刃','紅炎剣',
'月輪刃','双月刃','戦斧','魔眼刃','霊月刃',
'焔弓','白銀弓','黒紅弓','黄金弓','冥黒弓',
'戦槍','紫晶槍','翠風槍','盾槍','黄金槍'
];
const TYPES=['剣','剣','剣','剣','剣','特殊','特殊','斧','特殊','特殊','弓','弓','弓','弓','弓','槍','槍','槍','槍','槍'];
const R=[1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5];
const EL=['none','none','none','dragon','fire','none','none','none','dragon','ice','fire','none','dragon','thunder','dragon','none','ice','thunder','none','dragon'];
function cost(r){if(r===1)return{small_fang:1};if(r===2)return{small_fang:2,medium_pelt:1};if(r===3)return{medium_pelt:2,large_horn:1};if(r===4)return{large_horn:2,shiny_ore:2};return{ancient_scale:3,shiny_ore:3}}
NAMES.forEach((name,i)=>GEAR.push({id:`photo95_${String(i+1).padStart(2,'0')}`,name,slot:'weapon',icon:'⚔️',rarity:R[i],set:'none',element:EL[i],power:+(1.02+R[i]*.03).toFixed(2),cost:cost(R[i]),skills:R[i]>=4?{xp:.06,hardXp:.05}:{xp:.01*R[i]},weaponType:TYPES[i],_photoIndex:i}));
try{if(typeof state!=='undefined'&&state){if(Array.isArray(state.craftedGear))state.craftedGear=state.craftedGear.filter(id=>!oldIds.has(id));if(state.equipped&&oldIds.has(state.equipped.weapon))state.equipped.weapon=null;if(typeof selectedGear!=='undefined'&&oldIds.has(selectedGear))selectedGear=null;}}catch(_){ }
})();
