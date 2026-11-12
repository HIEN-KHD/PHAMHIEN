/* ===== Bản đồ địa hình chân thật cho bản đồ vùng 2D =====
   Sinh độ cao bằng nhiễu fBm + khoảng cách tới bờ, thêm dãy núi, tô màu theo độ cao/độ ẩm,
   đổ bóng núi (hillshade), rừng có vân tán cây, hồ ở chỗ trũng, sông chảy theo dốc ra biển/mép đảo.
   Kết quả là ảnh PNG (data URL) đặt vào SVG, kèm toạ độ thác nước ở mép đảo. Lưu đệm theo thế giới. */
const RELIEF={};
const RPAL={
  start:{deep:'#1d4f8a',water:'#3a78b8',beach:'#d9cc98',dry:'#b9b46c',low:'#7fa65a',wet:'#4d8a3e',forest:'#2c5a2a',high:'#8d8160',rock:'#8a8580',snow:'#f2f4fa'},
  nine:{deep:'#1d4f8a',water:'#3a78b8',beach:'#d9cc98',dry:'#c2b86e',low:'#86ad5c',wet:'#55933f',forest:'#2f612c',high:'#94875f',rock:'#8f8a84',snow:'#f2f4fa'},
  dragon:{deep:'#0f4a5e',water:'#2f8fae',beach:'#cfe0b0',dry:'#7fbf8a',low:'#4fae7f',wet:'#2f8f66',forest:'#1a5e46',high:'#5e8a74',rock:'#6f8a82',snow:'#eefaf6'},
  gate:{deep:'#1f3f6a',water:'#4a7fb8',beach:'#c9c4b0',dry:'#9a9a84',low:'#7d8a70',wet:'#5f7a62',forest:'#3e5a4a',high:'#7a7a88',rock:'#6a6c7e',snow:'#eef0fa'},
  demon:{deep:'#7a1a08',water:'#ff6a1f',beach:'#3a2020',dry:'#6a2e26',low:'#52211f',wet:'#3e1618',forest:'#2a0f12',high:'#3a2626',rock:'#241a1e',snow:'#8a7a76',lava:1},
  sin:{deep:'#7a1408',water:'#ff4a2a',beach:'#4a2026',dry:'#7a2a32',low:'#62202a',wet:'#4a1420',forest:'#300c16',high:'#4a2830',rock:'#2a1a20',snow:'#9a8a90',lava:1},
  nether:{deep:'#2a1a5e',water:'#9b7bff',beach:'#6a5a9a',dry:'#5a4a8e',low:'#4a3a7e',wet:'#3a2a6a',forest:'#261a4e',high:'#5a5a7a',rock:'#3e3a56',snow:'#e2dcff'},
  waste:{deep:'#2a5a7a',water:'#4a8ab0',beach:'#e6d2a0',dry:'#d8b878',low:'#c4a466',wet:'#9a8a5a',forest:'#6a6a3a',high:'#a07a4a',rock:'#7a5a3a',snow:'#efe2c0'},
  tree:{deep:'#2a6a8a',water:'#6fc0e0',beach:'#e6f2e0',dry:'#bfe0c8',low:'#9fd0b0',wet:'#7fc0a0',forest:'#4f8f76',high:'#9ab0a6',rock:'#8a9a94',snow:'#ffffff'},
  ruins:{deep:'#2a4a6a',water:'#5a8ab8',beach:'#cfc8b0',dry:'#a8a890',low:'#8a9a78',wet:'#6a8466',forest:'#46604a',high:'#8a8a92',rock:'#70727e',snow:'#eef0f6'}};
RPAL.sea=RPAL.isles=RPAL.start;
['start','nine','dragon','gate','ruins','waste','sea','isles','tree'].forEach(k=>{RPAL[k].farm=1});
function vnoise(seed){
  const r=rng(seed),P=new Uint8Array(512),V=new Float32Array(256);
  for(let i=0;i<256;i++){P[i]=i;V[i]=r()}for(let i=255;i>0;i--){const j=Math.floor(r()*(i+1)),t=P[i];P[i]=P[j];P[j]=t}for(let i=0;i<256;i++)P[i+256]=P[i];
  return(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf),a=xi&255,b=yi&255;
    const h00=V[P[P[a]+b]],h10=V[P[P[a+1]+b]],h01=V[P[P[a]+b+1]],h11=V[P[P[a+1]+b+1]];return h00+(h10-h00)*u+(h01-h00)*v+(h00-h10-h01+h11)*u*v};
}
const hexRGB=h=>{const n=parseInt(h.slice(1),16);return[n>>16,n>>8&255,n&255]};
const mixC=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
const sstep=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};

/* Trường địa hình của một thế giới: hàm độ cao/độ ẩm theo toạ độ bản đồ (1000×640), dùng chung cho ảnh nền và các mảnh phóng to.
   w: thế giới; shape: chuỗi path SVG của khối đất; box: khung bản đồ; spots: [{x,y,r} | {x,y,rx,ry}] chỗ cần đất bằng/nổi lên */
function reliefField(w,shape,box,spots,sea){
  const pal=RPAL[w.kind]||RPAL.start,C={};Object.keys(pal).forEach(k=>{if(typeof pal[k]==='string')C[k]=hexRGB(pal[k])});
  const seed=w.id.length*977+w.x*13+w.y,n1=vnoise(seed),n2=vnoise(seed+1),n3=vnoise(seed+2),n4=vnoise(seed+3);
  // Khoảng cách tới bờ (lưới thô, nội suy song tuyến)
  const q=4,GW=Math.ceil(1000/q),GH=Math.ceil(640/q),mc=document.createElement('canvas');mc.width=GW;mc.height=GH;const mx=mc.getContext('2d');
  mx.scale(1/q,1/q);mx.fill(new Path2D(shape));const md=mx.getImageData(0,0,GW,GH).data,D=new Float32Array(GW*GH);
  for(let i=0;i<GW*GH;i++)D[i]=md[i*4+3]>127?1e6:0;
  const pass=(xs,ys,dx,dy)=>{for(let y of ys)for(let x of xs){const i=y*GW+x;if(!D[i])continue;let m=D[i];
    [[dx,0,1],[0,dy,1],[dx,dy,1.414],[-dx,dy,1.414]].forEach(([ax,ay,c])=>{const X=x-ax,Y=y-ay;if(X>=0&&Y>=0&&X<GW&&Y<GH)m=Math.min(m,D[Y*GW+X]+c)});D[i]=m}};
  const rg=(n,rev)=>{const a=[...Array(n).keys()];return rev?a.reverse():a};pass(rg(GW),rg(GH),1,1);pass(rg(GW,1),rg(GH,1),-1,-1);
  const dist=(x,y)=>{const gx=Math.min(GW-1.001,Math.max(0,x/q-.5)),gy=Math.min(GH-1.001,Math.max(0,y/q-.5)),ix=Math.floor(gx),iy=Math.floor(gy),fx=gx-ix,fy=gy-iy,i=iy*GW+ix;
    return q*((D[i]*(1-fx)+D[i+1]*fx)*(1-fy)+(D[i+GW]*(1-fx)+D[i+GW+1]*fx)*fy)};
  // Dãy núi: 2–3 đường gãy khúc qua vùng trong, tránh xa các địa danh
  const r=rng(seed+9),ridges=[];
  for(let k=0;k<3;k++){let best=null;for(let t=0;t<30;t++){const x=box.cx+(r()*2-1)*box.rx*.7,y=box.cy+(r()*2-1)*box.ry*.6,a=r()*Math.PI,L=120+r()*160;
      const p=[[x-Math.cos(a)*L/2,y-Math.sin(a)*L/2*.6],[x,y+(r()-.5)*30],[x+Math.cos(a)*L/2,y+Math.sin(a)*L/2*.6]];
      const clear=spots.length?Math.min(...spots.map(s=>Math.min(...p.map(([u,v])=>Math.hypot(u-s.x,v-s.y)-(s.r||Math.max(s.rx,s.ry)*.3))))):0;if(!best||clear>best.c)best={p,c:clear}}
    ridges.push(best.p)}
  const segD=(x,y,[a,b])=>{const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t)};
  const fbm=(f,x,y,o)=>{let s=0,a=.5,fr=1;for(let i=0;i<o;i++){s+=a*f(x*fr,y*fr);a*=.5;fr*=2.03}return s/(1-Math.pow(.5,o))};
  // xo: số octave thêm khi phóng to (chi tiết nhỏ hơn hiện ra)
  const elev=(x,y,xo=0)=>{const d=Math.max(.5,dist(x,y));let e=fbm(n1,x/170,y/170,6+xo);const coast=sstep(0,sea?40:110,d);
    let rd=1e9;for(const R of ridges)rd=Math.min(rd,segD(x,y,[R[0],R[1]]),segD(x,y,[R[1],R[2]]));
    const ridged=1-Math.abs(fbm(n3,x/42,y/42,5+xo)*2-1),det=1-Math.abs(fbm(n4,x/30+5,y/30+9,4+xo)*2-1),mt=Math.exp(-(rd/55)*(rd/55))*(.55+.45*ridged);
    if(sea)e=(e*1.15-.12)+mt*.25;
    else{e=.25+coast*(.06+.34*e+.07*det*det)+mt*.42*coast*(.7+.3*det);const lk=fbm(n2,x/95+7,y/95+3,3);if(d>45)e-=sstep(.6,.76,lk)*.3}
    for(const s of spots){const rx=s.rx||s.r,ry=s.ry||s.r,u=(x-s.x)/rx,v=(y-s.y)/ry,qd=u*u+v*v;if(qd>9)continue;const k=s.rx?Math.exp(-qd*qd*qd):Math.exp(-qd);
      e=sea?Math.max(e,e*(1-k)+(s.rx?.55+e*.3:.62)*k):e*(1-k*.7)+.42*k*.7}
    return e};
  // Thành, gia tộc, tông môn: quanh đó có ruộng và nhà (chỉ ở thế giới có đồng ruộng)
  const towns=pal.farm?spots.filter(s=>s.t&&['thanh','quoc','gia','tong'].includes(s.t)).map((s,i)=>{const R=s.t==='thanh'||s.t==='quoc'?70:48,a=hash2(s.x,s.y)*Math.PI;return{x:s.x,y:s.y,R,R2:R*R,ca:Math.cos(a),sa:Math.sin(a),big:s.t==='thanh'||s.t==='quoc'}}):[];
  return{w,shape,box,sea,pal,C,n2,n4,elev,towns,moist:(x,y)=>fbm(n2,x/220,y/220,4),dist,lv:sea?.5:.2,seed};
}
const FIELD=[[150,172,82],[188,180,98],[122,152,70],[206,192,118],[98,138,62],[170,160,90]];
const hash2=(x,y)=>{const h=Math.sin(x*12.9898+y*78.233)*43758.5453;return h-Math.floor(h)};
/* Vẽ vùng (x0,y0,vw,vh) của bản đồ ra canvas W×H. Khi phóng to (k lớn) thêm octave để thấy chi tiết. */
function reliefPaint(F,x0,y0,vw,vh,W,H){
  const kx=W/vw,ky=H/vh,zoom=kx/1.3,xo=Math.max(0,Math.min(4,Math.round(Math.log2(Math.max(1,zoom))))),{C,pal,lv,n4}=F;
  const fm=document.createElement('canvas');fm.width=W;fm.height=H;const fc=fm.getContext('2d');fc.setTransform(kx,0,0,ky,-x0*kx,-y0*ky);fc.fill(new Path2D(F.shape));
  const FA=fc.getImageData(0,0,W,H).data,E=new Float32Array(W*H),M=new Float32Array(W*H);
  for(let py=0;py<H;py++)for(let px=0;px<W;px++){const i=py*W+px;if(FA[i*4+3]<8){E[i]=-9;continue}const x=x0+(px+.5)/kx,y=y0+(py+.5)/ky;E[i]=F.elev(x,y,xo);M[i]=F.moist(x,y)}
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;const cx=cv.getContext('2d'),img=cx.createImageData(W,H),o=img.data;
  const L=[-.6,-.7,.75],ln=Math.hypot(...L);L[0]/=ln;L[1]/=ln;L[2]/=ln;
  for(let py=0;py<H;py++)for(let px=0;px<W;px++){const i=py*W+px;if(E[i]===-9)continue;const e=E[i],m=M[i],x=x0+(px+.5)/kx,y=y0+(py+.5)/ky;let c,water=false;
    if(e<lv){water=true;c=mixC(C.deep,C.water,sstep(lv-.18,lv,e))}
    else if(F.sea?e<lv+.02:(F.dist(x,y)<4||e<lv+.012))c=C.beach;
    else{c=mixC(mixC(C.dry,C.wet,sstep(.25,.55,m)),C.low,.45);
      if(m>.5&&e<.68){const tex=n4(x*.42+.37,y*.48+.71)*.45+n4(x*2.1+3,y*2.1+7)*.25+hash2(x*7,y*7)*.3;c=mixC(c,C.forest,sstep(.5,.58,m)*(.7+.3*tex));if(tex>.6)c=mixC(c,C.forest,.4)}
      c=mixC(c,C.high,sstep(.6,.72,e));c=mixC(c,C.rock,sstep(.7,.82,e));
      // Sườn dốc lộ đá
      {const sx=((px+1<W&&E[i+1]!==-9?E[i+1]:e)-(px>0&&E[i-1]!==-9?E[i-1]:e))*kx*95,sy=((py+1<H&&E[i+W]!==-9?E[i+W]:e)-(py>0&&E[i-W]!==-9?E[i-W]:e))*ky*95,sl=Math.hypot(sx,sy)/(kx/1.3);
        c=mixC(c,C.rock,sstep(1.1,2.6,sl)*.6)}
      // Ruộng bậc ô và nhà cửa quanh thành trì
      for(const T of F.towns){const dx=x-T.x,dy=y-T.y,d2=dx*dx+dy*dy;if(d2>T.R2)continue;const d=Math.sqrt(d2),wg=(1-d/T.R)*(1-sstep(.55,.68,e));if(wg<=0)continue;
        const u=dx*T.ca-dy*T.sa,v=dx*T.sa+dy*T.ca,fu=u/5.5,fv=v/3.6,cu=Math.floor(fu),cv=Math.floor(fv),h=hash2(cu+T.x*.1,cv+T.y*.1);
        const fc=FIELD[Math.floor(h*FIELD.length)],line=(fu-cu<.09||fv-cv<.12)?.78:1;c=mixC(c,[fc[0]*line,fc[1]*line,fc[2]*line],Math.min(.85,wg*1.6));
        if(d<T.R*(T.big?.32:.2)){const hu=Math.floor(x*1.5),hv=Math.floor(y*1.5),hh=hash2(hu*1.7+.3,hv*2.3+.1);if(hh>(T.big?.5:.66))c=hh>.86?[168,74,58]:hh>.74?[120,92,70]:[214,206,192]}
        break}c=mixC(c,C.snow,sstep(.86,.92,e+(n4(x*.144,y*.144)-.5)*.05));
      const g=(hash2(Math.floor(x*5),Math.floor(y*5))-.5)*12;c=[c[0]+g,c[1]+g,c[2]+g]}
    // Đổ bóng theo độ dốc thật (đơn vị bản đồ), nên phóng to vẫn đúng hướng sáng
    const gx=water?0:((px+1<W&&E[i+1]!==-9?E[i+1]:e)-(px>0&&E[i-1]!==-9?E[i-1]:e))*kx*95,gy=water?0:((py+1<H&&E[i+W]!==-9?E[i+W]:e)-(py>0&&E[i-W]!==-9?E[i-W]:e))*ky*95;
    const nl=Math.hypot(gx,gy,1),sh=(-gx*L[0]-gy*L[1]+L[2])/nl,k=water?1:Math.max(.45,Math.min(1.35,.35+sh*.85));
    const j=i*4;o[j]=c[0]*k;o[j+1]=c[1]*k;o[j+2]=c[2]*k;o[j+3]=FA[j+3];
    if(water&&pal.lava){o[j]=Math.min(255,c[0]*1.1);o[j+1]=Math.min(255,c[1]*(.8+.4*n4(x/4.6,y/4.6)))}}
  cx.putImageData(img,0,0);
  cx.setTransform(kx,0,0,ky,-x0*kx,-y0*ky);cx.lineWidth=3;cx.strokeStyle='rgba(30,20,10,.45)';cx.stroke(new Path2D(F.shape));
  return cv;
}
/* Sông: bắt đầu ở chỗ cao, đi theo hướng dốc nhất tới bờ hoặc hồ. Trả về đường (vẽ bằng SVG cho sắc nét khi phóng to) và chỗ thác đổ. */
function reliefRivers(F){
  const{box,lv,n2}=F,r=rng(F.seed+9),inside=(x,y)=>F.dist(x,y)>1.5,at=(x,y)=>x<0||y<0||x>1000||y>640||!inside(x,y)?-1:F.elev(x,y);
  const falls=[],rivers=[],cand=[];for(let t=0;t<600;t++){const x=box.cx+(r()*2-1)*box.rx,y=box.cy+(r()*2-1)*box.ry,e=at(x,y);if(e>.6)cand.push([x,y,e])}
  cand.sort((a,b)=>b[2]-a[2]);const src=[];cand.forEach(c=>{if(src.length<(F.sea?0:4)&&src.every(s=>Math.hypot(s[0]-c[0],s[1]-c[1])>140))src.push(c)});
  src.forEach(([x0,y0])=>{let x=x0,y=y0;const pts=[[x,y]],st=6;let prev=null;
    for(let s=0;s<260;s++){const e=at(x,y);if(e<0||e<lv)break;let best=null;
      for(let a=0;a<16;a++){const ang=a/16*Math.PI*2;if(prev!==null&&Math.cos(ang-prev)<-.2)continue;const nx=x+Math.cos(ang)*st,ny=y+Math.sin(ang)*st,ne=at(nx,ny);const v=ne<0?-1:ne+(n2(nx/40,ny/40)-.5)*.02;
        if(!best||v<best[2])best=[nx,ny,v,ang]}
      if(!best||(best[2]>=0&&best[2]>e+.004))break;prev=best[3];x=best[0];y=best[1];if(pts.length>4&&pts.slice(0,-3).some(([u,v])=>Math.hypot(u-x,v-y)<st*.9))break;pts.push([x,y]);if(best[2]<0){falls.push([x,y]);break}}
    if(pts.length>=8)rivers.push(pts)});
  return{rivers,falls};
}
/* Ảnh nền cả bản đồ (lưu đệm theo thế giới) */
function reliefMap(w,shape,box,spots,sea){
  const key=w.id+'|'+shape.length;if(RELIEF[key])return RELIEF[key];
  const F=reliefField(w,shape,box,spots,sea),cv=reliefPaint(F,0,0,1000,640,1300,832),rv=reliefRivers(F);
  return RELIEF[key]={url:cv.toDataURL('image/png'),F,rivers:rv.rivers,falls:rv.falls};
}
