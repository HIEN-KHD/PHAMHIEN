"""Hàm dùng chung cho các công cụ thu thập dữ liệu truyện từ metruyenchu.com.vn."""
import html, json, os, re, time, urllib.request

GOC = "https://metruyenchu.com.vn"
THU_MUC_DU_LIEU = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "du-lieu")


def tai(url, so_lan=3):
    """Tải một trang, thử lại khi lỗi mạng."""
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (thu-vien-truyen)"})
    for lan in range(so_lan):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode("utf-8", "replace")
        except Exception as e:  # noqa: BLE001
            if lan == so_lan - 1:
                raise
            time.sleep(2 ** lan)


def thu_muc_truyen(slug):
    p = os.path.join(THU_MUC_DU_LIEU, slug)
    os.makedirs(p, exist_ok=True)
    return p


def doc_danh_sach(slug):
    """Trả về danh sách (tên chương, đường dẫn) và chỉ mục số chương → (tên, đường dẫn).
    Chương không có số trong tên được đánh số tạm theo vị trí, dạng '~1543'."""
    f = os.path.join(thu_muc_truyen(slug), "danh-sach-chuong.tsv")
    if not os.path.exists(f):
        raise SystemExit(f"Chưa có {f}. Chạy trước: python tools/tai_danh_sach_chuong.py {slug}")
    hang = [l.split("\t") for l in open(f, encoding="utf-8").read().splitlines() if "\t" in l]
    chi_muc = {}
    for i, (ten, duong_dan) in enumerate(hang):
        m = re.match(r".*?Chương\s*(\d+)", ten)
        chi_muc.setdefault(m.group(1) if m else f"~{i + 1}", (ten, duong_dan))
    return hang, chi_muc


def so_chuong(i, ten):
    m = re.match(r".*?Chương\s*(\d+)", ten)
    return m.group(1) if m else f"~{i + 1}"


def html_sang_chu(doan):
    doan = re.sub(r"<script.*?</script>", "", doan, flags=re.S)
    doan = re.sub(r"<br\s*/?>|</p>", "\n", doan)
    doan = html.unescape(re.sub(r"<[^>]+>", "", doan))
    return re.sub(r"\n\s*\n+", "\n", doan).strip()
