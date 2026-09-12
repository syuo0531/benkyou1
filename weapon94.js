(function(){
'use strict';
/* v9.4 photo weapon renderer. One sprite sheet, no SVG redraw, no glow. */
const TYPES=['sword','greatsword','katana','dual','lance','axe','hammer','bow','scythe','staff','other'];
const ROW=Object.fromEntries(TYPES.map((t,i)=>[t,i]));
function pos(g){
 if(!g||!String(g.id||'').startsWith('photo94_'))return null;
 const m=String(g.id).match(/^photo94_([^_]+)_(\d+)$/); if(!m)return null;
 const r=ROW[m[1]],c=parseInt(m[2],10)-1;
 if(r==null||c<0||c>9)return null;
 return {r,c};
}
function gear(id){try{return typeof gearById==='function'?gearById(id):null}catch(_){return null}}
function sprite(g,large){const p=pos(g);if(!p)return'';return `<span class="weapon94-sprite${large?' large':''}" style="--c:${p.c};--r:${p.r}" aria-hidden="true"></span>`;}
function replace(box,g,large){
 if(!box||!pos(g))return;
 const key=g.id+(large?':L':':S');
 if(box.dataset.weapon94===key)return;
 box.innerHTML=sprite(g,large);
 box.dataset.weapon94=key;
 box.classList.add('weapon94-box');
}
function patch(){
 document.querySelectorAll('#gearGrid .gear-item[data-gear]').forEach(btn=>{
   const g=gear(btn.dataset.gear); if(!pos(g))return;
   replace(btn.querySelector('.gicon'),g,false);
   btn.classList.add('weapon94-card');
 });
 try{
   const g=gear(typeof selectedGear==='undefined'?null:selectedGear);
   if(pos(g)) replace(document.querySelector('#gearDetail .detail-icon'),g,true);
 }catch(_){ }
}
function style(){
 const s=document.createElement('style');
 s.textContent=`
.weapon94-box{overflow:hidden!important;padding:0!important;background:#0a0a0a!important;border-color:#4d3921!important}
.weapon94-sprite{display:block;width:100%;height:100%;min-height:72px;background-image:url('weapon92_atlas.png?v=94');background-repeat:no-repeat;background-size:1000% 1100%;background-position:calc(var(--c) * 11.111111%) calc(var(--r) * 10%);image-rendering:pixelated;image-rendering:crisp-edges;filter:none!important;transform:none!important}
.weapon94-sprite.large{min-height:150px}
.weapon94-card .gicon{height:78px!important;min-height:78px!important;padding:0!important;background:#0a0a0a!important}
#gearDetail .detail-icon.weapon94-box{height:160px!important;min-height:160px!important}
#gearGrid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important}
#gearGrid .gear-item{min-width:0!important;padding:6px!important}
#gearGrid .gear-item .gname{font-size:9px!important;line-height:1.15!important}
#gearGrid .gear-item .rarity{font-size:9px!important}
@media(max-width:430px){.weapon94-card .gicon{height:72px!important;min-height:72px!important}.weapon94-sprite{min-height:72px}.weapon94-sprite.large{min-height:145px}}
`;
 document.head.appendChild(s);
}
function watch(id){const el=document.getElementById(id);if(!el)return;new MutationObserver(()=>requestAnimationFrame(patch)).observe(el,{childList:true,subtree:true});}
function boot(){style();patch();watch('gearGrid');watch('gearDetail');document.getElementById('nav')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearTabs')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearGrid')?.addEventListener('click',()=>setTimeout(patch,0));setTimeout(patch,120);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
