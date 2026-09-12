(function(){
'use strict';
/* v9.3 - show the already-extracted reference crops exactly. No glow / recolor / SVG redraw. */
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
 const c=i%10, r=Math.floor(i/10);
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
.weapon93-box{overflow:hidden!important;padding:0!important;background:#090909!important}
.weapon93-sprite{display:block;width:100%;height:100%;min-height:76px;background-image:url('weapon92_atlas.png?v=93');background-repeat:no-repeat;background-size:1000% 1100%;background-position:calc(var(--x) * 11.111111%) calc(var(--y) * 10%);image-rendering:pixelated;image-rendering:crisp-edges;filter:none!important;transform:none!important;box-shadow:none!important}
.weapon93-card .gicon{height:82px!important;min-height:82px!important;padding:0!important;background:#090909!important}
.weapon93-sprite.large{min-height:160px}
#gearDetail .detail-icon.weapon93-box{height:160px!important;min-height:160px!important}
#gearGrid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important}
#gearGrid .gear-item{min-width:0!important;padding:6px!important}
#gearGrid .gear-item .gname{font-size:9px!important;line-height:1.15!important}
#gearGrid .gear-item .rarity{font-size:9px!important}
@media(max-width:430px){.weapon93-card .gicon{height:76px!important;min-height:76px!important}.weapon93-sprite{min-height:76px}.weapon93-sprite.large{min-height:145px}}
`;
 document.head.appendChild(s);
}
function watch(id){const el=document.getElementById(id);if(!el)return;new MutationObserver(()=>requestAnimationFrame(patch)).observe(el,{childList:true,subtree:true});}
function boot(){style();patch();watch('gearGrid');watch('gearDetail');document.getElementById('nav')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearTabs')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearGrid')?.addEventListener('click',()=>setTimeout(patch,0));setTimeout(patch,120);setTimeout(patch,350);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
