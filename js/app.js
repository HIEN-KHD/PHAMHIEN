/* ===== Trạng thái ===== */
const HERO=()=>(S&&S.hero)||'Lâm Phong';
let S,byId,adj,showAll=false,curWorld=null,curRealm=null;
function useStory(id){
  S=STORIES.find(s=>s.id===id);if(!S)return false;
  // Mỗi truyện có hệ cảnh giới riêng: thay nội dung GROUPS/REALMS/RIDX/GBY dùng chung
  const rs=S.realmSet;if(rs&&REALMS!==rs.realms){GROUPS.length=0;GROUPS.push(...rs.groups);REALMS.length=0;REALMS.push(...rs.realms);
    for(const k in RIDX)delete RIDX[k];REALMS.forEach((r,i)=>{RIDX[r.id]=i});for(const k in GBY)delete GBY[k];GROUPS.forEach(g=>{GBY[g.id]=g})}
  byId=Object.fromEntries(S.worlds.map(w=>[w.id,w]));
  adj=Object.fromEntries(S.worlds.map(w=>[w.id,[]]));S.links.forEach(([a,b])=>{adj[a].push(b);adj[b].push(a)});
  store.set('lastStory',id);return true;
}
const linkType=(a,b)=>{const l=S.links.find(([x,y])=>(x===a&&y===b)||(x===b&&y===a));return l&&l[2]==='up'?'up':'side'};
function route(from,to){const prev={[from]:null},q=[from];while(q.length){const u=q.shift();if(u===to)break;for(const v of adj[u])if(!(v in prev)){prev[v]=u;q.push(v)}}if(!(to in prev))return null;const p=[];for(let u=to;u!==null;u=prev[u])p.unshift(u);return p}
const go=h=>{location.hash=h};
const rangeOf=w=>[RIDX[w.r[0]],RIDX[w.r[1]]];
function bindOpen(g,fn){g.addEventListener('click',fn);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn()}})}

/* ===== Thanh điều hướng ===== */
// Dự án một truyện: không có màn thư viện, thanh điều hướng bắt đầu từ tên truyện
const ONE=STORIES.length===1;
if(ONE){const b=document.querySelector('.brand');if(b){b.href='#'+STORIES[0].id;b.lastChild.textContent=STORIES[0].title}document.title=STORIES[0].title+' — bản đồ thế giới'}
function setBar(crumbs,nav){
  if(ONE&&crumbs.length>1&&crumbs[0][0]==='Thư viện')crumbs=crumbs.slice(1);
  document.getElementById('crumbs').innerHTML=crumbs.map((c,i)=>(i?'<span class="sep">/</span>':'')+(c[1]?`<a href="${c[1]}">${esc(c[0])}</a>`:`<b>${esc(c[0])}</b>`)).join('');
  document.getElementById('barNav').innerHTML=(nav||[]).map(([t,h])=>`<a href="${h}">${esc(t)}</a>`).join('');
}

/* ===== Màn 1: Thư viện ===== */
function coverArt(sv,w,hh,seed){
  el('rect',{width:w,height:hh,fill:'url(#sky)'},sv);
  el('ellipse',{cx:w/2,cy:hh*.58,rx:w*.45,ry:hh*.36,fill:'#4b3bbd',opacity:.4,filter:'url(#blur)'},sv);
  stars(sv,Math.round(w*hh/1400),w,hh,seed);
  el('ellipse',{cx:w/2,cy:hh*.64,rx:w*.46,ry:hh*.34,fill:'none',stroke:'#9b8cff','stroke-dasharray':'6 6',opacity:.6},sv);
}
function renderHome(){
  setBar([['Thư viện']]);
  const s=STORIES.find(x=>x.id===store.get('lastStory'))||STORIES[0];useStory(s.id);
  const f=document.getElementById('feature');
  f.innerHTML=`<div class="feature-text">
      <span class="eyebrow">Truyện nổi bật</span>
      <h1>${esc(s.title)}</h1>
      <span class="meta">${esc(s.author)} · ${esc(s.genre)} · <a class="chref" href="${s.source}" target="_blank" rel="noopener">đọc truyện</a></span>
      <p class="sub">${esc(s.sub)}</p>
      <div class="stats"><div class="stat"><b>${s.worlds.length}</b><span>thế giới</span></div><div class="stat"><b>${s.links.length}</b><span>đường hầm</span></div><div class="stat"><b>${REALMS.length}</b><span>cảnh giới</span></div><div class="stat"><b>${(s.people||[]).length}</b><span>nhân vật</span></div></div>
      <div class="actions"><a class="btn primary" href="#${s.id}">Mở bản đồ thế giới →</a><a class="btn primary" href="#${s.id}--3d">Vũ trụ 3D</a><a class="btn" href="#${s.id}--hanh-trinh">Hành trình</a><a class="btn" href="#${s.id}--nhan-vat">Nhân vật</a><a class="btn" href="#${s.id}--cong-phap">Công pháp</a></div>
    </div><a class="feature-art" href="#${s.id}" aria-label="Mở bản đồ ${esc(s.title)}"></a>`;
  const sv=el('svg',{viewBox:'0 0 560 420',preserveAspectRatio:'xMidYMid slice','aria-hidden':'true'});f.querySelector('.feature-art').appendChild(sv);
  coverArt(sv,560,420,5);
  [['sun',280,95,.85],['dragon',120,215,.85],['heaven',280,225,.8],['tree',440,215,.8],['demon',200,320,.7],['abyss',380,320,.7],['start',280,385,.7]].forEach(([k,x,y,sc])=>ART[k](el('g',{transform:`translate(${x},${y}) scale(${sc})`},sv)));

  const shelf=document.getElementById('shelf');shelf.innerHTML='';
  STORIES.forEach(st=>{
    const a=document.createElement('a');a.className='cover';a.href='#'+st.id;
    const c=el('svg',{viewBox:'0 0 300 400','aria-hidden':'true'});a.appendChild(c);coverArt(c,300,400,11);
    // Hình bìa lấy từ các thế giới của chính truyện đó (cao → thấp)
    const ks=[...new Set([...st.worlds].sort((x,y)=>y.tier-x.tier).map(w=>w.kind))].filter(k=>ART[k]).slice(0,4);
    [[150,90,.8],[80,220,.7],[225,225,.7],[150,330,.7]].forEach(([x,y,sc],i)=>{const k=ks[i]||ks[ks.length-1];if(k)ART[k](el('g',{transform:`translate(${x},${y}) scale(${sc})`},c))});
    const cap=document.createElement('div');cap.className='cap';
    cap.innerHTML=`<span class="t">${esc(st.title)}</span><span class="meta">${esc(st.author)}</span><span class="meta">${st.worlds.length} thế giới · ${(st.realmSet?st.realmSet.realms:REALMS).length} cảnh giới</span>`;
    a.appendChild(cap);shelf.appendChild(a);
  });
  const add=document.createElement('div');add.className='cover empty';
  add.innerHTML='<span class="plus">+</span><b style="color:var(--ink)">Truyện tiếp theo</b><span class="meta">Gửi bản đồ hoặc danh sách thế giới cho Claude để thêm vào kệ.</span>';
  shelf.appendChild(add);
  document.getElementById('libCount').textContent=`${STORIES.length} truyện`;
}

/* ===== Màn 2: Bản đồ ===== */
function curve(a,b){const mx=(a.x+b.x)/2,my=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),k=.16*len,nx=-dy/len,ny=dx/len;return `M${a.x},${a.y} Q${mx+nx*k},${my+ny*k} ${b.x},${b.y}`}
let mapDrawnFor=null;
function showPreview(wid){
  const p=document.getElementById('preview');
  svgMap().querySelectorAll('.world').forEach(n=>n.classList.toggle('hl',n.dataset.id===wid));
  svgMap().querySelectorAll('.tunnel').forEach(n=>n.classList.toggle('on',!!wid&&(n.dataset.a===wid||n.dataset.b===wid)));
  if(!wid){p.innerHTML=`<div class="sec"><span class="eyebrow">Xem trước</span><p>Rê chuột hoặc chạm vào một vùng trên bản đồ để xem nhanh. Bấm lần nữa để vào thế giới đó.</p></div><div class="sec"><h3>Gợi ý</h3><p class="meta">Hành trình bắt đầu ở ${esc(short(byId[S.start].name))}, góc dưới bản đồ. Đường hầm vàng dẫn lên tầng cao hơn.</p></div>`;return}
  const w=byId[wid],[a,b]=rangeOf(w),steps=(route(S.start,wid)||[wid]).length-1;
  p.innerHTML=`<div class="sec"><span class="eyebrow">Tầng ${w.tier} · ${esc(S.tiers[w.tier].name)}</span><h2 class="pname">${esc(w.name)}</h2><p>${esc(w.about)}</p></div>
    <div class="stats"><div class="stat"><b>${steps}</b><span>bước từ khởi đầu</span></div><div class="stat"><b>${adj[wid].length}</b><span>đường hầm</span></div><div class="stat"><b>${b-a+1}</b><span>cảnh giới</span></div></div>
    <p class="meta">Cảnh giới: ${esc(REALMS[a].name)} → ${esc(REALMS[b].name)}</p>
    <div><a class="btn primary" href="#${S.id}--${wid}">Vào ${esc(short(w.name))} →</a></div>`;
}
const svgMap=()=>document.getElementById('map');
function renderMap(){
  setBar([['Thư viện','#thu-vien'],[S.title]],[['Vũ trụ 3D',`#${S.id}--3d`],['Nhân vật',`#${S.id}--nhan-vat`],['Hành trình',`#${S.id}--hanh-trinh`],['Công pháp',`#${S.id}--cong-phap`]]);
  document.getElementById('storyTitle').textContent=S.title;
  const ups=S.links.filter(l=>l[2]==='up').length;
  document.getElementById('stats').innerHTML=`<div class="stat"><b>${S.worlds.length}</b><span>thế giới</span></div><div class="stat"><b>${S.links.length}</b><span>đường hầm</span></div><div class="stat"><b>${ups}</b><span>lối lên cấp cao</span></div>`;
  document.getElementById('tierList').innerHTML=[4,3,2,1].map(t=>{const ws=S.worlds.filter(w=>w.tier===t);
    return `<div class="grp"><span class="eyebrow">Tầng ${t} · ${esc(S.tiers[t].name)}</span><div class="chips">${ws.map(w=>`<a class="chip" data-pv="${w.id}" href="#${S.id}--${w.id}">${esc(w.name)}</a>`).join('')}</div></div>`}).join('');
  if(mapDrawnFor!==S.id){
    mapDrawnFor=S.id;
    const svg=svgMap();svg.innerHTML='';
    el('rect',{x:0,y:0,width:820,height:960,fill:'url(#sky)'},svg);
    [[150,170,190,110,'#4b3bbd',.45],[690,150,170,100,'#2a5fb5',.35],[420,620,260,180,'#3a2a8a',.35],[90,760,160,120,'#1f6b8a',.35],[760,800,150,120,'#6a2a7a',.3]].forEach(([cx,cy,rx,ry,c,o])=>el('ellipse',{cx,cy,rx,ry,fill:c,opacity:o,filter:'url(#blur)'},svg));
    const st=stars(svg,320,820,960,2024);[[60,60],[770,420],[30,880],[790,40]].forEach(([x,y])=>sparkle(st,x,y));
    const rg=S.ring;
    el('ellipse',{cx:rg.cx,cy:rg.cy,rx:rg.rx,ry:rg.ry,fill:'#6a5cff',opacity:.05},svg);
    el('ellipse',{cx:rg.cx,cy:rg.cy,rx:rg.rx,ry:rg.ry,fill:'none',stroke:'#9b8cff','stroke-width':1.6,'stroke-dasharray':'8 7',opacity:.7},svg);
    el('text',{x:rg.lx,y:rg.ly,'text-anchor':'middle','font-family':'Cormorant Garamond, Georgia, serif','font-size':22,'font-weight':700,'letter-spacing':2,fill:'#d9d3ff'},svg).textContent=rg.label;
    const tl=el('g',{},svg);
    S.links.forEach(([a,b,t])=>{
      const A=byId[a],B=byId[b],c=t==='up'?'#f2c76e':'#8fd6ff',d=curve(A,B),g=el('g',{class:'tunnel','data-a':a,'data-b':b},tl);
      el('path',{d,class:'halo',stroke:c,filter:'url(#glow)'},g);
      const core=el('path',{d,class:'core',stroke:c},g),L=core.getTotalLength();
      [.2,.8].forEach(f=>{const p=core.getPointAtLength(L*f);el('ellipse',{cx:p.x,cy:p.y,rx:7,ry:3.5,fill:'#0a0b22',stroke:c,'stroke-width':2,filter:'url(#glow)'},g)});
    });
    const wl=el('g',{},svg);
    S.worlds.forEach(w=>{
      const g=el('g',{class:'world',tabindex:0,role:'link','aria-label':'Vào '+w.name,'data-id':w.id,transform:`translate(${w.x},${w.y})`},wl);
      el('rect',{class:'hit',x:-80,y:-90,width:160,height:170},g);
      ART[w.kind](el('g',{class:'art'},g));
      const ly=w.kind==='nine'?52:['sea','isles','abyss'].includes(w.kind)?48:72;
      el('text',{class:'label',x:0,y:ly},g).textContent=w.name;
      // Chuột: rê để xem trước, bấm để vào. Cảm ứng: chạm lần 1 xem trước, lần 2 vào.
      g.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')showPreview(w.id)});
      g.addEventListener('focus',()=>showPreview(w.id));
      g.addEventListener('click',e=>{if(e.pointerType&&e.pointerType!=='mouse'&&pvSel!==w.id){pvSel=w.id;showPreview(w.id);return}go(`${S.id}--${w.id}`)});
      g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go(`${S.id}--${w.id}`)}});
    });
  }
  pvSel=null;showPreview(null);
}
let pvSel=null;
document.getElementById('tierList').addEventListener('mouseover',e=>{const c=e.target.closest('[data-pv]');if(c)showPreview(c.dataset.pv)});

/* ===== Màn 3: Thế giới ===== */
function renderLadder(w){
  const [a,b]=rangeOf(w),box=document.getElementById('ladder');
  document.getElementById('realmRange').textContent=w.rGuess
    ?`Từ ${REALMS[a].name} tới ${REALMS[b].name}. Ước lượng, vì chưa có chương nói rõ cảnh giới ở đây. Bấm một bậc để xem cách đột phá.`
    :`Cảnh giới của ${HERO()} trong các chương ở thế giới này: ${REALMS[a].name} → ${REALMS[b].name}. Bấm một bậc để xem cách đột phá.`;
  document.getElementById('towerBadge').innerHTML=w.rGuess?'<span class="badge guess">ước lượng</span>':'<span class="badge src">theo mốc chương</span>';
  const list=REALMS.map((r,i)=>({r,i})).filter(({i})=>showAll||(i>=a&&i<=b));
  const groups=[];list.forEach(x=>{const last=groups[groups.length-1];if(last&&last.g===x.r.g)last.items.push(x);else groups.push({g:x.r.g,items:[x]})});
  box.innerHTML=groups.reverse().map(gr=>{const G=GBY[gr.g];
    return `<div class="grp"><span class="grp-name"><i style="background:${G.c}"></i>${esc(G.name)} · ${esc(G.han)}</span><div class="rungs">${
      gr.items.map(({r,i})=>`<button type="button" class="rung${i<a||i>b?' out':''}" data-realm="${r.id}" aria-pressed="${r.id===curRealm}" style="--c:${G.c}"><span class="n">${i+1}</span><span>${esc(r.name)} <span class="lv">${esc(r.han)}</span></span><span class="lv">${esc(r.lv)}</span></button>`).join('')}</div></div>`}).join('');
  document.getElementById('toggleAll').textContent=showAll?'Chỉ hiện cảnh giới của thế giới này':`Hiện toàn bộ ${REALMS.length} cảnh giới`;
}

function levelViz(r,c){
  if(/^10 trọng/.test(r.lv))return `<div class="dots" style="--c:${c}" aria-hidden="true">${'<i></i>'.repeat(10)}</div><div class="lvl-cap"><span>Nhất trọng</span><span>Thập trọng → đột phá</span></div>`;
  if(/^99/.test(r.lv))return `<div class="ticks" style="--c:${c}" aria-hidden="true">${'<i></i>'.repeat(99)}</div><div class="lvl-cap"><span>Tầng 1</span><span>Tầng 99 → độ kiếp</span></div>`;
  if(r.lv.includes('·'))return `<div class="flow">${r.lv.split('·').map(x=>`<span>${esc(x.trim())}</span>`).join('<span class="arrow" style="border:0;padding:0">→</span>')}</div>`;
  return '';
}

function renderRealm(){
  const i=RIDX[curRealm],r=REALMS[i],G=GBY[r.g],next=REALMS[i+1],prev=REALMS[i-1];
  const tag=k=>k==='t'?'<span class="badge src">theo truyện</span>':k==='w'?'<span class="badge web">bách khoa</span>':'<span class="badge guess">diễn giải</span>';
  const p=document.getElementById('realmPanel');
  p.innerHTML=`
    <div class="sec"><span class="eyebrow" style="color:${G.c}">Bậc ${i+1}/${REALMS.length} · ${esc(G.name)}</span>
      <h2 class="rname">${esc(r.name)}<small>${esc(r.han)}</small></h2>
      <div class="flow">${prev?`<span>${esc(prev.name)}</span><span class="arrow" style="border:0;padding:0">→</span>`:''}<span class="me">${esc(r.name)}</span>${next?`<span class="arrow" style="border:0;padding:0">→</span><span>${esc(next.name)}</span>`:''}</div></div>
    ${r.lf?`<p class="meta">${HERO()} đạt cảnh giới này ở ${chLink(r.lf)}</p>`:''}
    <div class="sec"><h3>Phân tầng ${tag(r.tLv)}</h3><p>${esc(r.lv)}</p>${levelViz(r,G.c)}</div>
    <div class="sec"><h3>Đặc điểm ${tag(r.tTrait)}</h3><p>${esc(r.trait)}</p></div>
    <div class="sec"><h3>Cách đột phá ${tag(r.tHow)}</h3>
      <div class="step"><span class="to">${esc(r.name)} → <b>${next?esc(next.name):'Đỉnh hệ thống'}</b></span><p>${esc(r.how)}</p>
      ${r.kiep?`<p class="kiep">Kiếp phải độ: ${esc(r.kiep)}</p>`:''}</div>
      ${r.ch.length?`<div class="refs"><span class="meta" style="margin-right:6px">Đọc thêm:</span>${r.ch.map(chLink).join('')}</div>`:''}</div>
    <div class="nav2"><button type="button" data-step="-1" ${prev?'':'disabled'}>↓ ${prev?esc(prev.name):''}</button><button type="button" data-step="1" ${next?'':'disabled'}>${next?esc(next.name):''} ↑</button></div>
    <div class="sec"><h3><label for="rnote">Ghi chú của bạn</label></h3>
      <textarea id="rnote" placeholder="Chương đột phá, ai đạt ${esc(r.name)}, chi tiết bạn đọc được…">${esc(store.get(`rnote:${S.id}:${r.id}`)||'')}</textarea><span class="saved" id="rsaved"></span></div>
    <p class="meta">"Theo truyện": tóm tắt từ chương truyện (bản convert). "Bách khoa": từ bách khoa trên web. "Diễn giải": suy ra từ tên gọi.</p>`;
  const ta=p.querySelector('#rnote'),sv=p.querySelector('#rsaved');let t;
  ta.addEventListener('input',()=>{clearTimeout(t);t=setTimeout(()=>{sv.textContent=store.set(`rnote:${S.id}:${r.id}`,ta.value)?'Đã lưu trên trình duyệt này':'Trình duyệt không cho lưu ghi chú'},400)});
  document.querySelectorAll('[data-realm]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.realm===curRealm));
}

function renderWorld(wid){
  const w=byId[wid];curWorld=wid;
  const [lo,hi]=rangeOf(w);const saved=store.get(`realm:${S.id}:${wid}`);curRealm=saved&&saved in RIDX?saved:REALMS[lo].id;
  const order=S.worlds.map(x=>x.id),k=order.indexOf(wid),pw=byId[order[(k-1+order.length)%order.length]],nw=byId[order[(k+1)%order.length]];
  setBar([['Thư viện','#thu-vien'],[S.title,'#'+S.id],[short(w.name)]],[['← '+short(pw.name),`#${S.id}--${pw.id}`],['Xem 3D',`#${S.id}--3d`],[short(nw.name)+' →',`#${S.id}--${nw.id}`]]);
  document.getElementById('wTier').textContent=`Tầng ${w.tier} · ${S.tiers[w.tier].name} · ${w.type}`;
  document.getElementById('wName').textContent=w.name;
  document.getElementById('wAbout').textContent=w.about;
  renderRegion(w);
  requestAnimationFrame(()=>{if(!window.WZ)window.WZ=attachZoom(document.getElementById('wStage'),document.getElementById('scene'),{onChange:z=>{document.getElementById('mzLv').textContent=(Math.round(z.level()*10)/10)+'×'}});WZ.fit()});
  document.getElementById('dossier').innerHTML=
    `<figure class="quote" style="margin:0"><q>${esc(w.quote[0])}</q><figcaption class="meta">Nguyên văn bản convert, ${chLink(w.quote[1])}</figcaption></figure>`+
    w.secs.map(([h,t,chs])=>`<section class="card clamp${h.startsWith(HERO())?' lp':''}" tabindex="0"><h3>${esc(h)}</h3><p>${esc(t)}</p><div class="refs">${chs.map(chLink).join('')}</div></section>`).join('');
  const strong=[...w.places].sort((a,b)=>b.s-a.s)[0],nP=(S.people||[]).filter(p=>p.w.includes(wid)).length,nE=(S.journey||[]).filter(j=>j.w===wid).length;
  const tiles=[[w.places.length,'địa danh'],[hi-lo+1,'bậc cảnh giới'],[nP,'nhân vật'],[nE,'sự kiện'],[adj[wid].length,'đường hầm']];
  document.getElementById('wFacts').innerHTML=`<div class="tiles">${tiles.map(([v,k])=>`<div class="tile"><b>${v}</b><span>${k}</span></div>`).join('')}</div>
    <p class="meta">${esc(w.type)} · Tầng ${w.tier} · ${esc(S.tiers[w.tier].name)}${strong?` · Mạnh nhất: <b style="color:var(--gold)">${esc(strong.n)}</b>`:''}</p>`;
  const path=route(S.start,wid)||[wid],steps=path.length-1;
  document.getElementById('routeHead').textContent='Đường đi từ '+short(byId[S.start].name);
  let h='';path.forEach((p,i)=>{if(i){const up=linkType(path[i-1],p)==='up';h+=`<span class="arrow${up?' up':''}" aria-hidden="true">${up?'⇡':'→'}</span>`}h+=`<a class="chip${p===wid?' cur':''}" href="#${S.id}--${p}">${esc(short(byId[p].name))}</a>`});
  document.getElementById('wRoute').innerHTML=steps?h:'';
  const ups=path.slice(1).filter((p,i)=>linkType(path[i],p)==='up').length;
  document.getElementById('wRouteMeta').textContent=steps?`${steps} lần qua đường hầm${ups?`, trong đó ${ups} lần lên cấp cao hơn`:''}.`:'Đây là nơi hành trình bắt đầu.';
  document.getElementById('wNear').innerHTML=adj[wid].map(n=>`<a class="chip${linkType(wid,n)==='up'?' gold':''}" href="#${S.id}--${n}">${esc(short(byId[n].name))}</a>`).join('');
  renderLadder(w);renderRealm();renderRealmBadge(w);renderWorldExtras(wid);
}

document.getElementById('realmBadge').addEventListener('click',e=>{const b=e.target.closest('[data-realm]');if(!b)return;curRealm=b.dataset.realm;store.set(`realm:${S.id}:${curWorld}`,curRealm);renderRealm();if(window.matchMedia('(max-width:720px)').matches)document.getElementById('realmPanel').scrollIntoView({behavior:'smooth',block:'start'})});
document.getElementById('ladder').addEventListener('click',e=>{const b=e.target.closest('[data-realm]');if(!b)return;curRealm=b.dataset.realm;store.set(`realm:${S.id}:${curWorld}`,curRealm);renderRealm();if(window.matchMedia('(max-width:720px)').matches)document.getElementById('realmPanel').scrollIntoView({behavior:'smooth',block:'start'})});
document.getElementById('realmPanel').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(!b||b.disabled)return;const i=RIDX[curRealm]+Number(b.dataset.step);curRealm=REALMS[i].id;store.set(`realm:${S.id}:${curWorld}`,curRealm);const [a,z]=rangeOf(byId[curWorld]);if(i<a||i>z)showAll=true;renderLadder(byId[curWorld]);renderRealm()});
document.getElementById('toggleAll').addEventListener('click',()=>{showAll=!showAll;renderLadder(byId[curWorld]);renderRealm()});

/* ===== Điều hướng theo #hash ===== */
function show(v){['vHome','vMap','vWorld','vInfo','v3dView'].forEach(id=>document.getElementById(id).hidden=id!==v);if(v!=='v3dView'&&typeof stop3D==='function')stop3D()}
function router(){
  const [sid,wid]=decodeURIComponent(location.hash.slice(1)).split('--');
  if(ONE&&!(sid&&STORIES.some(x=>x.id===sid))){location.replace('#'+STORIES[0].id);return}
  if(sid&&useStory(sid)){
    if(wid==='3d'){show('v3dView');render3D()}
    else if(INFO_TABS.some(x=>x[0]===wid)){show('vInfo');renderInfo(wid)}
    else if(wid&&byId[wid]){showAll=false;show('vWorld');renderWorld(wid)}
    else{show('vMap');renderMap()}
  }else{show('vHome');renderHome()}
  window.scrollTo(0,0);
}
document.addEventListener('click',e=>{const a=e.target.closest('a[href$="--3d"]');if(a&&curWorld&&!document.getElementById('vWorld').hidden)window.pend3D=curWorld});
window.addEventListener('hashchange',router);
router();

/* Nút phóng to/thu nhỏ bản đồ vùng */
document.addEventListener('click',e=>{const b=e.target.closest('[data-mz]');if(!b||!window.WZ)return;const k=b.dataset.mz;if(k==='in')WZ.zoom(.6);else if(k==='out')WZ.zoom(1/.6);
  else if(k==='full'){const m=document.querySelector('.w-map');if(document.fullscreenElement)document.exitFullscreen();else if(m.requestFullscreen)m.requestFullscreen().catch(()=>{})}else WZ.fit()});
document.addEventListener('fullscreenchange',()=>{if(window.WZ&&!document.getElementById('vWorld').hidden)setTimeout(()=>WZ.fit(),60)});

/* Các cụm nút luôn có: thu gọn được */
foldify(document.querySelector('.map-zoom'),'mapzoom','Phóng');
