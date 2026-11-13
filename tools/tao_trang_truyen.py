"""Tạo một dự án (thư mục + trang riêng) cho mỗi truyện: <slug>/index.html chỉ nạp dữ liệu của truyện đó,
dùng chung bộ máy ../css, ../js. Trang GitHub Pages: .../PHAMHIEN/<slug>/

Cách dùng:  python tools/tao_trang_truyen.py            (tất cả truyện trong js/truyen/)
            python tools/tao_trang_truyen.py <slug> ...  (chỉ các truyện chỉ định)
"""
import os, re, sys

GOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRUYEN = os.path.join(GOC, "js", "truyen")


def ds_truyen():
    return sorted(f[:-3] for f in os.listdir(TRUYEN) if f.endswith(".js") and f.count(".") == 1)


def tao(slug, mau):
    # Bỏ mọi file dữ liệu truyện trong mẫu, chèn lại đúng các file của truyện này
    the = [f'<script src="js/truyen/{slug}{d}.js"></script>' for d in (".quy-mo", "", ".chuong", ".dia-danh", ".ho-so")
           if os.path.exists(os.path.join(TRUYEN, f"{slug}{d}.js"))]
    s = re.sub(r'<script src="js/truyen/[^"]+"></script>\n', "", mau)
    s = s.replace('<script src="js/chung.js"></script>\n',
                  '<script src="js/chung.js"></script>\n' + "\n".join(the) + "\n", 1)
    s = re.sub(r'(href|src)="(css|js)/', r'\1="../\2/', s)
    m = re.search(r"title:'([^']+)'", open(os.path.join(TRUYEN, slug + ".js"), encoding="utf-8").read())
    if m:
        s = re.sub(r"<title>[^<]*</title>", f"<title>{m.group(1)}</title>", s, count=1)
    s = s.replace("<head>", "<head>\n<script>window.GOC='../'</script>", 1)
    d = os.path.join(GOC, slug)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(s)
    print(f"Đã tạo {slug}/index.html")


def main():
    mau = open(os.path.join(GOC, "index.html"), encoding="utf-8").read()
    for slug in sys.argv[1:] or ds_truyen():
        tao(slug, mau)


if __name__ == "__main__":
    main()
