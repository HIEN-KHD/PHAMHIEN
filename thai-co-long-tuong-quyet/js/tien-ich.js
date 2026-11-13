/* ===== Tiện ích ===== */
const NS='http://www.w3.org/2000/svg';
function el(tag,attrs,parent){const n=document.createElementNS(NS,tag);for(const k in attrs)if(attrs[k]!=null)n.setAttribute(k,attrs[k]);if(parent)parent.appendChild(n);return n}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}}};
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
const short=n=>n.replace(/ \(.*\)/,'');
/* Khung thu gọn được: thêm nút "− Thu gọn" / "▸ Tên" ở đầu khung, nhớ lựa chọn trên máy này */
const FOLD={get:k=>{try{return localStorage.getItem('fold:'+k)==='1'}catch(e){return false}},set:(k,v)=>{try{localStorage.setItem('fold:'+k,v?'1':'0')}catch(e){}}};
function foldify(el,key,label){if(!el)return;let b=[...el.children].find(c=>c.classList.contains('fold-btn'));
  if(!b){b=document.createElement('button');b.type='button';b.className='fold-btn';el.prepend(b)}
  b.dataset.fold=key;b.dataset.label=label;const f=FOLD.get(key);el.classList.add('foldable');el.classList.toggle('folded',f);
  b.setAttribute('aria-expanded',String(!f));b.setAttribute('aria-label',(f?'Mở ':'Thu gọn ')+label);b.textContent=f?'▸ '+label:'− Thu gọn'}
document.addEventListener('click',e=>{const b=e.target.closest('.fold-btn');if(!b)return;e.preventDefault();e.stopPropagation();const k=b.dataset.fold;FOLD.set(k,!FOLD.get(k));foldify(b.parentElement,k,b.dataset.label)},true);
