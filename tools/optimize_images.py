"""원본 렌더/도면을 웹용으로 변환하는 스크립트.
사용법: python optimize_images.py  (U 폴더의 원본을 읽어 assets/img/<프로젝트>/ 에 저장)
- full : 긴 변 2400px  (프로젝트 페이지용)
- thumb: 긴 변 900px   (목록·버블 미리보기용)
"""
import os, sys
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
U = sys.argv[1] if len(sys.argv) > 1 else "/mnt/user-data/uploads/2026 포트폴리오"
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img")

MAP = {
 "interfacing-seoul": [
  ("4-1/메렌 최종본@3x.jpg", "01-hero"),
  ("4-1/메인투시도.png", "02-perspective"),
  ("4-1/Scene 7@3x.jpg", "03-scene7"),
  ("4-1/Image@3x.jpg", "04-street"),
  ("4-1/Image_upscale01@2x.jpg", "05-upscale"),
  ("4-1/춤 스튜디오 최종.jpg", "06-dance-studio"),
  ("4-1/inerfacing 최종 (1).jpg", "07-interfacing"),
  ("4-1/261003 섹션 아이소 최종@3x.jpg", "08-section-iso"),
  ("4-1/아이소메트릭 섹션 다이어그램-01.jpg", "09-iso-diagram"),
  ("4-1/261004_최종 단면투시도@3x.jpg", "10-section-perspective"),
  ("4-1/섹션 드로잉 리터칭-01.jpg", "11-section-drawing"),
  ("4-1/평면 리터칭 1.jpg", "12-plan-1"),
  ("4-1/평면 리터칭 2.jpg", "13-plan-2"),
  ("4-1/평면 리터칭 3.jpg", "14-plan-3"),
  ("4-1/261104_차세대 문화공간 공모전 2차 패널.jpg", "15-panel"),
 ],
 "haehak": [
  ("3-2/메인메인샷 최종@3x.jpg", "01-hero"),
  ("3-2/조감도 최종@3x.jpg", "02-aerial"),
  ("3-2/선큰 느좋 최종@3x.jpg", "03-sunken"),
  ("3-2/선큰 비 최종@3x.jpg", "04-sunken-rain"),
  ("3-2/실린더 낮 최종@3x.jpg", "05-cylinder-day"),
  ("3-2/실린더 밤 최종@3x.jpg", "06-cylinder-night"),
  ("3-2/전시장 내부 샷 최종@3x.jpg", "07-gallery"),
  ("3-2/이제 크리스마스니깐 최종@3x.jpg", "08-winter"),
  ("3-2/땅파기.jpg", "09-dig"),
  ("3-2/뜯어내기.jpg", "10-peel"),
  ("3-2/벽 깨물기.jpg", "11-bite"),
  ("3-2/지하 1층 최종_page-0001.jpg", "12-plan-b1"),
  ("3-2/Joint Detail 최종@3x.jpg", "13-joint-detail"),
  ("3-2/조인트부분 디테일 모델링 초종@3x.jpg", "14-joint-model"),
  ("3-2/익스핸션 조인트.jpg", "15-expansion-joint"),
  ("3-2/내벽 레이어 최종@3x.jpg", "16-inner-wall"),
  ("3-2/레인체인 최종@3x.jpg", "17-rain-chain"),
  ("3-2/4차 모형 사진-20261104T063441Z-1-001/4차 모형 사진/무제-1-01.jpg", "18-model-1"),
  ("3-2/4차 모형 사진-20261104T063441Z-1-001/4차 모형 사진/무제-1-02.jpg", "19-model-2"),
  ("3-2/4차 모형 사진-20261104T063441Z-1-001/4차 모형 사진/무제-1-03.jpg", "20-model-3"),
 ],
 "desire-to-sky": [
  ("3-1/퍼퍼퍼 진짜 ㅋㅋ 최종 낮.jpg", "01-hero"),
  ("3-1/퍼스펙티브 낮 최종.jpg", "02-perspective-day"),
  ("3-1/진짜 퍼스펙티브 밤 최종.jpg", "03-perspective-night"),
  ("3-1/사일로 세로 샷 낮 최종.jpg", "04-silo-day"),
  ("3-1/이거는 사일로 밤이다아 최종.jpg", "05-silo-night"),
  ("3-1/사일로 밤 뷰. 최종.jpg", "06-silo-view"),
  ("3-1/미디어 월 밤밤최종.jpg", "07-media-wall"),
  ("3-1/drone lab night 최종.jpg", "08-drone-lab"),
  ("3-1/lobby shot 최종.jpg", "09-lobby"),
  ("3-1/oa floor 샷.jpg", "10-oa-floor"),
  ("3-1/material lab.jpg", "11-material-lab"),
  ("3-1/청사진 이미지 단면 상세.png", "12-section-detail"),
  ("3-1/detail isometric.png", "13-detail-iso"),
  ("3-1/parapet detail shot.jpg", "14-parapet"),
 ],
 "weaving-wave": [
  ("2025 차세대 문화공간/2025 차세대 문화공간 공모전/차세대 공모전 메인샷 d입면,캐노피, 색감정리버젼.jpg", "01-hero"),
  ("2025 차세대 문화공간/2025 차세대 문화공간 공모전/두번째 샷 최종.jpg", "02-second"),
  ("2025 차세대 문화공간/2025 차세대 문화공간 공모전/진입부 렌더 최종.jpg", "03-entrance"),
  ("2025 차세대 문화공간/2025 차세대 문화공간 공모전/새까지 진짜 끝끝끝끝끝.jpg", "04-birds"),
  ("2025 차세대 문화공간/2025 차세대 문화공간 공모전/진짜진짜 마지막 샷 소장용.jpg", "05-last"),
  ("2025 차세대 문화공간/2025 차세대 문화공간 공모전/실내샷 1.jpg", "06-interior"),
  ("2025 차세대 문화공간/2025 차세대 문화공간 공모전/문화공모전 내부샷_1.effectsResult.jpg", "07-interior-2"),
  ("2025 차세대 문화공간/2025 차세대 문화공간 공모전/인천 내항 콜라주 색감 조정.jpg", "08-collage"),
 ],
 "the-scar": [
  ("2025 Nuclear Memorial/메인샷 최종@3x11.jpg", "01-hero"),
  ("2025 Nuclear Memorial/나이트_최종2@3x.jpg", "02-night"),
  ("2025 Nuclear Memorial/최종사진들/최종사진들/절벽샷.jpg", "03-cliff"),
  ("2025 Nuclear Memorial/최종사진들/최종사진들/최종1.jpg", "04-final"),
  ("2025 Nuclear Memorial/최종사진들/최종사진들/대지 1.jpg", "05-board-1"),
  ("2025 Nuclear Memorial/최종사진들/최종사진들/대지 2.jpg", "06-board-2"),
  ("2025 Nuclear Memorial/최종사진들/최종사진들/대지 3.jpg", "07-board-3"),
  ("2025 Nuclear Memorial/최종사진들/최종사진들/아트보드 1.jpg", "08-artboard"),
  ("2025 Nuclear Memorial/포폴용 샷_대지 1.jpg", "09-portfolio-shot"),
  ("2025 Nuclear Memorial/물 최종 반짝이.jpg", "10-water"),
 ],
 "about": [("포트폴리오 소스들/김중현.jpg", "portrait")],
}

def save(im, path, edge, q):
    im = im.copy(); im.thumbnail((edge, edge), Image.LANCZOS)
    im.save(path, "JPEG", quality=q, optimize=True, progressive=True)
    return im.size

for slug, items in MAP.items():
    d = os.path.join(OUT, slug); os.makedirs(d, exist_ok=True)
    for src, name in items:
        p = os.path.join(U, src)
        if not os.path.exists(p): print("  (없음) ", src); continue
        im = Image.open(p).convert("RGB")
        edge = 3200 if "panel" in name else 2400
        s = save(im, os.path.join(d, name + ".jpg"), edge, 82)
        save(im, os.path.join(d, name + "_t.jpg"), 900, 78)
        print(slug, name, s)
