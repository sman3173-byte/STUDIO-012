/* STUDIO 012 — About (내용은 data/site.js 의 about 에서 수정) */
(function () {
  const S = window.SITE, A = S.about;
  const list = rows => `<ul>${rows.map(([a, b]) => `<li><span>${a}</span><span>${b}</span></li>`).join("")}</ul>`;
  document.getElementById("about").innerHTML = `
    <figure class="about-emblem"><img src="assets/img/emblem.png" alt="Touching Emotions"></figure>
    <p class="about-statement">${S.thesis.body[0]}</p>
    <div class="about-top">
      <div><img src="${A.portrait}" alt="${S.owner} 사진"></div>
      <div>
        <h1>${S.owner.split(" ")[0]}<span>${S.owner.split(" ").slice(1).join(" ")}</span></h1>
        <p class="school">${A.school}</p>
        <p class="intro">${A.intro}</p>
        <p class="contact"><a href="mailto:${S.email}">${S.email}</a></p>
      </div>
    </div>
    <section class="cv awards"><h2>Awards</h2>${list(A.awards)}</section>
    <section class="cv"><h2>Practice</h2>${list(A.practice || [])}</section>
    <section class="cv"><h2>Experience</h2>${list(A.experience)}</section>
    <section class="cv"><h2>Roles</h2>${list(A.roles)}</section>
    <section class="cv"><h2>Education</h2>${list(A.education)}</section>
    <section class="cv"><h2>Skills</h2>${list(A.skills)}</section>`;
})();
