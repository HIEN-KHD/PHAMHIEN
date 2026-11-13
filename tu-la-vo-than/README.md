# Tu La Võ Thần

Dự án riêng của truyện **Tu La Võ Thần** — ứng dụng xem thế giới truyện (bản đồ 2D tổng quát → vùng đất → cảnh giới → hồ sơ → 3D).
Trang web: https://hien-khd.github.io/PHAMHIEN/tu-la-vo-than/  ·  Nguồn: https://metruyenchu.com.vn/tu-la-vo-than-tu-la-vu-than-truyen-chu

Đã dựng bản đồ từ 230 chương mẫu rải đều: 12 thế giới, 106 địa danh, 17 cảnh giới, 23 nhân vật.

## Làm tiếp bằng skill `ung-dung-the-gioi-truyen`
Mở một phiên Claude Code trong thư mục này và nói: *"dùng skill ung-dung-the-gioi-truyen làm bản đồ truyện Tu La Võ Thần"*. Các lệnh chính (chạy trong thư mục `tu-la-vo-than/`):

```bash
python tools/tai_danh_sach_chuong.py tu-la-vo-than-tu-la-vu-than-truyen-chu          # danh sách chương -> du-lieu/tu-la-vo-than-tu-la-vu-than-truyen-chu/danh-sach-chuong.tsv
python tools/tai_chuong.py tu-la-vo-than-tu-la-vu-than-truyen-chu $(seq 1 20 8000)   # chương mẫu rải đều (chạy nền)
python tools/tim_dia_danh.py tu-la-vo-than-tu-la-vu-than-truyen-chu 40               # gợi ý địa danh theo từng thế giới
python tools/trich_doan.py tu-la-vo-than-tu-la-vu-than-truyen-chu "đại lục|giới" 20  # trích đoạn
python tools/tao_lien_ket_chuong.py tu-la-vo-than-tu-la-vu-than-truyen-chu           # số chương -> link
python tools/tinh_quy_mo.py tu-la-vo-than-tu-la-vu-than-truyen-chu                   # quy mô địa danh
python tools/build.py                                # dist/tu-la-vo-than.html (một file)
```

Dữ liệu truyện nằm trong `js/truyen/tu-la-vo-than-tu-la-vu-than-truyen-chu*.js`; phần vẽ (`js/*.js`, `css/`) là bộ máy dùng chung, chép sẵn vào dự án.
