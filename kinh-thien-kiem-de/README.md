# Kình Thiên Kiếm Đế

Dự án riêng của truyện **Kình Thiên Kiếm Đế** — ứng dụng xem thế giới truyện (bản đồ 2D tổng quát → vùng đất → cảnh giới → hồ sơ → 3D).
Trang web: https://hien-khd.github.io/PHAMHIEN/kinh-thien-kiem-de/  ·  Nguồn: https://metruyenchu.com.vn/kinh-thien-kiem-de

**Chưa có dữ liệu** — trang hiện khung trống. Làm theo các bước dưới để tải truyện và dựng bản đồ.

## Làm tiếp bằng skill `ung-dung-the-gioi-truyen`
Mở một phiên Claude Code trong thư mục này và nói: *"dùng skill ung-dung-the-gioi-truyen làm bản đồ truyện Kình Thiên Kiếm Đế"*. Các lệnh chính (chạy trong thư mục `kinh-thien-kiem-de/`):

```bash
python tools/tai_danh_sach_chuong.py kinh-thien-kiem-de          # danh sách chương -> du-lieu/kinh-thien-kiem-de/danh-sach-chuong.tsv
python tools/tai_chuong.py kinh-thien-kiem-de $(seq 1 20 8000)   # chương mẫu rải đều (chạy nền)
python tools/tim_dia_danh.py kinh-thien-kiem-de 40               # gợi ý địa danh theo từng thế giới
python tools/trich_doan.py kinh-thien-kiem-de "đại lục|giới" 20  # trích đoạn
python tools/tao_lien_ket_chuong.py kinh-thien-kiem-de           # số chương -> link
python tools/tinh_quy_mo.py kinh-thien-kiem-de                   # quy mô địa danh
python tools/build.py                                # dist/kinh-thien-kiem-de.html (một file)
```

Dữ liệu truyện nằm trong `js/truyen/kinh-thien-kiem-de*.js`; phần vẽ (`js/*.js`, `css/`) là bộ máy dùng chung, chép sẵn vào dự án.
