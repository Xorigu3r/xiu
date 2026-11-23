// XIU · Jocs interactius per fer a la pantalla (recursos amb tipus «joc»):
//   memory (parelles), quantitats (compta i tria el nombre), mida (de petit a gran), ombres (cada dibuix amb la seva ombra),
//   puzzle (trencaclosques: toca dues peces per canviar-les) i classifica (cada cosa a la seva cistella).
// Fan servir els dibuixos de les fitxes (XFitxa.dibuix). En acabar: «Molt bé!» i l'event «xiu-joc-fet» (estrella per a l'infant).
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I } = A, t = (k) => A.t(k);
  A.textos({
    ca: { joc: 'Joc', jocs: 'Jocs', tornaHi: 'Torna-hi', molBe: 'Molt bé!', jocFet: 'Ho has aconseguit!', toca: 'Toca', comJugar: 'Com es juga',
      memoryP: 'Gira dues cartes: si són iguals, es queden girades. Troba totes les parelles.', quantitatsP: 'Compta quants n\'hi ha i toca el nombre.',
      midaP: 'Toca-ho de més petit a més gran.', ombresP: 'Toca un dibuix i després la seva ombra.', puzzleP: 'Toca dues peces per canviar-les de lloc fins que el dibuix estigui bé.',
      classificaP: 'Toca cada cosa i després la cistella on va.', ronda: 'Ronda {n} de {t}', parellesN: '{n} parelles', intents: 'Intents: {n}' },
    es: { joc: 'Juego', jocs: 'Juegos', tornaHi: 'Otra vez', molBe: '¡Muy bien!', jocFet: '¡Lo has conseguido!', toca: 'Toca', comJugar: 'Cómo se juega',
      memoryP: 'Gira dos cartas: si son iguales, se quedan giradas. Encuentra todas las parejas.', quantitatsP: 'Cuenta cuántos hay y toca el número.',
      midaP: 'Tócalo de más pequeño a más grande.', ombresP: 'Toca un dibujo y después su sombra.', puzzleP: 'Toca dos piezas para cambiarlas de sitio hasta que el dibujo esté bien.',
      classificaP: 'Toca cada cosa y después la cesta donde va.', ronda: 'Ronda {n} de {t}', parellesN: '{n} parejas', intents: 'Intentos: {n}' },
  });
  const D = () => window.XFitxa.DIBUIXOS;
  const svg = (nom, r = 38, extra = '') => `<svg viewBox="-50 -50 100 100" ${extra}>${window.XFitxa.dibuix(nom, r)}</svg>`;
  const ombra = (nom) => `<svg viewBox="-50 -50 100 100" class="ombra">${window.XFitxa.dibuix(nom, 38).replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="#5E544B"').replace(/stroke="#[0-9A-Fa-f]{3,6}"/g, 'stroke="#5E544B"').replace(/opacity="[.\d]+"/g, '')}</svg>`;
  const barreja = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tria = (a, n) => barreja(a).slice(0, n);

  // sons curts (WebAudio): bé, malament i final
  let ac = null;
  function so(tipus) {
    try {
      ac ||= new (window.AudioContext || window.webkitAudioContext)();
      const notes = tipus === 'be' ? [660, 880] : tipus === 'mal' ? [220] : [523, 659, 784, 1046];
      notes.forEach((f, i) => {
        const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + i * 0.12;
        o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.25);
        o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + 0.3);
      });
    } catch { /* sense so */ }
  }
  function mal(el) { el.classList.remove('mal'); void el.offsetWidth; el.classList.add('mal'); so('mal'); }

  const MODELS = {
    memory(j, cos, fi) {
      const n = j.parelles || 4, noms = tria(D(), n), cartes = barreja([...noms, ...noms]);
      let obertes = [], trobades = 0, intents = 0, bloc = false;
      cos.innerHTML = `<div class="memory c${cartes.length}">${cartes.map((nom, i) => `<button class="carta" data-i="${i}" data-n="${nom}"><span class="dors"></span><span class="cara">${svg(nom)}</span></button>`).join('')}</div><p class="jocInfo" id="jocInfo">${t('intents').replace('{n}', 0)}</p>`;
      cos.onclick = (e) => {
        const c = e.target.closest('.carta'); if (!c || bloc || c.classList.contains('on')) return;
        c.classList.add('on'); obertes.push(c);
        if (obertes.length < 2) return;
        intents++; cos.querySelector('#jocInfo').textContent = t('intents').replace('{n}', intents);
        const [a, b] = obertes; obertes = [];
        if (a.dataset.n === b.dataset.n) { a.classList.add('ok'); b.classList.add('ok'); so('be'); if (++trobades === n) fi(); }
        else { bloc = true; setTimeout(() => { a.classList.remove('on'); b.classList.remove('on'); bloc = false; }, 850); }
      };
    },
    quantitats(j, cos, fi) {
      const max = j.max || 5, rondes = j.rondes || 5; let r = 0;
      const ronda = () => {
        const n = 1 + Math.floor(Math.random() * max), nom = tria(D(), 1)[0];
        const ops = barreja([n, ...tria([...Array(Math.max(max, 3)).keys()].map((x) => x + 1).filter((x) => x !== n), 2)]);
        cos.innerHTML = `<p class="jocInfo">${t('ronda').replace('{n}', r + 1).replace('{t}', rondes)}</p>
          <div class="grupJoc">${Array.from({ length: n }, () => svg(nom, 34)).join('')}</div>
          <div class="opcionsJoc">${ops.map((o) => `<button class="num" data-v="${o}">${o}</button>`).join('')}</div>`;
        cos.onclick = (e) => {
          const b = e.target.closest('.num'); if (!b) return;
          if (+b.dataset.v === n) { b.classList.add('ok'); so('be'); r++; setTimeout(() => (r >= rondes ? fi() : ronda()), 600); } else mal(b);
        };
      };
      ronda();
    },
    mida(j, cos, fi) {
      const n = j.n || 4, nom = j.element || tria(D(), 1)[0], mides = Array.from({ length: n }, (_, i) => i);
      let seg = 0;
      cos.innerHTML = `<div class="midaJoc">${barreja(mides).map((m) => `<button class="pesa" data-m="${m}">${svg(nom, 14 + (m * 26) / Math.max(1, n - 1))}</button>`).join('')}</div>`;
      cos.onclick = (e) => {
        const b = e.target.closest('.pesa'); if (!b || b.classList.contains('ok')) return;
        if (+b.dataset.m === seg) { b.classList.add('ok'); b.dataset.ordre = seg + 1; so('be'); if (++seg === n) fi(); } else mal(b);
      };
    },
    ombres(j, cos, fi) {
      const noms = tria(D(), j.n || 4); let triat = null, fetes = 0;
      cos.innerHTML = `<div class="ombresJoc"><div class="col">${barreja(noms).map((n) => `<button class="pesa" data-n="${n}">${svg(n)}</button>`).join('')}</div>
        <div class="col">${barreja(noms).map((n) => `<button class="pesa sombra" data-o="${n}">${ombra(n)}</button>`).join('')}</div></div>`;
      cos.onclick = (e) => {
        const b = e.target.closest('.pesa'); if (!b || b.classList.contains('ok')) return;
        if (b.dataset.n) { cos.querySelectorAll('[data-n]').forEach((x) => x.classList.remove('tria')); b.classList.add('tria'); triat = b; return; }
        if (!triat) return mal(b);
        if (b.dataset.o === triat.dataset.n) { b.classList.add('ok'); triat.classList.add('ok'); triat.classList.remove('tria'); b.innerHTML = svg(b.dataset.o); triat = null; so('be'); if (++fetes === noms.length) fi(); }
        else mal(b);
      };
    },
    puzzle(j, cos, fi) {
      const k = j.costat || 2, nom = j.element || tria(D(), 1)[0], fons = j.fons || '#E9DCC6';
      const escena = `<rect x="-50" y="-50" width="100" height="100" fill="${fons}"/><circle cx="-32" cy="-34" r="9" fill="#F6E7C9"/><path d="M-50 32 Q-20 22 0 30 T50 28 V50 H-50Z" fill="#CFC3A8"/>${window.XFitxa.dibuix(nom, 30)}`;
      const peces = [...Array(k * k).keys()];
      let ordre; do { ordre = barreja(peces); } while (ordre.every((v, i) => v === i));
      let triat = null;
      const pinta = () => {
        cos.innerHTML = `<div class="puzzle" style="grid-template-columns:repeat(${k},1fr)">${ordre.map((p, i) => {
          const x = -50 + (p % k) * (100 / k), y = -50 + Math.floor(p / k) * (100 / k);
          return `<button class="peca ${triat === i ? 'tria' : ''} ${ordre[i] === i ? 'bona' : ''}" data-i="${i}"><svg viewBox="${x} ${y} ${100 / k} ${100 / k}">${escena}</svg></button>`;
        }).join('')}</div><div class="model"><svg viewBox="-50 -50 100 100">${escena}</svg></div>`;
      };
      pinta();
      cos.onclick = (e) => {
        const b = e.target.closest('.peca'); if (!b) return;
        const i = +b.dataset.i;
        if (triat == null) { triat = i; pinta(); return; }
        if (triat !== i) { [ordre[triat], ordre[i]] = [ordre[i], ordre[triat]]; so(ordre[i] === i || ordre[triat] === triat ? 'be' : 'clic'); }
        triat = null; pinta();
        if (ordre.every((v, n) => v === n)) setTimeout(fi, 300);
      };
    },
    classifica(j, cos, fi) {
      const grups = j.grups || tria(D(), 2), n = j.n || 8;
      const coses = barreja(Array.from({ length: n }, (_, i) => grups[i % grups.length]));
      let triat = null, fetes = 0;
      cos.innerHTML = `<div class="coses">${coses.map((c, i) => `<button class="pesa" data-c="${c}" data-i="${i}">${svg(c, 30)}</button>`).join('')}</div>
        <div class="cistelles">${grups.map((g) => `<button class="cistella" data-g="${g}"><span class="mostra">${svg(g, 24)}</span><span class="dins"></span></button>`).join('')}</div>`;
      cos.onclick = (e) => {
        const p = e.target.closest('.pesa');
        if (p && !p.classList.contains('ok')) { cos.querySelectorAll('.pesa').forEach((x) => x.classList.remove('tria')); p.classList.add('tria'); triat = p; return; }
        const c = e.target.closest('.cistella'); if (!c || !triat) return;
        if (c.dataset.g === triat.dataset.c) { triat.classList.add('ok'); triat.classList.remove('tria'); c.querySelector('.dins').insertAdjacentHTML('beforeend', svg(triat.dataset.c, 30)); triat = null; so('be'); if (++fetes === n) fi(); }
        else mal(c);
      };
    },
  };
  const AJUDA = { memory: 'memoryP', quantitats: 'quantitatsP', mida: 'midaP', ombres: 'ombresP', puzzle: 'puzzleP', classifica: 'classificaP' };

  A.HOOKS.recurs.joc = (r) => {
    const a = A.AREES[r.area], ul = (x) => `<ul>${(A.L(x) || []).map((y) => `<li>${esc(y)}</li>`).join('')}</ul>`;
    return `<div class="jocCaixa" style="--c:${a.color}"><p class="jocAjuda">${I.dit}${t(AJUDA[r.joc.model] || 'memoryP')}</p>
        <div class="joc" id="joc" data-id="${r.id}"></div>
        <div class="jocFi" id="jocFi" hidden><b>${t('molBe')}</b><span>${t('jocFet')}</span><button class="btn pri" data-joc-torna>${t('tornaHi')}</button></div></div>
      <div style="--c:${a.color}">${r.intencio ? `<div class="intent"><div class="eyebrow" style="margin-bottom:8px">${t('intencio')}</div><p>${esc(A.L(r.intencio))}</p></div>` : ''}
      ${r.treballa ? `<div class="cols"><div class="box"><h3>${t('treballa')}</h3>${ul(r.treballa)}</div>${r.variants ? `<div class="box"><h3>${t('variants')}</h3>${ul(r.variants)}</div>` : ''}</div>` : ''}</div>`;
  };
  function munta(id) {
    const r = A.perId[id], cos = document.getElementById('joc'); if (!r || !cos) return;
    document.getElementById('jocFi').hidden = true; cos.hidden = false;
    (MODELS[r.joc.model] || MODELS.memory)(r.joc, cos, () => {
      so('fi'); cos.classList.add('acabat');
      setTimeout(() => { document.getElementById('jocFi').hidden = false; cos.classList.remove('acabat'); }, 500);
      dispatchEvent(new CustomEvent('xiu-joc-fet', { detail: { id } }));
    });
  }
  A.HOOKS.despres.push(() => { const j = document.getElementById('joc'); if (j && !j.dataset.muntat) { j.dataset.muntat = 1; munta(j.dataset.id); } });
  document.addEventListener('click', (e) => { if (e.target.closest('[data-joc-torna]')) munta(document.getElementById('joc').dataset.id); });
  A.JOCS = { models: Object.keys(MODELS) };
});
