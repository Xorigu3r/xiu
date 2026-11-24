// XIU · Calendari de tradicions: la Diada, la Castanyada, el Tió i Nadal, els Reis, Carnestoltes, la Mona, Sant Jordi i Sant Joan.
// A l'Inici surt la que toca (o la que arriba aviat) amb idees i propostes relacionades. Ruta: #/tradicions
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I } = A, t = (k) => A.t(k);
  A.textos({
    ca: { tradicions: 'Tradicions', tradicionsS: 'Al llarg de l\'any', araToca: 'Ara toca', falten: 'Falten {n} dies', demà: 'Demà!', idees: 'Idees', relacionades: 'Propostes que hi lliguen', totes: 'Totes les tradicions' },
    es: { tradicions: 'Tradiciones', tradicionsS: 'A lo largo del año', araToca: 'Ahora toca', falten: 'Faltan {n} días', demà: '¡Mañana!', idees: 'Ideas', relacionades: 'Propuestas relacionadas', totes: 'Todas las tradiciones' },
  });
  // Pasqua (calendari gregorià)
  function pasqua(y) {
    const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(y, mes - 1, dia, 12);
  }
  const dia = (y, m, d) => new Date(y, m - 1, d, 12), mes = (dt, n) => new Date(dt.getTime() + n * 864e5);
  const T = [
    { id: 'diada', color: '#C9785B', dates: (y) => [dia(y, 9, 1), dia(y, 9, 11)], el: 'estrella',
      ca: ['La Diada', "L'11 de setembre: la bandera, les cançons i la festa al carrer.", ['Pinteu una bandera amb quatre ratlles vermelles', 'Escolteu i canteu una cançó popular', 'Compteu les ratlles: quantes n\'hi ha?']],
      es: ['La Diada', 'El 11 de septiembre: la bandera, las canciones y la fiesta en la calle.', ['Pintad una bandera con cuatro rayas rojas', 'Escuchad y cantad una canción popular', 'Contad las rayas: ¿cuántas hay?']], par: /colors|music|serie/ },
    { id: 'castanyada', color: '#8A5A3C', dates: (y) => [dia(y, 10, 20), dia(y, 11, 2)], el: 'castanya',
      ca: ['La Castanyada', 'Castanyes, moniatos i panellets per Tots Sants, i la llegenda de la castanyera.', ['Feu panellets de plastilina (o de veritat!)', 'Compteu i classifiqueu castanyes', 'Expliqueu el conte de la castanyera']],
      es: ['La Castanyada', 'Castañas, boniatos y panellets por Todos los Santos, y la leyenda de la castañera.', ['Haced panellets de plastilina (¡o de verdad!)', 'Contad y clasificad castañas', 'Contad el cuento de la castañera']], par: /castany|tardor|plastilin|compt/ },
    { id: 'nadal', color: '#8FA68A', dates: (y) => [dia(y, 12, 1), dia(y, 12, 25)], el: 'estrella',
      ca: ['El Tió i Nadal', "Cuidem el tió (una manta perquè no tingui fred!), el fem cagar i anem a la fira de Santa Llúcia.", ['Feu un tió amb un tronc, uns ulls i una barretina', 'Canteu la cançó del tió picant amb pals de fusta', 'Penjeu estrelles i compteu-les']],
      es: ['El Tió y Navidad', 'Cuidamos el tió (¡una manta para que no tenga frío!), lo hacemos «cagar» y vamos a la feria de Santa Llúcia.', ['Haced un tió con un tronco, unos ojos y una barretina', 'Cantad la canción del tió golpeando con palos de madera', 'Colgad estrellas y contadlas']], par: /music|pots|estrella|manta|conte/ },
    { id: 'reis', color: '#D1A35A', dates: (y) => [dia(y, 12, 26), dia(y + 1, 1, 6)], dates2: (y) => [dia(y - 1, 12, 26), dia(y, 1, 6)], el: 'estrella',
      ca: ['Els Reis', 'La carta, la cavalcada, els camells que tenen gana i el tortell amb la fava.', ['Feu la carta als Reis amb dibuixos', 'Prepareu aigua i palla per als camells', 'Feu corones de cartolina']],
      es: ['Los Reyes', 'La carta, la cabalgata, los camellos con hambre y el roscón con el haba.', ['Haced la carta a los Reyes con dibujos', 'Preparad agua y paja para los camellos', 'Haced coronas de cartulina']], par: /cartolin|dibuix|pintur|titell/ },
    { id: 'carnestoltes', color: '#D29A92', dates: (y) => { const p = pasqua(y); return [mes(p, -60), mes(p, -46)]; }, el: 'flor',
      ca: ['Carnestoltes', 'Disfresses, màscares, la rua i el rei Carnestoltes, que és molt eixelebrat.', ['Feu una màscara de cartró i decoreu-la', 'Disfresseu-vos amb roba de casa i feu una desfilada', 'Juguem a endevinar disfresses']],
      es: ['Carnaval', 'Disfraces, máscaras, la rúa y el rey Carnestoltes, que es muy alocado.', ['Haced una máscara de cartón y decoradla', 'Disfrazaos con ropa de casa y haced un desfile', 'Jugad a adivinar disfraces']], par: /vest|roba|titell|mirall|pintur/ },
    { id: 'mona', color: '#E9C46A', dates: (y) => { const p = pasqua(y); return [mes(p, -14), mes(p, 1)]; }, el: 'bola',
      ca: ['La Mona de Pasqua', 'El padrí o la padrina regalen la mona: pastís, ous de xocolata i plomes de colors.', ['Pinteu ous (o pedres) de colors', 'Feu una mona de plastilina', 'Busqueu ous amagats per casa o pel pati']],
      es: ['La Mona de Pascua', 'El padrino o la madrina regalan la mona: pastel, huevos de chocolate y plumas de colores.', ['Pintad huevos (o piedras) de colores', 'Haced una mona de plastilina', 'Buscad huevos escondidos por casa o por el patio']], par: /plastilin|pintur|pedr|ploma|bossa/ },
    { id: 'santjordi', color: '#C9785B', dates: (y) => [dia(y, 4, 10), dia(y, 4, 23)], el: 'flor',
      ca: ['Sant Jordi', 'Llibres i roses, i la llegenda del drac, la princesa i el cavaller.', ['Expliqueu la llegenda amb titelles', 'Feu una rosa de paper i un punt de llibre', 'Aneu a la biblioteca a triar un conte']],
      es: ['Sant Jordi', 'Libros y rosas, y la leyenda del dragón, la princesa y el caballero.', ['Contad la leyenda con títeres', 'Haced una rosa de papel y un punto de libro', 'Id a la biblioteca a elegir un cuento']], par: /titell|conte|flor|pintur|paper|vocal/ },
    { id: 'santjoan', color: '#D1A35A', dates: (y) => [dia(y, 6, 10), dia(y, 6, 24)], el: 'estrella',
      ca: ['Sant Joan', 'La nit més curta: la revetlla, les fogueres, la coca i el començament de l\'estiu.', ['Feu una foguera de cartolines vermelles i grogues', 'Mireu les estrelles a la nit', 'Jugueu amb aigua: flota o s\'enfonsa?']],
      es: ['San Juan', 'La noche más corta: la verbena, las hogueras, la coca y el comienzo del verano.', ['Haced una hoguera de cartulinas rojas y amarillas', 'Mirad las estrellas por la noche', 'Jugad con agua: ¿flota o se hunde?']], par: /aigua|flota|llum|ombra|estrella|regar/ },
  ];
  const avui = () => { const d = new Date(); d.setHours(12, 0, 0, 0); return d; };
  function quan(tr, ara = avui()) {
    const y = ara.getFullYear();
    for (const f of [tr.dates2, tr.dates].filter(Boolean)) for (const yy of [y, y + 1]) { const [a, b] = f(yy); if (b >= ara) return { a, b, actiu: a <= ara }; }
    return null;
  }
  function actual() {
    const ara = avui(), qs = T.map((tr) => ({ tr, q: quan(tr, ara) })).filter((x) => x.q);
    const act = qs.find((x) => x.q.actiu); if (act) return act;
    const prop = qs.sort((a, b) => a.q.a - b.q.a)[0];
    return prop && (prop.q.a - ara) / 864e5 <= 30 ? prop : null;
  }
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  // cada tradició amb la seva col·lecció d'Inspiració (si n'hi ha); si no, les propostes que hi lliguen
  const COLL = { castanyada: 'castanyada', nadal: 'nadal', reis: 'nadal', carnestoltes: 'carnaval', mona: 'pasqua', santjordi: 'santjordi', santjoan: 'estiu' };
  const coll = (tr) => (A.BIB.colleccions || []).find((c) => c.id === COLL[tr.id]);
  const relacionades = (tr) => coll(tr) ? coll(tr).recursos.map((id) => A.perId[id]).filter((r) => r && !A.bloquejat(r)) : A.R.filter((r) => !A.bloquejat(r) && tr.par.test(norm([r.id, A.L(r.titol), ...(A.L(r.materials) || [])].join(' ')))).slice(0, 8);
  const txt = (tr) => tr[A.lang] || tr.ca;
  const icona = (tr, r = 16) => `<svg viewBox="-20 -20 40 40" class="tradIc">${window.XFitxa ? XFitxa.dibuix(tr.el, r) : ''}</svg>`;
  const compte = (q) => { const n = Math.round((q.a - avui()) / 864e5); return n === 1 ? t('demà') : t('falten').replace('{n}', n); };
  function targeta(tr, q, gran) {
    const [nom, text, idees] = txt(tr);
    return `<div class="trad ${gran ? 'gran' : ''}" style="--c:${tr.color}">${icona(tr)}<div><div class="eyebrow">${q.actiu ? t('araToca') : compte(q)}</div><h3>${esc(nom)}</h3><p>${esc(text)}</p>
      ${gran ? `<ul class="inclou">${idees.map((x) => `<li>${I.ok}${esc(x)}</li>`).join('')}</ul>` : ''}</div></div>`;
  }
  A.HOOKS.bloc4.push(() => {
    const x = actual(); if (!x) return '';
    const rs = relacionades(x.tr);
    return `<div class="sec"><h2>${esc(txt(x.tr)[0])}</h2><button data-go="#/tradicions">${t('totes')}</button></div>
      <button class="tradB" data-go="${coll(x.tr) ? '#/c/' + coll(x.tr).id : '#/tradicions'}" style="--c:${x.tr.color}">${icona(x.tr)}<span><b>${x.q.actiu ? t('araToca') : compte(x.q)}</b>${esc(txt(x.tr)[1])}</span>${I.back}</button>
      ${rs.length ? `<div class="row" style="margin-top:12px">${rs.map(A.card).join('')}</div>` : ''}`;
  });
  A.vista('tradicions', () => {
    const ara = avui(), llista = T.map((tr) => ({ tr, q: quan(tr, ara) })).filter((x) => x.q).sort((a, b) => (b.q.actiu - a.q.actiu) || a.q.a - b.q.a);
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH"><h1>${t('tradicions')}</h1><div class="scr">${t('tradicionsS')}</div></section>
      ${llista.map(({ tr, q }, i) => { const rs = relacionades(tr);
        return `${targeta(tr, q, true)}<p class="dataT">${q.a.toLocaleDateString(A.lang === 'es' ? 'es-ES' : 'ca-ES', { day: 'numeric', month: 'long' })} – ${q.b.toLocaleDateString(A.lang === 'es' ? 'es-ES' : 'ca-ES', { day: 'numeric', month: 'long' })}</p>
          ${rs.length && i < 3 ? `<div class="row" style="margin:8px 0 26px">${rs.map(A.card).join('')}</div>` : '<div style="height:18px"></div>'}`; }).join('')}`;
  });
  A.HOOKS.perfil.push(() => `<div class="llistaMes" style="margin-top:8px"><button data-go="#/tradicions">${I.estrella}<span>${t('tradicions')}</span>${I.back}</button></div>`);
});
