/* ============================================================
   STUDIO 012 — 필름 아카이브
   Minolta X-300 으로 찍고 직접 현상한 필름을 롤(한 통) 단위로 정리합니다.

   ▶ 새 롤 올리는 법
   1) 스캔한 사진을 assets/film/<롤 id>/ 폴더에 01.jpg, 02.jpg … 로 넣기
      (Claude에게 "필름 올려줘" 하면 웹용 크기·썸네일까지 맞춰 넣어 드려요)
   2) 아래 rolls 목록 맨 위에 롤 하나를 추가
   ============================================================ */

window.FILM = {
  camera: "Minolta X-300",
  format: "35mm SLR",
  lens: "",                      // 예: "MD Rokkor 50mm f/1.7"  (비워두면 숨김)
  process: "자가 현상",           // 예: "C-41 자가 현상 · 흑백 D-76"

  intro: [
    "도면 위에서는 공간을 설계하고, 뷰파인더 안에서는 이미 지어진 공간을 다시 읽습니다.",   // ※
    "Minolta X-300 으로 찍고 직접 현상한 필름을 롤 단위로 모았습니다. 건축 아카이브 옆에 놓인, 빛과 시간의 아카이브입니다."   // ※
  ],

  rolls: [
    {
      id: "roll-01",
      title: "Roll 01",                   // ※ 롤 이름 정해주세요
      date: "",                           // ※ 찍은 시기 (예: 2026.03)
      stock: "",                          // ※ 필름 종류 (예: Kodak ColorPlus 200)
      dev: "자가 현상",                     // ※ 현상 방식 (예: C-41 자가 현상)
      place: "",                          // ※ 장소
      camera: "",                         // 롤마다 카메라가 다르면 적기 (비우면 위의 camera)
      note: "한 컷에 네 장면이 나뉘어 담긴 롤. 같은 거리가 조금씩 어긋나며 겹칩니다.",   // ※
      frames: [
        { src: "01.jpg", caption: "" },
        { src: "02.jpg", caption: "" },
        { src: "03.jpg", caption: "" },
        { src: "04.jpg", caption: "" },
        { src: "05.jpg", caption: "" },
        { src: "06.jpg", caption: "" },
        { src: "07.jpg", caption: "" },
        { src: "08.jpg", caption: "" },
        { src: "09.jpg", caption: "" },
        { src: "10.jpg", caption: "" },
        { src: "11.jpg", caption: "" },
        { src: "12.jpg", caption: "" },
        { src: "13.jpg", caption: "" },
        { src: "14.jpg", caption: "" },
        { src: "15.jpg", caption: "" },
        { src: "16.jpg", caption: "" },
        { src: "17.jpg", caption: "" },
        { src: "18.jpg", caption: "" },
        { src: "19.jpg", caption: "" },
        { src: "20.jpg", caption: "" }
      ]
    },
    /* 예시 — 이렇게 추가합니다 (앞의 // 를 지우면 사이트에 나타나요)
    {
      id: "roll-01",                      // 폴더 이름과 같게
      title: "첫 번째 롤",
      date: "2026.11",
      stock: "Kodak Gold 200",            // 필름 종류
      dev: "C-41 자가 현상",               // 현상 방식
      place: "서울",
      note: "",                           // 롤 전체에 대한 한 줄 메모
      frames: [
        { src: "01.jpg", caption: "" },
        { src: "02.jpg", caption: "" }
      ]
    },
    */
  ]
};
