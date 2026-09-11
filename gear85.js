(function(){
'use strict';
/* v8.0 visual-only gear upgrade. Does not modify navigation/save/daily/bestiary/game logic. */
const KEEP_WEAPONS=new Set(['wep_hammer','wep_bow','wep_ancient','wep_abyss_reaper','wep_astral_blade','wep_crimson_burst']);
const SETS={
 bone:{a:'#f3ddba',b:'#a77a50',c:'#4b2f20',glow:'#f3c879'},
 wolf:{a:'#dbe9f0',b:'#7894a5',c:'#18232c',glow:'#8fd6ff'},
 blaze:{a:'#ffcc72',b:'#d93e21',c:'#250908',glow:'#ff4d2d'},
 frost:{a:'#effdff',b:'#62cfff',c:'#102c57',glow:'#82eaff'},
 storm:{a:'#fff28b',b:'#c49b26',c:'#171307',glow:'#fff36a'},
 dragon:{a:'#f0c875',b:'#9b233d',c:'#18080d',glow:'#ff496b'},
 abyss:{a:'#ff9bcf',b:'#8b2bd0',c:'#110619',glow:'#d75cff'},
 astral:{a:'#fff4c2',b:'#6f8cff',c:'#10152f',glow:'#9db4ff'},
 tide:{a:'#dff9ff',b:'#45badd',c:'#0c2d49',glow:'#68dfff'},
 star:{a:'#fff4c1',b:'#ad86ff',c:'#171020',glow:'#e2baff'},
 horn:{a:'#f0c68d',b:'#8c5c3b',c:'#1b1009',glow:'#ffcb72'},
 none:{a:'#f3d39b',b:'#8a6242',c:'#18100c',glow:'#e9b56c'}
};
function gear(id){try{return typeof gearById==='function'?gearById(id):null}catch(_){return null}}
function pal(g){return SETS[g?.set]||SETS.none}
function defs(p){return `<defs><linearGradient id="g1" x2="1" y2="1"><stop stop-color="${p.a}"/><stop offset=".48" stop-color="${p.b}"/><stop offset="1" stop-color="${p.c}"/></linearGradient><filter id="gl"><feGaussianBlur stdDeviation="1.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`}
function wrap(body,p,size=96){return `<svg class="gear85-art" width="${size}" height="${size}" viewBox="0 0 120 120" shape-rendering="crispEdges" aria-hidden="true">${defs(p)}${body}</svg>`}
function weapon(g,size){const p=pal(g);let b='';switch(g.id){
case 'wep_small':b=`<path d="M18 98l19-20 43-56 13 10-42 58-19 18z" fill="url(#g1)" stroke="${p.a}" stroke-width="3"/><path d="M30 81l18 18M22 103l18-18" stroke="#d6a64a" stroke-width="6"/><circle cx="25" cy="100" r="5" fill="#ffd869"/>`;break;
case 'wep_bone_gs':b=`<path d="M18 102l17-31 10 4 8-15-7-8 12-15 10 4 16-22 19 13-14 22 8 8-13 16-10-5-9 17 6 9-18 10z" fill="url(#g1)" stroke="${p.a}" stroke-width="3"/><path d="M41 84l18 17" stroke="#6d462d" stroke-width="7"/><path d="M57 38l15 9M50 54l16 9" stroke="#fff0c9" stroke-width="2"/>`;break;
case 'wep_fire_gs':b=`<path d="M17 102l18-28 9 5 9-18-8-8 13-17 9 4 17-21 20 14-15 22 7 8-14 18-9-5-10 19 6 8-17 10z" fill="url(#g1)" stroke="#ff9a56" stroke-width="3" filter="url(#gl)"/><path d="M38 84l19 16" stroke="#61140d" stroke-width="7"/><path d="M72 31l8-11M81 46l11-8M64 52l-1-14" stroke="#ffdf68" stroke-width="3"/>`;break;
case 'wep_water_blade':b=`<path d="M17 102Q51 82 91 20l13 9Q70 84 36 108z" fill="url(#g1)" stroke="${p.a}" stroke-width="3" filter="url(#gl)"/><path d="M32 87l19 13" stroke="#184c70" stroke-width="6"/><path d="M82 30l8-12 6 18M58 62l18-6" stroke="#c5f6ff" stroke-width="3"/>`;break;
case 'wep_thunder_lance':b=`<path d="M24 106L66 55" stroke="#4b3e24" stroke-width="9"/><path d="M65 57l-8-25 15 7 8-24 9 22 16-9-9 28-16 18z" fill="url(#g1)" stroke="${p.a}" stroke-width="3" filter="url(#gl)"/><path d="M67 35l18 8M73 52l19-5" stroke="#fff8a7" stroke-width="3"/>`;break;
case 'wep_ice_blade':case 'wep_frost_veil':b=`<path d="M16 102Q52 81 89 20l13 9Q69 84 35 108z" fill="url(#g1)" stroke="${p.a}" stroke-width="3" filter="url(#gl)"/><path d="M31 89l21 12" stroke="#4259a4" stroke-width="6"/><path d="M89 20l6-11 7 20M70 44l16 2M60 62l18 3" stroke="#e8fdff" stroke-width="3"/>`;break;
case 'wep_dragon_gs':b=`<path d="M18 103l18-29 9 5 10-20-8-8 14-16 9 5 14-21 20 13-14 22 7 8-14 17-9-5-10 20 6 9-19 10z" fill="url(#g1)" stroke="#ff5578" stroke-width="3" filter="url(#gl)"/><circle cx="68" cy="54" r="7" fill="#ff334f" stroke="#ffd06a" stroke-width="2"/><path d="M35 85l21 16" stroke="#271116" stroke-width="7"/>`;break;
case 'wep_wolf_dual':b=`<g fill="url(#g1)" stroke="${p.a}" stroke-width="3" filter="url(#gl)"><path d="M17 91l18-42 13 8 10-28 9 27-12 20-9 28z"/><path d="M103 91L85 49l-13 8-10-28-9 27 12 20 9 28z"/></g><circle cx="60" cy="65" r="6" fill="#ffd86b"/><path d="M37 79l18-5M83 79l-18-5" stroke="#ecf9ff" stroke-width="3"/>`;break;
case 'wep_storm_howl':b=`<path d="M27 106L65 54" stroke="#725537" stroke-width="9"/><path d="M63 56l-8-22 14 5 8-22 8 20 15-8-8 26-15 18z" fill="url(#g1)" stroke="${p.a}" stroke-width="3" filter="url(#gl)"/><path d="M55 32l-10 9 10 5-9 8M92 31l10 8-9 7 9 7" fill="none" stroke="#fff36a" stroke-width="3"/>`;break;
default:return '';}return wrap(b,p,size)}
function armor(g,size){const p=pal(g),sp=g.slot;let b='';
if(sp==='head')b=`<path d="M27 73Q29 30 60 19Q91 30 93 73L82 60 76 38 60 49 44 38 38 61z" fill="url(#g1)" stroke="${p.a}" stroke-width="4" filter="url(#gl)"/><path d="M36 75h48l-8 18H44z" fill="${p.c}" stroke="${p.b}" stroke-width="3"/><path d="M46 63l8-9 6 8 7-8 8 9" fill="none" stroke="${p.glow}" stroke-width="3"/>`;
if(sp==='chest')b=`<path d="M27 29l21-13 12 12 12-12 21 13 12 66-27 13-18-17-18 17-27-13z" fill="url(#g1)" stroke="${p.a}" stroke-width="4" filter="url(#gl)"/><path d="M47 29l13 15 13-15M60 45v49M34 57l17 7M86 57l-17 7" fill="none" stroke="${p.glow}" stroke-width="3"/><circle cx="60" cy="58" r="6" fill="${p.glow}"/>`;
if(sp==='arms')b=`<g fill="url(#g1)" stroke="${p.a}" stroke-width="4" filter="url(#gl)"><path d="M23 28l25 7-8 60-23 9-7-16z"/><path d="M97 28l-25 7 8 60 23 9 7-16z"/></g><path d="M22 54l19 5M98 54l-19 5M20 78l18 4M100 78l-18 4" stroke="${p.glow}" stroke-width="3"/>`;
if(sp==='waist')b=`<path d="M25 31h70l-6 28-17 5-12 31-12-31-17-5z" fill="url(#g1)" stroke="${p.a}" stroke-width="4" filter="url(#gl)"/><path d="M32 43h56M45 58l15 9 15-9M60 67v24" stroke="${p.glow}" stroke-width="3"/><circle cx="60" cy="44" r="7" fill="${p.glow}"/>`;
if(sp==='legs')b=`<g fill="url(#g1)" stroke="${p.a}" stroke-width="4" filter="url(#gl)"><path d="M27 22h28l-3 34-8 45H18l12-45z"/><path d="M93 22H65l3 34 8 45h26L90 56z"/></g><path d="M31 48h20M69 48h20M27 74h20M73 74h20" stroke="${p.glow}" stroke-width="3"/>`;
if(sp==='charm'){const gem=g.set==='abyss'?'#b94cff':g.set==='astral'?'#67a7ff':'#ffd45a';b=`<circle cx="60" cy="48" r="24" fill="url(#g1)" stroke="${p.a}" stroke-width="4" filter="url(#gl)"/><path d="M60 20v-9M60 85v24M36 48H22M98 48H84" stroke="${p.b}" stroke-width="5"/><path d="M60 34l14 14-14 18-14-18z" fill="${gem}" stroke="#fff1b0" stroke-width="3"/><circle cx="60" cy="48" r="5" fill="#fff"/>`}
if(!b)return '';
if(g.set==='abyss')b+=`<path d="M18 23l14 9-10 10M102 23l-14 9 10 10" fill="none" stroke="#cf54ff" stroke-width="4"/><circle cx="22" cy="21" r="3" fill="#ff71d2"/><circle cx="98" cy="21" r="3" fill="#ff71d2"/>`;
if(g.set==='astral')b+=`<g fill="#fff0a4"><path d="M20 23l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/><path d="M100 18l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></g>`;
if(g.set==='storm')b+=`<path d="M18 24l12 8-8 7 10 7M102 24l-12 8 8 7-10 7" fill="none" stroke="#fff36a" stroke-width="4"/>`;
if(g.set==='blaze')b+=`<path d="M23 17l8 13-6 5 10 9M97 17l-8 13 6 5-10 9" fill="none" stroke="#ff5d32" stroke-width="4"/>`;
if(g.set==='frost')b+=`<path d="M20 23l10 4-6 8 10 3M100 23l-10 4 6 8-10 3" fill="none" stroke="#bff7ff" stroke-width="3"/>`;
if(g.set==='dragon')b+=`<path d="M20 25l12-12 6 14M100 25L88 13l-6 14" fill="none" stroke="#ff607e" stroke-width="4"/>`;
return wrap(b,p,size)}
function art(g,size=88){if(!g)return'';if(g.slot==='weapon'){if(KEEP_WEAPONS.has(g.id))return '';return weapon(g,size)}return armor(g,size)}
function aura(g){if(!g)return'';const p=pal(g);return `<span class="gear85-aura" style="color:${p.glow};text-shadow:0 0 10px ${p.glow}">✦</span>`}
function patch(){
document.querySelectorAll('#gearGrid .gear-item[data-gear]').forEach(btn=>{const g=gear(btn.dataset.gear);if(!g)return;if(g.slot==='weapon'&&KEEP_WEAPONS.has(g.id))return;const box=btn.querySelector('.gicon');if(!box)return;const html=art(g,92);if(!html)return;const mark='g85-'+g.id;if(box.dataset.gear85===mark)return;box.innerHTML=html+(Number(g.rarity)>=4?aura(g):'');box.dataset.gear85=mark;});
try{const g=gear(typeof selectedGear==='undefined'?null:selectedGear),box=document.querySelector('#gearDetail .detail-icon');if(g&&box&&!(g.slot==='weapon'&&KEEP_WEAPONS.has(g.id))){const html=art(g,112),mark='g85-'+g.id;if(html&&box.dataset.gear85!==mark){box.innerHTML=html+(Number(g.rarity)>=4?aura(g):'');box.dataset.gear85=mark;}}}catch(_){}
document.querySelectorAll('#gearSlots .slot-pill').forEach((el,i)=>{try{const key=(typeof SLOTS!=='undefined'&&SLOTS[i])?SLOTS[i][0]:null;const g=key?gear(state?.equipped?.[key]):null;if(!g||g.slot==='weapon'&&KEEP_WEAPONS.has(g.id))return;const target=el.querySelector('.slot-pixel');if(target){const html=art(g,34);if(html)target.innerHTML=html;}}catch(_){}});
}
function observe(id){const el=document.getElementById(id);if(!el)return;new MutationObserver(()=>requestAnimationFrame(patch)).observe(el,{childList:true,subtree:true});}
function boot(){const s=document.createElement('style');s.textContent=`.gear85-art{display:block;width:100%;height:100%;object-fit:contain;overflow:visible;filter:drop-shadow(0 2px 0 rgba(0,0,0,.75)) drop-shadow(0 0 9px rgba(255,190,100,.16))}.gear-item .gicon:has(.gear85-art),.detail-icon:has(.gear85-art){position:relative;overflow:hidden!important;background:radial-gradient(circle at 50% 48%,rgba(82,54,82,.28),transparent 48%),linear-gradient(180deg,#140d0c,#070606)!important;padding:1px!important}.gear85-aura{position:absolute;right:6px;top:5px;z-index:3;font-size:13px;font-weight:900;animation:g85p 1.5s ease-in-out infinite}.slot-pixel .gear85-art{width:28px!important;height:28px!important}@keyframes g85p{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.18)}}`;document.head.appendChild(s);patch();observe('gearGrid');observe('gearDetail');observe('gearSlots');document.getElementById('nav')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearTabs')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearGrid')?.addEventListener('click',()=>setTimeout(patch,0));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();