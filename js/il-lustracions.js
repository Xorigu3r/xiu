// XIU · Il·lustracions de portada (quan una proposta encara no té foto).
// Es fan llegint la proposta: els materials i el títol (activitats), els exercicis (fitxes) i el model (jocs).
// Dibuixos plans amb la paleta de XIU. XIL.portada(r, area) → <svg> (viewBox 100×125, com les targetes 4:5).
(function () {
  const C = { tinta: '#38332E', marro: '#786654', talp: '#A79480', sorra: '#E9E3DA', crema: '#FBF6EC', blanc: '#FFFDF9', fusta: '#C8A47E', fustaF: '#A47B55',
    verd: '#8FA68A', blau: '#8EA2B4', ocre: '#D1A35A', terra: '#C9785B', rosa: '#D29A92', oliva: '#9D9B60', metall: '#B8B0A4', vidre: '#DCE7EC', aigua: '#A9C6D6', groc: '#E9C46A', lila: '#A99AC4' };
  const g = (x, y, s, cos, rot = 0) => `<g transform="translate(${x} ${y})${rot ? ` rotate(${rot})` : ''} scale(${s})">${cos}</g>`;
  const ombra = (w = 18) => `<ellipse cy="19" rx="${w}" ry="3" fill="${C.tinta}" opacity=".08"/>`;

  /* ---------- Dibuixos (centrats a 0,0; uns 40×40) ---------- */
  const D = {
    bol: (c = C.terra) => `${ombra()}<path d="M-19 -2h38a19 17 0 0 1-38 0z" fill="${c}"/><ellipse cy="-2" rx="19" ry="4.5" fill="${C.blanc}" opacity=".55"/><path d="M-15 4a16 12 0 0 0 9 8" stroke="#fff" stroke-width="1.6" fill="none" opacity=".35" stroke-linecap="round"/>`,
    cullera: (c = C.fusta) => `<g transform="rotate(-35)"><ellipse cy="-10" rx="6" ry="8.5" fill="${c}"/><rect x="-1.8" y="-3" width="3.6" height="24" rx="1.8" fill="${c}"/><ellipse cx="-1.5" cy="-12" rx="2" ry="3.5" fill="#fff" opacity=".3"/></g>`,
    pinces: () => `<g transform="rotate(20)"><path d="M-2 -20 C-10 -5 -11 8 -9 18" stroke="${C.metall}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M2 -20 C10 -5 11 8 9 18" stroke="${C.metall}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M-3 -21h6" stroke="${C.marro}" stroke-width="5" stroke-linecap="round"/></g>`,
    pompo: (c = C.rosa) => `<circle r="7" fill="${c}"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${(Math.cos(i * 0.785) * 5.5).toFixed(1)}" cy="${(Math.sin(i * 0.785) * 5.5).toFixed(1)}" r="2.6" fill="${c}"/>`).join('')}<circle cx="-2" cy="-2" r="2" fill="#fff" opacity=".35"/>`,
    ampolla: (c = C.blau, dins = C.groc) => `${ombra(10)}<rect x="-4" y="-22" width="8" height="5" rx="1.5" fill="${C.terra}"/><path d="M-3.5 -17h7v4l5 4v24a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3v-24l5-4z" fill="${C.vidre}" stroke="${c}" stroke-width="1.2"/><path d="M-8.5 2h17v12a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3z" fill="${c}" opacity=".55"/>${[[-4, 8, 1.6], [2, 11, 1.4], [5, 5, 1.2], [-1, 13, 1.3]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${dins}"/>`).join('')}<path d="M-6 -6v8" stroke="#fff" stroke-width="1.5" opacity=".6" stroke-linecap="round"/>`,
    bossa: (c = C.rosa) => `${ombra(16)}<path d="M-12 -12c-6 8-8 20-4 28h32c4-8 2-20-4-28z" fill="${c}"/><path d="M-13 -13q13 6 26 0" stroke="${C.marro}" stroke-width="2" fill="none"/><path d="M0 -10q-3 -8 -8 -10M0 -10q3 -8 8 -10" stroke="${C.marro}" stroke-width="1.6" fill="none" stroke-linecap="round"/><text y="8" text-anchor="middle" font-family="Quicksand,sans-serif" font-weight="700" font-size="14" fill="#fff" opacity=".85">?</text>`,
    caixa: (c = C.fusta) => `${ombra(19)}<rect x="-18" y="-8" width="36" height="24" rx="2" fill="${c}"/><rect x="-20" y="-13" width="40" height="6" rx="2" fill="${C.fustaF}"/><circle cx="0" cy="-2" r="5" fill="${C.fustaF}"/><path d="M-18 6h36" stroke="${C.fustaF}" stroke-width="1" opacity=".5"/>`,
    pilota: (c = C.terra) => `${ombra(9)}<circle r="10" fill="${c}"/><path d="M-10 0q10 -7 20 0M-7 -7q7 14 0 14" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/>`,
    recipient: (c = C.aigua) => `${ombra(19)}<rect x="-18" y="-14" width="36" height="30" rx="4" fill="${C.vidre}" opacity=".9" stroke="${C.blau}" stroke-width="1.2"/><path d="M-18 -2q9 -3 18 0t18 0v14a4 4 0 0 1-4 4h-28a4 4 0 0 1-4-4z" fill="${c}" opacity=".8"/><circle cx="-8" cy="6" r="1.6" fill="#fff" opacity=".7"/><circle cx="6" cy="10" r="1.2" fill="#fff" opacity=".7"/>`,
    suro: () => `<rect x="-5" y="-4" width="10" height="8" rx="2" fill="${C.fusta}"/><ellipse cy="-4" rx="5" ry="1.6" fill="#DCC2A0"/>`,
    cistell: (c = C.fusta) => `${ombra(20)}<path d="M-21 -6h42l-5 22h-32z" fill="${c}"/>${[-14, -7, 0, 7, 14].map((x) => `<path d="M${x} -6l${x * -0.12} 22" stroke="${C.fustaF}" stroke-width="1.2" opacity=".7"/>`).join('')}${[0, 6, 12].map((y) => `<path d="M${-20 + y * 0.22} ${y - 2}h${40 - y * 0.44}" stroke="${C.fustaF}" stroke-width="1.2" opacity=".6"/>`).join('')}<rect x="-22" y="-9" width="44" height="4" rx="2" fill="${C.fustaF}"/>`,
    pinya: () => `<ellipse rx="9" ry="12" fill="#9A6B45"/>${[-6, 0, 6].map((y) => `<path d="M-8 ${y}l4 -3 4 3 4 -3 4 3" stroke="#6E4A2E" stroke-width="1.2" fill="none"/>`).join('')}<path d="M0 -12v-4" stroke="${C.oliva}" stroke-width="2" stroke-linecap="round"/>`,
    llanterna: () => `<path d="M8 -4 L60 -26 L60 22 Z" fill="${C.groc}" opacity=".35"/><rect x="-14" y="-6" width="20" height="12" rx="2" fill="${C.tinta}"/><rect x="4" y="-8" width="6" height="16" rx="1.5" fill="${C.marro}"/><circle cx="-6" cy="0" r="1.8" fill="${C.ocre}"/>`,
    ma: (c = '#E8C4A8') => `<path d="M-6 16v-14l-6 -8a2.5 2.5 0 0 1 4 -3l4 5v-13a2.5 2.5 0 0 1 5 0v10v-13a2.5 2.5 0 0 1 5 0v13v-11a2.5 2.5 0 0 1 5 0v12v-8a2.5 2.5 0 0 1 5 0v14c0 8-5 12-11 12h-1c-5 0-10-3-10-8z" fill="${c}"/>`,
    platan: () => `<path d="M-14 4q14 14 30 -10q-2 -2 -4 -1q-12 14 -24 6z" fill="${C.groc}"/><path d="M16 -6l2 -3" stroke="${C.marro}" stroke-width="2" stroke-linecap="round"/>`,
    mandarina: () => `${ombra(9)}<circle r="10" fill="#E8964A"/><path d="M0 -10q4 -5 9 -3q-4 4 -9 3z" fill="${C.oliva}"/><circle cx="-3" cy="-3" r="2.5" fill="#fff" opacity=".3"/>`,
    raim: () => `${[[0, -10], [-5, -5], [5, -5], [-8, 1], [0, 0], [8, 1], [-4, 6], [4, 6], [0, 11]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.3" fill="${C.lila}"/>`).join('')}<path d="M0 -14v-5" stroke="${C.marro}" stroke-width="1.8"/><path d="M0 -17q6 -4 9 0q-5 3 -9 0z" fill="${C.oliva}"/>`,
    poma: () => window.XFitxa ? `<g>${XFitxa.dibuix('poma', 11)}</g>` : '',
    manta: (c = C.rosa) => `<rect x="-22" y="-12" width="44" height="26" rx="5" fill="${c}"/>${[-12, 0, 12].map((x) => `<path d="M${x} -12v26" stroke="#fff" stroke-width="1.4" opacity=".35"/>`).join('')}${[-3, 7].map((y) => `<path d="M-22 ${y}h44" stroke="#fff" stroke-width="1.4" opacity=".35"/>`).join('')}`,
    cor: (c = C.terra) => `<path d="M0 8 C-14 -2 -10 -14 0 -7 C10 -14 14 -2 0 8z" fill="${c}"/>`,
    nota: (c = C.marro) => `<path d="M4 -10v14" stroke="${c}" stroke-width="2"/><ellipse cx="0" cy="5" rx="4.5" ry="3.4" fill="${c}" transform="rotate(-20 0 5)"/><path d="M4 -10q6 2 7 7" stroke="${c}" stroke-width="2" fill="none"/>`,
    cassola: (c = C.metall) => `${ombra(19)}<path d="M-17 -6h34v14a8 8 0 0 1-8 8h-18a8 8 0 0 1-8-8z" fill="${c}"/><rect x="-21" y="-8" width="42" height="4" rx="2" fill="#A39B8F"/><path d="M-21 -3h-5M21 -3h5" stroke="#A39B8F" stroke-width="3" stroke-linecap="round"/>`,
    pinzell: (c = C.terra) => `<g transform="rotate(30)"><rect x="-1.8" y="-6" width="3.6" height="26" rx="1.8" fill="${C.fusta}"/><rect x="-3" y="-11" width="6" height="6" fill="${C.metall}"/><path d="M-3.5 -11q3.5 -10 7 0z" fill="${c}"/></g>`,
    ploma: (c = C.blau) => `<g transform="rotate(-25)"><path d="M0 -20q9 10 0 30q-9 -20 0 -30z" fill="${c}"/><path d="M0 -18v32" stroke="${C.marro}" stroke-width="1"/></g>`,
    taca: (c = C.ocre) => `<path d="M-8 -4q2 -8 9 -6q8 -2 8 6q4 6 -3 9q-3 6 -9 2q-8 2 -7 -5q-4 -3 2 -6z" fill="${c}"/>`,
    paper: () => `${ombra(20)}<rect x="-20" y="-14" width="40" height="30" rx="1.5" fill="${C.blanc}" stroke="${C.sorra}"/>`,
    plastilina: () => `${ombra(18)}<circle cx="-10" cy="4" r="7" fill="${C.verd}"/><circle cx="4" cy="6" r="6" fill="${C.ocre}"/><path d="M8 -6q8 -2 12 4q-6 6 -12 2q-4 -3 0 -6z" fill="${C.rosa}"/><rect x="-16" y="-10" width="24" height="5" rx="2.5" fill="${C.fusta}" transform="rotate(-12)"/>`,
    regadora: (c = C.verd) => `${ombra(16)}<path d="M-12 -8h18v20a3 3 0 0 1-3 3h-12a3 3 0 0 1-3-3z" fill="${c}"/><path d="M6 -2l14 -10" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="21" cy="-13" rx="3.5" ry="2" fill="${c}" transform="rotate(-35 21 -13)"/><path d="M-12 -4q-8 2 -6 9" stroke="${c}" stroke-width="2.5" fill="none"/>${[[24, -6], [27, -2], [25, 2]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="${C.aigua}"/>`).join('')}`,
    planta: () => `${ombra(10)}<path d="M-8 6h16l-2 12h-12z" fill="${C.terra}"/><path d="M0 6v-14" stroke="${C.oliva}" stroke-width="1.8"/><path d="M0 -2q-12 -2 -12 -12q10 0 12 12zM0 -6q12 -2 12 -12q-10 0 -12 12z" fill="${C.verd}"/>`,
    safata: (c = C.fusta) => `<path d="M-26 -4h52l-4 10h-44z" fill="${c}"/><path d="M-26 -4h52" stroke="${C.fustaF}" stroke-width="2"/>`,
    mitjo: (c = C.ocre) => `<path d="M-8 -18h16v20q0 10 8 10a6 6 0 0 1 0 12h-12q-12 0 -12 -16z" fill="${c}"/><circle cx="-1" cy="-8" r="2.6" fill="#fff"/><circle cx="-1" cy="-8" r="1.2" fill="${C.tinta}"/><path d="M8 14q-4 2 -8 0" stroke="${C.terra}" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    teatre: () => `${ombra(22)}<rect x="-22" y="-18" width="44" height="34" rx="2" fill="${C.fusta}"/><rect x="-17" y="-12" width="34" height="20" fill="${C.crema}"/><path d="M-17 -12h11q-2 10 -11 20zM17 -12h-11q2 10 11 20z" fill="${C.terra}"/><rect x="-22" y="-20" width="44" height="5" rx="2" fill="${C.terra}"/>`,
    samarreta: (c = C.blau) => `<path d="M-6 -12l-12 6 4 8 5-3v17h18v-17l5 3 4-8-12-6q-6 5 -12 0z" fill="${c}"/>`,
    penjador: () => `<path d="M0 -16q4 -6 0 -8" stroke="${C.marro}" stroke-width="1.5" fill="none"/><path d="M-16 -6l16 -10 16 10z" fill="none" stroke="${C.marro}" stroke-width="1.8" stroke-linejoin="round"/>`,
    mirall: () => `${ombra(12)}<ellipse cy="-4" rx="12" ry="16" fill="${C.fusta}"/><ellipse cy="-4" rx="9.5" ry="13.5" fill="${C.vidre}"/><path d="M-4 -12l6 -4M-5 -6l9 -6" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>`,
    llegums: () => `${[[-6, 0, 0], [3, -2, 30], [8, 4, -20], [-2, 6, 60], [-10, 6, 10], [5, 9, 80]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="2.3" fill="#C9A070" transform="rotate(${r} ${x} ${y})"/>`).join('')}`,
    cartolines: () => `${[[C.terra, -14, -4, -8], [C.ocre, -2, -6, 4], [C.blau, 10, -2, 10], [C.verd, 0, 8, -4]].map(([c, x, y, r]) => `<rect x="${x - 7}" y="${y - 7}" width="14" height="14" rx="2" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`).join('')}`,
    anelles: () => `<circle cx="-7" r="7" fill="none" stroke="${C.fusta}" stroke-width="3.4"/><circle cx="7" cy="2" r="6" fill="none" stroke="${C.fustaF}" stroke-width="3.2"/>`,
    farina: () => `${ombra(12)}<path d="M-11 -10h22l2 26h-26z" fill="${C.blanc}" stroke="${C.sorra}"/><path d="M-11 -10q11 -6 22 0" fill="${C.crema}"/><text y="8" text-anchor="middle" font-family="Quicksand,sans-serif" font-size="6" font-weight="700" fill="${C.talp}">FARINA</text>`,
    tamboret: () => `<rect x="-12" y="-6" width="24" height="5" rx="2" fill="${C.fusta}"/><path d="M-9 -1l-3 16M9 -1l3 16" stroke="${C.fustaF}" stroke-width="3" stroke-linecap="round"/>`,
    fulla: () => window.XFitxa ? XFitxa.dibuix('fulla', 11) : '', castanya: () => window.XFitxa ? XFitxa.dibuix('castanya', 9) : '',
    pedra: () => window.XFitxa ? XFitxa.dibuix('pedra', 9) : '', flor: () => window.XFitxa ? XFitxa.dibuix('flor', 10) : '',
    estrella: () => window.XFitxa ? XFitxa.dibuix('estrella', 10) : '', bola: () => window.XFitxa ? XFitxa.dibuix('bola', 9) : '',
  };

  /* ---------- Escena: fons amb el color de l'àrea, terra suau i dibuixos ---------- */
  const fons = (color, cos) => `<svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="125" fill="${C.crema}"/><rect width="100" height="125" fill="${color}" opacity=".22"/>
    <circle cx="82" cy="20" r="26" fill="#fff" opacity=".35"/><circle cx="12" cy="104" r="20" fill="${color}" opacity=".18"/>
    <path d="M0 96 Q30 86 55 92 T100 88 V125 H0Z" fill="${color}" opacity=".2"/>${cos}</svg>`;
  const posa = (llista) => llista.map(([nom, x, y, s, rot, ...arg]) => (D[nom] ? g(x, y, s, D[nom](...arg), rot || 0) : '')).join('');

  // Escenes fetes a mà, llegint cada activitat
  const ESCENES = {
    'ampolles-sensorials': [['ampolla', 34, 74, 1.25, -6, C.blau, C.groc], ['ampolla', 64, 72, 1.25, 6, C.rosa, C.verd], ['ampolla', 49, 86, 0.9, 0, C.verd, C.ocre]],
    'bossa-misteriosa': [['bossa', 50, 70, 1.6], ['cullera', 22, 92, 0.7, 0, C.fusta], ['pinya', 80, 92, 0.75], ['pilota', 26, 50, 0.6, 0, C.blau]],
    'caixa-permanencia': [['caixa', 50, 68, 1.5], ['pilota', 79, 92, 0.8, 0, C.terra], ['safata', 66, 99, 0.6]],
    'classifiquem-colors': [['bol', 24, 84, 0.75, 0, C.terra], ['bol', 50, 88, 0.75, 0, C.blau], ['bol', 76, 84, 0.75, 0, C.verd], ['pompo', 30, 50, 0.6, 0, C.terra], ['pompo', 52, 58, 0.6, 0, C.blau], ['fulla', 72, 52, 0.8], ['pinces', 48, 34, 0.6]],
    flota: [['recipient', 50, 76, 1.5], ['suro', 40, 63, 0.9], ['poma', 60, 62, 0.65], ['pedra', 54, 88, 0.7]],
    'joc-heuristic': [['cistell', 30, 84, 0.75], ['anelles', 64, 60, 1.1], ['suro', 72, 86, 1], ['caixa', 30, 48, 0.55], ['pinces', 78, 36, 0.55]],
    'llum-i-ombres': [['llanterna', 22, 56, 1], ['ma', 74, 60, 1.15, 0, C.tinta], ['ma', 60, 92, 0.6]],
    macedonia: [['bol', 50, 86, 1.5, 0, C.blanc], ['platan', 40, 62, 0.9], ['mandarina', 62, 66, 0.9], ['raim', 74, 44, 0.75], ['poma', 30, 44, 0.75]],
    massatge: [['manta', 50, 82, 1.5, 0, C.rosa], ['cor', 50, 50, 1.3, 0, C.terra], ['ma', 26, 44, 0.55], ['nota', 76, 40, 0.9]],
    'musica-amb-pots': [['cassola', 42, 82, 1.2], ['cullera', 72, 70, 1, 0, C.fusta], ['nota', 30, 46, 1], ['nota', 58, 38, 0.8, 0, C.terra], ['nota', 78, 50, 0.7, 0, C.ocre]],
    panera: [['cistell', 50, 82, 1.4], ['pinya', 36, 62, 0.75], ['cullera', 58, 56, 0.85, 0, C.fusta], ['anelles', 70, 66, 0.6], ['manta', 30, 44, 0.4, 0, C.verd]],
    'pinces-i-pompons': [['bol', 64, 88, 1.1, 0, C.blau], ['pinces', 36, 60, 1.2], ['pompo', 54, 70, 0.7, 0, C.rosa], ['pompo', 70, 76, 0.65, 0, C.ocre], ['pompo', 26, 92, 0.6, 0, C.verd]],
    pintura: [['paper', 50, 80, 1.6], ['taca', 40, 76, 1, 0, C.ocre], ['taca', 62, 84, 0.8, 30, C.terra], ['ploma', 72, 52, 0.9], ['fulla', 30, 52, 0.9], ['pinzell', 56, 54, 0.8, 0, C.verd]],
    'plastilina-casolana': [['plastilina', 50, 84, 1.4], ['farina', 30, 52, 0.85], ['bol', 72, 56, 0.75, 0, C.terra]],
    'regar-plantes': [['planta', 64, 80, 1.4], ['regadora', 32, 56, 1.15]],
    tardor: [['safata', 50, 92, 1.6, 0, C.fusta], ['fulla', 30, 78, 1.1], ['castanya', 50, 80, 1], ['pinya', 70, 76, 0.75], ['fulla', 60, 52, 0.8], ['castanya', 36, 56, 0.7]],
    'titelles-contes': [['teatre', 50, 76, 1.4], ['mitjo', 40, 60, 0.75, 0, C.ocre], ['mitjo', 62, 62, 0.7, 0, C.verd]],
    trasvas: [['safata', 50, 96, 1.5], ['bol', 30, 84, 0.9, 0, C.terra], ['bol', 70, 84, 0.9, 0, C.blau], ['llegums', 30, 74, 0.8], ['cullera', 52, 56, 1.2, 0, C.fusta]],
    vestir: [['penjador', 36, 40, 1.3], ['samarreta', 36, 66, 1.3, 0, C.blau], ['mirall', 72, 68, 1.3], ['tamboret', 52, 98, 0.9]],
  };
  // Activitats noves: es tria pel que diu (materials i títol)
  const PARAULES = [['ampoll', 'ampolla'], ['bossa', 'bossa'], ['caix', 'caixa'], ['bol', 'bol'], ['culler', 'cullera'], ['pinc', 'pinces'], ['pompo', 'pompo'], ['aigua', 'recipient'],
    ['suro', 'suro'], ['panera', 'cistell'], ['cistell', 'cistell'], ['pinya', 'pinya'], ['llantern', 'llanterna'], ['ombra', 'ma'], ['fruit', 'mandarina'], ['platan', 'platan'], ['raim', 'raim'],
    ['poma', 'poma'], ['manta', 'manta'], ['music', 'nota'], ['canco', 'nota'], ['cassol', 'cassola'], ['pinzell', 'pinzell'], ['pintur', 'taca'], ['plom', 'ploma'], ['paper', 'paper'],
    ['plastilin', 'plastilina'], ['farina', 'farina'], ['regador', 'regadora'], ['planta', 'planta'], ['safata', 'safata'], ['titell', 'mitjo'], ['mitjo', 'mitjo'], ['roba', 'samarreta'],
    ['mirall', 'mirall'], ['llegum', 'llegums'], ['cartolin', 'cartolines'], ['anell', 'anelles'], ['fulla', 'fulla'], ['castany', 'castanya'], ['pedr', 'pedra'], ['flor', 'flor'], ['pilota', 'pilota'], ['tamboret', 'tamboret']];
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  function escenaPerParaules(r) {
    const txt = norm([r.titol?.ca, ...(r.materials?.ca || [])].join(' ')), noms = [];
    for (const [p, n] of PARAULES) if (txt.includes(p) && !noms.includes(n)) noms.push(n);
    if (!noms.length) return null;
    const pos = [[50, 74, 1.45], [28, 50, 0.8], [74, 52, 0.8], [30, 92, 0.65], [72, 94, 0.65]];
    return noms.slice(0, 5).map((n, i) => [n, ...pos[i]]);
  }

  /* ---------- Fitxes digitals: el que s'hi fa ---------- */
  const lletra = (txt, x, y, mida, color = C.tinta, puntejat = false) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="'Cormorant Garamond',Georgia,serif" font-weight="600" font-size="${mida}"
    ${puntejat ? `fill="none" stroke="${C.talp}" stroke-width="1.4" stroke-dasharray="1.5 2.5" stroke-linecap="round"` : `fill="${color}"`} style="font-variant-numeric:lining-nums">${txt}</text>`;
  const dib = (nom, x, y, r) => (window.XFitxa ? g(x, y, 1, XFitxa.dibuix(nom, r)) : '');
  function fitxa(r, area) {
    const ex = r.full?.exercicis?.[0]; if (!ex) return null;
    const c = area.color;
    if (ex.tipus === 'ressegueix') {
      const t = String(ex.caracters || '').trim().slice(0, 3);
      return fons(c, `<rect x="16" y="26" width="68" height="74" rx="6" fill="#fff" opacity=".85"/>${lletra(t.charAt(0), 50, 82, 54)}${lletra(t.charAt(0), 50, 82, 54, 0, true).replace('<text', `<text dx="0"`)}
        <path d="M30 92h40" stroke="${C.sorra}" stroke-width="1.2"/>${/\d/.test(t) ? Array.from({ length: Math.min(9, +t || 0) }, (_, i) => dib('bola', 26 + (i % 5) * 12, 106 + Math.floor(i / 5) * 9, 3.6)).join('') : g(80, 36, 1, D.pinzell(c))}`);
    }
    if (ex.tipus === 'compta') {
      const gr = ex.grups.slice(0, 2);
      return fons(c, gr.map((q, k) => `<rect x="${12 + k * 40}" y="34" width="36" height="52" rx="6" fill="#fff" opacity=".85"/>${Array.from({ length: Math.min(q.n, 6) }, (_, i) => dib(q.element, 22 + k * 40 + (i % 2) * 16, 46 + Math.floor(i / 2) * 13, 5)).join('')}
        <circle cx="${30 + k * 40}" cy="100" r="8" fill="none" stroke="${C.terra}" stroke-width="1.6"/>${lletra(q.n, 30 + k * 40, 104.5, 12)}`).join(''));
    }
    if (ex.tipus === 'serie') {
      const S = { f: 'fulla', p: 'pedra', e: 'estrella', b: 'bola', c: 'castanya', l: 'flor', m: 'poma' }, fila = String(ex.files[0]).replace('?', '').split('').slice(0, 4);
      return fons(c, `<rect x="8" y="48" width="84" height="30" rx="6" fill="#fff" opacity=".85"/>${fila.map((k, i) => dib(S[k] || 'bola', 18 + i * 18, 63, 6)).join('')}
        <rect x="80" y="55" width="16" height="16" rx="3" fill="none" stroke="${C.terra}" stroke-dasharray="2 2"/>${lletra('?', 88, 68, 13, C.terra)}`);
    }
    if (ex.tipus === 'encercla') return fons(c, `${ex.elements.slice(0, 6).map((n, i) => dib(n, 24 + (i % 3) * 26, 52 + Math.floor(i / 3) * 28, 8)).join('')}<circle cx="50" cy="52" r="12" fill="none" stroke="${C.terra}" stroke-width="1.6"/>`);
    return fons(c, `<rect x="18" y="30" width="64" height="64" rx="6" fill="#fff" opacity=".85"/>${g(56, 70, 1.2, D.pinzell(c))}${g(40, 58, 1, D.taca(C.ocre))}`);
  }

  /* ---------- Jocs: com és la partida ---------- */
  function joc(r, area) {
    const j = r.joc || {}, c = area.color, carta = (x, y, nom) => `<rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="4" fill="${nom ? '#fff' : c}" stroke="#fff" stroke-width="1.5"/>${nom ? dib(nom, x, y, 6.5) : `<path d="M${x - 6} ${y + 6}l12 -12" stroke="#fff" stroke-width="1.2" opacity=".6"/>`}`;
    switch (j.model) {
      case 'memory': return fons(c, [[-1, 0, 'estrella'], [0, 0, null], [1, 0, null], [-1, 1, null], [0, 1, 'estrella'], [1, 1, null], [-1, 2, null], [0, 2, null], [1, 2, 'poma']].slice(0, j.parelles > 3 ? 9 : 6).map(([cx, cy, n]) => carta(50 + cx * 26, 46 + cy * 26, n)).join(''));
      case 'quantitats': return fons(c, `${[0, 1, 2].map((i) => dib('poma', 32 + i * 18, 50, 7)).join('')}${[2, 3, 4].map((n, i) => `<rect x="${20 + i * 22}" y="80" width="18" height="18" rx="4" fill="${n === 3 ? C.verd : '#fff'}"/>${lletra(n, 29 + i * 22, 94, 15, n === 3 ? '#fff' : C.tinta)}`).join('')}`);
      case 'mida': return fons(c, [4.5, 7, 9.5, 12].slice(0, j.n > 3 ? 4 : 3).map((rr, i, a) => dib(j.element || 'castanya', 22 + i * (60 / (a.length - 1)), 86 - rr, rr)).join('') + `<path d="M18 98h64" stroke="${C.marro}" stroke-width="1" opacity=".4"/><path d="M70 104l12 -6-12 -6" stroke="${C.terra}" stroke-width="1.5" fill="none"/>`);
      case 'ombres': return fons(c, `${dib('flor', 32, 50, 11)}${dib('fulla', 32, 86, 11)}<g opacity=".8">${(window.XFitxa ? XFitxa.dibuix('flor', 11) : '').replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="#5E544B"').replace(/stroke="#[0-9A-Fa-f]{3,6}"/g, 'stroke="#5E544B"').replace(/^/, '<g transform="translate(70 86)">') + '</g>'}</g><path d="M42 54 Q56 70 62 80" stroke="${C.terra}" stroke-width="1.4" fill="none" stroke-dasharray="2 2"/>`);
      case 'puzzle': {
        const k = j.costat || 2, m = 70 / k;
        return fons(c, `<g transform="translate(15 26)">${Array.from({ length: k * k }, (_, i) => { const x = (i % k) * m, y = Math.floor(i / k) * m, fora = i === k * k - 1;
          return `<g transform="translate(${x + (fora ? 6 : 0)} ${y + (fora ? 8 : 0)})${fora ? ' rotate(8)' : ''}"><rect width="${m - 1.5}" height="${m - 1.5}" rx="2" fill="#fff"/><svg width="${m - 1.5}" height="${m - 1.5}" viewBox="${-35 + (i % k) * m} ${-35 + Math.floor(i / k) * m} ${m} ${m}">${window.XFitxa ? XFitxa.dibuix(j.element || 'poma', 22) : ''}</svg></g>`; }).join('')}</g>`);
      }
      case 'classifica': {
        const gr = (j.grups || ['fulla', 'pedra']).slice(0, 3), w = 80 / gr.length;
        return fons(c, gr.map((n, i) => `${g(10 + w * i + w / 2, 90, 0.75, D.cistell())}${dib(n, 10 + w * i + w / 2, 76, 6)}${dib(n, 10 + w * i + w / 2 + 6, 46 + (i % 2) * 8, 6)}`).join(''));
      }
    }
    return null;
  }

  function portada(r, area) {
    try {
      if (r.tipus === 'joc') return joc(r, area);
      if (r.tipus === 'fitxa') return fitxa(r, area);
      const esc = ESCENES[r.id] || escenaPerParaules(r);
      return esc ? fons(area.color, posa(esc)) : null;
    } catch (e) { console.warn('il·lustració', r.id, e); return null; }
  }
  window.XIL = { portada, dibuixos: D };
})();
