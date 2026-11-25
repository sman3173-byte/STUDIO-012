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

  /* ---------- 2) 원 확장 페이지 전환 (로고의 0) ----------
     링크를 누른 자리에서 원이 커져 화면을 덮고, 다음 페이지에서는
     그 원이 머리말 로고의 원으로 줄어들며 사라집니다.
     프로젝트로 갈 때는 그 프로젝트 버블과 같은 색입니다.            */
  const ORB = [["#6A5BD6","#E07BB5","#FFB774"],["#7FD6A8","#D5EE8A","#EAF59A"],["#F2B65E","#E8665A","#FFE9B0"],["#6FA4F2","#8FE0F2","#C2F4FF"],
               ["#4FCFD8","#7FA8F0","#B3F7D8"],["#8C6FA0","#D49A8E","#EAC4A2"],["#B3A9F0","#F0B8D8","#F6D2E8"],["#9CC49A","#D6E2A0","#E1EBB4"]];
  const desat = hex => {                       // 버블과 같이 채도 20% 낮춤
    let [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    let h = 0, s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
    if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return `hsl(${Math.round(h * 60 + 360) % 360} ${(s * 80).toFixed(1)}% ${(l * 100).toFixed(1)}%)`;
  };
  const PL = (window.PROJECTS || []).filter(p => !p.draft);
  const veilFor = (href, label) => {
    const id = new URL(href, location.href).hash.slice(1);
    const i = PL.findIndex(p => p.id === id);
    if (i >= 0 && /project\.html$/.test(new URL(href, location.href).pathname)) {
      const [a, b, c] = ORB[i % ORB.length].map(desat);
      return { bg: `radial-gradient(circle at 50% 50%, ${c} 0%, ${b} 38%, ${a} 100%)`, ink: "#15160F", label: PL[i].title };
    }
    if (/film\.html$/.test(new URL(href, location.href).pathname))           // 필름 : 암실 안전등 · 필름 베이스 색
      return { bg: "radial-gradient(circle at 50% 50%, #F2B36A 0%, #C2581F 40%, #2A1209 100%)", ink: "#FBEBD8", label: "Film Archive" };
    return { bg: "radial-gradient(circle at 50% 50%, #C9CF95 0%, #7D8843 45%, #283012 100%)", ink: "#ECEBE4", label: label || "STUDIO 012" };
  };
  const veil = document.createElement("div");
  veil.className = "orb-veil";
  veil.innerHTML = `<span class="lbl"></span>`;
  document.body.append(veil);
  const setVeil = v => { veil.style.background = v.bg; veil.style.color = v.ink; veil.querySelector(".lbl").textContent = v.label; };
  const logoCenter = () => {
    const c = document.querySelector(".site-header .mark circle");
    if (!c) return [32, 27];
    const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2];
  };
  let arriving = null;
  try { arriving = JSON.parse(store.sget("s012-veil") || "null"); } catch (e) {}
  store.sset("s012-veil", "");
  const cameFromSite = !!arriving;
  if (arriving) {
    setVeil(arriving);
    veil.classList.add("still", "full", "show-lbl");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const [x, y] = logoCenter();
      veil.style.setProperty("--x", x + "px"); veil.style.setProperty("--y", y + "px");
      veil.classList.remove("still");
      setTimeout(() => { veil.classList.remove("show-lbl"); veil.classList.remove("full"); }, 220);
    }));
  }
  addEventListener("pageshow", e => { if (e.persisted) veil.classList.remove("full", "show-lbl", "still"); });

  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank") return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || a.hasAttribute("download") || url.protocol === "mailto:") return;
    if (url.pathname === location.pathname && url.hash && !/project\.html$/.test(url.pathname)) return;   // 같은 페이지 안 이동
    if (url.href === location.href) return;
    e.preventDefault();
    const v = veilFor(url.href, (a.textContent || "").trim().slice(0, 30));
    setVeil(v);
    veil.style.setProperty("--x", e.clientX + "px"); veil.style.setProperty("--y", e.clientY + "px");
    veil.classList.add("still"); veil.classList.remove("full");
    store.sset("s012-veil", JSON.stringify(v));
    requestAnimationFrame(() => requestAnimationFrame(() => { veil.classList.remove("still"); veil.classList.add("full", "show-lbl"); }));
    setTimeout(() => { location.href = url.href; }, 780);
  });

  /* ---------- 3) 첫 방문 인트로 : 로고가 한 획씩 그려짐 (홈, 세션당 한 번) ---------- */
  const LOGO_SVG = (id, cls = "") => `<svg class="${cls}" viewBox="0 0 66 24" aria-hidden="true">
      <defs><linearGradient id="${id}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#55602A"/><stop offset="1" stop-color="#C9CF95"/></linearGradient></defs>
      <circle class="l0" cx="11" cy="12" r="9" pathLength="1"/>
      <line class="l1" x1="28" y1="2.5" x2="28" y2="21.5" pathLength="1"/>
      <line class="l2" x1="41.5" y1="17.5" x2="57.5" y2="6.5" pathLength="1"/>
      <circle class="d1" cx="41" cy="18" r="3.2" fill="url(#${id})"/><circle class="d2" cx="58" cy="6" r="4.4" fill="url(#${id})"/></svg>`;
  if (page === "index" && store.sget("s012-intro") !== "1" && !cameFromSite) {
    store.sset("s012-intro", "1");
    const intro = document.createElement("div");
    intro.className = "intro2";
    intro.innerHTML = `<div class="box">${LOGO_SVG("o12i", "big")}
        <p class="word">${[..."STUDIO 012"].map((c, i) => `<span style="--d:${(1.5 + i * .05).toFixed(2)}s">${c === " " ? "&nbsp;" : c}</span>`).join("")}</p>
        <p class="sub">TOUCHING EMOTIONS</p></div>`;
    document.body.append(intro);
    root.style.overflow = "hidden";
    requestAnimationFrame(() => requestAnimationFrame(() => intro.classList.add("go")));
    setTimeout(() => {
      const c = intro.querySelector(".l0").getBoundingClientRect();
      intro.style.setProperty("--x", c.left + c.width / 2 + "px"); intro.style.setProperty("--y", c.top + c.height / 2 + "px");
      intro.classList.add("out"); root.style.overflow = "";
    }, 2900);
    setTimeout(() => intro.remove(), 4200);
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
      (atlas.closest(".split-hero") || atlas).after(sec);
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

  /* ---------- 8) 로고 커서 : 0 → 1 → 2 ----------
     기본은 원(0), 링크 위에서는 세로선(1), 작품 위에서는 이어진 두 점(2) */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const cur = document.createElement("div"), dot = document.createElement("div");
    cur.className = "lcur hide"; dot.className = "cursor-dot hide";
    cur.innerHTML = `<svg viewBox="-24 -24 48 48" aria-hidden="true">
        <circle class="s0" r="11"/><line class="s1" y1="-15" y2="15"/>
        <g class="s2"><line x1="-9" y1="7" x2="9" y2="-7"/><circle cx="-9.5" cy="7.5" r="3.4"/><circle cx="10" cy="-7.5" r="4.6"/></g></svg><span>VIEW</span>`;
    document.body.append(cur, dot);
    root.classList.add("lcur-on");
    let mx = -100, my = -100, rx = mx, ry = my;
    addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; cur.classList.remove("hide"); dot.classList.remove("hide"); }, { passive: true });
    document.addEventListener("mouseleave", () => { cur.classList.add("hide"); dot.classList.add("hide"); });
    document.addEventListener("mouseover", e => {
      const work = e.target.closest(".work, [data-zoom], .p-next a, .atlas .node, .thesis-figure a");
      const link = !work && e.target.closest("a, button");
      cur.classList.toggle("is-2", !!work);
      cur.classList.toggle("is-1", !!link);
      cur.querySelector("span").textContent = e.target.closest("[data-zoom]") ? "ZOOM" : e.target.closest(".atlas .node.keyword") ? "LINK" : "VIEW";
    });
    addEventListener("mousedown", () => cur.classList.add("press")); addEventListener("mouseup", () => cur.classList.remove("press"));
    (function loop() {
      rx += (mx - rx) * .18; ry += (my - ry) * .18;
      cur.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll(".nav a, .theme-toggle button").forEach(a => {
      a.style.display = "inline-block"; a.style.transition = "transform .5s cubic-bezier(.2,.8,.1,1), color .3s";
      a.addEventListener("mousemove", e => { const r = a.getBoundingClientRect(); a.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .3}px,${(e.clientY - r.top - r.height / 2) * .4}px)`; });
      a.addEventListener("mouseleave", () => { a.style.transform = ""; });
    });
  }

  /* ---------- 9) 머리말 로고 = 스크롤 진행률 ----------
     원(0)에 스크롤한 만큼 올리브 선이 차오르고, 두 점(2)은 스크롤 속도만큼 기울어짐 */
  const logoMark = document.querySelector(".site-header .mark");
  if (logoMark) {
    const NS = "http://www.w3.org/2000/svg";
    const ring = document.createElementNS(NS, "circle");
    ring.setAttribute("cx", "11"); ring.setAttribute("cy", "12"); ring.setAttribute("r", "9"); ring.setAttribute("pathLength", "1");
    ring.setAttribute("class", "prog"); ring.setAttribute("transform", "rotate(-90 11 12)");
    logoMark.append(ring);
    const g = document.createElementNS(NS, "g"); g.setAttribute("class", "pair");
    [...logoMark.querySelectorAll("line")].slice(1).concat([...logoMark.querySelectorAll("circle")].slice(1, 3)).forEach(n => g.append(n));
    logoMark.append(g);
    let lastY = scrollY, vel = 0, ang = 0;
    (function loop() {
      const h = document.documentElement.scrollHeight - innerHeight;
      ring.style.strokeDashoffset = String(1 - (h > 0 ? scrollY / h : 0));
      vel += ((scrollY - lastY) - vel) * .12; lastY = scrollY;
      ang += (clamp(vel * 1.4, -40, 40) - ang) * .1;
      g.style.transform = `rotate(${ang.toFixed(2)}deg)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- 10) 도면 축선 · 단면 컷 구분선 (로고의 1) ---------- */
  const AX = ["X1", "X2", "X3", "X4", "X5"];
  document.querySelectorAll(".chapter, #works, #practice, .thesis").forEach((sec, si) => {
    if (sec.querySelector(":scope > .axes")) return;
    const ax = document.createElement("div");
    ax.className = "axes"; ax.setAttribute("aria-hidden", "true");
    ax.innerHTML = AX.map((t, i) => `<i class="ax" style="--i:${i};left:calc(var(--gutter) + (100% - 2 * var(--gutter)) * ${i / (AX.length - 1)})"><b>${t}</b></i>`).join("")
      + `<i class="ay"><b>Y${si % 4 + 1}</b></i>`;
    sec.classList.add("has-axes");
    sec.prepend(ax);
    io.observe(ax);
  });
  [...document.querySelectorAll(".chapter")].forEach((ch, i) => {
    if (i === 0) return;
    const L = String.fromCharCode(65 + ((i - 1) % 26));
    const cut = document.createElement("div");
    cut.className = "cut"; cut.setAttribute("aria-hidden", "true");
    cut.innerHTML = `<span class="end"><em>${L}</em></span><i></i><span class="end r"><em>${L}'</em></span>`;
    ch.before(cut); io.observe(cut);
  });

  /* ---------- 11) 제목 디코딩 : 0 1 2 ○ | / 글리프에서 글자로 ---------- */
  const GL = "012○|/×+·";
  function decode(el) {
    if (el.dataset.dec) return; el.dataset.dec = "1";
    const txt = el.textContent, chars = [...txt], t0 = performance.now(), dur = 900 + chars.length * 18;
    el.style.minHeight = el.offsetHeight + "px";
    (function step(now) {
      const p = clamp((now - t0) / dur, 0, 1);
      el.textContent = chars.map((c, i) => c === " " ? " " : (i / chars.length < p * 1.15 - .1 ? c : GL[(Math.random() * GL.length) | 0])).join("");
      if (p < 1) requestAnimationFrame(step); else { el.textContent = txt; el.style.minHeight = ""; }
    })(t0);
  }
  const io3 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { decode(e.target); io3.unobserve(e.target); } }), { threshold: .6 });
  document.querySelectorAll(".chapter-head h2, .section-head h2, .cv h2, .roll-head h2").forEach(h => io3.observe(h));

  /* ---------- 12) 페이지 끝 대형 로고 ---------- */
  const foot = document.querySelector(".site-footer");
  if (foot && !document.body.classList.contains("book-page")) {
    const so = document.createElement("section");
    so.className = "sign-off";
    so.innerHTML = `${LOGO_SVG("o12f", "giant")}
      <div class="so-text"><p class="k">Touching Emotions</p>
        <p class="t">한 문장에서 시작하는 건축,<br>다음 문장을 함께 쓸 사람을 찾습니다.</p>
        ${S.email ? `<a class="mail" href="mailto:${S.email}">${S.email}<i></i></a>` : ""}</div>`;
    foot.before(so);
    const parts = [...so.querySelectorAll(".l0, .l1, .l2")], dots = so.querySelectorAll(".d1, .d2"), txt = so.querySelector(".so-text");
    const ranges = [[0, .55], [.35, .7], [.55, .85]];
    const draw = () => {
      const r = so.getBoundingClientRect();
      const p = clamp((innerHeight - r.top) / (r.height * .95), 0, 1);
      parts.forEach((el, i) => { const [a, b] = ranges[i]; el.style.strokeDashoffset = String(1 - clamp((p - a) / (b - a), 0, 1)); });
      dots.forEach((d, i) => { const q = clamp((p - .78 - i * .06) / .12, 0, 1); d.style.transform = `scale(${ease(q)})`; });
      txt.classList.toggle("on", p > .8);
    };
    addEventListener("scroll", draw, { passive: true }); addEventListener("resize", draw); draw();
  }
})();
