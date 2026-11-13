"""Tìm chương theo tên (biểu thức chính quy, không phân biệt hoa thường).

Cách dùng:  python tools/tim_chuong.py thai-co-long-tuong-quyet "đột phá|kiếp" [giới hạn]
"""
import re, sys
from chung import doc_danh_sach, so_chuong


def main():
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    slug, mau = sys.argv[1], sys.argv[2]
    gioi_han = int(sys.argv[3]) if len(sys.argv) > 3 else 200
    hang, _ = doc_danh_sach(slug)
    kq = [(so_chuong(i, t), t) for i, (t, _) in enumerate(hang) if re.search(mau, t, re.I)]
    print(f"{len(kq)} chương khớp")
    for n, t in kq[:gioi_han]:
        print(f"{n:>7} | {t}")


if __name__ == "__main__":
    main()
