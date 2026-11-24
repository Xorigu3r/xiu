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
      fam: 'Famílies', pro: 'Docents', resultats: (n) => n + (n == 1 ? ' recurs' : ' recursos'),
      buit: 'Cap recurs amb aquests filtres', buitP: 'Prova de treure algun filtre.', netejar: 'Treure els filtres',
      tornar: 'Tornar', guardar: 'Desar', guardat: 'Desat', pdf: 'Descarregar PDF', compartir: 'Compartir', fent: 'Preparant...', durada: 'Durada',
      intencio: 'Intenció pedagògica', treballa: 'Què es treballa', materials: 'Materials', preparacio: 'Preparació',
      desenvolupament: 'Desenvolupament', variants: 'Variants i adaptacions', seguretat: 'Recomanacions de seguretat',
      vistaFitxa: 'Vista prèvia de la fitxa', nom: 'Nom:', data: 'Data:', desat: 'Desat a {p}', ferAqui: 'Fer-la aquí', ambElDit: 'Fes la fitxa amb el dit, directament a sobre.', imprimir: 'Imprimir', esborra: 'Esborra', reinicia: 'Torna-hi', moltbe: 'Molt bé!', errPdf: 'No s\'ha pogut crear el PDF',
      favBuit: 'Encara no tens favorits', favBuitP: 'Toca el cor d\'una activitat per desar-la aquí i recuperar-la quan la necessitis.',
      favP: 'Les teves propostes desades.', bibS: 'Tot el que necessites, ben ordenat.', inspS: 'Idees per descobrir.', anarBib: 'Anar a la biblioteca',
      inspP: 'Col·leccions, temporades i propostes que potser encara no coneixes.', potser: 'Potser no coneixes...', foto: 'foto',
      perfilT: 'Perfil', benvinguda: 'Et donem la benvinguda', benvingudaP: 'Una biblioteca de propostes amb intenció per acompanyar els infants de 0 a 6 anys.',
      com: ['Propostes ordenades per edat i per àrea', 'Fitxes per fer a la pantalla o per imprimir', 'Activitats explicades pas a pas'],
      qui: 'Qui ets?', quiP: 'Així t\'oferim les propostes que et són més útils.', famT: 'Família', famD: 'Pare, mare o tutor/a', proT: 'Docent', proD: 'Educador/a o mestre/a',
      edatsQ: 'Quines edats t\'interessen?', edatsP: 'Pots triar-ne més d\'una. Ho pots canviar quan vulguis des del teu perfil.', comenca: 'Comença', araNo: 'Ara no', seguent: 'Següent',
      perATu: 'Per a tu', perATuP: { fam: 'Propostes per fer a casa', pro: 'Propostes per a l\'aula' }, gratis: 'Per començar, gratuït',
      premium: 'Premium', gratuit: 'Gratuït', acces: 'Accés', premT: 'Contingut Premium',
      premP: 'Aquesta proposta forma part de XIU Premium. Amb un sol accés tens les dues versions: per fer-la a la pantalla i en PDF per imprimir.',
      premTot: 'Tot XIU, sense límits', premTotP: 'Totes les fitxes, activitats, jocs, materials complementaris i recursos pedagògics, per a totes les edats.',
      premInclou: ['Totes les fitxes, per fer a la pantalla i en PDF', 'Totes les activitats explicades pas a pas', 'Jocs, materials complementaris i recursos pedagògics', 'Contingut nou cada mes'],
      plans: [['Mensual', 'Accés a tot, mes a mes'], ['Anual', 'Accés a tot durant un any, més econòmic'], ['Paquets', 'Només una àrea o una franja d\'edat']],
      aviat: 'Molt aviat', aviatP: 'Encara no es pot contractar. Ben aviat podràs triar la modalitat que et vagi millor.', veurePrem: 'Què inclou Premium',
      premBanner: 'Descobreix XIU Premium', premBannerP: 'Totes les fitxes i activitats, a la pantalla i en PDF.',
      tuEts: 'El teu perfil', canvia: 'Canvia', idioma: 'Idioma', compte: 'Compte', compteP: 'Molt aviat podràs crear un compte per tenir els favorits a tots els aparells i accedir a Premium.',
      teusEdats: 'Edats que t\'interessen', totesEdats: 'Totes', presentacio: 'Torna a veure la presentació' },
    es: { tag: 'Aprender jugando', inici: 'Inicio', bib: 'Biblioteca', fav: 'Favoritos', insp: 'Inspiración',
      hola: ['Buenos días', 'Buenas tardes', 'Buenas noches'], holaP: 'Propuestas con intención para acompañar a los niños y niñas de 0 a 6 años, en casa y en el aula.',
      setmana: 'Propuesta de la semana', perEdat: 'Ideas para cada edad', novetats: 'Novedades', veure: 'Ver todo',
      arees: 'Las seis áreas', anys: 'años', propostes: (n) => n + (n == 1 ? ' propuesta' : ' propuestas'), cerca: 'Busca una actividad, un material...',
      edat: 'Edad', area: 'Área', tipus: 'Tipo', perfil: 'Perfil', tots: 'Todo', activitat: 'Actividad', fitxa: 'Ficha imprimible',
      fam: 'Familias', pro: 'Docentes', resultats: (n) => n + (n == 1 ? ' recurso' : ' recursos'),
      buit: 'Ningún recurso con estos filtros', buitP: 'Prueba a quitar algún filtro.', netejar: 'Quitar los filtros',
      tornar: 'Volver', guardar: 'Guardar', guardat: 'Guardado', pdf: 'Descargar PDF', compartir: 'Compartir', fent: 'Preparando...', durada: 'Duración',
      intencio: 'Intención pedagógica', treballa: 'Qué se trabaja', materials: 'Materiales', preparacio: 'Preparación',
      desenvolupament: 'Desarrollo', variants: 'Variantes y adaptaciones', seguretat: 'Recomendaciones de seguridad',
      vistaFitxa: 'Vista previa de la ficha', nom: 'Nombre:', data: 'Fecha:', desat: 'Guardado en {p}', ferAqui: 'Hacerla aquí', ambElDit: 'Haz la ficha con el dedo, directamente encima.', imprimir: 'Imprimir', esborra: 'Borrar', reinicia: 'Otra vez', moltbe: '¡Muy bien!', errPdf: 'No se ha podido crear el PDF',
      favBuit: 'Todavía no tienes favoritos', favBuitP: 'Toca el corazón de una actividad para guardarla aquí y recuperarla cuando la necesites.',
      favP: 'Tus propuestas guardadas.', bibS: 'Todo lo que necesitas, bien ordenado.', inspS: 'Ideas para descubrir.', anarBib: 'Ir a la biblioteca',
      inspP: 'Colecciones, temporadas y propuestas que quizá todavía no conoces.', potser: 'Quizá no conoces...', foto: 'foto',
      perfilT: 'Perfil', benvinguda: 'Te damos la bienvenida', benvingudaP: 'Una biblioteca de propuestas con intención para acompañar a los niños y niñas de 0 a 6 años.',
      com: ['Propuestas ordenadas por edad y por área', 'Fichas para hacer en la pantalla o para imprimir', 'Actividades explicadas paso a paso'],
      qui: '¿Quién eres?', quiP: 'Así te ofrecemos las propuestas que te resultan más útiles.', famT: 'Familia', famD: 'Padre, madre o tutor/a', proT: 'Docente', proD: 'Educador/a o maestro/a',
      edatsQ: '¿Qué edades te interesan?', edatsP: 'Puedes elegir más de una. Lo puedes cambiar cuando quieras desde tu perfil.', comenca: 'Empezar', araNo: 'Ahora no', seguent: 'Siguiente',
      perATu: 'Para ti', perATuP: { fam: 'Propuestas para hacer en casa', pro: 'Propuestas para el aula' }, gratis: 'Para empezar, gratis',
      premium: 'Premium', gratuit: 'Gratis', acces: 'Acceso', premT: 'Contenido Premium',
      premP: 'Esta propuesta forma parte de XIU Premium. Con un solo acceso tienes las dos versiones: para hacerla en la pantalla y en PDF para imprimir.',
      premTot: 'Todo XIU, sin límites', premTotP: 'Todas las fichas, actividades, juegos, materiales complementarios y recursos pedagógicos, para todas las edades.',
      premInclou: ['Todas las fichas, para hacer en la pantalla y en PDF', 'Todas las actividades explicadas paso a paso', 'Juegos, materiales complementarios y recursos pedagógicos', 'Contenido nuevo cada mes'],
      plans: [['Mensual', 'Acceso a todo, mes a mes'], ['Anual', 'Acceso a todo durante un año, más económico'], ['Paquetes', 'Solo un área o una franja de edad']],
      aviat: 'Muy pronto', aviatP: 'Todavía no se puede contratar. Muy pronto podrás elegir la modalidad que mejor te vaya.', veurePrem: 'Qué incluye Premium',
      premBanner: 'Descubre XIU Premium', premBannerP: 'Todas las fichas y actividades, en la pantalla y en PDF.',
      tuEts: 'Tu perfil', canvia: 'Cambiar', idioma: 'Idioma', compte: 'Cuenta', compteP: 'Muy pronto podrás crear una cuenta para tener los favoritos en todos los dispositivos y acceder a Premium.',
      teusEdats: 'Edades que te interesan', totesEdats: 'Todas', presentacio: 'Volver a ver la presentación' },
  };

  for (const l of ['ca', 'es']) Object.assign(T[l], (window.XIU_TEXTOS_COMPTE || {})[l] || {});

  // Mòduls (js/moduls/*.js): s'hi enganxen amb window.XIU_MODULS.push((A) => {...}); A = window.XIU_APP (al final)
  const HOOKS = { accions: [], inici: [], iniciDalt: [], bloc1: [], bloc2: [], bloc3: [], bloc4: [], perfil: [], quant: [], insignia: [], recurs: {}, despres: [], bib: [], progres: [], progresSec: [], fitxaSota: [] };
  const VISTES = {};

  /* ---------- Estat (preferències locals: idioma i favorits) ---------- */
  const ls = { get(k, d) { try { const v = localStorage.getItem('xiu-' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
               set(k, v) { try { localStorage.setItem('xiu-' + k, JSON.stringify(v)); } catch (e) { /* sense emmagatzematge */ } } };
  let lang = ls.get('idioma', /^es\b/i.test(navigator.language || '') ? 'es' : 'ca');
  let favs = ls.get('favorits', []).filter((id) => perId[id]);
  let F = buit();
  function buit() { return { edat: null, area: null, tipus: null, perfil: null, acces: null, durada: null, pocs: null, obj: null, q: '' }; }
  // perfil: { tipus: 'fam' | 'pro', edats: [...] } — es tria en obrir l'app per primer cop (es desa en aquest aparell)
  let perfil = ls.get('perfil', null), onb = null;
  // Premium: r.premium el marca el Gestor i BIB.premium.actiu activa els cadenats.
  // PILOT (fase 2, mode de prova): compte, compres i subscripció es desen NOMÉS en aquest aparell; no es cobra res.
  let compte = ls.get('compte', null);
  let acces = Object.assign({ pla: null, renova: null, cancel: false, paquets: [], factures: [] }, ls.get('acces', {}));
  let simula = ls.get('pilot-simula', false);
  const hashId = (id) => [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const esPrem = (r) => !r.meva && (!!r.premium || (simula && hashId(r.id) % 3 !== 0));
  const premiumActiu = () => !!(BIB.premium && BIB.premium.actiu) || simula;
  const subscrit = () => !!(compte && acces.pla && new Date(acces.renova) > new Date());
  const teAcces = (r) => subscrit() || !!(compte && acces.paquets.some((q) => (q.tipus == 'area' && q.k == r.area) || (q.tipus == 'edat' && q.k == r.edat)));
  const bloquejat = (r) => esPrem(r) && premiumActiu() && !teAcces(r);
  const desaAcces = () => ls.set('acces', acces);
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
    cadenat: '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    estrella: '<svg viewBox="0 0 24 24"><path d="M12 4l2.3 4.8 5.2.7-3.8 3.6.9 5.2L12 15.8l-4.6 2.5.9-5.2-3.8-3.6 5.2-.7z"/></svg>',
    casa: '<svg viewBox="0 0 24 24"><path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M10 20v-5h4v5"/></svg>',
    aula: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M7 20l2-4M17 20l-2-4M7 9h6M7 12h4"/></svg>',
    ok: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    perfil: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-4 3.6-6 7-6s6.2 2 7 6"/></svg>',
    ajustos: '<svg viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/></svg>',
    mes: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/></svg>',
    ajuda: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/></svg>',
    refresca: '<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/></svg>',
    copyright: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M14.8 9.5a3.5 3.5 0 1 0 0 5"/></svg>',
    targeta: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h3"/></svg>',
    sortir: '<svg viewBox="0 0 24 24"><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l-4-4 4-4M6 12h10"/></svg>',
  };

  /* Foto del recurs o, mentre no n'hi hagi, una composició abstracta amb el color de l'àrea */
  function photo(r) {
    if (r.foto) return `<div class="photo"><img src="${esc(XIU_URL(r.foto))}" alt="" loading="lazy"></div>`;
    // fitxa PDF sense foto: la primera pàgina, per la part de dalt
    const pag = r.full && r.full.model === 'pdf' && r.full.pagines.ca[0];
    if (pag) return `<div class="photo pag"><img src="${esc(XIU_URL((r.full.pagines[lang] || r.full.pagines.ca)[0].src))}" alt="" loading="lazy"></div>`;
    // sense foto: una il·lustració feta a partir de la proposta (js/il-lustracions.js)
    const il = window.XIL && XIL.portada(r, AREES[r.area]);
    if (il) return `<div class="photo il">${il}</div>`;
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
      <span class="kind">${kind(r)}</span>${esPrem(r) && premiumActiu() ? `<span class="prem ${bloquejat(r) ? '' : 'obert'}">${bloquejat(r) ? I.cadenat : I.estrella}${t('premium')}</span>` : ''}
      <button class="fav ${on ? 'on' : ''}" data-fav="${r.id}" aria-label="${t('guardar')}">${I.fav}</button>
      ${HOOKS.insignia.map((f) => f(r)).join('')}<h3>${esc(L(r.titol))}</h3>
      <div class="meta"><span class="dot" style="background:${AREES[r.area].color}"></span>${r.edat} ${t('anys')} · ${areaCurta(r)}</div></div>`;
  }

  /* ---------- Pantalles ---------- */
  function vInici() {
    // Quatre blocs: 1 Què fem avui? · 2 Avui a casa · 3 Per a cada infant · 4 Descobreix XIU (document de millores, nov. 2026)
    const h = perId[BIB.temporada.destacat], hora = new Date().getHours();
    const hola = t('hola')[hora < 14 ? 0 : hora < 20 ? 1 : 2];
    const edats = perfil && perfil.edats.length ? perfil.edats : null, ie = (e) => EDATS.indexOf(e);
    const aprop = (r) => !edats || edats.some((e) => Math.abs(ie(e) - ie(r.edat)) <= 1);
    const dia = Math.floor(Date.now() / 864e5);
    const casa = R.filter((r) => r.quotidiana && aprop(r) && !bloquejat(r));
    const casaAvui = casa.length ? [...casa.slice(dia % casa.length), ...casa.slice(0, dia % casa.length)].slice(0, 6) : [];
    const colls = BIB.colleccions || [];
    const gratis = premiumActiu() && !subscrit() ? R.filter((r) => !esPrem(r)).slice(0, 14) : [];
    const bloc = (n, tit, sub, dreta = '') => `<div class="bloc"><span class="blocN">${n}</span><div><h2>${tit}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${dreta}</div>`;
    return `<section class="pageH"><h1>${hola}</h1><div class="scr">${t('tag')}.</div><p>${t('holaP')}</p></section>
      ${HOOKS.iniciDalt.map((f) => f()).join('')}
      ${bloc(1, t('b1T'), t('b1P'), `<button class="blocB" data-go="#/avui">${t('b1Tria')}</button>`)}
      ${HOOKS.bloc1.map((f) => f()).join('')}
      ${bloc(2, t(perfil && perfil.tipus == 'pro' ? 'b2Tpro' : 'b2T'), t(perfil && perfil.tipus == 'pro' ? 'b2Ppro' : 'b2P'), `<button class="blocB" data-go="#/c/quotidiana">${t('veure')}</button>`)}
      ${casaAvui.length ? `<div class="row">${casaAvui.map(card).join('')}</div>` : ''}
      ${HOOKS.bloc2.map((f) => f()).join('')}
      ${bloc(3, t('b3T'), t('b3P'))}
      ${HOOKS.bloc3.map((f) => f()).join('')}
      ${bloc(4, t('b4T'), t('b4P'))}
      ${HOOKS.bloc4.map((f) => f()).join('')}
      <div class="sec"><h2>${t('setmana')} · ${esc(L(BIB.temporada.titol))}</h2></div>
      <div class="hero" data-go="#/r/${h.id}">${photo(h)}
        <div class="txt"><div class="eyebrow">${h.edat} ${t('anys')} · ${AREES[h.area][lang]}</div>
        <h3>${esc(L(h.titol))}</h3><p class="scr">${esc(L(h.subtitol))}</p>
        <div class="tags"><span class="tag">${kind(h)}</span><span class="tag">${esc(L(h.durada))}</span></div></div></div>
      <div class="sec"><h2>${t('novetats')}</h2><button data-go="#/bib/tot">${t('veure')}</button></div>
      <div class="row">${R.filter((r) => r.novetat).slice(0, 14).map(card).join('')}</div>
      <div class="sec"><h2>${t('colleccionsT')}</h2><button data-tab="#/insp">${t('veure')}</button></div>
      <div class="row">${colls.map((c) => perId[c.portada] ? `<button class="coll petita" data-go="#/c/${c.id}">${photo(perId[c.portada])}<div class="ct"><h3>${esc(L(c.titol))}</h3></div></button>` : '').join('')}</div>
      ${gratis.length ? `<button class="premB" data-go="#/premium">${I.estrella}<span><b>${t('premBanner')}</b>${t('premBannerP')}</span>${I.back}</button>` : ''}
      <div class="sec"><h2>${t('exploraEdats')}</h2><button data-tab="#/bib">${t('bib')}</button></div>
      <div class="ages">${EDATS.map((e) => `<div class="age ${edats && edats.includes(e) ? 'meva' : ''}" data-go="#/bib/${e}"><b>${e}</b><span>${t('anys')}</span></div>`).join('')}</div>`;
  }


  function chips(key, opts) {
    return `<div class="filt"><div class="lbl">${t(key)}</div><div class="chips">
      <button class="chip ${!F[key] ? 'on' : ''}" data-f="${key}" data-v="">${t('tots')}</button>
      ${opts.map(([v, l]) => `<button class="chip ${F[key] == v ? 'on' : ''}" data-f="${key}" data-v="${v}">${l}</button>`).join('')}</div></div>`;
  }
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const minuts = (r) => parseInt(L(r.durada), 10) || 10;
  const ordena = (a, b) => (a.ordre ?? 1e6) - (b.ordre ?? 1e6) || ['activitat', 'fitxa', 'joc'].indexOf(a.tipus) - ['activitat', 'fitxa', 'joc'].indexOf(b.tipus) || L(a.titol).localeCompare(L(b.titol));
  function filtra(sense) {
    const q = norm(F.q.trim());
    return R.filter((r) => (!F.edat || r.edat == F.edat) && (!F.area || r.area == F.area) && (!F.tipus || r.tipus == F.tipus)
      && (!F.perfil || r.perfil.includes(F.perfil)) && (!F.acces || (F.acces == 'premium') == esPrem(r))
      && (sense === 'durada' || !F.durada || (F.durada == '10' ? minuts(r) <= 10 : F.durada == '20' ? minuts(r) > 10 && minuts(r) <= 20 : minuts(r) > 20))
      && (!F.pocs || (F.pocs == 'pocs' ? r.tipus != 'activitat' || (L(r.materials) || []).length <= 3 : F.pocs == 'pantalla' ? r.tipus == 'activitat' : r.quotidiana))
      && (!F.obj || (L(r.treballa) || []).some((x) => norm(x) == F.obj))
      && (!q || norm([L(r.titol), L(r.subtitol), ...(r.materials ? L(r.materials) : []), ...(r.treballa ? L(r.treballa) : [])].join(' ')).includes(q))).sort(ordena);
  }
  function llista() {
    const l = filtra();
    return `<div class="count">${t('resultats')(l.length)}</div>` + (l.length ? `<div class="grid">${l.map(card).join('')}</div>`
      : `<div class="empty"><h3>${t('buit')}</h3><p>${t('buitP')}</p><p style="margin-top:16px"><button class="btn" data-netejar>${t('netejar')}</button></p></div>`);
  }
  /* Biblioteca: primer l'edat, després les sis àrees, i dins de cada àrea les propostes (amb filtres) */
  const pocsFiltres = () => `${chips('tipus', [['activitat', t('activitat')], ['fitxa', t('fitxa')], ['joc', t('joc') || 'Joc']])}
      ${chips('perfil', [['fam', t('fam')], ['pro', t('pro')]])}
      ${chips('durada', [['10', t('fDur10')], ['20', t('fDur20')], ['mes', t('fDurMes')]])}
      ${chips('pocs', [['pocs', t('fPocs')], ['pantalla', t('fSensePantalla')], ['casa', t('fQuotidiana')]])}
      ${premiumActiu() ? chips('acces', [['gratuit', t('gratuit')], ['premium', t('premium')]]) : ''}`;
  function vBib(p = []) {
    const [e, a] = p;
    if (e && e !== 'tot' && !EDATS.includes(e)) return vBib([]);
    if (!e) {
      F.edat = F.area = null;
      const n = (ed) => R.filter((r) => r.edat == ed).length;
      return `<section class="pageH"><h1>${t('bib')}</h1><div class="scr">${t('bibS')}</div><p>${t('bibEdatP')}</p></section>
        <label class="search">${I.search}<input id="q" type="search" value="${esc(F.q)}" placeholder="${t('cerca')}" autocomplete="off"></label>
        <div id="llista">${F.q.trim() ? llista() : ''}</div>
        <div class="edatsBib">${EDATS.map((ed) => `<button class="edatB ${perfil && perfil.edats.includes(ed) ? 'meva' : ''}" data-go="#/bib/${ed}"><b>${ed}</b><span>${t('anys')}</span><small>${t('propostes')(n(ed))}</small></button>`).join('')}</div>
        ${HOOKS.bib.map((f) => f()).join('')}
        <p style="margin-top:14px;text-align:center"><button class="enllac" data-go="#/bib/tot">${t('totesPropostes')}</button></p>`;
    }
    if (e === 'tot') return `<button class="back" data-enrere>${I.back}${t('tornar')}</button><section class="pageH"><h1>${t('totesPropostes')}</h1></section>
      <label class="search">${I.search}<input id="q" type="search" value="${esc(F.q)}" placeholder="${t('cerca')}" autocomplete="off"></label>
      ${chips('edat', EDATS.map((x) => [x, x + ' ' + t('anys')]))}${chips('area', Object.entries(AREES).map(([k, x]) => [k, x[lang]]))}${pocsFiltres()}
      <div id="llista">${llista()}</div>`;
    const salts = `<div class="salts">${EDATS.map((x) => `<button class="chip ${x == e ? 'on' : ''}" data-go="#/bib/${x}${a ? '/' + a : ''}">${x}</button>`).join('')}</div>`;
    if (!a || !AREES[a]) {
      F.edat = e; F.area = null;
      return `<button class="back" data-go="#/bib">${I.back}${t('bib')}</button>
        <section class="pageH"><div class="eyebrow">${t('bib')}</div><h1>${e} ${t('anys')}</h1><p>${t('bibAreaP')}</p></section>${salts}
        <div class="areesBib">${Object.entries(AREES).map(([k, x]) => { const rs = R.filter((r) => r.edat == e && r.area == k);
          return `<button class="areaB" data-go="#/bib/${e}/${k}" style="--c:${x.color}"><span class="mini">${rs[0] ? photo(rs[0]) : ''}</span><span class="txt"><b>${esc(x[lang])}</b><small>${t('propostes')(rs.length)}</small></span>${I.back}</button>`; }).join('')}</div>`;
    }
    F.edat = e; F.area = a;
    const base = R.filter((r) => r.edat == e && r.area == a);
    const cnt = new Map();
    for (const x of base.flatMap((r) => L(r.treballa) || [])) { const v = cnt.get(norm(x)) || [x, 0]; v[1]++; cnt.set(norm(x), v); }
    const objs = [...cnt.entries()].sort((x, y) => y[1][1] - x[1][1]).slice(0, 8);
    return `<button class="back" data-go="#/bib/${e}">${I.back}${e} ${t('anys')}</button>
      <section class="pageH areaCap" style="--c:${AREES[a].color}"><div class="eyebrow">${e} ${t('anys')}</div><h1>${esc(AREES[a][lang])}</h1></section>${salts}
      <div class="salts">${Object.entries(AREES).map(([k, x]) => `<button class="chip ${k == a ? 'on' : ''}" data-go="#/bib/${e}/${k}"><span class="dot" style="background:${x.color}"></span>${esc(x[lang].split(' ')[0])}</button>`).join('')}</div>
      <details class="filtres" ${F.tipus || F.perfil || F.durada || F.pocs || F.obj || F.acces ? 'open' : ''}><summary>${t('filtres')}</summary>
        ${pocsFiltres()}${objs.length > 1 ? chips('obj', objs.map(([k, [x]]) => [k, x])) : ''}</details>
      <div id="llista">${llista()}</div>`;
  }


  const sota = (r) => HOOKS.fitxaSota.map((f) => f(r)).join('');
  const ul = (a) => `<ul>${a.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
  function vFitxa(id) {
    const r = perId[id]; if (!r) return vInici();
    const a = AREES[r.area], on = favs.includes(r.id);
    const cap = `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <div class="dHead">${photo(r)}<div>
        <h1>${esc(L(r.titol))}</h1><div class="sub">${esc(L(r.subtitol))}</div>
        <div class="meta-line"><span><span class="dot" style="background:${a.color}"></span>${a[lang]}</span>
          <span>${I.persona}${r.edat} ${t('anys')}</span><span>${I.rellotge}${esc(L(r.durada))}</span></div>
        <div class="tags"><span class="tag">${kind(r)}</span>${r.perfil.map((p) => `<span class="tag">${t(p)}</span>`).join('')}${esPrem(r) && premiumActiu() ? `<span class="tag prem">${I.estrella}${t('premium')}</span>` : ''}</div>
        <div class="actions"><button class="btn ${on ? 'on' : ''}" data-fav="${r.id}">${I.fav}${on ? t('guardat') : t('guardar')}</button>

        ${r.tipus == 'activitat' && !bloquejat(r) ? `<button class="btn" data-pdf="${r.id}">${I.dl}${t('pdf')}</button>` : ''}
        ${r.tipus == 'activitat' && !bloquejat(r) && XP.potCompartir() ? `<button class="btn" data-comparteix="${r.id}">${I.share}${t('compartir')}</button>` : ''}
        ${bloquejat(r) ? '' : HOOKS.accions.map((f) => f(r)).join('')}
        </div>
      </div></div>`;
    if (bloquejat(r)) return cap + paret(r);
    if (HOOKS.recurs[r.tipus]) return cap + HOOKS.recurs[r.tipus](r) + sota(r);
    if (r.tipus == 'fitxa') {
      // la mateixa fitxa: per fer-la aquí amb el dit, o per imprimir (PDF)
      const tabs = `<div class="modes"><button class="${modeFitxa == 'digital' ? 'on' : ''}" data-mode="digital">${I.dit}${t('ferAqui')}</button>
        <button class="${modeFitxa == 'paper' ? 'on' : ''}" data-mode="paper">${I.print}${t('imprimir')}</button></div>`;
      if (modeFitxa == 'digital') return cap + tabs + `<div class="digital" id="digital" style="--c:${a.color}">
        ${XFitxa.html(r, lang, { esborra: t('esborra'), reinicia: t('reinicia'), moltbe: t('moltbe'), ambElDit: t('ambElDit') })}</div>` + sota(r);
      return cap + tabs + `<div class="actions" style="justify-content:center">
          <button class="btn pri" data-pdf="${r.id}">${I.dl}${t('pdf')}</button>
          ${XP.potCompartir() ? `<button class="btn" data-comparteix="${r.id}">${I.share}${t('compartir')}</button>` : ''}</div>
        ${XFitxa.previa(r, a, lang, { nom: t('nom'), data: t('data') })}` + sota(r);
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
      </div>${HOOKS.fitxaSota.map((f) => f(r)).join('')}</div>`;
  }

  /* El mur de Premium: què hi ha a dins i «Molt aviat» (encara no hi ha pagaments) */
  function paret(r) {
    const ini = r.tipus == 'activitat' ? `<div class="intent"><div class="eyebrow" style="margin-bottom:8px">${t('intencio')}</div><p>${esc(L(r.intencio))}</p></div>` : '';
    return `${ini}<div class="paret">${I.cadenat}<h2>${t('premT')}</h2><p>${t('premP')}</p>
      <div class="actions" style="justify-content:center"><button class="btn pri" data-go="#/premium">${I.estrella}${t('veurePrem')}</button></div></div>`;
  }
  function vPremium() {
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH premH"><div class="eyebrow">XIU ${t('premium')}</div><h1>${t('premTot')}</h1><p>${t('premTotP')}</p></section>
      <ul class="inclou">${t('premInclou').map((x) => `<li>${I.ok}${esc(x)}</li>`).join('')}</ul>
      <div class="plans">${t('plans').map(([n, d], i) => `<div class="pla ${i == 1 ? 'dest' : ''}"><b>${n}</b><p>${d}</p><span class="aviat">${t('aviat')}</span></div>`).join('')}</div>
      <p class="nota">${t('aviatP')}</p>`;
  }
  function vPerfil() {
    const p = perfil || { tipus: null, edats: [] };
    return `<section class="pageH"><h1>${t('perfilT')}</h1><div class="scr">${t('tuEts')}</div></section>
      <div class="opcions dues" style="margin-top:22px">${['fam', 'pro'].map((k) => `<button class="opcio ${p.tipus == k ? 'on' : ''}" data-perfil="${k}">${k == 'fam' ? I.casa : I.aula}<b>${t(k + 'T')}</b><span>${t(k + 'D')}</span></button>`).join('')}</div>
      <div class="sec"><h2>${t('teusEdats')}</h2></div>
      <div class="chips">${EDATS.map((e) => `<button class="chip ${p.edats.includes(e) ? 'on' : ''}" data-pedat="${e}">${e} ${t('anys')}</button>`).join('')}</div>
      <div class="sec"><h2>${t('premium')}</h2></div>
      <button class="premB" data-go="#/premium">${I.estrella}<span><b>${t('premBanner')}</b>${t('premBannerP')}</span>${I.back}</button>
      <div class="sec"><h2>${t('compte')}</h2></div>
      ${compte ? `<button class="filaC" data-go="#/compte">${I.perfil}<span><b>${esc(compte.nom)}</b>${esc(compte.correu)}${subscrit() ? ' · Premium' : ''}</span>${I.back}</button>`
        : `<p class="sub2">${t('senseCompte')}</p><div class="actions"><button class="btn pri" data-go="#/compte" data-cmode="registre">${t('creaCompte')}</button><button class="btn" data-go="#/compte" data-cmode="entra">${t('entra')}</button></div>`}
      <div class="sec"><h2>${t('provaT')}</h2></div>
      <div class="caixa prova"><p class="sub2">${t('provaP')}</p>
        <label class="interruptor"><input type="checkbox" data-simula ${simula ? 'checked' : ''}><span></span><b>${t('simula')}</b></label><p class="sub2">${t('simulaP')}</p>
        <button class="btn" data-reinicia>${t('reinicia')}</button></div>
      ${HOOKS.perfil.map((f) => f()).join('')}
      <div class="sec"><h2>${t('mes')}</h2></div><div class="llistaMes"><button data-go="#/quant">${I.info}<span>${t('quant')}</span>${I.back}</button></div>
      <div class="sec"><h2>${t('idioma')}</h2></div>
      <div class="lang" style="display:inline-flex">${['ca', 'es'].map((l) => `<button class="${lang == l ? 'on' : ''}" data-lang="${l}">${l == 'ca' ? 'Català' : 'Castellano'}</button>`).join('')}</div>
      <p style="margin-top:30px"><button class="btn" data-presentacio>${t('presentacio')}</button></p>`;
  }
  function vBenvinguda() {
    const o = onb || (onb = { pas: 0, tipus: perfil ? perfil.tipus : null, edats: perfil ? [...perfil.edats] : [] });
    const lg = `<div class="lang">${['ca', 'es'].map((l) => `<button class="${lang == l ? 'on' : ''}" data-lang="${l}">${l.toUpperCase()}</button>`).join('')}</div>`;
    if (o.pas == 0) return `<div class="onb">${lg}<img class="onbLogo" src="img/logo.svg" alt="XIU · Aprendre jugant">
      <h1>${t('benvinguda')}</h1><p>${t('benvingudaP')}</p>
      <ul class="inclou">${t('com').map((x) => `<li>${I.ok}${esc(x)}</li>`).join('')}</ul>
      <h2>${t('qui')}</h2><p class="pet">${t('quiP')}</p>
      <div class="opcions dues">${['fam', 'pro'].map((k) => `<button class="opcio ${o.tipus == k ? 'on' : ''}" data-onb-tipus="${k}">${k == 'fam' ? I.casa : I.aula}<b>${t(k + 'T')}</b><span>${t(k + 'D')}</span></button>`).join('')}</div>
      <div class="onbPeu"><button class="btn" data-onb-fi="no">${t('araNo')}</button><button class="btn pri" data-onb-seg ${o.tipus ? '' : 'disabled'}>${t('seguent')}</button></div></div>`;
    return `<div class="onb">${lg}<img class="onbLogo" src="img/logo.svg" alt="XIU · Aprendre jugant">
      <h2>${t('edatsQ')}</h2><p class="pet">${t('edatsP')}</p>
      <div class="ages onbEdats">${EDATS.map((e) => `<button class="age ${o.edats.includes(e) ? 'meva' : ''}" data-onb-edat="${e}"><b>${e}</b><span>${t('anys')}</span></button>`).join('')}</div>
      ${o.tipus == 'fam' && window.XIU_APP?.INFANTS ? `<h2>${t('onbInfT')}</h2><p class="pet">${t('onbInfP')}</p><div class="onbInf">${(o.noms ||= [{ nom: '', edat: o.edats[0] || '3-4' }]).map((x, i) => `<div class="onbInfF">
        <input data-onb-nom="${i}" value="${esc(x.nom)}" placeholder="${t('nomInfant') || 'Nom'}" maxlength="30"><select data-onb-iedat="${i}">${EDATS.map((e) => `<option ${x.edat == e ? 'selected' : ''}>${e}</option>`).join('')}</select></div>`).join('')}
        <button class="enllac" data-onb-mesinf>+ ${t('onbMesInf')}</button></div>` : ''}
      <div class="onbPeu"><button class="btn" data-onb-enrere>${t('tornar')}</button><button class="btn pri" data-onb-fi="si">${t('comenca')}</button></div></div>`;
  }

  /* ================= Quant a · Actualitzar · Ajuda · Drets d'autor ================= */
  const llistaMes = () => `<div class="llistaMes">
      <button data-actualitza>${I.refresca}<span>${t('actualitzar')}</span>${I.back}</button>
      <button data-go="#/ajuda">${I.ajuda}<span>${t('ajuda')}</span>${I.back}</button>
      <button data-go="#/drets">${I.copyright}<span>${t('drets')}</span>${I.back}</button>
      ${HOOKS.quant.map((f) => f()).join('')}</div>`;
  const quanEs = (d) => new Date(d).toLocaleDateString(lang == 'es' ? 'es-ES' : 'ca-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  function vQuant() {
    const pq = window.XIU_PAQUET_ACTUAL || window.XIU_PAQUET || {};
    const plat = XP.NATIU ? 'Android' : XP.ESC ? (navigator.platform.startsWith('Win') ? 'Windows' : 'Linux') : 'Web';
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <div class="quant"><img src="img/logo.svg" alt="XIU · Aprendre jugant"><p>${t('quantP')}</p>
        <dl><dt>${t('versio')}</dt><dd>${esc(window.XIU_VERSIO || '')}</dd><dt>${t('plataforma')}</dt><dd>${plat}</dd>
        ${pq.actualitzat ? `<dt>${lang == 'es' ? 'Contenido' : 'Contingut'}</dt><dd>${quanEs(pq.actualitzat)}</dd>` : ''}</dl>
        <p class="sub2">${t('quantFet')}</p></div>${llistaMes()}`;
  }
  function vAjuda() {
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH"><h1>${t('ajuda')}</h1><div class="scr">${t('ajudaS')}</div></section>
      <div class="faq">${t('faq').map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
      <div class="caixa" style="margin-top:22px"><h3>${t('ajudaMes')}</h3><p class="sub2">${t('ajudaMesP')}</p>${VISTES.contacte ? `<div class="actions"><button class="btn pri" data-go="#/contacte">${t('contacte')}</button></div>` : ''}</div>`;
  }
  function vDrets() {
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH"><h1>${t('drets')}</h1><div class="scr">${t('dretsS')}</div></section>
      <div class="drets">${t('dretsText').map(([h, p]) => `<h3>${esc(h)}</h3><p>${esc(p)}</p>`).join('')}<p class="nota" style="text-align:left">${t('dretsNota')}</p></div>`;
  }
  async function actualitza(manual) {
    if (window.XIU_COMPROVA) window.XIU_COMPROVA();   // contingut nou
    if (window.XActualitza && XActualitza.natiu) { await XActualitza.comprova(manual, manual ? (m) => { if (m) avis(m); } : null); return; }
    if (manual) avis(t('buscant'));
    try {
      const r = navigator.serviceWorker && (await navigator.serviceWorker.getRegistration());
      if (r) { await r.update(); if (r.installing || r.waiting) return; }   // en canviar de versió salta «xiu-nova-versio»
    } catch (e) { /* sense connexió */ }
    if (manual) avis(t('darreraV').replace('{v}', window.XIU_VERSIO || ''));
  }
  function modal(html, cls = '') {
    document.querySelector('.modal')?.remove();
    const m = document.createElement('div'); m.className = 'modal'; m.innerHTML = `<div class="mcaixa ${cls}">${html}</div>`;
    document.body.appendChild(m); return m;
  }
  addEventListener('xiu-nova-versio', () => {
    const m = modal(`${I.refresca}<h2>${t('novaV')}</h2><p>${t('novaVP')}</p><div class="actions" style="justify-content:center"><button class="btn" data-m="tard">${t('tard')}</button><button class="btn pri" data-m="ara">${t('actualitzaAra')}</button></div>`);
    m.onclick = (e) => { const b = e.target.closest('[data-m]'); if (!b) return; if (b.dataset.m == 'ara') location.reload(); else m.remove(); };
  });
  function menuMes() {
    const m = modal(`<div class="sheetCap"><b>${t('menu')}</b><button class="tancaM" data-m="x">×</button></div>${llistaMes()}
      <button class="filaC" data-go="#/compte">${I.perfil}<span><b>${compte ? esc(compte.nom) : t('compte')}</b>${compte ? t('elMeuCompte') : t('entraOCrea')}</span>${I.back}</button>`, 'sheet');
    m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('[data-m],[data-go],[data-actualitza]')) setTimeout(() => m.remove()); });
  }

  /* ================= PILOT fase 2: compte, plans i pagament (MODE DE PROVA: no es cobra res) ================= */
  const PREUS = { mensual: 4.99, anual: 39.99, area: 6.99, edat: 9.99 };
  const eur = (n) => n.toFixed(2).replace('.', ',') + ' €';
  let compteMode = 'registre', metode = null, promo = false;
  const banda = () => `<div class="pilot">${I.info}<span><b>${t('pilotT')}</b> ${t('pilotP')}</span></div>`;
  function producte(codi) {
    const [tipus, k] = String(codi).split(':');
    if (tipus == 'mensual' || tipus == 'anual') return { codi, tipus, nom: 'XIU Premium · ' + t('pla_' + tipus), preu: PREUS[tipus], sub: true };
    if (tipus == 'area' && AREES[k]) return { codi, tipus, k, nom: t('paqArea') + ' «' + AREES[k][lang] + '»', preu: PREUS.area, sub: false };
    if (tipus == 'edat' && EDATS.includes(k)) return { codi, tipus, k, nom: t('paqEdat') + ' «' + k + ' ' + t('anys') + '»', preu: PREUS.edat, sub: false };
    return null;
  }
  const teP = (tipus, k) => acces.paquets.some((q) => q.tipus == tipus && q.k == k);
  function vPremium() {
    const sub = subscrit(), pla = sub && acces.pla;
    const botoPla = (k) => `<button class="btn ${pla == k ? '' : 'pri'}" data-compra="${k}" ${pla == k || (pla == 'anual' && k == 'mensual') ? 'disabled' : ''}>${pla == k ? t('elTeu') : t('tria')}</button>`;
    const paq = (tipus, k, nom, color) => { const te = compte && teP(tipus, k); return `<button class="paq ${te ? 'on' : ''}" data-compra="${tipus}:${k}" ${te || sub ? 'disabled' : ''}>${color ? `<span class="dot" style="background:${color}"></span>` : ''}<span>${nom}</span>${te ? `<em>${t('elTeu')}</em>` : ''}</button>`; };
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>${banda()}
      <section class="pageH premH"><div class="eyebrow">XIU ${t('premium')}</div><h1>${t('premTot')}</h1><p>${t('premTotP')}</p></section>
      <div class="compara"><div class="col"><h3>${t('gratuit')}</h3><ul>${t('gratuitL').map((x) => `<li>${I.ok}${esc(x)}</li>`).join('')}</ul></div>
        <div class="col prem"><h3>XIU ${t('premium')}</h3><ul>${t('premiumL').map((x) => `<li>${I.estrella}${esc(x)}</li>`).join('')}</ul></div></div>
      ${sub ? `<div class="jaTens">${I.ok}<span><b>${t('jaTensP')}</b>${t(acces.cancel ? 'sacaba' : 'esRenova').replace('{d}', quanEs(acces.renova))}</span><button class="btn" data-go="#/compte">${t('gestiona')}</button></div>` : ''}
      <div class="sec"><h2>${t('subscripcio')}</h2></div>
      <div class="plans">
        <div class="pla"><b>${t('pla_mensual')}</b><div class="preu">${eur(PREUS.mensual)}<small>${t('perMes')}</small></div><p>${t('plaMensP')}</p>${botoPla('mensual')}</div>
        <div class="pla dest"><span class="rec">${t('recomanat')}</span><b>${t('pla_anual')}</b><div class="preu">${eur(PREUS.anual)}<small>${t('perAny')}</small></div><p>${t('plaAnualP').replace('{m}', eur(PREUS.anual / 12))}</p>${botoPla('anual')}</div>
      </div>
      <div class="sec"><h2>${t('paquets')}</h2></div><p class="sub2">${t('paquetsP')}</p>
      <div class="lblP">${t('perArea')} · <b>${eur(PREUS.area)}</b></div>
      <div class="paqs">${Object.entries(AREES).map(([k, a]) => paq('area', k, a[lang], a.color)).join('')}</div>
      <div class="lblP">${t('perEdatP')} · <b>${eur(PREUS.edat)}</b></div>
      <div class="paqs edats">${EDATS.map((e) => paq('edat', e, e + ' ' + t('anys'))).join('')}</div>
      <p class="nota">${t('preusIva')}</p>`;
  }
  function resum(p) {
    const desc = promo ? Math.round(p.preu * 10) / 100 : 0, total = Math.round((p.preu - desc) * 100) / 100;
    return { total, html: `<div class="caixa resum"><h3>${t('resum')}</h3><div class="linia"><span>${esc(p.nom)}</span><b>${eur(p.preu)}${p.sub ? `<small>${t(p.tipus == 'mensual' ? 'perMes' : 'perAny')}</small>` : ''}</b></div>
      ${desc ? `<div class="linia desc"><span>${t('descompte')} (XIU10)</span><b>−${eur(desc)}</b></div>` : ''}
      <div class="linia total"><span>${t('total')}</span><b>${eur(total)}</b></div><p class="sub2">${t('ivaInc')} · ${p.sub ? t(p.tipus == 'mensual' ? 'renovaMes' : 'renovaAny') : t('perSempre')}</p></div>` };
  }
  const esIOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform == 'MacIntel' && navigator.maxTouchPoints > 1);
  function vPagament(codi) {
    const p = producte(codi); if (!p) return vPremium();
    const r = resum(p);
    const cap = `<button class="back" data-enrere>${I.back}${t('tornar')}</button>${banda()}<section class="pageH"><h1>${t('pagT')}</h1></section>`;
    if (!compte) return cap + r.html + `<div class="sec"><h2>${t('primerCompte')}</h2></div><p class="sub2">${t('primerCompteP')}</p>${formCompte()}`;
    if (XP.NATIU) return cap + `<div class="pagCols"><div><div class="play"><div class="playCap"><b>Google Play</b></div><p><b>${esc(p.nom)}</b><br>${eur(r.total)}${p.sub ? ' ' + t(p.tipus == 'mensual' ? 'perMes' : 'perAny') : ''}</p>
        <p class="sub2">${t('play')}</p><form data-form="paga" data-codi="${p.codi}" novalidate><label class="check"><input type="checkbox" name="condicions"> <span>${p.sub ? t('acceptoSub').replace('{p}', t('pla_' + p.tipus).toLowerCase()) : t('acceptoCompra')}</span></label><div class="err"></div>
        <button class="btn pri gran" type="submit">${p.sub ? t('playB') : t('playC')}</button></form></div></div><aside>${r.html}</aside></div>`;
    const metodes = [['targeta', t('targeta')], ['paypal', 'PayPal'], esIOS() ? ['apay', 'Apple Pay'] : ['gpay', 'Google Pay']];
    if (!metodes.some((m) => m[0] == metode)) metode = 'targeta';
    const nomM = metodes.find((m) => m[0] == metode)[1];
    const camps = metode == 'targeta' ? `<label>${t('numTargeta')}<input name="num" inputmode="numeric" autocomplete="off" placeholder="4242 4242 4242 4242" maxlength="23"></label>
        <div class="dos"><label>${t('caducitat')}<input name="cad" inputmode="numeric" placeholder="MM/AA" maxlength="5" autocomplete="off"></label><label>CVC<input name="cvc" inputmode="numeric" maxlength="4" placeholder="123" autocomplete="off"></label></div>
        <label>${t('titular')}<input name="titular" value="${esc(compte.nom)}" autocomplete="off"></label>`
      : metode == 'bizum' ? `<label>${t('telefon')}<input name="tel" inputmode="tel" placeholder="600 000 000" autocomplete="off"></label><p class="sub2">${t('bizumP')}</p>`
      : `<p class="sub2">${t('externP').replace('{m}', nomM)}</p>`;
    return cap + `<div class="pagCols"><div>
        <h3 class="h3p">${t('metode')}</h3>
        <div class="metodes">${metodes.map(([k, n]) => `<button class="metode ${metode == k ? 'on' : ''} m-${k}" data-metode="${k}">${k == 'targeta' ? I.targeta : `<i>${n.split(' ')[0]}</i>`}<span>${n}</span></button>`).join('')}</div>
        <form data-form="paga" data-codi="${p.codi}" class="formC" novalidate>${camps}
          <label class="check"><input type="checkbox" name="condicions"> <span>${p.sub ? t('acceptoSub').replace('{p}', t('pla_' + p.tipus).toLowerCase()) : t('acceptoCompra')}</span></label>
          <div class="err"></div>
          <button class="btn pri gran" type="submit">${I.cadenat}${t('paga')} ${eur(r.total)}</button>
          <p class="segur">${t('segur')}</p></form></div>
      <aside>${r.html}<form data-form="promo" class="promo" novalidate><input name="codi" placeholder="${t('codiPromo')}" value="${promo ? 'XIU10' : ''}" autocomplete="off"><button class="btn" type="submit">${t('aplica')}</button></form><p class="sub2">${t('promoPista')}</p></aside></div>`;
  }
  function formCompte() {
    const m = compteMode;
    const socials = `<div class="socials"><button type="button" class="btn" data-social="google"><i class="g">G</i>${t('ambGoogle')}</button><button type="button" class="btn" data-social="apple"><i class="a"></i>${t('ambApple')}</button></div><div class="o"><span>${t('o')}</span></div>`;
    if (m == 'oblit') return `<form data-form="oblit" class="formC" novalidate><p class="sub2">${t('oblitP')}</p><label>${t('correu')}<input name="correu" type="email" autocomplete="email"></label><div class="err"></div>
      <button class="btn pri gran" type="submit">${t('enviaEnllac')}</button><p class="canvi"><button type="button" class="enllac" data-cmode="entra">${t('tornar')}</button></p></form>`;
    if (m == 'entra') return `<div class="formC">${socials}<form data-form="entra" novalidate><label>${t('correu')}<input name="correu" type="email" autocomplete="email"></label>
      <label>${t('contrasenya')}<input name="pw" type="password" autocomplete="current-password"></label><p style="text-align:right"><button type="button" class="enllac" data-cmode="oblit">${t('oblit')}</button></p>
      <div class="err"></div><button class="btn pri gran" type="submit">${t('entra')}</button></form><p class="canvi">${t('noTens')} <button class="enllac" data-cmode="registre">${t('creaCompte')}</button></p></div>`;
    const tp = (perfil && perfil.tipus) || 'fam';
    return `<div class="formC">${socials}<form data-form="registre" novalidate>
      <label>${t('nomC')}<input name="nom" autocomplete="name"></label>
      <label>${t('correu')}<input name="correu" type="email" autocomplete="email"></label>
      <label>${t('contrasenya')} <small>${t('contrasenyaP')}</small><input name="pw" type="password" autocomplete="new-password"></label>
      <div class="lblF">${t('soc')}</div><div class="opcions dues petites">${['fam', 'pro'].map((k) => `<label class="opcio ${tp == k ? 'on' : ''}"><input type="radio" name="tipus" value="${k}" ${tp == k ? 'checked' : ''}>${k == 'fam' ? I.casa : I.aula}<b>${t(k + 'T')}</b></label>`).join('')}</div>
      <label>${t('centre')} <small>(${t('opcional')})</small><input name="centre" autocomplete="organization"></label>
      <label class="check"><input type="checkbox" name="condicions"> <span>${t('acceptoCond')}</span></label>
      <label class="check"><input type="checkbox" name="novetats"> <span>${t('novetatsMail')}</span></label>
      <div class="err"></div><button class="btn pri gran" type="submit">${t('creaCompte')}</button></form>
      <p class="canvi">${t('jaTens')} <button class="enllac" data-cmode="entra">${t('entra')}</button></p></div>`;
  }
  function vCompte() {
    if (!compte) return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>${banda()}<section class="pageH"><h1>${t(compteMode == 'entra' ? 'entraT' : compteMode == 'oblit' ? 'oblitT' : 'creaT')}</h1><div class="scr">${t('compteS')}</div></section>${formCompte()}`;
    const sub = subscrit();
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>${banda()}
      <section class="pageH"><h1>${t('elMeuCompte')}</h1><div class="scr">${esc(compte.nom)}</div></section>
      <div class="caixa"><h3>${t('subscripcio')}</h3>${sub ? `<p><b>XIU Premium · ${t('pla_' + acces.pla)}</b> · ${eur(PREUS[acces.pla])}${t(acces.pla == 'mensual' ? 'perMes' : 'perAny')}</p>
          <p class="sub2">${t(acces.cancel ? 'sacaba' : 'esRenova').replace('{d}', quanEs(acces.renova))}</p>
          <div class="actions">${acces.pla == 'mensual' && !acces.cancel ? `<button class="btn" data-compra="anual">${t('passaAnual')}</button>` : ''}${acces.cancel ? `<button class="btn pri" data-sub="reactiva">${t('reactiva')}</button>` : `<button class="btn mal" data-sub="cancel">${t('cancela')}</button>`}</div>`
        : `<p class="sub2">${t('senseSub')}</p><div class="actions"><button class="btn pri" data-go="#/premium">${I.estrella}${t('veurePrem')}</button></div>`}</div>
      ${acces.paquets.length ? `<div class="caixa"><h3>${t('elsTeusPaq')}</h3><ul class="llistaC">${acces.paquets.map((q) => `<li><span>${esc((producte(q.tipus + ':' + q.k) || {}).nom || '')}</span><small>${quanEs(q.data)}</small></li>`).join('')}</ul></div>` : ''}
      ${acces.factures.length ? `<div class="caixa"><h3>${t('factures')}</h3><ul class="llistaC">${acces.factures.map((f, i) => `<li><span><b>${f.num}</b> · ${esc(f.concepte)}<br><small>${quanEs(f.data)} · ${eur(f.import)}</small></span><button class="btn" data-factura="${i}">${I.dl}PDF</button></li>`).join('')}</ul></div>` : ''}
      <div class="caixa"><h3>${t('lesTevesDades')}</h3><form data-form="dades" class="formC" novalidate>
        <label>${t('nomC')}<input name="nom" value="${esc(compte.nom)}"></label><label>${t('correu')}<input name="correu" type="email" value="${esc(compte.correu)}"></label>
        <label>${t('centre')} <small>(${t('opcional')})</small><input name="centre" value="${esc(compte.centre || '')}"></label><div class="err"></div><button class="btn" type="submit">${t('desaCanvis')}</button></form></div>
      <div class="actions"><button class="btn" data-sessio="surt">${I.sortir}${t('tancaSessio')}</button><button class="btn mal" data-sessio="esborra">${t('esborraCompte')}</button></div>`;
  }
  function vFet(codi) {
    const p = producte(codi); if (!p) return vInici();
    return `<div class="fet">${I.ok}<h1>${t('graciesT')}</h1><p>${p.sub ? t('graciesSub') : t('graciesPaq').replace('{p}', esc(p.nom))}</p>
      <p class="sub2">${t('rebutEnviat').replace('{c}', esc(compte ? compte.correu : ''))}</p>
      <div class="actions" style="justify-content:center"><button class="btn pri" data-tab="#/bib">${t('explora')}</button><button class="btn" data-tab="#/compte">${t('elMeuCompte')}</button></div></div>`;
  }
  const correuOk = (c) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c);
  const luhn = (n) => { let s = 0; for (let i = 0; i < n.length; i++) { let d = +n[n.length - 1 - i]; if (i % 2) { d *= 2; if (d > 9) d -= 9; } s += d; } return s % 10 == 0; };
  function entraAmb(c) {
    compte = c; ls.set('compte', compte);
    if (!perfil && c.tipus) { perfil = { tipus: c.tipus, edats: [] }; ls.set('perfil', perfil); }
  }
  const tornaDespres = () => render(true);   // a #/compte surt el compte; a #/pagament, el pagament
  function factura(i) {
    const f = acces.factures[i]; if (!f) return;
    const { jsPDF } = window.jspdf, d = new jsPDF({ unit: 'mm', format: 'a4' });
    d.setFont('helvetica', 'bold'); d.setFontSize(26); d.text('XIU', 20, 28);
    d.setFont('helvetica', 'normal'); d.setFontSize(10); d.text(t('tag'), 20, 34);
    d.setTextColor(181, 84, 58); d.setFont('helvetica', 'bold'); d.text(t('facturaProva'), 20, 46); d.setTextColor(56, 51, 46); d.setFont('helvetica', 'normal');
    d.setFontSize(12); d.text(`${t('factura')}: ${f.num}`, 20, 60); d.text(`${t('dataF')}: ${quanEs(f.data)}`, 20, 67); d.text(`${t('client')}: ${compte ? compte.nom + ' <' + compte.correu + '>' : ''}`, 20, 74);
    d.setDrawColor(221, 208, 193); d.line(20, 84, 190, 84);
    d.text(f.concepte, 20, 94); d.text(eur(f.import), 190, 94, { align: 'right' });
    const base = Math.round((f.import / 1.21) * 100) / 100;
    d.line(20, 102, 190, 102); d.setFontSize(11);
    d.text(t('baseImp'), 120, 112); d.text(eur(base), 190, 112, { align: 'right' });
    d.text(t('iva'), 120, 119); d.text(eur(Math.round((f.import - base) * 100) / 100), 190, 119, { align: 'right' });
    d.setFont('helvetica', 'bold'); d.text(t('total'), 120, 128); d.text(eur(f.import), 190, 128, { align: 'right' });
    XP.desaPdf(new Uint8Array(d.output('arraybuffer')), `XIU ${f.num}.pdf`, { desat: t('desat') }).then((m) => m && avis(m)).catch(() => avis(t('errPdf')));
  }
  function completa(p, total) {
    const ara = new Date();
    if (p.sub) { const r = new Date(ara); if (p.tipus == 'mensual') r.setMonth(r.getMonth() + 1); else r.setFullYear(r.getFullYear() + 1); acces.pla = p.tipus; acces.renova = r.toISOString(); acces.cancel = false; }
    else acces.paquets.push({ tipus: p.tipus, k: p.k, data: ara.toISOString() });
    acces.factures.unshift({ num: `XIU-${ara.getFullYear()}-${String(acces.factures.length + 1).padStart(4, '0')}`, data: ara.toISOString(), concepte: p.nom, import: total, metode: XP.NATIU ? 'Google Play' : metode });
    desaAcces(); promo = false; metode = null;
    pila = ['#/']; ruta = '#/fet/' + p.codi; render(); scrollTo(0, 0);
  }
  document.addEventListener('submit', (e) => {
    const f = e.target, tipus = f.dataset.form; if (!tipus) return;
    e.preventDefault();
    const v = Object.fromEntries(new FormData(f)), err = (k) => { f.querySelector('.err').textContent = k ? t(k) : ''; return false; };
    if (tipus == 'registre') {
      if (!(v.nom || '').trim()) return err('errNom');
      if (!correuOk(v.correu || '')) return err('errCorreu');
      if ((v.pw || '').length < 8) return err('errPw');
      if (!v.condicions) return err('errCond');
      entraAmb({ nom: v.nom.trim(), correu: v.correu.trim(), tipus: v.tipus, centre: (v.centre || '').trim(), novetats: !!v.novetats, des: new Date().toISOString() });
      avis(t('benvingutC').replace('{n}', compte.nom)); return tornaDespres();
    }
    if (tipus == 'entra') {
      if (!correuOk(v.correu || '')) return err('errCorreu');
      if (!(v.pw || '').length) return err('errPw');
      const ant = ls.get('compte-anterior', null);
      entraAmb(ant && ant.correu == v.correu.trim() ? ant : { nom: v.correu.split('@')[0], correu: v.correu.trim(), tipus: perfil ? perfil.tipus : 'fam' });
      avis(t('hola2').replace('{n}', compte.nom)); return tornaDespres();
    }
    if (tipus == 'oblit') { if (!correuOk(v.correu || '')) return err('errCorreu'); avis(t('enllacEnviat')); compteMode = 'entra'; return render(true); }
    if (tipus == 'dades') {
      if (!(v.nom || '').trim()) return err('errNom');
      if (!correuOk(v.correu || '')) return err('errCorreu');
      compte = { ...compte, nom: v.nom.trim(), correu: v.correu.trim(), centre: (v.centre || '').trim() }; ls.set('compte', compte); avis(t('desats')); return render(true);
    }
    if (tipus == 'promo') { promo = (v.codi || '').trim().toUpperCase() == 'XIU10'; avis(t(promo ? 'promoOk' : 'promoKo')); return render(true); }
    if (tipus == 'paga') {
      const p = producte(f.dataset.codi); if (!p) return;
      if (!XP.NATIU && metode == 'targeta') {
        const n = (v.num || '').replace(/\D/g, ''), [mm, aa] = (v.cad || '').split('/').map((x) => parseInt(x, 10));
        if (n.length < 13 || n.length > 19 || !luhn(n)) return err('errNum');
        const fi = new Date(2000 + (aa || 0), mm || 0, 1);
        if (!(mm >= 1 && mm <= 12) || !(aa >= 0) || fi <= new Date()) return err('errCad');
        if (!/^\d{3,4}$/.test(v.cvc || '')) return err('errCvc');
        if (!(v.titular || '').trim()) return err('errTit');
      }
      if (!XP.NATIU && metode == 'bizum' && !/^[67]\d{8}$/.test((v.tel || '').replace(/\D/g, ''))) return err('errTel');
      if (!v.condicions) return err('errCond');
      err(''); f.reset();   // les dades de la targeta no es guarden enlloc
      const total = resum(p).total;
      modal(`<div class="roda"></div><h2>${t('processant')}</h2><p>${t('processantP')}</p>`);
      setTimeout(() => { document.querySelector('.modal')?.remove(); completa(p, total); }, 1700);
    }
  });
  document.addEventListener('input', (e) => {
    const n = e.target.name, f = e.target.form; if (!f || f.dataset.form != 'paga') return;
    if (n == 'num') e.target.value = e.target.value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
    if (n == 'cad') { const d = e.target.value.replace(/\D/g, '').slice(0, 4); e.target.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; }
  });
  document.addEventListener('change', (e) => {
    if (e.target.dataset.onbIedat != null && onb) onb.noms[+e.target.dataset.onbIedat].edat = e.target.value;
    if (e.target.matches('[data-simula]')) { simula = e.target.checked; ls.set('pilot-simula', simula); render(true); }
    if (e.target.name == 'tipus' && e.target.form && e.target.form.dataset.form == 'registre') e.target.form.querySelectorAll('.opcio').forEach((o) => o.classList.toggle('on', o.contains(e.target)));
  });
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-menu],[data-actualitza],[data-compra],[data-metode],[data-cmode],[data-social],[data-sub],[data-sessio],[data-factura],[data-reinicia]');
    if (!el) return;
    const d = el.dataset;
    if (d.cmode) { compteMode = d.cmode; render(true); return; }   // (si també té data-go, ja ha canviat de pàgina)
    if (d.menu != null) menuMes();
    else if (d.actualitza != null) actualitza(true);
    else if (d.compra) go('#/pagament/' + d.compra);
    else if (d.metode) { metode = d.metode; render(true); }
    else if (d.social) { entraAmb({ nom: d.social == 'google' ? 'Usuària de Google' : 'Usuària d\'Apple', correu: d.social == 'google' ? 'prova@gmail.com' : 'prova@icloud.com', tipus: perfil ? perfil.tipus : 'fam', via: d.social }); avis(t('hola2').replace('{n}', compte.nom)); tornaDespres(); }
    else if (d.sub == 'cancel') { if (confirm(t('cancelaQ').replace('{d}', quanEs(acces.renova)))) { acces.cancel = true; desaAcces(); avis(t('cancelada')); render(true); } }
    else if (d.sub == 'reactiva') { acces.cancel = false; desaAcces(); avis(t('reactivada')); render(true); }
    else if (d.sessio == 'surt') { ls.set('compte-anterior', compte); compte = null; ls.set('compte', null); avis(t('sessioTancada')); pila = []; ruta = '#/perfil'; render(); }
    else if (d.sessio == 'esborra') { if (confirm(t('esborraQ'))) { compte = null; ls.set('compte', null); ls.set('compte-anterior', null); acces = { pla: null, renova: null, cancel: false, paquets: [], factures: [] }; desaAcces(); pila = []; ruta = '#/perfil'; render(); } }
    else if (d.factura) factura(+d.factura);
    else if (d.reinicia != null) { if (confirm(t('reiniciaQ'))) { compte = null; ls.set('compte', null); ls.set('compte-anterior', null); acces = { pla: null, renova: null, cancel: false, paquets: [], factures: [] }; desaAcces(); avis(t('reiniciat')); render(true); } }
  });

  function vFav() {
    const l = favs.map((id) => perId[id]).filter(Boolean);
    return `<section class="pageH"><h1>${t('fav')}</h1><div class="scr">${t('favP')}</div></section>
      ${l.length ? `<div class="grid" style="margin-top:22px">${l.map(card).join('')}</div>`
        : `<div class="empty"><div class="ic">${I.fav}</div><h3>${t('favBuit')}</h3><p style="max-width:340px;margin:0 auto 20px">${t('favBuitP')}</p>
           <button class="btn pri" data-go="#/bib">${t('anarBib')}</button></div>`}`;
  }

  // Inspiració: col·leccions per grups (festes tradicionals, estacions de l'any i temes), diferent de la Biblioteca
  const collCard = (c) => (perId[c.portada] ? `<button class="coll" data-go="#/c/${c.id}">${photo(perId[c.portada])}<div class="ct"><h3>${esc(L(c.titol))}</h3><p>${esc(L(c.text))}</p></div></button>` : '');
  function vInsp() {
    const grups = [['festes', t('gFestes'), t('gFestesP')], ['temporades', t('gTemporades'), t('gTemporadesP')], ['temes', t('gTemes'), t('gTemesP')]];
    const sense = BIB.colleccions.filter((c) => !grups.some(([g]) => g == c.grup));
    return `<section class="pageH"><h1>${t('insp')}</h1><div class="scr">${t('inspS')}</div><p>${t('inspP')}</p></section>
      ${grups.map(([g, tit, sub]) => { const cs = BIB.colleccions.filter((c) => c.grup == g); return cs.length ? `<div class="sec"><h2>${tit}</h2>${g == 'festes' ? `<button data-go="#/tradicions">${t('calendari')}</button>` : ''}</div><p class="sub2" style="margin:-6px 0 12px">${sub}</p>
        <div class="inspoG">${cs.map(collCard).join('')}</div>` : ''; }).join('')}
      ${sense.length ? `<div class="inspoG" style="margin-top:22px">${sense.map(collCard).join('')}</div>` : ''}
      <div class="sec"><h2>${t('potser')}</h2></div>
      <div class="row">${BIB.descobreix.map((id) => card(perId[id])).join('')}</div>
      <div class="quote"><p>${esc(L(BIB.cita))}</p><span>${esc(BIB.cita.autor)}</span></div>`;
  }

  function vColleccio(id) {
    const c = BIB.colleccions.find((x) => x.id == id); if (!c) return vInsp();
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH"><div class="eyebrow">${esc({ festes: t('gFestes'), temporades: t('gTemporades'), temes: t('gTemes') }[c.grup] || t('insp'))}</div><h1>${esc(L(c.titol))}</h1><div class="scr">${esc(L(c.text))}</div></section>
      <div class="grid" style="margin-top:22px">${c.recursos.filter((x) => perId[x]).map((x) => card(perId[x])).join('')}</div>
      ${c.grup == 'festes' ? `<p style="margin-top:20px;text-align:center"><button class="btn" data-go="#/tradicions">${t('calendari')}</button></p>` : ''}`;
  }

  /* ---------- Navegació ---------- */
  function go(h) { if (h === ruta) return; pila.push(ruta); ruta = h; modeFitxa = 'digital'; render(); scrollTo(0, 0); }
  function enrere() { if (!pila.length) return false; ruta = pila.pop(); render(); scrollTo(0, 0); return true; }
  function nav() {
    const cur = ruta.split('/')[1] || '';
    const actiu = cur == 'r' || cur == 'material' ? 'bib' : cur == 'c' ? 'insp' : ['ajuda', 'drets', 'privadesa', 'condicions', 'cookies', 'contacte'].includes(cur) ? 'quant' : ['pagament', 'fet'].includes(cur) ? 'compte' : ['premium', 'progres', 'programacio', 'observacio', 'nom', 'rutines', 'rutina', 'diari', 'tradicions'].includes(cur) ? 'perfil' : ['crea', 'avui'].includes(cur) ? 'bib' : cur;
    const boto = ([h, k, nom]) => `<button class="${actiu == h ? 'on' : ''}" data-tab="#/${h}">${I[k]}<span>${nom || t(k)}</span></button>`;
    const base = [['', 'inici'], ['bib', 'bib'], ['insp', 'insp'], ['fav', 'fav']], perf = ['perfil', 'ajustos', t('perfilT')];
    $('#sideNav').innerHTML = [...base, ['quant', 'info', t('quant')], perf].map(boto).join('');
    $('#tabNav').innerHTML = [...base, perf].map(boto).join('');
    const inicial = compte ? esc(compte.nom.trim().charAt(0).toUpperCase()) : '';
    $('#menuT').innerHTML = `<button class="menuB ${actiu == 'compte' ? 'on' : ''}" data-tab="#/compte" aria-label="${t('compte')}" title="${t('compte')}">${inicial ? `<b>${inicial}</b>` : I.perfil}</button>
      <button class="menuB ${actiu == 'quant' ? 'on' : ''}" data-tab="#/quant" aria-label="${t('quant')}" title="${t('quant')}">${I.info}</button>`;
    $('#menuS').innerHTML = `<button class="compteS ${actiu == 'compte' ? 'on' : ''}" data-tab="#/compte">${inicial ? `<b>${inicial}</b>` : I.perfil}<span>${compte ? esc(compte.nom) : t('compte')}<small>${compte ? (subscrit() ? 'XIU Premium' : t('elMeuCompte')) : t('entraOCrea')}</small></span></button>`;
    const lg = ['ca', 'es'].map((l) => `<button class="${lang == l ? 'on' : ''}" data-lang="${l}">${l.toUpperCase()}</button>`).join('');
    $('#langS').innerHTML = lg; $('#langT').innerHTML = lg; $('#tagline').textContent = t('tag');
    document.documentElement.lang = lang;
    document.title = 'XIU · ' + t('tag');
  }
  function render(manté) {
    const p = ruta.replace('#/', '').split('/'), y = scrollY;
    const benv = !perfil && !ls.get('perfil-omes', false) || onb;
    document.body.classList.toggle('onbOn', !!benv);
    const v = benv ? vBenvinguda : { '': vInici, bib: () => vBib(p.slice(1)), fav: vFav, insp: vInsp, perfil: vPerfil, premium: vPremium, compte: vCompte, pagament: () => vPagament(p[1]), fet: () => vFet(p[1]),
      quant: vQuant, ajuda: vAjuda, drets: vDrets, r: () => vFitxa(p[1]), c: () => vColleccio(p[1]),
      ...Object.fromEntries(Object.entries(VISTES).map(([k, f]) => [k, () => f(p.slice(1))])) }[p[0]] || vInici;
    $('#view').innerHTML = `<div class="${manté ? '' : 'fade'}">${v()}</div>`;
    if ($('#digital')) XFitxa.munta($('#digital'));
    for (const f of HOOKS.despres) f(p);
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
    if (bloquejat(r)) return go('#/premium');
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
    const el = e.target.closest('[data-fav],[data-go],[data-tab],[data-lang],[data-f],[data-filtre],[data-enrere],[data-netejar],[data-pdf],[data-comparteix],[data-mode],[data-onb-tipus],[data-onb-edat],[data-onb-seg],[data-onb-enrere],[data-onb-fi],[data-onb-mesinf],[data-perfil],[data-pedat],[data-presentacio]');
    if (!el) return;
    const d = el.dataset;
    if (d.onbTipus) { onb.tipus = d.onbTipus; render(true); }
    else if (d.onbSeg != null) { onb.pas = 1; render(); scrollTo(0, 0); }
    else if (d.onbEnrere != null) { onb.pas = 0; render(); scrollTo(0, 0); }
    else if (d.onbEdat) { onb.edats = onb.edats.includes(d.onbEdat) ? onb.edats.filter((x) => x != d.onbEdat) : [...onb.edats, d.onbEdat]; render(true); }
    else if (d.onbMesinf != null) { onb.noms.push({ nom: '', edat: onb.edats[0] || '3-4' }); render(true); }
    else if (d.onbFi) {
      if (d.onbFi == 'si' && onb.tipus) { perfil = { tipus: onb.tipus, edats: EDATS.filter((x) => onb.edats.includes(x)) }; ls.set('perfil', perfil);
        for (const x of onb.noms || []) if (x.nom.trim()) window.XIU_APP.INFANTS?.afegeix(x.nom.trim(), x.edat); }
      else ls.set('perfil-omes', true);
      onb = null; pila = []; ruta = '#/'; render(); scrollTo(0, 0);
    }
    else if (d.perfil) { perfil = { tipus: d.perfil, edats: perfil ? perfil.edats : [] }; ls.set('perfil', perfil); render(true); }
    else if (d.pedat) {
      const ed = perfil ? perfil.edats : [];
      perfil = { tipus: perfil ? perfil.tipus : 'fam', edats: EDATS.filter((x) => (ed.includes(d.pedat) ? x != d.pedat && ed.includes(x) : ed.includes(x) || x == d.pedat)) };
      ls.set('perfil', perfil); render(true);
    }
    else if (d.presentacio != null) { onb = null; vBenvinguda(); render(); scrollTo(0, 0); }
    else if (d.fav) {
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
    else if (d.tab != null) { pila = []; ruta = d.tab; if (d.tab == '#/bib') F = buit(); render(); scrollTo(0, 0); }
    else if (d.go) go(d.go);
    else if (d.lang) { lang = d.lang; ls.set('idioma', lang); render(true); }
    else if (d.f) { F[d.f] = d.v || null; render(true); }
    else if (d.filtre) { const fl = JSON.parse(d.filtre); F = buit(); go(fl.edat && fl.area ? `#/bib/${fl.edat}/${fl.area}` : fl.edat ? `#/bib/${fl.edat}` : (Object.assign(F, fl), '#/bib/tot')); }
    else if (d.netejar != null) { F = buit(); render(true); }
    else if (d.enrere != null) { if (!enrere()) go('#/'); }
  });
  document.addEventListener('input', (e) => {
    if (e.target.dataset.onbNom != null && onb) onb.noms[+e.target.dataset.onbNom].nom = e.target.value;
    if (e.target.id == 'q') { F.q = e.target.value; $('#llista').innerHTML = ruta == '#/bib' && !F.q.trim() ? '' : llista(); }
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
  window.XIU_APP = {
    t, L, esc, I, ls, avis, modal, quanEs, photo, card, bloquejat, esPrem, HOOKS,
    go: (h) => go(h), render: (m) => render(m), enrere: () => enrere(),
    vista: (k, f) => (VISTES[k] = f),
    textos: (o) => { for (const l of ['ca', 'es']) Object.assign(T[l], o[l] || {}); },
    get lang() { return lang; }, get perfil() { return perfil; }, get compte() { return compte; }, get ruta() { return ruta; },
    get R() { return R; }, get BIB() { return BIB; }, get AREES() { return AREES; }, get EDATS() { return EDATS; }, get perId() { return perId; },
  };
  for (const m of window.XIU_MODULS || []) { try { m(window.XIU_APP); } catch (e) { console.error('Mòdul', e); } }
  // enllaç directe a una proposta (el que es comparteix amb les famílies): .../xiu/#/r/<id>
  if (/^#\/(r|c|joc)\/[\w-]+$/.test(location.hash)) { pila = ['#/']; ruta = location.hash.replace('#/joc/', '#/r/'); }
  render();
  // la pantalla del logo es queda fins que acaba l'animació (uns 1,7 s des que s'obre l'app)
  const resta = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : Math.max(0, 1750 - (performance.now() - (window.XIU_T0 || 0)));
  setTimeout(() => { document.getElementById('splash')?.classList.add('fora'); setTimeout(() => document.getElementById('splash')?.remove(), 600); }, resta);
  // en obrir l'app: si hi ha una versió nova, ho diu i demana actualitzar (APK: plantilla xoriguer-actualitza; web: service worker)
  if (window.XActualitza) XActualitza.inicia({ app: 'xiu', versio: window.XIU_VERSIO || '0', url: 'https://xorigu3r.github.io/xiu/app/versio.json' });
})();
