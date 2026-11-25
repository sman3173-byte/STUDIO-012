/* ============================================================
   STUDIO 012 — 사이트 공통 정보
   이 파일만 고치면 About 페이지, 첫 화면 문장, 버블 다이어그램
   키워드가 바뀝니다. 따옴표(" ") 안의 글자만 수정하세요.
   ============================================================ */

window.SITE = {
  name: "STUDIO 012",
  owner: "김중현 Junghyun Kim",
  email: "wayne3173@g.skku.edu",
  instagram: "",            // 예: "https://instagram.com/아이디"  (비워두면 숨김)

  /* 첫 화면 — 내가 지향하는 건축 (검수 필요) */
  thesis: {
    title: "Touching Emotions",
    lead: "설계는 한 문장에서 시작합니다.",
    body: [
      "저는 항상 전체 개념을 관통하는 한 문장으로 설계를 시작합니다. 그 문장의 힘이 사람의 감정을 움직일 수 있다고 믿고, 그 힘이 공간과 구조, 재료까지 이어질 수 있다고 믿습니다.",
      "땅에 새겨진 기억, 도시가 잊어버린 장소, 아직 이름 붙지 않은 문화. 저는 그곳에서 사람들이 조용히 품고 있는 감정을 찾아 건축의 언어로 옮깁니다."
    ],
    motto: "Design the silent instinct within us."
  },

  /* 버블 다이어그램의 설계 키워드 (올리브색 작은 버블)
     id는 영문 소문자, 프로젝트 파일의 keywords 와 같은 이름을 써야 연결됩니다. */
  keywords: [
    { id: "memory",   ko: "기억",       en: "Memory" },
    { id: "healing",  ko: "상처와 회복", en: "Healing" },
    { id: "void",     ko: "비움 · 마당", en: "Void" },
    { id: "boundary", ko: "경계",       en: "Boundary" },
    { id: "reuse",    ko: "재생",       en: "Adaptive reuse" },
    { id: "flow",     ko: "흐름",       en: "Flow" },
    { id: "sky",      ko: "하늘",       en: "Sky" },
    { id: "tech",     ko: "기술",       en: "Technology" },
    { id: "urban",    ko: "도시",       en: "Urban interface" },
    { id: "tectonic", ko: "구축",       en: "Tectonics" },
    { id: "nature",   ko: "숲 · 비오톱", en: "Biotope" }
  ],

  /* About 페이지 — 기존 포트폴리오 약력 기준 */
  about: {
    portrait: "assets/img/about/portrait.jpg",
    school: "성균관대학교 건축학과",
    intro: "성균관대학교 건축학과에서 공부하고 있습니다. 서사에서 출발해 공간·구조·디테일까지 하나의 문장으로 관통하는 설계를 지향하며, Rhino·Grasshopper 기반의 모델링과 V-Ray·D5 Render 시각화를 주로 다룹니다.",
    education: [
      ["2021 –", "성균관대학교 건축학과 재학"],
      ["2018 – 2020", "수원고등학교 졸업"]
    ],
    practice: [
      ["2026.08 – 2026.09", "삼우종합건축사사무소 (SAMOO) 인턴십"],
      ["2026.06 – 2026.07", "W architects 인턴십 — 인천가족공원 봉안당 설계공모 참여, 5등"],
      ["2025.12 – 2026.02", "Siteless 건축설계회사 인턴십"]
    ],
    experience: [
      ["2026.02", "성균관대학교 주관 동아시아 5개국 건축학과 연합 워크숍 FEAU 참여"],
      ["2025.07 – 2025.09", "ANU 주관 차세대 문화공간 공모전 참여"],
      ["2025.08", "Siteless 건축설계회사 Workshop 〈1000/100/10/1〉 참여"],
      ["2025.03", "성균관대학교 건축학과 아카이브 소모임 〈1st Exhibition〉 개인작업 작가 참여"],
      ["2025.02", "성균관대학교 굿즈 공모전 참여, 기획"],
      ["2024.12 – 2025.02", "Buildner Competition, Nuclear Memorial"],
      ["2024.08", "Volume Zero Competition, Tree House 참여"],
      ["2024.07", "성균관대학교 건축 비평학회 〈사건사고〉, 수원고등학교 건축 캠프 멘토링 스태프"],
      ["2024.07", "법무부 교정시설 대학생 설계 공모전"],
      ["2024.01", "홍익대학교 × 성균관대학교 연합 전시 〈재고정리〉 참여"],
      ["2022.02", "서울대학교 전시기획동아리 [암실] 개인작업 전시 〈지금 가는 중!〉 참여"]
    ],
    awards: [
      ["2026.11", "2026 차세대 문화공간 공모전, Interfacing Seoul — 대상"],
      ["2026.11", "2026 경기건축대전 — 입선"],
      ["2025.12", "SKKU 건축종합설계스튜디오 4, Best Design Award"],
      ["2025.06", "SKKU 건축종합설계스튜디오 3, Best Design Award"],
      ["2025.03", "Buildner Competition, Nuclear Memorial — Honourable Mention"],
      ["2024.07", "법무부 교정시설 대학생 설계 공모전 — 법무부 장관상"]
    ],
    skills: [
      ["Modeling", "Rhinoceros 8, Grasshopper, AutoCAD"],
      ["Visualization", "V-Ray 7, D5 Render, Adobe Photoshop"],
      ["Graphics", "Adobe Illustrator, InDesign"],
      ["Model making", "Acrylic, Foamboard, Wood, 3D Printing, Laser Cutting"],
      ["Scale", "1:500, 1:300, 1:200, 1:50, 1:30"]
    ],
    roles: [
      ["2026", "D5 Render Campus Ambassador 2기"]
    ]
  }
};
