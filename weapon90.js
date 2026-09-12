(function(){
'use strict';
/* v9.1: photo-cropped weapon sprites from the user's three reference sheets. Visual only. */
const TYPES=['sword','greatsword','katana','dual','lance','axe','hammer','bow','scythe','staff','other'];
const rowMap=Object.fromEntries(TYPES.map((t,i)=>[t,i]));
function info(g){if(!g||!String(g.id||'').startsWith('atlas89_'))return null;const m=String(g.id).match(/^atlas89_([^_]+)_(\d+)$/);if(!m)return null;const row=rowMap[m[1]],col=parseInt(m[2],10)-1;if(row==null||col<0||col>9)return null;return{row,col};}
function sprite(g,large){const p=info(g);if(!p)return'';return `<span class="weapon90-sprite${large?' large':''}" style="--c:${p.col};--r:${p.row}" aria-hidden="true"></span>`;}
function getGear(id){try{return typeof gearById==='function'?gearById(id):null}catch(_){return null}}
function replace(box,g,large){if(!box||!info(g))return;const key=`${g.id}:${large?'L':'S'}`;if(box.dataset.weapon90===key)return;box.innerHTML=sprite(g,large);box.dataset.weapon90=key;box.classList.add('weapon90-box');}
function patch(){document.querySelectorAll('#gearGrid .gear-item[data-gear]').forEach(btn=>{const g=getGear(btn.dataset.gear);if(!info(g))return;replace(btn.querySelector('.gicon'),g,false);btn.classList.add('weapon90-card')});try{const g=getGear(typeof selectedGear==='undefined'?null:selectedGear);if(info(g))replace(document.querySelector('#gearDetail .detail-icon'),g,true)}catch(_){}}
function style(){const s=document.createElement('style');s.textContent=`
.weapon90-box{overflow:hidden!important;background:#070707!important;padding:0!important}
.weapon90-sprite{display:block;width:100%;height:100%;min-height:74px;background-image:url('weapon91_atlas.webp?v=91');background-repeat:no-repeat;background-size:1000% 1100%;background-position:calc(var(--c)*11.111111%) calc(var(--r)*10%);image-rendering:pixelated;image-rendering:crisp-edges;}
.weapon90-sprite.large{min-height:148px}.weapon90-card .gicon{height:82px!important;min-height:82px!important}#gearDetail .detail-icon.weapon90-box{min-height:160px!important;height:160px!important}
@media(max-width:430px){.weapon90-card .gicon{height:76px!important;min-height:76px!important}.weapon90-sprite{min-height:76px}.weapon90-sprite.large{min-height:145px}}
`;document.head.appendChild(s);}
function watch(id){const el=document.getElementById(id);if(!el)return;new MutationObserver(()=>requestAnimationFrame(patch)).observe(el,{childList:true,subtree:true});}
function boot(){style();patch();watch('gearGrid');watch('gearDetail');document.getElementById('nav')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearTabs')?.addEventListener('click',()=>setTimeout(patch,0));document.getElementById('gearGrid')?.addEventListener('click',()=>setTimeout(patch,0));setTimeout(patch,120);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
