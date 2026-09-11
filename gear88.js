(function(){
'use strict';
/* v8.8 compact sprite-sheet-like equipment layout. Visual only. */
function gb(id){try{return typeof gearById==='function'?gearById(id):null}catch(_){return null}}
function decorate(){
 const grid=document.getElementById('gearGrid');
 if(!grid)return;
 grid.classList.add('g88-grid');
 document.querySelectorAll('#gearGrid .gear-item[data-gear]').forEach(btn=>{
  const g=gb(btn.dataset.gear);if(!g)return;
  btn.classList.add('g88-item');
  btn.dataset.rarity=Math.max(1,Math.min(5,Number(g.rarity)||1));
  btn.dataset.slot=g.slot||'';
  const box=btn.querySelector('.gicon');if(box)box.classList.add('g88-icon');
  let stars=btn.querySelector('.g88-stars');
  if(!stars){stars=document.createElement('span');stars.className='g88-stars';btn.appendChild(stars)}
  stars.textContent='★'.repeat(Math.max(1,Math.min(5,Number(g.rarity)||1)));
 });
 const d=document.getElementById('gearDetail');if(d)d.classList.add('g88-detail');
}
function observe(id){const el=document.getElementById(id);if(!el)return;new MutationObserver(()=>requestAnimationFrame(decorate)).observe(el,{childList:true,subtree:true});}
function boot(){
 const s=document.createElement('style');
 s.textContent=`
 /* reference-sheet style: dense, art-first, easy to compare silhouettes */
 #gearGrid.g88-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important;padding:8px!important;background:linear-gradient(180deg,#0b0806,#060504)!important;border:1px solid #5f3d20!important;box-shadow:inset 0 0 0 1px rgba(255,211,133,.035)!important}
 #gearGrid .g88-item{min-height:122px!important;height:122px!important;padding:5px!important;border:1px solid rgba(133,88,43,.72)!important;border-radius:3px!important;background:linear-gradient(180deg,#110c09 0%,#090605 100%)!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;gap:2px!important;overflow:hidden!important;box-shadow:none!important;position:relative!important}
 #gearGrid .g88-item::before{content:''!important;position:absolute!important;inset:3px!important;border:1px solid rgba(224,164,79,.08)!important;pointer-events:none!important}
 #gearGrid .g88-item::after{content:none!important}
 #gearGrid .g88-item.selected{border-color:#d89a3a!important;box-shadow:0 0 0 1px rgba(255,201,95,.20),0 0 10px rgba(215,151,52,.18)!important;background:linear-gradient(180deg,#1a1009,#0b0705)!important}
 #gearGrid .g88-item[data-rarity="5"]{border-color:#a66b29!important;background:radial-gradient(circle at 50% 35%,rgba(135,75,28,.10),transparent 45%),linear-gradient(180deg,#130d09,#080504)!important}
 #gearGrid .g88-icon{width:100%!important;height:78px!important;min-height:78px!important;margin:0!important;border:0!important;background:transparent!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:visible!important;padding:0!important}
 #gearGrid .g88-icon>svg,#gearGrid .g88-icon>img{width:94%!important;height:94%!important;max-width:none!important;max-height:none!important;object-fit:contain!important;filter:saturate(1.12) contrast(1.05) drop-shadow(0 2px 0 rgba(0,0,0,.85))!important}
 #gearGrid .g88-item[data-rarity="5"] .g88-icon>svg,#gearGrid .g88-item[data-rarity="5"] .g88-icon>img{filter:saturate(1.18) contrast(1.07) drop-shadow(0 0 5px rgba(255,185,69,.25)) drop-shadow(0 2px 0 rgba(0,0,0,.9))!important}
 #gearGrid .g88-item>b{font-family:serif!important;font-size:9px!important;line-height:1.15!important;max-width:100%!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;color:#e3d0ae!important;position:relative!important;z-index:2!important;text-align:center!important}
 #gearGrid .g88-item .gmeta{display:none!important}
 #gearGrid .g88-item small{display:none!important}
 #gearGrid .g88-item .gear86-seal,#gearGrid .g88-item .g87-seal{font-size:15px!important;right:5px!important;top:5px!important;opacity:.12!important}
 #gearGrid .g88-item .gear86-corners,#gearGrid .g88-item .g87-corners{display:none!important}
 #gearGrid .g88-item .gear86-flare{opacity:.55!important}
 #gearGrid .g88-stars{display:block!important;font-size:7px!important;line-height:1!important;letter-spacing:-1px!important;color:#d9a53c!important;text-shadow:0 0 5px rgba(255,197,62,.22)!important;position:relative!important;z-index:3!important;margin-top:1px!important}
 #gearGrid .g88-item[data-rarity="1"] .g88-stars{opacity:.55!important}
 #gearGrid .g88-item[data-rarity="2"] .g88-stars{opacity:.65!important}
 #gearGrid .g88-item[data-rarity="3"] .g88-stars{opacity:.75!important}
 #gearGrid .g88-item[data-rarity="4"] .g88-stars{opacity:.88!important}
 #gearGrid .g88-item[data-rarity="5"] .g88-stars{color:#ffd35b!important;opacity:1!important}
 #gearTabs{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:6px!important;padding:7px!important}
 #gearTabs button{min-height:38px!important;padding:6px 3px!important;font-size:12px!important}
 #gearDetail.g88-detail{margin-top:10px!important}
 .g88-detail .detail-icon{width:124px!important;height:124px!important;min-width:124px!important}
 @media(max-width:360px){#gearGrid.g88-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}.g88-detail .detail-icon{width:110px!important;height:110px!important;min-width:110px!important}}
 @media(min-width:600px){#gearGrid.g88-grid{grid-template-columns:repeat(6,minmax(0,1fr))!important}}
 `;
 document.head.appendChild(s);
 decorate();observe('gearGrid');observe('gearDetail');observe('gearTabs');
 document.getElementById('nav')?.addEventListener('click',()=>setTimeout(decorate,0));
 document.getElementById('gearTabs')?.addEventListener('click',()=>setTimeout(decorate,0));
 document.getElementById('gearGrid')?.addEventListener('click',()=>setTimeout(decorate,0));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();