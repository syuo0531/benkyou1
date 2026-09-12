(function(){
'use strict';
if(typeof GEAR==='undefined'||!Array.isArray(GEAR))return;
const oldWeaponIds=new Set(GEAR.filter(g=>g&&g.slot==='weapon').map(g=>g.id));
for(let i=GEAR.length-1;i>=0;i--){if(GEAR[i]&&GEAR[i].slot==='weapon')GEAR.splice(i,1);}
const NAMES=['鉄の剣','鋼の剣','黒の大剣','砂の剣','聖なる剣','鉄のナイフ','双月の刃','戦斧','妖刀','霊刃','木の弓','黒鉄の弓','影の弓','黄金の弓','覇王の弓','戦斧槍','ドリルランス','翠の槍','騎士槍','聖なる槍'];
const TYPES=['sword','sword','greatsword','sword','sword','blade','dual','axe','blade','blade','bow','bow','bow','bow','bow','lance','lance','lance','lance','lance'];
const ELEMENTS=['none','none','dragon','none','fire','none','none','none','dragon','ice','none','none','none','thunder','dragon','none','ice','thunder','none','fire'];
const R=[1,2,3,3,3,1,2,3,3,3,1,2,3,3,3,1,2,3,3,3];
NAMES.forEach((name,i)=>{const rarity=R[i];GEAR.push({id:`photo96_${String(i+1).padStart(2,'0')}`,name,slot:'weapon',icon:'⚔️',rarity,set:'none',element:ELEMENTS[i],power:+(1.03+rarity*.04).toFixed(2),cost:rarity===1?{small_fang:1}:rarity===2?{small_fang:2,medium_pelt:1}:{medium_pelt:2,large_horn:1},skills:{xp:.01*rarity},weaponType:TYPES[i],_photo96Index:i});});
try{if(typeof state!=='undefined'&&state){if(Array.isArray(state.craftedGear))state.craftedGear=state.craftedGear.filter(id=>!oldWeaponIds.has(id));if(state.equipped&&oldWeaponIds.has(state.equipped.weapon))state.equipped.weapon=null;if(typeof selectedGear!=='undefined'&&oldWeaponIds.has(selectedGear))selectedGear=null;}}catch(_){ }
})();