# STUDIO 012 — 포트폴리오 웹사이트

김중현의 건축 포트폴리오 사이트. 빌드 도구 없이 HTML·CSS·JS만으로 만들었고,
**글과 이미지는 `data/` 폴더의 두 파일만 고치면** 사이트 전체에 반영됩니다.

## 열어보기
- `index.html` 을 더블클릭하면 브라우저에서 바로 열립니다. 글꼴(Noto Serif KR · Noto Sans KR)은 `assets/fonts/` 에 들어 있어 인터넷 없이도 적용됩니다.
- VS Code를 쓴다면 "Live Server" 확장으로 열면 저장할 때마다 자동 새로고침됩니다.

## 폴더 구조
```
STUDIO 012 웹사이트/
├─ index.html        첫 화면 (버블 다이어그램 → 지향하는 건축 → 작업 목록)
├─ project.html      프로젝트 상세 (주소의 ?p=아이디 로 프로젝트 선택)
├─ book.html         10장 포트폴리오 웹북
├─ about.html        약력 · 수상 · 스킬
├─ data/
│  ├─ site.js        ★ 이름, 첫 화면 문장, 설계 키워드, About 약력
│  └─ projects.js    ★ 프로젝트 글 · 이미지 · 챕터 순서
├─ assets/
│  ├─ css/style.css  색 · 글꼴 · 레이아웃 (맨 위 :root 에서 색 변경)
│  ├─ js/            동작 코드 (보통은 건드릴 필요 없음)
│  ├─ img/<프로젝트>/ 웹용 이미지 (원본 폴더와 분리)
│  ├─ book/          웹북 페이지 이미지
│  ├─ fonts/         Noto Serif KR · Noto Sans KR (자주 쓰는 한글 2,350자 + 영문)
│  └─ vendor/        d3 (버블 다이어그램 라이브러리)
└─ tools/
   ├─ optimize_images.py  원본 렌더 → 웹용 이미지 변환
   └─ make_book.py        포트폴리오 PDF → 웹북 페이지
```
원본 학기 폴더(3-1, 3-2, 4-1 …)는 **읽기만** 하고 절대 수정하지 않습니다.

## 자주 하는 수정
| 하고 싶은 것 | 고칠 곳 |
|---|---|
| 프로젝트 글 고치기 | `data/projects.js` → 해당 프로젝트의 `sentence`, `chapters[].text` |
| 이미지 순서 바꾸기 / 빼기 | `data/projects.js` → `images: [...]` 안의 줄 순서 |
| 새 이미지 추가 | 웹용으로 변환해 `assets/img/<id>/` 에 넣고 `images` 에 `{ src: "파일.jpg", caption: "설명" }` 추가 |
| 버블 연결 바꾸기 | 프로젝트의 `keywords: [...]` (키워드 목록은 `data/site.js`) |
| 프로젝트 숨기기 | 프로젝트 블록에 `draft: true` |
| 색 바꾸기 | `assets/css/style.css` 맨 위 `--olive`, `--paper` 등 |

`※` 표시가 붙은 문장은 Claude가 작성한 초안이라 검수가 필요합니다.

## 프로젝트마다 다른 레이아웃
- `look` : 프로젝트 첫 화면 구성 — `split`(제목·이미지 좌우) / `center`(좁은 가운데) / `pano`(낮고 넓게) / `wide`(기본)
- 챕터 `layout: "free"` : 12칸 격자에 이미지를 하나씩 배치. `col: [시작 칸, 칸 수]`, `dy: 위 여백(%)`
- 챕터 `layout: "strip"` : 가로로 넘겨보는 띠
- 사진 최대 크기는 `assets/css/style.css` 의 `--figw` 로 조절

## 로고
`assets/brand/logo.svg`, `logo-mark.svg` — 0(비움의 원) · 1(한 문장의 축) · 2(이어진 두 버블).

## 챕터(서사) 구조
프로젝트마다 `chapters` 순서대로 읽힙니다: **Narrative → Concept → Space → Drawings → Details → Model**.
각 챕터의 `kind` 가 목차 이름이 되고, `layout` 이 이미지 배치를 정합니다(`full` / `pair` / `trio`).
