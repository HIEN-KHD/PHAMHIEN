/* ===== Vũ trụ 3D: các thế giới xếp theo tầng, xoay mọi góc =====
   Dùng Three.js r128 + OrbitControls. Tải từ CDN khi mở màn này; nếu không có mạng thì dùng bản trong js/vendor/. */
const V3D={ready:false,run:false};
const TIER_Y={1:0,2:7,3:14,4:24},TIER_R={1:5,2:16,3:10,4:13};
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

/* Một hòn đảo: mặt đất lồi lõm + khối đá nhọn phía dưới */
function islandMesh(R,top,seed){
  const g=new THREE.Group(),rnd=rng(seed);
  const geo=new THREE.CylinderGeometry(R,R*.93,.7,30,2);const p=geo.attributes.position;
  for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),y=p.getY(i),d=Math.hypot(x,z);if(d>R*.5){const f=1+(rnd()-.5)*.16;p.setX(i,x*f);p.setZ(i,z*f)}if(y>0)p.setY(i,y+(rnd()-.5)*.12)}
  geo.computeVertexNormals();g.add(new THREE.Mesh(geo,mat(top)));
  const rock=new THREE.ConeGeometry(R*.92,R*1.9,10,3);const q=rock.attributes.position;
  for(let i=0;i<q.count;i++){q.setX(i,q.getX(i)*(1+(rnd()-.5)*.25));q.setZ(i,q.getZ(i)*(1+(rnd()-.5)*.25))}rock.computeVertexNormals();
  const rm=new THREE.Mesh(rock,mat('#4a4566'));rm.rotation.x=Math.PI;rm.position.y=-R*.95-.3;g.add(rm);
  return g;
}
const cone=(r,h,c,o)=>new THREE.Mesh(new THREE.ConeGeometry(r,h,6),mat(c,o));
function scatter(g,R,n,seed,fn){const r=rng(seed);for(let i=0;i<n;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*R*.8;fn(g,Math.cos(a)*d,Math.sin(a)*d,r)}}
function mountains(g,R,n,c,seed){scatter(g,R,n,seed,(g,x,z,r)=>{const h=.8+r()*1.4,m=cone(.35+r()*.4,h,c);m.position.set(x,.35+h/2,z);g.add(m);
  if(h>1.4){const s=cone(.18,h*.3,'#f4f6ff');s.position.set(x,.35+h*.86,z);g.add(s)}})}
function trees(g,R,n,c,seed){scatter(g,R,n,seed,(g,x,z,r)=>{const t=cone(.14,.5,c);t.position.set(x,.6,z);g.add(t)})}
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
  const isl=islandMesh(R,MODE[k]==='sea'?'#2f7fd0':base,sd);g.add(isl);
  if(k==='start'){mountains(g,R,6,'#5aa64f',sd);trees(g,R,22,'#2f7d3a',sd+1);castle(g,R*.3,R*.15,1.1)}
  else if(k==='isles'||k==='sea'){scatter(g,R,k==='isles'?7:2,sd,(g,x,z,r)=>{const s=new THREE.Mesh(new THREE.CylinderGeometry(.4+r()*.5,.6,.3,10),mat('#5fbf5a'));s.position.set(x,.45,z);g.add(s);trees(s,.5,3,'#2f7d3a',sd+3)});
    if(k==='sea'){const rk=cone(.6,1.6,'#7d8496');rk.position.set(R*.3,1.1,0);g.add(rk)}
    const sail=new THREE.Mesh(new THREE.ConeGeometry(.25,.6,3),mat('#f3efe2'));sail.position.set(-R*.4,.8,R*.2);g.add(sail)}
  else if(k==='nine'){isl.visible=false;for(let r=0;r<3;r++)for(let c=0;c<3;c++){const s=islandMesh(R*.28,c===1&&r===1?'#a6e36a':'#6cc85a',sd+r*3+c);s.position.set((c-1)*R*.75,(r+c)%2*.3,(r-1)*R*.75);g.add(s);trees(s,R*.25,4,'#2f7d3a',sd+r+c)}}
  else if(k==='dragon'){mountains(g,R,8,'#1fae84',sd);trees(g,R,14,'#16805f',sd+2);
    const pts=[];for(let i=0;i<=40;i++){const t=i/40;pts.push(new THREE.Vector3((t-.5)*R*1.8,1.6+Math.sin(t*Math.PI*3)*.8,Math.cos(t*Math.PI*2)*R*.4))}
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),60,.16,8),mat('#f2c76e',{emissive:hex('#b07a10'),emissiveIntensity:.6,metalness:.6,roughness:.3})))}
  else if(k==='tree'){trees(g,R,10,'#7fb79a',sd);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.18,.28,2.2,8),mat('#8a6a4a'));tr.position.y=1.4;g.add(tr);
    [[0,2.9,1.1],[.6,2.5,.8],[-.6,2.5,.8]].forEach(([x,y,s])=>{const c=new THREE.Mesh(new THREE.SphereGeometry(s,14,10),mat('#e6fff4',{emissive:hex('#bfffe6'),emissiveIntensity:.5,flatShading:false}));c.position.set(x,y,0);g.add(c)});g.add(at(glowSprite('rgba(220,255,240,1)',5,.5),0,2.8,0))}
  else if(k==='gate'){mountains(g,R,7,'#9fa4bd',sd);const a=new THREE.Mesh(new THREE.TorusGeometry(.9,.12,8,24,Math.PI),mat('#f2c76e',{emissive:hex('#b07a10'),emissiveIntensity:.7,metalness:.6}));a.position.y=.4;g.add(a)}
  else if(k==='demon'||k==='sin'){scatter(g,R,k==='demon'?12:9,sd,(g,x,z,r)=>{const h=.8+r()*1.8,s=cone(.18+r()*.15,h,k==='demon'?'#130b10':'#e0435c',k==='sin'?{emissive:hex('#7a1020'),emissiveIntensity:.5}:{});s.position.set(x,.35+h/2,z);g.add(s)});
    if(k==='demon'){const m=new THREE.Mesh(new THREE.SphereGeometry(.7,20,14),glow('#e0393c'));m.position.set(R*.6,4,-R*.3);g.add(m);const gs=glowSprite('rgba(255,60,60,1)',4,.6);gs.position.copy(m.position);g.add(gs)}}
  else if(k==='nether'){for(let i=0;i<3;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(R*(.4+i*.2),.05,6,40),glow('#c8b6ff',{transparent:true,opacity:.8}));t.rotation.x=Math.PI/2;t.position.y=.6+i*.5;t.userData.spin=.3+i*.2;g.add(t)}g.add(at(glowSprite('rgba(155,123,255,1)',R*2.6,.5),0,1,0))}
  else if(k==='waste'){trees(g,R,4,'#5b3d22',sd);const t=new THREE.Mesh(new THREE.CylinderGeometry(.08,.14,1.6,6),mat('#5b3d22'));t.position.y=1.1;t.rotation.z=.2;g.add(t);mountains(g,R,4,'#7e5a33',sd+5)}
  else if(k==='ruins'){scatter(g,R,8,sd,(g,x,z,r)=>{const h=.5+r()*1.4,c=new THREE.Mesh(new THREE.CylinderGeometry(.14,.16,h,8),mat('#c9ccd8'));c.position.set(x,.35+h/2,z);g.add(c)});
    g.add(at(glowSprite('rgba(230,235,255,1)',R*2.5,.25),0,.8,0))}
  return g;
}

/* Cột sáng các thế lực mạnh nhất trên mặt đảo: cột cao/dày theo quy mô, màu theo loại */
function beacons(grp,w,R){
  const k=w.kind;if(k==='sun'||k==='galaxy')return;
  const tops=[...w.places].sort((a,b)=>b.s-a.s).slice(0,5),baseY=k==='heaven'?1.7:k==='nine'?.7:.4,rad=k==='abyss'?R*1.08:R*.58;
  tops.forEach((p,i)=>{const a=i/tops.length*Math.PI*2+.4,x=Math.cos(a)*rad,z=Math.sin(a)*rad,h=.5+p.s*.5,c=PTYPE[p.t].c;
    const col=new THREE.Mesh(new THREE.CylinderGeometry(.06+p.s*.018,.09+p.s*.02,h,8),mat(c,{emissive:hex(c),emissiveIntensity:.55,flatShading:false}));col.position.set(x,baseY+h/2,z);grp.add(col);
    const orb=new THREE.Mesh(new THREE.SphereGeometry(.12+p.s*.03,12,10),glow(c));orb.position.set(x,baseY+h+.12,z);grp.add(orb);
    if(p.s>=4){const gsp=glowSprite('rgba(255,215,120,1)',.9+p.s*.2,.7);gsp.position.copy(orb.position);grp.add(gsp)}});
}

function build3D(){
  const host=document.getElementById('v3d');host.innerHTML='';
  const W=host.clientWidth||900,H=Math.round(Math.max(420,Math.min(700,window.innerHeight*.72)));
  const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));renderer.setSize(W,H);renderer.setClearColor(0x05060f);
  host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x05060f,.009);
  const camera=new THREE.PerspectiveCamera(48,W/H,.1,1200);
  const controls=new THREE.OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.08;controls.minDistance=6;controls.maxDistance=150;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;controls.autoRotate=!reduce;controls.autoRotateSpeed=.45;
  scene.add(new THREE.HemisphereLight(0xc7d6ff,0x1a1030,.85));const sun=new THREE.DirectionalLight(0xfff1d6,1.1);sun.position.set(30,60,25);scene.add(sun);
  const top=new THREE.PointLight(0xffd76e,1.2,90);top.position.set(0,30,0);scene.add(top);

  // Sao
  {const n=2500,p=new Float32Array(n*3),r=rng(9);for(let i=0;i<n;i++){const u=r()*2-1,a=r()*Math.PI*2,d=180+r()*300,s=Math.sqrt(1-u*u);p.set([Math.cos(a)*s*d,u*d,Math.sin(a)*s*d],i*3)}
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));scene.add(new THREE.Points(g,new THREE.PointsMaterial({color:0xe8ecff,size:1.4,sizeAttenuation:true,fog:false})))}
  // Tinh vân
  [['rgba(91,80,220,1)',[-60,30,-90],140],['rgba(40,110,200,1)',[80,-10,-70],120],['rgba(160,60,160,1)',[10,50,110],130]].forEach(([c,p,s])=>{const n=glowSprite(c,s,.28);n.position.set(...p);n.material.fog=false;scene.add(n)});

  // Quả cầu Cửu Châu vũ trụ bao các tầng 1–3
  const shell=new THREE.Mesh(new THREE.SphereGeometry(24,48,24),new THREE.MeshBasicMaterial({color:0x7b6cff,transparent:true,opacity:.05,side:THREE.BackSide,depthWrite:false}));shell.scale.set(1,.62,1);shell.position.y=7;scene.add(shell);
  const shellW=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.SphereGeometry(24,24,10)),new THREE.LineBasicMaterial({color:0x9b8cff,transparent:true,opacity:.12}));shellW.scale.copy(shell.scale);shellW.position.copy(shell.position);scene.add(shellW);
  const sl=textSprite('CỬU CHÂU VŨ TRỤ','#d9d3ff',1.6);sl.position.set(0,7+24*.62+1.2,0);scene.add(sl);
  // Mặt phẳng tầng
  [1,2,3,4].forEach(t=>{const ring=new THREE.Mesh(new THREE.RingGeometry(TIER_R[t]+2.8,TIER_R[t]+3,64),new THREE.MeshBasicMaterial({color:t===4?0xf2c76e:0x8fd6ff,transparent:true,opacity:.18,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=TIER_Y[t]-1.5;scene.add(ring);
    const lab=textSprite(`Tầng ${t} · ${S.tiers[t].name}`,t===4?'#f2c76e':'#8fd6ff',.9);lab.position.set(-(TIER_R[t]+5),TIER_Y[t]-1.2,0);scene.add(lab)});

  // Thế giới
  const nodes={},pick=[];
  [1,2,3,4].forEach(t=>{const ws=S.worlds.filter(w=>w.tier===t).sort((a,b)=>Math.atan2(a.y-600,a.x-410)-Math.atan2(b.y-600,b.x-410));
    ws.forEach((w,i)=>{const a=-Math.PI/2+i*2*Math.PI/ws.length+(t%2?0:Math.PI/ws.length),R=1.5+Math.min(1.4,w.places.length/14);
      const grp=worldModel(w,R);grp.position.set(Math.cos(a)*TIER_R[t],TIER_Y[t],Math.sin(a)*TIER_R[t]);grp.userData={wid:w.id,R,phase:i*1.7+t};
      beacons(grp,w,R);
      grp.traverse(o=>{if(o.isMesh||o.isPoints)o.userData.wid=w.id});scene.add(grp);
      const lab=textSprite(short(w.name),t===4?'#f2c76e':'#ffffff',1);lab.center.set(.5,0);lab.material.depthTest=false;lab.renderOrder=10;lab.position.set(0,(w.kind==='sun'?R*1.1:w.kind==='tree'?3.9:R*.55)+.6,0);grp.add(lab);
      const hit=new THREE.Mesh(new THREE.SphereGeometry(R*1.5,10,8),new THREE.MeshBasicMaterial({visible:false}));hit.userData.wid=w.id;grp.add(hit);pick.push(hit);
      nodes[w.id]=grp})});

  // Đường hầm: ống sáng + đốm năng lượng chạy dọc
  const flows=[];
  S.links.forEach(([a,b,tp])=>{const A=nodes[a],B=nodes[b];if(!A||!B)return;const pa=A.position.clone(),pb=B.position.clone();
    const mid=pa.clone().add(pb).multiplyScalar(.5);mid.y+=2.5+pa.distanceTo(pb)*.12;mid.add(mid.clone().setY(0).normalize().multiplyScalar(2));
    const curve=new THREE.QuadraticBezierCurve3(pa,mid,pb),c=tp==='up'?0xf2c76e:0x8fd6ff;
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve,48,.07,6),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.55})));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve,48,.22,6),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.1,depthWrite:false})));
    for(let i=0;i<2;i++){const s=glowSprite(tp==='up'?'rgba(255,215,120,1)':'rgba(150,220,255,1)',.9,1);scene.add(s);flows.push({s,curve,o:i/2,sp:.12+Math.random()*.06})}});

  // Vòng chọn
  const sel=new THREE.Mesh(new THREE.TorusGeometry(1,.06,8,48),glow('#f2c76e'));sel.rotation.x=Math.PI/2;sel.visible=false;scene.add(sel);

  Object.assign(V3D,{renderer,scene,camera,controls,nodes,pick,flows,sel,W,H,ready:true});
  resetView();
  // Bấm chọn (phân biệt với kéo xoay)
  const ray=new THREE.Raycaster(),mv=new THREE.Vector2();let down=null;
  renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY]});
  renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;
    const r=renderer.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,camera);
    const h=ray.intersectObjects(pick,false)[0];if(h)select3D(h.object.userData.wid,true)});
  renderer.domElement.addEventListener('pointermove',e=>{const r=renderer.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,camera);
    const h=ray.intersectObjects(pick,false)[0],tip=document.getElementById('v3dTip');renderer.domElement.style.cursor=h?'pointer':'grab';
    if(h&&e.pointerType==='mouse'){const w=byId[h.object.userData.wid],top=[...w.places].sort((a,b)=>b.s-a.s)[0];
      tip.innerHTML=`<b>${esc(w.name)}</b><span>Tầng ${w.tier} · ${w.places.length} địa danh${top?` · mạnh nhất: ${esc(top.n)}`:''}</span>`;
      tip.style.left=(e.clientX-r.left+14)+'px';tip.style.top=(e.clientY-r.top+14)+'px';tip.hidden=false}else tip.hidden=true});
  renderer.domElement.addEventListener('pointerleave',()=>{document.getElementById('v3dTip').hidden=true});
  window.addEventListener('resize',resize3D);
}
function resize3D(){if(!V3D.ready)return;const host=document.getElementById('v3d');const W=host.clientWidth;if(!W)return;V3D.camera.aspect=W/V3D.H;V3D.camera.updateProjectionMatrix();V3D.renderer.setSize(W,V3D.H)}
let fly=null;
function flyTo(pos,target,ms=1100){fly={p0:V3D.camera.position.clone(),t0:V3D.controls.target.clone(),p1:pos,t1:target,start:performance.now(),ms}}
function resetView(){const k=Math.max(1,1.35/V3D.camera.aspect);V3D.camera.position.set(0,22*k,44*k);V3D.controls.target.set(0,10,0);V3D.sel.visible=false;fly=null;panel3D(null)}
function select3D(wid,zoom){
  const g=V3D.nodes[wid];if(!g)return;const R=g.userData.R;
  V3D.sel.visible=true;V3D.sel.scale.setScalar(R*1.35);V3D.sel.position.copy(g.position).add(new THREE.Vector3(0,-.3,0));
  if(zoom){const dir=g.position.clone().setY(0).normalize();if(!dir.lengthSq())dir.set(0,0,1);flyTo(g.position.clone().add(dir.multiplyScalar(R*4+7)).add(new THREE.Vector3(0,R*1.8+3,0)),g.position.clone().add(new THREE.Vector3(0,.8,0)));V3D.controls.autoRotate=false;document.getElementById('v3dRot').setAttribute('aria-pressed','false')}
  panel3D(wid);
}
function panel3D(wid){
  const p=document.getElementById('v3dPanel');
  if(!wid){p.innerHTML=`<span class="eyebrow">Vũ trụ 3D</span><p class="meta">Bấm một thế giới để bay tới và xem chi tiết.</p><div class="v3d-legend">${[4,3,2,1].map(t=>`<div><i style="background:${t===4?'#f2c76e':'#8fd6ff'}"></i>Tầng ${t} · ${esc(S.tiers[t].name)} <b>${S.worlds.filter(w=>w.tier===t).length}</b></div>`).join('')}</div>`;return}
  const w=byId[wid],[a,b]=rangeOf(w),tops=[...w.places].sort((x,y)=>y.s-x.s).slice(0,4);
  p.innerHTML=`<span class="eyebrow">Tầng ${w.tier} · ${esc(S.tiers[w.tier].name)}</span><h2 class="pname">${esc(w.name)}</h2>
    <div class="tiles"><div class="tile"><b>${w.places.length}</b><span>địa danh</span></div><div class="tile"><b>${b-a+1}</b><span>bậc cảnh giới</span></div></div>
    <p class="meta">${esc(REALMS[a].name)} → ${esc(REALMS[b].name)}</p>
    ${tops.length?`<div class="power">${tops.map(x=>`<div class="pw"><svg viewBox="-16 -18 32 32" data-t="${x.t}" aria-hidden="true"></svg><span class="pn">${esc(x.n)}</span><span class="pb"><i style="width:${x.s*20}%;background:${PTYPE[x.t].c}"></i></span></div>`).join('')}</div>`:''}
    <div class="actions"><a class="btn primary" href="#${S.id}--${wid}">Mở bản đồ vùng →</a></div>`;
  p.querySelectorAll('svg[data-t]').forEach(s=>ICON[s.dataset.t](s,PTYPE[s.dataset.t].c));
}
function loop(t){
  if(!V3D.run)return;requestAnimationFrame(loop);
  const s=t/1000;
  if(fly){const k=Math.min(1,(t-fly.start)/fly.ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;V3D.camera.position.lerpVectors(fly.p0,fly.p1,e);V3D.controls.target.lerpVectors(fly.t0,fly.t1,e);if(k>=1)fly=null}
  Object.values(V3D.nodes).forEach(g=>{g.position.y=TIER_Y[byId[g.userData.wid].tier]+Math.sin(s*.8+g.userData.phase)*.18;g.traverse(o=>{if(o.userData.spin)o.rotation.y+=o.userData.spin*.01})});
  if(V3D.sel.visible){V3D.sel.rotation.z+=.01}
  V3D.flows.forEach(f=>{const u=(s*f.sp+f.o)%1;f.s.position.copy(f.curve.getPoint(u))});
  V3D.controls.update();V3D.renderer.render(V3D.scene,V3D.camera);
}
async function render3D(){
  setBar([['Thư viện','#thu-vien'],[S.title,'#'+S.id],['Vũ trụ 3D']],[['Bản đồ 2D','#'+S.id]]);
  const msg=document.getElementById('v3dMsg');msg.hidden=false;msg.textContent='Đang dựng vũ trụ 3D…';
  try{await ensureThree();if(!V3D.ready)build3D();else resize3D();msg.hidden=true;V3D.run=true;requestAnimationFrame(loop);
    if(window.pend3D){const w=window.pend3D;window.pend3D=null;setTimeout(()=>select3D(w,true),150)}}
  catch(e){msg.textContent='Không mở được chế độ 3D trên thiết bị này (cần WebGL). Bạn vẫn xem được bản đồ 2D.';console.warn(e)}
}
function stop3D(){V3D.run=false}
document.addEventListener('click',e=>{const b=e.target.closest('[data-v3d]');if(!b||!V3D.ready)return;const k=b.dataset.v3d;
  if(k==='rot'){V3D.controls.autoRotate=!V3D.controls.autoRotate;b.setAttribute('aria-pressed',V3D.controls.autoRotate)}
  else if(k==='reset')resetView();
  else if(k==='top')flyTo(new THREE.Vector3(0,85,.1),new THREE.Vector3(0,8,0));
  else if(k==='side')flyTo(new THREE.Vector3(0,12,60),new THREE.Vector3(0,11,0));});
