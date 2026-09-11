function attackMultiplier(boss){const w=equippedWeapon(),we=w?.element||'none';if(!boss||we==='none')return 1;if(boss.weakness===we)return 1.35;if(boss.element===we)return .75;return 1}
function hunterDamageOnFailure(count=1){const defense=gearEffects().defense;const per=Math.max(5,20-Math.floor(defense/12));return per*Math.max(1,count)}
function counterRateForBoss(boss){return ({small:.12,medium:.18,large:.25,ancient:.32}[boss?.tierKey]||.12)}
function counterBaseDamage(boss){return ({small:10,medium:15,large:22,ancient:30}[boss?.tierKey]||10)}
function resolveCounterattack(boss){
  if(!boss||boss.hp<=0)return {triggered:false,damage:0};
  const rate=counterRateForBoss(boss);
  if(Math.random()>=rate)return {triggered:false,damage:0,rate};
  const defense=gearEffects().defense;
  const raw=counterBaseDamage(boss)+Math.floor(Math.random()*7)-3;
  const damage=Math.max(3,Math.round(raw-defense/15));
  state.player.hp=Math.max(0,state.player.hp-damage);
  let fainted=false;
  if(state.player.hp<=0){
    fainted=true;
    state.player.hp=Math.ceil(state.player.maxHp*.5);
    state.log.push({name:'力尽きた…キャンプへ帰還',date:Date.now(),type:'faint'});
  }
  state.log.push({name:`${boss.name}の反撃`,hpDamage:damage,date:Date.now(),type:'counter'});
  return {triggered:true,damage,rate,fainted};
}
function healHunter(n){state.player.hp=Math.min(state.player.maxHp,state.player.hp+Math.max(0,Math.round(n||0)))}
function rewardXp(base,diff='normal'){const e=gearEffects();return Math.max(1,Math.round(base*(1+e.xp+(diff==='hard'||diff==='epic'?e.hardXp:0))))}
function grantXp(amount){let a=Math.max(0,Math.round(amount));state.xp+=a;let up=false;while(state.xp>=xpNeed()){state.xp-=xpNeed();state.level++;up=true}return up}
function completeLearning(name,baseXp,minutes,diff='normal'){const gain=rewardXp(baseXp,diff);state.totalDone++;touchStudyDay(minutes,name);const materialDrop=questMaterialDrop(diff);const boss=getActiveBoss();let defeated=null,damage=0,mult=1,counter={triggered:false,damage:0,rate:0,fainted:false};if(boss){mult=attackMultiplier(boss);const weapon=equippedWeapon();damage=Math.max(1,Math.round(gain*(weapon?.power||1)*mult));boss.hp-=damage;if(boss.hp<=0){boss.hp=0;defeated=boss}else{counter=resolveCounterattack(boss)}}healHunter(3);state.log.push({name,xp:gain,damage,minutes,materialDrop,date:Date.now(),type:'quest'});const up=grantXp(gain);return{gain,damage,mult,boss,defeated,up,counter,materialDrop}}
function getActiveBoss(){let b=state.bosses.find(x=>x.id===state.activeBossId);if(!b&&state.bosses.length){b=state.bosses[0];state.activeBossId=b.id}return b}
function dropMaterials(boss){const map={small:'small_fang',medium:'medium_pelt',large:'large_horn',ancient:'ancient_scale'},key=map[boss.tierKey]||'small_fang';const eff=gearEffects();let n=1+Math.floor(Math.random()*3);if(Math.random()<eff.material)n++;state.inventory[key]=(state.inventory[key]||0)+n;let text=`${MATS[key]} ×${n}`;if(Math.random()<.15+eff.material*.35){state.inventory.shiny_ore=(state.inventory.shiny_ore||0)+1;text+=`、${MATS.shiny_ore} ×1`}return text}
function defeatBoss(boss){let entry=state.bestiary.find(x=>x.name===boss.name);if(entry){entry.count++;entry.tierKey=boss.tierKey;entry.element=boss.element||'none';entry.weakness=boss.weakness||'none'}else state.bestiary.push({name:boss.name,tierKey:boss.tierKey,element:boss.element||'none',weakness:boss.weakness||'none',count:1,firstAt:Date.now()});const drops=dropMaterials(boss);grantXp(boss.reward||Math.round(boss.maxHp*.2));state.bosses=state.bosses.filter(x=>x.id!==boss.id);if(state.activeBossId===boss.id)state.activeBossId=state.bosses[0]?.id||null;
  const nextStage=(boss.reviewStage??-1)+1;if(nextStage<REVIEW_DAYS.length){state.reviewQueue.push({name:boss.originalName||boss.name.replace(/^【復習】/,'').trim(),tierKey:boss.tierKey,element:boss.element||'none',weakness:boss.weakness||'none',maxHp:Math.max(50,Math.round(boss.maxHp*.72)),stage:nextStage,dueDate:addDaysKey(dateKey(),REVIEW_DAYS[nextStage])})}return drops}
function checkReviews(){const today=dateKey();const due=state.reviewQueue.filter(r=>r.dueDate<=today);state.reviewQueue=state.reviewQueue.filter(r=>r.dueDate>today);for(const r of due){state.bosses.push({id:'b'+Date.now()+Math.random().toString(36).slice(2,6),name:`【復習${REVIEW_DAYS[r.stage]}日】${r.name}`,originalName:r.name,maxHp:r.maxHp,hp:r.maxHp,tierKey:r.tierKey,reward:Math.round(r.maxHp*.15),deadlineAt:null,reviewStage:r.stage})}if(due.length&&!state.activeBossId)state.activeBossId=state.bosses[0]?.id||null}
function checkDeadlines(){const now=Date.now();const expired=state.bosses.filter(b=>b.deadlineAt&&b.deadlineAt<=now);if(!expired.length)return;state.bosses=state.bosses.filter(b=>!b.deadlineAt||b.deadlineAt>now);if(!state.bosses.some(b=>b.id===state.activeBossId))state.activeBossId=state.bosses[0]?.id||null;const dmg=hunterDamageOnFailure(expired.length);state.player.hp=Math.max(0,state.player.hp-dmg);state.log.push({name:`討伐失敗 ×${expired.length}`,hpDamage:dmg,date:Date.now(),type:'damage'});if(state.player.hp<=0){state.player.hp=Math.ceil(state.player.maxHp*.5);state.log.push({name:'力尽きた…キャンプへ帰還',date:Date.now(),type:'faint'})}}
function checkAchievements(){if(!Array.isArray(state.achievements))state.achievements=[];for(const a of ACH){try{if(!state.achievements.includes(a.id)&&a.ok(state))state.achievements.push(a.id)}catch(e){console.warn('achievement check skipped',a.id,e)}}}
function canCraft(g){try{const costs=(g&&g.cost&&typeof g.cost==='object')?g.cost:{};const inv=(state&&state.inventory&&typeof state.inventory==='object')?state.inventory:{};return Object.entries(costs).every(([m,n])=>(Number(inv[m])||0)>=(Number(n)||0))}catch(e){return false}}
function craft(g){try{if(!g)return false;if(!Array.isArray(state.craftedGear))state.craftedGear=[];if(!state.inventory||typeof state.inventory!=='object')state.inventory={};if(state.craftedGear.includes(g.id)||!canCraft(g))return false;for(const [m,n] of Object.entries((g.cost&&typeof g.cost==='object')?g.cost:{}))state.inventory[m]=Math.max(0,(Number(state.inventory[m])||0)-(Number(n)||0));state.craftedGear.push(g.id);return true}catch(e){console.error('craft error',e);return false}}