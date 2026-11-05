/* STUDIO 012 — 모든 페이지 공통: 머리말/꼬리말, 라이트박스 */
(function () {
  const S = window.SITE || {};
  const here = (location.pathname.split("/").pop() || "index.html").replace(".html", "");

  /* 머리말 */
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <a class="brand" href="index.html" aria-label="STUDIO 012 처음으로">
      <svg class="mark" viewBox="0 0 66 24" aria-hidden="true"><defs><linearGradient id="o12" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#55602A"/><stop offset="1" stop-color="#C9CF95"/></linearGradient></defs>
        <circle cx="11" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1"/><line x1="28" y1="2.5" x2="28" y2="21.5" stroke="currentColor" stroke-width="1"/>
        <line x1="41.5" y1="17.5" x2="57.5" y2="6.5" stroke="currentColor" stroke-width=".7" opacity=".6"/><circle cx="41" cy="18" r="3.2" fill="url(#o12)"/><circle cx="58" cy="6" r="4.4" fill="url(#o12)"/></svg>
      <span>STUDIO 012</span></a>
    <span class="line" aria-hidden="true"></span>
    <nav class="nav" aria-label="주 메뉴">
      <a href="index.html#works" ${here === "project" ? 'aria-current="page"' : ""}>Works</a>
      <a href="book.html" ${here === "book" ? 'aria-current="page"' : ""}>Book</a>
      <a href="about.html" ${here === "about" ? 'aria-current="page"' : ""}>About</a>
    </nav>`;
  document.body.prepend(header);

  /* 꼬리말 */
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <span>© ${new Date().getFullYear()} STUDIO 012 — ${S.owner || ""}</span>
    <span>${S.email ? `<a href="mailto:${S.email}">${S.email}</a>` : ""}${S.instagram ? ` &nbsp; <a href="${S.instagram}" target="_blank" rel="noopener">Instagram</a>` : ""}</span>`;
  document.body.append(footer);

  /* 스크롤하면 머리말 배경이 생김. 어두운 영역(data-dark) 위에서는 흰 글씨 */
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-solid", y > 40 && !document.body.classList.contains("book-page"));
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("load", onScroll); onScroll();

  /* 라이트박스 — data-zoom 이 붙은 버튼을 누르면 크게 보기 (클릭하면 확대, ←/→ 이동, Esc 닫기) */
  let list = [], idx = 0;
  const lb = document.createElement("div");
  lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "이미지 크게 보기");
  lb.innerHTML = `
    <div class="bar top"><span class="count"></span>
      <div class="ctrls"><button class="prev">이전</button><button class="next">다음</button><button class="close">닫기</button></div></div>
    <div class="stage"><img alt=""></div>
    <div class="bar bottom"><span class="cap"></span><span>클릭하면 확대</span></div>`;
  document.body.append(lb);
  const stage = lb.querySelector(".stage"), img = lb.querySelector("img");
  function show(i) {
    idx = (i + list.length) % list.length;
    const b = list[idx];
    stage.classList.remove("zoomed");
    img.src = b.dataset.zoom; img.alt = b.dataset.caption || "";
    lb.querySelector(".cap").textContent = b.dataset.caption || "";
    lb.querySelector(".count").textContent = `${idx + 1} / ${list.length}`;
  }
  window.STUDIO_openLightbox = function (btn) {
    const group = btn.closest("[data-gallery]") || document;
    list = [...document.querySelectorAll("[data-zoom]")];
    show(list.indexOf(btn));
    lb.classList.add("on"); document.documentElement.style.overflow = "hidden";
    lb.querySelector(".close").focus();
  };
  function close() { lb.classList.remove("on"); document.documentElement.style.overflow = ""; }
  lb.querySelector(".close").onclick = close;
  lb.querySelector(".prev").onclick = () => show(idx - 1);
  lb.querySelector(".next").onclick = () => show(idx + 1);
  stage.addEventListener("click", e => {
    if (e.target !== img) { if (!stage.classList.contains("zoomed")) close(); return; }
    const z = stage.classList.toggle("zoomed");
    if (z) { const r = img.getBoundingClientRect(); stage.scrollLeft = (img.scrollWidth - stage.clientWidth) * ((e.clientX - r.left) / r.width); stage.scrollTop = (img.scrollHeight - stage.clientHeight) * ((e.clientY - r.top) / r.height); }
  });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });
  document.addEventListener("click", e => { const b = e.target.closest("[data-zoom]"); if (b) { e.preventDefault(); window.STUDIO_openLightbox(b); } });
})();
