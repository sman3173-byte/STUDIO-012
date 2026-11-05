"""포트폴리오 PDF → 웹북 페이지 이미지 만들기
사용법:  python tools/make_book.py "포트폴리오.pdf"
- A3 가로 펼침면 1장을 왼쪽/오른쪽 2쪽으로 나눠 assets/book/page-01.jpg ... 로 저장
- 필요: poppler(pdftoppm), Pillow  (pip install pillow)
쪽수가 바뀌면 assets/js/book.js 의 TOTAL 값을 같이 바꿔주세요."""
import subprocess, glob, os, sys, tempfile
from PIL import Image
src = sys.argv[1]
out = os.path.join(os.path.dirname(__file__), "..", "assets", "book")
os.makedirs(out, exist_ok=True)
tmp = tempfile.mkdtemp()
subprocess.run(["pdftoppm", "-r", "160", "-jpeg", "-jpegopt", "quality=92", src, tmp + "/p"], check=True)
n = 0
for i, f in enumerate(sorted(glob.glob(tmp + "/p-*.jpg")), 1):
    im = Image.open(f).convert("RGB"); w, h = im.size
    for half in (im.crop((0, 0, w // 2, h)), im.crop((w // 2, 0, w, h))):
        n += 1; half.save(f"{out}/page-{n:02d}.jpg", quality=80, optimize=True, progressive=True)
    im.thumbnail((1400, 1400)); im.save(f"{out}/spread-{i:02d}.jpg", quality=80)
print(f"{n}쪽 생성 → book.js 의 TOTAL = {n}")
