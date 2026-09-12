(function(){
'use strict';
const cache=[];
function byId(id){try{return typeof gearById==='function'?gearById(id):null}catch(_){return null}}
function isW(g){return !!(g&&String(g.id||'').startsWith('photo96_')&&Number.isInteger(g._photo96Index));}
function sourceFrom96(){
  const s=document.getElementById('weapon96-style');
  const t=s&&s.textContent||'';
  const m=t.match(/background-image:url\(['\"]?(data:image\/[^)'\"]+)['\"]?\)/);
  if(m)return m[1];
  const el=document.querySelector('.weapon96-tile');
  if(el){const bg=getComputedStyle(el).backgroundImage;const n=bg.match(/url\(["']?(data:image\/[^)"']+)["']?\)/);if(n)return n[1];}
  return null;
}
function floodTransparent(ctx,w,h){
  const img=ctx.getImageData(0,0,w,h),d=img.data,seen=new Uint8Array(w*h),q=new Int32Array(w*h),seed=[];
  const corners=[[0,0],[w-1,0],[0,h-1],[w-1,h-1]];
  let br=238,bg=228,bb=194,count=0;
  for(const [x,y] of corners){const i=(y*w+x)*4;if(d[i+3]){br+=d[i];bg+=d[i+1];bb+=d[i+2];count++;}}
  if(count){br/=count+1;bg/=count+1;bb/=count+1;}
  function near(i){const dr=d[i]-br,dg=d[i+1]-bg,db=d[i+2]-bb;return d[i+3]>0 && Math.sqrt(dr*dr+dg*dg+db*db)<70 && d[i]>145 && d[i+1]>135 && d[i+2]>105;}
  let qs=0,qe=0;
  for(let x=0;x<w;x++){seed.push(x,(h-1)*w+x)}for(let y=0;y<h;y++){seed.push(y*w,y*w+w-1)}
  for(const p of seed){if(seen[p])continue;const i=p*4;if(!near(i))continue;seen[p]=1;q[qe++]=p;}
  while(qs<qe){const p=q[qs++],x=p%w,y=(p/w)|0;d[p*4+3]=0;const ns=[];if(x)ns.push(p-1);if(x<w-1)ns.push(p+1);if(y)ns.push(p-w);if(y<h-1)ns.push(p+w);for(const n of ns){if(seen[n])continue;const i=n*4;if(near(i)){seen[n]=1;q[qe++]=n;}}}
  ctx.putImageData(img,0,0);
}
async function build(){
  const src=sourceFrom96(); if(!src)return false;
  const im=new Image(); im.src=src; await im.decode();
  const cw=Math.floor(im.naturalWidth/5),ch=Math.floor(im.naturalHeight/4);
  for(let i=0;i<20;i++){
    const c=i%5,r=(i/5)|0;
    const sx=Math.round(c*cw+cw*.07), sy=Math.round(r*ch+ch*.04), sw=Math.round(cw*.86), sh=Math.round(ch*.62);
    const cn=document.createElement('canvas'); cn.width=sw; cn.height=sh; const cx=cn.getContext('2d',{willReadFrequently:true});
    cx.drawImage(im,sx,sy,sw,sh,0,0,sw,sh); floodTransparent(cx,sw,sh); cache[i]=cn.toDataURL('image/png');
  }
  return true;
}
function pic(g,large=false){if(!isW(g))return'';const src=cache[g._photo96Index]||'';return `<div class="weapon98-box${large?' large':''}">${src?`<img src="${src}" alt="${escapeHtml(g.name||'武器')}">`:'<span class="weapon98-loading">…</span>'}</div>`;}
function css(){if(document.getElementById('weapon98-style'))return;const s=document.createElement('style');s.id='weapon98-style';s.textContent=`
#gearGrid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:8px!important}#gearGrid .gear-item{min-width:0!important;padding:7px!important;background:#0b0907!important;border:1px solid #4d3921!important}.weapon98-box{height:84px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:transparent!important}.weapon98-box.large{width:min(220px,54vw);height:min(220px,54vw);max-height:220px}.weapon98-box img{display:block;max-width:94%;max-height:94%;width:auto;height:auto;object-fit:contain;image-rendering:auto;filter:none!important;transform:none!important}.weapon98-box.large img{max-width:90%;max-height:90%}.weapon98-loading{opacity:.4}.weapon98-card .weapon-name{display:block;font-size:9px;line-height:1.15;margin-top:4px}.weapon98-card .gmeta,.weapon98-card small{display:none!important}.weapon98-detail-wrap{display:flex;align-items:center;justify-content:center;flex:0 0 auto;background:transparent!important;border:1px solid #5e4425;border-radius:10px;padding:6px}#gearDetail .detail-head{align-items:center!important;gap:12px!important}@media(min-width:700px){#gearGrid{grid-template-columns:repeat(5,minmax(0,1fr))!important}.weapon98-box{height:110px}.weapon98-box.large{width:240px;height:240px}}
`;document.head.appendChild(s)}
function grid(){const a=document.getElementById('gearGrid');if(!a)return;const list=(Array.isArray(GEAR)?GEAR:[]).filter(g=>g&&g.slot===gearSlot),crafted=Array.isArray(state.craftedGear)?state.craftedGear:[],eq=state.equipped||{};if(gearSlot!=='weapon'){if(typeof window.__w98Grid==='function')return window.__w98Grid();return}if(!selectedGear||!list.some(g=>g.id===selectedGear))selectedGear=eq.weapon||list[0]?.id||null;a.innerHTML='';list.forEach(g=>{const b=document.createElement('button');b.type='button';b.dataset.gear=g.id;b.className=`gear-item weapon98-card ${selectedGear===g.id?'selected ':''}${crafted.includes(g.id)?'':'locked '}`;b.innerHTML=`${pic(g)}<b class="weapon-name">${escapeHtml(g.name||'武器')}</b>`;a.appendChild(b)});}
function detail(){const a=document.getElementById('gearDetail');if(!a)return;const g=byId(selectedGear);if(!g){a.innerHTML='<div class="muted">装備を選択してください。</div>';return}if(g.slot!=='weapon'){if(typeof window.__w98Detail==='function')return window.__w98Detail();return}const crafted=Array.isArray(state.craftedGear)?state.craftedGear:[],eq=state.equipped||{},inv=state.inventory||{},costObj=g.cost||{},made=crafted.includes(g.id),equipped=eq.weapon===g.id,craftable=Object.entries(costObj).every(([m,n])=>(Number(inv[m])||0)>=(Number(n)||0));const cost=Object.entries(costObj).map(([m,n])=>`${MATS[m]||m} ${Number(inv[m])||0}/${Number(n)||0}`).join(' ・ ')||'なし';a.innerHTML=`<div class="detail-head"><div class="weapon98-detail-wrap">${pic(g,true)}</div><div><div class="detail-name">${escapeHtml(g.name||'武器')}</div><div>攻撃倍率 ×${(Number(g.power)||1).toFixed(2)}</div></div></div><div class="costs">必要素材：${cost}</div><div class="detail-actions"><button class="btn gold" id="craftGear" ${made||!craftable?'disabled':''}>${made?'作成済み':craftable?'作成する':'素材不足'}</button><button class="btn primary" id="equipGear" ${made?'':'disabled'}>${equipped?'装備を外す':'装備する'}</button></div>`;}
async function install(){css();if(typeof window.renderGearGrid==='function'&&!window.__w98Grid)window.__w98Grid=window.renderGearGrid;if(typeof window.renderGearDetail==='function'&&!window.__w98Detail)window.__w98Detail=window.renderGearDetail;window.renderGearGrid=grid;window.renderGearDetail=detail;const old=window.renderGear;window.renderGear=function(){if(typeof old==='function')old();grid();detail();};try{grid();detail();await build();grid();detail();}catch(e){console.error('weapon98',e);}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();