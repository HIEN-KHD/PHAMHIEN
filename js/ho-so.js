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
    document.getElementById('infoSub').textContent=`${S.people.length} nhân vật quan trọng, chia theo quan hệ với Lâm Phong. Bấm thế giới để tới bản đồ, bấm số chương để đọc.`;
    b.innerHTML=Object.entries(PEOPLE_GROUPS).map(([g,gn])=>{const ps=S.people.filter(p=>p.g===g);if(!ps.length)return'';
      return `<section class="sec"><h2 class="h-sec">${gn} <span class="meta">${ps.length}</span></h2><div class="cards">${ps.map(p=>`<article class="card person">
        <h3>${esc(p.n)}</h3><p>${esc(p.d)}</p>${p.w.length?`<div class="chips">${p.w.map(worldChip).join('')}</div>`:''}${refs(p.ch)}</article>`).join('')}</div></section>`}).join('');
  }else if(tab==='hanh-trinh'){
    document.getElementById('infoTitle').textContent='Hành trình của Lâm Phong';
    document.getElementById('infoSub').textContent=`${S.journey.length} mốc lớn từ chương 1 đến chương cuối: thế giới đặt chân tới, sự kiện, và cảnh giới đạt được.`;
    let prevW=null;
    b.innerHTML=`<ol class="tl">${S.journey.map(j=>{const w=byId[j.w],r=j.r?REALMS[RIDX[j.r]]:null,newW=j.w!==prevW;prevW=j.w;
      return `<li class="${newW?'neww':''}">${newW&&w?`<div class="tl-w">${worldChip(j.w)}<span class="meta">Tầng ${w.tier} · ${esc(S.tiers[w.tier].name)}</span></div>`:''}
        <div class="tl-row"><span class="tl-ch">${chLink(j.ch)}</span><p>${esc(j.d)}</p>${r?`<span class="tl-r" style="--c:${GBY[r.g].c}">${esc(r.name)}</span>`:''}</div></li>`}).join('')}</ol>`;
  }else{
    document.getElementById('infoTitle').textContent='Công pháp & bảo vật';
    document.getElementById('infoSub').textContent='Công pháp, huyết mạch, thần thông, thiên hỏa có xếp hạng và bảo vật chính của Lâm Phong.';
    b.innerHTML=Object.entries(ARTS_GROUPS).map(([g,gn])=>{let as=S.arts.filter(a=>a.g===g);if(!as.length)return'';
      if(g==='th')as=[...as].sort((x,y)=>(x.rank||999)-(y.rank||999));
      return `<section class="sec"><h2 class="h-sec">${gn} <span class="meta">${as.length}</span></h2>${g==='th'?'<p class="meta">Thiên hỏa có thứ hạng. Truyện phân biệt thiên hỏa, địa hỏa và yêu hỏa (ch.175).</p>':''}<div class="cards">${as.map(a=>`<article class="card art">
        ${a.rank?`<span class="rank">#${a.rank}</span>`:''}<h3>${esc(a.n)}</h3><p>${esc(a.d)}</p>${refs(a.ch)}</article>`).join('')}</div></section>`}).join('');
  }
}

/* Trong màn thế giới: nhân vật và sự kiện tại đây */
function renderWorldExtras(wid){
  const ps=(S.people||[]).filter(p=>p.w.includes(wid)),js=(S.journey||[]).filter(j=>j.w===wid);
  document.getElementById('wPeople').innerHTML=ps.length?ps.map(p=>`<a class="chip" href="#${S.id}--nhan-vat" title="${esc(p.d)}">${esc(p.n)}</a>`).join(''):'<span class="meta">Chưa ghi.</span>';
  document.getElementById('wEvents').innerHTML=js.length?js.map(j=>`<li>${chLink(j.ch)} ${esc(j.d)}</li>`).join(''):'<li class="meta">Chưa ghi.</li>';
}
