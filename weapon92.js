(function(){
'use strict';
/* v9.2: exact crops from the user's reference images. No redraw/glow. */
const TYPES=['sword','greatsword','katana','dual','lance','axe','hammer','bow','scythe','staff','other'];
const rowMap=Object.fromEntries(TYPES.map((t,i)=>[t,i]));
function idx(g){
  if(!g||!String(g.id||'').startsWith('atlas89_')) return null;
  const m=String(g.id).match(/^atlas89_([^_]+)_(\d+)$/); if(!m) return null;
  const r=rowMap[m[1]], c=parseInt(m[2],10)-1; if(r==null||c<0||c>9) return null;
  return r*10+c;
}
function sprite(g,large){const i=idx(g);if(i==null||i>109)return'';const c=i%10,r=Math.floor(i/10);return `<span class="weapon92-sprite${large?' large':''}" style="--c:${c};--r:${r}"></span>`;}
function gear(id){try{return typeof gearById==='function'?gearById(id):null}catch(_){return null}}
function replace(box,g,large){if(!box||idx(g)==null)return;const key=g.id+(large?':L':':S');if(box.dataset.w92===key)return;box.innerHTML=sprite(g,large);box.dataset.w92=key;box.classList.add('weapon92-box');}
function patch(){
 document.querySelectorAll('#gearGrid .gear-item[data-gear]').forEach(btn=>{const g=gear(btn.dataset.gear);if(idx(g)==null)return;replace(btn.querySelector('.gicon'),g,false);btn.classList.add('weapon92-card');});
 try{const g=gear(typeof selectedGear==='undefined'?null:selectedGear);if(idx(g)!=null)replace(document.querySelector('#gearDetail .detail-icon'),g,true)}catch(_){ }
}
function style(){const s=document.createElement('style');s.textContent=`
.weapon92-box{overflow:hidden!important;background:#090909!important;padding:0!important;border-color:#4b351e!important}
.weapon92-sprite{display:block;width:100%;height:100%;min-height:72px;background-image:url('weapon92_atlas.png?v=92');background-repeat:no-repeat;background-size:1000% 1100%;background-position:calc(var(--c) * 11.111111%) calc(var(--r) * 10%);image-rendering:pixelated;image-rendering:crisp-edges}
.weapon92-sprite.large{min-height:150px}
.weapon92-card .gicon{height:78px!important;min-height:78px!important;padding:0!important;background:#090909!important}
#gearDetail .detail-icon.weapon92-box{height:160px!important;min-height:160px!important}
#gearGrid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important}
#gearGrid .gear-item{min-width:0!important;padding:6px!important}
#gearGrid .gear-item .gname{font-size:9px!important;line-height:1.15!important}
#gearGrid .gear-item .rarity{font-size:9px!important}
@media(max-width:430px){.weapon92-card .gicon{height:72px!important;min-height:72px!important}.weapon92-sprite{min-height:72px}.weapon92-sprite.large{min-height:145px}}
`;document.head.appendChild(s);}
function watch(id){const el=document.getElementById(id);if(!el)return;new MutationObserver(()=>requestAnimationFrame(patch)).observe(el,{childList:true,subtree:true});}
function boot(){style();patch();watch('gearGrid');watch('gearDetail');document.getElementById('nav')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearTabs')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearGrid')?.addEventListener('click',()=>setTimeout(patch,0));setTimeout(patch,100);setTimeout(patch,400);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
