(function(){
'use strict';
/* v8.0 weapon-art-only patch. Core navigation/save/daily/bestiary/title logic is untouched. */
const IDS=new Set(['wep_small','wep_bone_gs','wep_fire_gs','wep_water_blade','wep_thunder_lance','wep_frost_veil','wep_dragon_gs','wep_wolf_dual','wep_hammer','wep_bow','wep_ancient','wep_abyss_reaper','wep_astral_blade','wep_crimson_burst','wep_storm_howl']);
const SPECIAL={
  wep_hammer:'weapon83-hammer.svg?v=83',
  wep_bow:'weapon83-bow.svg?v=83',
  wep_ancient:'weapon83-ancient.svg?v=83',
  wep_abyss_reaper:'weapon83-abyss.svg?v=83',
  wep_astral_blade:'weapon83-astral.svg?v=83',
  wep_crimson_burst:'weapon83-crimson.svg?v=83'
};
function gear(id){try{return typeof gearById==='function'?gearById(id):null}catch(_){return null}}
function art(g,size){
  if(!g||!IDS.has(g.id))return '';
  if(SPECIAL[g.id])return `<img class="weapon83-img" src="${SPECIAL[g.id]}" width="${size}" height="${size}" alt="" aria-hidden="true">`;
  return `<svg class="weapon81-art" width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true"><use href="weapon81.svg?v=82#${g.id}"></use></svg>`;
}
function aura(g){if(!g)return'';if(g.set==='blaze'||g.element==='fire')return'<span class="weapon-aura79 fire">✹</span>';if(g.set==='storm'||g.element==='thunder')return'<span class="weapon-aura79 thunder">⚡</span>';if(g.set==='frost'||g.element==='ice')return'<span class="weapon-aura79 ice">✦</span>';if(g.set==='abyss'||g.set==='dragon'||g.element==='dragon')return'<span class="weapon-aura79 dragon">✦</span>';if(g.set==='astral'||g.set==='star')return'<span class="weapon-aura79 star">✦</span>';return'';}
function patch(){
  document.querySelectorAll('#gearGrid .gear-item[data-gear]').forEach(btn=>{
    const g=gear(btn.dataset.gear); if(!g||g.slot!=='weapon'||!IDS.has(g.id))return;
    const box=btn.querySelector('.gicon'); if(!box)return;
    const mark='v83-'+g.id; if(box.dataset.weapon81===mark)return;
    box.innerHTML=art(g,88)+aura(g); box.dataset.weapon81=mark;
  });
  try{
    const g=gear(typeof selectedGear==='undefined'?null:selectedGear),box=document.querySelector('#gearDetail .detail-icon');
    if(g&&g.slot==='weapon'&&IDS.has(g.id)&&box){const mark='v83-'+g.id;if(box.dataset.weapon81!==mark){box.innerHTML=art(g,108)+aura(g);box.dataset.weapon81=mark;}}
  }catch(_){ }
}
function observe(id){const el=document.getElementById(id);if(!el)return;new MutationObserver(()=>requestAnimationFrame(patch)).observe(el,{childList:true,subtree:true});}
function boot(){
  const s=document.createElement('style');
  s.textContent='.weapon83-img{display:block;width:96%;height:96%;object-fit:contain;image-rendering:pixelated;image-rendering:crisp-edges;filter:drop-shadow(0 2px 0 rgba(0,0,0,.85)) drop-shadow(0 0 10px rgba(255,190,90,.34));transform:scale(1.13)}.weapon81-art{display:block;width:96%;height:96%;overflow:visible;filter:drop-shadow(0 2px 0 rgba(0,0,0,.75)) drop-shadow(0 0 9px rgba(255,205,112,.28))}.gear-item .gicon:has(.weapon83-img),.detail-icon:has(.weapon83-img),.gear-item .gicon:has(.weapon81-art),.detail-icon:has(.weapon81-art){position:relative;overflow:hidden;background:radial-gradient(circle at 50% 45%,rgba(83,42,78,.34),transparent 48%),linear-gradient(180deg,#150e0d,#070606)!important}.weapon-aura79{position:absolute;z-index:3;font-size:13px;font-weight:800}.weapon-aura79.fire{left:5px;bottom:4px;color:#ff7655;text-shadow:0 0 10px #ff402d}.weapon-aura79.thunder{right:6px;bottom:4px;color:#fff36a;text-shadow:0 0 10px #caa8ff}.weapon-aura79.ice{right:6px;top:4px;color:#e4fbff;text-shadow:0 0 10px #7fd8ff}.weapon-aura79.dragon{left:6px;top:4px;color:#ff79bd;text-shadow:0 0 10px #9e39ff}.weapon-aura79.star{right:6px;top:4px;color:#ffe77b;text-shadow:0 0 10px #f3c84d}';
  document.head.appendChild(s); patch(); observe('gearGrid'); observe('gearDetail');
  document.getElementById('nav')?.addEventListener('click',()=>setTimeout(patch,0));
  document.getElementById('gearTabs')?.addEventListener('click',()=>setTimeout(patch,0));
  document.getElementById('gearGrid')?.addEventListener('click',()=>setTimeout(patch,0));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();