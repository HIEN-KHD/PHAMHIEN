/* ===== Khối hình cơ bản ===== */
// Đảo bay = elip mặt đất + khối tam giác ngược làm phần đá
function island(g,w,top,depth){
  depth=depth||w*.62;
  el('polygon',{points:`${-w/2},0 ${w/2},0 ${w*.16},${depth*.62} 0,${depth} ${-w*.14},${depth*.55}`,fill:'url(#rock)'},g);
  el('polygon',{points:`${w*.02},0 ${w/2},0 ${w*.16},${depth*.62} 0,${depth}`,fill:'#000',opacity:.28},g);
  el('ellipse',{cx:0,cy:0,rx:w/2,ry:w*.11,fill:top},g);
  el('ellipse',{cx:-w*.06,cy:-w*.02,rx:w*.36,ry:w*.06,fill:'#fff',opacity:.12},g);
}
function poly(g,pts,fill,extra){return el('polygon',Object.assign({points:pts,fill},extra||{}),g)}
function mountains(g,list){list.forEach(([x,w,hgt,c,c2])=>{poly(g,`${x-w/2},0 ${x},${-hgt} ${x+w/2},0`,c);poly(g,`${x},${-hgt} ${x+w/2},0 ${x+w*.1},0`,c2||'#000',{opacity:c2?1:.22})})}

const ART={
  galaxy(g){
    el('ellipse',{cx:0,cy:-10,rx:80,ry:34,fill:'#5b6cff',opacity:.35,filter:'url(#soft)'},g);
    const r=el('g',{transform:'translate(0,-10) rotate(-18)'},g);
    [[78,24,.35],[58,17,.5],[38,11,.7],[20,6,.9]].forEach(([rx,ry,o])=>el('ellipse',{cx:0,cy:0,rx,ry,fill:'none',stroke:'#bcd0ff','stroke-width':1.6,opacity:o},r));
    const R=rng(7);for(let i=0;i<40;i++){const a=R()*Math.PI*2,d=10+R()*68;el('circle',{cx:Math.cos(a)*d,cy:Math.sin(a)*d*.3,r:R()*1.3+.4,fill:'#e6edff',opacity:.8},r)}
    el('circle',{cx:0,cy:-10,r:12,fill:'#fff',filter:'url(#glow)'},g);
  },
  sun(g){
    el('circle',{cx:0,cy:-20,r:78,fill:'url(#sunHalo)'},g);
    for(let i=0;i<8;i++){const a=i*Math.PI/4;el('line',{x1:Math.cos(a)*46,y1:-20+Math.sin(a)*46,x2:Math.cos(a)*(i%2?62:72),y2:-20+Math.sin(a)*(i%2?62:72),stroke:'#f6d27e','stroke-width':3,'stroke-linecap':'round'},g)}
    el('circle',{cx:0,cy:-20,r:38,fill:'none',stroke:'#f6d27e','stroke-width':2.5,opacity:.8},g);
    el('circle',{cx:0,cy:-20,r:30,fill:'url(#sunCore)',filter:'url(#glow)'},g);
    poly(g,'0,-34 4,-24 14,-20 4,-16 0,-6 -4,-16 -14,-20 -4,-24','#fffbe9');
  },
  ruins(g){
    el('ellipse',{cx:0,cy:-14,rx:72,ry:16,fill:'#dfe3f2',opacity:.35,filter:'url(#soft)'},g);
    island(g,120,'#8d90a3',58);
    [[-30,-26,9,26],[-14,-16,7,16],[20,-40,10,40],[34,-18,6,18]].forEach(([x,y,w,hh])=>{el('rect',{x,y,width:w,height:hh,fill:'#c9ccd8'},g);el('rect',{x:x-2,y,width:w+4,height:4,fill:'#e3e5ee'},g)});
    el('ellipse',{cx:8,cy:-4,rx:78,ry:10,fill:'#fff',opacity:.22,filter:'url(#soft)'},g);
  },
  dragon(g){
    island(g,130,'#1f9c7c');
    mountains(g,[[-34,40,40,'#1fae84'],[0,46,58,'#27c494'],[34,40,42,'#1a9473']]);
    el('path',{d:'M-62,-18 C-48,-70 -26,6 -6,-42 S28,-74 40,-30 S58,-24 64,-46',fill:'none',stroke:'#f2c76e','stroke-width':5,'stroke-linecap':'round',filter:'url(#glow)'},g);
    el('circle',{cx:64,cy:-46,r:4,fill:'#f2c76e'},g);
  },
  heaven(g){
    el('ellipse',{cx:0,cy:-10,rx:100,ry:34,fill:'#c7d2ff',opacity:.25,filter:'url(#soft)'},g);
    [[0,8,82,18,'#d7defb'],[0,-12,66,15,'#e7ecff'],[0,-30,46,12,'#f3f5ff']].forEach(([x,y,rx,ry,c])=>{el('ellipse',{cx:x,cy:y+4,rx,ry,fill:'#9aa6de'},g);el('ellipse',{cx:x,cy:y,rx,ry,fill:c},g)});
    const temple=(x,y,s)=>{el('rect',{x:x-8*s,y:y-10*s,width:16*s,height:10*s,fill:'#f2c76e'},g);poly(g,`${x-12*s},${y-10*s} ${x},${y-19*s} ${x+12*s},${y-10*s}`,'#e3a948')};
    temple(-48,6,1);temple(46,6,1);temple(0,-30,1.3);
    el('rect',{x:-2,y:-62,width:4,height:10,fill:'#f2c76e'},g);
    poly(g,'-6,-62 0,-74 6,-62','#f6d27e');
  },
  tree(g){
    island(g,122,'#cfeee0');
    el('rect',{x:-4,y:-44,width:8,height:44,fill:'#8a6a4a'},g);
    el('circle',{cx:0,cy:-60,r:34,fill:'#e9fff6',opacity:.35,filter:'url(#soft)'},g);
    [[-16,-56,18],[16,-56,18],[0,-70,22],[0,-52,18]].forEach(([x,y,r])=>el('circle',{cx:x,cy:y,r,fill:'#e6f7ef'},g));
    el('circle',{cx:-6,cy:-74,r:10,fill:'#fff',filter:'url(#glow)'},g);
    const R=rng(3);for(let i=0;i<9;i++)el('circle',{cx:(R()-.5)*110,cy:-R()*80,r:1.6,fill:'#fff',opacity:.8},g);
  },
  nine(g){
    for(let r=0;r<3;r++)for(let c=0;c<3;c++){const x=(c-1)*42,y=(r-1)*32-14;
      poly(g,`${x-14},${y} ${x+14},${y} ${x},${y+12}`,'#3a2f4f');
      el('ellipse',{cx:x,cy:y,rx:15,ry:5.5,fill:r===1&&c===1?'#a6e36a':'#6cc85a'},g);}
  },
  gate(g){
    island(g,128,'#6b6f86');
    mountains(g,[[-40,38,46,'#a5aac0'],[42,40,52,'#b3b8cc']]);
    el('path',{d:'M-20,0 L-20,-42 Q0,-62 20,-42 L20,0',fill:'none',stroke:'#f2c76e','stroke-width':5,filter:'url(#glow)'},g);
    el('rect',{x:-26,y:-46,width:52,height:5,fill:'#f2c76e'},g);
  },
  demon(g){
    island(g,120,'#6b1622');
    el('circle',{cx:30,cy:-60,r:22,fill:'#ff3b3b',opacity:.45,filter:'url(#soft)'},g);
    el('circle',{cx:30,cy:-60,r:14,fill:'#e0393c'},g);
    [[-40,10,40],[-22,12,62],[-4,10,34],[16,12,56],[38,10,36]].forEach(([x,w,hh])=>poly(g,`${x-w/2},0 ${x},${-hh} ${x+w/2},0`,'#130b10'));
  },
  nether(g){
    island(g,122,'#3a2d6e');
    el('ellipse',{cx:0,cy:-14,rx:56,ry:16,fill:'#9b7bff',opacity:.3,filter:'url(#soft)'},g);
    ['M-50,-6 Q-30,-22 -10,-8 T30,-10 T56,-16','M-40,-18 Q-20,-34 0,-20 T40,-24'].forEach(d=>el('path',{d,fill:'none',stroke:'#c8b6ff','stroke-width':2.5,'stroke-linecap':'round',filter:'url(#glow)'},g));
    el('path',{d:'M-8,-34 Q0,-46 8,-34',fill:'none',stroke:'#e6dcff','stroke-width':2.5},g);
  },
  sea(g){
    el('ellipse',{cx:0,cy:4,rx:72,ry:24,fill:'#0f3a77',opacity:.6,filter:'url(#soft)'},g);
    el('ellipse',{cx:0,cy:0,rx:68,ry:21,fill:'url(#water)',stroke:'#2d7fd6','stroke-width':2},g);
    ['M-50,-2 q8,-6 16,0 t16,0','M-20,8 q8,-6 16,0 t16,0','M-46,10 q6,-5 12,0'].forEach(d=>el('path',{d,fill:'none',stroke:'#9fd6ff','stroke-width':2,'stroke-linecap':'round'},g));
    poly(g,'14,2 30,-28 46,2','#7d8496');poly(g,'30,-28 46,2 34,2','#5b6273');poly(g,'26,-20 30,-28 34,-20','#e6e9f2');
  },
  waste(g){
    island(g,120,'#a07a48');
    el('path',{d:'M0,-4 L0,-38 M0,-26 L-14,-40 M0,-30 L12,-46 M12,-46 L18,-48 M-14,-40 L-20,-38',fill:'none',stroke:'#5b3d22','stroke-width':3.5,'stroke-linecap':'round'},g);
    el('path',{d:'M-40,2 l10,-4 l6,3 M18,3 l8,-3 l8,2',fill:'none',stroke:'#6e4f2c','stroke-width':1.6},g);
    el('path',{d:'M30,-10 l6,-6 l4,4 l6,-6',fill:'none',stroke:'#e9e2d0','stroke-width':1.6},g);
  },
  sin(g){
    island(g,120,'#5a1420');
    [[-30,12,34,'#c22e45'],[-8,14,52,'#e0435c'],[22,12,40,'#b52a40'],[40,8,22,'#e0435c']].forEach(([x,w,hh,c])=>poly(g,`${x-w/2},0 ${x},${-hh} ${x+w/2},0`,c));
    ['M-56,-12 q7,-6 14,0 t14,0','M28,-56 q7,-6 14,0 t14,0'].forEach(d=>el('path',{d,fill:'none',stroke:'#e7cfe0','stroke-width':2,'stroke-linecap':'round',opacity:.8},g));
  },
  abyss(g){
    el('ellipse',{cx:0,cy:0,rx:80,ry:28,fill:'#ff6a1f',opacity:.4,filter:'url(#soft)'},g);
    el('ellipse',{cx:0,cy:0,rx:70,ry:22,fill:'#2a1410',stroke:'#ff8a3a','stroke-width':2.5},g);
    el('ellipse',{cx:0,cy:2,rx:46,ry:12,fill:'#050204'},g);
    [[-54,22],[-34,34],[-10,26],[12,40],[34,30],[54,22]].forEach(([x,hh],i)=>{poly(g,`${x-9},${-4} ${x},${-4-hh} ${x+9},${-4}`,i%2?'#ffb43a':'#ff7a2a',{filter:'url(#glow)'})});
  },
  start(g){
    island(g,150,'#4fa64a',70);
    mountains(g,[[-50,40,40,'#62c25a'],[-24,40,54,'#7bd36c']]);
    el('rect',{x:12,y:-30,width:44,height:30,fill:'#e7dcc0'},g);
    el('rect',{x:24,y:-46,width:16,height:16,fill:'#efe6cf'},g);
    for(let i=0;i<5;i++)el('rect',{x:12+i*10,y:-35,width:5,height:5,fill:'#e7dcc0'},g);
    el('rect',{x:29,y:-14,width:8,height:14,fill:'#6b5638'},g);
    el('rect',{x:30,y:-58,width:1.6,height:12,fill:'#6b5638'},g);poly(g,'31.6,-58 42,-54 31.6,-50','#e0435c');
  },
  isles(g){
    el('ellipse',{cx:0,cy:4,rx:80,ry:24,fill:'#147a8a',opacity:.5,filter:'url(#soft)'},g);
    el('ellipse',{cx:0,cy:0,rx:76,ry:22,fill:'url(#water)',stroke:'#2d9ad6','stroke-width':2},g);
    [[-36,2,14],[-6,-6,12],[30,4,16],[50,-6,9]].forEach(([x,y,rx])=>el('ellipse',{cx:x,cy:y,rx,ry:rx*.35,fill:'#5fcf6a'},g));
    poly(g,'-12,-6 -6,-24 0,-6','#3fae55');poly(g,'26,4 34,-18 42,4','#3fae55');
    poly(g,'-46,-12 -46,-30 -36,-12','#f3efe2');el('rect',{x:-52,y:-12,width:16,height:4,fill:'#7a5a3a'},g);
  }
};


/* ===== Defs dùng chung (luôn hiển thị để gradient/filter hoạt động ở mọi màn) ===== */
document.getElementById('sharedDefs').innerHTML=`<defs>
  <radialGradient id="sky" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="#1d1c52"/><stop offset=".55" stop-color="#0d0e2c"/><stop offset="1" stop-color="#05060f"/></radialGradient>
  <radialGradient id="sunHalo"><stop offset="0" stop-color="#ffe7a3" stop-opacity=".85"/><stop offset=".45" stop-color="#f2b54a" stop-opacity=".35"/><stop offset="1" stop-color="#f2b54a" stop-opacity="0"/></radialGradient>
  <radialGradient id="sunCore" cx="40%" cy="38%"><stop offset="0" stop-color="#fffbe9"/><stop offset=".5" stop-color="#ffd76e"/><stop offset="1" stop-color="#e59a2a"/></radialGradient>
  <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b4a66"/><stop offset="1" stop-color="#1c1b2e"/></linearGradient>
  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fa2f0"/><stop offset="1" stop-color="#155ba8"/></linearGradient>
  <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="hover" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="6" result="b"/><feFlood flood-color="#f2c76e" flood-opacity=".55"/><feComposite in2="b" operator="in" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>`;

function stars(parent,n,w,hh,seed){const r=rng(seed),g=el('g',{},parent);for(let i=0;i<n;i++){const v=r();el('circle',{cx:(r()*w).toFixed(1),cy:(r()*hh).toFixed(1),r:(v>.97?1.8:v*1.1+.2).toFixed(2),fill:v>.9?'#ffeccc':'#e8ecff',opacity:(.35+r()*.65).toFixed(2)},g)}return g}
function sparkle(g,x,y,s){s=s||7;poly(g,`${x},${y-s} ${x+s*.2},${y-s*.2} ${x+s},${y} ${x+s*.2},${y+s*.2} ${x},${y+s} ${x-s*.2},${y+s*.2} ${x-s},${y} ${x-s*.2},${y-s*.2}`,'#fff')}
