/* ===== Vũ trụ 3D: các thế giới xếp theo tầng, xoay mọi góc =====
   Dùng Three.js r128 + OrbitControls. Tải từ CDN khi mở màn này; nếu không có mạng thì dùng bản trong js/vendor/. */
const V3D={ready:false,run:false};
/* G: hệ số phóng to mỗi đảo (mô hình dựng theo đơn vị nhỏ rồi nhân G). TIER_R tính lại theo cỡ đảo để các đảo không chồng nhau. */
const G=5.4,RM={},TIER_Y={1:0,2:60,3:129,4:198},TIER_R={1:36,2:108,3:69,4:78},SHELL={r:177,y:60,k:.62};
const LIBS=[['https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','js/vendor/three.min.js'],
  ['https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js','js/vendor/OrbitControls.js']];
const loadScript=src=>new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=()=>no(new Error(src));document.head.appendChild(s)});
async function ensureThree(){
  if(window.THREE&&THREE.OrbitControls)return;
  for(const [cdn,local] of LIBS){try{await loadScript(cdn)}catch(e){await loadScript(local)}}
}
const hex=c=>new THREE.Color(c);
const at=(o,x,y,z)=>{o.position.set(x,y,z);return o};
function textSprite(txt,color,size){
  const c=document.createElement('canvas'),x=c.getContext('2d'),fs=56;x.font=`700 ${fs}px "Be Vietnam Pro",system-ui,sans-serif`;
  const w=Math.ceil(x.measureText(txt).width)+40;c.width=w;c.height=fs+30;x.font=`700 ${fs}px "Be Vietnam Pro",system-ui,sans-serif`;
  x.textBaseline='middle';x.lineWidth=10;x.strokeStyle='rgba(5,6,18,.9)';x.strokeText(txt,20,c.height/2);x.fillStyle=color;x.fillText(txt,20,c.height/2);
  const t=new THREE.CanvasTexture(c);t.anisotropy=4;const m=new THREE.SpriteMaterial({map:t,depthWrite:false,transparent:true});
  const s=new THREE.Sprite(m);s.scale.set(size*w/c.height,size,1);return s;
}
function glowSprite(color,size,op=.8){
  const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);
  g.addColorStop(0,color);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:op}));s.scale.set(size,size,1);return s;
}
const mat=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:hex(c),roughness:.85,metalness:.05,flatShading:true},o));
const glow=(c,o={})=>new THREE.MeshBasicMaterial(Object.assign({color:hex(c)},o));

/* Một hòn đảo: viền đất lồi lõm (có mũi đất nhô ra), mặt đất là tấm bản đồ vẽ tay trên canvas, chân đá nhọn phía dưới.
   Mặt đất dùng hệ toạ độ phẳng: điểm (x,z) của đảo ↔ điểm ((x/2S+.5)N, (z/2S+.5)N) trên canvas. */
function islandMesh(R,top,seed,kind,N){
  const g=new THREE.Group(),rnd=rng(seed),S=R*1.5;N=N||(R>3.8?1024:768);
  const lobes=[],nl=3+Math.floor(rnd()*2);for(let i=0;i<nl;i++)lobes.push({a:rnd()*Math.PI*2,d:R*(.72+rnd()*.18),r:R*(.3+rnd()*.2)});
  const p1=rnd()*6,p2=rnd()*6,p3=rnd()*6,M=180,out=[];
  for(let i=0;i<M;i++){const t=i/M*Math.PI*2;let rr=R*(1+.05*Math.sin(3*t+p1)+.035*Math.sin(7*t+p2)+.02*Math.sin(13*t+p3));
    lobes.forEach(L=>{const f=t-L.a,c=Math.cos(f),dis=L.r*L.r-Math.pow(L.d*Math.sin(f),2);if(c>0&&dis>=0)rr=Math.max(rr,(L.d*c+Math.sqrt(dis))*(1+.03*Math.sin(11*t+p3)))});
    out.push([Math.cos(t)*rr,Math.sin(t)*rr])}
  const shape=new THREE.Shape(out.map(([x,z])=>new THREE.Vector2(x,-z)));
  const geo=new THREE.ExtrudeGeometry(shape,{depth:1,bevelEnabled:false,curveSegments:1});geo.rotateX(-Math.PI/2);geo.translate(0,-.65,0);
  const cv=document.createElement('canvas');cv.width=cv.height=N;const ctx=cv.getContext('2d');
  const tex=new THREE.CanvasTexture(cv);tex.repeat.set(1/(2*S),1/(2*S));tex.offset.set(.5,.5);tex.anisotropy=8;
  const P={ctx,N,S,out,tex,toC:(x,z)=>[(x/(2*S)+.5)*N,(z/(2*S)+.5)*N]};
  paintGround(P,kind,top,seed);
  const surf=new THREE.Mesh(geo,[new THREE.MeshStandardMaterial({map:tex,color:0xc8c8c8,roughness:.95,metalness:0}),mat(shade(top,-.45))]);g.add(surf);
  const H=R*1.5,rock=new THREE.ConeGeometry(R*.92,H,12,4);const q=rock.attributes.position;
  for(let i=0;i<q.count;i++){q.setX(i,q.getX(i)*(1+(rnd()-.5)*.25));q.setZ(i,q.getZ(i)*(1+(rnd()-.5)*.25))}rock.computeVertexNormals();
  const rm=new THREE.Mesh(rock,mat('#4a4566'));rm.rotation.x=Math.PI;rm.position.y=-H/2-.6;g.add(rm);
  // Tầng đất giữa mặt và chân đá
  const band=new THREE.Mesh(new THREE.CylinderGeometry(R*.97,R*.9,.5,24),mat(shade(top,-.55)));band.position.y=-.85;g.add(band);
  lobes.forEach(L=>{const lr=new THREE.Mesh(new THREE.ConeGeometry(L.r*.85,L.r*1.7,8,2),mat('#4a4566'));lr.rotation.x=Math.PI;lr.position.set(Math.cos(L.a)*L.d,-L.r*.85-.6,Math.sin(L.a)*L.d);g.add(lr)});
  g.userData.paint=P;return g;
}
/* Bảng màu mặt đất theo loại thế giới: f = rừng, x = đồng/hoa/đá, wat = sông hồ (lava = sông dung nham) */
const PAL={start:{f:['#2f7d3a','#3f9a48','#25692f'],x:['#c9d36a','#e3c46a','#f0a8c8','#9fd46a'],wat:'#3f8fd8',beach:1},
  nine:{f:['#2f7d3a','#3d8f45'],x:['#b9d86a','#f2d27a','#ffb4e0'],wat:'#3f8fd8',beach:1},
  gate:{f:['#4e536b','#5d627c'],x:['#8a8fa8','#b3a5d8','#d8cfb0'],wat:'#6fb6ff'},
  demon:{f:['#2a0d12','#3a1018'],x:['#7a1f2a','#4a2a2a','#a03028'],wat:'#ff5a1f',lava:1},
  sin:{f:['#3a0c16','#4a1020'],x:['#8a2030','#c23a4c','#5a1a2a'],wat:'#ff4a3a',lava:1},
  nether:{f:['#241a4a','#30205e'],x:['#6a52c8','#9b7bff','#3a2d6e'],wat:'#b59bff'},
  waste:{f:['#6e5030','#5b3d22'],x:['#c9a060','#a87a40','#e0c080'],wat:'#5a8fb0'},
  dragon:{f:['#13664f','#1a7d5f','#0f5a44'],x:['#5fd0a8','#f2c76e','#9ef0c8'],wat:'#3fb8d8',beach:1},
  tree:{f:['#5f9f86','#4f8f76'],x:['#d8f5e6','#a8e0c8','#ffe6f0'],wat:'#7fd0e8'},
  ruins:{f:['#5c5f70','#6a6d7e'],x:['#a8abb8','#c9b48a','#8a8ea0'],wat:'#6a9ac8'},
  sea:{f:['#2d8a4a'],x:['#e3cf8f'],wat:'#4fa0e8',ocean:1},isles:{f:['#2d8a4a','#3f9a48'],x:['#e3cf8f','#9fd46a'],wat:'#4fa0e8',ocean:1}};
function outlinePath(P,k=1){const x=P.ctx;x.beginPath();P.out.forEach(([a,b],i)=>{const[u,v]=P.toC(a*k,b*k);i?x.lineTo(u,v):x.moveTo(u,v)});x.closePath()}
function paintGround(P,kind,base,seed){
  const{ctx:x,N}=P,r=rng(seed*3+11),pal=PAL[kind]||PAL.start,s=N/1024;
  x.save();outlinePath(P);x.clip();
  if(pal.ocean){const gr=x.createRadialGradient(N/2,N/2,0,N/2,N/2,N*.5);gr.addColorStop(0,'#3f8fd8');gr.addColorStop(1,'#123f7a');x.fillStyle=gr;x.fillRect(0,0,N,N);
    for(let i=0;i<70;i++){x.strokeStyle='rgba(200,235,255,.25)';x.lineWidth=2*s;const a=r()*N,b=r()*N;x.beginPath();x.arc(a,b,14*s+r()*20*s,Math.PI*1.1,Math.PI*1.9);x.stroke()}
    const n=kind==='isles'?9:4;for(let i=0;i<n;i++){const cx=N*(.2+r()*.6),cy=N*(.2+r()*.6),rr=(30+r()*60)*s;
      x.fillStyle='#e3cf8f';blobC(x,cx,cy,rr*1.18,r);x.fill();x.fillStyle=pal.f[i%pal.f.length];blobC(x,cx,cy,rr,r);x.fill();
      for(let j=0;j<12;j++){x.fillStyle=shade('#2f7d3a',(r()-.5)*.3);x.beginPath();x.arc(cx+(r()-.5)*rr,cy+(r()-.5)*rr,5*s,0,7);x.fill()}}
  }else{
    const gr=x.createRadialGradient(N*.45,N*.4,0,N/2,N/2,N*.55);gr.addColorStop(0,shade(base,.08));gr.addColorStop(1,shade(base,-.22));x.fillStyle=gr;x.fillRect(0,0,N,N);
    // Đồng cỏ, ruộng, đá: các mảng mờ nhiều màu
    for(let i=0;i<120;i++){const c=r()<.55?shade(base,(r()-.5)*.35):pal.x[Math.floor(r()*pal.x.length)],cx=r()*N,cy=r()*N,rr=(25+r()*90)*s,g2=x.createRadialGradient(cx,cy,0,cx,cy,rr);
      g2.addColorStop(0,c+'55');g2.addColorStop(1,c+'00');x.fillStyle=g2;x.fillRect(cx-rr,cy-rr,rr*2,rr*2)}
    // Ruộng/ô đất hình chữ nhật xoay
    if(!pal.lava)for(let i=0;i<14;i++){x.save();x.translate(r()*N,r()*N);x.rotate(r()*3);x.globalAlpha=.35;for(let j=0;j<4;j++){x.fillStyle=pal.x[(i+j)%pal.x.length];x.fillRect(j*16*s,0,14*s,40*s)}x.restore()}
    // Rừng: cụm chấm cây
    for(let i=0;i<11;i++){const cx=N*(.15+r()*.7),cy=N*(.15+r()*.7),rr=(40+r()*70)*s;
      for(let j=0;j<55;j++){const a=r()*6.28,d=Math.sqrt(r())*rr,px=cx+Math.cos(a)*d,py=cy+Math.sin(a)*d*.8,t=(5+r()*6)*s;
        x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.arc(px+2*s,py+2*s,t,0,7);x.fill();x.fillStyle=pal.f[Math.floor(r()*pal.f.length)];x.beginPath();x.arc(px,py,t,0,7);x.fill()}}
    // Sông (hoặc dòng dung nham) từ trong ra mép, và hồ
    for(let i=0;i<3;i++){let px=N*(.35+r()*.3),py=N*(.35+r()*.3),a=r()*6.28;const pts=[[px,py]];
      for(let k=0;k<26;k++){a+=(r()-.5)*.7;px+=Math.cos(a)*22*s;py+=Math.sin(a)*22*s;pts.push([px,py])}
      [[18,'rgba(0,0,0,.25)'],[12,pal.wat],[4,pal.lava?'#ffe08a':'rgba(255,255,255,.45)']].forEach(([w,c],j)=>{x.lineWidth=w*s*(1-.0*j);x.strokeStyle=c;x.lineCap='round';x.lineJoin='round';
        if(pal.lava&&j===1){x.shadowColor='#ff6a1f';x.shadowBlur=18*s}x.beginPath();pts.forEach(([u,v],k)=>k?x.lineTo(u,v):x.moveTo(u,v));x.stroke();x.shadowBlur=0})}
    for(let i=0;i<2;i++){const cx=N*(.25+r()*.5),cy=N*(.25+r()*.5),rr=(28+r()*36)*s;x.fillStyle='rgba(0,0,0,.25)';blobC(x,cx+3*s,cy+3*s,rr,r);x.fill();
      x.fillStyle=pal.wat;if(pal.lava){x.shadowColor='#ff6a1f';x.shadowBlur=24*s}blobC(x,cx,cy,rr,r);x.fill();x.shadowBlur=0;x.fillStyle='rgba(255,255,255,.25)';blobC(x,cx-rr*.2,cy-rr*.2,rr*.4,r);x.fill()}
    // Hạt nhiễu cho bề mặt có chất liệu
    for(let i=0;i<5000;i++){x.fillStyle=r()<.5?'rgba(255,255,255,.07)':'rgba(0,0,0,.08)';x.fillRect(r()*N,r()*N,3*s,3*s)}
  }
  // Mép đảo: bóng tối viền + bãi cát
  x.lineJoin='round';outlinePath(P);x.lineWidth=46*s;x.strokeStyle='rgba(0,0,0,.28)';x.stroke();
  if(pal.beach){outlinePath(P);x.lineWidth=20*s;x.strokeStyle='rgba(233,214,160,.9)';x.stroke()}
  x.restore();P.tex.needsUpdate=true;
}
function blobC(x,cx,cy,rr,r){const n=18,ph=r()*6;x.beginPath();for(let i=0;i<=n;i++){const a=i/n*6.283,k=rr*(1+.18*Math.sin(3*a+ph)+.08*Math.sin(5*a));i?x.lineTo(cx+Math.cos(a)*k,cy+Math.sin(a)*k*.85):x.moveTo(cx+Math.cos(a)*k,cy+Math.sin(a)*k*.85)}x.closePath()}

/* Núi lửa: thân côn cụt, miệng dung nham phát sáng, dòng lava, khói bốc lên (hoạt động) */
function volcano(R,active,seed){
  const g=new THREE.Group(),r=rng(seed),h=R*.55,br=R*.32;
  const body=new THREE.CylinderGeometry(br*.28,br,h,14,4);const bp=body.attributes.position;for(let i=0;i<bp.count;i++){const f=1+(r()-.5)*.18;bp.setX(i,bp.getX(i)*f);bp.setZ(i,bp.getZ(i)*f)}body.computeVertexNormals();
  const m=new THREE.Mesh(body,mat(active?'#3a2420':'#5a5048'));m.position.y=h/2+.3;g.add(m);
  const crater=new THREE.Mesh(new THREE.CircleGeometry(br*.26,16),active?glow('#ff6a1f'):mat('#2a2420'));crater.rotation.x=-Math.PI/2;crater.position.y=h+.31;g.add(crater);
  if(active){const gs=glowSprite('rgba(255,110,30,1)',br*2.6,.85);gs.position.y=h+.5;g.add(gs);
    for(let i=0;i<3;i++){const a=r()*Math.PI*2,pts=[];for(let k=0;k<=8;k++){const u=k/8;pts.push(new THREE.Vector3(Math.cos(a)*br*(.25+u*.75)+(r()-.5)*.1,h+.3-u*h,Math.sin(a)*br*(.25+u*.75)+(r()-.5)*.1))}
      g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),16,.05+R*.01,5),glow('#ff7a2a')))}
    for(let i=0;i<5;i++){const sm=glowSprite('rgba(120,110,120,1)',br*1.2,.45);sm.material.blending=THREE.NormalBlending;sm.position.y=h+.6+i*.5;sm.userData.smoke={base:h+.6,top:h+.6+R*1.2,ph:i/5,sp:.12+r()*.06};g.add(sm)}}
  else{const snow=new THREE.Mesh(new THREE.CylinderGeometry(br*.3,br*.5,h*.2,14),mat('#f2f4ff'));snow.position.y=h*.92+.3;g.add(snow)}
  return g;
}
const VOLC={demon:[2,1],sin:[1,1],dragon:[1,1],nether:[1,1],waste:[1,0],start:[1,0],gate:[1,0],ruins:[1,0],nine:[0,0]};
const cone=(r,h,c,o)=>new THREE.Mesh(new THREE.ConeGeometry(r,h,6),mat(c,o));
function scatter(g,R,n,seed,fn){const r=rng(seed);for(let i=0;i<n;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*R*.8;fn(g,Math.cos(a)*d,Math.sin(a)*d,r)}}
function mountains(g,R,n,c,seed){scatter(g,R,n,seed,(g,x,z,r)=>{const h=.8+r()*1.4,m=cone(.35+r()*.4,h,c);m.position.set(x,.35+h/2,z);g.add(m);
  if(h>1.4){const s=cone(.18,h*.3,'#f4f6ff');s.position.set(x,.35+h*.86,z);g.add(s)}})}
/* Cây: thông (nón) và cây tán tròn, nhiều màu theo bảng màu; c có thể là một màu hoặc mảng màu */
function trees(g,R,n,c,seed){const cs=[].concat(c);scatter(g,R,n,seed,(g,x,z,r)=>{const col=cs[Math.floor(r()*cs.length)],h=.4+r()*.35;
  if(r()<.6){const t=cone(.12+r()*.06,h,col);t.position.set(x,.35+h/2,z);g.add(t)}
  else{const tr=new THREE.Mesh(new THREE.CylinderGeometry(.03,.04,.25,4),mat('#6b4a2e'));tr.position.set(x,.47,z);g.add(tr);
    const cr=new THREE.Mesh(new THREE.IcosahedronGeometry(.15+r()*.08,0),mat(r()<.2?['#f0a8c8','#f2c76e','#ff9f6a'][Math.floor(r()*3)]:col));cr.position.set(x,.7,z);g.add(cr)}})}
function castle(g,x,z,s=1){const b=new THREE.Mesh(new THREE.BoxGeometry(.9*s,.6*s,.9*s),mat('#e7dcc0'));b.position.set(x,.35+.3*s,z);g.add(b);
  const t=new THREE.Mesh(new THREE.CylinderGeometry(.18*s,.2*s,1*s,6),mat('#efe6cf'));t.position.set(x+.3*s,.35+.5*s,z+.3*s);g.add(t);
  const r=cone(.26*s,.4*s,'#c0392b');r.position.set(x+.3*s,.35+1.2*s,z+.3*s);g.add(r)}

/* Dựng hình riêng cho từng loại thế giới; R là bán kính (thế giới nhiều thế lực thì to hơn) */
function worldModel(w,R){
  const g=new THREE.Group(),k=w.kind,base=GROUND[k]||'#4f9a46',sd=w.x*7+w.y;
  if(k==='sun'){const s=new THREE.Mesh(new THREE.SphereGeometry(R*.9,32,24),glow('#ffd76e'));g.add(s);g.add(glowSprite('rgba(255,210,110,1)',R*5));
    for(let i=0;i<8;i++){const ray=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,R*.9,6),glow('#f6d27e'));const a=i/8*Math.PI*2;ray.position.set(Math.cos(a)*R*1.5,0,Math.sin(a)*R*1.5);ray.rotation.z=Math.PI/2;ray.rotation.y=-a;g.add(ray)}
    return g}
  if(k==='galaxy'){const n=2600,pos=new Float32Array(n*3),col=new Float32Array(n*3),r=rng(sd),c1=hex('#bcd0ff'),c2=hex('#ffd9f0');
    for(let i=0;i<n;i++){const arm=i%3,d=Math.pow(r(),.6)*R*1.8,a=d*1.4+arm*2.09+(r()-.5)*.5;pos[i*3]=Math.cos(a)*d;pos[i*3+1]=(r()-.5)*.25*(2-d/R);pos[i*3+2]=Math.sin(a)*d;
      const c=c1.clone().lerp(c2,r());col.set([c.r,c.g,c.b],i*3)}
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setAttribute('color',new THREE.BufferAttribute(col,3));
    const pts=new THREE.Points(geo,new THREE.PointsMaterial({size:.09,vertexColors:true,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false}));pts.userData.spin=.15;g.add(pts);
    g.add(glowSprite('rgba(220,230,255,1)',R*1.6));return g}
  if(k==='abyss'){const ring=new THREE.Mesh(new THREE.TorusGeometry(R,.45,10,40),mat('#3a1208',{emissive:hex('#ff5a1f'),emissiveIntensity:.6}));ring.rotation.x=Math.PI/2;g.add(ring);
    const pit=new THREE.Mesh(new THREE.CircleGeometry(R,40),glow('#050204'));pit.rotation.x=-Math.PI/2;g.add(pit);
    scatter(g,R*1.25,26,sd,(g,x,z,r)=>{const d=Math.hypot(x,z);if(d<R*.85)return;const f=cone(.15,.5+r()*.9,'#ff7a2a',{emissive:hex('#ff7a2a'),emissiveIntensity:1});f.position.set(x,.4,z);g.add(f)});
    g.add(glowSprite('rgba(255,110,40,1)',R*3.2,.5));return g}
  if(k==='heaven'){[[R,0],[R*.78,.7],[R*.55,1.4]].forEach(([r,y],i)=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(r,r*1.05,.45,28),mat(i?'#f3f5ff':'#dfe6ff',{flatShading:false}));c.position.y=y;g.add(c);
      scatter(g,r,8,sd+i,(g,x,z)=>{const p=new THREE.Mesh(new THREE.SphereGeometry(.45,10,8),mat('#ffffff',{flatShading:false}));p.scale.y=.5;p.position.set(x,y+.15,z);g.add(p)})});
    [[0,1.9,1.3],[-R*.6,.5,.8],[R*.6,.5,.8]].forEach(([x,y,s])=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.7*s,.5*s,.7*s),mat('#f2c76e',{emissive:hex('#8a5a10'),emissiveIntensity:.3}));b.position.set(x,y,0);g.add(b);const r=cone(.6*s,.5*s,'#e3a948');r.position.set(x,y+.5*s,0);g.add(r)});
    g.add(glowSprite('rgba(255,255,255,1)',R*3,.35));return g}
  const isl=islandMesh(R,MODE[k]==='sea'?'#2f7fd0':base,sd,k);g.add(isl);g.userData.paint=isl.userData.paint;const pal=PAL[k]||PAL.start;
  if(k==='start'){mountains(g,R,7,'#5aa64f',sd);trees(g,R,46,pal.f,sd+1);castle(g,R*.3,R*.15,1.1)}
  else if(k==='isles'||k==='sea'){scatter(g,R,k==='isles'?7:2,sd,(g,x,z,r)=>{const s=new THREE.Mesh(new THREE.CylinderGeometry(.4+r()*.5,.6,.3,10),mat('#5fbf5a'));s.position.set(x,.45,z);g.add(s);trees(s,.5,3,'#2f7d3a',sd+3)});
    if(k==='sea'){const rk=cone(.6,1.6,'#7d8496');rk.position.set(R*.3,1.1,0);g.add(rk)}
    const sail=new THREE.Mesh(new THREE.ConeGeometry(.25,.6,3),mat('#f3efe2'));sail.position.set(-R*.4,.8,R*.2);g.add(sail)}
  else if(k==='nine'){isl.visible=false;g.userData.paint=null;for(let r=0;r<3;r++)for(let c=0;c<3;c++){const s=islandMesh(R*.28,c===1&&r===1?'#a6e36a':'#6cc85a',sd+r*3+c,'nine',256);s.position.set((c-1)*R*.75,(r+c)%2*.3,(r-1)*R*.75);g.add(s);trees(s,R*.25,6,pal.f,sd+r+c)}}
  else if(k==='dragon'){mountains(g,R,8,'#1fae84',sd);trees(g,R,34,pal.f,sd+2);
    const pts=[];for(let i=0;i<=40;i++){const t=i/40;pts.push(new THREE.Vector3((t-.5)*R*1.8,1.6+Math.sin(t*Math.PI*3)*.8,Math.cos(t*Math.PI*2)*R*.4))}
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),60,.16,8),mat('#f2c76e',{emissive:hex('#b07a10'),emissiveIntensity:.6,metalness:.6,roughness:.3})))}
  else if(k==='tree'){trees(g,R,26,pal.f.concat(['#ffd6e8']),sd);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.18,.28,2.2,8),mat('#8a6a4a'));tr.position.y=1.4;g.add(tr);
    [[0,2.9,1.1],[.6,2.5,.8],[-.6,2.5,.8]].forEach(([x,y,s])=>{const c=new THREE.Mesh(new THREE.SphereGeometry(s,14,10),mat('#e6fff4',{emissive:hex('#bfffe6'),emissiveIntensity:.5,flatShading:false}));c.position.set(x,y,0);g.add(c)});g.add(at(glowSprite('rgba(220,255,240,1)',5,.5),0,2.8,0))}
  else if(k==='gate'){mountains(g,R,7,'#9fa4bd',sd);trees(g,R,14,['#4e7a6b','#6a8f7e'],sd+4);const a=new THREE.Mesh(new THREE.TorusGeometry(.9,.12,8,24,Math.PI),mat('#f2c76e',{emissive:hex('#b07a10'),emissiveIntensity:.7,metalness:.6}));a.position.y=.4;g.add(a)}
  else if(k==='demon'||k==='sin'){scatter(g,R,k==='demon'?12:9,sd,(g,x,z,r)=>{const h=.8+r()*1.8,s=cone(.18+r()*.15,h,k==='demon'?'#130b10':'#e0435c',k==='sin'?{emissive:hex('#7a1020'),emissiveIntensity:.5}:{});s.position.set(x,.35+h/2,z);g.add(s)});
    if(k==='demon'){const m=new THREE.Mesh(new THREE.SphereGeometry(.7,20,14),glow('#e0393c'));m.position.set(R*.6,4,-R*.3);g.add(m);const gs=glowSprite('rgba(255,60,60,1)',4,.6);gs.position.copy(m.position);g.add(gs)}}
  else if(k==='nether'){for(let i=0;i<3;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(R*(.4+i*.2),.05,6,40),glow('#c8b6ff',{transparent:true,opacity:.8}));t.rotation.x=Math.PI/2;t.position.y=.6+i*.5;t.userData.spin=.3+i*.2;g.add(t)}g.add(at(glowSprite('rgba(155,123,255,1)',R*2.6,.5),0,1,0))}
  else if(k==='waste'){trees(g,R,10,['#5b3d22','#7e5a33'],sd);const t=new THREE.Mesh(new THREE.CylinderGeometry(.08,.14,1.6,6),mat('#5b3d22'));t.position.y=1.1;t.rotation.z=.2;g.add(t);mountains(g,R,4,'#7e5a33',sd+5)}
  else if(k==='ruins'){scatter(g,R,8,sd,(g,x,z,r)=>{const h=.5+r()*1.4,c=new THREE.Mesh(new THREE.CylinderGeometry(.14,.16,h,8),mat('#c9ccd8'));c.position.set(x,.35+h/2,z);g.add(c)});
    g.add(at(glowSprite('rgba(230,235,255,1)',R*2.5,.25),0,.8,0))}
  const vc=VOLC[k];if(vc&&vc[0]){const r=rng(sd+77);for(let i=0;i<vc[0];i++){const a=r()*Math.PI*2+i*2.4,v=volcano(R,!!vc[1],sd+i);v.position.set(Math.cos(a)*R*.86,0,Math.sin(a)*R*.86);v.userData.keep=true;g.add(v)}}
  g.userData.decor=g.children.filter(c=>c!==isl&&!c.userData.keep);
  return g;
}

/* Thế lực trên mặt đảo: vị trí lấy từ bản đồ vùng 2D (cùng thuật toán sắp xếp), cỡ theo quy mô.
   Thành: tường + 4 tháp + chính điện. Tông môn: bảo tháp nhiều tầng + điện phụ + cổng. Gia tộc: phủ đệ mái màu + cờ. */
const roof=(r,h,c,em)=>{const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,4),mat(c,em));m.rotation.y=Math.PI/4;return m};
function hall(g,x,z,w,c,k,em){const b=new THREE.Mesh(new THREE.BoxGeometry(w*k,.18*k,w*.7*k),mat(shade(c,.45)));b.position.set(x,.09*k,z);g.add(b);const r=roof(w*.78*k,.16*k,c,em);r.scale.z=.75;r.position.set(x,.26*k,z);g.add(r)}
function marker3D(p,c){
  const g=new THREE.Group(),k=.75+p.s*.18,em={emissive:hex(c),emissiveIntensity:.3};
  if(p.t==='thanh'){const L=.62*k,wl=mat(shade(c,.3));
    [[0,-1],[0,1],[-1,0],[1,0]].forEach(([x,z])=>{const w=new THREE.Mesh(new THREE.BoxGeometry(x?.06*k:L*2,.16*k,z?.06*k:L*2),wl);w.position.set(x*L,.08*k,z*L);g.add(w)});
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([x,z])=>{const tw=new THREE.Mesh(new THREE.CylinderGeometry(.08*k,.09*k,.36*k,6),mat(shade(c,.5)));tw.position.set(x*L,.18*k,z*L);g.add(tw);const r=cone(.12*k,.18*k,c,em);r.position.set(x*L,.45*k,z*L);g.add(r)});
    hall(g,0,-.1*k,.5,c,k,em);const keep=new THREE.Mesh(new THREE.BoxGeometry(.3*k,.3*k,.3*k),mat(shade(c,.55)));keep.position.set(0,.3*k,-.1*k);g.add(keep);const kr=roof(.28*k,.22*k,c,em);kr.position.set(0,.56*k,-.1*k);g.add(kr);
    for(let i=0;i<5;i++){hall(g,(i-2)*.22*k,.32*k,.16,shade(c,-.25),k,{})}}
  else if(p.t==='tong'){[[.34,0],[.27,.17],[.2,.33],[.13,.48]].forEach(([r,y])=>{const body=new THREE.Mesh(new THREE.CylinderGeometry(r*.6*k,r*.6*k,.12*k,8),mat(shade(c,.5)));body.position.y=(y+.06)*k;g.add(body);
      const rf=cone(r*k,.12*k,c,em);rf.position.y=(y+.16)*k;g.add(rf)});const sp=new THREE.Mesh(new THREE.CylinderGeometry(.015*k,.015*k,.25*k,4),mat('#f2c76e'));sp.position.y=.72*k;g.add(sp);
    hall(g,-.48*k,.15*k,.26,c,k,em);hall(g,.48*k,.15*k,.26,c,k,em);hall(g,0,-.5*k,.3,c,k,em);
    const gate=new THREE.Group();[-1,1].forEach(s=>{const post=new THREE.Mesh(new THREE.CylinderGeometry(.025*k,.025*k,.3*k,5),mat('#c0392b'));post.position.set(s*.12*k,.15*k,0);gate.add(post)});
    const bar=new THREE.Mesh(new THREE.BoxGeometry(.34*k,.04*k,.05*k),mat('#c0392b'));bar.position.y=.3*k;gate.add(bar);gate.position.set(0,0,.55*k);g.add(gate);
    const ring=new THREE.Mesh(new THREE.RingGeometry(.66*k,.7*k,36),glow(c,{transparent:true,opacity:.7,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.02;g.add(ring)}
  else if(p.t==='gia'){hall(g,0,0,.5,c,k,em);hall(g,-.32*k,.28*k,.26,shade(c,-.2),k,{});hall(g,.32*k,.28*k,.26,shade(c,-.2),k,{});
    const wall=new THREE.Mesh(new THREE.TorusGeometry(.52*k,.025*k,4,24),mat('#d9cba6'));wall.rotation.x=Math.PI/2;wall.position.y=.04*k;g.add(wall);
    const pole=new THREE.Mesh(new THREE.CylinderGeometry(.02*k,.02*k,.9*k,5),mat('#e6d8b8'));pole.position.set(.28*k,.45*k,-.2*k);g.add(pole);
    const fl=new THREE.Mesh(new THREE.PlaneGeometry(.36*k,.22*k),mat(c,Object.assign({side:THREE.DoubleSide},em)));fl.position.set(.47*k,.78*k,-.2*k);g.add(fl)}
  else if(p.t==='toc'){const sh=new THREE.Mesh(new THREE.OctahedronGeometry(.26*k,0),mat(c,em));sh.scale.y=1.4;sh.position.y=.45*k;g.add(sh);
    for(let i=0;i<7;i++){const a=i/7*Math.PI*2,st=new THREE.Mesh(new THREE.BoxGeometry(.07*k,.28*k,.07*k),mat('#9a93a8'));st.position.set(Math.cos(a)*.42*k,.14*k,Math.sin(a)*.42*k);g.add(st)}
    for(let i=0;i<4;i++){const a=i/4*Math.PI*2+.4,tent=cone(.12*k,.2*k,shade(c,-.3));tent.position.set(Math.cos(a)*.7*k,.1*k,Math.sin(a)*.7*k);g.add(tent)}}
  else if(p.t==='dao'){const d=new THREE.Mesh(new THREE.CylinderGeometry(.34*k,.4*k,.12*k,12),mat('#e9d6a0'));d.position.y=.06*k;g.add(d);const m=cone(.2*k,.4*k,'#4fae5f');m.position.y=.32*k;g.add(m);hall(g,.18*k,.15*k,.16,c,k,em)}
  else if(p.t==='hiem'){const sp=new THREE.Mesh(new THREE.IcosahedronGeometry(.22*k,0),mat(c,{emissive:hex(c),emissiveIntensity:.9}));sp.position.y=.35*k;sp.userData.spin=.8;g.add(sp);
    for(let i=0;i<5;i++){const a=i/5*6.28,sk=cone(.05*k,.3*k,'#2a1418');sk.position.set(Math.cos(a)*.35*k,.15*k,Math.sin(a)*.35*k);g.add(sk)}
    const gs=glowSprite('rgba(255,90,90,1)',.9*k,.6);gs.position.y=.35*k;g.add(gs)}
  else if(p.t==='bau'){const gem=new THREE.Mesh(new THREE.OctahedronGeometry(.2*k,0),glow(c));gem.position.y=.42*k;gem.userData.spin=1.2;g.add(gem);
    const gs=glowSprite('rgba(255,228,138,1)',1*k,.7);gs.position.y=.42*k;g.add(gs)}
  else{const q=new THREE.Mesh(new THREE.CylinderGeometry(.08*k,.1*k,.5*k,8),mat(c,em));q.position.y=.25*k;g.add(q)}
  if(p.s>=4){const halo=new THREE.Mesh(new THREE.RingGeometry(.78*k,.86*k,36),glow('#f2c76e',{transparent:true,opacity:.8,side:THREE.DoubleSide}));halo.rotation.x=-Math.PI/2;halo.position.y=.03;g.add(halo)}
  return g;
}
/* Vẽ lãnh địa, đường nối các thành/tông môn, và nền quảng trường dưới mỗi thế lực lên tấm bản đồ mặt đảo */
function paintFactions(P,w,pos,X,Z,FS){
  const{ctx:x,N}=P,s=N/1024,C=(bx,by)=>P.toC(X(bx),Z(by)),seed=w.id.length*131+w.y;x.save();outlinePath(P);x.clip();
  w.places.forEach((p,i)=>{const Q=pos.get(p);if(!Q||!Q.terr)return;const c=TERR_COLORS[Q.ci%TERR_COLORS.length],pts=blobPts(Q.bx,Q.by,Q.rx,Q.ry,seed+i*17+5,.1,22).map(([a,b])=>C(a,b));
    const path=()=>{x.beginPath();pts.forEach(([u,v],j)=>j?x.lineTo(u,v):x.moveTo(u,v));x.closePath()};
    path();x.fillStyle=isWaterName(p.n)?'rgba(42,111,184,.55)':/băng/i.test(p.n)?'rgba(232,244,255,.8)':c+'40';x.fill();
    path();x.lineWidth=12*s;x.strokeStyle='rgba(10,11,34,.35)';x.stroke();
    path();x.lineWidth=(4+p.s)*s;x.strokeStyle=c;x.setLineDash([22*s,9*s,5*s,9*s]);x.stroke();x.setLineDash([])});
  const hubs=w.places.map(p=>[p,pos.get(p)]).filter(([p,Q])=>Q&&!Q.terr&&['thanh','tong','quoc','gia'].includes(p.t)).map(([p,Q])=>C(Q.x,Q.y));
  if(hubs.length>1){const inT=[hubs[0]],rest=hubs.slice(1);x.lineCap='round';
    while(rest.length){let bi=0,bj=0,bd=1e9;rest.forEach((b,i)=>inT.forEach((a,j)=>{const d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d<bd){bd=d;bi=i;bj=j}}));const a=inT[bj],b=rest[bi];
      const mx=(a[0]+b[0])/2+(a[1]-b[1])*.12,my=(a[1]+b[1])/2+(b[0]-a[0])*.12;
      [[14,'rgba(60,40,20,.35)'],[8,'#e9d6a0']].forEach(([lw,c])=>{x.lineWidth=lw*s;x.strokeStyle=c;x.beginPath();x.moveTo(a[0],a[1]);x.quadraticCurveTo(mx,my,b[0],b[1]);x.stroke()});
      inT.push(b);rest.splice(bi,1)}}
  w.places.forEach(p=>{const Q=pos.get(p);if(!Q||Q.terr)return;const[u,v]=C(Q.x,Q.y),c=PTYPE[p.t].c,rr=(.75+p.s*.17)*(p.minor?.24:.36)*FS/(2*P.S)*N*.62;
    x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.arc(u+3*s,v+3*s,rr*.85,0,7);x.fill();x.fillStyle=c+'38';x.beginPath();x.arc(u,v,rr*.85,0,7);x.fill();
    x.lineWidth=2.5*s;x.strokeStyle=c+'aa';x.stroke()});
  x.restore();P.tex.needsUpdate=true;
}
function factions3D(grp,w,R,pick){
  const k=w.kind;if(!w.places.length)return;
  markMinor(w.places);const nP=w.places.length,nMaj=w.places.filter(p=>!p.minor).length,shrink=nMaj>20?1.3:nMaj>15?.8:nMaj>11?.4:0;w.places.forEach(p=>{p.sv=Math.max(1,p.s-shrink)});
  const box=nP>18?{cx:492,cy:312,rx:432,ry:214}:{cx:500,cy:300,rx:395,ry:188},pos=layoutPlaces(w.places,box,[]);
  const spread=k==='sun'?R*2.3:k==='galaxy'?R*1.9:R*.9,baseY=k==='heaven'?.3:k==='nine'?.75:k==='sun'||k==='galaxy'?-R*.15:.38;
  const X=x=>(x-box.cx)/box.rx*spread,Z=y=>(y-box.cy)/box.ry*spread*(k==='sun'||k==='galaxy'?.75:1);
  const FS=Math.max(1,R/2.4),LS=Math.sqrt(FS)*.9,labels=[];grp.userData.labels=labels;const sv=[...w.places].map(p=>p.s).sort((a,b)=>b-a),cut=nP>10?sv[Math.min(sv.length-1,7)]:0;
  if(k==='sun'||k==='galaxy'){const disc=new THREE.Mesh(new THREE.RingGeometry(R*1.3,spread*1.08,64),new THREE.MeshBasicMaterial({color:k==='sun'?0xf2b54a:0x5b6cff,transparent:true,opacity:.12,side:THREE.DoubleSide,depthWrite:false}));disc.rotation.x=-Math.PI/2;disc.position.y=baseY;grp.add(disc)}
  if(grp.userData.paint)paintFactions(grp.userData.paint,w,pos,X,Z,FS);
  w.places.forEach((p,i)=>{const P=pos.get(p);if(!P)return;
    if(P.terr){const c=TERR_COLORS[P.ci%TERR_COLORS.length];
      const sx=P.rx/box.rx*spread,sz=P.ry/box.ry*spread,cx=X(P.bx),cz=Z(P.by),ht=.08+p.s*.03;
      const zone=new THREE.Mesh(new THREE.CylinderGeometry(1,1.04,ht,48),grp.userData.paint?new THREE.MeshBasicMaterial({visible:false}):mat(c,{transparent:true,opacity:.55,flatShading:false,emissive:hex(c),emissiveIntensity:.15}));
      zone.scale.set(sx,1,sz);zone.position.set(cx,baseY+ht/2,cz);grp.add(zone);
      const np=Math.round(6+(sx+sz)*2);for(let j=0;j<np;j++){const a=j/np*Math.PI*2,post=new THREE.Mesh(new THREE.CylinderGeometry(.03*FS,.04*FS,.26*FS,5),mat(c,{emissive:hex(c),emissiveIntensity:.6}));
        post.position.set(cx+Math.cos(a)*sx,baseY+ht+.16*FS,cz+Math.sin(a)*sz);grp.add(post)}
      const lb=textSprite(p.n.toUpperCase(),c,(.3+p.s*.035)*LS);lb.center.set(.5,0);lb.position.set(X(P.x),baseY+.15,Z(P.y));lb.material.depthTest=false;lb.renderOrder=9;grp.add(lb);labels.push(lb);
      zone.userData={wid:w.id,pi:i};pick.push(zone);return}
    const m=marker3D(p,PTYPE[p.t].c);m.scale.setScalar(FS*(p.minor?.24:.36));m.position.set(X(P.x),baseY,Z(P.y));grp.add(m);
    const hit=new THREE.Mesh(new THREE.SphereGeometry((.35+p.s*.07)*FS,8,6),new THREE.MeshBasicMaterial({visible:false}));hit.position.set(X(P.x),baseY+.35*FS,Z(P.y));hit.userData={wid:w.id,pi:i};grp.add(hit);pick.push(hit);
    const lb=textSprite(p.n,p.s>=4?'#f2c76e':'#ffffff',(.17+p.s*.028)*LS);lb.userData.minor=p.s<cut||p.minor;lb.center.set(.5,0);lb.position.set(X(P.x),baseY+(.34+p.s*.065)*FS*(p.minor?.75:1),Z(P.y));lb.material.depthTest=false;lb.renderOrder=9;grp.add(lb);labels.push(lb);
  });
}

/* Kết cấu xoáy cho trùng động */
function swirlTex(c1,c2){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.translate(128,128);
  const g=x.createRadialGradient(0,0,4,0,0,128);g.addColorStop(0,'#000');g.addColorStop(.25,c1);g.addColorStop(.7,c2);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,128,0,7);x.fill();
  x.globalCompositeOperation='lighter';for(let a=0;a<6;a++){x.rotate(Math.PI/3);x.beginPath();for(let r=6;r<124;r+=2){const t=r/18;x.lineTo(Math.cos(t)*r,Math.sin(t)*r)}x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=3;x.stroke()}
  x.globalCompositeOperation='source-over';x.fillStyle='#000';x.beginPath();x.arc(0,0,14,0,7);x.fill();return new THREE.CanvasTexture(c)}
function wormhole(size,c1,c2){const g=new THREE.Group();
  const disc=new THREE.Mesh(new THREE.CircleGeometry(size,48),new THREE.MeshBasicMaterial({map:swirlTex(c1,c2),transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));disc.userData.swirl=1.6;g.add(disc);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(size,size*.07,10,48),glow(c1));g.add(ring);
  const gs=glowSprite(c1.replace(/[\d.]+\)$/,'1)'),size*3.2,.5);g.add(gs);return g}
/* Vết nứt hư không: dải đen tím lởm chởm, phát sáng ở mép */
function riftTex(seed){const c=document.createElement('canvas');c.width=512;c.height=256;const x=c.getContext('2d'),r=rng(seed);
  const pts=[];for(let i=0;i<=24;i++){pts.push([20+i*19.5,128+(r()-.5)*70])}
  const draw=(w,col,blur)=>{x.save();x.shadowColor=col;x.shadowBlur=blur;x.strokeStyle=col;x.lineWidth=w;x.lineJoin='miter';x.beginPath();pts.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.stroke();x.restore()};
  draw(26,'rgba(155,90,255,.55)',40);draw(14,'rgba(200,150,255,.9)',20);draw(7,'#050008',0);
  for(let i=0;i<40;i++){const [a,b]=pts[Math.floor(r()*pts.length)];x.fillStyle='rgba(190,140,255,.8)';x.fillRect(a+(r()-.5)*60,b+(r()-.5)*60,2,2)}
  return new THREE.CanvasTexture(c)}
function build3D(){
  const host=document.getElementById('v3d');host.innerHTML='';
  // Bán kính vòng mỗi tầng: đủ rộng để các đảo (đã phóng to G lần) không chạm nhau; RM = bán kính đảo lớn nhất của tầng
  const foot=w=>(2.8+Math.min(2.6,w.places.length/8))*G*(['sun','galaxy'].includes(w.kind)?2.2:1.35);
  [1,2,3,4].forEach(t=>{const ws=S.worlds.filter(w=>w.tier===t),n=ws.length,f=ws.map(foot),mx=Math.max(...f,1);RM[t]=mx;
    TIER_R[t]=n<2?0:Math.max(TIER_R[t],(2*mx+10)/(2*Math.sin(Math.PI/n)))});
  TIER_R[3]=Math.max(TIER_R[3],1);
  const W=host.clientWidth||900,H=Math.round(Math.max(420,Math.min(980,window.innerHeight-120)));
  const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));renderer.setSize(W,H);renderer.setClearColor(0x05060f);
  host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x05060f,.0011);
  const camera=new THREE.PerspectiveCamera(48,W/H,.3,6000);
  const controls=new THREE.OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=true;controls.screenSpacePanning=true;controls.panSpeed=1.2;controls.dampingFactor=.08;controls.minDistance=1.5;controls.maxDistance=1400;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;controls.autoRotate=!reduce;controls.autoRotateSpeed=.45;
  scene.add(new THREE.HemisphereLight(0xc7d6ff,0x1a1030,.7));const sun=new THREE.DirectionalLight(0xfff1d6,.95);sun.position.set(30,60,25);scene.add(sun);
  const top=new THREE.PointLight(0xffd76e,1.2,260);top.position.set(0,90,0);scene.add(top);

  // Sao
  {const n=2500,p=new Float32Array(n*3),r=rng(9);for(let i=0;i<n;i++){const u=r()*2-1,a=r()*Math.PI*2,d=900+r()*1000,s=Math.sqrt(1-u*u);p.set([Math.cos(a)*s*d,u*d,Math.sin(a)*s*d],i*3)}
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));scene.add(new THREE.Points(g,new THREE.PointsMaterial({color:0xe8ecff,size:3,sizeAttenuation:true,fog:false})))}
  // Tinh vân
  [['rgba(91,80,220,1)',[-150,80,-230],360],['rgba(40,110,200,1)',[200,-20,-180],300],['rgba(160,60,160,1)',[30,130,280],330]].forEach(([c,p,s])=>{const n=glowSprite(c,s,.28);n.position.set(...p);n.material.fog=false;scene.add(n)});

  // Quả cầu Cửu Châu vũ trụ bao các tầng 1–3
  const shell=new THREE.Mesh(new THREE.SphereGeometry(SHELL.r,48,24),new THREE.MeshBasicMaterial({color:0x7b6cff,transparent:true,opacity:.05,side:THREE.BackSide,depthWrite:false}));shell.scale.set(1,SHELL.k,1);shell.position.y=SHELL.y;scene.add(shell);
  const shellW=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.SphereGeometry(SHELL.r,24,10)),new THREE.LineBasicMaterial({color:0x9b8cff,transparent:true,opacity:.12}));shellW.scale.copy(shell.scale);shellW.position.copy(shell.position);scene.add(shellW);
  const sl=textSprite('CỬU CHÂU VŨ TRỤ','#d9d3ff',7);sl.position.set(0,SHELL.y+SHELL.r*SHELL.k+2,0);scene.add(sl);
  // Mặt phẳng tầng
  [1,2,3,4].forEach(t=>{const ring=new THREE.Mesh(new THREE.RingGeometry(TIER_R[t]+RM[t]+2,TIER_R[t]+RM[t]+3,128),new THREE.MeshBasicMaterial({color:t===4?0xf2c76e:0x8fd6ff,transparent:true,opacity:.18,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=TIER_Y[t]-8;scene.add(ring);
    const lab=textSprite(`Tầng ${t} · ${S.tiers[t].name}`,t===4?'#f2c76e':'#8fd6ff',5);lab.position.set(-(TIER_R[t]+RM[t]+12),TIER_Y[t]-6,0);scene.add(lab)});

  // Thế giới
  const nodes={},pick=[];
  [1,2,3,4].forEach(t=>{const ws=S.worlds.filter(w=>w.tier===t).sort((a,b)=>Math.atan2(a.y-600,a.x-410)-Math.atan2(b.y-600,b.x-410));
    ws.forEach((w,i)=>{const a=-Math.PI/2+i*2*Math.PI/ws.length+(t%2?0:Math.PI/ws.length),R=2.8+Math.min(2.6,w.places.length/8);
      const grp=worldModel(w,R);grp.scale.setScalar(G);grp.position.set(Math.cos(a)*TIER_R[t],TIER_Y[t],Math.sin(a)*TIER_R[t]);Object.assign(grp.userData,{wid:w.id,R:R*G,phase:i*1.7+t});
      factions3D(grp,w,R,pick);
      grp.traverse(o=>{if(o.isMesh||o.isPoints)o.userData.wid=w.id});scene.add(grp);
      const lab=textSprite(short(w.name),t===4?'#f2c76e':'#ffffff',1.35);lab.center.set(.5,0);lab.material.depthTest=false;lab.renderOrder=10;grp.userData.title=lab;lab.position.set(0,(w.kind==='sun'?R*1.1:w.kind==='tree'?3.9:R*.55)+.6,0);grp.add(lab);
      const hit=new THREE.Mesh(new THREE.SphereGeometry(R*1.5,10,8),new THREE.MeshBasicMaterial({visible:false}));hit.userData.wid=w.id;grp.add(hit);pick.push(hit);
      nodes[w.id]=grp})});

  // Đường hầm: ống sáng + đốm năng lượng chạy dọc
  const flows=[];
  S.links.forEach(([a,b,tp])=>{const A=nodes[a],B=nodes[b];if(!A||!B)return;const pa=A.position.clone(),pb=B.position.clone();
    const mid=pa.clone().add(pb).multiplyScalar(.5);mid.y+=10+pa.distanceTo(pb)*.12;mid.add(mid.clone().setY(0).normalize().multiplyScalar(10));
    const curve=new THREE.QuadraticBezierCurve3(pa,mid,pb),c=tp==='up'?0xf2c76e:0x8fd6ff;
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve,64,.35,6),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.55})));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve,64,1.1,6),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.1,depthWrite:false})));
    for(let i=0;i<2;i++){const s=glowSprite(tp==='up'?'rgba(255,215,120,1)':'rgba(150,220,255,1)',4.5,1);scene.add(s);flows.push({s,curve,o:i/2,sp:.12+Math.random()*.06})}});

  // Trùng động ở hai đầu mỗi đường hầm
  const whs=[];
  S.links.forEach(([a,b,tp])=>{const A=nodes[a],B=nodes[b];if(!A||!B)return;const pa=A.position.clone(),pb=B.position.clone(),mid=pa.clone().add(pb).multiplyScalar(.5);mid.y+=10+pa.distanceTo(pb)*.12;mid.add(mid.clone().setY(0).normalize().multiplyScalar(10));
    const cv=new THREE.QuadraticBezierCurve3(pa,mid,pb),col=tp==='up'?['rgba(255,200,90,.95)','rgba(150,90,20,.6)']:['rgba(120,210,255,.95)','rgba(60,60,200,.6)'];
    [[A,.0],[B,1]].forEach(([N,u0])=>{let u=u0,pt;for(let s=0;s<40;s++){u=u0?u-.01:u+.01;pt=cv.getPoint(u);if(pt.distanceTo(N.position)>N.userData.R*1.25)break}
      const w=wormhole(.9+N.userData.R*.12,...col);w.position.copy(pt);w.lookAt(cv.getPoint(u0?u-.02:u+.02));scene.add(w);whs.push(w)})});
  // Trùng động lớn ở rìa vũ trụ
  [[-280,120,-150,22,['rgba(190,120,255,.95)','rgba(70,20,140,.6)']],[300,38,120,20,['rgba(120,230,255,.95)','rgba(20,80,160,.6)']],[75,270,-285,26,['rgba(255,170,120,.95)','rgba(140,40,60,.6)']]].forEach(([x,y,z,s,c],i)=>{
    const w=wormhole(s,...c);w.position.set(x,y,z);w.lookAt(0,18,0);scene.add(w);whs.push(w);const l=textSprite('Trùng động','#d9c8ff',7);l.position.set(x,y+s+7,z);scene.add(l)});
  // Hư không: vết nứt và vành đai đá vụn quanh từng tầng
  [[-240,-45,120,0],[255,150,-75,1],[-120,240,195,2],[150,-75,-240,3]].forEach(([x,y,z,i])=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:riftTex(31+i),transparent:true,depthWrite:false,opacity:.95}));s.scale.set(126,63,1);s.position.set(x,y,z);s.material.rotation=(i-1.5)*.4;scene.add(s);
    if(i===0){const l=textSprite('Hư không','#c9a6ff',7);l.position.set(x,y+36,z);scene.add(l)}});
  const belts=[];[1,2,3,4].forEach(t=>{const n=t===2?420:220,geo=new THREE.DodecahedronGeometry(.6,0),im=new THREE.InstancedMesh(geo,mat('#6d6680'),n),d=new THREE.Object3D(),r=rng(70+t);
    for(let i=0;i<n;i++){const a=r()*Math.PI*2,rad=TIER_R[t]+RM[t]+6+r()*12,s=.3+r()*1.1;d.position.set(Math.cos(a)*rad,TIER_Y[t]-6+(r()-.5)*6,Math.sin(a)*rad);d.rotation.set(r()*6,r()*6,r()*6);d.scale.setScalar(s);d.updateMatrix();im.setMatrixAt(i,d.matrix)}
    const bg=new THREE.Group();bg.add(im);bg.userData.spin=.04+t*.01;scene.add(bg);belts.push(bg)});

  // Vòng chọn
  const sel=new THREE.Mesh(new THREE.TorusGeometry(1,.025,6,64),glow('#f2c76e',{transparent:true,opacity:.6}));sel.rotation.x=Math.PI/2;sel.visible=false;scene.add(sel);

  // Dấu tâm xoay hiện tại
  const piv=new THREE.Group();piv.add(new THREE.Mesh(new THREE.SphereGeometry(.35,16,12),glow('#ffffff')));piv.renderOrder=11;const pr=new THREE.Mesh(new THREE.RingGeometry(1.1,1.3,48),glow('#f2c76e',{transparent:true,opacity:.8,side:THREE.DoubleSide}));pr.rotation.x=-Math.PI/2;piv.add(pr);piv.add(glowSprite('rgba(255,230,160,1)',3,.7));scene.add(piv);
  Object.assign(V3D,{renderer,scene,camera,controls,nodes,pick,flows,sel,W,H,piv,whs,belts,ready:true});
  resetView();
  // Bấm chọn (phân biệt với kéo xoay)
  const ray=new THREE.Raycaster(),mv=new THREE.Vector2();let down=null;
  renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY]});
  renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;
    const r=renderer.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,camera);
    const hs=ray.intersectObjects(pick,false),h=hs.find(x=>x.object.userData.pi!==undefined)||hs[0];if(!h)return;const u=h.object.userData;
    if(u.pi!==undefined){const far=V3D.selWid!==u.wid;select3D(u.wid,far);placePanel3D(u.wid,u.pi)}else select3D(u.wid,true)});
  renderer.domElement.addEventListener('pointermove',e=>{const r=renderer.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,camera);
    const hs=ray.intersectObjects(pick,false),h=hs.find(x=>x.object.userData.pi!==undefined&&V3D.selWid===x.object.userData.wid)||hs[0],tip=document.getElementById('v3dTip');renderer.domElement.style.cursor=h?'pointer':'grab';
    if(h&&e.pointerType==='mouse'){const w=byId[h.object.userData.wid],pi=h.object.userData.pi,top=[...w.places].sort((a,b)=>b.s-a.s)[0];
      tip.innerHTML=pi!==undefined?`<b>${esc(w.places[pi].n)}</b><span>${PTYPE[w.places[pi].t].name} · quy mô ${w.places[pi].s}/5</span>`:`<b>${esc(w.name)}</b><span>Tầng ${w.tier} · ${w.places.length} địa danh${top?` · mạnh nhất: ${esc(top.n)}`:''}</span>`;
      tip.style.left=(e.clientX-r.left+14)+'px';tip.style.top=(e.clientY-r.top+14)+'px';tip.hidden=false}else tip.hidden=true});
  // Nhấp đúp: đặt tâm xoay tại điểm được bấm (đảo, thế lực, hoặc mặt phẳng tầng gần nhất)
  renderer.domElement.addEventListener('dblclick',e=>{const r=renderer.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,camera);
    let p=null;const hs=ray.intersectObjects(pick,false);if(hs.length)p=hs[0].point;
    else{let best=null;[1,2,3,4].forEach(t=>{const pl=new THREE.Plane(new THREE.Vector3(0,1,0),-TIER_Y[t]),q=new THREE.Vector3();if(ray.ray.intersectPlane(pl,q)){const d=q.distanceTo(camera.position);if(!best||d<best.d)best={q,d}}});if(best)p=best.q}
    if(p)setPivot(p,true)});
  renderer.domElement.addEventListener('pointerleave',()=>{document.getElementById('v3dTip').hidden=true});
  window.addEventListener('resize',resize3D);
}
function resize3D(){if(!V3D.ready)return;const host=document.getElementById('v3d');const W=host.clientWidth;if(!W)return;V3D.H=document.fullscreenElement?window.innerHeight:Math.round(Math.max(420,Math.min(980,window.innerHeight-120)));V3D.camera.aspect=W/V3D.H;V3D.camera.updateProjectionMatrix();V3D.renderer.setSize(W,V3D.H)}
let fly=null;
function flyTo(pos,target,ms=1100){V3D.arc=null;fly={p0:V3D.camera.position.clone(),t0:V3D.controls.target.clone(),p1:pos,t1:target,start:performance.now(),ms}}
function setPivot(p,keep){const off=V3D.camera.position.clone().sub(V3D.controls.target);flyTo(keep?p.clone().add(off):V3D.camera.position.clone(),p.clone(),700);V3D.controls.autoRotate=false;const b=document.getElementById('v3dRot');if(b)b.setAttribute('aria-pressed','false');
  document.querySelectorAll('[data-pivot]').forEach(x=>x.setAttribute('aria-pressed','false'))}
function pivotTier(t){const k=Math.max(1,1.35/V3D.camera.aspect);V3D.selWid=null;open2DBtn(null);V3D.sel.visible=false;
  if(t==='all'){flyTo(new THREE.Vector3(0,93*k,225*k),new THREE.Vector3(0,78,0))}
  else{const y=TIER_Y[t],r=TIER_R[t]+RM[t];flyTo(new THREE.Vector3(0,y+r*.8*k,r*1.5*k),new THREE.Vector3(0,y,0))}
  document.querySelectorAll('[data-pivot]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.pivot===String(t)))}
function resetView(){V3D.selWid=null;open2DBtn(null);const k=Math.max(1,1.35/V3D.camera.aspect);V3D.camera.position.set(0,93*k,225*k);V3D.controls.target.set(0,78,0);V3D.sel.visible=false;fly=null;panel3D(null)}
function open2DBtn(wid){const b=document.getElementById('v3dOpen2d');if(!b)return;b.hidden=!wid;if(wid){b.dataset.wid=wid;b.querySelector('b').textContent=short(byId[wid].name)}}
function select3D(wid,zoom){
  V3D.selWid=wid;open2DBtn(wid);
  const g=V3D.nodes[wid];if(!g)return;const R=g.userData.R;
  V3D.sel.visible=true;V3D.sel.scale.setScalar(R*1.35);V3D.sel.position.copy(g.position).add(new THREE.Vector3(0,-.3,0));
  if(zoom){const dir=g.position.clone().setY(0).normalize();if(!dir.lengthSq())dir.set(0,0,1);const sp=byId[wid].kind==='sun'||byId[wid].kind==='galaxy'?1.45:1;flyTo(g.position.clone().add(dir.multiplyScalar((R*1.05+1.5)*sp)).add(new THREE.Vector3(0,(R*2.45+3)*sp,0)),g.position.clone().add(new THREE.Vector3(0,.3,0)));V3D.controls.autoRotate=false;document.getElementById('v3dRot').setAttribute('aria-pressed','false')}
  panel3D(wid);
}
function placePanel3D(wid,pi){
  const w=byId[wid],p=w.places[pi],T=PTYPE[p.t];
  setPanel3D(esc(p.n),`<span class="eyebrow" style="color:${T.c}">${T.name} · ${esc(short(w.name))}</span><h2 class="pname">${esc(p.n)}</h2>
    <div class="pb" style="height:8px"><i style="width:${p.s*20}%;background:${T.c}"></i></div><p class="meta">Quy mô ${p.s}/5${p.in?` · thuộc ${esc(p.in)}`:''}</p>
    <p>${esc(p.d)}</p><div class="refs">${p.ch.map(chLink).join('')}</div>
    <div class="actions"><button type="button" class="btn" data-v3dw="${wid}">← ${esc(short(w.name))}</button><a class="btn primary" href="#${S.id}--${wid}">Bản đồ vùng →</a></div>`);
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-v3dw]');if(b)panel3D(b.dataset.v3dw)});
/* Khung bên phải: có nút thu gọn (nhớ lựa chọn trên máy này) */
const fold3D=()=>{try{return localStorage.getItem('v3dFold')==='1'}catch(e){return false}};
function setPanel3D(title,html){const p=document.getElementById('v3dPanel'),f=fold3D();p.classList.toggle('folded',f);
  p.innerHTML=`<button type="button" class="v3d-fold" data-v3dfold aria-expanded="${!f}"><span>${title}</span><i aria-hidden="true">${f?'▸ Mở':'▾ Thu gọn'}</i></button><div class="v3d-pbody">${html}</div>`;
  p.querySelectorAll('svg[data-t]').forEach(s=>ICON[s.dataset.t](s,PTYPE[s.dataset.t].c))}
/* Tổng quan: các thế giới theo tầng (bấm để bay tới) + các cảnh giới (bấm để làm nổi những thế giới có cảnh giới đó) */
function panel3D(wid){
  if(!wid){const R=V3D.realm,ri=R?RIDX[R]:-1,has=w=>{const[a,b]=rangeOf(w);return ri>=a&&ri<=b};
    const worlds=[4,3,2,1].map(t=>`<div class="v3d-tier"><h4><i style="background:${t===4?'#f2c76e':'#8fd6ff'}"></i>Tầng ${t} · ${esc(S.tiers[t].name)}</h4><div class="v3d-wl">${
      S.worlds.filter(w=>w.tier===t).map(w=>{const[a,b]=rangeOf(w),g=GBY[REALMS[b].g];return `<button type="button" class="wchip${R&&!has(w)?' dim':''}${R&&has(w)?' hit':''}" data-v3dgo="${w.id}" style="--c:${g.c}" title="${esc(REALMS[a].name)} → ${esc(REALMS[b].name)}"><b>${esc(short(w.name))}</b><span>${esc(REALMS[a].name)} → ${esc(REALMS[b].name)}</span></button>`}).join('')}</div></div>`).join('');
    const realms=GROUPS.map(g=>{const rs=REALMS.map((r,i)=>({r,i})).filter(x=>x.r.g===g.id);if(!rs.length)return'';const open=rs.some(x=>x.r.id===R);
      return `<details class="v3d-rg"${open?' open':''}><summary><i style="background:${g.c}"></i>${esc(g.name)}<b>${rs.length}</b></summary><div class="v3d-rl">${
        rs.map(({r,i})=>`<button type="button" class="rchip" data-v3drealm="${r.id}" aria-pressed="${r.id===R}" style="--c:${g.c}"><span>${i+1}</span>${esc(r.name)}</button>`).join('')}</div></details>`}).join('');
    const nHit=R?S.worlds.filter(has).length:0;
    setPanel3D('Thế giới & cảnh giới',`<p class="meta">Bấm thế giới để bay tới. Bấm cảnh giới để xem những thế giới có cảnh giới đó.</p>
      <section class="v3d-sec"><h3>Thế giới <span class="meta">${S.worlds.length}</span></h3>${worlds}</section>
      <section class="v3d-sec"><h3>Cảnh giới <span class="meta">${REALMS.length} bậc</span></h3>${R?`<p class="v3d-hit">${esc(REALMS[ri].name)}: có ở ${nHit} thế giới <button type="button" class="linkish" data-v3drealm="">Bỏ chọn</button></p>`:''}${realms}</section>`);
    // Làm mờ tên các đảo không có cảnh giới đang chọn
    if(V3D.ready)Object.values(V3D.nodes).forEach(g=>{const t=g.userData.title;if(t)t.material.opacity=!R||has(byId[g.userData.wid])?1:.22});return}
  const w=byId[wid],[a,b]=rangeOf(w),tops=[...w.places].sort((x,y)=>y.s-x.s).slice(0,4);
  const ladder=REALMS.slice(a,b+1).map((r,k)=>({r,i:a+k})).reverse();
  setPanel3D('Cảnh giới · '+esc(short(w.name)),`<div class="v3d-ladder"><span class="rb-range">${esc(REALMS[a].name)} → ${esc(REALMS[b].name)} · ${b-a+1} bậc</span>
    <ol>${ladder.map(({r,i},k)=>`<li style="--c:${GBY[r.g].c}"><i></i><span class="n">${esc(r.name)}</span><span class="g">${esc(GBY[r.g].name)}</span><b>${i+1}</b></li>`).join('')}</ol></div>
    <span class="eyebrow">Tầng ${w.tier} · ${esc(S.tiers[w.tier].name)}</span><h2 class="pname">${esc(w.name)}</h2>
    <div class="tiles"><div class="tile"><b>${w.places.length}</b><span>địa danh</span></div><div class="tile"><b>${b-a+1}</b><span>bậc cảnh giới</span></div></div>

    ${tops.length?`<div class="power">${tops.map(x=>`<div class="pw"><svg viewBox="-16 -18 32 32" data-t="${x.t}" aria-hidden="true"></svg><span class="pn">${esc(x.n)}</span><span class="pb"><i style="width:${x.s*20}%;background:${PTYPE[x.t].c}"></i></span></div>`).join('')}</div>`:''}
    <div class="actions"><button type="button" class="btn" data-v3dall>← Tất cả</button><a class="btn" href="#${S.id}--${wid}">Trang thế giới →</a></div>`);
}
document.addEventListener('click',e=>{
  if(e.target.closest('[data-v3dfold]')){const f=!fold3D();try{localStorage.setItem('v3dFold',f?'1':'0')}catch(x){}const p=document.getElementById('v3dPanel'),b=p.querySelector('.v3d-fold');
    p.classList.toggle('folded',f);b.setAttribute('aria-expanded',!f);b.querySelector('i').textContent=f?'▸ Mở':'▾ Thu gọn';return}
  const go=e.target.closest('[data-v3dgo]');if(go&&V3D.ready){select3D(go.dataset.v3dgo,true);return}
  const rb=e.target.closest('[data-v3drealm]');if(rb){V3D.realm=rb.dataset.v3drealm&&rb.dataset.v3drealm!==V3D.realm?rb.dataset.v3drealm:null;panel3D(null);return}
  if(e.target.closest('[data-v3dall]')&&V3D.ready){pivotTier('all');panel3D(null)}});
function loop(t){
  if(!V3D.run)return;requestAnimationFrame(loop);
  const s=t/1000;
  if(V3D.arc){const A=V3D.arc,k=Math.min(1,(t-A.start)/A.ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,sp=new THREE.Spherical(A.s0.radius,A.s0.phi+A.dph*e,A.s0.theta+A.dth*e);
    V3D.camera.position.copy(new THREE.Vector3().setFromSpherical(sp).add(A.t));if(k>=1)V3D.arc=null}
  if(fly){const k=Math.min(1,(t-fly.start)/fly.ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;V3D.camera.position.lerpVectors(fly.p0,fly.p1,e);V3D.controls.target.lerpVectors(fly.t0,fly.t1,e);if(k>=1)fly=null}
  Object.values(V3D.nodes).forEach(g=>{g.position.y=TIER_Y[byId[g.userData.wid].tier]+Math.sin(s*.8+g.userData.phase)*.6;g.traverse(o=>{if(o.userData.spin)o.rotation.y+=o.userData.spin*.01})});
  if(V3D.sel.visible){V3D.sel.rotation.z+=.01}
  V3D.piv.position.copy(V3D.controls.target);V3D.piv.scale.setScalar(Math.max(.6,V3D.camera.position.distanceTo(V3D.controls.target)/40));
  Object.values(V3D.nodes).forEach(g=>{const L=g.userData.labels;if(!L)return;const near=V3D.selWid?V3D.selWid===g.userData.wid:V3D.camera.position.distanceTo(g.position)<g.userData.R*3;
    // 3D chỉ hiện tên đại lục; tên khu vực xem trong bản đồ vùng (nút "Xem toàn cảnh")
    if(g.userData.lv!==-1){g.userData.lv=-1;L.forEach(l=>{l.visible=false})}
    if(g.userData.title)g.userData.title.visible=true;
    const D=g.userData.decor||(g.children[0]&&g.children[0].userData.decor);if(D){const show=V3D.selWid!==g.userData.wid;if(g.userData.dv!==show){g.userData.dv=show;D.forEach(d=>{d.visible=show})}}});
  V3D.flows.forEach(f=>{const u=(s*f.sp+f.o)%1;f.s.position.copy(f.curve.getPoint(u))});
  V3D.whs.forEach(w=>{w.children[0].rotation.z-=.02});V3D.belts.forEach(b=>{b.rotation.y+=b.userData.spin*.01});
  if(!V3D.smokes){V3D.smokes=[];V3D.scene.traverse(o=>{if(o.userData.smoke)V3D.smokes.push(o)})}
  V3D.smokes.forEach(o=>{const m=o.userData.smoke;const u=(s*m.sp+m.ph)%1;o.position.y=m.base+(m.top-m.base)*u;o.material.opacity=.5*(1-u);o.scale.setScalar(.6+u*1.6)});
  V3D.controls.update();V3D.renderer.render(V3D.scene,V3D.camera);
}
async function render3D(){
  setBar([['Thư viện','#thu-vien'],[S.title,'#'+S.id],['Vũ trụ 3D']],[['Bản đồ 2D','#'+S.id]]);
  const msg=document.getElementById('v3dMsg');msg.hidden=false;msg.textContent='Đang dựng vũ trụ 3D…';
  try{await ensureThree();if(!V3D.ready)build3D();else resize3D();msg.hidden=true;V3D.run=true;requestAnimationFrame(loop);
    if(window.pend3D){const w=window.pend3D;window.pend3D=null;setTimeout(()=>select3D(w,true),150)}}
  catch(e){msg.textContent='Không mở được chế độ 3D trên thiết bị này (cần WebGL). Bạn vẫn xem được bản đồ 2D.';console.warn(e)}
}
function stop3D(){V3D.run=false;close2D()}
document.addEventListener('click',e=>{const pv=e.target.closest('[data-pivot]');if(pv&&V3D.ready){pivotTier(pv.dataset.pivot==='all'?'all':+pv.dataset.pivot);return}
  const b=e.target.closest('[data-v3d]');if(!b||!V3D.ready)return;const k=b.dataset.v3d;
  if(k==='rot'){V3D.controls.autoRotate=!V3D.controls.autoRotate;b.setAttribute('aria-pressed',V3D.controls.autoRotate)}
  else if(k==='reset')resetView();
  else if(k==='full'){const wrap=document.querySelector('.v3d-wrap');if(document.fullscreenElement)document.exitFullscreen();else if(wrap.requestFullscreen)wrap.requestFullscreen().catch(()=>{})}
  else if(k==='top')flyTo(new THREE.Vector3(0,630,.1),new THREE.Vector3(0,60,0));
  else if(k==='side')flyTo(new THREE.Vector3(0,93,450),new THREE.Vector3(0,93,0));});

/* ===== Màn 2D phóng to: bấm một thế giới trong 3D → bay tới rồi mở bản đồ vùng toàn màn hình, phóng/kéo tự do ===== */
const V2={wid:null,vb:null,timer:null};
function open2D(wid){
  const w=byId[wid];if(!w)return;V2.wid=wid;clearTimeout(V2.timer);if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});
  const ov=document.getElementById('v2d'),svg=document.getElementById('scene2d');ov.hidden=false;
  document.getElementById('v2dName').textContent=w.name;document.getElementById('v2dFull').href=`#${S.id}--${wid}`;
  renderRegion(w,{svg,sfx:'2d',onPick:i=>card2D(i),onPortal:n=>{close2D();select3D(n,true);V2.timer=setTimeout(()=>open2D(n),1150)}});
  renderRealmBadge(w,document.getElementById('v2dBadge'));
  document.getElementById('v2dCard').hidden=true;fit2D();
  ov.querySelector('[data-v2d="close"]').focus({preventScroll:true});
}
function close2D(){clearTimeout(V2.timer);const ov=document.getElementById('v2d');if(ov)ov.hidden=true;V2.wid=null}
function card2D(i){
  const w=byId[V2.wid],p=w&&w.places[i];if(!p)return;const T=PTYPE[p.t],c=document.getElementById('v2dCard');
  document.querySelectorAll('#scene2d .place').forEach(n=>n.classList.toggle('sel',Number(n.dataset.pi)===i));
  c.innerHTML=`<button type="button" class="btn x" data-v2d="card" aria-label="Đóng">✕</button><span class="eyebrow" style="color:${T.c}">${T.name}</span><h3 class="pname">${esc(p.n)}</h3>
    <div class="pb" style="height:8px"><i style="width:${p.s*20}%;background:${T.c}"></i></div><p class="meta">Quy mô ${p.s}/5${p.in?` · thuộc ${esc(p.in)}`:''}</p><p>${esc(p.d)}</p><div class="refs">${p.ch.map(chLink).join('')}</div>`;
  c.hidden=false;
}
/* Phóng/kéo dùng chung bộ điều khiển với bản đồ vùng (js/thu-phong.js) */
const V2Z=()=>V2.z||(V2.z=attachZoom(document.getElementById('v2dStage'),document.getElementById('scene2d')));
function fit2D(){V2Z().fit()}
function zoom2D(k,px,py){V2Z().zoom(k,px,py)}
(function(){
  document.addEventListener('click',e=>{const b=e.target.closest('[data-v2d]');if(!b)return;const k=b.dataset.v2d;
    if(k==='close')close2D();else if(k==='fit')fit2D();else if(k==='in')zoom2D(.7);else if(k==='out')zoom2D(1/.7);
    else if(k==='card'){document.getElementById('v2dCard').hidden=true;document.querySelectorAll('#scene2d .place.sel').forEach(n=>n.classList.remove('sel'))}
    else if(k==='open'&&b.dataset.wid)open2D(b.dataset.wid)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&V2.wid)close2D()});
})();

document.addEventListener('fullscreenchange',()=>{setTimeout(resize3D,50);const b=document.querySelector('[data-v3d="full"]');if(b)b.textContent=document.fullscreenElement?'Thoát toàn màn hình':'Toàn màn hình'});

/* Xoay góc nhìn quanh tâm xoay hiện tại: dAz quanh trục đứng, dPol nghiêng lên/xuống; az/pol đặt hướng tuyệt đối */
function orbit3D(dAz,dPol,abs){if(!V3D.ready)return;const c=V3D.camera,t=V3D.controls.target.clone(),sp=new THREE.Spherical().setFromVector3(c.position.clone().sub(t));
  if(abs){if(abs.theta!==undefined)sp.theta=abs.theta;if(abs.phi!==undefined)sp.phi=abs.phi}
  sp.theta+=dAz||0;sp.phi=Math.min(Math.PI-.06,Math.max(.06,sp.phi+(dPol||0)));
  // Bay theo cung tròn (không cắt ngang qua tâm)
  const s0=new THREE.Spherical().setFromVector3(c.position.clone().sub(t)),start=performance.now(),ms=650;fly=null;
  V3D.controls.autoRotate=false;const rb=document.getElementById('v3dRot');if(rb)rb.setAttribute('aria-pressed','false');
  let dth=sp.theta-s0.theta;dth=Math.atan2(Math.sin(dth),Math.cos(dth));
  V3D.arc={s0,dth,dph:sp.phi-s0.phi,t,start,ms}}
const ORB={left:[-Math.PI/4,0],right:[Math.PI/4,0],up:[0,-Math.PI/9],down:[0,Math.PI/9]};
document.addEventListener('click',e=>{const b=e.target.closest('[data-orb]');if(!b)return;const k=b.dataset.orb;
  if(ORB[k])orbit3D(...ORB[k]);else if(k==='below')orbit3D(0,0,{phi:Math.PI-.35});
  else{const th={S:0,E:Math.PI/2,N:Math.PI,W:-Math.PI/2}[k];orbit3D(0,0,{theta:th,phi:Math.PI/3})}});
document.addEventListener('keydown',e=>{if(!V3D.run||document.getElementById('v3dView').hidden||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||(V2&&V2.wid))return;
  const m={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'}[e.key];if(m){e.preventDefault();orbit3D(...ORB[m])}});
