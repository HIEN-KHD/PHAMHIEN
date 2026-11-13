# Các màn hình và cách chúng hoạt động

Ứng dụng là một trang, điều hướng bằng hash: `#thu-vien` · `#<slug>` (bản đồ thế giới) · `#<slug>--<idThếGiới>` (vùng đất) · `#<slug>--nhan-vat|hanh-trinh|cong-phap` (hồ sơ) · `#<slug>--3d` (vũ trụ 3D). Bộ định tuyến ở `js/app.js` (`router`, `show`).

## Bản đồ thế giới (`js/hinh-ve.js`, `app.js`)
SVG vẽ bằng JS (`el()`, `blob()` đường cong Catmull-Rom). Mỗi thế giới là một đảo theo `kind`, đặt ở `x,y`; tầng cao ở trên; đường hầm theo `links`.

## Bản đồ vùng (`js/ban-do-vung.js`)
- `renderRegion(w, opt)` vẽ một thế giới vào `#scene` (hoặc `opt.svg` cho màn 2D toàn cảnh mở từ 3D; `opt.sfx` đổi id gradient để không trùng).
- **Xếp chỗ không chồng nhau** (`layoutPlaces`): mỗi địa danh chiếm một hình chữ nhật (biểu tượng + tên); lãnh thổ đặt theo lưới neo; địa danh "thuộc" chọn ô gần lãnh thổ của mình; còn lại chọn ô xa các thứ đã đặt. Viền lãnh thổ bao lấy con của nó. Vùng `avoid` giữ chỗ cho khung cảnh giới và cổng không gian.
- **Hai lớp**: `markMinor` đánh dấu địa danh nhỏ; chúng được xếp bằng khung đã thu nhỏ (kích thước khi phóng 2,4×) và chỉ hiện khi phóng (`svg.lod-near`).
- Khung cảnh giới góc trên phải: `renderRealmBadge(w, box)`.

## Địa hình chân thật (`js/dia-hinh.js`)
- `reliefField(w, shape, box, spots, sea, MW=1000, MH=640)` → hàm độ cao `elev(x,y)`: nhiễu fBm + khoảng cách tới bờ + 2–3 dãy núi (tránh xa địa danh) + hồ ở chỗ trũng; `spots` san phẳng chỗ có thành (biển: nâng đảo/châu lục lên).
- `reliefPaint(F, x0,y0,w,h, W,H)` tô màu theo độ cao/độ ẩm (bảng `RPAL` theo kind), rừng có vân, vách đá theo độ dốc, ruộng + nhà quanh thành (`F.towns`), đổ bóng núi. Vẽ được bất kỳ vùng nào ở bất kỳ độ phân giải nào → dùng cho mảnh phóng to.
- `reliefRivers(F)` → sông chảy theo dốc (vẽ bằng SVG cho sắc nét), thác nước ở mép đảo.
- `reliefMap(...)` = ảnh nền cả bản đồ, lưu đệm theo thế giới. Lần đầu mỗi thế giới mất ~1–2 giây.

## Phóng to tới 10× (`js/thu-phong.js`)
`attachZoom(stage, svg)`: lăn chuột, chụm 2 ngón, kéo, nhấp đúp, nút. Biểu tượng/chữ co lại theo `z^-0.62` để không phình; viền dùng `vector-effect:non-scaling-stroke`; khi 1 đơn vị bản đồ > 1,7 px màn hình thì vẽ lại vùng đang xem bằng `reliefPaint` ở độ phân giải màn hình. `Z.focus(x,y,z)` để bay tới một địa danh.

## Hồ sơ (`js/ho-so.js`)
Thẻ nhân vật theo nhóm, biểu đồ tu vi theo chương (đường bậc thang + dải màu thế giới), thanh xếp hạng thiên hỏa, thẻ thu gọn (`.clamp`).

## Vũ trụ 3D (`js/the-gioi-3d.js`)
- Three.js r128 + OrbitControls, nạp từ CDN, lỗi thì dùng `js/vendor/`.
- `G` = hệ số phóng đảo; bán kính vòng mỗi tầng tự tính để đảo không chạm nhau (`RM`, `TIER_R`); `TIER_Y` = độ cao các tầng.
- Đảo: `islandMesh` (viền có mũi đất, chân đá) → `worldModel` theo kind → `factions3D` (đặt công trình theo cùng `layoutPlaces` của 2D) → `relief3D` thay mặt đảo bằng lưới nổi khối theo `reliefField`, vẽ dần từng đảo sau khi mở 3D (512 px), đảo đang chọn vẽ lại 896 px.
- Tương tác: bấm đảo → `select3D` bay tới, khung phải hiện thang cảnh giới, nút trái "Xem toàn cảnh" → `open2D` (bản đồ vùng toàn màn hình, phóng 10×). Chỉ hiện tên đại lục; tên khu vực xem trong 2D.
- Góc nhìn: nút tâm xoay theo tầng, nhấp đúp đặt tâm, kéo chuột phải dời tâm, cụm nút xoay (`orbit3D`: ⟲ ⟳ ↑ ↓, từ dưới, B/Đ/N/T, phím mũi tên), toàn màn hình.
- Trang trí: núi lửa, trùng động, vết nứt hư không, vành đai thiên thạch, đường hầm có dòng năng lượng.

## Khung thu gọn (`js/tien-ich.js`)
`foldify(el, key, nhãn)` thêm nút "− Thu gọn"/"▸ nhãn" vào đầu khung, nhớ trạng thái bằng localStorage. Gọi lại sau mỗi lần vẽ lại nội dung khung.

## Đổi giao diện cho truyện khác
- Màu chủ đạo: biến CSS ở `:root` trong `css/style.css`.
- Tên nút/nhãn tiếng Việt nằm ngay trong `index.html` và các file JS — tìm chuỗi rồi sửa.
- Tên nhân vật chính xuất hiện trong vài nhãn (ví dụ "Lâm Phong tại đây", "Hành trình của Lâm Phong") — tìm và đổi.
