/* ===== Trang hồ sơ: Nhân vật · Hành trình · Công pháp & bảo vật ===== */
const INFO_TABS=[['nhan-vat','Nhân vật'],['hanh-trinh','Hành trình'],['cong-phap','Công pháp & bảo vật']];
const worldChip=id=>byId[id]?`<a class="chip" href="#${S.id}--${id}">${esc(short(byId[id].name))}</a>`:'';
const refs=chs=>`<div class="refs">${chs.map(chLink).join('')}</div>`;

function renderInfo(tab){
  setBar([['Thư viện','#thu-vien'],[S.title,'#'+S.id],[INFO_TABS.find(t=>t[0]===tab)[1]]],[['Bản đồ thế giới','#'+S.id]]);
  document.getElementById('infoTabs').innerHTML=INFO_TABS.map(([k,n])=>`<a class="tab" href="#${S.id}--${k}" aria-selected="${k===tab}">${n}</a>`).join('');
  const b=document.getElementById('infoBody');
  if(tab==='nhan-vat'){
    document.getElementById('infoTitle').textContent='Nhân vật';
    document.getElementById('infoSub').textContent=`${S.people.length} nhân vật quan trọng, chia theo quan hệ với ${HERO()}. Bấm thế giới để tới bản đồ, bấm số chương để đọc.`;
    b.innerHTML=Object.entries(PEOPLE_GROUPS).map(([g,gn])=>{const ps=S.people.filter(p=>p.g===g);if(!ps.length)return'';
      return `<section class="sec"><h2 class="h-sec">${gn} <span class="meta">${ps.length}</span></h2><div class="cards">${ps.map(p=>`<article class="card person clamp" tabindex="0">
        <div class="who"><span class="ava" style="--c:${GCOL[g]}">${esc(initials(p.n))}</span><h3>${esc(p.n)}</h3></div><p>${esc(p.d)}</p>${p.w.length?`<div class="chips">${p.w.map(worldChip).join('')}</div>`:''}${refs(p.ch)}</article>`).join('')}</div></section>`}).join('');
  }else if(tab==='hanh-trinh'){
    document.getElementById('infoTitle').textContent='Hành trình của '+HERO();
    document.getElementById('infoSub').textContent=`${S.journey.length} mốc lớn từ chương 1 đến chương cuối: thế giới đặt chân tới, sự kiện, và cảnh giới đạt được.`;
    let prevW=null;
    b.innerHTML=realmChart()+`<ol class="tl">${S.journey.map(j=>{const w=byId[j.w],r=j.r?REALMS[RIDX[j.r]]:null,newW=j.w!==prevW;prevW=j.w;
      return `<li class="${newW?'neww':''}">${newW&&w?`<div class="tl-w">${worldChip(j.w)}<span class="meta">Tầng ${w.tier} · ${esc(S.tiers[w.tier].name)}</span></div>`:''}
        <div class="tl-row"><span class="tl-ch">${chLink(j.ch)}</span><p>${esc(j.d)}</p>${r?`<span class="tl-r" style="--c:${GBY[r.g].c}">${esc(r.name)}</span>`:''}</div></li>`}).join('')}</ol>`;
  }else{
    document.getElementById('infoTitle').textContent='Công pháp & bảo vật';
    document.getElementById('infoSub').textContent='Công pháp, huyết mạch, thần thông, thiên hỏa có xếp hạng và bảo vật chính của '+HERO()+'.';
    b.innerHTML=Object.entries(ARTS_GROUPS).map(([g,gn])=>{let as=S.arts.filter(a=>a.g===g);if(!as.length)return'';if(g==='th')as=as.filter(a=>!a.rank);
      if(g==='th')as=[...as].sort((x,y)=>(x.rank||999)-(y.rank||999));
      return `<section class="sec"><h2 class="h-sec">${gn} <span class="meta">${as.length}</span></h2>${g==='th'?'<p class="meta">Thiên hỏa có thứ hạng. Truyện phân biệt thiên hỏa, địa hỏa và yêu hỏa (ch.175).</p>':''}<div class="cards">${as.map(a=>`<article class="card art clamp" tabindex="0">
        ${a.rank?`<span class="rank">#${a.rank}</span>`:''}<h3>${esc(a.n)}</h3><p>${esc(a.d)}</p>${refs(a.ch)}</article>`).join('')}</div></section>`}).join('');
    b.insertAdjacentHTML('afterbegin',flameBars());
  }
}

const GCOL={gd:'#f2c76e',hn:'#ffb4e0',dh:'#7be0a8',dt:'#ff7a7a',cg:'#9fb4ff'};
const initials=n=>n.replace(/\(.*\)/,'').split(/\s+/).filter(Boolean).slice(-2).map(w=>w[0]).join('').toUpperCase();

/* Biểu đồ tu vi theo chương: mỗi điểm là một lần đột phá, dải màu dưới là thế giới */
function realmChart(){
  const pts=S.journey.filter(j=>j.r).map(j=>({x:+String(j.ch).replace('~',''),y:RIDX[j.r],r:REALMS[RIDX[j.r]],w:j.w}));
  const W=1000,H=300,L=110,T=14,PW=W-L-20,PH=210,maxC=S.chapters||11220,maxR=REALMS.length-1;
  const X=c=>L+c/maxC*PW,Y=i=>T+PH-i/maxR*PH;
  let s=`<figure class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Biểu đồ tu vi theo chương">`;
  GROUPS.forEach((g,gi)=>{const ids=REALMS.map((r,i)=>r.g===g.id?i:-1).filter(i=>i>=0);if(!ids.length)return;
    const y1=Y(Math.max(...ids)+.5),y2=Y(Math.min(...ids)-.5);
    s+=`<rect x="${L}" y="${y1}" width="${PW}" height="${y2-y1}" fill="${g.c}" opacity="${gi%2?.05:.1}"/><text x="${L-8}" y="${(y1+y2)/2+4}" class="ax" text-anchor="end" fill="${g.c}">${esc(g.name.replace(' & trên nữa',''))}</text>`});
  (()=>{const st=maxC>6000?2000:maxC>2500?500:maxC>1000?200:100,a=[];for(let c=0;c<=maxC;c+=st)a.push(c);return a})().forEach(c=>{s+=`<line x1="${X(c)}" x2="${X(c)}" y1="${T}" y2="${T+PH}" class="grid"/><text x="${X(c)}" y="${T+PH+16}" class="ax" text-anchor="middle">ch.${c||1}</text>`});
  let segs=[],cur=null;S.journey.forEach(j=>{const c=+String(j.ch).replace('~','');if(!cur||cur.w!==j.w){cur={w:j.w,a:c,b:c};segs.push(cur)}else cur.b=c});
  segs.forEach((sg,i)=>{const nx=segs[i+1]?+String(segs[i+1].a):maxC,x1=X(sg.a),x2=X(nx),wd=byId[sg.w];
    s+=`<a href="#${S.id}--${sg.w}"><rect x="${x1}" y="${T+PH+24}" width="${Math.max(2,x2-x1-1)}" height="16" rx="3" fill="${TERR_COLORS[(wd?wd.tier:0)%TERR_COLORS.length]}" opacity=".75"><title>${esc(wd?wd.name:sg.w)}: ch.${sg.a}–${nx}</title></rect>${x2-x1>70?`<text x="${(x1+x2)/2}" y="${T+PH+36}" class="seg" text-anchor="middle">${esc(short(wd?wd.name:''))}</text>`:''}</a>`});
  s+=`<path d="${pts.map((p,i)=>(i?`H${X(p.x)}V${Y(p.y)}`:`M${X(p.x)},${Y(p.y)}`)).join('')}H${X(maxC)}" fill="none" stroke="#f2c76e" stroke-width="2.5"/>`;
  pts.forEach(p=>{s+=`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="4.5" fill="${GBY[p.r.g].c}" stroke="#0a0b22" stroke-width="1.5"><title>${esc(p.r.name)} · ch.${p.x}</title></circle>`});
  const last=pts[pts.length-1];if(last)s+=`<text x="${X(last.x)-6}" y="${Y(last.y)-10}" class="ax" text-anchor="end" fill="#f2c76e">${esc(last.r.name)}</text>`;
  return s+`</svg><figcaption class="meta">Đường vàng: cảnh giới ${HERO()} theo chương (rê chuột vào điểm để xem). Dải màu dưới: thế giới đang ở, bấm để mở bản đồ.</figcaption></figure>`;
}
/* Bảng thiên hỏa có thứ hạng: thanh càng dài thì hạng càng cao */
function flameBars(){
  const fs=S.arts.filter(a=>a.g==='th'&&a.rank).sort((a,b)=>a.rank-b.rank);if(!fs.length)return'';
  return `<section class="sec"><h2 class="h-sec">Bảng thiên hỏa <span class="meta">theo thứ hạng trong truyện</span></h2><div class="bars">${fs.map(a=>{const w=Math.max(8,100-Math.log2(a.rank)*15);
    return `<div class="bar"><span class="bn">#${a.rank}</span><span class="bt"><i style="width:${w}%"></i><b>${esc(a.n)}</b></span><span class="refs">${a.ch.map(chLink).join('')}</span></div>`}).join('')}</div></section>`;
}

/* Trong màn thế giới: nhân vật và sự kiện tại đây */
function renderWorldExtras(wid){
  const ps=(S.people||[]).filter(p=>p.w.includes(wid)),js=(S.journey||[]).filter(j=>j.w===wid);
  document.getElementById('wPeople').innerHTML=ps.length?ps.map(p=>`<a class="chip" href="#${S.id}--nhan-vat" title="${esc(p.d)}">${esc(p.n)}</a>`).join(''):'<span class="meta">Chưa ghi.</span>';
  document.getElementById('wEvents').innerHTML=js.length?js.map(j=>`<li>${chLink(j.ch)} ${esc(j.d)}</li>`).join(''):'<li class="meta">Chưa ghi.</li>';
}

/* Bấm (hoặc Enter) vào thẻ có chữ thu gọn để mở/đóng; liên kết và nút bên trong vẫn hoạt động bình thường */
document.addEventListener('click',e=>{if(e.target.closest('a,button'))return;const c=e.target.closest('.clamp');if(c)c.classList.toggle('open')});
document.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const c=e.target.closest&&e.target.closest('.clamp');if(c&&c===e.target)c.classList.toggle('open')});
