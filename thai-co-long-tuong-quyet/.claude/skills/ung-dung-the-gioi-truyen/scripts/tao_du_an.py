"""Tạo dự án mới từ khung ứng dụng mẫu (assets/mau-ung-dung) và các công cụ trong scripts/.

Cách dùng:
    python tao_du_an.py <thư-mục-dự-án-mới> <slug-truyện-mới> ["Tên truyện"] [--vendor]

- Chép khung ứng dụng (index.html, css/, js/) và công cụ (tools/*.py) sang thư mục mới.
- Đổi tên các file dữ liệu js/truyen/<slug-mẫu>.*.js thành <slug-mới>.*.js và sửa index.html cho khớp.
- Dữ liệu bên trong vẫn là ví dụ của truyện mẫu: chạy được ngay để xem, sau đó viết lại từng file
  (xem references/du-lieu.md).
- --vendor: tải Three.js r128 + OrbitControls về js/vendor/ để 3D chạy cả khi mạng chặn CDN.
"""
import os, re, shutil, sys, urllib.request

SKILL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAU = os.path.join(SKILL, "assets", "mau-ung-dung")
SLUG_MAU = "thai-co-long-tuong-quyet"
VENDOR = [("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", "three.min.js"),
          ("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js", "OrbitControls.js")]


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) < 2:
        raise SystemExit(__doc__)
    dich, slug = os.path.abspath(args[0]), args[1]
    ten = args[2] if len(args) > 2 else None
    if os.path.exists(dich) and os.listdir(dich):
        raise SystemExit(f"{dich} đã có nội dung, chọn thư mục trống.")
    shutil.copytree(MAU, dich, dirs_exist_ok=True)
    os.makedirs(os.path.join(dich, "tools"), exist_ok=True)
    for f in os.listdir(os.path.dirname(os.path.abspath(__file__))):
        if f.endswith(".py") and f != "tao_du_an.py":
            shutil.copy(os.path.join(os.path.dirname(os.path.abspath(__file__)), f), os.path.join(dich, "tools", f))
    tdir = os.path.join(dich, "js", "truyen")
    for f in os.listdir(tdir):
        if f.startswith(SLUG_MAU):
            moi = os.path.join(tdir, slug + f[len(SLUG_MAU):])
            os.rename(os.path.join(tdir, f), moi)
            # CHAP['<slug>'], SIZES['<slug>'], id:'<slug>' trong dữ liệu cũng đổi theo
            noi = open(moi, encoding="utf-8").read().replace(SLUG_MAU, slug)
            open(moi, "w", encoding="utf-8").write(noi)
    p = os.path.join(dich, "index.html")
    s = open(p, encoding="utf-8").read().replace(SLUG_MAU, slug)
    open(p, "w", encoding="utf-8").write(s)
    p = os.path.join(tdir, slug + ".js")
    s = open(p, encoding="utf-8").read().replace(f"id:'{SLUG_MAU}'", f"id:'{slug}'")
    if ten:
        s = re.sub(r"title:'[^']*'", f"title:'{ten}'", s, count=1)
    open(p, "w", encoding="utf-8").write(s)
    open(os.path.join(dich, ".gitignore"), "w", encoding="utf-8").write(
        "# Nội dung chương tải về chỉ dùng để tra cứu trên máy, không đưa lên git\ndu-lieu/*/chuong/\n__pycache__/\n*.pyc\n.DS_Store\n")
    if "--vendor" in sys.argv:
        vd = os.path.join(dich, "js", "vendor")
        os.makedirs(vd, exist_ok=True)
        for url, f in VENDOR:
            try:
                urllib.request.urlretrieve(url, os.path.join(vd, f))
            except Exception as e:  # noqa: BLE001
                print(f"Không tải được {f}: {e} (3D vẫn dùng CDN khi có mạng)")
    print(f"Đã tạo {dich}\nMở {os.path.join(dich, 'index.html')}#{slug} để xem. Tiếp theo: sửa tools/chung.py (GOC, cách bóc nội dung) cho trang nguồn mới.")


if __name__ == "__main__":
    main()
