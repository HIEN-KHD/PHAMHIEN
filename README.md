# Thư viện truyện

Ứng dụng web xem chi tiết các truyện tôi đọc. Hiện có truyện đầu tiên: **Thái Cổ Long Tượng Quyết** (Vượng Tử Lão Man Đầu).

Ứng dụng có ba màn:

1. **Thư viện**: bìa các truyện.
2. **Bản đồ**: các thế giới và đường hầm không gian. Rê chuột để xem trước, bấm để vào.
3. **Thế giới**: bản đồ vùng có quốc gia, vùng/vực, gia tộc, tông môn, chủng tộc, thành trì, hiểm địa và bảo vật (bấm để xem chi tiết, lọc theo loại); khung cảnh giới ở góc trên bên phải; hồ sơ thế giới theo lời truyện (có số chương); tháp cảnh giới và cách đột phá.

Không cần cài đặt gì: mở `index.html` bằng trình duyệt là chạy.

## Cấu trúc

```
index.html                     Khung trang (3 màn)
css/style.css                  Giao diện
js/canh-gioi.js                Hệ thống cảnh giới: tên, phân tầng, đặc điểm, cách đột phá, kiếp, chương
js/truyen/<slug>.js            Dữ liệu một truyện: thế giới, đường hầm, hồ sơ
js/truyen/<slug>.dia-danh.js   Quốc gia, gia tộc, thế lực… của từng thế giới (kèm số chương)
js/truyen/<slug>.chuong.js     Bảng liên kết chương, tạo tự động — không sửa tay
js/ban-do-vung.js              Vẽ bản đồ vùng của một thế giới và sắp xếp địa danh không chồng nhau
js/tien-ich.js                 Hàm tiện ích nhỏ
js/hinh-ve.js                  Vẽ SVG: đảo bay, núi, mặt trời, sao, hiệu ứng mờ và phát sáng
js/app.js                      Logic 3 màn và điều hướng theo #hash
tools/                         Công cụ thu thập dữ liệu và build (Python 3, không cần thư viện ngoài)
du-lieu/<slug>/                Danh sách chương đã tải; thư mục chuong/ không đưa lên git
dist/thu-vien-truyen.html      Bản gộp 1 file, tạo bằng tools/build.py
```

Thứ tự nạp script trong `index.html` quan trọng: dữ liệu → tiện ích → hình vẽ → ứng dụng.

## Công cụ

Chạy từ thư mục gốc dự án:

```bash
python tools/tai_danh_sach_chuong.py thai-co-long-tuong-quyet
```

Tải danh sách tên chương (11.341 dòng) vào `du-lieu/thai-co-long-tuong-quyet/danh-sach-chuong.tsv`.

```bash
python tools/tim_chuong.py thai-co-long-tuong-quyet "đột phá|kiếp"
```

Tìm chương theo tên. Chương không ghi số trong tên được đánh số tạm theo vị trí, dạng `~1543`.

```bash
python tools/tai_chuong.py thai-co-long-tuong-quyet 839 2883 ~1543
```

Tải nội dung các chương đó vào `du-lieu/<slug>/chuong/`.

```bash
python tools/trich_doan.py thai-co-long-tuong-quyet "Minh giới|Địa phủ" 20
```

Trích các đoạn chứa từ khóa trong những chương đã tải.

```bash
python tools/tao_lien_ket_chuong.py thai-co-long-tuong-quyet
```

Quét dữ liệu, tìm mọi số chương được trích dẫn và tạo lại `js/truyen/<slug>.chuong.js`. Chạy sau mỗi lần thêm số chương mới.

```bash
python tools/build.py
```

Gộp HTML, CSS và JS thành `dist/thu-vien-truyen.html` để gửi người khác hoặc đăng làm artifact.

## Thêm địa danh

Mở `js/truyen/<slug>.dia-danh.js`, thêm một dòng vào thế giới tương ứng:

```js
['gia','Tên gia tộc','Mô tả ngắn theo truyện.',[1234,'~1441'],'Tên vùng chứa nó']
```

Loại: `quoc` quốc gia, `vung` vùng/vực, `thanh` thành trì, `gia` gia tộc, `tong` tông môn/thế lực, `toc` chủng tộc, `dao` đảo, `hiem` hiểm địa/bí cảnh, `bau` bảo vật. Phần tử cuối (không bắt buộc) là tên một `quoc`/`vung` trong cùng thế giới; địa danh sẽ được vẽ trong vùng đó. Bản đồ tự sắp xếp, không cần toạ độ. Sau đó chạy `tools/tao_lien_ket_chuong.py`.

## Thêm truyện mới

1. Tạo `js/truyen/<slug>.js` theo mẫu của Thái Cổ Long Tượng Quyết, rồi thêm truyện vào mảng `STORIES` (hiện `STORIES` được khai báo trong file truyện đầu tiên; khi có truyện thứ hai nên chuyển sang `STORIES.push(...)`).
2. Thêm thẻ `<script src="js/truyen/<slug>.js">` vào `index.html`, sau `canh-gioi.js`.
3. Mỗi thế giới cần: `id`, `name`, `tier` (1–4), toạ độ `x`, `y` trên bản đồ 820×960, `kind` (kiểu hình vẽ trong `js/hinh-ve.js`), `r` (khoảng cảnh giới), `about`, `quote`, `secs`.
4. Hệ thống cảnh giới hiện dùng chung cho mọi truyện. Truyện có hệ thống khác thì cần tách `REALMS` theo truyện.

## Nguồn và độ tin cậy

- Lời truyện: bản convert trên [metruyenchu.com.vn](https://metruyenchu.com.vn/thai-co-long-tuong-quyet). Mỗi thông tin trong hồ sơ thế giới đều ghi số chương.
- Nhãn trong ứng dụng: **theo truyện** (tóm tắt từ chương), **bách khoa** (từ bách khoa trên web), **diễn giải** (suy ra từ tên gọi), **ước lượng** (chưa có chương xác nhận).
- Đã đọc khoảng 440 chương: mẫu cứ 40 chương một lần để dựng mạch truyện, cộng các chương giới thiệu từng thế lực. Còn thiếu cách đột phá của Hư Thần, Thánh Đế, Đế Chủ, Thiên Tiên, Thánh cảnh; cảnh giới ở Thiên Giới vẫn là ước lượng.
- Ghi chú người dùng lưu trong `localStorage` của trình duyệt, không đồng bộ giữa các máy.
