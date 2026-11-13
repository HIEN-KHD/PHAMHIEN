# Thái Cổ Long Tượng Quyết

Dự án riêng của truyện **Thái Cổ Long Tượng Quyết** — ứng dụng xem thế giới truyện (bản đồ 2D tổng quát → vùng đất → cảnh giới → hồ sơ → 3D).
Trang web: https://hien-khd.github.io/PHAMHIEN/thai-co-long-tuong-quyet/  ·  Nguồn: https://metruyenchu.com.vn/thai-co-long-tuong-quyet

Có dữ liệu: bản đồ thế giới, vùng đất, cảnh giới, nhân vật, hành trình, công pháp, vũ trụ 3D.

## Làm tiếp bằng skill `ung-dung-the-gioi-truyen`
Mở một phiên Claude Code trong thư mục này và nói: *"dùng skill ung-dung-the-gioi-truyen làm bản đồ truyện Thái Cổ Long Tượng Quyết"*. Các lệnh chính (chạy trong thư mục `thai-co-long-tuong-quyet/`):

```bash
python tools/tai_danh_sach_chuong.py thai-co-long-tuong-quyet          # danh sách chương -> du-lieu/thai-co-long-tuong-quyet/danh-sach-chuong.tsv
python tools/tai_chuong.py thai-co-long-tuong-quyet $(seq 1 20 8000)   # chương mẫu rải đều (chạy nền)
python tools/tim_dia_danh.py thai-co-long-tuong-quyet 40               # gợi ý địa danh theo từng thế giới
python tools/trich_doan.py thai-co-long-tuong-quyet "đại lục|giới" 20  # trích đoạn
python tools/tao_lien_ket_chuong.py thai-co-long-tuong-quyet           # số chương -> link
python tools/tinh_quy_mo.py thai-co-long-tuong-quyet                   # quy mô địa danh
python tools/build.py                                # dist/thai-co-long-tuong-quyet.html (một file)
```

Dữ liệu truyện nằm trong `js/truyen/thai-co-long-tuong-quyet*.js`; phần vẽ (`js/*.js`, `css/`) là bộ máy dùng chung, chép sẵn vào dự án.
