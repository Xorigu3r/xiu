// XIU · El logo de dalt (mòbil) i de la barra lateral (ordinador) es mou:
//   - en arribar a l'Inici, les tres lletres fan un saltet en onada;
//   - en tocar-lo, les lletres tornen a caure i rebotar (com en obrir l'app) i porta a l'Inici.
(window.XIU_MODULS ||= []).push((A) => {
  if (!window.XIU_LOGO) return;
  const ns = 'http://www.w3.org/2000/svg';
  function logo(img, nomesLletres) {
    if (!img) return null;
    const b = document.createElement('button');
    b.className = img.className + ' logoAnim'; b.type = 'button'; b.setAttribute('aria-label', img.alt || 'XIU'); b.dataset.logo = '';
    b.innerHTML = window.XIU_LOGO;
    const svg = b.querySelector('svg');
    [...svg.querySelectorAll('path')].forEach((p, i) => {
      if (i >= 3 && nomesLletres) return p.remove();
      const g = document.createElementNS(ns, 'g'); g.setAttribute('class', i < 3 ? 'lletra' : 'lema'); g.style.setProperty('--i', i); p.replaceWith(g); g.appendChild(p);
    });
    if (nomesLletres) { svg.querySelectorAll('circle').forEach((c) => c.remove()); svg.setAttribute('viewBox', '503 566 494 268'); }   // com img/logo-curt.svg
    img.replaceWith(b);
    return b;
  }
  const logos = [logo(document.querySelector('.side .logoImg'), false), logo(document.querySelector('.top .logoImg'), true)].filter(Boolean);
  function anima(mode) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (const b of logos) { b.classList.remove('salta', 'cau'); void b.getBoundingClientRect(); b.classList.add(mode); }
  }
  let abans = null;
  A.HOOKS.despres.push(() => {
    const ara = A.ruta === '#/' || A.ruta === '' ? 'inici' : A.ruta;
    if (ara === 'inici' && abans !== 'inici') setTimeout(() => anima('salta'), abans === null ? 1900 : 150);   // el primer cop, després de la pantalla de càrrega
    abans = ara;
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-logo]')) return;
    anima('cau');
    if (A.ruta !== '#/') setTimeout(() => A.go('#/'), 350);
  });
});
