/* STUDIO 012 — 첫 화면
   1) 버블 다이어그램 (프로젝트 ● 검정 / 설계 키워드 ● 올리브)
   2) 지향하는 건축 (thesis) + 대표 렌더
   3) 작업 목록 (흑백 → 마우스 올리면 컬러)                       */
(function () {
  const S = window.SITE, P = (window.PROJECTS || []).filter(p => !p.draft);
  const img = (p, f, thumb) => `assets/img/${p.id}/${thumb ? f.replace(".jpg", "_t.jpg") : f}`;
  const url = p => `project.html#${p.id}`;

  /* ---------- 2) thesis ---------- */
  const T = S.thesis, feat = P[0];
  document.getElementById("thesis").innerHTML = `
    <div class="thesis-text">
      <p class="kicker">${T.title}</p>
      <p class="lead">${T.lead}</p>
      ${T.body.map(t => `<p>${t}</p>`).join("")}
      <p class="motto">${T.motto}</p>
    </div>
    <figure class="thesis-figure">
      <a href="${url(feat)}"><div class="ph"><img src="${img(feat, feat.hero)}" alt="${feat.title} 대표 투시도" loading="lazy"></div></a>
      <figcaption>${feat.title}, ${feat.year}<br>${feat.subtitle}</figcaption>
    </figure>`;

  /* ---------- 3) works ---------- */
  const card = p => `
    <a class="work" href="${url(p)}">
      <div class="ph"><img src="${img(p, p.cover, true)}" alt="${p.title}" loading="lazy"></div>
      <div class="cap"><span class="t">${p.title}</span><span class="y">${p.year}</span><span class="s">${p.subtitle}</span><span class="bar"></span></div>
    </a>`;
  const WK = P.filter(p => p.category !== "practice"), PR = P.filter(p => p.category === "practice");
  document.getElementById("works-count").textContent = `${WK.length} projects`;
  document.getElementById("works-grid").innerHTML = WK.map(card).join("");
  const pr = document.getElementById("practice");
  if (pr) { pr.hidden = !PR.length; document.getElementById("practice-count").textContent = `${PR.length} projects`; document.getElementById("practice-grid").innerHTML = PR.map(card).join(""); }

  /* ---------- 1) bubble diagram ---------- */
  const atlas = document.getElementById("atlas");
  if (!window.d3) { document.getElementById("atlas-note").textContent = "다이어그램을 불러오지 못했습니다. 아래 목록에서 프로젝트를 볼 수 있습니다."; return; }

  const used = new Set(P.flatMap(p => p.keywords || []));
  const nodes = [
    { id: "core", type: "core", label: T.title },
    ...P.map(p => ({ id: p.id, type: "project", label: p.title, year: p.year, p })),
    ...S.keywords.filter(k => used.has(k.id)).map(k => ({ id: "k:" + k.id, type: "keyword", label: k.ko, en: k.en }))
  ];
  const links = [
    ...P.map(p => ({ source: "core", target: p.id, kind: "core" })),
    ...P.flatMap(p => (p.keywords || []).map(k => ({ source: "k:" + k, target: p.id, kind: "kw" })))
  ];
  const nb = new Map(nodes.map(n => [n.id, new Set([n.id])]));
  links.forEach(l => { nb.get(l.source).add(l.target); nb.get(l.target).add(l.source); });

  const svg = d3.select("#atlas-svg");
  const defs = svg.append("defs");
  /* 프로젝트 = 평면적인 글래스 그라데이션 — 하이라이트·그림자 없이 색만 부드럽게 번짐 */
  // 천체 팔레트 — [밝은 쪽, 깊은 쪽, 겹치는 빛]  (프로젝트 순서대로, 넘치면 반복)
  // 천체 팔레트 — 명도가 비슷한 두 색을 옆으로 넘겨 평면으로 [왼쪽, 오른쪽, 위성 빛]
  const ORB = [["#6A5BD6","#E07BB5","#FFB774"],   // 성운 · 황혼
               ["#7FD6A8","#D5EE8A","#EAF59A"],   // 오로라
               ["#F2B65E","#E8665A","#FFE9B0"],   // 태양
               ["#6FA4F2","#8FE0F2","#C2F4FF"],   // 푸른 행성
               ["#4FCFD8","#7FA8F0","#B3F7D8"],   // 바다 별
               ["#8C6FA0","#D49A8E","#EAC4A2"],   // 희미한 성운
               ["#B3A9F0","#F0B8D8","#F6D2E8"],   // 라벤더 별
               ["#9CC49A","#D6E2A0","#E1EBB4"]];  // 숲의 별
  P.forEach((p, i) => {
    // 채도를 살짝 낮춤 (desat: 1 = 원색, 0.8 = 20% 덜 쨍하게)
    const desat = x => { const h = d3.hsl(x); h.s *= .8; return h.formatHex(); };
    const [a, b, c] = ORB[i % ORB.length].map(desat);
    const g = defs.append("linearGradient").attr("id", "orb-" + p.id).attr("x1", "0%").attr("y1", "60%").attr("x2", "100%").attr("y2", "40%");
    g.append("stop").attr("offset", "0%").attr("stop-color", a);
    g.append("stop").attr("offset", "100%").attr("stop-color", b);
    defs.append("radialGradient").attr("id", "orb2-" + p.id).call(r => {
      r.append("stop").attr("offset", "0%").attr("stop-color", c).attr("stop-opacity", .9);
      r.append("stop").attr("offset", "100%").attr("stop-color", c).attr("stop-opacity", 0);
    });
  });
  // 크기에 비례해 가장자리를 흐리게 (objectBoundingBox 단위)
  defs.append("filter").attr("id", "soft").attr("primitiveUnits", "objectBoundingBox").attr("x", "-40%").attr("y", "-40%").attr("width", "180%").attr("height", "180%")
    .append("feGaussianBlur").attr("stdDeviation", .07);
  defs.append("filter").attr("id", "softer").attr("primitiveUnits", "objectBoundingBox").attr("x", "-60%").attr("y", "-60%").attr("width", "220%").attr("height", "220%")
    .append("feGaussianBlur").attr("stdDeviation", .14);

  /* 별가루 — 바탕에 흩어진 작은 점들 (일부는 깜빡임) */
  const gS = svg.append("g").attr("class", "stars");
  const stars = d3.range(170).map(i => ({ x: Math.random(), y: Math.random(), r: Math.random() < .9 ? .35 + Math.random() * .6 : 1 + Math.random() * .6, o: .15 + Math.random() * .6, tw: Math.random() < .18 }));
  const star = gS.selectAll("circle").data(stars).join("circle").attr("r", d => d.r).attr("opacity", d => d.o)
    .attr("class", d => d.tw ? "tw" : null).style("animation-delay", () => (Math.random() * 6).toFixed(2) + "s");

  defs.append("filter").attr("id", "frost").attr("primitiveUnits", "objectBoundingBox")
    .attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%")
    .append("feGaussianBlur").attr("stdDeviation", .11);
  const gO = svg.append("g").attr("class", "orbits"), gL = svg.append("g"), gN = svg.append("g");
  const link = gL.selectAll("line").data(links).join("line").attr("class", d => "link " + d.kind);
  /* 프로젝트·중심을 감싸는 궤도 (실선 + 점선) */
  const orbitNodes = nodes.filter(n => n.type !== "keyword");
  const orbit = gO.selectAll("g").data(orbitNodes).join("g").attr("class", d => "orbit " + d.type);
  orbit.append("circle").attr("class", "ring");
  orbit.append("circle").attr("class", "ring dash");
  orbit.filter(d => d.type === "core").append("circle").attr("class", "ring tick");      // 눈금 고리
  orbit.filter(d => d.type === "core").append("circle").attr("class", "ring far");       // 화면 밖까지 이어지는 큰 궤도
  /* 위성 — 각 궤도를 따라 도는 작은 빛 */
  const sat = orbit.append("g").attr("class", "sat");
  sat.append("circle").attr("class", "sat-dot");
  const pIndex = new Map(P.map((p, i) => [p.id, i]));
  const accent = d => d.type === "core" ? "#ECEBE4" : ORB[pIndex.get(d.id) % ORB.length][2];
  sat.select(".sat-dot").attr("fill", accent);

  const node = gN.selectAll("g").data(nodes).join("g")
    .attr("class", d => "node " + d.type)
    .attr("tabindex", d => d.type !== "keyword" ? 0 : null)
    .attr("role", d => d.type !== "keyword" ? "link" : null)
    .attr("aria-label", d => d.type === "project" ? `${d.label} 프로젝트 보기` : d.type === "core" ? "소개 페이지로 이동" : null);

  // 중심: 이중 원
  // 중심: 흰색 글래스 (흐린 흰 색면 + 유리판) 위에 이중 원
  const cg = defs.append("linearGradient").attr("id", "orb-core").attr("x1", "0%").attr("y1", "60%").attr("x2", "100%").attr("y2", "40%");
  cg.append("stop").attr("offset", "0%").attr("stop-color", "#F4F3EE");
  cg.append("stop").attr("offset", "100%").attr("stop-color", "#DCDBD3");
  node.filter(d => d.type === "core").call(g => {
    g.append("circle").attr("class", "c-color").attr("fill", "url(#orb-core)").attr("filter", "url(#frost)");
    g.append("circle").attr("class", "c-glass");
    g.append("circle").attr("class", "c-out"); g.append("circle").attr("class", "c-in");
  });
  // 프로젝트: 그라데이션 구
  // 프로젝트: 완전히 평면인 원 — 두 색이 사선으로 넘어가는 선형 그라데이션 한 장 (흐림·하이라이트·그림자 없음)
  // 프로젝트: 평면 글래스 — 같은 명도의 두 색이 옆으로 번지는 흐린 색면 + 그 위의 반투명 유리판
  //   (빛 방향·하이라이트·어두운 테두리 없음 → 입체로 보이지 않음)
  node.filter(d => d.type === "project").append("g").attr("class", "orb").call(g => {
    g.append("circle").attr("class", "orb-color").attr("fill", d => `url(#orb-${d.id})`).attr("filter", "url(#frost)");
    g.append("circle").attr("class", "orb-glass");
  });
  // 키워드: 선으로 그린 작은 원
  node.filter(d => d.type === "keyword").append("circle").attr("class", "kw");

  const label = node.append("text").attr("class", "lbl");
  label.filter(d => d.type === "core").each(function (d) {
    const w = d.label.split(" "), t = d3.select(this);
    w.forEach((x, i) => t.append("tspan").attr("x", 0).attr("dy", i ? "1.2em" : `${-(w.length - 1) * .6 + .35}em`).text(x));
  });
  label.filter(d => d.type === "keyword").attr("dy", ".35em").text(d => d.label);
  const cut = (t, n) => t && t.length > n ? t.slice(0, n - 1) + "…" : (t || "");
  label.filter(d => d.type === "project").each(function (d) {
    const t = d3.select(this), p = d.p;
    t.append("tspan").attr("class", "ttl").attr("x", 0).text(p.title);
    const notes = [`${p.year}${p.category === "practice" ? " · Practice" : ""}`, cut(p.context, 26), p.award].filter(Boolean);
    notes.forEach((n, i) => t.append("tspan").attr("class", "note").attr("x", 0).attr("dy", i ? "1.45em" : "1.9em").text("• " + n));
  });

  let W, H, R, OR;
  function size() {
    const r = atlas.getBoundingClientRect(); W = r.width; H = r.height;
    const m = Math.min(W, H), small = W < 640;
    R = { core: small ? 40 : Math.max(46, m * .066), project: small ? 22 : Math.max(26, m * .04), keyword: small ? 15 : Math.max(19, m * .024) };
    OR = { core: [R.core * 2.9, R.core * 4.4], project: [R.project * 1.85, R.project * 2.6] };
    node.select(".c-out").attr("r", R.core); node.select(".c-in").attr("r", R.core - 5);
    node.select(".c-color").attr("r", R.core * 1.05); node.select(".c-glass").attr("r", R.core * .82);
    node.select(".orb-color").attr("r", R.project * 1.05);
    node.select(".orb-glass").attr("r", R.project * .82);
    node.select(".kw").attr("r", R.keyword);
    orbit.select(".ring").attr("r", d => OR[d.type][0]);
    orbit.select(".ring.dash").attr("r", d => OR[d.type][1]);
    orbit.select(".ring.tick").attr("r", R.core * 1.42);
    orbit.select(".ring.far").attr("r", R.core * 6.2);
    sat.select(".sat-dot").attr("r", d => d.type === "core" ? 2.4 : 1.8).attr("cx", d => OR[d.type][0]);
    star.attr("cx", d => d.x * W).attr("cy", d => d.y * H);
    label.filter(d => d.type === "project").attr("transform", `translate(${R.project + 10}, ${-R.project * .35})`);
    label.filter(d => d.type === "project").selectAll(".note").style("display", small ? "none" : null);
    label.filter(d => d.type === "project")
      .attr("transform", small ? `translate(0, ${R.project + 14})` : `translate(${R.project + 10}, ${-R.project * .35})`)
      .attr("text-anchor", small ? "middle" : "start");
    if (sim) {
      CX = W * (small ? .5 : .5); CY = H * (small ? .4 : .45);
      const core = nodes[0]; core.fx = CX; core.fy = CY;
      // 궤도처럼: 프로젝트는 바깥 타원, 키워드는 안쪽 타원 위로 모임
      E = small ? { project: [W * .36, H * .25], keyword: [W * .2, H * .13] }
                : { project: [Math.min(W * .34, 560), H * .33], keyword: [Math.min(W * .17, 280), H * .19] };
      sim.force("link").distance(l => l.kind === "core" ? Math.hypot(...E.project) * .7 : OR.project[0]).strength(l => l.kind === "core" ? .02 : .06);
      sim.force("charge").strength(d => d.type === "keyword" ? (small ? -40 : -90) : (small ? -160 : -500));
      sim.force("collide").radius(d => d.type === "keyword" ? R.keyword + (small ? 4 : 8) : d.type === "core" ? R.core + 16 : R.project + (small ? 22 : 46));
      sim.alpha(.8).restart();
    }
  }
  let CX = 0, CY = 0, E = null;
  function ellipse(alpha) {
    if (!E) return;
    nodes.forEach(n => {
      const e = E[n.type]; if (!e || n.fx != null) return;
      const ang = Math.atan2((n.y - CY) / e[1], (n.x - CX) / e[0]);
      n.vx += (CX + e[0] * Math.cos(ang) - n.x) * .08 * alpha;
      n.vy += (CY + e[1] * Math.sin(ang) - n.y) * .08 * alpha;
    });
  }

  const sim = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).strength(l => l.kind === "core" ? .45 : .32))
    .force("charge", d3.forceManyBody())
    .force("collide", d3.forceCollide(20))
    .force("ellipse", ellipse)
    .alphaDecay(.02).velocityDecay(.38);
  { const r0 = atlas.getBoundingClientRect();
    const pr = nodes.filter(n => n.type === "project"), kw = nodes.filter(n => n.type === "keyword");
    pr.forEach((n, i) => { const a = i / pr.length * Math.PI * 2 - Math.PI / 2; n.x = r0.width * (.5 + .3 * Math.cos(a)); n.y = r0.height * (.45 + .3 * Math.sin(a)); });
    kw.forEach((n, i) => { const a = i / kw.length * Math.PI * 2; n.x = r0.width * (.5 + .15 * Math.cos(a)); n.y = r0.height * (.45 + .17 * Math.sin(a)); });
    nodes.forEach((n, i) => { n.phase = i * 1.7; });
    nodes[0].x = r0.width * .5; nodes[0].y = r0.height * .45; }
  size();

  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  sim.on("tick", () => {
    const small = W < 640, top = 80, bottom = small ? 150 : 110;
    nodes.forEach(n => {
      const padL = n.type === "keyword" ? R.keyword + 8 : n.type === "core" ? R.core + 10 : small ? 56 : R.project + 10;
      const padR = n.type === "project" && !small ? 190 : n.type === "project" ? 56 : padL;
      n.x = Math.max(padL, Math.min(W - padR, n.x));
      n.y = Math.max(top, Math.min(H - bottom, n.y));
      if (!small && n.x < W * .34 && n.y > H - 280) n.y = H - 280;   // 왼쪽 아래 문구 자리 비우기
    });
    link.each(function (d) {
      const dx = d.target.x - d.source.x, dy = d.target.y - d.source.y, len = Math.hypot(dx, dy) || 1;
      const rs = R[d.source.type] + 2, rt = R[d.target.type] + 2;
      d3.select(this).attr("x1", d.source.x + dx / len * rs).attr("y1", d.source.y + dy / len * rs)
        .attr("x2", d.target.x - dx / len * rt).attr("y2", d.target.y - dy / len * rt);
    });
    node.attr("transform", d => `translate(${d.x},${d.y})`);
    orbit.attr("transform", d => `translate(${d.x},${d.y})`);
  });

  link.filter(d => d.kind === "core").attr("stroke", d => accent(typeof d.target === "object" ? d.target : { id: d.target, type: "project" }));
  /* 천천히 떠다니는 움직임 */
  if (!still) d3.timer(t => {
    nodes.forEach(n => { if (n.fx == null) { n.vx += Math.sin(t * .00035 + n.phase) * .018; n.vy += Math.cos(t * .00029 + n.phase * 1.3) * .018; } });
    // 가운데 원도 제자리 주변을 천천히 맴돈다 (궤도의 중심은 유지)
    sat.attr("transform", d => `rotate(${(t * (d.type === "core" ? .004 : .012) + (d.phase || 0) * 57) % 360})`);
    const c = nodes[0];
    if (!c.dragging) { c.fx = CX + Math.sin(t * .00031) * R.core * .9; c.fy = CY + Math.cos(t * .00023) * R.core * .6; }
    if (sim.alpha() < .03) sim.alpha(.03).restart();
  });

  /* 드래그 */
  let dragged = false;
  node.call(d3.drag()
    .on("start", (e, d) => { dragged = false; d.dragging = true; if (!e.active) sim.alphaTarget(.2).restart(); d.fx = d.x; d.fy = d.y; })
    .on("drag", (e, d) => { dragged = true; d.fx = e.x; d.fy = e.y; place(d); })
    .on("end", (e, d) => { d.dragging = false; if (!e.active) sim.alphaTarget(0); if (d.type === "core") { d.fx = CX; d.fy = CY; } else if (active !== d) { d.fx = null; d.fy = null; } }));

  /* 강조 + 미리보기 카드 */
  const peek = document.getElementById("peek");
  let active = null;
  function focus(d) {
    if (active && active !== d && active.type !== "core") { active.fx = null; active.fy = null; }
    if (d && d.type !== "core") { d.fx = d.x; d.fy = d.y; }      // 마우스를 올린 버블은 멈춤 → 클릭하기 쉽게
    active = d;
    atlas.classList.toggle("is-focus", !!d);
    if (!d) { node.classed("on", false); link.classed("on", false); orbit.classed("on", false); peek.classList.remove("on"); return; }
    const set = new Set(nb.get(d.id));
    node.classed("on", n => set.has(n.id));
    link.classed("on", l => l.source.id === d.id || l.target.id === d.id);
    orbit.classed("on", o => set.has(o.id));
    if (d.type === "project") {
      const p = d.p;
      peek.innerHTML = `<a href="${url(p)}"><div class="ph"><img src="${img(p, p.cover, true)}" alt=""></div>
        <div class="meta"><b>${p.title}</b><span>${p.subtitle}</span></div></a>`;
      place(d);
      requestAnimationFrame(() => peek.classList.add("on"));
    } else peek.classList.remove("on");
  }
  function place(d) {
    if (!active || active !== d || d.type !== "project") return;
    const w = peek.offsetWidth || 280, h = peek.offsetHeight || 260;
    let x = d.x + R.project + 190, y = d.y - h / 2;
    if (x + w > W - 12) x = d.x - R.project - 18 - w;
    if (x < 12) x = Math.max(12, Math.min(W - w - 12, d.x - w / 2));
    y = Math.max(70, Math.min(H - h - 16, y));
    peek.style.left = x + "px"; peek.style.top = y + "px";
  }
  sim.on("tick.peek", () => active && place(active));

  const touch = matchMedia("(hover: none)").matches;
  node.on("mouseenter", (e, d) => { if (!touch && d.type !== "core") focus(d); })
      .on("mouseleave", () => { if (!touch) setTimeout(() => { if (!peek.matches(":hover")) focus(null); }, 60); })
      .on("focus", (e, d) => focus(d)).on("blur", () => focus(null))
      .on("click", (e, d) => {
        if (dragged) return;
        if (d.type === "project") {
          if (touch && active !== d) { focus(d); return; }     // 모바일: 첫 탭 = 미리보기, 두 번째 탭 = 이동
          location.href = url(d.p);
        } else if (d.type === "keyword") focus(active === d ? null : d);
        else location.href = "about.html";
      })
      .on("keydown", (e, d) => { if (e.key !== "Enter") return; if (d.type === "project") location.href = url(d.p); if (d.type === "core") location.href = "about.html"; });
  peek.addEventListener("mouseleave", () => focus(null));
  svg.on("click", e => { if (e.target.tagName === "svg") focus(null); });

  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(size, 120); });
})();
