/* STUDIO 012 — 웹북 (10장 포트폴리오 PDF → 20쪽 책, 외부 라이브러리 없이 CSS 3D로 넘김)
   페이지 이미지: assets/book/page-01.jpg ~ page-20.jpg
   PDF가 바뀌면 tools/make_book.py 를 다시 실행하고 아래 TOTAL 을 쪽수에 맞추세요.   */
(function () {
  const TOTAL = 20;                              // 반드시 짝수
  const pg = n => `assets/book/page-${String(n).padStart(2, "0")}.jpg`;
  const el = document.getElementById("book"), count = document.getElementById("book-count");
  const SHEETS = TOTAL / 2 - 1;                  // 넘어가는 종이 장수
  let spread = 0, single = 0, mode = null;

  function face(n, cls) { return `<div class="face ${cls}"><img src="${pg(n)}" alt="포트폴리오 ${n}쪽" draggable="false" ${n > 4 ? 'loading="lazy"' : ""}></div>`; }

  function buildSpread() {
    let h = `<div class="base left">${face(1, "")}</div><div class="base right">${face(TOTAL, "")}</div>`;
    for (let i = 0; i < SHEETS; i++) h += `<div class="sheet" data-i="${i}">${face(2 * i + 2, "front")}${face(2 * i + 3, "back")}</div>`;
    el.innerHTML = h + `<div class="spine"></div>`;
    el.className = "book is-spread";
  }
  function buildSingle() {
    el.innerHTML = `<div class="track">${Array.from({ length: TOTAL }, (_, i) => `<div class="leaf">${face(i + 1, "")}</div>`).join("")}</div>`;
    el.className = "book is-single";
  }

  function render() {
    if (mode === "spread") {
      el.querySelectorAll(".sheet").forEach(s => {
        const i = +s.dataset.i, flipped = i < spread;
        s.classList.toggle("flipped", flipped);
        s.style.zIndex = flipped ? 10 + i : 10 + (SHEETS - i);
      });
      const l = 2 * spread + 1;
      count.textContent = `${l}–${l + 1} / ${TOTAL}`;
    } else {
      el.querySelector(".track").style.transform = `translateX(${-single * 100}%)`;
      count.textContent = `${single + 1} / ${TOTAL}`;
    }
  }
  function go(d) {
    if (mode === "spread") spread = Math.max(0, Math.min(SHEETS, spread + d));
    else single = Math.max(0, Math.min(TOTAL - 1, single + d));
    render();
  }

  function layout() {
    const m = innerWidth > 820 ? "spread" : "single";
    const availH = innerHeight - 200, availW = Math.min(1500, el.parentElement.clientWidth - 2 * parseFloat(getComputedStyle(el.parentElement).paddingLeft));
    const ratio = 1323 / 1871;                   // 한 쪽(A4 세로) 가로/세로
    if (m !== mode) {
      if (m === "single") single = mode === "spread" ? 2 * spread : 0;
      else spread = Math.floor(single / 2);
      mode = m; m === "spread" ? buildSpread() : buildSingle();
    }
    const pageW = Math.min(mode === "spread" ? availW / 2 : availW, availH * ratio);
    el.style.width = (mode === "spread" ? pageW * 2 : pageW) + "px";
    el.style.height = pageW / ratio + "px";
    render();
  }

  document.getElementById("book-prev").onclick = () => go(-1);
  document.getElementById("book-next").onclick = () => go(1);
  addEventListener("keydown", e => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); });
  el.addEventListener("click", e => { const r = el.getBoundingClientRect(); go(e.clientX - r.left > r.width / 2 ? 1 : -1); });
  let sx = null;
  el.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  el.addEventListener("touchend", e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); sx = null; });
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(layout, 100); });
  layout();
})();
