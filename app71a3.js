function blankState(){return {schemaVersion:66,xp:0,level:1,quests:[],log:[],totalDone:0,bosses:[],activeBossId:null,bestiary:[],achievements:[],reviewQueue:[],inventory:{},craftedGear:[],equipped:{weapon:null,head:null,chest:null,arms:null,waist:null,legs:null,charm:null},studyByDate:{},daily:{date:'',items:[]},streak:{current:0,best:0,lastDate:null},player:{hp:100,maxHp:100,lastRestDate:null},settings:{weeklyGoal:600,starterGranted:false}}}
function dateKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function addDaysKey(base,days){const [y,m,d]=base.split('-').map(Number);const x=new Date(y,m-1,d+days);return dateKey(x)}
function parseDateKey(k){const [y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d)}
function totalMinutes(s=state){return Object.values(s.studyByDate||{}).reduce((a,b)=>a+(Number(b)||0),0)}
function weekKeys(){const now=new Date(), day=(now.getDay()+6)%7, mon=new Date(now.getFullYear(),now.getMonth(),now.getDate()-day);return Array.from({length:7},(_,i)=>dateKey(new Date(mon.getFullYear(),mon.getMonth(),mon.getDate()+i)))}
function weekMinutes(){return weekKeys().reduce((n,k)=>n+(state.studyByDate[k]||0),0)}
function rankName(){let t=RANKS[0].t;for(const r of RANKS)if(state.level>=r.n)t=r.t;return t}
function xpNeed(){return state.level*100}
function gearById(id){return GEAR.find(g=>g.id===id)}
function escapeHtml(v){const d=document.createElement('div');d.textContent=String(v??'');return d.innerHTML}
async function storageGet(key){try{if(window.storage?.get){const r=await window.storage.get(key,false);return r?.value||null}}catch(e){}try{return localStorage.getItem(key)}catch(e){return null}}
async function storageSet(key,val){try{if(window.storage?.set){await window.storage.set(key,val,false);return}}catch(e){}try{localStorage.setItem(key,val)}catch(e){}}
function saveScore(s){
  try{
    const study=Object.values(s.studyByDate||{}).reduce((a,b)=>a+(Number(b)||0),0);
    return (Number(s.totalDone)||0)*1000+(Number(s.level)||1)*200+(Number(s.xp)||0)+study*3+(Array.isArray(s.log)?s.log.length:0)*5+(Array.isArray(s.craftedGear)?s.craftedGear.length:0)*250+(Array.isArray(s.bestiary)?s.bestiary.length:0)*400+(Array.isArray(s.achievements)?s.achievements.length:0)*200+(Array.isArray(s.quests)?s.quests.length:0)*80+(Array.isArray(s.bosses)?s.bosses.length:0)*120;
  }catch(e){return 0}
}
async function load(){
  const keys=[...new Set([STORAGE_KEY, STORAGE_KEY_VERSIONED, ...LEGACY_KEYS])];
  const candidates=[];
  for(const key of keys){
    const raw=await storageGet(key);
    if(!raw)continue;
    try{const parsed=JSON.parse(raw);const migrated=migrate(parsed,key);candidates.push({key,state:migrated,score:saveScore(migrated)})}catch(e){console.warn('save migration skipped',key,e)}
  }
  let picked=null;
  if(candidates.length){
    const canonical=candidates.find(x=>x.key===STORAGE_KEY);
    const richest=[...candidates].sort((a,b)=>b.score-a.score)[0];
    picked=canonical&&canonical.score>=richest.score*.9?canonical:richest;
    state=picked.state;
  }else state=blankState();
  ensureDaily();checkReviews();checkDeadlines();checkAchievements();render();await save();
  if(picked&&picked.key!==STORAGE_KEY)toast('一番進んでいる以前のセーブデータを復元した');
}
function migrate(s, sourceKey=''){
  const base=blankState();
  const src=(s&&typeof s==='object'&&!Array.isArray(s))?s:{};
  const b=Object.assign(base,src);
  b.schemaVersion=66;
  b.xp=Math.max(0,Number(b.xp)||0);
  b.level=Math.max(1,Number(b.level)||1);
  b.totalDone=Math.max(0,Number(b.totalDone)||0);
  b.quests=Array.isArray(b.quests)?b.quests:[];
  b.log=Array.isArray(b.log)?b.log:[];
  b.bosses=Array.isArray(b.bosses)?b.bosses:[];
  b.bestiary=Array.isArray(b.bestiary)?b.bestiary:[];
  b.achievements=Array.isArray(b.achievements)?[...new Set(b.achievements.filter(x=>typeof x==='string'))]:[];
  b.reviewQueue=Array.isArray(b.reviewQueue)?b.reviewQueue:(Array.isArray(b.respawnQueue)?b.respawnQueue:[]);
  b.studyByDate=(b.studyByDate&&typeof b.studyByDate==='object'&&!Array.isArray(b.studyByDate))?b.studyByDate:{};
  b.daily=(b.daily&&typeof b.daily==='object'&&!Array.isArray(b.daily))?b.daily:{date:'',items:[]};
  b.daily.date=typeof b.daily.date==='string'?b.daily.date:'';
  b.daily.items=Array.isArray(b.daily.items)?b.daily.items:[];
  b.streak=Object.assign({current:0,best:0,lastDate:null},(b.streak&&typeof b.streak==='object')?b.streak:{});
  b.player=Object.assign({hp:100,maxHp:100,lastRestDate:null},(b.player&&typeof b.player==='object')?b.player:{});
  b.player.maxHp=Math.max(50,Number(b.player.maxHp)||100);
  b.player.hp=Math.min(b.player.maxHp,Math.max(0,Number(b.player.hp)||b.player.maxHp));
  b.inventory=(b.inventory&&typeof b.inventory==='object'&&!Array.isArray(b.inventory))?b.inventory:{};
  b.settings=Object.assign({weeklyGoal:600,starterGranted:false},(b.settings&&typeof b.settings==='object')?b.settings:{});
  if(!b.settings.starterGranted){
    b.inventory.small_fang=(Number(b.inventory.small_fang)||0)+8;
    b.inventory.medium_pelt=(Number(b.inventory.medium_pelt)||0)+2;
    b.settings.starterGranted=true;
    b.log.push({name:'ギルド支給品：小型の牙×8・中型の毛皮×2',date:Date.now(),type:'system'});
  }
  b.craftedGear=Array.isArray(b.craftedGear)?[...new Set(b.craftedGear.filter(x=>typeof x==='string'))]:[];
  b.equipped=Object.assign(blankState().equipped,(b.equipped&&typeof b.equipped==='object'&&!Array.isArray(b.equipped))?b.equipped:{});
  if(b.equipped.armor&&!b.equipped.chest)b.equipped.chest=b.equipped.armor;
  delete b.equipped.armor;
  if(b.craftedGear.includes('arm_medium')&&!b.craftedGear.includes('chest_wolf'))b.craftedGear.push('chest_wolf');
  if(b.craftedGear.includes('arm_ancient')&&!b.craftedGear.includes('chest_dragon'))b.craftedGear.push('chest_dragon');
  if(b.equipped.chest==='arm_medium')b.equipped.chest='chest_wolf';
  if(b.equipped.chest==='arm_ancient')b.equipped.chest='chest_dragon';
  b.quests=b.quests.map(q=>({...q,minutes:Math.max(1,Number(q?.minutes)||30),diffKey:q?.diffKey||'normal',xp:Number(q?.xp)||DIFF[q?.diffKey||'normal'].xp}));
  b.bosses=b.bosses.filter(Boolean).map(x=>({...x,reviewStage:Number.isInteger(x.reviewStage)?x.reviewStage:-1,element:x.element||'none',weakness:x.weakness||'none'}));
  b.reviewQueue=b.reviewQueue.filter(Boolean).map(r=>({name:r.name||'復習対象',tierKey:r.tierKey||'small',element:r.element||'none',weakness:r.weakness||'none',maxHp:Math.max(50,Number(r.maxHp)||200),dueDate:r.dueDate||dateKey(new Date(r.respawnAt||Date.now())),stage:Number.isInteger(r.stage)?r.stage:0}));
  return b;
}
async function save(){state.schemaVersion=66; const payload=JSON.stringify(state); await storageSet(STORAGE_KEY,payload); await storageSet(STORAGE_KEY_VERSIONED,payload)}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),1800)}
function ensureDaily(){const today=dateKey();if(state.daily.date===today&&state.daily.items?.length)return;state.daily={date:today,items:[{id:'focus',name:'集中して25分勉強する',xp:20,minutes:25,done:false},{id:'questions',name:'問題を30問解く',xp:25,minutes:30,done:false},{id:'review',name:'昨日までの内容を復習する',xp:30,minutes:20,done:false}]}}
function touchStudyDay(minutes,name='学習'){const n=Math.max(0,Math.round(Number(minutes)||0));if(n<=0)return;const k=dateKey();state.studyByDate[k]=(state.studyByDate[k]||0)+n;updateStreak(k);state.log.push({name,minutes:n,xp:0,date:Date.now(),type:'study'})}
function updateStreak(k){const last=state.streak.lastDate;if(last===k)return;if(!last){state.streak.current=1}else{const next=addDaysKey(last,1);state.streak.current=next===k?state.streak.current+1:1}state.streak.lastDate=k;state.streak.best=Math.max(state.streak.best,state.streak.current)}
function questMaterialDrop(diff='normal'){const eff=gearEffects();let pool=['small_fang'];if(diff==='normal')pool=['small_fang','medium_pelt'];if(diff==='hard')pool=['medium_pelt','large_horn'];if(diff==='epic')pool=['large_horn','ancient_scale'];const key=pool[Math.floor(Math.random()*pool.length)];let n=1;if(diff==='hard'||diff==='epic')n=1+Math.floor(Math.random()*2);if(Math.random()<eff.material)n++;state.inventory[key]=(state.inventory[key]||0)+n;let drops=`${MATS[key]} ×${n}`;if((diff==='hard'||diff==='epic')&&Math.random()<.12+eff.material*.25){state.inventory.shiny_ore=(state.inventory.shiny_ore||0)+1;drops+=`、${MATS.shiny_ore} ×1`}return drops}
function gearEffects(){let xp=0,hardXp=0,material=0,defense=0;const setCount={bone:0,wolf:0,blaze:0,frost:0,storm:0,dragon:0};for(const [slot] of SLOTS){const g=gearById(state.equipped[slot]);if(!g)continue;xp+=g.skills.xp||0;hardXp+=g.skills.hardXp||0;material+=g.skills.material||0;defense+=Number(g.defense)||0;if(setCount[g.set]!=null)setCount[g.set]++}if(setCount.bone>=3)defense+=8;if(setCount.bone>=5)xp+=.03;if(setCount.wolf>=3)xp+=.05;if(setCount.wolf>=5)material+=.12;if(setCount.blaze>=3)hardXp+=.08;if(setCount.blaze>=5)xp+=.07;if(setCount.frost>=3)material+=.08;if(setCount.frost>=5)defense+=18;if(setCount.storm>=3)xp+=.06;if(setCount.storm>=5)hardXp+=.10;if(setCount.dragon>=3)xp+=.10;if(setCount.dragon>=5){xp+=.10;hardXp+=.15;defense+=20}return{xp,hardXp,material,defense,setCount}}
function equippedWeapon(){return gearById(state.equipped.weapon)}
function elementInfo(k){return ELEMENTS[k]||ELEMENTS.none}
function setLabel(set){return ({bone:'骨鎧',wolf:'黒狼',blaze:'緋炎',frost:'氷狼',storm:'雷帝',dragon:'古龍',abyss:'深淵王',astral:'天煌星'})[set]||'無所属'}
function gearTheme(g){
  if(!g)return {main:'#4a3a2b',sub:'#1b1714',glow:'rgba(0,0,0,0)',trim:'#745c38'};
  const set=g.set,el=g.element||'none';
  if(set==='abyss')return {main:'#7a1737',sub:'#1a0f15',glow:'rgba(181,35,85,.28)',trim:'#d26a8f'};
  if(set==='astral')return {main:'#6a54d8',sub:'#151226',glow:'rgba(122,118,255,.25)',trim:'#a5d3ff'};
  if(set==='dragon')return {main:'#6c1a1a',sub:'#1a0e12',glow:'rgba(190,40,60,.22)',trim:'#d6ad45'};
  if(set==='storm')return {main:'#8a6a15',sub:'#17140d',glow:'rgba(240,214,90,.20)',trim:'#e7d77e'};
  if(set==='frost')return {main:'#2f6d8d',sub:'#0e1a22',glow:'rgba(130,215,255,.18)',trim:'#d2f2ff'};
  if(set==='blaze')return {main:'#a33a19',sub:'#21100c',glow:'rgba(255,110,42,.18)',trim:'#ffb16a'};
  if(set==='wolf')return {main:'#405768',sub:'#131a1f',glow:'rgba(90,130,165,.18)',trim:'#b8d6e5'};
  if(set==='bone')return {main:'#76624f',sub:'#1c1712',glow:'rgba(230,212,174,.12)',trim:'#d9c7ab'};
  if(el==='dragon')return {main:'#6e2c73',sub:'#180f18',glow:'rgba(217,156,255,.18)',trim:'#d99cff'};
  if(el==='thunder')return {main:'#7c6717',sub:'#17140b',glow:'rgba(240,214,90,.18)',trim:'#f0d65a'};
  if(el==='fire')return {main:'#963a21',sub:'#1f0f0b',glow:'rgba(255,120,80,.18)',trim:'#ff8b55'};
  if(el==='water')return {main:'#235d84',sub:'#0d151d',glow:'rgba(122,182,233,.18)',trim:'#7ab6e9'};
  if(el==='ice')return {main:'#3e7b92',sub:'#10161b',glow:'rgba(183,232,255,.18)',trim:'#b7e8ff'};
  return {main:'#4a3a2b',sub:'#1b1714',glow:'rgba(0,0,0,0)',trim:'#745c38'};
}