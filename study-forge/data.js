const subjectMap={"解剖学":"鉄鉱石","生理学":"雷晶石","外傷・障害":"炎晶石","アスリハ":"氷晶石","コンディショニング":"風晶石","検査・測定":"光晶石","その他":"闇晶石"};
const icons={"鉄鉱石":"⛓️","雷晶石":"⚡","炎晶石":"🔥","氷晶石":"❄️","風晶石":"🌪️","光晶石":"✨","闇晶石":"🌑","知識の欠片":"💠","魔獣の牙":"🦷","竜の核":"🔶"};
const weaponSeed=[
['bronze','ブロンズソード','剣','iron',1,120],['iron','アイアンソード','剣','iron',2,210],['steel','スチールソード','剣','ice',3,320],['flame','フレイムソード','剣','fire',4,470],['thunder','サンダーソード','剣','thunder',5,650],['emperor','皇剣アウレリア','剣','holy',6,900],
['great1','アイアングレイト','大剣','iron',1,150],['great2','ドラゴンブレイド','大剣','fire',3,360],['great3','氷橋の大剣','大剣','ice',4,520],['great4','深淵の大剣','大剣','dark',5,720],['great5','王の大剣','大剣','holy',6,980],
['katana1','打刀','太刀','iron',1,135],['katana2','妖刀・紅霞','太刀','fire',3,350],['katana3','氷華の太刀','太刀','ice',4,500],['katana4','星詠の太刀','太刀','holy',5,700],
['dual1','ツインダガー','双剣','iron',2,220],['dual2','炎獄の双剣','双剣','fire',3,390],['dual3','氷晶の双剣','双剣','ice',4,540],['dual4','月光の双剣','双剣','dark',5,730],
['spear1','ロングスピア','槍','iron',2,230],['spear2','紅蓮の槍','槍','fire',3,400],['spear3','雷槍ヴォルト','槍','thunder',4,560],['spear4','竜神の槍','槍','holy',6,940],
['axe1','バトルアックス','斧','iron',1,160],['axe2','灼熱の斧','斧','fire',3,410],['axe3','氷裂の斧','斧','ice',4,570],['axe4','覇王の斧','斧','dark',5,780],
['hammer1','アイアンハンマー','ハンマー','iron',2,250],['hammer2','雷神の槌','ハンマー','thunder',4,590],['hammer3','創世の槌','ハンマー','holy',6,1000],
['bow1','ショートボウ','弓','iron',1,130],['bow2','炎環の弓','弓','fire',3,370],['bow3','氷晶の弓','弓','ice',4,530],['bow4','天翔の弓','弓','holy',6,920],
['scythe1','シックル','鎌','iron',1,145],['scythe2','ブラッドサイズ','鎌','fire',3,405],['scythe3','冥王の鎌','鎌','dark',5,790],
['staff1','ウッドスタッフ','杖','iron',1,125],['staff2','メイジロッド','杖','ice',2,260],['staff3','炎魔の杖','杖','fire',3,430],['staff4','星屑の杖','杖','holy',5,760]
];
const elementMat={iron:'鉄鉱石',fire:'炎晶石',ice:'氷晶石',thunder:'雷晶石',holy:'光晶石',dark:'闇晶石'};
const weapons=weaponSeed.map((x,i)=>{const [id,name,type,element,stars,power]=x;let cost={};if(id!=='bronze'){cost[elementMat[element]||'鉄鉱石']=6+stars*5;cost['鉄鉱石']=Math.max(4,stars*3);cost['知識の欠片']=Math.max(1,stars*2);if(stars>=5)cost['魔獣の牙']=stars-3;if(stars>=6)cost['竜の核']=1}return{id,name,type,element,stars,power,cost};});
const enemyNames=['森のゴブリン','牙狼','古代兵','炎蜥蜴','洞窟の巨人','氷牙獣','雷鳥','黒騎士','魔導兵','深淵の番人','竜騎士','星喰らい'];
const stages=[];for(let world=1;world<=7;world++){for(let n=1;n<=5;n++){const idx=(world-1)*5+n;const boss=n===5;const hp=Math.round(650*Math.pow(1.19,idx-1)*(boss?1.45:1));const atk=Math.round(45*Math.pow(1.16,idx-1)*(boss?1.25:1));stages.push({id:`${world}-${n}`,world,n,name:boss?`第${world}章ボス・${enemyNames[(world+5)%enemyNames.length]}`:enemyNames[(idx-1)%enemyNames.length],hp,atk,reward:Math.max(2,Math.floor(idx/2)),boss});}}
function weaponSVG(w,locked=false){if(locked)return '<div class="weapon-silhouette">?</div>';const colors={iron:['#e8eef6','#75808e'],fire:['#ffdf68','#ed3b20'],ice:['#d9fbff','#32a9ff'],thunder:['#fff06a','#d8a400'],holy:['#fff4c2','#f0b43e'],dark:['#d78cff','#65107f']};const c=colors[w.element]||colors.iron;const type=w.type;let shape='';if(type==='弓')shape='<path d="M28 78 Q62 44 28 10" fill="none" stroke="url(#g)" stroke-width="7"/><path d="M28 10 L28 78" stroke="#ddd" stroke-width="2"/>';
else if(type==='鎌')shape='<path d="M48 78 L58 25" stroke="#d8c39d" stroke-width="7"/><path d="M56 27 Q80 6 91 28 Q68 24 56 38" fill="url(#g)"/>';
else if(type==='杖')shape='<path d="M48 82 L55 24" stroke="#9b6639" stroke-width="8"/><circle cx="57" cy="20" r="12" fill="url(#g)"/><circle cx="57" cy="20" r="5" fill="#fff"/>';
else if(type==='ハンマー')shape='<path d="M47 83 L55 38" stroke="#b07b48" stroke-width="9"/><rect x="30" y="18" width="52" height="28" rx="6" fill="url(#g)"/>';
else if(type==='斧')shape='<path d="M46 82 L56 30" stroke="#a87547" stroke-width="8"/><path d="M56 24 Q88 18 86 46 Q65 48 55 38Z" fill="url(#g)"/>';
else if(type==='槍')shape='<path d="M45 84 L61 25" stroke="#bb8855" stroke-width="6"/><path d="M61 26 L72 4 L76 31Z" fill="url(#g)"/>';
else if(type==='双剣')shape='<path d="M25 76 L48 18 L54 12 L52 22 L35 80Z" fill="url(#g)"/><path d="M58 76 L72 16 L80 11 L78 22 L68 80Z" fill="url(#g)"/>';
else shape='<path d="M44 78 L58 20 L68 6 L67 23 L54 80Z" fill="url(#g)"/><rect x="38" y="70" width="28" height="6" rx="3" fill="#d7a95d"/>';
return `<svg class="weapon-svg" viewBox="0 0 100 90" aria-label="${w.name}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient><filter id="gl"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#gl)">${shape}</g></svg>`}