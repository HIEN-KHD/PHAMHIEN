"""Quét các chương đã tải, tìm tên địa danh/thế lực mới cho từng thế giới (chưa có trong dữ liệu).

Cách dùng:  python tools/tim_dia_danh.py thai-co-long-tuong-quyet [số kết quả mỗi thế giới]
In ra: thế giới, số lần xuất hiện, tên, các chương, một câu ví dụ.
Phạm vi chương của từng thế giới lấy theo mạch truyện (xem PHAM_VI bên dưới).
"""
import glob, json, os, re, sys
from collections import Counter, defaultdict
from chung import thu_muc_truyen

# Phạm vi chương chính của mỗi thế giới; khoảng con đặt sau sẽ ghi đè khoảng rộng
PHAM_VI = [("cuuchau", 1, 536), ("donghai", 537, 990), ("thantho", 991, 2240), ("bachluyen", 2241, 2680),
           ("daithien", 2681, 3110), ("tuhanh", 3111, 3420), ("tovu", 3421, 3630), ("chuthien", 3631, 4050),
           ("thanhquang", 4051, 4980), ("cuuhon", 4981, 5300), ("thatgioi", 5301, 6704)]
DUOI = ["gia tộc", "đế quốc", "học viện", "thánh địa", "sâm lâm", "tông", "gia", "thành", "quốc", "môn", "cốc", "phái", "điện",
        "các", "vực", "châu", "sơn", "đảo", "hải", "cung", "tộc", "viện", "phủ", "lâu", "trấn", "lĩnh", "uyên", "hồ", "tự", "đài",
        "giới", "minh", "triều", "thần triều", "vương triều", "đế triều", "liên minh", "sơn mạch", "bí cảnh", "cấm địa"]
BO = {"sở phong", "cửu châu", "tu la", "giới linh", "nguồn", "chương", "ta", "hắn", "nàng", "các ngươi", "chúng ta"}


def the_gioi(n):
    w = None
    for wid, a, b in PHAM_VI:
        if a <= n <= b:
            w = wid
    return w


def da_co(slug):
    js = open(os.path.join(os.path.dirname(thu_muc_truyen(slug)), "..", "js", "truyen", slug + ".dia-danh.js"), encoding="utf-8").read()
    return {m.lower() for m in re.findall(r"\['\w+','([^']+)'", js)}


def main():
    slug = sys.argv[1]
    k = int(sys.argv[2]) if len(sys.argv) > 2 else 25
    co = da_co(slug)
    dem, chuong, vd = defaultdict(Counter), defaultdict(lambda: defaultdict(set)), {}
    for f in glob.glob(os.path.join(thu_muc_truyen(slug), "chuong", "*.txt")):
        so = os.path.basename(f)[:-4]
        if not so.isdigit():
            continue
        w = the_gioi(int(so))
        if not w:
            continue
        txt = open(f, encoding="utf-8").read()
        for cau in re.split(r"(?<=[.!?。\n])", txt):
            tu = re.findall(r"[^\s,.!?;:\"“”'()…\[\]]+", cau)
            i = 0
            while i < len(tu):
                if not tu[i][:1].isupper():
                    i += 1
                    continue
                j = i
                while j < len(tu) and tu[j][:1].isupper() and j - i < 4:
                    j += 1
                ten = None
                # hậu tố viết thường ngay sau cụm viết hoa, ưu tiên hậu tố dài
                for d in sorted(DUOI, key=len, reverse=True):
                    dd = d.split()
                    if [t.lower() for t in tu[j:j + len(dd)]] == dd and all(t.islower() for t in tu[j:j + len(dd)]):
                        ten = " ".join(tu[i:j] + tu[j:j + len(dd)])
                        break
                # hoặc hậu tố đã viết hoa ở cuối cụm (Thanh Vân Tông)
                if not ten and j - i >= 2 and tu[j - 1].lower() in DUOI:
                    ten = " ".join(tu[i:j])
                if ten and i > 0 and ten.lower() not in co and ten.split()[0].lower() not in BO and len(ten) > 5:
                    dem[w][ten] += 1
                    chuong[w][ten].add(int(so))
                    if ten not in vd or len(vd[ten]) < 40:
                        vd[ten] = cau.strip()[:220]
                i = max(j, i + 1)
    ra = {}
    for w in dem:
        ra[w] = [(n, ten, sorted(chuong[w][ten])[:6], vd[ten]) for ten, n in dem[w].most_common(k) if n >= 2]
    print(json.dumps(ra, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
