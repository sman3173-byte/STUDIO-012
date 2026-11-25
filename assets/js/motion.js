/* ============================================================
   STUDIO 012 — 모션 그래픽 · 라이트/다크 전환
   - 머리말: 서울 시계, Light / Dark 버튼, 스크롤 진행 선
   - 첫 방문 인트로 (세션마다 한 번)
   - 페이지 전환 커튼
   - 첫 화면: 궤도를 돌던 글자가 스크롤에 따라 STUDIO 012 로 모임
   - 설계 키워드가 흐르는 띠
   - 스크롤 등장 (글·이미지), 대표 이미지 패럴랙스, 커서
   common.js 다음, 각 페이지 스크립트 다음에 불러옵니다.
   ============================================================ */
(function () {
  const root = document.documentElement;
  const S = window.SITE || {};
  const page = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const ease = t => 1 - Math.pow(1 - t, 3);

  /* ---------- 1) 머리말 : 시계 · 테마 · 진행 선 ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const clock = document.createElement("span");
    clock.className = "clock"; clock.setAttribute("aria-label", "서울 현재 시각");
    const toggle = document.createElement("span");
    toggle.className = "theme-toggle";
    toggle.innerHTML = `<button type="button" data-t="light">Light</button><button type="button" data-t="dark">Dark</button>`;
    const nav = header.querySelector(".nav");
    header.insertBefore(clock, nav);
    header.append(toggle);

    const tick = () => {
      const t = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
      clock.innerHTML = `SEOUL<b>${t}</b>`;
    };
    tick(); setInterval(tick, 15000);

    const paint = () => toggle.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.t === (root.dataset.theme || "dark"))));
    paint();
    toggle.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      root.dataset.theme = b.dataset.t; store.set("s012-theme", b.dataset.t); paint();
    });

    const line = document.createElement("div");
    line.className = "scroll-line"; document.body.append(line);
    const prog = () => { const h = document.documentElement.scrollHeight - innerHeight; line.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; };
    addEventListener("scroll", prog, { passive: true }); addEventListener("resize", prog); prog();
  }

  if (reduce) { revealAll(); return; }

  /* ---------- 2) 페이지 전환 커튼 ---------- */
  const curtain = document.createElement("div");
  curtain.className = "curtain no-anim";
  curtain.innerHTML = `<span class="word">STUDIO 012</span>`;
  document.body.append(curtain);
  const cameFromSite = store.sget("s012-nav") === "1";
  store.sset("s012-nav", "0");
  if (cameFromSite) {
    requestAnimationFrame(() => requestAnimationFrame(() => { curtain.classList.remove("no-anim"); curtain.classList.add("is-up"); }));
  } else { curtain.classList.add("is-up"); requestAnimationFrame(() => curtain.classList.remove("no-anim")); }
  addEventListener("pageshow", e => { if (e.persisted) { curtain.classList.remove("is-down"); curtain.classList.add("is-up"); } });

  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank") return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || a.hasAttribute("download") || url.protocol === "mailto:") return;
    if (url.pathname === location.pathname && url.hash) return;           // 같은 페이지 안 이동
    if (url.pathname === location.pathname && url.search === location.search && !url.hash) return;
    e.preventDefault();
    store.sset("s012-nav", "1");
    curtain.classList.remove("is-up"); curtain.classList.add("is-down");
    setTimeout(() => { location.href = url.href; }, 520);
  });

  /* ---------- 3) 첫 방문 인트로 (홈, 세션당 한 번) ---------- */
  if (page === "index" && store.sget("s012-intro") !== "1" && !cameFromSite) {
    store.sset("s012-intro", "1");
    const intro = document.createElement("div");
    intro.className = "intro";
    const word = "STUDIO 012";
    intro.innerHTML = `<div class="row">${[...word].map((c, i) => c === " " ? `<span class="gap"></span>` :
      `<span style="--x:${Math.round((Math.random() - .5) * 70)}vw;--y:${Math.round((Math.random() - .5) * 60)}vh;--r:${Math.round((Math.random() - .5) * 140)}deg;--d:${(i * .06).toFixed(2)}s">${c}</span>`).join("")}</div>
      <p class="sub">TOUCHING EMOTIONS</p><span class="count">000</span>`;
    document.body.append(intro);
    root.style.overflow = "hidden";
    const cnt = intro.querySelector(".count"), t0 = performance.now();
    const run = now => { const p = clamp((now - t0) / 1700, 0, 1); cnt.textContent = String(Math.round(ease(p) * 100)).padStart(3, "0"); if (p < 1) requestAnimationFrame(run); };
    requestAnimationFrame(() => { intro.classList.add("go"); requestAnimationFrame(run); });
    setTimeout(() => { intro.classList.add("done"); root.style.overflow = ""; }, 2300);
    setTimeout(() => intro.remove(), 3500);
  }

  /* ---------- 4) 첫 화면 : 궤도의 글자 → STUDIO 012 ---------- */
  if (page === "index") {
    const atlas = document.getElementById("atlas");
    if (atlas) {
      const sec = document.createElement("section");
      sec.className = "kinetic"; sec.setAttribute("aria-label", "STUDIO 012");
      const word = "STUDIO 012";
      sec.innerHTML = `<div class="stick">
          <svg class="orb-lines" aria-hidden="true"></svg>
          <div class="measure" aria-hidden="true">${[...word].map(c => `<span>${c}</span>`).join("")}</div>
          <div class="letters" aria-hidden="true">${[...word].map((c, i) => `<span class="ch${/\d/.test(c) ? " num" : ""}">${c}</span>`).join("")}</div>
          <span class="base"></span>
          <p class="cap">Touching Emotions — 흩어진 생각들이 한 문장으로 모입니다.<small>NARRATIVE · SPACE · TECTONICS</small></p>
          <span class="hint"><i></i>SCROLL</span>
        </div>`;
      atlas.after(sec);
      const stick = sec.querySelector(".stick"), svg = sec.querySelector("svg"), measure = sec.querySelector(".measure");
      const chs = [...sec.querySelectorAll(".ch")], base = sec.querySelector(".base"), cap = sec.querySelector(".cap"), hint = sec.querySelector(".hint");
      const NS = "http://www.w3.org/2000/svg";
      let W, H, CX, CY, finals = [], orbits = [];
      const seeds = chs.map((_, i) => ({ ring: i % 3, phase: (i / chs.length) * Math.PI * 2 + i * .7, spin: (i % 2 ? 1 : -1) * (0.00012 + (i % 3) * 0.00005), rot: (Math.random() - .5) * 90 }));
      function layout() {
        W = stick.clientWidth; H = stick.clientHeight; CX = W / 2; CY = H / 2;
        const mr = measure.getBoundingClientRect(), sr = stick.getBoundingClientRect();
        const spans = [...measure.children];
        const totalW = mr.width;
        finals = spans.map(s => { const r = s.getBoundingClientRect(); return { x: CX - totalW / 2 + (r.left - mr.left), y: CY - r.height * .62 }; });
        const lh = spans[0].getBoundingClientRect().height;
        base.style.top = `${CY + lh * .42}px`;
        cap.style.top = `${CY + lh * .42 + 26}px`;
        orbits = [[.42, .2], [.3, .32], [.18, .13]].map(([rx, ry]) => ({ rx: W * rx, ry: H * ry + 30 }));
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
        svg.innerHTML = orbits.map((o, i) => `<ellipse class="${i === 1 ? "dash" : ""}" cx="${CX}" cy="${CY}" rx="${o.rx}" ry="${o.ry}"/>`).join("");
      }
      let prog = 0, vis = false;
      function frame(now) {
        if (!vis) return;
        const p = ease(clamp(prog, 0, 1));
        chs.forEach((el, i) => {
          const sd = seeds[i], o = orbits[sd.ring], a = sd.phase + now * sd.spin * (1 - p);
          const ox = CX + Math.cos(a) * o.rx - 30, oy = CY + Math.sin(a) * o.ry - 40;
          const f = finals[i] || { x: CX, y: CY };
          const x = ox + (f.x - ox) * p, y = oy + (f.y - oy) * p;
          const r = sd.rot * (1 - p) + Math.sin(now * .001 + i) * 6 * (1 - p);
          const s = .55 + .45 * p;
          el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${r}deg) scale(${s})`;
          el.style.opacity = String(.35 + .65 * p);
        });
        svg.style.opacity = String(1 - p * .85);
        svg.style.transform = `scale(${1 - p * .25})`; svg.style.transformOrigin = "50% 50%";
        base.style.transform = `scaleX(${clamp((prog - .55) / .4, 0, 1)})`;
        cap.classList.toggle("on", prog > .82);
        hint.style.opacity = String(1 - clamp(prog * 3, 0, 1));
        requestAnimationFrame(frame);
      }
      const onScroll = () => { const r = sec.getBoundingClientRect(); prog = clamp(-r.top / (r.height - innerHeight), 0, 1); };
      new IntersectionObserver(es => es.forEach(e => { const was = vis; vis = e.isIntersecting; if (vis && !was) requestAnimationFrame(frame); }), { rootMargin: "100px" }).observe(sec);
      addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", () => { layout(); onScroll(); });
      (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { layout(); onScroll(); });
      layout(); onScroll();
    }

    /* ---------- 5) 설계 키워드 띠 ---------- */
    const works = document.getElementById("works");
    if (works && (S.keywords || []).length) {
      const mq = document.createElement("div");
      mq.className = "marquee"; mq.setAttribute("aria-hidden", "true");
      const items = S.keywords.map(k => `<span class="item">${k.en}<em>${k.ko}</em></span>`).join("");
      mq.innerHTML = `<div class="track">${items}${items}</div>`;
      works.before(mq);
      const track = mq.querySelector(".track");
      let x = 0, last = performance.now(), boost = 0, lastY = scrollY;
      addEventListener("scroll", () => { boost = clamp(boost + Math.abs(scrollY - lastY) * .04, 0, 14); lastY = scrollY; }, { passive: true });
      (function loop(now) {
        const dt = Math.min(64, now - last); last = now;
        boost *= .94;
        x -= (0.04 + boost * .02) * dt;
        const half = track.scrollWidth / 2;
        if (half && -x >= half) x += half;
        track.style.transform = `translate3d(${x}px,0,0)`;
        requestAnimationFrame(loop);
      })(last);
    }
  }

  /* ---------- 6) 스크롤 등장 ---------- */
  function splitWords(el) {
    if (!el || el.dataset.split) return;
    el.dataset.split = "1";
    const words = el.textContent.trim().split(/(\s+)/);
    el.innerHTML = words.map((w, i) => /^\s+$/.test(w) ? " " : `<span class="w"><span style="--d:${(i * .035).toFixed(3)}s">${w}</span></span>`).join("");
    el.classList.add("split");
  }
  function mark() {
    const txt = [".section-head", ".thesis-text > *", ".chapter-head .idx", ".chapter-head .body > *", ".p-head .meta", ".p-head .tag", ".p-head .award",
      ".p-meta > div", ".p-next", ".about-top > *", ".about section, .about .sec", ".site-footer", ".figcaption, figcaption"];
    document.querySelectorAll(txt.join(",")).forEach(el => el.classList.add("rv"));
    const imgs = [".work .ph", ".figs .fig > button", ".thesis-figure .ph", ".p-next .ph"];
    document.querySelectorAll(imgs.join(",")).forEach(el => el.classList.add("rv-img"));
    document.querySelectorAll(".p-head h1").forEach(splitWords);
    // 같은 줄의 이웃은 조금씩 늦게
    document.querySelectorAll(".works, .figs, .p-meta").forEach(g => [...g.children].forEach((c, i) => {
      const t = c.matches(".rv, .rv-img") ? c : c.querySelector(".rv-img, .rv");
      if (t) t.style.setProperty("--rd", `${(i % 3) * .12}s`);
    }));
  }
  function revealAll() { document.querySelectorAll(".rv, .rv-img, .split").forEach(el => el.classList.add("in")); }
  mark();
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
  document.querySelectorAll(".rv, .rv-img, .split").forEach(el => io.observe(el));
  setTimeout(() => document.querySelectorAll(".split").forEach(el => el.classList.add("in")), 500);

  /* ---------- 7) 대표 이미지 패럴랙스 ---------- */
  const heroes = [...document.querySelectorAll(".p-hero img, .thesis-figure img")];
  if (heroes.length) {
    const par = () => heroes.forEach(img => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.transform = `translate3d(0,${(k * -7).toFixed(2)}%,0) scale(1.14)`;
    });
    addEventListener("scroll", par, { passive: true }); par();
  }

  /* ---------- 8) 커서 ---------- */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const ring = document.createElement("div"), dot = document.createElement("div");
    ring.className = "cursor hide"; dot.className = "cursor-dot hide";
    ring.innerHTML = "<span>VIEW</span>";
    document.body.append(ring, dot);
    let mx = -100, my = -100, rx = mx, ry = my;
    addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; ring.classList.remove("hide"); dot.classList.remove("hide"); }, { passive: true });
    document.addEventListener("mouseleave", () => { ring.classList.add("hide"); dot.classList.add("hide"); });
    document.addEventListener("mouseover", e => {
      const big = e.target.closest(".work, [data-zoom], .p-next a, .atlas .node.project, .thesis-figure a");
      const link = !big && e.target.closest("a, button");
      ring.classList.toggle("big", !!big);
      ring.classList.toggle("link", !!link);
      ring.querySelector("span").textContent = e.target.closest("[data-zoom]") ? "ZOOM" : "VIEW";
    });
    (function loop() {
      rx += (mx - rx) * .16; ry += (my - ry) * .16;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
      requestAnimationFrame(loop);
    })();

    // 메뉴 글자가 커서 쪽으로 살짝 끌려옴
    document.querySelectorAll(".nav a, .theme-toggle button").forEach(a => {
      a.style.display = "inline-block"; a.style.transition = "transform .5s cubic-bezier(.2,.8,.1,1), color .3s";
      a.addEventListener("mousemove", e => { const r = a.getBoundingClientRect(); a.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .3}px,${(e.clientY - r.top - r.height / 2) * .4}px)`; });
      a.addEventListener("mouseleave", () => { a.style.transform = ""; });
    });
  }
})();
