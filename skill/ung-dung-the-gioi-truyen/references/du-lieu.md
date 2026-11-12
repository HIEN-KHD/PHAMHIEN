# Định dạng dữ liệu

Mọi dữ liệu của một truyện nằm trong `js/truyen/<slug>.*.js` (+ `js/canh-gioi.js` cho hệ cảnh giới). Phần vẽ không chứa nội dung truyện. Số chương dạng `'~1441'` là chương không ghi số trong tên, đánh theo vị trí trong danh sách.

## Mục lục

1. `<slug>.js` — truyện, tầng, thế giới, đường nối
2. `<slug>.dia-danh.js` — địa danh của từng thế giới
3. `<slug>.ho-so.js` — nhân vật, hành trình, công pháp
4. `canh-gioi.js` — nhóm và bậc cảnh giới
5. File tạo tự động: `.chuong.js`, `.quy-mo.js`
6. Thứ tự nạp trong `index.html`

## 1. `<slug>.js`

```js
const STORIES=[{
  id:'<slug>', title:'Tên truyện', author:'Tác giả', genre:'Thể loại · N chương',
  source:'https://<trang-nguồn>/<slug>',  // chLink dựng link chương từ đây + CH
  sub:'Một câu giới thiệu.', start:'<id thế giới đầu tiên>',
  tiers:{4:{name:'Cõi cấp cao',hint:'…'}, 3:{…}, 2:{…}, 1:{name:'Khởi đầu',hint:'…'}},  // tầng: số lớn ở trên
  worlds:[{
    id:'thienvo', name:'Thiên Võ đại lục', tier:1,
    x:410, y:620,            // vị trí trên bản đồ thế giới 2D (khung 820×960)
    kind:'start',            // kiểu cảnh quan, xem bảng dưới
    type:'Đại lục',
    r:['vogia','luanhoi'],   // khoảng cảnh giới ở đây: [id thấp, id cao]; rGuess:true nếu ước lượng
    sym:'Mô tả biểu tượng trên bản đồ',
    about:'1–2 câu thế giới này là gì.',
    quote:['Câu nguyên văn trong truyện', 239],
    secs:[['Tiêu đề mục','1–3 câu.',[chương,…]], …]   // mục "Lâm Phong tại đây" được tô nổi
  }, …],
  links:[['a','b'],['c','d','up']],   // đường hầm giữa thế giới; 'up' = đường vàng lên tầng cao
  ring:{cx,cy,rx,ry,label,lx,ly}      // vòng bao "vũ trụ" trên bản đồ thế giới (tuỳ chọn)
}];
```

`kind` quyết định cảnh quan 2D/3D và bảng màu địa hình:

| kind | Hình | Ghi chú |
| --- | --- | --- |
| start, nine, gate, dragon, tree, ruins, waste | Lục địa nổi | địa hình thật; có ruộng quanh thành (trừ một số) |
| demon, sin | Lục địa đỏ đen | sông/hồ dung nham |
| nether | Lục địa tím | |
| sea, isles | Biển có đảo/châu lục | lãnh thổ nổi thành đất liền |
| heaven | Biển mây | |
| abyss | Vực sâu lửa | kiểu vẽ cũ |
| sun, galaxy | Mặt trời / thiên hà | kiểu vẽ cũ |

`nine` = 9 đảo nhỏ trong 3D. Thêm kind mới: thêm vào `MODE`, `GROUND`, `SKY` (`ban-do-vung.js`, `<slug>.js`), `RPAL` (`dia-hinh.js`), `PAL` + nhánh trong `worldModel` (`the-gioi-3d.js`).

## 2. `<slug>.dia-danh.js`

```js
const PLACES={
  thienvo:[
    // [loại, tên, mô tả 1–2 câu, [chương], thuộc?, quy mô?]
    ['quoc','Chân Võ quốc','Quốc gia nơi nhân vật chính lớn lên…',[279,239]],
    ['thanh','Già Lam thành','Thành có Già Lam học viện…',[12,56],'Chân Võ quốc',3],
  ], …
};
```

- **loại**: `quoc` quốc gia · `vung` vùng/vực/châu · `thanh` thành trì · `gia` gia tộc · `tong` tông môn/thế lực · `toc` chủng tộc · `dao` đảo · `hiem` hiểm địa/bí cảnh · `bau` bảo vật.
- `quoc`/`vung` không có "thuộc" = **lãnh thổ** (có viền, chữ to). "thuộc" = tên một lãnh thổ cùng thế giới → địa danh được xếp bên trong.
- **quy mô** 1–5 (ghi đè `PLACE_SIZE`). Thế lực mạnh nhất 4–5, nhỏ lẻ 1–2. Bỏ trống (`null`) thì lấy từ `tinh_quy_mo.py`, mặc định 2.
- Tên có "hải" hoặc "biển" được coi là vùng nước.
- Bản đồ dày (>20 địa danh): chỉ ~19 thứ lớn nhất hiện ở 1×, còn lại hiện khi phóng ≥ 2,4× (tự động, `markMinor`).

## 3. `<slug>.ho-so.js`

```js
const PEOPLE_RAW=[['gd','Tên','Mô tả',[thế giới…],[chương…]], …];  // nhóm: gd gia đình, hn hồng nhan, dh đồng hành, dt đối thủ, cg cường giả
const PEOPLE_GROUPS={gd:'Gia đình',…};
const JOURNEY_RAW=[[chương,'idThếGiới','Sự kiện','idCảnhGiới?'], …];  // theo thứ tự chương; cảnh giới = lần đột phá
const ARTS_RAW=[['cp','Tên','Mô tả',[chương],hạng?], …];  // cp công pháp, hm huyết mạch, tt thần thông, th thiên hỏa (có hạng), bv bảo vật
const ARTS_GROUPS={cp:'Công pháp',…};
// cuối file gắn vào truyện:
STORIES[0].people=PEOPLE;STORIES[0].journey=JOURNEY;STORIES[0].arts=ARTS;
```

## 4. `canh-gioi.js`

```js
const GROUPS=[{id:'nhan',name:'Nhân cảnh',han:'人境',c:'#8fd6ff'}, …];   // nhóm cảnh giới, màu riêng
const REALMS=[R(id, nhóm, tên, chữ Hán, 'số trọng thiên', 'đặc điểm', 'cách đột phá', {tLv,tTrait,tHow,ch:[chương],lf:chươngNVChínhĐạt}), …];
```

`tLv/tTrait/tHow`: `t` = theo lời truyện (có chương), `w` = bách khoa trên web, `d` = diễn giải từ tên. Hiển thị nhãn nguồn nên phải ghi đúng. `RIDX` (id → vị trí) tạo tự động; chèn bậc mới bằng `REALMS.splice` rồi dựng lại `RIDX` như cuối file mẫu.

## 5. File tạo tự động (không sửa tay)

- `<slug>.chuong.js`: `CHAP['<slug>']={"số chương":"/đường-dẫn"}` — `python tools/tao_lien_ket_chuong.py <slug>` quét mọi số chương trong dữ liệu.
- `<slug>.quy-mo.js`: `SIZES['<slug>']={"thếgiới|tên":quy mô}` — `python tools/tinh_quy_mo.py <slug>` (đếm số lần xuất hiện trong tên chương ×3 và trong chương đã tải). Chạy lại khi bộ chương tải về thay đổi nhiều; quy mô ghi tay trong `dia-danh.js` luôn thắng.

## 6. Nhiều truyện trong một ứng dụng

Truyện đầu tiên khai báo `const STORIES=[{…}]`. Truyện thêm sau viết trong một hàm tự chạy và gọi `STORIES.push({...})`, kèm:
- `hero:'Tên nhân vật chính'`, `chapters:<số chương>` (biểu đồ tu vi, nhãn "… tại đây");
- `realmSet:{groups,realms}` — hệ cảnh giới riêng (dùng hàm `R()` của `canh-gioi.js`); khi chọn truyện, ứng dụng thay `GROUPS/REALMS/RIDX/GBY`;
- `ring:{…,label}` — nhãn vòng bao trên bản đồ thế giới và trong 3D.
Địa danh/hồ sơ gắn thẳng vào truyện đó: `STORIES.find(s=>s.id==='<slug>').worlds.forEach(w=>{w.places=…})`, `.people/.journey/.arts`. Link chương nằm ở `CHAP['<slug>']`, quy mô ở `SIZES['<slug>']` (hai công cụ tự tạo đúng dạng này). Ví dụ đầy đủ: `js/truyen/than-vo-chien-vuong.*.js` trong repo mẫu.

## 7. Thứ tự nạp trong `index.html`

`canh-gioi.js` → `<slug>.js` → `.chuong.js` → `.quy-mo.js` → `.dia-danh.js` → `.ho-so.js` → `tien-ich.js` → `hinh-ve.js` → `dia-hinh.js` → `ban-do-vung.js` → `thu-phong.js` → `ho-so.js` → `the-gioi-3d.js` → `app.js`. Thêm file mới thì thêm thẻ `<script>` đúng chỗ; `tools/build.py` gộp theo các thẻ này.
