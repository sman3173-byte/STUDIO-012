/* ============================================================
   STUDIO 012 — 프로젝트 데이터
   ------------------------------------------------------------
   ▸ 프로젝트 하나 = { ... } 블록 하나.  순서 = 사이트에 보이는 순서.
   ▸ 글을 고칠 때는 따옴표(" ") 안만 바꾸세요.
   ▸ 이미지는 assets/img/<id>/ 에 넣고 파일명을 적습니다.
     (tools/optimize_images.py 로 웹용 변환 → "이름.jpg" + "이름_t.jpg")

   ▸ look  : 프로젝트 첫 화면 구성
       "split"  제목과 대표 이미지를 좌우로 (세로 이미지에 어울림)
       "center" 좁은 가운데 정렬 (조용하고 집중된 프로젝트)
       "pano"   낮고 넓은 파노라마 (가로로 긴 이미지)
       "wide"   기본 — 제목 아래 넓은 이미지

   ▸ chapters = 프로젝트 안의 서사 순서. 한 챕터 = 한 묶음(도면, 디테일 …)
       kind  : "narrative" | "concept" | "space" | "drawing" | "detail" | "model"
       layout: "free"  12칸 격자 위에 이미지마다 위치 지정 (아래 col, dy)
               "strip" 가로로 넘겨보는 띠
               "full" | "pair" | "trio"  일정한 격자
       이미지 옵션(free 일 때)
         col : [시작 칸, 칸 수]   예) [1, 7] 왼쪽 7칸 / [6, 7] 오른쪽 7칸 / [4, 6] 가운데
         dy  : 위로 띄우는 여백(화면 폭 %)  — 계단·엇갈림 배치
         side: true 면 캡션을 이미지 옆에

   ▸ draft: true 인 프로젝트는 사이트에 나타나지 않습니다.
   ▸ ※ 표시 = Claude가 쓴 초안 → 검수 필요
   ============================================================ */

window.PROJECTS = [

/* ───────────── 01  Interfacing Seoul — 밤의 콜라주, 엇갈린 배치 ───────────── */
{
  id: "interfacing-seoul",
  title: "Interfacing Seoul",
  subtitle: "문화의 생산과 소비의 무경계성에 대응하는 새로운 공연공간의 프로토타입",
  sentence: "공연이 끝나도 막이 내려가지 않는 극장. 창작의 과정이 도시를 향해 열립니다.",   // ※
  year: "2026",
  period: "2026",                                    // ※ 기간 확인 필요
  context: "4-1 Studio · 2026 차세대 문화공간 공모전",  // ※ 확인 필요
  program: "공연장, 아티스트 레지던시, 테스트베드, 미디어월",
  site: "서울",                                       // ※ 정확한 대지 확인 필요
  scale: "Cultural · Performance Scale",
  award: "대상",
  look: "split",
  keywords: ["boundary", "urban", "flow", "tech", "void"],
  hero: "01-hero.jpg",
  cover: "01-hero.jpg",
  chapters: [
    {
      kind: "narrative", title: "문화는 어떻게 변하고 있는가",
      text: [
        "기획–투자–생산–발매–재투자로 이어지던 콘텐츠의 단방향 순환은, 양방향 매체와 함께 발매가 곧 다음 기획으로 되돌아오는 짧은 고리가 되었습니다. 관객은 이제 공연을 찍고 편집하고 다시 발신하는 프로슈머입니다.",
        "그러나 공연장은 여전히 두꺼운 벽 안에서, 정해진 시간에, 정해진 장르만을 상연합니다. 창작은 무대 뒤에 감춰지고, 공연은 막이 내리는 순간 도시와 단절됩니다."
      ],
      layout: "free",
      images: [{ src: "02-perspective.jpg", caption: "도시를 향해 열린 공연공간", col: [6, 5], side: false }]
    },
    {
      kind: "concept", title: "Boundless, 세 개의 벽이 만드는 무경계성",
      text: [
        "생산과 소비의 교차, 장르의 붕괴와 융합, 시간과 공간의 초월. 이 세 가지 변화를 Plug-in Wall, Cultural Interface Wall, Plug-out Wall 이라는 세 개의 벽으로 번역했습니다.",
        "레지던시와 테스트베드가 꽂히는 벽, 극장과 로비가 도시와 맞닿는 벽, 공연을 도시로 송출하는 미디어 월이 하나의 단면 안에서 겹치며 창작에서 확산까지의 과정이 한 건물 안에서 순환합니다."   // ※
      ],
      layout: "free",
      images: [
        { src: "08-section-iso.jpg", caption: "Open section perspective", col: [1, 9] },
        { src: "09-iso-diagram.jpg", caption: "프로그램 아이소메트릭", col: [6, 7], dy: -4 }
      ]
    },
    {
      kind: "space", title: "막이 내리지 않는 극장",
      text: ["녹화된 경사 벽과 미디어 파사드 사이의 선큰 마당은 공연이 없는 시간에도 열려 있는 도시의 객석이 됩니다."],   // ※
      layout: "free",
      images: [
        { src: "06-dance-studio.jpg", caption: "댄스 스튜디오", col: [1, 4] },
        { src: "04-street.jpg", caption: "가로에서 본 레지던시", col: [6, 7], dy: 8 },
        { src: "05-upscale.jpg", caption: "Plug-out Wall, 미디어 파사드", col: [3, 8] },
        { src: "03-scene7.jpg", caption: "저층부 진입", col: [1, 6] },
        { src: "07-interfacing.jpg", caption: "Interfacing corridor", col: [8, 4], dy: 10 }
      ]
    },
    {
      kind: "drawing", title: "도면",
      text: ["두 개의 공연장을 축으로 레지던시와 테스트베드가 엮이고, 단면에서 세 개의 벽이 층마다 다른 방식으로 도시와 만납니다."],   // ※
      layout: "free",
      images: [
        { src: "10-section-perspective.jpg", caption: "단면 투시도", col: [1, 12] },
        { src: "12-plan-1.jpg", caption: "1층 평면도", col: [1, 4] },
        { src: "13-plan-2.jpg", caption: "평면도", col: [5, 4] },
        { src: "14-plan-3.jpg", caption: "평면도", col: [9, 4] },
        { src: "11-section-drawing.jpg", caption: "섹션 드로잉", col: [4, 9] }
      ]
    },
    {
      kind: "model", title: "모형",
      text: ["곡면의 객석 벽과 나선 계단, 미디어 월을 1:200 모형으로 확인했습니다. 어두운 배경에서 벽과 프레임의 켜가 또렷이 드러납니다."],   // ※ 축척 확인 필요
      layout: "free",
      images: [
        { src: "17-model-2.jpg", caption: "모형 조감", col: [1, 4] },
        { src: "16-model-1.jpg", caption: "Plug-in Wall과 나선 계단", col: [5, 4], dy: 5 },
        { src: "18-model-3.jpg", caption: "가로에서 본 모형", col: [9, 4], dy: 10 }
      ]
    },
    {
      kind: "drawing", title: "패널",
      text: [],
      layout: "free",
      images: [{ src: "15-panel.jpg", caption: "2026 차세대 문화공간 공모전 2차 패널", col: [4, 6] }]
    }
  ]
},

/* ───────────── 02  경기건축대전 — 숲의 천이처럼 번지는 비오톱 (진행 중) ───────────── */
{
  id: "gyeonggi-2026",
  title: "형태는 천이를 따른다",                             // ※ 아이소 도면 제목에서 가져옴 — 확인 필요
  subtitle: "비오톱 소멸을 위한 미래공지 시나리오 · 2026 경기건축대전",
  sentence: "서쪽 숲에서 시작된 초록이 대지를 건너 번져가고, 건축 속 비움은 숲이 자라나는 천이의 단계가 됩니다.",   // ※
  year: "2026",
  period: "2026.10 –",                                     // ※ 기간 확인 필요
  context: "2026 경기건축대전",
  program: "1·2인 청년주거, 창업지원센터, 연구실, 생태 커뮤니티, 비오톱 관조탑",   // ※ 단면도 실명 기준
  site: "경기푸른미래관 일대, 서울 도봉구",
  scale: "",
  award: "입선",
  look: "wide",
  keywords: ["nature", "void", "tectonic"],
  hero: "08-meadow.jpg",
  cover: "08-meadow.jpg",
  chapters: [
    {
      kind: "narrative", title: "숲이 번져가는 대지",
      text: [
        "대지의 북서쪽은 산과 숲으로 이어져 있습니다. 프로젝트는 이 숲의 초록이 서쪽에서부터 대지를 건너 점점 번져 들어오는 장면에서 출발합니다.",   // ※
        "건축 안의 보이드는 숲이 자라나는 천이의 단계로 읽힙니다. 비어 있는 자리마다 다른 시간의 숲이 들어서고, 건물은 그 확장을 받아내는 틀이 됩니다."   // ※
      ],
      layout: "free",
      images: [{ src: "09-aerial.jpg", caption: "조감도, 숲의 천이처럼 자라나는 경작지와 중정", col: [2, 10] }]
    },
    {
      kind: "concept", title: "미래공지 시나리오",
      text: [
        "대지 옆 비오톱 1급지는 아까시나무 군락지로, 숲의 발달 과정 중 음수림에 가까운 상태입니다. 프로젝트는 이 숲이 앞으로 대지 안으로 번져 들어올 순서를 미리 비워 두는 데서 시작합니다.",
        "세 개의 미래공지는 천이의 단계를 거꾸로 따라갑니다. 양수와 음수가 공존하는 혼합림, 관목과 초본이 작은 동물의 터전이 되는 관목지, 그리고 숲이 처음 생기기 시작하는 개척지. 먼 미래에는 단지 전체가 비오톱과 구별되지 않는 숲이 되기를 제안합니다."   // ※
      ],
      layout: "free",
      images: [{ src: "11-iso-scenario.jpg", caption: "형태는 천이를 따른다 — 비오톱 1급지와 세 개의 미래공지", col: [1, 12] }]
    },
    {
      kind: "drawing", title: "단면, 숲과 함께 자라는 켜",
      text: ["계절에 따라 달라지는 해의 고도를 받아내는 단면. 낮은 지붕과 높은 수직 코어 사이로 초록이 층층이 스며듭니다."],   // ※
      layout: "free",
      images: [
        { src: "10-section-perspective.jpg", caption: "단면 투시도", col: [1, 12] },
        { src: "12-section-program.jpg", caption: "프로그램 단면 — 생태통로와 비오톱 관조탑", col: [2, 10] }
      ]
    },
    {
      kind: "drawing", title: "평면, 숲 쪽으로 비워 둔 땅",
      text: ["건물은 대지의 남쪽 가로를 따라 낮게 늘어서고, 북쪽은 비오톱으로 이어지는 미래공지로 남겨 둡니다. 층이 오를수록 주거 유닛이 생태통로를 따라 엮입니다."],   // ※
      layout: "free",
      images: [
        { src: "13-plan-1.jpg", caption: "평면도 1", col: [1, 12] },
        { src: "14-plan-2.jpg", caption: "평면도 2", col: [1, 6] },
        { src: "15-plan-3.jpg", caption: "평면도 3", col: [7, 6], dy: 4 }
      ]
    },
    {
      kind: "detail", title: "틀과 켜",
      text: ["가볍게 반복되는 프레임과 켜켜이 분해되는 지붕. 초록이 머물 자리를 구조가 먼저 마련합니다."],   // ※
      layout: "free",
      images: [
        { src: "02-tower.jpg", caption: "수직 코어 프레임", col: [2, 3] },
        { src: "04-roof-exploded.jpg", caption: "지붕 분해 아이소메트릭", col: [6, 6], dy: 6 },
        { src: "03-module.jpg", caption: "모듈 구성", col: [4, 4] },
        { src: "17-facade-exploded.jpg", caption: "파사드 분해 — 루버, 설비 파이프, 슬래브", col: [1, 12] },
        { src: "16-detail-bridge.jpg", caption: "생태통로 디테일", col: [3, 9] }
      ]
    },
    {
      kind: "space", title: "유닛",
      text: ["벽의 배치가 달라지며 생기는 세 가지 유닛. 초록 벽이 공간을 나누고 사람의 자리를 만듭니다."],   // ※
      layout: "free",
      images: [
        { src: "05-unit-a.jpg", caption: "유닛 A", col: [1, 6] },
        { src: "06-unit-b.jpg", caption: "유닛 B", col: [7, 6], dy: 8 },
        { src: "07-unit-c.jpg", caption: "유닛 C", col: [3, 8] }
      ]
    }
  ]
},

/* ───────────── WIP  모듈러 공모전 — 주유소 위에 꽂히는 정비 모듈 (진행 중) ───────────── */
{
  id: "metabolic-pitstop",
  title: "Metabolic Pit-Stop",
  subtitle: "대명주유소 PM 허브 리노베이션, 모듈러 확장",
  sentence: "주유소의 캐노피 위로 정비 모듈이 꽂히고 빠지며, 도시의 이동 방식이 바뀌는 속도를 건물이 따라갑니다.",   // ※
  year: "2026",
  period: "2026.10 –",                                       // ※ 기간 확인 필요
  context: "2026 대한건축사협회 대학(원)생 모듈러건축 공모전 · 팀",
  program: "PM 정비·관제, 리서치 랩, 라이더 캡슐 숙소, 커뮤니티 홀",
  site: "현대오일뱅크 대명주유소, 서울 광진구 (건국대학교 앞)",
  scale: "B1 – 7F",
  role: "팀 프로젝트 · 캐노피 상부 모듈러 구조 담당",            // ※ 확인 필요
  award: "Work in progress",
  look: "split",
  keywords: ["tech", "tectonic", "urban", "reuse"],
  hero: "01-hero.jpg",
  cover: "01-hero.jpg",
  chapters: [
    {
      kind: "narrative", title: "주유소가 다음 이동을 맞이하는 법",
      text: [
        "건국대학교 앞 주유소는 내연기관의 시대가 끝나가는 자리에 서 있습니다. 프로젝트는 이곳을 개인형 이동수단(PM)의 허브로 바꿉니다. 기존 사옥은 고정 프로그램으로 리노베이션하고, 캐노피를 넓혀 그 윗면을 반외부의 PM 테스트 베드로 씁니다.",   // ※
        "그 위로는 모듈이 쌓입니다. 정비, 리서치, 숙소처럼 자주 바뀌는 프로그램은 트러스에 매달린 모듈로 꽂히고 빠지며, 건물은 도시의 이동 방식이 바뀌는 속도에 맞춰 대사(metabolism)합니다."   // ※
      ],
      layout: "free",
      images: [{ src: "02-street.jpg", caption: "가로에서 본 PM 허브", col: [1, 12] }]
    },
    {
      kind: "drawing", title: "캐노피 위의 정비 동선",
      text: ["4층은 입고, 세척, AI 진단, 정비, 배터리 점검, QA로 이어지는 정비 동선이 가운데 스파인을 따라 흐릅니다. 고정 코어와 교체 가능한 모듈 베이를 나눠 프로그램이 바뀌어도 동선은 유지됩니다."],   // ※
      layout: "free",
      images: [
        { src: "03-plan-4f.jpg", caption: "4층 평면도 — 정비 동선 (작업 중)", col: [1, 12] },
        { src: "04-section.jpg", caption: "A-A' 종단면도 — 트러스에 매달린 모듈", col: [1, 12] }
      ]
    },
    {
      kind: "detail", title: "매달린 모듈의 구조",
      text: ["16.8 m 스팬을 건너는 트러스에서 행잉재가 모듈을 붙잡습니다. 부재 검토를 반복하며 사재, 거더, 기둥 단면을 다시 잡고, 행잉재와 거더의 접합을 엔드플레이트와 고장력 볼트로 상세화하고 있습니다."],   // ※
      layout: "free",
      images: [
        { src: "06-fem.jpg", caption: "트러스·행잉 구조 검토 (Grasshopper FEM)", col: [1, 7] },
        { src: "05-detail-hanger.jpg", caption: "행잉재–거더 접합 상세", col: [8, 5], dy: 6 }
      ]
    }
  ]
},

/* ───────────── 당수원 — 옮겨 심은 도시, 9㎡의 정원 ───────────── */
{
  id: "dangsuwon",
  title: "옮겨 심은 도시",                                      // ※ 작품명 확정 확인 필요
  subtitle: "당수원 학생참여정원",
  sentence: "새 도시는 울타리를 세우며 시작합니다. 이 정원은 그 울타리를 눕혀, 옮겨 온 것들이 처음 뿌리내릴 자리를 만듭니다.",
  year: "2026",
  period: "2026.11",
  context: "2026 LH 수원 당수동 정원 설계 공모전 · 팀",
  program: "학생참여정원 (9㎡)",
  site: "수원당수지구 3호 근린공원, 수원시 권선구 금곡동",
  scale: "9㎡",
  role: "팀 프로젝트",                                          // ※ 맡은 파트 입력 필요
  award: "",
  look: "center",
  keywords: ["nature", "memory", "boundary"],
  hero: "01-aerial.jpg",
  cover: "03-perspective.jpg",
  chapters: [
    {
      kind: "narrative", title: "옮겨 온 고을, 옮겨 다닌 땅",
      text: [
        "수원은 1789년 고을이 통째로 옮겨 와 다시 시작한 도시이고, 당수는 안산에서 수원으로, 화성으로, 다시 수원으로 주소가 여러 번 바뀐 가장자리의 땅입니다. 그 땅에 지금 다시 새 도시가 공사 울타리로 먼저 선을 긋고 있습니다.",
        "9㎡의 정원은 그 선의 다음 장면을 맡습니다. 울타리를 눕혀 만든 길 위로, 농원에서 온 식물과 현장에서 온 재료가 처음 머무는 자리를 만듭니다."   // ※
      ],
      layout: "free",
      images: [
        { src: "02-top.jpg", caption: "근린공원 잔디 위의 9㎡", col: [1, 7] },
        { src: "05-plan-view.jpg", caption: "탑뷰 — 눕힌 울타리가 만든 길", col: [8, 5], dy: 8 }
      ]
    },
    {
      kind: "space", title: "울타리가 머물 자리로",
      text: ["빛나는 길을 따라 걸으면 유리 정원과 PC 랜턴이 새싹 단계의 식물을 감싸고, 메쉬 오브제가 앉을 자리가 됩니다."],   // ※
      layout: "free",
      images: [
        { src: "03-perspective.jpg", caption: "정원으로 들어서는 길", col: [1, 6] },
        { src: "04-perspective-2.jpg", caption: "유리 정원과 랜턴", col: [7, 6], dy: 6 },
        { src: "07-lantern.jpg", caption: "PC 랜턴 속의 식재", col: [2, 5] },
        { src: "06-mesh-object.jpg", caption: "메쉬와 오브제", col: [7, 5], dy: 4 }
      ]
    }
  ]
},

/* ───────────── 02  해학 — 가운데를 비운 마당, 고요한 대칭 ───────────── */
{
  id: "haehak",
  title: "해학, 불완전성의 초월",
  subtitle: "대학로 아르코 미술관 리노베이션",
  sentence: "대학로 청춘의 중심이었던 아르코 미술관과 마로니에 공원. 우리는 다시 대학로의 낭만을 되찾을 수 있을까요?",
  year: "2025",
  period: "2025.09 – 2025.12",
  context: "SKKU 건축종합설계스튜디오 4",
  program: "미술관 리노베이션, 선큰 가든",
  site: "서울 종로구 대학로, 아르코 미술관",
  scale: "Art Museum Scale",
  award: "Best Design Award 2, 4 · Top 1",
  look: "wide",
  keywords: ["void", "reuse", "memory", "tectonic", "urban"],
  hero: "01-hero.jpg",
  cover: "01-hero.jpg",
  chapters: [
    {
      kind: "narrative", title: "해학, 불완전성을 초월하다",
      text: [
        "우리 조상들은 불완전함을 완벽한 질서로 바꾸려 하지 않았습니다. 해학의 정신으로 있는 그대로를 초월하며 순응하는 삶을 살아가려 했습니다.",
        "가장 다양한 일이 가장 불완전한 순간에 일어나는 공간, 마당이 미술관에 삽입됩니다."
      ],
      layout: "free",
      images: [{ src: "02-aerial.jpg", caption: "조감도, 마로니에 공원과 이어지는 선큰 마당", col: [2, 10] }]
    },
    {
      kind: "concept", title: "우연성의 삽입",
      text: [
        "예상치 못한 예술과의 만남은 새로운 창작을 낳습니다. 청춘의 낭만은 늘 불완전하고 예상할 수 없습니다. 마당을 통한 진입과 우연성의 계단은 마로니에 공원의 우연한 만남을 떠올리게 합니다.",
        "땅을 파내고, 벽돌 벽을 뜯어내고, 기존 매스를 깨물어 내는 세 개의 동작으로 붉은 벽돌의 묵직한 권위를 덜어냅니다."   // ※
      ],
      layout: "trio",
      images: [
        { src: "09-dig.jpg", caption: "땅파기" },
        { src: "10-peel.jpg", caption: "뜯어내기" },
        { src: "11-bite.jpg", caption: "벽 깨물기" }
      ]
    },
    {
      kind: "space", title: "선큰 가든, 해학을 위한 새로운 마당",
      text: ["한국 전통 마당이 지닌 해학과 여백의 정서를 빌려, 시민과 예술이 격식 없이 어우러지는 열린 가든을 제안합니다. 대지 아래로 과감하게 비워낸 마당은 예상치 못한 시선의 교차와 청춘의 일상을 담아내며 미술관 전체에 숨구멍을 틔워줍니다."],
      layout: "free",
      images: [
        { src: "03-sunken.jpg", caption: "선큰 가든", col: [1, 8] },
        { src: "04-sunken-rain.jpg", caption: "비 오는 날의 선큰", col: [7, 6], dy: -3 },
        { src: "05-cylinder-day.jpg", caption: "우연성의 계단, 낮", col: [3, 4] },
        { src: "06-cylinder-night.jpg", caption: "우연성의 계단, 밤", col: [7, 4], dy: 6 },
        { src: "07-gallery.jpg", caption: "지하 전시장", col: [5, 4] },
        { src: "08-winter.jpg", caption: "겨울의 마당", col: [1, 12] }
      ]
    },
    {
      kind: "drawing", title: "도면",
      text: ["지하 1층 선큰 플로어. 기존 미술관과 새 마당이 하나의 레벨로 이어집니다."],   // ※
      layout: "free",
      images: [{ src: "12-plan-b1.jpg", caption: "B1F Sunken Floor, 1:200", col: [3, 8] }]
    },
    {
      kind: "detail", title: "기존 벽돌과 새 프레임이 만나는 경계",
      text: ["건축물의 수축과 팽창을 흡수하는 기능을 넘어, 기존 벽돌 구조와 신설 금속 프레임이 만나는 경계를 매끄럽게 조율하는 익스펜션 조인트를 제안합니다. 레인체인은 비를 마당으로 끌어내려 기능을 넘어선 건축적 제스처가 됩니다."],
      layout: "free",
      images: [
        { src: "13-joint-detail.jpg", caption: "Joint detail", col: [1, 7] },
        { src: "15-expansion-joint.jpg", caption: "익스펜션 조인트 다이어그램", col: [9, 3], dy: 4 },
        { src: "14-joint-model.jpg", caption: "조인트 디테일 모델링", col: [4, 7] },
        { src: "16-inner-wall.jpg", caption: "내벽 레이어", col: [1, 5] },
        { src: "17-rain-chain.jpg", caption: "레인체인", col: [7, 4], dy: 6 }
      ]
    },
    {
      kind: "model", title: "모형",
      text: [],
      layout: "trio",
      images: [
        { src: "18-model-1.jpg", caption: "최종 모형" },
        { src: "19-model-2.jpg", caption: "최종 모형" },
        { src: "20-model-3.jpg", caption: "최종 모형" }
      ]
    }
  ]
},

/* ───────────── 03  하늘 — 위로 오르는 계단식 배치 ───────────── */
{
  id: "desire-to-sky",
  title: "하늘, 인간의 열망",
  subtitle: "Desire to Sky, DJI 본사 오피스",
  sentence: "성수 공업지대에서, 기술 혁신을 통해 인간의 하늘에 대한 열망을 꿈꾸다.",
  year: "2025",
  period: "2025.03 – 2025.06",
  context: "SKKU 건축종합설계스튜디오 3",
  program: "오피스, 드론 테스트베드 사일로, 랩",
  site: "서울 성동구 성수동",
  scale: "Building Office Scale",
  award: "Best Design Award 4 · Top 1",
  look: "wide",
  keywords: ["sky", "tech", "tectonic", "urban"],
  hero: "01-hero.jpg",
  cover: "01-hero.jpg",
  chapters: [
    {
      kind: "narrative", title: "바벨탑의 욕망, 드론으로의 재탄생",
      text: [
        "성수는 공업지대에서 혁신의 아이콘으로 변해 온 땅입니다. 하늘에 닿고자 했던 인간의 오래된 욕망은 오늘날 드론이라는 기술로 다시 태어났습니다.",
        "오피스 한가운데 드론 테스트베드 사일로를 세우고, 구조 크레인이 건물을 가로지르며 하늘을 향한 열망을 구조 그 자체로 드러냅니다."   // ※
      ],
      layout: "free",
      images: [{ src: "02-perspective-day.jpg", caption: "드론 testbed 사일로와 구조 크레인", col: [1, 10] }]
    },
    {
      kind: "space", title: "구조와 보이드로의 재해석",
      text: ["투명한 사일로는 수직 보이드가 되어 층마다 오피스와 랩을 엮고, 낮과 밤에 서로 다른 얼굴로 도시를 향합니다."],   // ※
      layout: "free",
      images: [
        { src: "04-silo-day.jpg", caption: "사일로, 낮", col: [1, 3], dy: 18 },
        { src: "05-silo-night.jpg", caption: "사일로, 밤", col: [5, 3], dy: 9 },
        { src: "06-silo-view.jpg", caption: "사일로 야경", col: [9, 4] },
        { src: "03-perspective-night.jpg", caption: "야간 투시도", col: [1, 7] },
        { src: "07-media-wall.jpg", caption: "미디어 월", col: [9, 4], dy: 8 },
        { src: "08-drone-lab.jpg", caption: "드론 랩", col: [3, 5] },
        { src: "09-lobby.jpg", caption: "로비", col: [8, 5], dy: -6 },
        { src: "11-material-lab.jpg", caption: "머티리얼 랩", col: [5, 6] }
      ]
    },
    {
      kind: "detail", title: "디테일",
      text: ["OA 플로어, 파라펫, 커튼월 접합부까지. 하늘을 향하는 구조의 언어가 디테일의 단위에서도 이어집니다."],   // ※
      layout: "free",
      images: [
        { src: "12-section-detail.jpg", caption: "단면 상세", col: [1, 4] },
        { src: "13-detail-iso.jpg", caption: "디테일 아이소메트릭", col: [6, 3], dy: 6 },
        { src: "10-oa-floor.jpg", caption: "OA floor", col: [1, 6] },
        { src: "14-parapet.jpg", caption: "Parapet detail", col: [7, 6], dy: 5 }
      ]
    }
  ]
},

/* ───────────── 04  Weaving Wave — 가로로 흐르는 띠 ───────────── */
{
  id: "weaving-wave",
  title: "Weaving Wave",
  subtitle: "인천 내항, 예술 물류 거점 센터",
  sentence: "물류의 중심지였던 인천 내항, 선형 예술 물류 거점으로 다시 태어나다.",
  year: "2025",
  period: "2025.07 – 2025.09",
  context: "2025 차세대 문화공간 공모전 출품작",
  program: "예술 물류 거점, 전시, 오픈 스페이스",
  site: "인천 중구, 인천 내항",
  scale: "Art Museum Scale",
  award: "",
  look: "pano",
  keywords: ["flow", "reuse", "memory", "urban"],
  hero: "01-hero.jpg",
  cover: "01-hero.jpg",
  chapters: [
    {
      kind: "narrative", title: "물류의 궤적을 지우지 않는다",
      text: [
        "대한민국 근대화와 산업화를 이끌었던 인천 내항을 선형 예술 물류 거점으로 되살리는 마스터플랜입니다. 기능을 잃어가던 거대한 항만 인프라를 철거하는 대신, 대지가 지닌 역사와 장소의 기억을 보존하는 방식으로 접근했습니다.",
        "거칠고 무거운 화물이 오가던 물류의 궤적을 지우지 않고, 그 흐름의 선형적 구조를 그대로 살려 예술과 문화가 유통되는 새로운 거점을 제안합니다."
      ],
      layout: "free",
      images: [{ src: "08-collage.jpg", caption: "인천 내항, 기억의 콜라주", col: [5, 8] }]
    },
    {
      kind: "space", title: "선형의 흔적을 따라 걷다",
      text: ["도크와 하역장, 선박이 드나들던 선형의 흔적을 따라 전시 동선과 오픈 스페이스를 배치했습니다. 방문객은 과거 물류의 이동 경로를 따라 걸으며 바다와 육지가 만나는 풍경을 마주합니다. 옆으로 넘겨 보세요."],
      layout: "strip",
      images: [
        { src: "02-second.jpg", caption: "곡면 매스" },
        { src: "06-interior.jpg", caption: "내부 전시 공간" },
        { src: "07-interior-2.jpg", caption: "오픈 스페이스" },
        { src: "05-last.jpg", caption: "야경" },
        { src: "04-birds.jpg", caption: "내항의 저녁" }
      ]
    }
  ]
},

/* ───────────── 05  The Scar — 좁은 터널에서 넓은 하늘로 ───────────── */
{
  id: "the-scar",
  title: "The Scar",
  subtitle: "핵실험 추모 기념관",
  sentence: "흉터는 과거의 상처와 새로운 회복, 삶의 희망을 동시에 기억해주는 매개입니다.",
  year: "2025",
  period: "2024.12 – 2025.02",
  context: "Buildner Architecture Competition, Nuclear Memorial Edition 5",
  program: "추모 기념관, 수공간",
  site: "핵실험 피해 대지",
  scale: "Landscape Scale",
  award: "Honourable Mention · Top 6",
  look: "center",
  keywords: ["memory", "healing", "void", "sky"],
  hero: "03-cliff.jpg",
  cover: "01-hero.jpg",
  chapters: [
    {
      kind: "narrative", title: "핵실험이 만든 인류의 흉터",
      text: [
        "핵실험이 인류와 자연에 남긴 파괴의 흔적을 건축의 언어로 옮긴 추모 공간입니다. 비극을 기록하는 전시관을 넘어, 대지에 깊게 새겨진 상흔을 신성하고 압도적인 공간의 서사로 다시 짓고자 했습니다.",
        "방문객은 공간을 지나가는 것만으로 시대의 상처를 마주하고, 조용한 질문을 품게 됩니다."
      ],
      layout: "free",
      images: [{ src: "01-hero.jpg", caption: "대지에 새겨진 흉터", col: [3, 8] }]
    },
    {
      kind: "concept", title: "감정의 세 단계",
      text: ["거칠고 무거운 콘크리트 터널에서 고통과 절망을 지나, 녹슨 철판 벽으로 둘러싸인 크레이터 모양의 선큰 광장에 이릅니다. 마지막 중심에는 하늘을 그대로 담는 고요한 수공간이 있어 치유와 화해, 다가올 희망을 건넵니다."],
      layout: "free",
      images: [
        { src: "05-board-1.jpg", caption: "하나, 터널", col: [5, 2] },
        { src: "06-board-2.jpg", caption: "둘, 압박", col: [5, 3] },
        { src: "07-board-3.jpg", caption: "셋, 빛", col: [4, 5] }
      ]
    },
    {
      kind: "space", title: "하늘을 담는 크레이터",
      text: [],
      layout: "free",
      images: [
        { src: "02-night.jpg", caption: "밤하늘을 담는 크레이터", col: [4, 6] },
        { src: "03-cliff.jpg", caption: "절벽 위의 수공간", col: [2, 10] },
        { src: "04-final.jpg", caption: "대지의 상흔", col: [1, 12] }
      ]
    },
    {
      kind: "drawing", title: "드로잉",
      text: [],
      layout: "free",
      images: [
        { src: "08-artboard.jpg", caption: "크레이터 플랜", col: [4, 6] },
        { src: "10-water.jpg", caption: "수공간 라인 드로잉", col: [3, 8] }
      ]
    }
  ]
},

/* ═══════════════ PRACTICE — 실무 (category: "practice") ═══════════════ */

/* ───────────── MEMORY.SCAPE — 인천가족공원 봉안당 설계공모 (W architects) ───────────── */
{
  id: "memory-scape",
  category: "practice",
  title: "MEMORY.SCAPE",
  subtitle: "지형을 품은 열린 기억의 공원, 인천가족공원 봉안당",
  sentence: "죽음을 위한 닫힌 시설이 아니라, 자연과 사람, 일상과 기억이 함께 머무는 공원의 새로운 풍경.",
  year: "2026",
  period: "2026.06 – 2026.07",
  context: "W architects 인턴십 · 인천가족공원 봉안당 설계공모",
  program: "봉안당, 커뮤니티, 카페, 추모공원",
  site: "인천광역시 부평구 부평동 52-14 일원",
  scale: "연면적 6,111.56㎡ · 지상 4층 · 최고높이 25.0m",
  award: "설계공모 5등",
  role: "",                                  // ※ 맡은 역할 입력 (예: 렌더링, 도면, 다이어그램)
  look: "pano",
  keywords: ["memory", "void", "nature", "tectonic"],
  hero: "02-perspective.jpg",
  cover: "03-park-view.jpg",
  chapters: [
    {
      kind: "narrative", title: "지형을 품은 열린 기억의 공원",
      text: [
        "인천가족공원 봉안당은 대지의 고저차를 활용한 입체적 공간계획으로 기존 만월당과 주변 공원을 잇습니다. 저층 포디움에는 커뮤니티와 카페 같은 주민을 위한 일상의 공간을, 상부 세 개 층에는 안치실을 모아 공공성과 추모 기능을 분명히 나눕니다.",
        "진입정원, 광장, 선큰가든, 추모공원이 이어지고 빛과 바람이 머무는 추모공간이 됩니다."
      ],
      layout: "free",
      images: [{ src: "01-aerial.jpg", caption: "조감도 — 만월당과 이어지는 봉안당", col: [1, 12] }]
    },
    {
      kind: "concept", title: "네 가지 설계 주안점",
      text: [
        "대지의 고저차를 장애물이 아닌 자원으로 삼아 절·성토를 줄이고, 만월당과 공원을 하나의 연속된 보행 체계로 엮습니다. 수평으로 열린 포디움과 상징적인 메모리얼 박스가 대비를 이루고, 중정과 보이드, 선큰가든, 천창이 빛과 바람을 안으로 끌어들입니다."
      ],
      layout: "free",
      images: [
        { src: "06-design-points.jpg", caption: "설계 주안점 1–4", col: [1, 12] },
        { src: "07-program-axon.jpg", caption: "조닝에 따른 프로그램과 동선의 분리", col: [1, 5] },
        { src: "11-construction.jpg", caption: "단계별 시공계획", col: [6, 7], dy: 8 }
      ]
    },
    {
      kind: "space", title: "공원과 이어지는 장면",
      text: [],
      layout: "free",
      images: [
        { src: "03-park-view.jpg", caption: "공원 산책로에서 바라본 봉안당", col: [1, 7] },
        { src: "04-memorial-park.jpg", caption: "공원 산책로와 연결된 추모공원", col: [8, 5], dy: 6 },
        { src: "05-memorial-garden.jpg", caption: "추모공원", col: [3, 8] },
        { src: "17-interior-lobby.jpg", caption: "로비, 일상과 추모가 만나는 개방 공간", col: [1, 12] },
        { src: "16-interior-niche.jpg", caption: "안치실 (2F–4F), 자연채광의 쾌적한 공간", col: [1, 6] },
        { src: "18-interior-gf.jpg", caption: "안치실 (GF), 선큰가든과 인접한 차분한 공간", col: [7, 6], dy: 5 }
      ]
    },
    {
      kind: "drawing", title: "도면",
      text: ["배치도 1:800, 평면도·단면도·입면도 1:500."],
      layout: "free",
      images: [
        { src: "08-site-plan.jpg", caption: "배치도", col: [1, 8] },
        { src: "19-site-axon.jpg", caption: "대지 아이소메트릭", col: [5, 8], dy: 4 },
        { src: "09-plan-gf.jpg", caption: "Ground Floor Plan", col: [1, 6] },
        { src: "10-plan-1f.jpg", caption: "1st Floor Plan", col: [7, 6] },
        { src: "14-plan-2-4f.jpg", caption: "2nd, 3rd & 4th Floor Plan", col: [3, 8] },
        { src: "12-perspective-section.jpg", caption: "Perspective section", col: [1, 12] },
        { src: "13-section.jpg", caption: "Section-1", col: [1, 6] },
        { src: "15-elevation.jpg", caption: "Elevation-North", col: [7, 6] }
      ]
    }
  ]
},

/* ───────────── Siteless 인턴십 ───────────── */
{
  id: "siteless",
  category: "practice",
  title: "Siteless Internship",                // ※ 실제 프로젝트명으로 바꿔주세요
  subtitle: "데이터센터 · 실내 그린월 시각화",    // ※
  sentence: "숲과 안개 사이에 가볍게 떠 있는 유리 상자.",   // ※
  year: "2026",
  period: "2025.12 – 2026.02",
  context: "Siteless 건축설계회사 인턴십",
  program: "데이터센터",                        // ※
  site: "",
  scale: "",
  award: "",
  role: "렌더링 · 시각화",                       // ※ 확인 필요
  look: "pano",
  keywords: ["nature", "tech"],
  hero: "01-data-center.jpg",
  cover: "04-scene.jpg",
  chapters: [
    {
      kind: "space", title: "시각화",
      text: ["인턴십 기간 동안 맡은 렌더링 작업입니다. 계절과 날씨를 바꿔가며 같은 매스가 풍경 속에서 어떻게 읽히는지를 탐구했습니다."],   // ※
      layout: "free",
      images: [
        { src: "04-scene.jpg", caption: "숲 속의 데이터센터", col: [1, 12] },
        { src: "02-data-center-snow.jpg", caption: "눈 내린 날", col: [1, 6] },
        { src: "03-green-wall.jpg", caption: "실내 그린월", col: [7, 6], dy: 6 }
      ]
    }
  ]
}

];
