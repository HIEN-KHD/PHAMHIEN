/* Kiểm tra tự động toàn bộ ứng dụng bằng trình duyệt ảo (Playwright).
   Cách dùng:  node kiem_tra.js <đường-dẫn-index.html hoặc dist/*.html> [thư-mục-lưu-ảnh]
   Kiểm tra: lỗi JavaScript ở mọi màn (thư viện, bản đồ, từng thế giới, hồ sơ, 3D),
             nhãn chồng nhau trên bản đồ vùng ở 1× và 2,5×, tràn ngang trên điện thoại (400px).
   In "OK" hoặc danh sách lỗi; chụp ảnh từng màn vào thư mục ảnh để tự xem lại trước khi báo người dùng. */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');
(async()=>{
  const file=path.resolve(process.argv[2]||'index.html'),out=process.argv[3]||path.join(path.dirname(file),'anh-kiem-tra');fs.mkdirSync(out,{recursive:true});
  const U='file://'+file,vendor=path.join(path.dirname(file),'js','vendor');
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1280,height:860}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/GPU stall|WebGL|ReadPixels|GL_/i.test(m.text()))errs.push(m.text())});
  if(fs.existsSync(path.join(vendor,'three.min.js'))){
    await p.route(/three\.min\.js$/,r=>r.fulfill({path:path.join(vendor,'three.min.js'),contentType:'text/javascript'}));
    await p.route(/OrbitControls\.js$/,r=>r.fulfill({path:path.join(vendor,'OrbitControls.js'),contentType:'text/javascript'}))}
  await p.goto(U);await p.waitForTimeout(400);
  const {slug,worlds}=await p.evaluate(()=>({slug:STORIES[0].id,worlds:STORIES[0].worlds.map(w=>w.id)}));
  const bad=[],shot=async n=>p.screenshot({path:path.join(out,n+'.png')});
  const overlap=()=>p.evaluate(()=>{const st=document.getElementById('wStage')||document.body,S=st.getBoundingClientRect();
    const vis=r=>r.width>0&&r.right>S.left&&r.left<S.right&&r.bottom>S.top&&r.top<S.bottom;
    const A=[...document.querySelectorAll('#scene .plabel,#scene .tlabel,#scene .portal text')].map(e=>[e.getBoundingClientRect(),e.textContent]).filter(([r])=>vis(r));
    const c=[];for(let i=0;i<A.length;i++)for(let j=i+1;j<A.length;j++){const a=A[i][0],b=A[j][0],ox=Math.min(a.right,b.right)-Math.max(a.left,b.left),oy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(ox>4&&oy>4)c.push(A[i][1]+' × '+A[j][1])}return c});
  await p.goto(U+'#thu-vien');await p.waitForTimeout(200);await shot('thu-vien');
  await p.goto(U+'#'+slug);await p.waitForTimeout(300);await shot('ban-do-the-gioi');
  for(const w of worlds){await p.goto(U+'#'+slug+'--'+w);await p.waitForTimeout(500);await shot('vung-'+w);
    const o=await overlap();if(o.length)bad.push(`${w} 1×: ${o.join('; ')}`);
    const hasZoom=await p.evaluate(()=>!!window.WZ);
    if(hasZoom)for(const [x,y] of [[300,220],[500,320],[700,220],[300,420],[700,420]]){await p.evaluate(([x,y])=>WZ.focus(x,y,2.5),[x,y]);await p.waitForTimeout(60);
      const o2=await overlap();if(o2.length)bad.push(`${w} 2.5× @${x},${y}: ${o2.join('; ')}`)}}
  for(const t of ['nhan-vat','hanh-trinh','cong-phap']){await p.goto(U+'#'+slug+'--'+t);await p.waitForTimeout(200);await shot('ho-so-'+t)}
  await p.goto(U+'#'+slug+'--3d');await p.waitForTimeout(3500);await shot('3d');
  await p.setViewportSize({width:400,height:860});
  for(const h of ['#thu-vien','#'+slug,'#'+slug+'--'+worlds[0],'#'+slug+'--3d']){await p.goto(U+h);await p.waitForTimeout(h.endsWith('3d')?2500:400);
    const sw=await p.evaluate(()=>document.documentElement.scrollWidth);if(sw>402)bad.push(`tràn ngang ${sw}px ở ${h}`)}
  await shot('dien-thoai-3d');
  if(errs.length)bad.push('Lỗi JS: '+[...new Set(errs)].slice(0,8).join(' | '));
  console.log(bad.length?bad.join('\n'):'OK');console.log('Ảnh: '+out);await b.close();process.exit(bad.length?1:0);
})();
