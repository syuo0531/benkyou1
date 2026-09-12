(function(){
'use strict';
/* v9.3 data-only weapon collection. No SVG rendering / no observers. */
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
 {set:'bone',el:'none',r:1},{set:'wolf',el:'none',r:2},{set:'none',el:'none',r:3},{set:'abyss',el:'dragon',r:3},{set:'blaze',el:'fire',r:3},{set:'frost',el:'ice',r:3},{set:'storm',el:'thunder',r:3},{set:'astral',el:'thunder',r:4},{set:'abyss',el:'dragon',r:4},{set:'dragon',el:'dragon',r:5}
];
function cost(r){return r===1?{small_fang:1}:r===2?{small_fang:2,medium_pelt:1}:r===3?{medium_pelt:2,large_horn:1}:r===4?{large_horn:2,shiny_ore:2}:{ancient_scale:3,shiny_ore:3}}
if(!Array.isArray(window.GEAR)&&typeof GEAR==='undefined')return;
const arr=typeof GEAR!=='undefined'?GEAR:window.GEAR;
const seen=new Set(arr.map(g=>g&&g.id));
ROWS.forEach(([type,names],ri)=>names.forEach((name,ci)=>{
 const t=THEMES[ci],id=`atlas89_${type}_${String(ci+1).padStart(2,'0')}`;
 if(seen.has(id))return;
 arr.push({id,name,slot:'weapon',icon:'⚔️',rarity:t.r,set:t.set,element:t.el,power:+(1.02+t.r*.025+(ci>=7?.02:0)).toFixed(2),cost:cost(t.r),skills:t.r>=4?{xp:.06,hardXp:.05}:{xp:.01*t.r},weaponType:type,_atlasRow:ri,_atlasCol:ci});
}));
})();
