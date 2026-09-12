(function(){
'use strict';
/* v9.4: remove every previous weapon entry and replace it with only the photo-reference collection. */
if(typeof GEAR==='undefined'||!Array.isArray(GEAR)) return;

const OLD_WEAPON_IDS=new Set(GEAR.filter(g=>g&&g.slot==='weapon').map(g=>g.id));
for(let i=GEAR.length-1;i>=0;i--){ if(GEAR[i]&&GEAR[i].slot==='weapon') GEAR.splice(i,1); }

const ROWS=[
['sword','剣',['ブロンズソード','アイアンソード','スチールソード','ダークブレード','フレイムソード','アイスソード','サンダーソード','セイクリッドソード','ブラッドソード','エンバーソード']],
['greatsword','大剣',['アイアンブレイド','グレートソード','バスタードソード','ドラゴンブレイド','銀炎の大剣','氷輪の大剣','雷鳴の大剣','月影の大剣','深淵の大剣','王の大剣']],
['katana','太刀',['打刀','備前の太刀','妖刀・紅蓮','影切り','焔の太刀','氷蒼の太刀','雷光の太刀','星詠の太刀','冥闇の太刀','天翔龍']],
['dual','双剣',['アイアンナイフ','ツインダガー','シャドウダガー','ブラッドクロウ','炎獄の双剣','氷晶の双剣','迅雷の双剣','月光の双剣','終焉の双剣','神獣の双剣']],
['lance','槍',['アイアンスピア','ロングスピア','トライデント','ドラゴンスピア','紅蓮の槍','氷槍フロスト','雷槍ヴォルト','聖槍ルミナス','冥槍ハデス','龍神の槍']],
['axe','斧',['バトルアックス','ウォーアックス','ハルバード','デスアックス','灼獄の斧','氷裂の斧','雷鳴の斧','聖戦の斧','冥王の斧','極天の斧']],
['hammer','ハンマー',['ウッドハンマー','アイアンハンマー','ウォーハンマー','ゴーレムハンマー','炎王の槌','氷河の槌','雷神の槌','聖霊の槌','冥界の槌','創世の槌']],
['bow','弓',['ショートボウ','ハンターボウ','コンポジットボウ','エルフボウ','災禍の弓','氷晶の弓','雷鳴の弓','星撃ちの弓','月陰の弓','天翔の弓']],
['scythe','鎌',['シックル','デスサイズ','ブラッドサイズ','ソウルサイズ','業火の鎌','氷葬の鎌','迅雷の鎌','月蝕の鎌','冥王の鎌','終焉の鎌']],
['staff','杖',['ウッドスタッフ','メイジロッド','ウィザードロッド','ダークロッド','炎帝の杖','氷輝の杖','雷聖の杖','星屑の杖','虚無の杖','創星の杖']],
['other','特殊',['ナックル','クロー','チェーン','ウィップ','ブーメラン','シールド','トーテム','グローブ','ブラスター','魔導書']]
];
const THEME=[
 {r:1,set:'none',el:'none'},
 {r:1,set:'none',el:'none'},
 {r:2,set:'wolf',el:'none'},
 {r:2,set:'abyss',el:'dragon'},
 {r:3,set:'blaze',el:'fire'},
 {r:3,set:'frost',el:'ice'},
 {r:3,set:'storm',el:'thunder'},
 {r:4,set:'astral',el:'none'},
 {r:4,set:'abyss',el:'dragon'},
 {r:5,set:'dragon',el:'dragon'}
];
function cost(r){
 if(r===1)return {small_fang:1};
 if(r===2)return {small_fang:2,medium_pelt:1};
 if(r===3)return {medium_pelt:2,large_horn:1};
 if(r===4)return {large_horn:2,shiny_ore:2};
 return {ancient_scale:3,shiny_ore:3};
}
ROWS.forEach(([type,label,names],row)=>names.forEach((name,col)=>{
 const t=THEME[col];
 GEAR.push({
   id:`photo94_${type}_${String(col+1).padStart(2,'0')}`,
   name,
   slot:'weapon',icon:'⚔️',rarity:t.r,set:t.set,element:t.el,
   power:+(1.02+t.r*.03+(col>=7?.02:0)).toFixed(2),
   cost:cost(t.r),skills:t.r>=4?{xp:.06,hardXp:.05}:{xp:.01*t.r},
   weaponType:type,weaponTypeLabel:label,_photoRow:row,_photoCol:col
 });
}));

/* Keep non-weapon save progress, but remove references to deleted weapon ids. */
try{
 if(typeof state!=='undefined'&&state){
   if(Array.isArray(state.craftedGear)) state.craftedGear=state.craftedGear.filter(id=>!OLD_WEAPON_IDS.has(id));
   if(state.equipped&&OLD_WEAPON_IDS.has(state.equipped.weapon)) state.equipped.weapon=null;
   if(typeof selectedGear!=='undefined'&&OLD_WEAPON_IDS.has(selectedGear)) selectedGear=null;
   if(typeof gearSlot!=='undefined'&&gearSlot==='weapon'&&typeof renderGear==='function') renderGear();
   if(typeof render==='function') render();
   if(typeof save==='function') Promise.resolve(save()).catch(()=>{});
 }
}catch(_){ }
})();
