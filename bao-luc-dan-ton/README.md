# Bạo Lực Đan Tôn

Dự án riêng của truyện **Bạo Lực Đan Tôn** — ứng dụng xem thế giới truyện (bản đồ 2D tổng quát → vùng đất → cảnh giới → hồ sơ → 3D).
Trang web: https://hien-khd.github.io/PHAMHIEN/bao-luc-dan-ton/  ·  Nguồn: https://metruyenchu.com.vn/bao-luc-dan-ton

**Chưa có dữ liệu** — trang hiện khung trống. Làm theo các bước dưới để tải truyện và dựng bản đồ.

## Làm tiếp bằng skill `ung-dung-the-gioi-truyen`
Mở một phiên Claude Code trong thư mục này và nói: *"dùng skill ung-dung-the-gioi-truyen làm bản đồ truyện Bạo Lực Đan Tôn"*. Các lệnh chính (chạy trong thư mục `bao-luc-dan-ton/`):

```bash
python tools/tai_danh_sach_chuong.py bao-luc-dan-ton          # danh sách chương -> du-lieu/bao-luc-dan-ton/danh-sach-chuong.tsv
python tools/tai_chuong.py bao-luc-dan-ton $(seq 1 20 8000)   # chương mẫu rải đều (chạy nền)
python tools/tim_dia_danh.py bao-luc-dan-ton 40               # gợi ý địa danh theo từng thế giới
python tools/trich_doan.py bao-luc-dan-ton "đại lục|giới" 20  # trích đoạn
python tools/tao_lien_ket_chuong.py bao-luc-dan-ton           # số chương -> link
python tools/tinh_quy_mo.py bao-luc-dan-ton                   # quy mô địa danh
python tools/build.py                                # dist/bao-luc-dan-ton.html (một file)
```

Dữ liệu truyện nằm trong `js/truyen/bao-luc-dan-ton*.js`; phần vẽ (`js/*.js`, `css/`) là bộ máy dùng chung, chép sẵn vào dự án.
