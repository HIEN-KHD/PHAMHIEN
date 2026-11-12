/* ===== Phóng/kéo bản đồ vùng (tới 10 lần) =====
   Lăn chuột, chụm 2 ngón, kéo, hoặc nút. Khi phóng to: biểu tượng và chữ không phình theo (giữ dễ đọc),
   viền lãnh thổ/đường giữ nét mảnh, và địa hình của vùng đang xem được vẽ lại ở độ phân giải cao (thấy thêm đồi, khe, rừng). */
function attachZoom(stage,svg,opt={}){
  const Z={vb:{x:0,y:0,w:1000,h:640},minW:opt.minW||100,timer:null};
  const box=()=>stage.getBoundingClientRect();
  const unit=()=>{const r=box(),v=Z.vb;return Math.max(v.w/r.width,v.h/r.height)};// đơn vị bản đồ trên 1px màn hình
  function lod(){const z=Math.max(1,1000/Z.vb.w),s=Math.pow(z,-.62);svg.classList.toggle('lod-near',z>=MINOR_Z);
    svg.querySelectorAll('.place.mk,.portal').forEach(g=>{if(!g.dataset.t0)g.dataset.t0=g.getAttribute('transform')||'';g.setAttribute('transform',g.dataset.t0+(s<1?` scale(${s.toFixed(3)})`:''))});
    svg.querySelectorAll('text.tlabel').forEach(t=>{const x=t.getAttribute('x'),y=t.getAttribute('y');t.setAttribute('transform',s<1?`translate(${x},${y}) scale(${s.toFixed(3)}) translate(${-x},${-y})`:'')})}
  function detail(){const rel=svg._rel,layer=svg.querySelector('.detail');if(!rel||!layer||!rel.F)return;const u=unit(),v=Z.vb;
    if(1/u<1.7){layer.innerHTML='';return}
    const x0=Math.max(0,v.x),y0=Math.max(0,v.y),x1=Math.min(1000,v.x+v.w),y1=Math.min(640,v.y+v.h);if(x1-x0<2||y1-y0<2)return;
    let W=Math.round((x1-x0)/u),H=Math.round((y1-y0)/u);const cap=Math.sqrt(1.3e6/(W*H));if(cap<1){W=Math.round(W*cap);H=Math.round(H*cap)}
    const ver=svg._ver,cv=reliefPaint(rel.F,x0,y0,x1-x0,y1-y0,W,H);if(ver!==svg._ver)return;
    layer.innerHTML='';el('image',{href:cv.toDataURL('image/png'),x:x0,y:y0,width:x1-x0,height:y1-y0,preserveAspectRatio:'none'},layer)}
  Z.set=()=>{const v=Z.vb;svg.setAttribute('viewBox',`${v.x.toFixed(2)} ${v.y.toFixed(2)} ${v.w.toFixed(2)} ${v.h.toFixed(2)}`);lod();
    clearTimeout(Z.timer);Z.timer=setTimeout(detail,320);if(opt.onChange)opt.onChange(Z)};
  Z.fit=()=>{const r=box(),a=r.width/Math.max(1,r.height);
    if(a<.9){const w=560,h=w/a;Z.vb={x:500-w/2,y:320-h/2,w,h}}else Z.vb={x:0,y:0,w:1000,h:640};Z.set()};
  Z.zoom=(k,px,py)=>{const r=box(),v=Z.vb,sc=unit(),ox=v.x+(v.w-r.width*sc)/2,oy=v.y+(v.h-r.height*sc)/2;
    const mx=ox+((px??r.left+r.width/2)-r.left)*sc,my=oy+((py??r.top+r.height/2)-r.top)*sc;
    const nw=Math.min(2000,Math.max(Z.minW,v.w*k)),f=nw/v.w;Z.vb={x:mx-(mx-v.x)*f,y:my-(my-v.y)*f,w:nw,h:v.h*f};Z.set()};
  Z.level=()=>1000/Z.vb.w;
  Z.focus=(x,y,z)=>{const w=1000/z,h=w*Z.vb.h/Z.vb.w;Z.vb={x:x-w/2,y:y-h/2,w,h};Z.set()};
  const pts=new Map();let moved=0,pinch=null;
  stage.addEventListener('wheel',e=>{e.preventDefault();Z.zoom(Math.exp(e.deltaY*.0015),e.clientX,e.clientY)},{passive:false});
  stage.addEventListener('pointerdown',e=>{if(e.target.closest('.realm-badge,.v2d-card,.map-zoom,button,a'))return;pts.set(e.pointerId,[e.clientX,e.clientY]);moved=0;stage.classList.add('drag');
    if(pts.size===2){const[a,b]=[...pts.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1])}}});
  stage.addEventListener('pointermove',e=>{const p=pts.get(e.pointerId);if(!p)return;const dx=e.clientX-p[0],dy=e.clientY-p[1];moved+=Math.abs(dx)+Math.abs(dy);
    if(pts.size===1&&moved>4){if(!stage.hasPointerCapture(e.pointerId))stage.setPointerCapture(e.pointerId);const sc=unit();Z.vb.x-=dx*sc;Z.vb.y-=dy*sc;Z.set()}
    pts.set(e.pointerId,[e.clientX,e.clientY]);
    if(pts.size===2&&pinch){const[a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d>0){Z.zoom(pinch.d/d,(a[0]+b[0])/2,(a[1]+b[1])/2);pinch.d=d}}});
  const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=null;if(!pts.size)stage.classList.remove('drag')};
  stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
  // Kéo thì không tính là bấm vào địa danh
  stage.addEventListener('click',e=>{if(moved>6){e.stopPropagation();e.preventDefault();moved=0}},true);
  stage.addEventListener('dblclick',e=>{if(!e.target.closest('.place'))Z.zoom(.5,e.clientX,e.clientY)});
  return Z;
}
