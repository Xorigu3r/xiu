// XIU · Aprendre jugant — l'app (Inici, Biblioteca, Fitxa, Favorits, Inspiració).
// Contingut: window.XIU_BIB i window.XIU_RECURSOS (js/contingut.js, generat per scripts/contingut.mjs).
(function () {
  // el contingut el posa js/carrega.js i es pot actualitzar mentre l'app és oberta (event «xiu-contingut»)
  let BIB, R, AREES, EDATS, perId;
  function dades() {
    BIB = window.XIU_BIB; R = window.XIU_RECURSOS; AREES = BIB.arees; EDATS = BIB.edats;
    perId = Object.fromEntries(R.map((r) => [r.id, r]));
  }
  dades();

  const T = {
    ca: { tag: 'Aprendre jugant', inici: 'Inici', bib: 'Biblioteca', fav: 'Favorits', insp: 'Inspiració',
      hola: ['Bon dia', 'Bona tarda', 'Bon vespre'], holaP: 'Propostes amb intenció per acompanyar els infants de 0 a 6 anys, a casa i a l\'aula.',
      setmana: 'Proposta de la setmana', perEdat: 'Idees per a cada edat', novetats: 'Novetats', veure: 'Veure-ho tot',
      arees: 'Les sis àrees', anys: 'anys', propostes: (n) => n + (n == 1 ? ' proposta' : ' propostes'), cerca: 'Cerca una activitat, un material...',
      edat: 'Edat', area: 'Àrea', tipus: 'Tipus', perfil: 'Perfil', tots: 'Tot', activitat: 'Activitat', fitxa: 'Fitxa imprimible',
      fam: 'Famílies', pro: 'Professionals', resultats: (n) => n + (n == 1 ? ' recurs' : ' recursos'),
      buit: 'Cap recurs amb aquests filtres', buitP: 'Prova de treure algun filtre.', netejar: 'Treure els filtres',
      tornar: 'Tornar', guardar: 'Desar', guardat: 'Desat', pdf: 'Descarregar PDF', compartir: 'Compartir', fent: 'Preparant...', durada: 'Durada',
      intencio: 'Intenció pedagògica', treballa: 'Què es treballa', materials: 'Materials', preparacio: 'Preparació',
      desenvolupament: 'Desenvolupament', variants: 'Variants i adaptacions', seguretat: 'Recomanacions de seguretat',
      vistaFitxa: 'Vista prèvia de la fitxa', nom: 'Nom:', data: 'Data:', desat: 'Desat a {p}', ferAqui: 'Fer-la aquí', ambElDit: 'Fes la fitxa amb el dit, directament a sobre.', imprimir: 'Imprimir', esborra: 'Esborra', reinicia: 'Torna-hi', moltbe: 'Molt bé!', errPdf: 'No s\'ha pogut crear el PDF',
      favBuit: 'Encara no tens favorits', favBuitP: 'Toca el cor d\'una activitat per desar-la aquí i recuperar-la quan la necessitis.',
      favP: 'Les teves propostes desades.', bibS: 'Tot el que necessites, ben ordenat.', inspS: 'Idees per descobrir.', anarBib: 'Anar a la biblioteca',
      inspP: 'Col·leccions, temporades i propostes que potser encara no coneixes.', potser: 'Potser no coneixes...', foto: 'foto' },
    es: { tag: 'Aprender jugando', inici: 'Inicio', bib: 'Biblioteca', fav: 'Favoritos', insp: 'Inspiración',
      hola: ['Buenos días', 'Buenas tardes', 'Buenas noches'], holaP: 'Propuestas con intención para acompañar a los niños y niñas de 0 a 6 años, en casa y en el aula.',
      setmana: 'Propuesta de la semana', perEdat: 'Ideas para cada edad', novetats: 'Novedades', veure: 'Ver todo',
      arees: 'Las seis áreas', anys: 'años', propostes: (n) => n + (n == 1 ? ' propuesta' : ' propuestas'), cerca: 'Busca una actividad, un material...',
      edat: 'Edad', area: 'Área', tipus: 'Tipo', perfil: 'Perfil', tots: 'Todo', activitat: 'Actividad', fitxa: 'Ficha imprimible',
      fam: 'Familias', pro: 'Profesionales', resultats: (n) => n + (n == 1 ? ' recurso' : ' recursos'),
      buit: 'Ningún recurso con estos filtros', buitP: 'Prueba a quitar algún filtro.', netejar: 'Quitar los filtros',
      tornar: 'Volver', guardar: 'Guardar', guardat: 'Guardado', pdf: 'Descargar PDF', compartir: 'Compartir', fent: 'Preparando...', durada: 'Duración',
      intencio: 'Intención pedagógica', treballa: 'Qué se trabaja', materials: 'Materiales', preparacio: 'Preparación',
      desenvolupament: 'Desarrollo', variants: 'Variantes y adaptaciones', seguretat: 'Recomendaciones de seguridad',
      vistaFitxa: 'Vista previa de la ficha', nom: 'Nombre:', data: 'Fecha:', desat: 'Guardado en {p}', ferAqui: 'Hacerla aquí', ambElDit: 'Haz la ficha con el dedo, directamente encima.', imprimir: 'Imprimir', esborra: 'Borrar', reinicia: 'Otra vez', moltbe: '¡Muy bien!', errPdf: 'No se ha podido crear el PDF',
      favBuit: 'Todavía no tienes favoritos', favBuitP: 'Toca el corazón de una actividad para guardarla aquí y recuperarla cuando la necesites.',
      favP: 'Tus propuestas guardadas.', bibS: 'Todo lo que necesitas, bien ordenado.', inspS: 'Ideas para descubrir.', anarBib: 'Ir a la biblioteca',
      inspP: 'Colecciones, temporadas y propuestas que quizá todavía no conoces.', potser: 'Quizá no conoces...', foto: 'foto' },
  };

  /* ---------- Estat (preferències locals: idioma i favorits) ---------- */
  const ls = { get(k, d) { try { const v = localStorage.getItem('xiu-' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
               set(k, v) { try { localStorage.setItem('xiu-' + k, JSON.stringify(v)); } catch (e) { /* sense emmagatzematge */ } } };
  let lang = ls.get('idioma', /^es\b/i.test(navigator.language || '') ? 'es' : 'ca');
  let favs = ls.get('favorits', []).filter((id) => perId[id]);
  let F = buit();
  function buit() { return { edat: null, area: null, tipus: null, perfil: null, q: '' }; }
  let ruta = '#/', pila = [], modeFitxa = 'digital';

  const t = (k) => T[lang][k];
  const L = (o) => (o == null ? '' : typeof o === 'string' ? o : o[lang]);
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ---------- Icones ---------- */
  const I = {
    inici: '<svg viewBox="0 0 24 24"><path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/></svg>',
    bib: '<svg viewBox="0 0 24 24"><path d="M5 4h4v16H5zM10 4h4v16h-4z"/><path d="M15.5 5.5l3.5-1 3 14.5-3.6.9z"/></svg>',
    fav: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    insp: '<svg viewBox="0 0 24 24"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',
    dl: '<svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    share: '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/></svg>',
    persona: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-4 3.6-6 7-6s6.2 2 7 6"/></svg>',
    rellotge: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/></svg>',
    dit: '<svg viewBox="0 0 24 24"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5A6.5 6.5 0 0 1 11.5 21h-.6a6 6 0 0 1-4.6-2.2L3.6 15.4a1.6 1.6 0 0 1 2.4-2.1L9 16"/></svg>',
    print: '<svg viewBox="0 0 24 24"><path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7z"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/></svg>',
  };

  /* Foto del recurs o, mentre no n'hi hagi, una composició abstracta amb el color de l'àrea */
  function photo(r) {
    if (r.foto) return `<div class="photo"><img src="${esc(XIU_URL(r.foto))}" alt="" loading="lazy"></div>`;
    // fitxa PDF sense foto: la primera pàgina, per la part de dalt
    const pag = r.full && r.full.model === 'pdf' && r.full.pagines.ca[0];
    if (pag) return `<div class="photo pag"><img src="${esc(XIU_URL((r.full.pagines[lang] || r.full.pagines.ca)[0].src))}" alt="" loading="lazy"></div>`;
    const seed = [...r.id].reduce((a, c) => a + c.charCodeAt(0), 0);
    const rnd = (n) => { const x = Math.sin(seed * 9.7 + n * 3.1) * 10000; return x - Math.floor(x); };
    const c = AREES[r.area].color;
    let sh = '';
    for (let i = 0; i < 7; i++) {
      const x = 10 + rnd(i) * 80, y = 15 + rnd(i + 10) * 70, s = 6 + rnd(i + 20) * 16, op = (0.25 + rnd(i + 30) * 0.45).toFixed(2);
      const fill = i % 3 == 0 ? c : i % 3 == 1 ? '#C9B79C' : '#E9DCC6';
      sh += i % 2 ? `<ellipse cx="${x}" cy="${y}" rx="${s}" ry="${s * 0.72}" fill="${fill}" opacity="${op}" transform="rotate(${rnd(i + 40) * 90} ${x} ${y})"/>`
                  : `<circle cx="${x}" cy="${y}" r="${s * 0.8}" fill="none" stroke="${fill}" stroke-width="2.5" opacity="${op}"/>`;
    }
    return `<div class="photo"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="g-${r.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3EBDD"/><stop offset="1" stop-color="${c}" stop-opacity=".22"/></linearGradient></defs>
      <rect width="100" height="100" fill="url(#g-${r.id})"/>${sh}</svg><span class="ph">${t('foto')}</span></div>`;
  }
  const kind = (r) => t(r.tipus);
  const areaCurta = (r) => AREES[r.area][lang].split(' ')[0];

  function card(r) {
    const on = favs.includes(r.id);
    return `<div class="card" data-go="#/r/${r.id}">${photo(r)}
      <span class="kind">${kind(r)}</span>
      <button class="fav ${on ? 'on' : ''}" data-fav="${r.id}" aria-label="${t('guardar')}">${I.fav}</button>
      <h3>${esc(L(r.titol))}</h3>
      <div class="meta"><span class="dot" style="background:${AREES[r.area].color}"></span>${r.edat} ${t('anys')} · ${areaCurta(r)}</div></div>`;
  }

  /* ---------- Pantalles ---------- */
  function vInici() {
    const h = perId[BIB.temporada.destacat], hora = new Date().getHours();
    const hola = t('hola')[hora < 14 ? 0 : hora < 20 ? 1 : 2];
    return `<section class="pageH"><h1>${hola}</h1><div class="scr">${t('tag')}.</div><p>${t('holaP')}</p></section>
      <div class="sec"><h2>${t('setmana')} · ${esc(L(BIB.temporada.titol))}</h2></div>
      <div class="hero" data-go="#/r/${h.id}">${photo(h)}
        <div class="txt"><div class="eyebrow">${h.edat} ${t('anys')} · ${AREES[h.area][lang]}</div>
        <h3>${esc(L(h.titol))}</h3><p class="scr">${esc(L(h.subtitol))}</p>
        <div class="tags"><span class="tag">${kind(h)}</span><span class="tag">${esc(L(h.durada))}</span></div></div></div>
      <div class="sec"><h2>${t('perEdat')}</h2></div>
      <div class="ages">${EDATS.map((e) => `<div class="age" data-filtre='{"edat":"${e}"}'><b>${e}</b><span>${t('anys')}</span></div>`).join('')}</div>
      <div class="sec"><h2>${t('novetats')}</h2><button data-go="#/bib">${t('veure')}</button></div>
      <div class="row">${R.filter((r) => r.novetat).map(card).join('')}</div>
      <div class="sec"><h2>${t('arees')}</h2></div>
      <div class="areas">${Object.entries(AREES).map(([k, a]) => `<button class="areaC" style="background:color-mix(in srgb,${a.color} 28%,#FFFDF9)" data-filtre='{"area":"${k}"}'>
        <b>${a[lang]}</b><span>${t('propostes')(R.filter((r) => r.area == k).length)}</span></button>`).join('')}</div>`;
  }

  function chips(key, opts) {
    return `<div class="filt"><div class="lbl">${t(key)}</div><div class="chips">
      <button class="chip ${!F[key] ? 'on' : ''}" data-f="${key}" data-v="">${t('tots')}</button>
      ${opts.map(([v, l]) => `<button class="chip ${F[key] == v ? 'on' : ''}" data-f="${key}" data-v="${v}">${l}</button>`).join('')}</div></div>`;
  }
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  function filtra() {
    const q = norm(F.q.trim());
    return R.filter((r) => (!F.edat || r.edat == F.edat) && (!F.area || r.area == F.area) && (!F.tipus || r.tipus == F.tipus)
      && (!F.perfil || r.perfil.includes(F.perfil))
      && (!q || norm([L(r.titol), L(r.subtitol), ...(r.materials ? L(r.materials) : []), ...(r.treballa ? L(r.treballa) : [])].join(' ')).includes(q)));
  }
  function llista() {
    const l = filtra();
    return `<div class="count">${t('resultats')(l.length)}</div>` + (l.length ? `<div class="grid">${l.map(card).join('')}</div>`
      : `<div class="empty"><h3>${t('buit')}</h3><p>${t('buitP')}</p><p style="margin-top:16px"><button class="btn" data-netejar>${t('netejar')}</button></p></div>`);
  }
  function vBib() {
    return `<section class="pageH"><h1>${t('bib')}</h1><div class="scr">${t('bibS')}</div></section>
      <label class="search">${I.search}<input id="q" type="search" value="${esc(F.q)}" placeholder="${t('cerca')}" autocomplete="off"></label>
      ${chips('edat', EDATS.map((e) => [e, e + ' ' + t('anys')]))}
      ${chips('area', Object.entries(AREES).map(([k, a]) => [k, a[lang]]))}
      ${chips('tipus', [['activitat', t('activitat')], ['fitxa', t('fitxa')]])}
      ${chips('perfil', [['fam', t('fam')], ['pro', t('pro')]])}
      <div id="llista">${llista()}</div>`;
  }

  const ul = (a) => `<ul>${a.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
  function vFitxa(id) {
    const r = perId[id]; if (!r) return vInici();
    const a = AREES[r.area], on = favs.includes(r.id);
    const cap = `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <div class="dHead">${photo(r)}<div>
        <h1>${esc(L(r.titol))}</h1><div class="sub">${esc(L(r.subtitol))}</div>
        <div class="meta-line"><span><span class="dot" style="background:${a.color}"></span>${a[lang]}</span>
          <span>${I.persona}${r.edat} ${t('anys')}</span><span>${I.rellotge}${esc(L(r.durada))}</span></div>
        <div class="tags"><span class="tag">${kind(r)}</span>${r.perfil.map((p) => `<span class="tag">${t(p)}</span>`).join('')}</div>
        <div class="actions"><button class="btn ${on ? 'on' : ''}" data-fav="${r.id}">${I.fav}${on ? t('guardat') : t('guardar')}</button>
        ${r.tipus == 'activitat' ? `<button class="btn" data-pdf="${r.id}">${I.dl}${t('pdf')}</button>` : ''}
        ${r.tipus == 'activitat' && XP.potCompartir() ? `<button class="btn" data-comparteix="${r.id}">${I.share}${t('compartir')}</button>` : ''}
        </div>
      </div></div>`;
    if (r.tipus == 'fitxa') {
      // la mateixa fitxa: per fer-la aquí amb el dit, o per imprimir (PDF)
      const tabs = `<div class="modes"><button class="${modeFitxa == 'digital' ? 'on' : ''}" data-mode="digital">${I.dit}${t('ferAqui')}</button>
        <button class="${modeFitxa == 'paper' ? 'on' : ''}" data-mode="paper">${I.print}${t('imprimir')}</button></div>`;
      if (modeFitxa == 'digital') return cap + tabs + `<div class="digital" id="digital" style="--c:${a.color}">
        ${XFitxa.html(r, lang, { esborra: t('esborra'), reinicia: t('reinicia'), moltbe: t('moltbe'), ambElDit: t('ambElDit') })}</div>`;
      return cap + tabs + `<div class="actions" style="justify-content:center">
          <button class="btn pri" data-pdf="${r.id}">${I.dl}${t('pdf')}</button>
          ${XP.potCompartir() ? `<button class="btn" data-comparteix="${r.id}">${I.share}${t('compartir')}</button>` : ''}</div>
        ${XFitxa.previa(r, a, lang, { nom: t('nom'), data: t('data') })}`;
    }
    return cap + `<div style="--c:${a.color}">
      <div class="intent"><div class="eyebrow" style="margin-bottom:8px">${t('intencio')}</div><p>${esc(L(r.intencio))}</p></div>
      <div class="cols">
        <div class="box"><h3>${t('treballa')}</h3>${ul(L(r.treballa))}</div>
        <div class="box"><h3>${t('materials')}</h3>${ul(L(r.materials))}</div>
        <div class="box full"><h3>${t('preparacio')}</h3><p>${esc(L(r.preparacio))}</p></div>
        <div class="box full"><h3>${t('desenvolupament')}</h3><ol class="steps">${L(r.desenvolupament).map((x) => `<li>${esc(x)}</li>`).join('')}</ol></div>
        <div class="box"><h3>${t('variants')}</h3>${ul(L(r.variants))}</div>
        <div class="box warn"><h3>${t('seguretat')}</h3>${ul(L(r.seguretat))}</div>
      </div></div>`;
  }

  function vFav() {
    const l = favs.map((id) => perId[id]).filter(Boolean);
    return `<section class="pageH"><h1>${t('fav')}</h1><div class="scr">${t('favP')}</div></section>
      ${l.length ? `<div class="grid" style="margin-top:22px">${l.map(card).join('')}</div>`
        : `<div class="empty"><div class="ic">${I.fav}</div><h3>${t('favBuit')}</h3><p style="max-width:340px;margin:0 auto 20px">${t('favBuitP')}</p>
           <button class="btn pri" data-go="#/bib">${t('anarBib')}</button></div>`}`;
  }

  function vInsp() {
    return `<section class="pageH"><h1>${t('insp')}</h1><div class="scr">${t('inspS')}</div><p>${t('inspP')}</p></section>
      <div class="inspoG" style="margin-top:22px">${BIB.colleccions.map((c) => `<button class="coll" data-go="#/c/${c.id}">${photo(perId[c.portada])}
        <div class="ct"><h3>${esc(L(c.titol))}</h3><p>${esc(L(c.text))}</p></div></button>`).join('')}</div>
      <div class="sec"><h2>${t('potser')}</h2></div>
      <div class="row">${BIB.descobreix.map((id) => card(perId[id])).join('')}</div>
      <div class="quote"><p>${esc(L(BIB.cita))}</p><span>${esc(BIB.cita.autor)}</span></div>`;
  }

  function vColleccio(id) {
    const c = BIB.colleccions.find((x) => x.id == id); if (!c) return vInsp();
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH"><h1>${esc(L(c.titol))}</h1><div class="scr">${esc(L(c.text))}</div></section>
      <div class="grid" style="margin-top:22px">${c.recursos.map((x) => card(perId[x])).join('')}</div>`;
  }

  /* ---------- Navegació ---------- */
  function go(h) { if (h === ruta) return; pila.push(ruta); ruta = h; modeFitxa = 'digital'; render(); scrollTo(0, 0); }
  function enrere() { if (!pila.length) return false; ruta = pila.pop(); render(); scrollTo(0, 0); return true; }
  function nav() {
    const cur = ruta.split('/')[1] || '';
    const actiu = cur == 'r' ? 'bib' : cur == 'c' ? 'insp' : cur;
    const html = [['', 'inici'], ['bib', 'bib'], ['insp', 'insp'], ['fav', 'fav']]
      .map(([h, k]) => `<button class="${actiu == h ? 'on' : ''}" data-tab="#/${h}">${I[k]}<span>${t(k)}</span></button>`).join('');
    $('#sideNav').innerHTML = html; $('#tabNav').innerHTML = html;
    const lg = ['ca', 'es'].map((l) => `<button class="${lang == l ? 'on' : ''}" data-lang="${l}">${l.toUpperCase()}</button>`).join('');
    $('#langS').innerHTML = lg; $('#langT').innerHTML = lg; $('#tagline').textContent = t('tag');
    document.documentElement.lang = lang;
    document.title = 'XIU · ' + t('tag');
  }
  function render(manté) {
    const p = ruta.replace('#/', '').split('/'), y = scrollY;
    const v = { '': vInici, bib: vBib, fav: vFav, insp: vInsp, r: () => vFitxa(p[1]), c: () => vColleccio(p[1]) }[p[0]] || vInici;
    $('#view').innerHTML = `<div class="${manté ? '' : 'fade'}">${v()}</div>`;
    if ($('#digital')) XFitxa.munta($('#digital'));
    nav();
    if (manté) scrollTo(0, y);
  }

  let avisT;
  function avis(txt) {
    document.querySelector('.toast')?.remove(); clearTimeout(avisT);
    const d = document.createElement('div'); d.className = 'toast'; d.textContent = txt; document.body.appendChild(d);
    avisT = setTimeout(() => d.remove(), 4000);
  }

  async function fesPdf(id, comparteix, boto) {
    const r = perId[id], text = boto.innerHTML;
    boto.disabled = true; boto.textContent = t('fent');
    try {
      const dades = await XFitxa.pdf(r, AREES[r.area], lang, { nom: t('nom'), data: t('data') });
      const nom = `XIU - ${L(r.titol)}.pdf`.replace(/[\\/:*?"<>|]/g, '');
      if (comparteix) await XP.comparteix(dades, nom);
      else { const m = await XP.desaPdf(dades, nom, { desat: t('desat') }); if (m) avis(m); }
    } catch (e) { console.error(e); avis(t('errPdf')); }
    finally { boto.disabled = false; boto.innerHTML = text; }
  }

  /* Un sol gestor de clics per a tota l'app */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-fav],[data-go],[data-tab],[data-lang],[data-f],[data-filtre],[data-enrere],[data-netejar],[data-pdf],[data-comparteix],[data-mode]');
    if (!el) return;
    const d = el.dataset;
    if (d.fav) {
      e.stopPropagation();
      const on = !favs.includes(d.fav);
      favs = on ? [...favs, d.fav] : favs.filter((x) => x != d.fav);
      ls.set('favorits', favs);
      // a la pàgina d'una fitxa no es torna a pintar tot (es perdria el que l'infant hi ha fet)
      if (el.classList.contains('btn')) { el.classList.toggle('on', on); el.innerHTML = I.fav + (on ? t('guardat') : t('guardar')); }
      else render(true);
    } else if (d.mode) { modeFitxa = d.mode; render(true); }
    else if (d.pdf) fesPdf(d.pdf, false, el);
    else if (d.comparteix) fesPdf(d.comparteix, true, el);
    else if (d.tab != null) { pila = []; ruta = d.tab; render(); scrollTo(0, 0); }
    else if (d.go) go(d.go);
    else if (d.lang) { lang = d.lang; ls.set('idioma', lang); render(true); }
    else if (d.f) { F[d.f] = d.v || null; render(true); }
    else if (d.filtre) { F = Object.assign(buit(), JSON.parse(d.filtre)); go('#/bib'); }
    else if (d.netejar != null) { F = buit(); render(true); }
    else if (d.enrere != null) { if (!enrere()) go('#/'); }
  });
  document.addEventListener('input', (e) => {
    if (e.target.id == 'q') { F.q = e.target.value; $('#llista').innerHTML = llista(); }
  });
  XP.botoEnrere(enrere);
  // contingut nou des de la web: es refresca, excepte si l'infant és fent una fitxa (es faria quan surti)
  let pendent = false;
  addEventListener('xiu-contingut', () => {
    dades();
    if ($('#digital')) pendent = true; else render(true);
  });
  const goOrig = go;
  go = (h) => { if (pendent) { pendent = false; dades(); } goOrig(h); };
  render();
})();
