# Siêu Duy Thuật Sĩ

Dự án riêng của truyện **Siêu Duy Thuật Sĩ** — ứng dụng xem thế giới truyện (bản đồ 2D tổng quát → vùng đất → cảnh giới → hồ sơ → 3D).
Trang web: https://hien-khd.github.io/PHAMHIEN/sieu-duy-thuat-si/  ·  Nguồn: https://metruyenchu.com.vn/sieu-duy-thuat-si

**Chưa có dữ liệu** — trang hiện khung trống. Làm theo các bước dưới để tải truyện và dựng bản đồ.

## Làm tiếp bằng skill `ung-dung-the-gioi-truyen`
Mở một phiên Claude Code trong thư mục này và nói: *"dùng skill ung-dung-the-gioi-truyen làm bản đồ truyện Siêu Duy Thuật Sĩ"*. Các lệnh chính (chạy trong thư mục `sieu-duy-thuat-si/`):

```bash
python tools/tai_danh_sach_chuong.py sieu-duy-thuat-si          # danh sách chương -> du-lieu/sieu-duy-thuat-si/danh-sach-chuong.tsv
python tools/tai_chuong.py sieu-duy-thuat-si $(seq 1 20 8000)   # chương mẫu rải đều (chạy nền)
python tools/tim_dia_danh.py sieu-duy-thuat-si 40               # gợi ý địa danh theo từng thế giới
python tools/trich_doan.py sieu-duy-thuat-si "đại lục|giới" 20  # trích đoạn
python tools/tao_lien_ket_chuong.py sieu-duy-thuat-si           # số chương -> link
python tools/tinh_quy_mo.py sieu-duy-thuat-si                   # quy mô địa danh
python tools/build.py                                # dist/sieu-duy-thuat-si.html (một file)
```

Dữ liệu truyện nằm trong `js/truyen/sieu-duy-thuat-si*.js`; phần vẽ (`js/*.js`, `css/`) là bộ máy dùng chung, chép sẵn vào dự án.
