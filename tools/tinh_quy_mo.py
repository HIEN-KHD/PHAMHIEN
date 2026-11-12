"""Ước lượng quy mô (1–5) của mỗi địa danh để bản đồ vẽ thế lực lớn to hơn thế lực nhỏ.

Cách tính: số lần tên xuất hiện trong tên chương (x3) và trong các chương đã tải,
cộng 1 bậc nếu mô tả có từ chỉ thế lực lớn ("bá chủ", "mạnh nhất", "đệ nhất", "xưa nhất"...).
Quốc gia/vùng tối thiểu bậc 3. Có thể sửa tay bằng phần tử thứ 6 trong dia-danh.js (ghi đè).

Cách dùng:  python tools/tinh_quy_mo.py thai-co-long-tuong-quyet
Kết quả:    js/truyen/<slug>.quy-mo.js
"""
import glob, json, os, re, sys
from chung import doc_danh_sach, thu_muc_truyen

GOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LON = r"bá chủ|mạnh nhất|đệ nhất|xưa nhất|top 10|bá đạo|khủng bố|cường đại nhất|thống trị|không ai chống|mạnh hơn cả|đứng đầu|lớn nhất|truyền thừa lâu"


def main():
    slug = sys.argv[1]
    hang, _ = doc_danh_sach(slug)
    tieu_de = "\n".join(t for t, _ in hang).lower()
    van = "\n".join(open(f, encoding="utf-8").read() for f in glob.glob(os.path.join(thu_muc_truyen(slug), "chuong", "*.txt"))).lower()
    src = open(os.path.join(GOC, "js", "truyen", slug + ".dia-danh.js"), encoding="utf-8").read()
    out, cur = {}, None
    for line in src.splitlines():
        m = re.match(r"\s{2}(\w+):\[", line)
        if m:
            cur = m.group(1); continue
        m = re.match(r"\s{4}\['(\w+)','([^']+)','([^']*)'", line)
        if not (m and cur):
            continue
        t, n, d = m.groups()
        keys = {n.lower(), re.sub(r"^(thái cổ|thái cổ|hậu nhân) ", "", n.lower())}
        keys |= {k.split(" · ")[0] for k in keys} | {k.split(" & ")[0] for k in keys}
        keys |= {re.sub(r" (gia tộc|tộc|gia|thánh địa|đế quốc|tông)$", "", k) for k in list(keys) if " " in re.sub(r" (gia tộc|tộc|gia|thánh địa|đế quốc|tông)$", "", k)}
        c = max(tieu_de.count(k) * 3 + van.count(k) for k in keys if len(k) > 3)
        s = 5 if c >= 250 else 4 if c >= 80 else 3 if c >= 25 else 2 if c >= 7 else 1
        s += min(2, len(re.findall(LON, d, re.I)))
        ov = re.search(r"\],(?:'[^']*'|null),(\d)\]", line)
        if ov: s = int(ov.group(1))
        if t in ("quoc", "vung"): s = max(s, 3)
        out[f"{cur}|{n}"] = min(5, s)
    ra = os.path.join(GOC, "js", "truyen", slug + ".quy-mo.js")
    open(ra, "w", encoding="utf-8").write("/* Tạo tự động bởi tools/tinh_quy_mo.py — quy mô 1–5 của từng địa danh */\nvar SIZES=window.SIZES||(window.SIZES={});SIZES[" + json.dumps(slug) + "]=" + json.dumps(out, ensure_ascii=False, indent=0) + ";\n")
    from collections import Counter
    print(f"{len(out)} địa danh → {ra}; phân bố:", dict(sorted(Counter(out.values()).items())))


if __name__ == "__main__":
    main()
