(function(){
'use strict';
if(typeof GEAR==='undefined'||!Array.isArray(GEAR))return;
const oldWeaponIds=new Set(GEAR.filter(g=>g&&g.slot==='weapon').map(g=>g.id));
for(let i=GEAR.length-1;i>=0;i--){if(GEAR[i]&&GEAR[i].slot==='weapon')GEAR.splice(i,1);}
const NAMES=[
'銀剣','鉄剣','黒刃','竜牙剣','紅金剣',
'月刃','双月刃','戦斧','魔刃','氷月刃',
'炎弓','白銀弓','紅牙弓','黄金弓','冥弓',
'戦斧槍','紫晶槍','翡翠槍','騎士槍','黄金槍'
];
const TYPES=['sword','sword','sword','sword','sword','blade','blade','axe','blade','blade','bow','bow','bow','bow','bow','lance','lance','lance','lance','lance'];
const ELEMENTS=['none','none','dragon','dragon','fire','none','none','none','dragon','ice','fire','none','fire','thunder','dragon','none','ice','thunder','none','fire'];
NAMES.forEach((name,i)=>{
 const rarity=1+Math.floor(i/5);
 GEAR.push({id:`photo95_${String(i+1).padStart(2,'0')}`,name,slot:'weapon',icon:'⚔️',rarity:Math.min(5,rarity),set:'none',element:ELEMENTS[i],power:+(1.03+rarity*.035).toFixed(2),cost:rarity<=1?{small_fang:1}:rarity===2?{small_fang:2,medium_pelt:1}:rarity===3?{medium_pelt:2,large_horn:1}:{large_horn:2,shiny_ore:2},skills:{xp:.01*rarity},weaponType:TYPES[i],_photo95Index:i});
});
try{
 if(typeof state!=='undefined'&&state){
   if(Array.isArray(state.craftedGear))state.craftedGear=state.craftedGear.filter(id=>!oldWeaponIds.has(id));
   if(state.equipped&&oldWeaponIds.has(state.equipped.weapon))state.equipped.weapon=null;
   if(typeof selectedGear!=='undefined'&&oldWeaponIds.has(selectedGear))selectedGear=null;
 }
}catch(_){ }
})();