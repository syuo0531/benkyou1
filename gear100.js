(function(){
'use strict';
function install(){
  if(document.getElementById('gear100-style')) return;
  const s=document.createElement('style');
  s.id='gear100-style';
  s.textContent=`
  .view[data-view="gear"]>.section:first-child{display:none!important}
  .view[data-view="gear"]>.section:nth-of-type(2){display:grid!important;grid-template-columns:minmax(0,1.6fr) minmax(280px,.95fr);gap:14px!important;align-items:start!important}
  .view[data-view="gear"]>.section:nth-of-type(2)>.section-title,.view[data-view="gear"]>.section:nth-of-type(2)>.gear-tabs{grid-column:1/-1}
  #gearTabs{display:grid!important;grid-template-columns:repeat(7,minmax(0,1fr))!important;gap:8px!important;margin-bottom:2px!important;position:sticky!important;top:0!important;z-index:30!important;background:#0b0907!important;padding:8px!important;border:1px solid #6a4725!important;border-radius:10px!important}
  #gearTabs button{min-height:52px!important;border:1px solid #65441f!important;background:linear-gradient(180deg,#18120c,#0d0906)!important;color:#ead4a5!important;font-weight:800!important;border-radius:8px!important;font-size:15px!important}
  #gearTabs button.active{background:linear-gradient(180deg,#9c651f,#6f4314)!important;color:#fff2c2!important;box-shadow:0 0 0 1px #d6a44b inset,0 0 18px rgba(204,142,44,.25)!important}
  #gearGrid{grid-column:1!important;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:8px!important;padding:8px!important;border:1px solid #5b3d20!important;background:linear-gradient(180deg,#0c0906,#080604)!important;border-radius:10px!important}
  #gearGrid .gear-item{background:#0c0907!important;border:1px solid #5a3d21!important;border-radius:8px!important;padding:5px!important;box-shadow:none!important}
  #gearGrid .gear-item.selected{border-color:#d79c37!important;box-shadow:0 0 0 1px #d79c37 inset,0 0 14px rgba(213,153,51,.28)!important}
  .weapon96-tile{border-radius:6px!important;overflow:hidden!important}
  #gearDetail{grid-column:2!important;position:sticky!important;top:78px!important;min-height:520px!important;background:linear-gradient(180deg,#17100a,#0c0805)!important;border:1px solid #6b4827!important;border-radius:12px!important;padding:18px!important;box-shadow:0 12px 26px rgba(0,0,0,.3)!important}
  #gearDetail .detail-head{display:block!important}
  #gearDetail .weapon96-detail-wrap{width:100%!important;max-width:none!important;background:#120d09!important;border:1px solid #604121!important;border-radius:10px!important;padding:10px!important;box-sizing:border-box!important;margin-bottom:14px!important;display:flex!important;justify-content:center!important;align-items:center!important}
  #gearDetail .weapon96-tile.large{width:min(300px,100%)!important;aspect-ratio:1/1!important;background-size:500% 400%!important;background-repeat:no-repeat!important;filter:none!important;transform:none!important}
  #gearDetail .detail-name{font-size:24px!important;font-weight:900!important;color:#f4dfae!important;margin:4px 0 6px!important}
  #gearDetail .stars{font-size:20px!important;color:#e7aa35!important;letter-spacing:2px!important}
  #gearDetail .costs{margin-top:14px!important;padding-top:14px!important;border-top:1px solid #6a4826!important;line-height:1.8!important}
  #gearDetail .detail-actions{display:grid!important;grid-template-columns:1fr!important;gap:10px!important;margin-top:16px!important}
  #gearDetail .btn{min-height:52px!important;font-size:18px!important;font-weight:800!important}
  .view[data-view="gear"]>.section:nth-of-type(3){margin-top:12px!important}
  @media(max-width:760px){
    .view[data-view="gear"]>.section:nth-of-type(2){grid-template-columns:1fr!important;gap:10px!important}
    .view[data-view="gear"]>.section:nth-of-type(2)>.section-title,.view[data-view="gear"]>.section:nth-of-type(2)>.gear-tabs,#gearGrid,#gearDetail{grid-column:1!important}
    #gearTabs{grid-template-columns:repeat(4,minmax(0,1fr))!important;position:sticky!important;top:0!important}
    #gearTabs button{min-height:46px!important;font-size:14px!important}
    #gearGrid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important;padding:7px!important}
    #gearDetail{position:relative!important;top:auto!important;min-height:0!important;padding:14px!important}
    #gearDetail .weapon96-detail-wrap{max-width:100%!important}
    #gearDetail .weapon96-tile.large{width:min(230px,58vw)!important}
    #gearDetail .detail-name{font-size:21px!important}
  }
  `;
  document.head.appendChild(s);
  try{ if(typeof renderGear==='function') renderGear(); }catch(_){ }
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install); else install();
})();