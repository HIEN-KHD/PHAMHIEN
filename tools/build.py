"""Gộp trang, CSS và JS thành một file HTML duy nhất, mở được trực tiếp bằng trình duyệt hoặc đăng làm artifact.

Cách dùng:  python tools/build.py            -> dist/thu-vien-truyen.html (thư viện mọi truyện)
            python tools/build.py <slug> ... -> dist/<slug>.html (dự án riêng từng truyện, từ <slug>/index.html)
            python tools/build.py --tat-ca  -> thư viện + mọi dự án truyện
"""
import os, re

GOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def doc(p):
    return open(os.path.join(GOC, p), encoding="utf-8").read()


def gop(nguon, ten):
    trang = doc(nguon).replace("<script>window.GOC='../'</script>\n", "")
    trang = re.sub(r'<link rel="stylesheet" href="(?:\.\./)?(css/[^"]+)">',
                   lambda m: "<style>\n" + doc(m.group(1)) + "</style>", trang)
    trang = re.sub(r'<script src="(?:\.\./)?(js/[^"]+)"></script>',
                   lambda m: "<script>\n" + doc(m.group(1)) + "</script>", trang)
    os.makedirs(os.path.join(GOC, "dist"), exist_ok=True)
    ra = os.path.join(GOC, "dist", ten)
    open(ra, "w", encoding="utf-8").write(trang)
    print(f"Đã tạo {ra} ({len(trang.encode()) // 1024} KB)")


def main():
    import sys
    ds = sys.argv[1:]
    if "--tat-ca" in ds:
        ds = sorted(d for d in os.listdir(GOC) if os.path.isfile(os.path.join(GOC, d, "index.html")))
        gop("index.html", "thu-vien-truyen.html")
    elif not ds:
        gop("index.html", "thu-vien-truyen.html")
    for slug in ds:
        gop(f"{slug}/index.html", f"{slug}.html")


if __name__ == "__main__":
    main()
