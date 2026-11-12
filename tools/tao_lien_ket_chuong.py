"""Quét dữ liệu truyện, tìm mọi số chương được trích dẫn và tạo bảng liên kết tới trang chương.

Cách dùng:  python tools/tao_lien_ket_chuong.py thai-co-long-tuong-quyet
Kết quả:    js/truyen/<slug>.chuong.js  (const CH = {"số chương": "/đường-dẫn"})
"""
import glob, json, os, re, sys
from chung import doc_danh_sach

GOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    slug = sys.argv[1]
    _, chi_muc = doc_danh_sach(slug)
    tep = [os.path.join(GOC, "js", "canh-gioi.js")] + [
        f for f in glob.glob(os.path.join(GOC, "js", "truyen", slug + "*.js")) if not f.endswith(".chuong.js")]
    so = set()
    for f in tep:
        t = open(f, encoding="utf-8").read()
        for m in re.finditer(r"\[((?:\s*(?:'~?\d+'|\d+)\s*,?)+)\]", t):
            so.update(x.strip().strip("'") for x in m.group(1).split(",") if x.strip())
        so.update(re.findall(r"lf:(\d+)", t))
        so.update(re.findall(r"quote:\[\s*'(?:[^'\\]|\\.)*'\s*,\s*'?(~?\d+)'?\]", t))
    ch, thieu = {}, []
    for n in sorted((x for x in so if int(x.lstrip("~")) > 0), key=lambda x: int(x.lstrip("~"))):
        muc = chi_muc.get(n) or (chi_muc.get("~" + n) if not n.startswith("~") else None)
        if muc and muc[1].startswith("/"):
            ch[n] = muc[1]
        else:
            thieu.append(n)
    ra = os.path.join(GOC, "js", "truyen", slug + ".chuong.js")
    open(ra, "w", encoding="utf-8").write(
        "/* Tạo tự động bởi tools/tao_lien_ket_chuong.py — không sửa tay */\nconst CH=" + json.dumps(ch, ensure_ascii=False) + ";\n")
    print(f"{len(ch)} liên kết chương → {ra}" + (f"; không tìm thấy: {', '.join(thieu)}" if thieu else ""))


if __name__ == "__main__":
    main()
