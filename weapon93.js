(function(){
'use strict';
/* v9.3 - exact rectangular crops from the user's reference images. No glow, no recolor, no SVG redraw. */
const TYPES=['sword','greatsword','katana','dual','lance','axe','hammer','bow','scythe','staff','other'];
const rowMap=Object.fromEntries(TYPES.map((t,i)=>[t,i]));
function indexOfGear(g){
 if(!g||!String(g.id||'').startsWith('atlas89_'))return -1;
 const m=String(g.id).match(/^atlas89_([^_]+)_(\d+)$/); if(!m)return -1;
 const r=rowMap[m[1]], c=parseInt(m[2],10)-1; if(r==null||c<0||c>9)return -1;
 return r*10+c;
}
function tile(g,large){
 const i=indexOfGear(g); if(i<0)return '';
 const c=i%11, r=Math.floor(i/11);
 return `<span class="weapon93-sprite${large?' large':''}" style="--x:${c};--y:${r}" aria-hidden="true"></span>`;
}
function byId(id){try{return typeof gearById==='function'?gearById(id):null}catch(_){return null}}
function replace(box,g,large){
 if(!box||indexOfGear(g)<0)return;
 const k=`${g.id}:${large?'L':'S'}`; if(box.dataset.weapon93===k)return;
 box.innerHTML=tile(g,large); box.dataset.weapon93=k; box.classList.add('weapon93-box');
}
function patch(){
 document.querySelectorAll('#gearGrid .gear-item[data-gear]').forEach(btn=>{
   const g=byId(btn.dataset.gear); if(indexOfGear(g)<0)return;
   replace(btn.querySelector('.gicon'),g,false); btn.classList.add('weapon93-card');
 });
 try{const g=byId(typeof selectedGear==='undefined'?null:selectedGear); if(indexOfGear(g)>=0)replace(document.querySelector('#gearDetail .detail-icon'),g,true)}catch(_){ }
}
function style(){
 const s=document.createElement('style');
 s.textContent=`
.weapon93-box{overflow:hidden!important;padding:0!important;background:#111!important}
.weapon93-sprite{display:block;width:100%;height:100%;min-height:76px;background-image:url('weapon93_exact_atlas.webp?v=93');background-repeat:no-repeat;background-size:1100% 1000%;background-position:calc(var(--x) * 10%) calc(var(--y) * 11.111111%);image-rendering:pixelated;image-rendering:crisp-edges;filter:none!important;transform:none!important}
.weapon93-card .gicon{height:82px!important;min-height:82px!important;padding:0!important}
.weapon93-sprite.large{min-height:160px}
#gearDetail .detail-icon.weapon93-box{height:160px!important;min-height:160px!important}
@media(max-width:430px){.weapon93-card .gicon{height:76px!important;min-height:76px!important}.weapon93-sprite{min-height:76px}}
`;
 document.head.appendChild(s);
}
function watch(id){const el=document.getElementById(id);if(!el)return;new MutationObserver(()=>requestAnimationFrame(patch)).observe(el,{childList:true,subtree:true});}
function boot(){style();patch();watch('gearGrid');watch('gearDetail');document.getElementById('nav')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearTabs')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearGrid')?.addEventListener('click',()=>setTimeout(patch,0));setTimeout(patch,120);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
