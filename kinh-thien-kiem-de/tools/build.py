"""Gộp index.html, CSS và JS thành một file HTML duy nhất: dist/<tên dự án>.html (mở trực tiếp, gửi đi, đăng artifact).

Cách dùng:  python tools/build.py
"""
import os, re

GOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def doc(p):
    return open(os.path.join(GOC, p), encoding="utf-8").read()


def main():
    trang = doc("index.html")
    trang = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">', lambda m: "<style>\n" + doc(m.group(1)) + "</style>", trang)
    trang = re.sub(r'<script src="(js/[^"]+)"></script>', lambda m: "<script>\n" + doc(m.group(1)) + "</script>", trang)
    os.makedirs(os.path.join(GOC, "dist"), exist_ok=True)
    ra = os.path.join(GOC, "dist", os.path.basename(GOC) + ".html")
    open(ra, "w", encoding="utf-8").write(trang)
    print(f"Đã tạo {ra} ({len(trang.encode()) // 1024} KB)")


if __name__ == "__main__":
    main()
