(function(){
'use strict';
let IMG_URL='';
function byId(id){try{return typeof gearById==='function'?gearById(id):null}catch(_){return null}}
function isP96(g){return !!(g&&String(g.id||'').startsWith('photo96_')&&Number.isInteger(g._photo96Index));}
function tile(g,large=false){if(!isP96(g))return'';const i=g._photo96Index,c=i%5,r=Math.floor(i/5);return `<span class="weapon97-tile${large?' large':''}" style="--c:${c};--r:${r}"></span>`;}
async function loadImage(){
  try{
    const res=await fetch('weapon97_cards.b64?v=97',{cache:'no-store'});
    if(!res.ok) throw new Error('asset');
    const b64=(await res.text()).trim();
    IMG_URL=`data:image/webp;base64,${b64}`;
    document.documentElement.style.setProperty('--weapon97-image',`url("${IMG_URL}")`);
    return true;
  }catch(e){console.error('weapon97 image load failed',e);return false;}
}
function installStyle(){if(document.getElementById('weapon97-style'))return;const s=document.createElement('style');s.id='weapon97-style';s.textContent=`
#gearGrid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important}
#gearGrid .gear-item{min-width:0!important;padding:0!important;background:#0b0907!important;border:1px solid #4d3921!important;overflow:hidden!important}
.weapon97-tile{display:block;width:100%;aspect-ratio:1/1;background-image:var(--weapon97-image);background-repeat:no-repeat;background-size:500% 400%;background-position:calc(var(--c) * 25%) calc(var(--r) * 33.333333%);image-rendering:pixelated;image-rendering:crisp-edges;filter:none!important;transform:none!important;background-color:#eadfbd}
.weapon97-tile.large{width:min(280px,72vw);aspect-ratio:1/1}
.weapon97-card small,.weapon97-card .gmeta,.weapon97-card .weapon-name{display:none!important}
#gearDetail .detail-head{align-items:flex-start!important;gap:14px!important}
.weapon97-detail-wrap{overflow:hidden;border:1px solid #5e4425;border-radius:10px;background:#eadfbd;flex:0 0 auto}
@media(min-width:700px){#gearGrid{grid-template-columns:repeat(5,minmax(0,1fr))!important}}
`;document.head.appendChild(s)}
function renderGrid(){const area=document.getElementById('gearGrid');if(!area)return;const list=(Array.isArray(GEAR)?GEAR:[]).filter(g=>g&&g.slot===gearSlot),crafted=Array.isArray(state.craftedGear)?state.craftedGear:[],eq=state.equipped||{};if(gearSlot!=='weapon'){if(typeof window.__p97Grid==='function')return window.__p97Grid();return}if(!selectedGear||!list.some(g=>g.id===selectedGear))selectedGear=eq.weapon||list[0]?.id||null;area.innerHTML='';list.forEach(g=>{const made=crafted.includes(g.id);const b=document.createElement('button');b.type='button';b.dataset.gear=g.id;b.className=`gear-item weapon97-card ${selectedGear===g.id?'selected ':''}${made?'':'locked '}`;b.innerHTML=tile(g);area.appendChild(b)});}
function renderDetail(){const area=document.getElementById('gearDetail');if(!area)return;const g=byId(selectedGear);if(!g){area.innerHTML='<div class="muted">装備を選択してください。</div>';return}if(g.slot!=='weapon'){if(typeof window.__p97Detail==='function')return window.__p97Detail();return}const crafted=Array.isArray(state.craftedGear)?state.craftedGear:[],eq=state.equipped||{},inv=state.inventory||{},costObj=g.cost||{},made=crafted.includes(g.id),equipped=eq.weapon===g.id,craftable=Object.entries(costObj).every(([m,n])=>(Number(inv[m])||0)>=(Number(n)||0));const cost=Object.entries(costObj).map(([m,n])=>`${MATS[m]||m} ${Number(inv[m])||0}/${Number(n)||0}`).join(' ・ ')||'なし';area.innerHTML=`<div class="detail-head"><div class="weapon97-detail-wrap">${tile(g,true)}</div><div><div class="detail-name">${escapeHtml(g.name||'武器')}</div><div>攻撃倍率 ×${(Number(g.power)||1).toFixed(2)}</div></div></div><div class="costs">必要素材：${cost}</div><div class="detail-actions"><button class="btn gold" id="craftGear" ${made||!craftable?'disabled':''}>${made?'作成済み':craftable?'作成する':'素材不足'}</button><button class="btn primary" id="equipGear" ${made?'':'disabled'}>${equipped?'装備を外す':'装備する'}</button></div>`;}
async function install(){installStyle();await loadImage();if(typeof window.renderGearGrid==='function'&&!window.__p97Grid)window.__p97Grid=window.renderGearGrid;if(typeof window.renderGearDetail==='function'&&!window.__p97Detail)window.__p97Detail=window.renderGearDetail;window.renderGearGrid=renderGrid;window.renderGearDetail=renderDetail;const old=window.renderGear;window.renderGear=function(){if(typeof old==='function')old();renderGrid();renderDetail();};try{renderGear()}catch(_){renderGrid();renderDetail()}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();