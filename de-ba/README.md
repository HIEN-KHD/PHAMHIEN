# Đế Bá

Dự án riêng của truyện **Đế Bá** — ứng dụng xem thế giới truyện (bản đồ 2D tổng quát → vùng đất → cảnh giới → hồ sơ → 3D).
Trang web: https://hien-khd.github.io/PHAMHIEN/de-ba/  ·  Nguồn: https://metruyenchu.com.vn/de-ba

**Chưa có dữ liệu** — trang hiện khung trống. Làm theo các bước dưới để tải truyện và dựng bản đồ.

## Làm tiếp bằng skill `ung-dung-the-gioi-truyen`
Mở một phiên Claude Code trong thư mục này và nói: *"dùng skill ung-dung-the-gioi-truyen làm bản đồ truyện Đế Bá"*. Các lệnh chính (chạy trong thư mục `de-ba/`):

```bash
python tools/tai_danh_sach_chuong.py de-ba          # danh sách chương -> du-lieu/de-ba/danh-sach-chuong.tsv
python tools/tai_chuong.py de-ba $(seq 1 20 8000)   # chương mẫu rải đều (chạy nền)
python tools/tim_dia_danh.py de-ba 40               # gợi ý địa danh theo từng thế giới
python tools/trich_doan.py de-ba "đại lục|giới" 20  # trích đoạn
python tools/tao_lien_ket_chuong.py de-ba           # số chương -> link
python tools/tinh_quy_mo.py de-ba                   # quy mô địa danh
python tools/build.py                                # dist/de-ba.html (một file)
```

Dữ liệu truyện nằm trong `js/truyen/de-ba*.js`; phần vẽ (`js/*.js`, `css/`) là bộ máy dùng chung, chép sẵn vào dự án.
