"""Tải nội dung một số chương về máy để đọc và trích dẫn.

Cách dùng:  python tools/tai_chuong.py thai-co-long-tuong-quyet 1 49 839 ~1543
            (số có dấu ~ là chương không ghi số trong tên, đánh theo vị trí)
Kết quả:    du-lieu/<slug>/chuong/<số>.txt  (thư mục này không đưa lên git)
"""
import os, re, sys, time
from chung import GOC, doc_danh_sach, html_sang_chu, tai, thu_muc_truyen


def main():
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    slug, cac_so = sys.argv[1], sys.argv[2:]
    _, chi_muc = doc_danh_sach(slug)
    thu_muc = os.path.join(thu_muc_truyen(slug), "chuong")
    os.makedirs(thu_muc, exist_ok=True)
    for n in cac_so:
        if n not in chi_muc:
            print(f"Bỏ qua {n}: không có trong danh sách chương")
            continue
        f = os.path.join(thu_muc, n.replace("~", "i") + ".txt")
        if os.path.exists(f):
            continue
        ten, duong_dan = chi_muc[n]
        if not duong_dan.startswith('/'):
            print(f"Bỏ qua {n}: chương không có liên kết")
            continue
        try:
            trang = tai(GOC + duong_dan)
        except Exception as e:  # noqa: BLE001
            print(f"Lỗi {n}: {e}")
            continue
        m = re.search(r'<div class="truyen">(.*?)<div class="chapter_control"', trang, re.S) or re.search(r'<div class="truyen">(.*)', trang, re.S)
        noi_dung = html_sang_chu(m.group(1)) if m else ""
        open(f, "w", encoding="utf-8").write(ten + "\n" + noi_dung)
        print(f"{n}: {len(noi_dung)} ký tự")
        time.sleep(0.3)


if __name__ == "__main__":
    main()
