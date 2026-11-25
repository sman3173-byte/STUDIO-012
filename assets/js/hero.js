/* STUDIO 012 — 첫 화면 : 컨택트 시트 (건축 렌더 + 필름 컷)
   네거티브로 흐르는 필름 띠 위에 로고의 원(루페)을 대면 그 자리만 현상됩니다.
   index.html?hero=atlas 로 열면 예전 첫 화면(버블 다이어그램만)으로 볼 수 있어요.  */
(function () {
  const mode = new URLSearchParams(location.search).get("hero") || "sheet";
  if (mode !== "sheet") return;
  const atlas = document.getElementById("atlas");
  if (!atlas) return;
  document.body.classList.add("hero-" + mode);

  const P = (window.PROJECTS || []).filter(p => !p.draft);
  const F = window.FILM || { rolls: [] };
  const rolls = (F.rolls || []).filter(r => r && r.frames && r.frames.length);
  const film = rolls.flatMap(r => r.frames.map((f, i) => ({ src: `assets/film/${r.id}/${f.src.replace(".jpg", "_t.jpg")}`, roll: r, n: i + 1 })));
  const arch = P.map(p => ({ src: `assets/img/${p.id}/${p.cover.replace(".jpg", "_t.jpg")}`, p }));
  const nFrames = film.length;

  /* ================= 컨택트 시트 ================= */
  if (mode === "sheet") {
    const mix = [];
    const a = arch.slice(), f = film.slice();
    while (a.length || f.length) { if (f.length) mix.push({ k: "film", ...f.shift() }); if (f.length && mix.length % 3 === 1) mix.push({ k: "film", ...f.shift() }); if (a.length) mix.push({ k: "arch", ...a.shift() }); }
    const ROWS = 3, per = Math.ceil(mix.length / ROWS);
    const rows = Array.from({ length: ROWS }, (_, r) => mix.slice(r * per, r * per + per).concat(mix.slice(0, Math.max(0, per - mix.slice(r * per, r * per + per).length))));
    const cell = (x, i) => x.k === "arch"
      ? `<a class="cs-frame arch" href="project.html#${x.p.id}" data-t="${x.p.title}"><img src="${x.src}" alt="" loading="lazy"><span class="ed">ARCH · ${x.p.title}</span></a>`
      : `<a class="cs-frame film" href="film.html#${x.roll.id}" data-t="Roll ${x.roll.id.replace(/\D/g, "")} · ${String(x.n).padStart(2, "0")}"><img src="${x.src}" alt="" loading="lazy"><span class="ed">FILM · R${x.roll.id.replace(/\D/g, "")}-${String(x.n).padStart(2, "0")}</span></a>`;
    const layer = cls => `<div class="cs-layer ${cls}">${rows.map((r, i) => `<div class="cs-row ${i % 2 ? "rev" : ""}" style="--d:${120 + i * 25}s"><div class="run">${r.map(cell).join("")}${r.map(cell).join("")}</div></div>`).join("")}</div>`;
    const hero = document.createElement("section");
    hero.className = "sheet-hero";
    hero.innerHTML = `${layer("neg")}${layer("pos")}
      <div class="cs-ui">
        <p class="cs-k"><span>Contact Sheet</span><span>Architecture &amp; Film Archive</span></p>
        <h1 class="cs-h" data-wordmark>STUDIO 012</h1>
        <p class="cs-hint"><span class="loupe-ic"></span>${matchMedia("(hover: hover)").matches ? "커서를 대면 그 자리만 현상됩니다" : "원이 지나가는 자리만 현상됩니다"}</p>
      </div>
      <div class="cs-label" aria-hidden="true"></div>`;
    atlas.before(hero);
    const pos = hero.querySelector(".cs-layer.pos"), lbl = hero.querySelector(".cs-label");
    const RMAX = Math.min(150, innerWidth * .2);
    let tx = innerWidth * .62, ty = innerHeight * .5, x = tx, y = ty, R = 0, RT = RMAX, auto = !matchMedia("(hover: hover)").matches, t0 = performance.now();
    hero.addEventListener("mousemove", e => {
      const r = hero.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; auto = false;
      const fr = document.elementsFromPoint(e.clientX, e.clientY).find(el => el.classList && el.classList.contains("cs-frame"));
      lbl.textContent = fr ? fr.dataset.t : ""; lbl.classList.toggle("on", !!fr);
    });
    hero.addEventListener("mouseenter", () => { RT = RMAX; document.documentElement.classList.add("in-sheet"); });
    hero.addEventListener("mouseleave", () => { RT = 0; lbl.classList.remove("on"); document.documentElement.classList.remove("in-sheet"); });
    R = 0; setTimeout(() => { R = 1; RT = RMAX; }, 600);
    (function loop(now) {
      if (auto) { const t = (now - t0) / 1000, L = pos.offsetTop, LH = pos.offsetHeight; tx = hero.clientWidth * (.5 + .32 * Math.sin(t * .35)); ty = L + LH * (.5 + .38 * Math.sin(t * .51)); }
      x += (tx - x) * .14; y += (ty - y) * .14; R += (RT - R) * .1;
      pos.style.clipPath = `circle(${R.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`;
      hero.style.setProperty("--lx", x + "px"); hero.style.setProperty("--ly", y + "px"); hero.style.setProperty("--lr", R + "px");
      requestAnimationFrame(loop);
    })(t0);
  }
})();
