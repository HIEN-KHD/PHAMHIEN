"""Trích các đoạn có chứa từ khóa trong những chương đã tải.

Cách dùng:  python tools/trich_doan.py thai-co-long-tuong-quyet "Minh giới|Địa phủ" [giới hạn] [số chương...]
"""
import glob, os, re, sys
from chung import thu_muc_truyen


def main():
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    slug, mau = sys.argv[1], sys.argv[2]
    gioi_han = int(sys.argv[3]) if len(sys.argv) > 3 else 20
    thu_muc = os.path.join(thu_muc_truyen(slug), "chuong")
    tep = [os.path.join(thu_muc, n.replace("~", "i") + ".txt") for n in sys.argv[4:]] or sorted(glob.glob(os.path.join(thu_muc, "*.txt")))
    da_thay, dem = set(), 0
    for f in tep:
        if not os.path.exists(f):
            continue
        for dong in open(f, encoding="utf-8").read().splitlines():
            if len(dong) > 40 and re.search(mau, dong, re.I) and dong[:60] not in da_thay:
                da_thay.add(dong[:60])
                print(f"[{os.path.basename(f)[:-4]}] {dong[:420]}")
                dem += 1
                if dem >= gioi_han:
                    return


if __name__ == "__main__":
    main()
