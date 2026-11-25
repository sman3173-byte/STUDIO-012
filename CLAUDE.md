# STUDIO 012 — 작업 규칙

김중현의 건축 포트폴리오 사이트. GitHub Pages(`main` 브랜치 루트)로 배포되고 도메인은 the-studiojh.com (Wix DNS → GitHub Pages).

## 작업 방식
- 사용자와는 한국어로 이야기한다. 사용자는 코딩 입문자이므로 바뀐 점을 쉬운 말로 짧게 설명한다.
- 이 저장소가 원본이다. 수정 → 로컬에서 확인(Playwright 스크린샷, 다크·라이트, 데스크톱·모바일) → `main`에 커밋 → 바로 push 한다.
- push 후 1~2분 뒤 the-studiojh.com에 반영된 것을 확인하고 알려준다.
- 사용자가 PC에서 GitHub Desktop으로 직접 고칠 수도 있으니, 작업 시작 전 `git pull`로 최신 상태를 받는다.

## 구조 (빌드 도구 없음, HTML·CSS·JS)
- `data/site.js` — 이름, 첫 화면 문장, 설계 키워드, About(약력·수상·경력·스킬)
- `data/projects.js` — 프로젝트 글·이미지·챕터. 챕터 `layout: "free"` 는 12칸 격자 `col: [시작, 칸수]`, `dy`(vw)
- `assets/img/<프로젝트 id>/` — 웹용 이미지. 긴 변 2400px 본 이미지 + `_t.jpg` 900px 썸네일 쌍으로 넣는다 (JPEG, EXIF 회전 적용)
- `assets/css/style.css` — 색 토큰은 `:root`(다크)와 `html[data-theme="light"]`(라이트) 두 곳 모두 맞춘다
- `assets/css/motion.css`, `assets/js/motion.js` — 인트로, 페이지 전환, 키네틱 STUDIO 012, 마키, 스크롤 등장, 커서, 시계, 테마 전환
- 폰트는 `assets/fonts/`의 Noto Serif KR / Noto Sans KR 서브셋. 외부 CDN 쓰지 않는다

## 글 규칙
- `// ※` 표시는 사용자 검수가 필요한 초안 문장. 사용자가 확인하면 표시를 지운다
- 팀 프로젝트는 `role`에 본인 담당 파트를 정확히 적는다
- 디자인 톤: 남색에 가까운 검정 바탕, 회색 세리프 본문, 올리브 그라데이션 포인트, 평면적인 글래스 버블 (입체 하이라이트 금지)
