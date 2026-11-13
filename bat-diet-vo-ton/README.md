# Bất Diệt Võ Tôn

Dự án riêng của truyện **Bất Diệt Võ Tôn** — ứng dụng xem thế giới truyện (bản đồ 2D tổng quát → vùng đất → cảnh giới → hồ sơ → 3D).
Trang web: https://hien-khd.github.io/PHAMHIEN/bat-diet-vo-ton/  ·  Nguồn: https://metruyenchu.com.vn/bat-diet-vo-ton

Có dữ liệu: bản đồ thế giới, vùng đất, cảnh giới, nhân vật, hành trình, công pháp, vũ trụ 3D.

## Làm tiếp bằng skill `ung-dung-the-gioi-truyen`
Mở một phiên Claude Code trong thư mục này và nói: *"dùng skill ung-dung-the-gioi-truyen làm bản đồ truyện Bất Diệt Võ Tôn"*. Các lệnh chính (chạy trong thư mục `bat-diet-vo-ton/`):

```bash
python tools/tai_danh_sach_chuong.py bat-diet-vo-ton          # danh sách chương -> du-lieu/bat-diet-vo-ton/danh-sach-chuong.tsv
python tools/tai_chuong.py bat-diet-vo-ton $(seq 1 20 8000)   # chương mẫu rải đều (chạy nền)
python tools/tim_dia_danh.py bat-diet-vo-ton 40               # gợi ý địa danh theo từng thế giới
python tools/trich_doan.py bat-diet-vo-ton "đại lục|giới" 20  # trích đoạn
python tools/tao_lien_ket_chuong.py bat-diet-vo-ton           # số chương -> link
python tools/tinh_quy_mo.py bat-diet-vo-ton                   # quy mô địa danh
python tools/build.py                                # dist/bat-diet-vo-ton.html (một file)
```

Dữ liệu truyện nằm trong `js/truyen/bat-diet-vo-ton*.js`; phần vẽ (`js/*.js`, `css/`) là bộ máy dùng chung, chép sẵn vào dự án.
