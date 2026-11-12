"""Tải toàn bộ danh sách tên chương của một truyện.

Cách dùng:  python tools/tai_danh_sach_chuong.py thai-co-long-tuong-quyet
Kết quả:    du-lieu/<slug>/danh-sach-chuong.tsv  (tên chương <TAB> đường dẫn)
"""
import html, json, os, re, sys, time
from chung import GOC, tai, thu_muc_truyen


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    slug = sys.argv[1]
    trang = tai(f"{GOC}/{slug}")
    m = re.search(r"page\((\d+),\s*(\d+)\);'>Cuối", trang) or re.search(r"page\((\d+),\s*(\d+)\)", trang)
    if not m:
        raise SystemExit("Không tìm thấy phân trang danh sách chương trên trang truyện.")
    ma = m.group(1)
    so_trang = max(int(x) for x in re.findall(rf"page\({ma},\s*(\d+)\)", trang))
    print(f"Mã danh sách {ma}, {so_trang} trang")
    hang = []
    for p in range(1, so_trang + 1):
        d = json.loads(tai(f"{GOC}/get/listchap/{ma}?page={p}"))["data"]
        hang += [(html.unescape(t).strip(), h) for h, t in re.findall(r"href='([^']+)'>([^<]+)</a>", d)]
        print(f"\rTrang {p}/{so_trang}: {len(hang)} chương", end="", flush=True)
        time.sleep(0.3)
    f = os.path.join(thu_muc_truyen(slug), "danh-sach-chuong.tsv")
    open(f, "w", encoding="utf-8").write("\n".join(f"{t}\t{h}" for t, h in hang))
    print(f"\nĐã lưu {f}")


if __name__ == "__main__":
    main()
