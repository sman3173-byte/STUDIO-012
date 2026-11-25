/* STUDIO 012 — 프로젝트 상세 페이지
   주소 예: project.html?p=haehak   (p = data/projects.js 의 id)          */
(function () {
  const P = (window.PROJECTS || []).filter(p => !p.draft);
  // 주소: project.html#haehak  (예전 형식 ?p=haehak 도 동작)
  const id = (location.hash.slice(1) && P.some(x => x.id === location.hash.slice(1))) ? location.hash.slice(1) : new URLSearchParams(location.search).get("p");
  const i = Math.max(0, P.findIndex(p => p.id === id));
  const p = P[i], next = P[(i + 1) % P.length];
  const src = (proj, f, t) => `assets/img/${proj.id}/${t ? f.replace(".jpg", "_t.jpg") : f}`;
  const KIND = { narrative: "Narrative", concept: "Concept", space: "Space", drawing: "Drawings", detail: "Details", model: "Model" };

  document.title = `${p.title} — STUDIO 012`;
  const meta = [
    ["Year", p.period || p.year], ["Context", p.context], ["Program", p.program],
    ["Site", p.site], ["Scale", p.scale], ["Role", p.role], ["Award", p.award]
  ].filter(r => r[1] && r[0] !== "Award");


  const chapters = p.chapters.map((c, n) => {
    const figs = c.images.map((im, k) => {
      // free 레이아웃: 12칸 격자 위에 자유 배치
      //   col: [시작 칸, 차지할 칸 수]  예) [1, 7] = 왼쪽부터 7칸,  [8, 5] = 오른쪽 5칸
      //   dy : 위쪽 여백(화면 폭 %) — 계단처럼 엇갈리게 놓을 때
      const wide = (c.layout === "pair" || c.layout === "trio") && k === 0 && c.images.length % (c.layout === "pair" ? 2 : 3) === 1;
      let style = "";
      if (c.layout === "free") {
        const [s, n] = im.col || [1, 12];
        style = ` style="grid-column:${s} / span ${n};${im.dy ? `margin-top:${im.dy}vw;` : ""}"`;
      }
      // inv: true   → 흰 바탕 도면 (다크 모드에서 색 반전)
      // inv: "dark" → 검은 바탕 도면 (라이트 모드에서 색 반전)
      const inv = im.inv === "dark" ? " inv-ink" : im.inv ? " inv-paper" : "";
      return `<figure class="fig${wide ? " wide" : ""}${im.side ? " side" : ""}${inv}"${style}>
        <button type="button" data-zoom="${src(p, im.src)}" data-caption="${im.caption || ""}" data-inv="${inv.trim()}" aria-label="${im.caption || "이미지"} 크게 보기">
          <img src="${src(p, im.src, true)}" srcset="${src(p, im.src, true)} 900w, ${src(p, im.src)} 2400w"
               sizes="(max-width: 640px) 100vw, 60vw" alt="${im.caption || ""}" loading="lazy">
        </button>${im.caption ? `<figcaption>${im.caption}</figcaption>` : ""}</figure>`;
    }).join("");
    return `<section class="chapter kind-${c.kind}" id="ch-${n + 1}">
      <div class="chapter-head">
        <div class="idx"><b>${String(n + 1).padStart(2, "0")}</b>${KIND[c.kind] || ""}</div>
        <div class="body"><h2>${c.title}</h2>${(c.text || []).map(t => `<p>${t}</p>`).join("")}</div>
      </div>
      <div class="figs ${c.layout || "pair"}">${figs}</div>
    </section>`;
  }).join("");

  document.body.classList.add("p-" + p.id);
  document.getElementById("project").innerHTML = `
    <div class="p-top look-${p.look || "wide"}">
    <header class="p-head">
      <h1>${p.title}</h1>
      <div class="award grad-text">${p.award || ""}</div>
      <div class="meta"><span>${p.period || p.year}</span><span>${p.context}</span><span>${p.subtitle}</span></div>
      <p class="tag">${p.sentence}</p>
    </header>
    <figure class="p-hero"><button type="button" data-zoom="${src(p, p.hero)}" data-caption="${p.title}" aria-label="대표 이미지 크게 보기"><img src="${src(p, p.hero)}" alt="${p.title} 대표 이미지"></button></figure>
    </div>
    <section class="p-intro">
      <dl class="p-meta">${meta.filter(([k]) => ["Program", "Site", "Scale", "Role"].includes(k)).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
    </section>
    <div class="p-toc"><nav aria-label="프로젝트 목차">
      ${p.chapters.map((c, n) => `<a href="#ch-${n + 1}">${String(n + 1).padStart(2, "0")}  ${KIND[c.kind] || c.title}</a>`).join("")}
    </nav></div>
    ${chapters}
    <aside class="p-next">
      <a href="project.html#${next.id}">
        <div><div class="lbl">Next</div><div class="t">${next.title}</div></div>
        <div class="ph"><img src="${src(next, next.cover, true)}" alt="" loading="lazy"></div>
      </a>
    </aside>`;

  /* 목차 클릭: 주소(#프로젝트)는 그대로 두고 해당 챕터로 스크롤 */
  document.querySelectorAll(".p-toc a").forEach(a => a.addEventListener("click", e => {
    e.preventDefault(); document.querySelector(a.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  }));
  addEventListener("hashchange", () => { if (P.some(x => x.id === location.hash.slice(1)) && location.hash.slice(1) !== p.id) location.reload(); });
  /* 목차: 지금 보는 챕터 표시 */
  const toc = [...document.querySelectorAll(".p-toc a")];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { toc.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); }
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll(".chapter").forEach(s => io.observe(s));
})();
