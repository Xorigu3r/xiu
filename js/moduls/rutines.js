// XIU · Rutines visuals: el matí, anar a dormir, rentar-se les mans, anar a l'escola i recollir; o una de pròpia.
// A la pantalla, l'infant toca cada pas quan l'ha fet (es reinicia cada dia); també es poden imprimir per penjar a la nevera.
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I } = A, t = (k) => A.t(k);
  const C = { tinta: '#38332E', marro: '#786654', fusta: '#C8A47E', terra: '#C9785B', verd: '#8FA68A', blau: '#8EA2B4', ocre: '#D1A35A', rosa: '#D29A92', groc: '#E9C46A', aigua: '#A9C6D6', blanc: '#FFFDF9', pell: '#E8C4A8', sorra: '#E9E3DA' };
  // dibuixos dels passos (centrats a 0,0, uns 40×40)
  const IC = {
    sol: `<circle r="9" fill="${C.groc}"/>${[...Array(8).keys()].map((i) => { const a = (i * Math.PI) / 4; return `<path d="M${(Math.cos(a) * 12).toFixed(1)} ${(Math.sin(a) * 12).toFixed(1)}L${(Math.cos(a) * 17).toFixed(1)} ${(Math.sin(a) * 17).toFixed(1)}" stroke="${C.ocre}" stroke-width="2.5" stroke-linecap="round"/>`; }).join('')}`,
    llit: `<rect x="-18" y="0" width="36" height="9" rx="2" fill="${C.blau}"/><rect x="-18" y="-10" width="4" height="22" rx="1.5" fill="${C.fusta}"/><rect x="14" y="-4" width="4" height="16" rx="1.5" fill="${C.fusta}"/><ellipse cx="-8" cy="-3" rx="6" ry="3.5" fill="${C.blanc}"/><path d="M-4 -2h18v3h-18z" fill="${C.rosa}"/>`,
    wc: `<rect x="-10" y="-16" width="14" height="10" rx="2" fill="${C.blanc}" stroke="${C.sorra}"/><path d="M-12 -4h22a11 11 0 0 1-11 11h-2a9 9 0 0 1-9-11z" fill="${C.blanc}" stroke="${C.sorra}"/><rect x="-5" y="6" width="8" height="9" fill="${C.blanc}" stroke="${C.sorra}"/>`,
    mans: `<path d="M-14 10v-10l-4 -5a2 2 0 0 1 3 -2l3 3v-9a2 2 0 0 1 4 0v8v-10a2 2 0 0 1 4 0v10v-8a2 2 0 0 1 4 0v9v-5a2 2 0 0 1 4 0v10c0 6-4 9-8 9h-2c-4 0-8-2-8-6z" fill="${C.pell}" transform="translate(4 2)"/>${[[-14, -14], [12, -12], [16, 2]].map(([x, y]) => `<path d="M${x} ${y}q-3 4 0 6q3 -2 0 -6z" fill="${C.aigua}"/>`).join('')}`,
    sabo: `<rect x="-12" y="-4" width="24" height="14" rx="5" fill="${C.rosa}"/>${[[-6, -10, 4], [3, -13, 3], [9, -8, 2.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.blanc}" stroke="${C.aigua}"/>`).join('')}`,
    aixeta: `<path d="M-14 -10h16v6h-10v8h-6z" fill="#B8B0A4"/><rect x="-4" y="-16" width="8" height="5" rx="2" fill="${C.blau}"/>${[0, 6, 12].map((y) => `<path d="M-11 ${4 + y}q-2 3 0 4q2 -1 0 -4z" fill="${C.aigua}"/>`).join('')}`,
    tovallola: `<rect x="-14" y="-12" width="28" height="26" rx="3" fill="${C.verd}"/><path d="M-14 6h28" stroke="${C.blanc}" stroke-width="2"/><rect x="-16" y="-15" width="32" height="5" rx="2" fill="${C.fusta}"/>`,
    cara: `<circle r="13" fill="${C.pell}"/><circle cx="-4.5" cy="-2" r="1.6" fill="${C.tinta}"/><circle cx="4.5" cy="-2" r="1.6" fill="${C.tinta}"/><path d="M-5 5q5 4 10 0" stroke="${C.tinta}" stroke-width="1.6" fill="none" stroke-linecap="round"/>${[[-16, -8], [16, -6]].map(([x, y]) => `<path d="M${x} ${y}q-3 4 0 6q3 -2 0 -6z" fill="${C.aigua}"/>`).join('')}`,
    dents: `<g transform="rotate(-35)"><rect x="-2" y="-4" width="4" height="24" rx="2" fill="${C.blau}"/><rect x="-3.5" y="-16" width="7" height="12" rx="2" fill="${C.blanc}" stroke="${C.sorra}"/><path d="M-3 -14h6M-3 -11h6M-3 -8h6" stroke="${C.aigua}" stroke-width="1.2"/></g>`,
    roba: `<path d="M-6 -12l-12 6 4 8 5-3v17h18v-17l5 3 4-8-12-6q-6 5 -12 0z" fill="${C.blau}"/>`,
    pinta: `<rect x="-16" y="-6" width="32" height="7" rx="3" fill="${C.ocre}"/>${[...Array(8).keys()].map((i) => `<rect x="${-14 + i * 4}" y="1" width="2" height="9" rx="1" fill="${C.ocre}"/>`).join('')}`,
    esmorzar: `<path d="M-16 -2h32a16 14 0 0 1-32 0z" fill="${C.terra}"/><ellipse cy="-2" rx="16" ry="4" fill="${C.blanc}"/>${[[-5, -3], [2, -4], [7, -2]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="${C.ocre}"/>`).join('')}<g transform="translate(12 -10) rotate(-40)"><ellipse cy="-5" rx="3.5" ry="5" fill="#B8B0A4"/><rect x="-1" y="0" width="2" height="12" rx="1" fill="#B8B0A4"/></g>`,
    sabates: `<path d="M-18 6v-8q4 0 6 -4h6q1 6 12 8a4 4 0 0 1 4 4z" fill="${C.terra}"/><path d="M-18 6h28" stroke="${C.tinta}" stroke-width="2"/><path d="M-10 -4l4 2M-8 -6l4 2" stroke="${C.blanc}" stroke-width="1.2"/>`,
    motxilla: `<rect x="-12" y="-12" width="24" height="28" rx="6" fill="${C.verd}"/><rect x="-8" y="2" width="16" height="9" rx="3" fill="#7E9A78"/><path d="M-6 -12q6 -8 12 0" stroke="${C.marro}" stroke-width="2" fill="none"/>`,
    abric: `<path d="M-8 -14l-10 6v22h8v-14l2 18h16l2-18v14h8v-22l-10-6q-8 6 -16 0z" fill="${C.ocre}"/><path d="M0 -8v22" stroke="${C.marro}" stroke-width="1.2"/>${[-2, 4, 10].map((y) => `<circle cx="2.5" cy="${y}" r="1.2" fill="${C.marro}"/>`).join('')}`,
    escola: `<path d="M-18 -2l18 -14 18 14z" fill="${C.terra}"/><rect x="-14" y="-2" width="28" height="18" fill="${C.blanc}" stroke="${C.sorra}"/><rect x="-4" y="6" width="8" height="10" fill="${C.fusta}"/><rect x="-11" y="2" width="5" height="5" fill="${C.aigua}"/><rect x="6" y="2" width="5" height="5" fill="${C.aigua}"/>`,
    cor: `<path d="M0 12 C-18 0 -12 -14 0 -6 C12 -14 18 0 0 12z" fill="${C.terra}"/>`,
    sopar: `<circle r="15" fill="${C.blanc}" stroke="${C.sorra}" stroke-width="1.5"/><circle r="10" fill="none" stroke="${C.sorra}"/><circle cx="-3" cy="-2" r="3" fill="${C.verd}"/><circle cx="3" cy="2" r="3" fill="${C.ocre}"/><path d="M-20 -10v20M20 -10v20" stroke="#B8B0A4" stroke-width="2" stroke-linecap="round"/>`,
    banyera: `<path d="M-18 -2h36v6a10 10 0 0 1-10 10h-16a10 10 0 0 1-10-10z" fill="${C.blanc}" stroke="${C.sorra}"/>${[[-8, -6, 4], [0, -9, 5], [8, -6, 3.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.blanc}" stroke="${C.aigua}"/>`).join('')}<path d="M-14 14v3M14 14v3" stroke="${C.marro}" stroke-width="2"/>`,
    pijama: `<path d="M-6 -12l-12 6 4 8 5-3v17h18v-17l5 3 4-8-12-6q-6 5 -12 0z" fill="${C.rosa}"/><path d="M-2 0l2 -3 2 3-2 3z" fill="${C.groc}"/>`,
    conte: `<path d="M0 -10q-9 -5 -18 -2v22q9 -3 18 2q9 -5 18 -2v-22q-9 -3 -18 2z" fill="${C.blanc}" stroke="${C.terra}" stroke-width="1.5"/><path d="M0 -10v22" stroke="${C.terra}" stroke-width="1.5"/>`,
    lluna: `<path d="M6 -14a14 14 0 1 0 8 22a11 11 0 1 1 -8 -22z" fill="${C.groc}"/>${[[-14, -12], [14, -14], [16, 4]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="${C.ocre}"/>`).join('')}`,
    joguines: `<rect x="-16" y="-2" width="32" height="16" rx="2" fill="${C.fusta}"/><circle cx="-6" cy="-6" r="6" fill="${C.terra}"/><rect x="2" y="-12" width="10" height="10" rx="2" fill="${C.blau}"/>`,
    aigua: `<path d="M-9 -14h18l-3 28h-12z" fill="${C.aigua}" opacity=".7" stroke="${C.blau}"/><path d="M-8 -4h16" stroke="${C.blau}"/>`,
    jugar: `<circle r="12" fill="${C.terra}"/><path d="M-12 0q12 -8 24 0M-8 -9q8 18 0 18" stroke="#fff" stroke-width="1.8" fill="none" opacity=".8"/>`,
  };
  const PAS = {
    llevar: ['sol', 'Em llevo', 'Me levanto'], lavabo: ['wc', 'Vaig al lavabo', 'Voy al baño'], cara: ['cara', 'Em rento la cara', 'Me lavo la cara'],
    vestir: ['roba', 'Em vesteixo', 'Me visto'], pentinar: ['pinta', "Em pentino", 'Me peino'], esmorzar: ['esmorzar', 'Esmorzo', 'Desayuno'],
    dents: ['dents', 'Em rento les dents', 'Me lavo los dientes'], sabates: ['sabates', 'Em poso les sabates', 'Me pongo los zapatos'], motxilla: ['motxilla', 'Agafo la motxilla', 'Cojo la mochila'],
    abric: ['abric', "Em poso l'abric", 'Me pongo el abrigo'], adeu: ['cor', 'Fem un petó i adéu!', '¡Un beso y adiós!'], escola: ['escola', "Anem a l'escola", 'Vamos a la escuela'],
    sopar: ['sopar', 'Sopo', 'Ceno'], banyera: ['banyera', 'Em banyo', 'Me baño'], pijama: ['pijama', 'Em poso el pijama', 'Me pongo el pijama'],
    conte: ['conte', 'Llegim un conte', 'Leemos un cuento'], dormir: ['lluna', 'Bona nit!', '¡Buenas noches!'], llit: ['llit', "M'estiro al llit", 'Me acuesto'],
    aixeta: ['aixeta', "Obro l'aixeta", 'Abro el grifo'], sabo: ['sabo', 'Em poso sabó', 'Me pongo jabón'], frega: ['mans', 'Em frego bé les mans', 'Me froto bien las manos'],
    esbandeix: ['aigua', "Me les esbandeixo amb aigua", 'Me las aclaro con agua'], eixuga: ['tovallola', 'Me les eixugo', 'Me las seco'],
    joguines: ['joguines', 'Deso les joguines', 'Guardo los juguetes'], llibres: ['conte', 'Poso els llibres al seu lloc', 'Pongo los libros en su sitio'], roba2: ['roba', 'Deixo la roba al calaix', 'Dejo la ropa en el cajón'],
    jugar: ['jugar', 'A jugar!', '¡A jugar!'], beure: ['aigua', "Bec aigua", 'Bebo agua'],
  };
  const BASE = {
    mati: { ca: 'El matí', es: 'La mañana', icona: 'sol', passos: ['llevar', 'lavabo', 'cara', 'vestir', 'esmorzar', 'dents', 'pentinar', 'sabates'] },
    nit: { ca: 'Anar a dormir', es: 'Ir a dormir', icona: 'lluna', passos: ['sopar', 'banyera', 'pijama', 'dents', 'conte', 'dormir'] },
    mans: { ca: 'Rentar-se les mans', es: 'Lavarse las manos', icona: 'mans', passos: ['aixeta', 'sabo', 'frega', 'esbandeix', 'eixuga'] },
    escola: { ca: "Anar a l'escola", es: 'Ir a la escuela', icona: 'escola', passos: ['abric', 'sabates', 'motxilla', 'adeu', 'escola'] },
    recollir: { ca: 'Recollim', es: 'Recogemos', icona: 'joguines', passos: ['joguines', 'llibres', 'roba2', 'jugar'] },
  };
  A.textos({
    ca: { rutines: 'Rutines', rutinesS: 'Pas a pas, amb dibuixos', rutinesP: 'Toca cada pas quan l\'hagis fet. Cada dia torna a començar. També la pots imprimir i penjar a la nevera.',
      rutinesB: 'El matí, anar a dormir, rentar-se les mans...', laMeva: 'La meva rutina', personalitza: 'Canvia els passos', afegeixPas: 'Afegeix un pas', fet2: 'Fet!', torna: 'Torna a començar',
      rutinaFeta: 'Molt bé! Ho has fet tot!', nomRutina: 'Nom de la rutina', imprimeixR: 'Imprimeix-la', fetPersonal: 'Fet', novaRutina: '+ Una rutina nova', esborraR: 'Esborra la rutina', pujar: 'Puja', baixar: 'Baixa' },
    es: { rutines: 'Rutinas', rutinesS: 'Paso a paso, con dibujos', rutinesP: 'Toca cada paso cuando lo hayas hecho. Cada día vuelve a empezar. También la puedes imprimir y colgar en la nevera.',
      rutinesB: 'La mañana, ir a dormir, lavarse las manos...', laMeva: 'Mi rutina', personalitza: 'Cambiar los pasos', afegeixPas: 'Añadir un paso', fet2: '¡Hecho!', torna: 'Volver a empezar',
      rutinaFeta: '¡Muy bien! ¡Lo has hecho todo!', nomRutina: 'Nombre de la rutina', imprimeixR: 'Imprimirla', fetPersonal: 'Hecho', novaRutina: '+ Una rutina nueva', esborraR: 'Borrar la rutina', pujar: 'Subir', baixar: 'Bajar' },
  });
  let propies = A.ls.get('rutines', {}), fets = A.ls.get('rutines-fet', {}), edita = null;
  const avui = () => new Date().toDateString();
  const rutina = (id) => propies[id] || BASE[id];
  const totes = () => ({ ...BASE, ...propies });
  const nomR = (r) => r[A.lang] || r.ca;
  const fetsDe = (id) => (fets[id] && fets[id].d === avui() ? fets[id].p : []);
  const desa = () => { A.ls.set('rutines', propies); A.ls.set('rutines-fet', fets); };
  const svg = (k, cls = '') => `<svg viewBox="-22 -22 44 44" class="${cls}">${IC[k] || ''}</svg>`;
  const nomPas = (k) => (PAS[k] ? PAS[k][A.lang === 'es' ? 2 : 1] : k);

  A.vista('rutines', () => `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
    <section class="pageH"><h1>${t('rutines')}</h1><div class="scr">${t('rutinesS')}</div><p>${t('rutinesP')}</p></section>
    <div class="rutinesG">${Object.entries(totes()).map(([id, r]) => { const f = fetsDe(id).length, n = r.passos.length;
      return `<button class="rutC" data-go="#/rutina/${id}">${svg(r.icona)}<b>${esc(nomR(r))}</b><small>${f ? `${f}/${n}` : `${n} ${A.lang === 'es' ? 'pasos' : 'passos'}`}</small></button>`; }).join('')}
      <button class="rutC nova" data-rut-nova>${svg('cor')}<b>${t('novaRutina')}</b></button></div>`);
  A.vista('rutina', ([id]) => {
    const r = rutina(id); if (!r) return '';
    const f = fetsDe(id), tot = f.length === r.passos.length;
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH"><h1>${esc(nomR(r))}</h1><div class="scr">${t('rutinesS')}</div></section>
      <div class="actions"><button class="btn" data-rut-edita="${id}">${t('personalitza')}</button><button class="btn" data-rut-pdf="${id}">${I.print}${t('imprimeixR')}</button>${f.length ? `<button class="btn" data-rut-reset="${id}">${t('torna')}</button>` : ''}</div>
      ${edita === id ? editor(id, r) : ''}
      <div class="rutina ${tot ? 'feta' : ''}">${r.passos.map((k, i) => `<button class="pasR ${f.includes(i) ? 'on' : ''}" data-rut-pas="${id}:${i}"><span class="num">${i + 1}</span>${svg(PAS[k]?.[0] || 'cor')}<b>${esc(nomPas(k))}</b><i>${I.ok}</i></button>`).join('')}</div>
      ${tot ? `<div class="rutFeta">${t('rutinaFeta')}</div>` : ''}`;
  });
  function editor(id, r) {
    return `<div class="caixa rutEd"><label class="lblF">${t('nomRutina')}</label><input class="rutNom" data-rut-nom="${id}" value="${esc(nomR(r))}">
      <div class="rutLlista">${r.passos.map((k, i) => `<div class="rutFila">${svg(PAS[k]?.[0])}<span>${esc(nomPas(k))}</span><button class="mini" data-rut-mou="${id}:${i}:-1" title="${t('pujar')}">↑</button><button class="mini" data-rut-mou="${id}:${i}:1" title="${t('baixar')}">↓</button><button class="mini" data-rut-treu="${id}:${i}">×</button></div>`).join('')}</div>
      <div class="lblF" style="margin-top:12px">${t('afegeixPas')}</div><div class="rutAfeg">${Object.keys(PAS).map((k) => `<button data-rut-afeg="${id}:${k}">${svg(PAS[k][0])}<span>${esc(nomPas(k))}</span></button>`).join('')}</div>
      <div class="actions">${propies[id] && !BASE[id] ? `<button class="btn mal" data-rut-esb="${id}">${t('esborraR')}</button>` : ''}<span style="flex:1"></span><button class="btn pri" data-rut-edita="${id}">${t('fetPersonal')}</button></div></div>`;
  }
  const propia = (id) => (propies[id] ||= JSON.parse(JSON.stringify(BASE[id])));
  async function pdf(id) {
    const r = rutina(id), doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape', compress: true });
    doc.setFillColor(244, 240, 232); doc.rect(0, 0, 297, 210, 'F');
    doc.setFont('times', 'bold'); doc.setFontSize(26); doc.setTextColor(56, 51, 46); doc.text(nomR(r).toUpperCase(), 148.5, 20, { align: 'center' });
    const n = r.passos.length, cols = n > 5 ? Math.ceil(n / 2) : n, files = Math.ceil(n / cols), w = (297 - 24 - (cols - 1) * 6) / cols, h = files === 1 ? 150 : 82;
    for (const [i, k] of r.passos.entries()) {
      const c = i % cols, f = Math.floor(i / cols), x = 12 + c * (w + 6), y = 30 + f * (h + 6);
      doc.setFillColor(255, 253, 249); doc.setDrawColor(221, 208, 193); doc.roundedRect(x, y, w, h, 5, 5, 'FD');
      const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-22 -22 44 44" width="400" height="400">${IC[PAS[k]?.[0]] || ''}</svg>`);
      await im.decode().catch(() => null);
      const cv = document.createElement('canvas'); cv.width = 400; cv.height = 400; const ctx = cv.getContext('2d'); ctx.fillStyle = '#FFFDF9'; ctx.fillRect(0, 0, 400, 400); ctx.drawImage(im, 0, 0, 400, 400);
      const m = Math.min(w - 14, h - 30); doc.addImage(cv.toDataURL('image/jpeg', 0.9), 'JPEG', x + (w - m) / 2, y + 8, m, m);
      doc.setFillColor(56, 51, 46); doc.circle(x + 8, y + 8, 4.5, 'F'); doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.text(String(i + 1), x + 8, y + 11.5, { align: 'center' });
      doc.setTextColor(56, 51, 46); doc.setFont('helvetica', 'normal'); doc.setFontSize(files === 1 ? 15 : 12); doc.text(doc.splitTextToSize(nomPas(k), w - 8), x + w / 2, y + m + 16, { align: 'center' });
      doc.setDrawColor(167, 148, 128); doc.roundedRect(x + w - 11, y + h - 11, 7, 7, 1.5, 1.5);
    }
    const msg = await XP.desaPdf(new Uint8Array(doc.output('arraybuffer')), `XIU - ${t('rutines')} - ${nomR(r)}.pdf`, { desat: t('desat') }); if (msg) A.avis(msg);
  }
  A.HOOKS.inici.push(() => (A.perfil?.tipus === 'pro' ? '' : `<button class="premB rutB" data-go="#/rutines">${svg('sol')}<span><b>${t('rutines')}</b>${t('rutinesB')}</span>${I.back}</button>`));
  A.HOOKS.perfil.push(() => `<div class="llistaMes" style="margin-top:8px"><button data-go="#/rutines">${I.rellotge}<span>${t('rutines')}</span>${I.back}</button></div>`);
  document.addEventListener('input', (e) => { const id = e.target.dataset.rutNom; if (id) { const r = propia(id); r.ca = r.es = e.target.value; desa(); } });
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-rut-pas],[data-rut-reset],[data-rut-edita],[data-rut-pdf],[data-rut-mou],[data-rut-treu],[data-rut-afeg],[data-rut-nova],[data-rut-esb]'); if (!el) return;
    const d = el.dataset;
    if (d.rutPas) {
      const [id, i] = d.rutPas.split(':'), f = fetsDe(id), n = +i;
      fets[id] = { d: avui(), p: f.includes(n) ? f.filter((x) => x !== n) : [...f, n] }; desa();
      if (!f.includes(n) && fets[id].p.length === rutina(id).passos.length) dispatchEvent(new CustomEvent('xiu-rutina-feta', { detail: { id } }));
      return A.render(true);
    }
    if (d.rutReset) { delete fets[d.rutReset]; desa(); return A.render(true); }
    if (d.rutEdita) { edita = edita === d.rutEdita ? null : d.rutEdita; return A.render(true); }
    if (d.rutPdf) return pdf(d.rutPdf).catch(() => A.avis(t('errPdf')));
    if (d.rutMou) { const [id, i, dd] = d.rutMou.split(':'), r = propia(id), a = +i, b = a + +dd; if (b >= 0 && b < r.passos.length) [r.passos[a], r.passos[b]] = [r.passos[b], r.passos[a]]; delete fets[id]; desa(); return A.render(true); }
    if (d.rutTreu) { const [id, i] = d.rutTreu.split(':'), r = propia(id); if (r.passos.length > 1) r.passos.splice(+i, 1); delete fets[id]; desa(); return A.render(true); }
    if (d.rutAfeg) { const [id, k] = d.rutAfeg.split(':'); propia(id).passos.push(k); delete fets[id]; desa(); return A.render(true); }
    if (d.rutNova != null) { const id = 'r' + Date.now().toString(36); propies[id] = { ca: t('laMeva'), es: t('laMeva'), icona: 'cor', passos: ['llevar', 'jugar'] }; edita = id; desa(); return A.go('#/rutina/' + id); }
    if (d.rutEsb) { delete propies[d.rutEsb]; delete fets[d.rutEsb]; edita = null; desa(); return A.go('#/rutines'); }
  });
});
