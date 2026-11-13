/* ===== Phần dùng chung cho mọi truyện: danh sách truyện, liên kết chương, màu trời, nhóm hồ sơ ===== */
const STORIES=[];
// Liên kết tới chương gốc; bảng CH nằm trong <slug>.chuong.js (tạo bằng tools/tao_lien_ket_chuong.py)
const chLink=n=>{const st=(typeof S!=='undefined'&&S)||STORIES[0],C=(window.CHAP&&CHAP[st.id])||{},k=String(n),u=C[k]||C['~'+k],nhan=k.replace('~','');
  return u?`<a class="chref" href="${st.source.replace(/\/[^/]*$/,'')}${u}" target="_blank" rel="noopener">ch.${nhan}</a>`:`<span class="chref">ch.${nhan}</span>`};
/* Màu trời cho cảnh quan từng thế giới: [trên, dưới, tinh vân] */
const SKY={galaxy:['#0b0d3a','#1b2a6b','#5b6cff'],sun:['#2a1a3d','#7a4a2a','#f2b54a'],ruins:['#1a1c2c','#4a4e64','#c9cce0'],dragon:['#0a2a2e','#145a4e','#2bd3a0'],heaven:['#2a3570','#8fa3e6','#ffffff'],tree:['#16304a','#6aa6a0','#e6fff4'],nine:['#0d2a22','#1e5a3a','#6cc85a'],gate:['#1c1d33','#4a4d6a','#f2c76e'],demon:['#1a0508','#4a0d16','#ff3b3b'],nether:['#120a2a','#2e1f5e','#9b7bff'],sea:['#071a3a','#0f4a8a','#3fa2f0'],waste:['#2a1a0e','#6e4a26','#d9a66a'],sin:['#1e060c','#55101e','#e0435c'],abyss:['#0a0404','#3a1208','#ff6a1f'],start:['#0f2440','#3a7a8a','#9be37b'],isles:['#06243a','#0f6a8a','#5fcf6a']};
const PEOPLE_GROUPS={gd:'Gia đình',hn:'Hồng nhan',dh:'Đồng hành & đồng minh',dt:'Đối thủ',cg:'Cường giả khác'};
const ARTS_GROUPS={cp:'Công pháp',hm:'Huyết mạch',tt:'Thần thông',th:'Thiên hỏa',bv:'Bảo vật'};
