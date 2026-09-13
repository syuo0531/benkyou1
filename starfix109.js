(function(){'use strict';
function clean(){
 const grid=document.getElementById('gearGrid');
 if(grid){
   grid.querySelectorAll('.g88-stars').forEach(el=>el.remove());
   grid.querySelectorAll('.stars,.rarity,.gmeta').forEach(el=>{if(!el.classList.contains('w105-stars'))el.style.display='none'});
 }
 const d=document.getElementById('gearDetail');
 if(d)d.querySelectorAll('.g88-stars,.stars,.rarity,.gmeta').forEach(el=>{if(!el.classList.contains('w105-stars'))el.style.display='none'});
}
const s=document.createElement('style');s.textContent=`#gearGrid .g88-stars{display:none!important}#gearGrid .w105-stars{display:block!important}#gearDetail .g88-stars{display:none!important}`;document.head.appendChild(s);
function boot(){clean();const g=document.getElementById('gearGrid');if(g)new MutationObserver(()=>requestAnimationFrame(clean)).observe(g,{childList:true,subtree:true});const d=document.getElementById('gearDetail');if(d)new MutationObserver(()=>requestAnimationFrame(clean)).observe(d,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();