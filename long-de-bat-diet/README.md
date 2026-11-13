# Long Đế Bất Diệt

Dự án riêng của truyện **Long Đế Bất Diệt** — ứng dụng xem thế giới truyện (bản đồ 2D tổng quát → vùng đất → cảnh giới → hồ sơ → 3D).
Trang web: https://hien-khd.github.io/PHAMHIEN/long-de-bat-diet/  ·  Nguồn: chưa có — cần link truyện

**Chưa có dữ liệu** — trang hiện khung trống. Làm theo các bước dưới để tải truyện và dựng bản đồ.

## Làm tiếp bằng skill `ung-dung-the-gioi-truyen`
Mở một phiên Claude Code trong thư mục này và nói: *"dùng skill ung-dung-the-gioi-truyen làm bản đồ truyện Long Đế Bất Diệt"*. Các lệnh chính (chạy trong thư mục `long-de-bat-diet/`):

```bash
python tools/tai_danh_sach_chuong.py long-de-bat-diet          # danh sách chương -> du-lieu/long-de-bat-diet/danh-sach-chuong.tsv
python tools/tai_chuong.py long-de-bat-diet $(seq 1 20 8000)   # chương mẫu rải đều (chạy nền)
python tools/tim_dia_danh.py long-de-bat-diet 40               # gợi ý địa danh theo từng thế giới
python tools/trich_doan.py long-de-bat-diet "đại lục|giới" 20  # trích đoạn
python tools/tao_lien_ket_chuong.py long-de-bat-diet           # số chương -> link
python tools/tinh_quy_mo.py long-de-bat-diet                   # quy mô địa danh
python tools/build.py                                # dist/long-de-bat-diet.html (một file)
```

Dữ liệu truyện nằm trong `js/truyen/long-de-bat-diet*.js`; phần vẽ (`js/*.js`, `css/`) là bộ máy dùng chung, chép sẵn vào dự án.
