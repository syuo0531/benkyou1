(function(){
'use strict';
/* v9.4.1 direct photo weapon renderer. No observer timing dependency. */
const TYPES=['sword','greatsword','katana','dual','lance','axe','hammer','bow','scythe','staff','other'];
const ROW=Object.fromEntries(TYPES.map((t,i)=>[t,i]));
function pos(g){if(!g||!String(g.id||'').startsWith('photo94_'))return null;const m=String(g.id).match(/^photo94_([^_]+)_(\d+)$/);if(!m)return null;const r=ROW[m[1]],c=parseInt(m[2],10)-1;return (r==null||c<0||c>9)?null:{r,c};}
function sprite(g,large=false){const p=pos(g);if(!p)return'';return `<span class="weapon94-sprite${large?' large':''}" style="--c:${p.c};--r:${p.r}"></span>`;}
function byId(id){try{return typeof gearById==='function'?gearById(id):null}catch(_){return null}}
function installStyle(){if(document.getElementById('weapon94-style'))return;const s=document.createElement('style');s.id='weapon94-style';s.textContent=`
#gearGrid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important}
#gearGrid .gear-item{min-width:0!important;padding:6px!important}
.weapon94-icon,.weapon94-detail-icon{overflow:hidden;background:#0b0b0b;border:1px solid #4d3921;border-radius:8px;padding:0!important}
.weapon94-icon{height:76px}.weapon94-detail-icon{height:160px;width:160px;max-width:42vw}
.weapon94-sprite{display:block;width:100%;height:100%;background-image:url('weapon92_atlas.png?v=941');background-repeat:no-repeat;background-size:1000% 1100%;background-position:calc(var(--c)*11.111111%) calc(var(--r)*10%);image-rendering:pixelated;image-rendering:crisp-edges;filter:none!important;transform:none!important}
.weapon94-card .weapon-name{font-size:9px;line-height:1.15;margin-top:5px;display:block;white-space:normal}
.weapon94-card .gmeta{gap:2px!important}.weapon94-card .tiny-badge{font-size:8px!important;padding:2px 3px!important}
@media(min-width:700px){#gearGrid{grid-template-columns:repeat(6,minmax(0,1fr))!important}.weapon94-icon{height:92px}}
`;document.head.appendChild(s)}
function renderPhotoGrid(){
 const area=document.getElementById('gearGrid');if(!area)return;
 const list=(Array.isArray(GEAR)?GEAR:[]).filter(g=>g&&g.slot===gearSlot),crafted=Array.isArray(state.craftedGear)?state.craftedGear:[],eq=state.equipped||{};
 if(!selectedGear||!list.some(g=>g.id===selectedGear))selectedGear=eq[gearSlot]||list[0]?.id||null;
 if(gearSlot!=='weapon'){if(typeof window.__pixel68Grid==='function')return window.__pixel68Grid();return;}
 area.innerHTML='';
 list.forEach(g=>{const made=crafted.includes(g.id),equipped=eq.weapon===g.id,r=Math.max(1,Math.min(5,Number(g.rarity)||1));const b=document.createElement('button');b.type='button';b.dataset.gear=g.id;b.className=`gear-item weapon94-card r${r} ${selectedGear===g.id?'selected ':''}${made?'':'locked '}`;b.innerHTML=`<div class="weapon94-icon">${sprite(g)}</div><b class="weapon-name">${escapeHtml(g.name||'武器')}</b><div class="gmeta"><span class="tiny-badge rare">${'★'.repeat(r)}</span></div><small>${equipped?'装備中':made?'作成済み':'未作成'}</small>`;area.appendChild(b)});
}
function renderPhotoDetail(){
 const area=document.getElementById('gearDetail');if(!area)return;const g=byId(selectedGear);
 if(!g){area.innerHTML='<div class="muted">装備を選択してください。</div>';return}
 if(g.slot!=='weapon'){if(typeof window.__pixel68Detail==='function')return window.__pixel68Detail();return;}
 const crafted=Array.isArray(state.craftedGear)?state.craftedGear:[],eq=state.equipped||{},inv=state.inventory||{},costObj=g.cost||{},made=crafted.includes(g.id),equipped=eq.weapon===g.id,craftable=Object.entries(costObj).every(([m,n])=>(Number(inv[m])||0)>=(Number(n)||0)),r=Math.max(1,Math.min(5,Number(g.rarity)||1));
 const cost=Object.entries(costObj).map(([m,n])=>`${MATS[m]||m} ${Number(inv[m])||0}/${Number(n)||0}`).join(' ・ ')||'なし';
 area.innerHTML=`<div class="detail-head"><div class="weapon94-detail-icon">${sprite(g,true)}</div><div><div class="detail-name">${escapeHtml(g.name||'武器')}</div><div class="stars">${'★'.repeat(r)}${'☆'.repeat(5-r)}</div><div>攻撃倍率 ×${(Number(g.power)||1).toFixed(2)}</div></div></div><div class="costs">必要素材：${cost}</div><div class="detail-actions"><button class="btn gold" id="craftGear" ${made||!craftable?'disabled':''}>${made?'作成済み':craftable?'作成する':'素材不足'}</button><button class="btn primary" id="equipGear" ${made?'':'disabled'}>${equipped?'装備を外す':'装備する'}</button></div>`;
}
function install(){
 installStyle();
 if(typeof window.renderGearGrid==='function'&&!window.__pixel68Grid)window.__pixel68Grid=window.renderGearGrid;
 if(typeof window.renderGearDetail==='function'&&!window.__pixel68Detail)window.__pixel68Detail=window.renderGearDetail;
 window.renderGearGrid=renderPhotoGrid;window.renderGearDetail=renderPhotoDetail;
 const old=window.renderGear;window.renderGear=function(){if(typeof old==='function')old();renderPhotoGrid();renderPhotoDetail();};
 try{if(typeof renderGear==='function')renderGear()}catch(_){try{renderPhotoGrid();renderPhotoDetail()}catch(__){}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
