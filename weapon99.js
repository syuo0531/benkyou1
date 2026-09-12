(function(){'use strict';
function install(){
 const d=document;
 const s=d.createElement('style');
 s.textContent=`
 .weapon96-tile,.weapon97-tile{image-rendering:auto!important;filter:none!important;transform:none!important}
 .weapon96-tile.large,.weapon97-tile.large{width:min(210px,54vw)!important;aspect-ratio:1/1!important;background-size:500% 400%!important;background-repeat:no-repeat!important}
 .weapon96-detail-wrap,.weapon97-detail-wrap{max-width:58vw!important;padding:6px!important;background:#0b0907!important}
 #gearDetail .detail-head{align-items:center!important;gap:12px!important}
 `;
 d.head.appendChild(s);
 try{if(typeof renderGear==='function')renderGear();}catch(_){ }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();