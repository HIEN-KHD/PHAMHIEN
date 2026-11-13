# Thần Võ Chiến Vương

Dự án riêng của truyện **Thần Võ Chiến Vương** — ứng dụng xem thế giới truyện (bản đồ 2D tổng quát → vùng đất → cảnh giới → hồ sơ → 3D).
Trang web: https://hien-khd.github.io/PHAMHIEN/than-vo-chien-vuong/  ·  Nguồn: https://metruyenchu.com.vn/than-vo-chien-vuong

Có dữ liệu: bản đồ thế giới, vùng đất, cảnh giới, nhân vật, hành trình, công pháp, vũ trụ 3D.

## Làm tiếp bằng skill `ung-dung-the-gioi-truyen`
Mở một phiên Claude Code trong thư mục này và nói: *"dùng skill ung-dung-the-gioi-truyen làm bản đồ truyện Thần Võ Chiến Vương"*. Các lệnh chính (chạy trong thư mục `than-vo-chien-vuong/`):

```bash
python tools/tai_danh_sach_chuong.py than-vo-chien-vuong          # danh sách chương -> du-lieu/than-vo-chien-vuong/danh-sach-chuong.tsv
python tools/tai_chuong.py than-vo-chien-vuong $(seq 1 20 8000)   # chương mẫu rải đều (chạy nền)
python tools/tim_dia_danh.py than-vo-chien-vuong 40               # gợi ý địa danh theo từng thế giới
python tools/trich_doan.py than-vo-chien-vuong "đại lục|giới" 20  # trích đoạn
python tools/tao_lien_ket_chuong.py than-vo-chien-vuong           # số chương -> link
python tools/tinh_quy_mo.py than-vo-chien-vuong                   # quy mô địa danh
python tools/build.py                                # dist/than-vo-chien-vuong.html (một file)
```

Dữ liệu truyện nằm trong `js/truyen/than-vo-chien-vuong*.js`; phần vẽ (`js/*.js`, `css/`) là bộ máy dùng chung, chép sẵn vào dự án.
