/* ===== Bản đồ vùng của một thế giới =====
   Lục địa trôi nổi (hoặc biển, mây, vực sâu, mặt trời, tinh không tùy thế giới), trên đó:
   - quốc gia / vùng không thuộc ai: vẽ thành lãnh thổ có viền, tên in hoa
   - các địa danh khác: biểu tượng theo loại, đặt trong lãnh thổ "thuộc" hoặc rải đều phần còn lại */
const PTYPE={
  quoc:{name:'Quốc gia',c:'#f2c76e'},
  vung:{name:'Vùng · vực',c:'#8fd6ff'},
  thanh:{name:'Thành trì',c:'#efe2c2'},
  gia:{name:'Gia tộc',c:'#ff9f8a'},
  tong:{name:'Tông môn · thế lực',c:'#c9a6ff'},
  toc:{name:'Chủng tộc',c:'#7be0a8'},
  dao:{name:'Đảo',c:'#6fd0ff'},
  hiem:{name:'Hiểm địa · bí cảnh',c:'#ff6b6b'},
  bau:{name:'Bảo vật',c:'#ffe48a'}
};
const PORDER=['quoc','vung','thanh','gia','tong','toc','dao','hiem','bau'];
const TERR_COLORS=['#f2c76e','#8fd6ff','#ff9f8a','#c9a6ff','#7be0a8','#ffb4e0','#9ef0ff'];
const MODE={start:'land',isles:'sea',sea:'sea',nine:'land',gate:'land',demon:'land',nether:'land',waste:'land',sin:'land',abyss:'void',dragon:'land',heaven:'cloud',tree:'land',ruins:'land',sun:'sun',galaxy:'space'};
const GROUND={start:'#4f9a46',nine:'#4a944c',gate:'#666b84',demon:'#5a1622',nether:'#3a2d6e',waste:'#94703f',sin:'#561420',dragon:'#1f8f72',tree:'#8fbfaa',ruins:'#7e8196',heaven:'#dfe6ff',sea:'#1b5aa6',isles:'#167d96',abyss:'#1a0b08',sun:'#f2b54a',galaxy:'#24206a'};
const isWaterName=n=>/hải|biển/i.test(n);

function shade(hex,k){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;
  const f=v=>Math.max(0,Math.min(255,Math.round(k<0?v*(1+k):v+(255-v)*k)));return '#'+[f(r),f(g),f(b)].map(v=>v.toString(16).padStart(2,'0')).join('')}

// Hình khối hữu cơ: điểm quanh elip + nhiễu mượt, nối bằng đường cong Bézier (Catmull-Rom)
function blobPts(cx,cy,rx,ry,seed,amp,n){const R=rng(seed),p1=R()*6.28,p2=R()*6.28,k1=2+Math.floor(R()*3),k2=5+Math.floor(R()*3),pts=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,f=1+amp*(Math.sin(a*k1+p1)*.6+Math.sin(a*k2+p2)*.4);pts.push([cx+Math.cos(a)*rx*f,cy+Math.sin(a)*ry*f])}return pts}
function smoothPath(pts){const n=pts.length,F=v=>v.toFixed(1);let d=`M${F(pts[0][0])},${F(pts[0][1])}`;
  for(let i=0;i<n;i++){const p0=pts[(i-1+n)%n],p1=pts[i],p2=pts[(i+1)%n],p3=pts[(i+2)%n];
    d+=` C${F(p1[0]+(p2[0]-p0[0])/6)},${F(p1[1]+(p2[1]-p0[1])/6)} ${F(p2[0]-(p3[0]-p1[0])/6)},${F(p2[1]-(p3[1]-p1[1])/6)} ${F(p2[0])},${F(p2[1])}`}
  return d+'Z'}
const blob=(cx,cy,rx,ry,seed,amp=.08,n=26)=>smoothPath(blobPts(cx,cy,rx,ry,seed,amp,n));

/* Biểu tượng địa danh, vẽ quanh gốc (0,0), cỡ khoảng 26px */
const ICON={
  quoc(g,c){poly(g,'-12,5 -12,-7 -6,-1 0,-12 6,-1 12,-7 12,5',c);el('rect',{x:-12,y:5,width:24,height:4,rx:1,fill:shade(c,-.25)},g);
    [[-12,-7],[0,-12],[12,-7]].forEach(([x,y])=>el('circle',{cx:x,cy:y,r:1.8,fill:'#fff'},g))},
  vung(g,c){el('circle',{cx:0,cy:0,r:10,fill:'none',stroke:c,'stroke-width':2,'stroke-dasharray':'3 3'},g);el('circle',{cx:0,cy:0,r:3,fill:c},g)},
  thanh(g,c){el('rect',{x:-12,y:-4,width:24,height:13,fill:c},g);for(let i=0;i<5;i++)el('rect',{x:-12+i*5.25,y:-8,width:3.4,height:4,fill:c},g);
    el('rect',{x:-4,y:-14,width:8,height:10,fill:shade(c,-.12)},g);el('path',{d:'M-3,9 L-3,3 Q0,0 3,3 L3,9Z',fill:'#3a2a18'},g)},
  gia(g,c){el('line',{x1:-7,y1:11,x2:-7,y2:-14,stroke:'#e6d8b8','stroke-width':2.2,'stroke-linecap':'round'},g);
    el('path',{d:'M-6,-14 L12,-11 L8,-6.5 L12,-2 L-6,-2Z',fill:c},g);el('circle',{cx:1.5,cy:-8,r:2.4,fill:shade(c,-.45)},g)},
  tong(g,c){el('line',{x1:0,y1:-20,x2:0,y2:-12,stroke:c,'stroke-width':2},g);poly(g,'-8,-10 8,-10 5,-14 -5,-14',c);
    el('rect',{x:-6,y:-10,width:12,height:5,fill:'#efe2c2'},g);poly(g,'-13,-3 13,-3 9,-7 -9,-7',c);el('rect',{x:-9,y:-3,width:18,height:10,fill:'#efe2c2'},g);
    el('rect',{x:-2.5,y:1,width:5,height:6,fill:'#3a2a18'},g)},
  toc(g,c){el('path',{d:'M0,-13 L11,-8 L9,5 L0,12 L-9,5 L-11,-8Z',fill:c,stroke:shade(c,-.5),'stroke-width':1.2},g);
    el('path',{d:'M-6,-1 Q0,-7 6,-1 Q0,5 -6,-1Z',fill:'#0a0b22'},g);el('circle',{cx:0,cy:-1,r:1.8,fill:c},g)},
  dao(g,c){el('ellipse',{cx:0,cy:6,rx:14,ry:5,fill:'#e9d6a0'},g);poly(g,'-8,6 -1,-10 8,6','#4fae5f');poly(g,'-1,-10 8,6 2,6','#3b8f4c');
    el('path',{d:'M-14,10 q4,-3 8,0 t8,0 t8,0',fill:'none',stroke:c,'stroke-width':1.6},g)},
  hiem(g,c){const p=[];for(let i=0;i<16;i++){const a=i/16*Math.PI*2-Math.PI/2,r=i%2?5:13;p.push(`${(Math.cos(a)*r).toFixed(1)},${(Math.sin(a)*r).toFixed(1)}`)}
    poly(g,p.join(' '),c,{filter:'url(#glow)'});el('circle',{cx:0,cy:0,r:4,fill:'#1a0508'},g)},
  bau(g,c){poly(g,'0,-13 10,-3 0,11 -10,-3',c,{filter:'url(#glow)'});el('path',{d:'M-10,-3 L10,-3 M0,-13 L-4,-3 L0,11 L4,-3 Z',fill:'none',stroke:shade(c,-.35),'stroke-width':1},g)}
};

/* Địa hình rải trên mặt lục địa */
function terrain(g,mode,base,box,seed){
  const R=rng(seed),inside=(x,y,k)=>((x-box.cx)/box.rx)**2+((y-box.cy)/box.ry)**2<k;
  const pick=k=>{for(let t=0;t<40;t++){const x=box.cx+(R()*2-1)*box.rx,y=box.cy+(R()*2-1)*box.ry;if(inside(x,y,k))return[x,y]}return[box.cx,box.cy]};
  if(mode==='land'||mode==='void'){
    for(let i=0;i<7;i++){const[x,y]=pick(.7);el('ellipse',{cx:x,cy:y,rx:50+R()*70,ry:22+R()*30,fill:shade(base,R()>.5?.12:-.18),opacity:.5,filter:'url(#soft)'},g)}
    if(mode==='land'){
      // Rừng: từng cụm cây
      for(let k=0;k<7;k++){const[cx,cy]=pick(.72);for(let i=0;i<16;i++){const x=cx+(R()-.5)*90,y=cy+(R()-.5)*40;if(!inside(x,y,.85))continue;
        el('circle',{cx:x,cy:y+1.5,r:3.4+R()*2,fill:'#000',opacity:.18},g);el('circle',{cx:x,cy:y,r:3+R()*2.2,fill:shade(base,-.32-R()*.12)},g)}}
      // Dãy núi: các đỉnh nối nhau theo một đường cong, đỉnh phủ tuyết
      for(let k=0;k<3;k++){let[x,y]=pick(.6);const dx=(R()>.5?1:-1)*(14+R()*8),dy=(R()-.5)*8;
        for(let i=0;i<9;i++){x+=dx;y+=dy+(R()-.5)*8;if(!inside(x,y,.82))break;const s=10+R()*10,h=s*1.5;
          poly(g,`${x-s},${y} ${x},${y-h} ${x+s},${y}`,shade(base,-.38));poly(g,`${x},${y-h} ${x+s},${y} ${x+s*.2},${y}`,shade(base,-.55),{opacity:.8});
          poly(g,`${x-s*.32},${y-h*.68} ${x},${y-h} ${x+s*.32},${y-h*.68} ${x+s*.12},${y-h*.6} ${x-s*.1},${y-h*.64}`,'#f4f6ff',{opacity:.9})}}
      // Sông: từ vùng núi chảy ra mép lục địa, rộng dần
      for(let k=0;k<2;k++){const[x0,y0]=pick(.35),a=R()*Math.PI*2,L=box.rx*.95;let d=`M${x0},${y0}`,x=x0,y=y0;
        for(let i=1;i<=6;i++){const nx=x0+Math.cos(a)*L*i/6+(R()-.5)*30,ny=y0+Math.sin(a)*L*.5*i/6+(R()-.5)*20;d+=` Q${(x+nx)/2+(R()-.5)*30},${(y+ny)/2+(R()-.5)*20} ${nx},${ny}`;x=nx;y=ny}
        el('path',{d,fill:'none',stroke:'#5aa9e6','stroke-width':3.2,opacity:.7,'stroke-linecap':'round'},g);el('path',{d,fill:'none',stroke:'#a8dcff','stroke-width':1.2,opacity:.8},g)}
      // Hồ
      for(let k=0;k<2;k++){const[x,y]=pick(.6);el('path',{d:blob(x,y,18+R()*16,8+R()*6,Math.floor(R()*999),.2,12),fill:'#4f9fe0',stroke:'#cfeaff','stroke-width':1.2,opacity:.85},g)}
    }else{for(let i=0;i<50;i++){const[x,y]=pick(.9);el('circle',{cx:x,cy:y,r:1+R()*2,fill:R()>.5?'#ff8a3a':'#ffc04a',opacity:.6+R()*.4},g)}}
  }else if(mode==='sea'){
    for(let i=0;i<34;i++){const[x,y]=pick(.85),w=12+R()*16;el('path',{d:`M${x},${y} q${w/2},-5 ${w},0 t${w},0`,fill:'none',stroke:'#a8dcff','stroke-width':1.4,opacity:.45},g)}
  }else if(mode==='cloud'){
    for(let i=0;i<14;i++){const[x,y]=pick(.8);el('ellipse',{cx:x,cy:y,rx:30+R()*40,ry:10+R()*10,fill:'#fff',opacity:.5,filter:'url(#soft)'},g)}
  }else if(mode==='space'){
    for(let i=0;i<120;i++){const[x,y]=pick(1);el('circle',{cx:x,cy:y,r:.6+R()*1.4,fill:'#e8ecff',opacity:.4+R()*.6},g)}
  }else if(mode==='sun'){
    for(let i=0;i<10;i++){const[x,y]=pick(.8);el('ellipse',{cx:x,cy:y,rx:40+R()*50,ry:14+R()*16,fill:'#fff3c4',opacity:.35,filter:'url(#soft)'},g)}
  }
}

/* Vị trí địa danh: mỗi địa danh chiếm một hình chữ nhật (biểu tượng + tên), không được chồng lên nhau.
   1. Tên lãnh thổ (quốc gia/vùng) đặt theo lưới cố định.
   2. Địa danh "thuộc" một lãnh thổ: chọn ô trống gần tên lãnh thổ nhất.
   3. Địa danh còn lại: chọn ô trống xa các địa danh đã đặt nhất.
   4. Viền lãnh thổ bao lấy tên và các địa danh bên trong. */
const ANCHORS={1:[[0,0]],2:[[-.45,0],[.45,0]],3:[[-.48,-.3],[.48,-.3],[0,.42]],4:[[-.45,-.38],[.45,-.38],[-.45,.4],[.45,.4]],
  5:[[0,0],[-.58,-.4],[.58,-.4],[-.58,.42],[.58,.42]],6:[[-.56,-.4],[0,-.45],[.56,-.4],[-.56,.42],[0,.45],[.56,.42]],
  7:[[0,0],[-.6,-.42],[0,-.55],[.6,-.42],[-.6,.42],[0,.55],[.6,.42]]};
// Quy mô 1–5 quyết định cỡ biểu tượng, cỡ chữ và độ rộng chiếm chỗ
const SZ=s=>({r:12+s*2.6,fs:11+s,ic:.6+s*.1});
const markRect=(x,y,name,s=2)=>{const z=SZ(s),w=Math.max(z.r*2+8,name.length*z.fs*.6+10);return[x-w/2,y-z.r-5,x+w/2,y+z.r+z.fs+8]};
const labelRect=(x,y,name,s=3)=>{const fs=12+s*1.6,w=name.length*fs*.78+24;return[x-w/2,y-fs,x+w/2,y+fs*.5]};
const hit=(a,b,m=6)=>a[0]<b[2]+m&&b[0]<a[2]+m&&a[1]<b[3]+m&&b[1]<a[3]+m;
function layoutPlaces(places,box,avoid){
  const out=new Map(),rects=avoid.map(a=>a.slice()),terr=places.filter(p=>(p.t==='quoc'||p.t==='vung')&&!p.in);
  const n=terr.length,A=ANCHORS[Math.min(n,7)]||[];
  terr.forEach((p,i)=>{let[ax,ay]=A[i]||[Math.cos(i*2.4)*.6,Math.sin(i*2.4)*.5];const x=box.cx+ax*box.rx,y=box.cy+ay*box.ry;
    let X=x,Y=y,L=labelRect(X,Y,p.n,p.s);
    for(let k=0;k<12&&rects.some(r=>hit(L,r));k++){X-=24;Y+=10;L=labelRect(X,Y,p.n,p.s)}
    out.set(p,{x:X,y:Y,terr:true,ci:i,L});rects.push(L)});
  const cand=[];for(let gy=-.95;gy<=.95;gy+=.07)for(let gx=-.96;gx<=.96;gx+=.035){
    if(gx*gx+gy*gy*1.02>.92)continue;cand.push([box.cx+gx*box.rx,box.cy+gy*box.ry])}
  let margin=6;const free=(c,p)=>{const R=markRect(c[0],c[1],p.n,p.sv);return rects.some(r=>hit(R,r,margin))?null:R};
  const put=(p,c,R)=>{out.set(p,{x:c[0],y:c[1],R});rects.push(R)};
  // Các vùng lần lượt chọn chỗ cho địa danh con (xen kẽ), ưu tiên gần tên vùng mình và xa vùng khác
  const kidsOf=terr.map(T=>places.filter(q=>q.in===T.n).sort((a,b)=>b.s-a.s)),maxK=Math.max(0,...kidsOf.map(k=>k.length));
  for(let r=0;r<maxK;r++)terr.forEach((T,ti)=>{const q=kidsOf[ti][r];if(!q)return;const P=out.get(T);
    let best=null,bd=1e9,bR=null;
    for(const c of cand){const R=free(c,q);if(!R)continue;
      const dOwn=Math.hypot(c[0]-P.x,(c[1]-P.y-28)*1.3);
      const dOther=Math.min(1e9,...terr.filter(U=>U!==T).map(U=>{const Q=out.get(U);return Math.hypot(c[0]-Q.x,(c[1]-Q.y-28)*1.3)}));
      const cost=dOwn+Math.max(0,dOwn-dOther)*2;if(cost<bd){bd=cost;best=c;bR=R}}
    if(best)put(q,best,bR)});
  places.filter(p=>!out.has(p)).sort((a,b)=>b.s-a.s).forEach(p=>{let best=null,bd=-1,bR=null;
    const pts=[...out.values()].map(v=>[v.x,v.y]);
    for(const c of cand){const R=free(c,p);if(!R)continue;
      const d=pts.length?Math.min(...pts.map(u=>Math.hypot(u[0]-c[0],(u[1]-c[1])*1.4))):1;
      const edge=1-Math.min(1,((c[0]-box.cx)/box.rx)**2+((c[1]-box.cy)/box.ry)**2);
      const s=Math.min(d,170)+edge*40;if(s>bd){bd=s;best=c;bR=R}}
    if(!best&&margin>0){margin=-4;for(const c of cand){const R=free(c,p);if(R){best=c;bR=R;break}}margin=6}
    if(!best){let lo=1e9;for(const c of cand){const R=markRect(c[0],c[1],p.n,p.sv),o=rects.filter(r=>hit(R,r,0)).length;if(o<lo){lo=o;best=c;bR=R}}}
    put(p,best,bR)});
  terr.forEach(T=>{const P=out.get(T),rs=[P.L,...places.filter(q=>q.in===T.n&&out.get(q)).map(q=>out.get(q).R)];
    const x1=Math.min(...rs.map(r=>r[0])),y1=Math.min(...rs.map(r=>r[1])),x2=Math.max(...rs.map(r=>r[2])),y2=Math.max(...rs.map(r=>r[3]));
    P.bx=(x1+x2)/2;P.by=(y1+y2)/2;P.rx=Math.max(60+T.s*22,(x2-x1)/2*1.12+18);P.ry=Math.max(34+T.s*13,(y2-y1)/2*1.18+16)});
  return out;
}

let curPlace=null,placeFilter=null,placeIndex=[];
/* opt (màn 2D phóng to trong 3D): {svg, sfx: hậu tố id để không trùng gradient, onPick(i), onPortal(id)} */
function renderRegion(w,opt){
  opt=opt||{};const sfx=opt.sfx||'',pick=i=>opt.onPick?opt.onPick(i):selectPlace(i);
  const svg=opt.svg||document.getElementById('scene'),[top,bot,neb]=SKY[w.kind],mode=MODE[w.kind]||'land',base=GROUND[w.kind]||'#4f9a46';
  svg.setAttribute('aria-label','Bản đồ vùng '+w.name);svg.innerHTML='';
  el('defs',{},svg).innerHTML=`<linearGradient id="sceneSky${sfx}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient>
    <radialGradient id="landTop${sfx}" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="${shade(base,.14)}"/><stop offset="1" stop-color="${shade(base,-.18)}"/></radialGradient>
    <radialGradient id="seaTop${sfx}" cx="50%" cy="45%" r="65%"><stop offset="0" stop-color="#3f8fd8"/><stop offset="1" stop-color="#123f7a"/></radialGradient>
    <radialGradient id="sunTop${sfx}" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#fff6d6"/><stop offset=".6" stop-color="#f6c45a"/><stop offset="1" stop-color="#c47a1e"/></radialGradient>`;
  el('rect',{width:1000,height:640,fill:`url(#sceneSky${sfx})`},svg);
  const r=rng(w.id.length*97+w.x);
  for(let i=0;i<4;i++)el('ellipse',{cx:r()*1000,cy:r()*400,rx:140+r()*140,ry:80+r()*70,fill:neb,opacity:.22,filter:'url(#blur)'},svg);
  const st=stars(svg,200,1000,640,w.x*3+w.y);sparkle(st,40,300,5);sparkle(st,960,600,5);
  [[170,560,.35],[860,120,.0],[60,200,.22]].forEach(([x,y,s])=>{if(s)island(el('g',{transform:`translate(${x},${y}) scale(${s})`,opacity:.45},svg),120,shade(base,-.2))});

  const dense=w.places.length>18,box=dense?{cx:492,cy:312,rx:432,ry:214}:{cx:500,cy:300,rx:395,ry:188},seed=w.id.length*131+w.y;
  const[ra,rb]=rangeOf(w),avoid=[[775,0,1000,Math.min(330,60+(rb-ra+1)*22)],[0,0,215,165],[0,520,330,640],[670,520,1000,640]];
  const nP=w.places.length,shrink=nP>20?1.3:nP>15?.8:nP>11?.4:0;w.places.forEach(p=>{p.sv=Math.max(1,p.s-shrink)});
  const pos=layoutPlaces(w.places,box,avoid);
  const land=el('g',{},svg),shape=blob(box.cx,box.cy,box.rx,box.ry,seed,.07);
  // Địa hình chân thật (ảnh sinh theo độ cao) cho lục địa và biển đảo; chỗ có thành/tông môn được san bằng
  const real=(mode==='land'||mode==='sea')&&typeof reliefMap==='function'&&!!document.createElement('canvas').getContext;
  const rel=real?reliefMap(w,shape,box,w.places.map(p=>[p,pos.get(p)]).filter(([p,P])=>P&&(!P.terr||(mode==='sea'&&!isWaterName(p.n)))).map(([p,P])=>P.terr?{x:P.bx,y:P.by,rx:P.rx*.92,ry:P.ry*.92}:{x:P.x,y:P.y,r:mode==='sea'?34:42}),mode==='sea'):null;
  if(mode==='land'||mode==='cloud'){
    if(mode==='land'){
      el('path',{d:`M${box.cx-box.rx*.96},${box.cy+12} Q${box.cx-box.rx*.6},${box.cy+box.ry+70} ${box.cx-box.rx*.12},${box.cy+box.ry+125} L${box.cx+box.rx*.04},${box.cy+box.ry+150} Q${box.cx+box.rx*.45},${box.cy+box.ry+80} ${box.cx+box.rx*.97},${box.cy+12}Z`,fill:'url(#rock)'},land);
      el('path',{d:`M${box.cx+box.rx*.02},${box.cy+box.ry} L${box.cx+box.rx*.04},${box.cy+box.ry+150} Q${box.cx+box.rx*.45},${box.cy+box.ry+80} ${box.cx+box.rx*.97},${box.cy+12}Z`,fill:'#000',opacity:.28},land);
    }else{el('ellipse',{cx:box.cx,cy:box.cy+70,rx:box.rx*1.05,ry:box.ry*.9,fill:'#c7d2ff',opacity:.3,filter:'url(#soft)'},land)}
    if(rel){el('path',{d:shape,fill:'#3b2e24',transform:'translate(0,12)'},land);el('path',{d:shape,fill:'#2a2019',opacity:.6,transform:'translate(0,6)'},land);
      el('image',{href:rel.url,x:0,y:0,width:1000,height:640,preserveAspectRatio:'none'},land);
      // Thác nước nơi sông chảy ra mép đảo phía trước
      rel.falls.filter(([x,y])=>y>box.cy).forEach(([x,y],k)=>{const h=70+k*25,id='fall'+sfx+k;
        el('defs',{},land).innerHTML=`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8efff" stop-opacity=".95"/><stop offset="1" stop-color="#d8efff" stop-opacity="0"/></linearGradient>`;
        el('path',{d:`M${x-4},${y} L${x+4},${y} L${x+9},${y+h} L${x-9},${y+h}Z`,fill:`url(#${id})`},land);
        el('ellipse',{cx:x,cy:y+2,rx:8,ry:3,fill:'#fff',opacity:.7,filter:'url(#soft)'},land)})}
    else{if(mode==='land')el('path',{d:shape,fill:'none',stroke:'#e6d29a','stroke-width':9,opacity:.75},land);
    el('path',{d:shape,fill:mode==='cloud'?'#e9eeff':`url(#landTop${sfx})`,stroke:shade(base,.35),'stroke-width':2,opacity:mode==='cloud'?.92:1},land)}
  }else if(mode==='sea'){
    el('path',{d:blob(box.cx,box.cy+10,box.rx*1.04,box.ry*1.06,seed+1,.05),fill:'#071f44',opacity:.6,filter:'url(#soft)'},land);
    if(rel)el('image',{href:rel.url,x:0,y:0,width:1000,height:640,preserveAspectRatio:'none'},land);else el('path',{d:shape,fill:`url(#seaTop${sfx})`,stroke:'#7cc4ff','stroke-width':2,opacity:.95},land);
  }else if(mode==='void'){
    el('ellipse',{cx:box.cx,cy:box.cy,rx:box.rx*1.04,ry:box.ry*1.06,fill:'#ff6a1f',opacity:.35,filter:'url(#blur)'},land);
    el('path',{d:shape,fill:'#2a120c',stroke:'#ff8a3a','stroke-width':3},land);
    el('ellipse',{cx:box.cx,cy:box.cy+10,rx:box.rx*.42,ry:box.ry*.38,fill:'#050204'},land);
    for(let i=0;i<26;i++){const a=i/26*Math.PI*2,x=box.cx+Math.cos(a)*box.rx*.97,y=box.cy+Math.sin(a)*box.ry*.97,h=14+r()*22;poly(land,`${x-7},${y} ${x},${y-h} ${x+7},${y}`,i%2?'#ffb43a':'#ff7a2a',{filter:'url(#glow)',opacity:.85})}
  }else if(mode==='sun'){
    el('ellipse',{cx:box.cx,cy:box.cy,rx:box.rx*1.15,ry:box.ry*1.25,fill:'url(#sunHalo)'},land);
    for(let i=0;i<16;i++){const a=i/16*Math.PI*2;el('line',{x1:box.cx+Math.cos(a)*box.rx*1.03,y1:box.cy+Math.sin(a)*box.ry*1.03,x2:box.cx+Math.cos(a)*box.rx*(i%2?1.12:1.2),y2:box.cy+Math.sin(a)*box.ry*(i%2?1.12:1.2),stroke:'#f6d27e','stroke-width':4,'stroke-linecap':'round',opacity:.8},land)}
    el('path',{d:shape,fill:`url(#sunTop${sfx})`},land);
  }else{
    el('ellipse',{cx:box.cx,cy:box.cy,rx:box.rx*1.05,ry:box.ry*1.1,fill:'#5b6cff',opacity:.25,filter:'url(#blur)'},land);
    el('path',{d:shape,fill:'#14123f',opacity:.55,stroke:'#9b8cff','stroke-width':1.5,'stroke-dasharray':'6 6'},land);
  }
  if(!rel)terrain(land,mode,base,box,seed+3);

  if(!opt.svg)placeIndex=w.places;
  const roadG=el('g',{},svg),terrG=el('g',{},svg),markG=el('g',{},svg);
  if(mode==='land'||mode==='cloud'){const hubs=w.places.map(p=>pos.get(p)).filter((P,i)=>P&&['thanh','tong','quoc'].includes(w.places[i].t)&&!P.terr);
    const inT=[hubs[0]],rest=hubs.slice(1);while(rest.length&&inT[0]){let bi=0,bj=0,bd=1e9;rest.forEach((b,i)=>inT.forEach((a,j)=>{const d=Math.hypot(a.x-b.x,a.y-b.y);if(d<bd){bd=d;bi=i;bj=j}}));
      const a=inT[bj],b=rest[bi];if(bd<330)el('path',{d:`M${a.x},${a.y} Q${(a.x+b.x)/2+(a.y-b.y)*.12},${(a.y+b.y)/2+(b.x-a.x)*.12} ${b.x},${b.y}`,fill:'none',stroke:'#e9d6a0','stroke-width':2,'stroke-dasharray':'5 5',opacity:.55},roadG);
      inT.push(b);rest.splice(bi,1)}}
  w.places.forEach((p,i)=>{const P=pos.get(p);if(!P||!P.terr)return;
    const c=TERR_COLORS[P.ci%TERR_COLORS.length],water=isWaterName(p.n),g=el('g',{class:'terr place','data-pi':i,'data-t':p.t,tabindex:0,role:'button','aria-label':p.n},terrG);
    const d=blob(P.bx,P.by,P.rx,P.ry,seed+i*17+5,.1,22);
    if(/băng/i.test(p.n))el('path',{d,fill:'#e8f4ff',stroke:'#ffffff','stroke-width':3,opacity:.92},g);
    else if(water)el('path',{d,fill:'#2a6fb8',opacity:.55},g);
    else if(mode==='sea'&&!rel)el('path',{d,fill:'#4f9a46',stroke:'#e9d6a0','stroke-width':4,opacity:.95},g);
    else if(rel)el('path',{d,fill:c,opacity:.08},g);
    else if(mode==='space'){[1,.7,.42].forEach((k,j)=>el('ellipse',{cx:P.bx,cy:P.by,rx:P.rx*k,ry:P.ry*.8*k,fill:'none',stroke:c,opacity:.3+j*.15,'stroke-width':1.4,transform:`rotate(-10 ${P.bx} ${P.by})`},g));el('path',{d,fill:c,opacity:.08},g)}
    else el('path',{d,fill:c,opacity:rel?.1:.16},g);
    el('path',{d,fill:'none',stroke:'#0a0b22','stroke-width':4.5,opacity:.35},g);
    el('path',{class:'edge',d,fill:'none',stroke:c,'stroke-width':1.6+p.s*.3,'stroke-dasharray':'8 4 2 4',opacity:.9},g);
    el('text',{class:'tlabel',x:P.x,y:P.y,fill:c,style:`font-size:${(12+p.s*1.6).toFixed(1)}px`},g).textContent=p.n.toUpperCase();
    bindOpen(g,()=>pick(i));
  });
  w.places.forEach((p,i)=>{const P=pos.get(p);if(!P||P.terr)return;
    const c=PTYPE[p.t].c,g=el('g',{class:'place mk','data-pi':i,'data-t':p.t,tabindex:0,role:'button','aria-label':p.n,transform:`translate(${P.x.toFixed(1)},${P.y.toFixed(1)})`},markG);
    const z=SZ(p.sv);
    el('ellipse',{cx:2,cy:z.r*.75,rx:z.r*.9,ry:z.r*.3,fill:'#000',opacity:.35,filter:'url(#soft)'},g);
    if(p.s>=4)el('circle',{cx:0,cy:-2,r:z.r+5,fill:'none',stroke:'#f2c76e','stroke-width':p.s>=5?2.6:1.6,opacity:.85,filter:'url(#glow)'},g);
    el('circle',{class:'bg',cx:0,cy:-2,r:z.r,fill:'#0a0b22',opacity:.7,stroke:c,'stroke-width':1.5+p.s*.25},g);
    ICON[p.t](el('g',{transform:`translate(0,-1) scale(${z.ic.toFixed(2)})`},g),c);
    el('text',{class:'plabel',x:0,y:z.r+z.fs+2,style:`font-size:${z.fs}px${p.s>=4?';font-weight:700':''}`},g).textContent=p.n;
    bindOpen(g,()=>pick(i));
  });

  // Biểu tượng thế giới góc trên trái, cổng không gian ở các góc dưới
  ART[w.kind](el('g',{transform:`translate(110,${w.kind==='sun'||w.kind==='galaxy'?112:100}) scale(.62)`,opacity:.95},svg));
  const slots=[[70,592],[930,592],[70,480],[930,480]];
  adj[w.id].forEach((n,i)=>{const[x,y]=slots[i],up=linkType(w.id,n)==='up',c=up?'#f2c76e':'#8fd6ff',right=x>500;
    const g=el('g',{class:'portal',tabindex:0,role:'link','aria-label':'Sang '+byId[n].name,transform:`translate(${x},${y})`},svg);
    el('ellipse',{cx:0,cy:0,rx:24,ry:9,fill:'#05060f',stroke:c,'stroke-width':3,filter:'url(#glow)'},g);
    el('ellipse',{cx:0,cy:-26,rx:14,ry:30,fill:c,opacity:.18,filter:'url(#soft)'},g);
    el('text',{x:right?-34:34,y:5,style:`text-anchor:${right?'end':'start'}`},g).textContent=(up?'⇡ ':'→ ')+short(byId[n].name);
    bindOpen(g,()=>opt.onPortal?opt.onPortal(n):go(`${S.id}--${n}`));
  });
  if(opt.svg)return;
  renderPlaceLists(w);applyFilter();
  const first=w.places.map((p,i)=>({p,i})).filter(x=>x.p.t!=='quoc'&&x.p.t!=='vung').sort((a,b)=>b.p.s-a.p.s)[0];
  selectPlace(first?first.i:null,true);
}

function renderPlaceLists(w){
  const box=document.getElementById('placeGroups'),cnt={};w.places.forEach(p=>cnt[p.t]=(cnt[p.t]||0)+1);
  document.getElementById('placeCount').textContent=`${w.places.length} địa danh`;
  document.getElementById('placeLegend').innerHTML=PORDER.filter(t=>cnt[t]).map(t=>`<button type="button" class="lg" data-ft="${t}" aria-pressed="false"><svg viewBox="-16 -18 32 32" aria-hidden="true"></svg>${PTYPE[t].name} <b>${cnt[t]}</b></button>`).join('');
  document.querySelectorAll('#placeLegend .lg').forEach(b=>ICON[b.dataset.ft](b.querySelector('svg'),PTYPE[b.dataset.ft].c));
  const ranked=w.places.map((p,i)=>({p,i})).sort((a,b)=>b.p.s-a.p.s||a.p.n.localeCompare(b.p.n));
  box.innerHTML=ranked.length?`<div class="power">${ranked.map(({p,i})=>`<button type="button" class="pw pchip" data-pi="${i}" data-t="${p.t}"><svg viewBox="-16 -18 32 32" aria-hidden="true"></svg><span class="pn">${esc(p.n)}</span><span class="pb"><i style="width:${p.s*20}%;background:${PTYPE[p.t].c}"></i></span></button>`).join('')}</div>`:'<p class="meta">Chưa có địa danh cho thế giới này.</p>';
  box.querySelectorAll('.pw').forEach(b=>ICON[b.dataset.t](b.querySelector('svg'),PTYPE[b.dataset.t].c));
}

function selectPlace(i,quiet){
  curPlace=i;const d=document.getElementById('placeDetail');
  document.querySelectorAll('#scene .place,.pchip').forEach(n=>n.classList.toggle('sel',Number(n.dataset.pi)===i));
  if(i===null||!placeIndex[i]){d.innerHTML='<p class="meta">Bấm vào một địa danh trên bản đồ để xem chi tiết.</p>';return}
  const p=placeIndex[i],T=PTYPE[p.t],parent=p.in?placeIndex.findIndex(q=>q.n===p.in):-1,kids=placeIndex.map((q,j)=>q.in===p.n?j:-1).filter(j=>j>=0);
  d.innerHTML=`<span class="eyebrow" style="color:${T.c}">${T.name}</span><h3 class="pname">${esc(p.n)}</h3>
    ${parent>=0?`<p class="meta">Thuộc <button type="button" class="linkish" data-pi="${parent}">${esc(p.in)}</button></p>`:''}
    <p>${esc(p.d)}</p>
    ${kids.length?`<div class="sec"><h3>Bên trong</h3><div class="chips">${kids.map(j=>`<button type="button" class="chip pchip" data-pi="${j}">${esc(placeIndex[j].n)}</button>`).join('')}</div></div>`:''}
    <div class="refs"><span class="meta" style="margin-right:6px">Đọc trong truyện:</span>${p.ch.map(chLink).join('')}</div>`;
  if(!quiet&&window.matchMedia('(max-width:720px)').matches)d.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function applyFilter(){
  document.querySelectorAll('#scene .place').forEach(n=>n.classList.toggle('dimmed',!!placeFilter&&n.dataset.t!==placeFilter));
  document.querySelectorAll('#placeLegend .lg').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ft===placeFilter));
}
document.addEventListener('click',e=>{
  const pb=e.target.closest('.pchip,.linkish');if(pb&&pb.dataset.pi!==undefined){selectPlace(Number(pb.dataset.pi));return}
  const lg=e.target.closest('#placeLegend .lg');if(lg){placeFilter=placeFilter===lg.dataset.ft?null:lg.dataset.ft;applyFilter()}
});

/* Khung cảnh giới góc trên phải của bản đồ */
function renderRealmBadge(w,box){
  const[a,b]=rangeOf(w);box=box||document.getElementById('realmBadge');
  const rows=REALMS.slice(a,b+1).map((r,k)=>({r,i:a+k})).reverse();
  box.innerHTML=`<span class="rb-h">Cảnh giới ở đây${w.rGuess?' <em>(ước lượng)</em>':''}</span>
    <span class="rb-range">${esc(REALMS[a].name)} → ${esc(REALMS[b].name)} · ${b-a+1} bậc</span>
    <ol>${rows.map(({r,i})=>`<li><button type="button" data-realm="${r.id}" aria-pressed="${r.id===curRealm}"><i style="background:${GBY[r.g].c}"></i>${esc(r.name)}<span>${i+1}</span></button></li>`).join('')}</ol>`;
}
