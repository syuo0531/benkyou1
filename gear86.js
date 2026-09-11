(function(){
'use strict';
/* v8.6 presentation-only upgrade. No navigation/save/game data changes. */
const SETSTYLE={
 bone:{glow:'#d5ad72',soft:'rgba(213,173,114,.16)',mark:'✦'},
 wolf:{glow:'#7ecfff',soft:'rgba(90,170,215,.16)',mark:'◆'},
 blaze:{glow:'#ff4d2d',soft:'rgba(255,70,35,.18)',mark:'✹'},
 frost:{glow:'#80e9ff',soft:'rgba(100,220,255,.18)',mark:'❄'},
 storm:{glow:'#ffe95e',soft:'rgba(255,230,80,.18)',mark:'⚡'},
 dragon:{glow:'#ff5575',soft:'rgba(255,65,100,.18)',mark:'✦'},
 abyss:{glow:'#c95cff',soft:'rgba(185,60,255,.20)',mark:'☾'},
 astral:{glow:'#ffe98d',soft:'rgba(100,145,255,.20)',mark:'✦'},
 tide:{glow:'#65dfff',soft:'rgba(70,200,240,.18)',mark:'≈'},
 star:{glow:'#ffd86e',soft:'rgba(100,110,255,.18)',mark:'✧'},
 horn:{glow:'#f0b45c',soft:'rgba(220,150,70,.16)',mark:'✦'},
 none:{glow:'#d2a05b',soft:'rgba(210,160,90,.12)',mark:'◇'}
};
function gb(id){try{return typeof gearById==='function'?gearById(id):null}catch(_){return null}}
function st(g){return SETSTYLE[g?.set]||SETSTYLE.none}
function rarity(g){return Math.max(1,Math.min(5,Number(g?.rarity)||1))}
function decorateCard(btn,g){
 if(!btn||!g)return;
 const s=st(g),r=rarity(g);
 btn.classList.add('gear86-card');
 btn.style.setProperty('--g86',s.glow);
 btn.style.setProperty('--g86soft',s.soft);
 btn.dataset.gear86Set=g.set||'none';
 let seal=btn.querySelector('.gear86-seal');
 if(!seal){seal=document.createElement('span');seal.className='gear86-seal';btn.appendChild(seal)}
 seal.textContent=s.mark;
 let corners=btn.querySelector('.gear86-corners');
 if(!corners){corners=document.createElement('span');corners.className='gear86-corners';corners.innerHTML='<i></i><i></i><i></i><i></i>';btn.appendChild(corners)}
 let flare=btn.querySelector('.gear86-flare');
 if(r>=4&&!flare){flare=document.createElement('span');flare.className='gear86-flare';flare.innerHTML='<i></i><i></i><i></i>';btn.appendChild(flare)}
 const box=btn.querySelector('.gicon');
 if(box){
   box.classList.add('gear86-artbox');
   box.style.setProperty('--g86',s.glow);
   box.style.setProperty('--g86soft',s.soft);
 }
}
function decorateDetail(g){
 const area=document.getElementById('gearDetail');if(!area||!g)return;
 const s=st(g);area.classList.add('gear86-detail');area.style.setProperty('--g86',s.glow);area.style.setProperty('--g86soft',s.soft);
 const icon=area.querySelector('.detail-icon');if(icon){icon.classList.add('gear86-detail-icon');icon.style.setProperty('--g86',s.glow);icon.style.setProperty('--g86soft',s.soft)}
 let title=area.querySelector('.gear86-series');
 if(!title){title=document.createElement('div');title.className='gear86-series';const head=area.querySelector('.detail-head');head?.appendChild(title)}
 const labels={bone:'BONE RELIC',wolf:'BLACK WOLF',blaze:'CRIMSON FLAME',frost:'FROST FANG',storm:'THUNDER EMPEROR',dragon:'ANCIENT DRAGON',abyss:'ABYSS KING',astral:'ASTRAL SOVEREIGN',tide:'AZURE TIDE',star:'CELESTIAL STAR',horn:'BEAST HORN',none:'HUNTER RELIC'};
 title.textContent=labels[g.set]||labels.none;
}
function patch(){
 document.querySelectorAll('#gearGrid .gear-item[data-gear]').forEach(btn=>decorateCard(btn,gb(btn.dataset.gear)));
 try{const g=gb(typeof selectedGear==='undefined'?null:selectedGear);if(g)decorateDetail(g)}catch(_){}
}
function observe(id){const el=document.getElementById(id);if(!el)return;new MutationObserver(()=>requestAnimationFrame(patch)).observe(el,{childList:true,subtree:true});}
function boot(){
 const style=document.createElement('style');
 style.textContent=`
 #gearGrid{gap:12px!important}
 .gear86-card{position:relative!important;min-height:210px!important;padding:10px!important;border:1px solid rgba(170,118,56,.62)!important;background:linear-gradient(180deg,#110c0b 0%,#090706 100%)!important;box-shadow:inset 0 0 0 1px rgba(255,205,115,.05),0 0 0 1px rgba(0,0,0,.7),0 8px 20px rgba(0,0,0,.35)!important;overflow:hidden!important}
 .gear86-card::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 28%,var(--g86soft),transparent 34%),linear-gradient(180deg,transparent 68%,rgba(255,196,105,.025));pointer-events:none}
 .gear86-card::after{content:'';position:absolute;inset:7px;border:1px solid rgba(219,166,86,.16);pointer-events:none}
 .gear86-card.selected{box-shadow:inset 0 0 0 1px rgba(255,224,150,.18),0 0 18px var(--g86soft),0 8px 24px rgba(0,0,0,.42)!important}
 .gear86-artbox{height:122px!important;min-height:122px!important;margin-bottom:8px!important;border:1px solid rgba(150,100,47,.52)!important;background:radial-gradient(circle at 50% 50%,var(--g86soft),transparent 42%),#070505!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important}
 .gear86-artbox>svg,.gear86-artbox>img{width:112%!important;height:112%!important;max-width:none!important;max-height:none!important;filter:drop-shadow(0 0 7px var(--g86)) drop-shadow(0 2px 0 rgba(0,0,0,.85))!important}
 .gear86-card>b{font-size:14px!important;line-height:1.35!important;position:relative;z-index:2}
 .gear86-card .gmeta{position:relative;z-index:2}
 .gear86-card small{position:relative;z-index:2}
 .gear86-seal{position:absolute;right:16px;top:18px;color:var(--g86);font-size:25px;opacity:.16;filter:drop-shadow(0 0 8px var(--g86));pointer-events:none;z-index:1}
 .gear86-corners i{position:absolute;width:16px;height:16px;border-color:#a97632;opacity:.72;pointer-events:none;z-index:3}.gear86-corners i:nth-child(1){left:5px;top:5px;border-left:2px solid;border-top:2px solid}.gear86-corners i:nth-child(2){right:5px;top:5px;border-right:2px solid;border-top:2px solid}.gear86-corners i:nth-child(3){left:5px;bottom:5px;border-left:2px solid;border-bottom:2px solid}.gear86-corners i:nth-child(4){right:5px;bottom:5px;border-right:2px solid;border-bottom:2px solid}
 .gear86-flare{position:absolute;inset:0;pointer-events:none;z-index:2}.gear86-flare i{position:absolute;width:3px;height:3px;background:var(--g86);box-shadow:0 0 10px var(--g86);animation:g86twinkle 1.8s ease-in-out infinite}.gear86-flare i:nth-child(1){left:15%;top:18%;animation-delay:.1s}.gear86-flare i:nth-child(2){right:14%;top:32%;animation-delay:.7s}.gear86-flare i:nth-child(3){left:55%;top:10%;animation-delay:1.2s}
 @keyframes g86twinkle{0%,100%{opacity:.2;transform:scale(.7)}50%{opacity:1;transform:scale(1.5)}}
 .gear86-detail{position:relative!important;border:1px solid rgba(177,124,55,.55)!important;background:linear-gradient(180deg,#120d0c,#080606)!important;box-shadow:inset 0 0 0 1px rgba(255,210,120,.04),0 0 22px rgba(0,0,0,.3)!important;overflow:hidden!important}
 .gear86-detail::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 20% 25%,var(--g86soft),transparent 32%);pointer-events:none}
 .gear86-detail-icon{width:118px!important;height:118px!important;min-width:118px!important;background:radial-gradient(circle,var(--g86soft),transparent 48%),#070505!important;border:1px solid rgba(190,138,62,.65)!important;box-shadow:0 0 18px var(--g86soft)!important;overflow:hidden!important}
 .gear86-detail-icon>svg,.gear86-detail-icon>img{width:112%!important;height:112%!important;max-width:none!important;max-height:none!important;filter:drop-shadow(0 0 9px var(--g86)) drop-shadow(0 3px 0 rgba(0,0,0,.85))!important}
 .gear86-series{margin-top:7px;font-size:9px;letter-spacing:.18em;color:var(--g86);opacity:.84;text-shadow:0 0 7px var(--g86)}
 .tiny-badge.rare{color:#ffd76a!important;text-shadow:0 0 7px rgba(255,210,90,.35)}
 @media(max-width:460px){.gear86-card{min-height:198px!important;padding:8px!important}.gear86-artbox{height:112px!important;min-height:112px!important}.gear86-detail-icon{width:104px!important;height:104px!important;min-width:104px!important}}
 `;
 document.head.appendChild(style);patch();observe('gearGrid');observe('gearDetail');
 document.getElementById('nav')?.addEventListener('click',()=>setTimeout(patch,0));
 document.getElementById('gearTabs')?.addEventListener('click',()=>setTimeout(patch,0));
 document.getElementById('gearGrid')?.addEventListener('click',()=>setTimeout(patch,0));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();