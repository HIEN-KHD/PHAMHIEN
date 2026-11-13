# Cửu Tinh Bá Thể Quyết

Dự án riêng của truyện **Cửu Tinh Bá Thể Quyết** — ứng dụng xem thế giới truyện (bản đồ 2D tổng quát → vùng đất → cảnh giới → hồ sơ → 3D).
Trang web: https://hien-khd.github.io/PHAMHIEN/cuu-tinh-ba-the-quyet/  ·  Nguồn: https://metruyenchu.com.vn/cuu-tinh-ba-the-quyet

**Chưa có dữ liệu** — trang hiện khung trống. Làm theo các bước dưới để tải truyện và dựng bản đồ.

## Làm tiếp bằng skill `ung-dung-the-gioi-truyen`
Mở một phiên Claude Code trong thư mục này và nói: *"dùng skill ung-dung-the-gioi-truyen làm bản đồ truyện Cửu Tinh Bá Thể Quyết"*. Các lệnh chính (chạy trong thư mục `cuu-tinh-ba-the-quyet/`):

```bash
python tools/tai_danh_sach_chuong.py cuu-tinh-ba-the-quyet          # danh sách chương -> du-lieu/cuu-tinh-ba-the-quyet/danh-sach-chuong.tsv
python tools/tai_chuong.py cuu-tinh-ba-the-quyet $(seq 1 20 8000)   # chương mẫu rải đều (chạy nền)
python tools/tim_dia_danh.py cuu-tinh-ba-the-quyet 40               # gợi ý địa danh theo từng thế giới
python tools/trich_doan.py cuu-tinh-ba-the-quyet "đại lục|giới" 20  # trích đoạn
python tools/tao_lien_ket_chuong.py cuu-tinh-ba-the-quyet           # số chương -> link
python tools/tinh_quy_mo.py cuu-tinh-ba-the-quyet                   # quy mô địa danh
python tools/build.py                                # dist/cuu-tinh-ba-the-quyet.html (một file)
```

Dữ liệu truyện nằm trong `js/truyen/cuu-tinh-ba-the-quyet*.js`; phần vẽ (`js/*.js`, `css/`) là bộ máy dùng chung, chép sẵn vào dự án.
