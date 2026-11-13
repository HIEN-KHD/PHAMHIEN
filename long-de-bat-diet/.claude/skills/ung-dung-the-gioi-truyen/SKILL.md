---
name: ung-dung-the-gioi-truyen
description: Quy trình làm ứng dụng web xem chi tiết một bộ truyện (huyền huyễn, tiên hiệp, tu tiên, fantasy, game, tiểu thuyết dài) gồm thư viện bìa truyện, bản đồ thế giới nhiều tầng, bản đồ vùng đất có thế lực/tông môn/gia tộc/thành trì, hệ thống cảnh giới và cách đột phá, hồ sơ nhân vật/hành trình/công pháp, vũ trụ 3D xoay được, bản đồ địa hình chân thật phóng to 10 lần — dữ liệu lấy từ chính lời truyện, có số chương để kiểm chứng, lưu GitHub và đăng GitHub Pages. Dùng skill này mỗi khi người dùng muốn làm bản đồ/wiki/ứng dụng/trang xem cho một truyện, thế giới truyện, worldbuilding, cảnh giới tu luyện, thế lực trong truyện, hoặc nói "làm giống dự án truyện trước", "áp dụng quy trình cũ cho truyện khác", kể cả khi họ chỉ gửi link truyện, ảnh bản đồ phác tay hay nói "tạo ứng dụng xem truyện của tôi".
---

# Ứng dụng thế giới truyện

Skill này đóng gói quy trình đã làm ra ứng dụng *Thái Cổ Long Tượng Quyết* (repo mẫu: github.com/HIEN-KHD/phamhien, web: hien-khd.github.io/PHAMHIEN). Kết quả là một trang web tĩnh, không cần máy chủ:

- **Thư viện** bìa truyện → **Bản đồ thế giới** (các tầng, đường hầm nối thế giới) → **Vùng đất** (bản đồ địa hình, thế lực vẽ to theo quy mô, cảnh giới góc trên phải) → **Cảnh giới** (thang bậc, cách đột phá).
- **Hồ sơ**: nhân vật, hành trình nhân vật chính theo chương, công pháp & bảo vật.
- **Vũ trụ 3D**: đảo nổi theo tầng, mặt đảo nổi khối theo địa hình thật, nhiều nút xoay, bấm đảo → bay tới → nút "Xem toàn cảnh" mở bản đồ vùng.

Lý do cách làm này hiệu quả: dữ liệu tách khỏi phần vẽ (đổi truyện chỉ cần đổi dữ liệu), mọi thông tin có số chương (người dùng tin và kiểm được), và làm theo vòng ngắn có ảnh chụp (người dùng góp ý đúng chỗ).

## Bắt đầu nhanh

```bash
python <skill>/scripts/tao_du_an.py ~/du-an-moi <slug-truyen> "Tên truyện" --vendor
```

Lệnh này chép khung ứng dụng (`assets/mau-ung-dung/`) và công cụ (`scripts/*.py` → `tools/`). Dữ liệu bên trong vẫn là truyện mẫu để chạy được ngay; viết lại từng file theo `references/du-lieu.md`. Mở `index.html#<slug>` để xem.

## Quy trình 8 bước

Làm theo thứ tự; bước 5–7 lặp nhiều vòng. Báo người dùng ngắn gọn sau mỗi bước (họ thích câu trả lời ngắn, tiếng Việt, đi thẳng vào ý).

1. **Chốt mục tiêu và luồng màn hình.** Lấy từ lời người dùng (thường kèm ảnh phác tay): truyện nào, link nguồn, ai xem, bấm vào đâu ra gì. Nếu họ gửi ảnh phác, làm theo đúng bố cục trong ảnh. Làm ngay bản HTML đơn giản để có thứ mà xem.

2. **Lấy dữ liệu từ lời truyện, không viết theo trí nhớ.** Trong thư mục dự án:
   - `python tools/tai_danh_sach_chuong.py <slug>` → `du-lieu/<slug>/danh-sach-chuong.tsv`
   - `python tools/tai_chuong.py <slug> 1 25 50 …` → tải chương mẫu **rải đều theo từng giai đoạn** (mỗi thế giới ~25–40 chương), không chỉ phần đầu. Tải nhiều thì chạy nền.
   - `python tools/tim_chuong.py <slug> "đột phá|kiếp"` (tìm trong tên chương), `python tools/trich_doan.py <slug> "Minh giới|Địa phủ" 20` (đoạn văn), `python tools/tim_dia_danh.py <slug> 40` (tên tông/gia/thành/vực mới theo từng thế giới).
   - Đọc ngữ cảnh rồi mới thêm: nhiều "địa danh" tìm tự động thật ra là tên người (ví dụ "Huyền Thành đạo trưởng"), cảnh giới ("Đế tông") hay pháp bảo.
   - Mỗi mục: mô tả 1–2 câu, kèm `[số chương]`. Chạy `python tools/tao_lien_ket_chuong.py <slug>` để số chương thành link.
   - Nguồn khác metruyenchu: sửa `tools/chung.py` (`GOC`, cách bóc nội dung trong `tai_chuong.py`). Trang có captcha thì bỏ qua, đừng tìm cách vượt.

3. **Tách dữ liệu khỏi phần vẽ.** Dữ liệu chỉ nằm trong `js/truyen/<slug>.*.js` và `js/canh-gioi.js`; phần vẽ (`js/*.js`) dùng chung. Xem `references/du-lieu.md` cho từng trường.

4. **Git + GitHub từ ngày đầu.** Tạo repo, commit mỗi bước, bật GitHub Pages (Settings → Pages → nhánh main). Nếu bật bằng API bị chặn, hướng dẫn người dùng bật tay. Hỏi trước tên/email tác giả commit; repo công khai thì dùng email noreply của GitHub, không đưa email thật lên. Đừng ghi đè lịch sử đã đẩy nếu người dùng chưa đồng ý.

5. **Làm từng vòng ngắn, mỗi vòng một ý.** Thứ tự đã hiệu quả: bản đồ 2D → thêm dữ liệu → cảnh giới trên bản đồ → bớt chữ, thêm hình → thế lực lớn vẽ to → 3D → địa hình chân thật → phóng to 10× → đọc thêm truyện để thêm địa điểm nhỏ → nút thu gọn mọi khung. Khi người dùng nói chung chung ("chân thật lên", "to gấp 10 lần", "đẹp hơn"), chọn cách cụ thể nhất có thể làm được và nói rõ đã hiểu thế nào. Chi tiết kỹ thuật từng phần: `references/giao-dien.md`.

6. **Chụp ảnh, gửi kèm.** Sau mỗi vòng, chụp các màn liên quan (tự xem trước), gửi ảnh cho người dùng. Người dùng thường góp ý bằng ảnh chụp + một câu; sửa đúng chỗ đó, không đụng phần khác.

7. **Kiểm tra tự động trước khi báo.** `node <skill>/scripts/kiem_tra.js index.html` — lỗi JS mọi màn, nhãn chồng nhau ở 1× và 2,5×, tràn ngang ở 400px, chụp ảnh từng màn vào `anh-kiem-tra/`. Phải ra `OK` (hoặc nói rõ phần nào còn lỗi). Playwright cần sẵn trong máy; 3D chạy bằng swiftshader.

8. **Đóng gói và phát hành.** `python tools/build.py` → `dist/thu-vien-truyen.html` (một file, gửi được, đăng artifact được). Commit, đẩy GitHub (web tự cập nhật sau 1–2 phút), cập nhật artifact nếu có, tạo zip bằng `git archive`. Cập nhật README khi thêm công cụ.

## Nguyên tắc nội dung

- **Ít chữ, nhiều hình.** Người dùng đã nói "quá nhiều chữ" — mô tả ngắn, còn lại thể hiện bằng bản đồ, thanh quy mô, biểu đồ, màu sắc.
- **Thứ to vẽ to.** Mỗi địa danh có quy mô 1–5; quốc gia/vùng là lãnh thổ có viền; địa danh nhỏ chỉ hiện khi phóng to.
- **Có nguồn.** Không bịa địa danh hay sự kiện; thiếu dữ liệu thì ghi "chưa ghi" hoặc đánh dấu "ước lượng". Gán địa danh vào thế giới theo khoảng chương có thể nhầm — nói rõ với người dùng để họ báo chỗ sai.
- **Cảnh giới ở mọi nơi cần.** Góc trên phải của bản đồ vùng, góc phải của 3D khi chọn một thế giới.
- **Mọi khung thu gọn được** (`foldify()` trong `js/tien-ich.js`), và xem được trên điện thoại.

## Khi gặp giới hạn môi trường

| Tình huống | Cách xử lý |
| --- | --- |
| Mạng chặn CDN (Three.js) | Dùng bản trong `js/vendor/` (tạo bằng `--vendor`) — ứng dụng tự chuyển sang |
| Mạng chặn trang nguồn | Xin mở đúng tên miền cần dùng, giải thích lý do |
| Máy làm việc khởi động lại | Mọi thứ đã commit/đẩy thì không mất; nhớ đẩy thường xuyên |
| Yêu cầu không làm được đúng nghĩa (đảo 3D to 10 lần sẽ chồng nhau) | Làm phương án gần nhất (phóng tới 10×, góc nhìn gần hơn, toàn màn hình) và nói thẳng |

Bài học chi tiết và lỗi đã gặp: `references/bai-hoc.md`.

## Tài nguyên trong skill

- `scripts/tao_du_an.py` — tạo dự án mới từ khung mẫu.
- `scripts/kiem_tra.js` — kiểm tra tự động + chụp ảnh.
- `scripts/*.py` — công cụ tải/tìm dữ liệu, tạo link chương, ước lượng quy mô, đóng gói (được chép vào `tools/` của dự án).
- `assets/mau-ung-dung/` — khung ứng dụng đầy đủ (dữ liệu truyện mẫu làm ví dụ).
- `references/du-lieu.md` — định dạng mọi file dữ liệu.
- `references/giao-dien.md` — cách từng màn hình hoạt động và chỗ cần sửa.
- `references/bai-hoc.md` — lỗi đã gặp, cách tránh, cách người dùng thường góp ý.
