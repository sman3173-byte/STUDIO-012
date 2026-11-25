/* STUDIO 012 — 필름 아카이브 페이지
   data/film.js 의 롤(rolls)을 35mm 필름 스트립으로 그립니다.
   사진은 처음에 네거티브로 보였다가, 화면에 들어오면 '현상'되어 포지티브가 됩니다. */
(function () {
  const F = window.FILM || { rolls: [] };
  const rolls = (F.rolls || []).filter(r => r && r.frames && r.frames.length);
  const src = (r, f, t) => `assets/film/${r.id}/${t ? f.replace(".jpg", "_t.jpg") : f}`;
  const totalFrames = rolls.reduce((n, r) => n + r.frames.length, 0);

  const edge = (stock, n) => {                 // 필름 가장자리 인쇄 글자
    const s = (stock || "UNEXPOSED 135").toUpperCase();
    return `<span>${s}</span><span>▸ ${n}</span><span>${n}A</span><span>${s}</span>`;
  };

  const strip = (r, ri) => `
    <section class="roll" id="${r.id}">
      <header class="roll-head">
        <div class="no"><b>ROLL ${String(rolls.length - ri).padStart(2, "0")}</b>${r.date || ""}</div>
        <div class="tt"><h2>${r.title || "Untitled roll"}</h2>${r.note ? `<p>${r.note}</p>` : ""}</div>
        <dl class="spec">
          ${r.stock ? `<div><dt>Film</dt><dd>${r.stock}</dd></div>` : ""}
          ${r.dev ? `<div><dt>Develop</dt><dd>${r.dev}</dd></div>` : ""}
          ${r.place ? `<div><dt>Place</dt><dd>${r.place}</dd></div>` : ""}
          <div><dt>Frames</dt><dd>${r.frames.length}</dd></div>
        </dl>
      </header>
      <div class="strip-wrap" tabindex="0" aria-label="${r.title || r.id} 필름 스트립, 옆으로 넘겨 보기">
        <div class="strip">
          <span class="leader" aria-hidden="true"></span>
          ${r.frames.map((f, i) => `
            <figure class="frame">
              <div class="edge top" aria-hidden="true">${edge(r.stock, i + 1)}</div>
              <button type="button" class="pic" data-zoom="${src(r, f.src)}" data-caption="${[r.title, f.caption].filter(Boolean).join(" — ")}">
                <img src="${src(r, f.src, true)}" alt="${f.caption || `${r.title || "필름"} ${i + 1}번째 컷`}" loading="lazy">
              </button>
              <div class="edge bot" aria-hidden="true"><span>${i + 1}</span><span>${i + 1}A</span></div>
              ${f.caption ? `<figcaption>${f.caption}</figcaption>` : ""}
            </figure>`).join("")}
        </div>
      </div>
    </section>`;

  const empty = `
    <section class="roll is-empty">
      <header class="roll-head">
        <div class="no"><b>ROLL 01</b>현상 대기 중</div>
        <div class="tt"><h2>첫 번째 롤을 현상하고 있습니다</h2><p>암실에서 나오는 대로 이곳에 한 컷씩 걸립니다.</p></div>
        <dl class="spec"><div><dt>Camera</dt><dd>${F.camera || ""}</dd></div><div><dt>Frames</dt><dd>— / 36</dd></div></dl>
      </header>
      <div class="strip-wrap"><div class="strip">
        <span class="leader" aria-hidden="true"></span>
        ${Array.from({ length: 8 }, (_, i) => `
          <figure class="frame blank">
            <div class="edge top" aria-hidden="true">${edge("", i + 1)}</div>
            <div class="pic"><span class="glow"></span></div>
            <div class="edge bot" aria-hidden="true"><span>${i + 1}</span><span>${i + 1}A</span></div>
          </figure>`).join("")}
      </div></div>
    </section>`;

  document.getElementById("film").innerHTML = `
    <header class="film-head">
      <p class="kicker">Film Archive</p>
      <h1>빛과 시간의<br>아카이브</h1>
      <div class="film-intro">${(F.intro || []).map(t => `<p>${t}</p>`).join("")}</div>
      <dl class="cam">
        <div><dt>Camera</dt><dd>${F.camera || ""}</dd></div>
        <div><dt>Format</dt><dd>${F.format || "35mm"}</dd></div>
        ${F.lens ? `<div><dt>Lens</dt><dd>${F.lens}</dd></div>` : ""}
        <div><dt>Process</dt><dd>${F.process || ""}</dd></div>
        <div><dt>Archive</dt><dd>${rolls.length ? `${rolls.length} rolls · ${totalFrames} frames` : "첫 롤 현상 중"}</dd></div>
      </dl>
      <div class="view-toggle" role="group" aria-label="보기 방식">
        <button type="button" data-v="pos" aria-pressed="true">Positive</button>
        <button type="button" data-v="neg" aria-pressed="false">Negative</button>
      </div>
    </header>
    ${rolls.length ? rolls.map(strip).join("") : empty}`;

  /* 현상: 화면에 들어온 컷부터 차례로 네거티브 → 포지티브 */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const frames = [...e.target.querySelectorAll(".frame")];
    frames.forEach((f, i) => setTimeout(() => f.classList.add("dev"), 250 + i * 160));
    io.unobserve(e.target);
  }), { threshold: .25 });
  document.querySelectorAll(".roll").forEach(r => io.observe(r));

  /* Positive / Negative 보기 */
  const page = document.getElementById("film");
  page.querySelectorAll(".view-toggle button").forEach(b => b.addEventListener("click", () => {
    page.classList.toggle("view-neg", b.dataset.v === "neg");
    page.querySelectorAll(".view-toggle button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  }));

  /* 스트립: 마우스 휠·드래그로 옆으로 넘기기 */
  document.querySelectorAll(".strip-wrap").forEach(w => {
    let down = false, sx = 0, sl = 0, moved = false;
    w.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = w.scrollLeft; });
    addEventListener("pointermove", e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; w.scrollLeft = sl - dx; });
    addEventListener("pointerup", () => { down = false; });
    w.addEventListener("click", e => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  });
})();
