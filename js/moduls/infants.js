// XIU · Els infants (famílies) o la classe (docents): progrés, «Ho hem fet» (amb nota i foto), estrelles i diplomes.
// Tot es desa només en aquest aparell (localStorage): infants, infant-actiu, fets.
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I, ls } = A, t = (k) => A.t(k);
  const COLORS = ['#C9785B', '#8FA68A', '#8EA2B4', '#D1A35A', '#D29A92', '#9D9B60'];
  const uid = () => Math.random().toString(36).slice(2, 9);
  let infants = ls.get('infants', []), actiu = ls.get('infant-actiu', null), fets = ls.get('fets', []);
  const desa = () => { ls.set('infants', infants); ls.set('infant-actiu', actiu); try { localStorage.setItem('xiu-fets', JSON.stringify(fets)); } catch { A.avis(t('pleMemoria')); } };
  const docent = () => A.perfil && A.perfil.tipus === 'pro';
  const infant = (id) => infants.find((x) => x.id === id);
  const deInfant = (id) => fets.filter((f) => f.i === id);
  const estrelles = (id) => deInfant(id).length;
  const fetPer = (r, id) => fets.some((f) => f.r === r && (id == null || f.i === id));
  const avatar = (x, cls = '') => `<span class="avatar ${cls}" style="background:${x.color}">${esc(x.nom.trim().charAt(0).toUpperCase())}</span>`;
  const estrella = '<svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/></svg>';
  A.textos({
    ca: {
      elsInfants: 'Els meus infants', laClasse: 'La meva classe', infantsP: 'Afegeix-los per guardar què heu fet, guanyar estrelles i diplomes. Es desa només en aquest aparell.',
      classeP: "Afegeix-hi els infants (només el nom) per guardar què ha fet cadascú i apuntar-hi observacions. Es desa només en aquest aparell.",
      afegeixInfant: 'Afegeix un infant', nouInfant: 'Infant nou', editaInfant: 'Canvia les dades', nomInfant: 'Nom', edatInfant: 'Edat', colorInfant: 'Color',
      desaB: 'Desa', cancelaB: 'Cancel·la', esborraInfant: 'Esborra', esborraInfantQ: 'Vols esborrar {n} i tot el seu progrés?',
      quiJuga: 'Qui juga avui?', estrellesN: (n) => n + (n == 1 ? ' estrella' : ' estrelles'), progres: 'Progrés', veureProgres: 'Veure el progrés',
      hoHemFet: 'Ho hem fet', fetEl: 'Fet el {d}', quiHoHaFet: 'Qui ho ha fet?', tots: 'Tothom', nota: 'Una nota (opcional)', notaP: 'Com ha anat? Què li ha agradat?',
      foto: 'Una foto (opcional)', triaFoto: 'Fes o tria una foto', fetDesat: 'Apuntat! Una estrella per a {n}.', fetDesatN: 'Apuntat per a {n} infants.',
      molbeSense: "Molt bé! Afegeix els infants al teu perfil i guardaràs el progrés i les estrelles.", molbeAmb: 'Molt bé, {n}! Una estrella més.',
      historial: 'Què hem fet', resPerArea: 'Per àrees', colleccions: 'Col·leccions', diplomes: 'Diplomes', diploma: 'Diploma',
      diplomaEstr: 'per haver aconseguit {n} estrelles', diplomaColl: 'per haver completat la col·lecció «{c}»', diplomaPer: 'atorgat a', perQue: 'Molt bé!',
      faltenEstr: 'Falten {n} estrelles', esborraFet: 'Esborra', capFet: 'Encara no hi ha res apuntat. Quan acabeu una fitxa o un joc, o premeu «Ho hem fet», sortirà aquí.',
      pleMemoria: "No hi ha prou espai a l'aparell per desar-ho (prova sense foto).", observacions: 'Observacions', anys2: 'anys',
    },
    es: {
      elsInfants: 'Mis niños y niñas', laClasse: 'Mi clase', infantsP: 'Añádelos para guardar lo que habéis hecho, ganar estrellas y diplomas. Se guarda solo en este dispositivo.',
      classeP: 'Añade a los niños y niñas (solo el nombre) para guardar lo que ha hecho cada uno y anotar observaciones. Se guarda solo en este dispositivo.',
      afegeixInfant: 'Añadir un niño o niña', nouInfant: 'Nuevo', editaInfant: 'Cambiar los datos', nomInfant: 'Nombre', edatInfant: 'Edad', colorInfant: 'Color',
      desaB: 'Guardar', cancelaB: 'Cancelar', esborraInfant: 'Borrar', esborraInfantQ: '¿Quieres borrar a {n} y todo su progreso?',
      quiJuga: '¿Quién juega hoy?', estrellesN: (n) => n + (n == 1 ? ' estrella' : ' estrellas'), progres: 'Progreso', veureProgres: 'Ver el progreso',
      hoHemFet: 'Lo hemos hecho', fetEl: 'Hecho el {d}', quiHoHaFet: '¿Quién lo ha hecho?', tots: 'Todos', nota: 'Una nota (opcional)', notaP: '¿Cómo ha ido? ¿Qué le ha gustado?',
      foto: 'Una foto (opcional)', triaFoto: 'Haz o elige una foto', fetDesat: '¡Apuntado! Una estrella para {n}.', fetDesatN: 'Apuntado para {n} niños y niñas.',
      molbeSense: '¡Muy bien! Añade a los niños y niñas en tu perfil y guardarás el progreso y las estrellas.', molbeAmb: '¡Muy bien, {n}! Una estrella más.',
      historial: 'Lo que hemos hecho', resPerArea: 'Por áreas', colleccions: 'Colecciones', diplomes: 'Diplomas', diploma: 'Diploma',
      diplomaEstr: 'por haber conseguido {n} estrellas', diplomaColl: 'por haber completado la colección «{c}»', diplomaPer: 'otorgado a', perQue: '¡Muy bien!',
      faltenEstr: 'Faltan {n} estrellas', esborraFet: 'Borrar', capFet: 'Todavía no hay nada anotado. Cuando acabéis una ficha o un juego, o pulséis «Lo hemos hecho», saldrá aquí.',
      pleMemoria: 'No hay espacio suficiente en el dispositivo para guardarlo (prueba sin foto).', observacions: 'Observaciones', anys2: 'años',
    },
  });

  /* ---------- formulari d'un infant ---------- */
  function formInfant(x) {
    const m = A.modal(`<h2>${x ? t('editaInfant') : t('nouInfant')}</h2><form data-form="infant" class="formC" style="text-align:left" novalidate>
      <label>${t('nomInfant')}<input name="nom" value="${esc(x ? x.nom : '')}" autocomplete="off" maxlength="30"></label>
      <label>${t('edatInfant')}<select name="edat">${A.EDATS.map((e) => `<option value="${e}" ${(x ? x.edat : (A.perfil?.edats || [])[0]) === e ? 'selected' : ''}>${e} ${t('anys2')}</option>`).join('')}</select></label>
      <div class="lblF">${t('colorInfant')}</div><div class="colorsInf">${COLORS.map((c, i) => `<label><input type="radio" name="color" value="${c}" ${(x ? x.color === c : i === infants.length % COLORS.length) ? 'checked' : ''}><span style="background:${c}"></span></label>`).join('')}</div>
      <div class="err"></div>
      <div class="actions">${x ? `<button type="button" class="btn mal" data-inf-esb="${x.id}">${t('esborraInfant')}</button>` : ''}<span style="flex:1"></span><button type="button" class="btn" data-tanca>${t('cancelaB')}</button><button class="btn pri" type="submit">${t('desaB')}</button></div></form>`);
    m.querySelector('[name=nom]').focus();
    m.onclick = (e) => {
      if (e.target === m || e.target.closest('[data-tanca]')) m.remove();
      const b = e.target.closest('[data-inf-esb]');
      if (b && confirm(t('esborraInfantQ').replace('{n}', x.nom))) { infants = infants.filter((q) => q.id !== x.id); fets = fets.filter((f) => f.i !== x.id); if (actiu === x.id) actiu = infants[0]?.id || null; desa(); m.remove(); A.go('#/perfil'); A.render(true); }
    };
    m.querySelector('form').onsubmit = (e) => {
      e.preventDefault();
      const v = Object.fromEntries(new FormData(e.target));
      if (!(v.nom || '').trim()) { e.target.querySelector('.err').textContent = t('errNom'); return; }
      if (x) Object.assign(x, { nom: v.nom.trim(), edat: v.edat, color: v.color });
      else { const n = { id: uid(), nom: v.nom.trim(), edat: v.edat, color: v.color || COLORS[0] }; infants.push(n); if (!actiu) actiu = n.id; }
      desa(); m.remove(); A.render(true);
    };
  }

  /* ---------- «Ho hem fet» ---------- */
  async function reduirFoto(file) {
    const url = URL.createObjectURL(file);
    try {
      const im = new Image(); im.src = url; await im.decode();
      const e = Math.min(1, 560 / Math.max(im.naturalWidth, im.naturalHeight));
      const cv = document.createElement('canvas'); cv.width = Math.round(im.naturalWidth * e); cv.height = Math.round(im.naturalHeight * e);
      cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
      return cv.toDataURL('image/jpeg', 0.7);
    } finally { URL.revokeObjectURL(url); }
  }
  function hoHemFet(r) {
    let foto = null;
    const tria = docent() ? infants.map((x) => x.id) : actiu ? [actiu] : infants.slice(0, 1).map((x) => x.id);
    const m = A.modal(`<h2>${t('hoHemFet')}</h2><p>${esc(A.L(r.titol))}</p><form data-form="hofet" class="formC" style="text-align:left;margin-top:14px" novalidate>
      ${infants.length ? `<div class="lblF">${t('quiHoHaFet')}</div><div class="chips infTria">${docent() && infants.length > 1 ? `<button type="button" class="chip" data-totsinf>${t('tots')}</button>` : ''}${infants.map((x) => `<label class="chip ${tria.includes(x.id) ? 'on' : ''}"><input type="checkbox" name="inf" value="${x.id}" ${tria.includes(x.id) ? 'checked' : ''}>${avatar(x, 'petit')}${esc(x.nom)}</label>`).join('')}</div>` : `<p class="sub2">${t('molbeSense')}</p>`}
      <label>${t('nota')}<textarea name="nota" rows="3" placeholder="${t('notaP')}"></textarea></label>
      <label class="btn fotoB">${I.dl.replace('M12 4v11M7 10l5 5 5-5M5 20h14', 'M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7')}<span>${t('triaFoto')}</span><input type="file" name="foto" accept="image/*" hidden></label><img class="fotoPrev" hidden alt="">
      <div class="err"></div><div class="actions"><span style="flex:1"></span><button type="button" class="btn" data-tanca>${t('cancelaB')}</button><button class="btn pri" type="submit">${t('desaB')}</button></div></form>`);
    const f = m.querySelector('form');
    m.onclick = (e) => {
      if (e.target === m || e.target.closest('[data-tanca]')) m.remove();
      if (e.target.closest('[data-totsinf]')) f.querySelectorAll('[name=inf]').forEach((c) => { c.checked = true; c.parentElement.classList.add('on'); });
    };
    f.addEventListener('change', async (e) => {
      if (e.target.name === 'inf') e.target.parentElement.classList.toggle('on', e.target.checked);
      if (e.target.name === 'foto' && e.target.files[0]) { foto = await reduirFoto(e.target.files[0]); const p = f.querySelector('.fotoPrev'); p.src = foto; p.hidden = false; }
    });
    f.onsubmit = (e) => {
      e.preventDefault();
      const quins = [...f.querySelectorAll('[name=inf]:checked')].map((c) => c.value), nota = f.nota.value.trim(), d = new Date().toISOString();
      for (const i of quins.length ? quins : [null]) fets.unshift({ r: r.id, i, d, nota, foto });
      desa(); m.remove();
      A.avis(quins.length === 1 ? t('fetDesat').replace('{n}', infant(quins[0]).nom) : quins.length ? t('fetDesatN').replace('{n}', quins.length) : t('perQue'));
      A.render(true);
    };
  }
  // fitxa acabada a la pantalla, o joc acabat → una estrella per a l'infant que juga
  function feta(id) {
    const x = infant(actiu);
    if (!x) { A.avis(t('molbeSense')); return; }
    const avui = new Date().toDateString();
    if (!fets.some((f) => f.r === id && f.i === x.id && new Date(f.d).toDateString() === avui)) { fets.unshift({ r: id, i: x.id, d: new Date().toISOString(), nota: '', foto: null, auto: true }); desa(); }
    A.avis(t('molbeAmb').replace('{n}', x.nom));
  }
  document.addEventListener('xiu-fitxa-feta', () => { const m = A.ruta.match(/^#\/r\/(.+)$/); if (m) feta(m[1]); });
  addEventListener('xiu-joc-fet', (e) => feta(e.detail.id));

  /* ---------- diplomes (PDF) ---------- */
  function diploma(x, motiu) {
    const { jsPDF } = window.jspdf, d = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
    const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    d.setFillColor(244, 240, 232); d.rect(0, 0, 297, 210, 'F');
    d.setDrawColor(...hex(x.color)); d.setLineWidth(2.2); d.roundedRect(12, 12, 273, 186, 6, 6);
    d.setLineWidth(0.5); d.roundedRect(17, 17, 263, 176, 4, 4);
    const est = (cx, cy, r) => { const ps = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; ps.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
      d.setFillColor(209, 163, 90); d.lines(ps.slice(1).map((p, i) => [p[0] - ps[i][0], p[1] - ps[i][1]]), ps[0][0], ps[0][1], [1, 1], 'F', true); };
    [[60, 52, 7], [237, 52, 7], [148.5, 40, 9], [40, 160, 5], [257, 160, 5]].forEach((s) => est(...s));
    d.setTextColor(56, 51, 46); d.setFont('times', 'bold'); d.setFontSize(46); d.text(t('diploma').toUpperCase(), 148.5, 78, { align: 'center' });
    d.setFont('helvetica', 'normal'); d.setFontSize(14); d.setTextColor(120, 102, 84); d.text(t('diplomaPer'), 148.5, 94, { align: 'center' });
    d.setFont('times', 'bolditalic'); d.setFontSize(40); d.setTextColor(56, 51, 46); d.text(x.nom, 148.5, 116, { align: 'center' });
    d.setFont('helvetica', 'normal'); d.setFontSize(15); d.setTextColor(120, 102, 84); d.text(d.splitTextToSize(motiu, 210), 148.5, 134, { align: 'center' });
    d.setFontSize(11); d.text(A.quanEs(new Date()), 148.5, 168, { align: 'center' });
    d.setFont('times', 'bold'); d.setFontSize(20); d.setTextColor(56, 51, 46); d.text('XIU', 148.5, 182, { align: 'center' });
    d.setFont('helvetica', 'normal'); d.setFontSize(9); d.text(t('tag'), 148.5, 187, { align: 'center' });
    XP.desaPdf(new Uint8Array(d.output('arraybuffer')), `XIU - ${t('diploma')} - ${x.nom}.pdf`, { desat: t('desat') }).then((m) => m && A.avis(m)).catch(() => A.avis(t('errPdf')));
  }

  /* ---------- pantalles ---------- */
  A.HOOKS.perfil.unshift(() => `<div class="sec"><h2>${docent() ? t('laClasse') : t('elsInfants')}</h2><button data-inf-nou>+ ${t('afegeixInfant')}</button></div>
    ${infants.length ? `<div class="infants">${infants.map((x) => `<button class="infC" data-go="#/progres/${x.id}">${avatar(x)}<span><b>${esc(x.nom)}</b>${x.edat} ${t('anys2')} · ${estrella}${estrelles(x.id)}</span></button>`).join('')}</div>`
      : `<div class="caixa"><p class="sub2">${docent() ? t('classeP') : t('infantsP')}</p><div class="actions"><button class="btn pri" data-inf-nou>+ ${t('afegeixInfant')}</button></div></div>`}`);
  A.HOOKS.inici.push(() => infants.length ? `<div class="sec"><h2>${t('quiJuga')}</h2>${actiu ? `<button data-go="#/progres/${actiu}">${t('veureProgres')}</button>` : ''}</div>
    <div class="infTria inici">${infants.map((x) => `<button class="infX ${x.id === actiu ? 'on' : ''}" data-inf-actiu="${x.id}">${avatar(x)}<b>${esc(x.nom)}</b><small>${estrella}${estrelles(x.id)}</small></button>`).join('')}</div>` : '');
  A.HOOKS.accions.push((r) => {
    const ult = fets.find((f) => f.r === r.id && (!actiu || f.i === actiu || docent()));
    return `<button class="btn ${ult ? 'on' : ''}" data-hofet="${r.id}">${I.ok}${ult ? t('fetEl').replace('{d}', new Date(ult.d).toLocaleDateString(A.lang === 'es' ? 'es-ES' : 'ca-ES')) : t('hoHemFet')}</button>`;
  });
  A.HOOKS.insignia.push((r) => (fetPer(r.id, docent() ? null : actiu) ? `<span class="fetI" title="${t('hoHemFet')}">${I.ok}</span>` : ''));
  A.vista('progres', ([id]) => {
    const x = infant(id); if (!x) return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>`;
    const fs = deInfant(x.id), n = fs.length, ids = new Set(fs.map((f) => f.r));
    const fites = [5, 10, 25, 50, 100], seg = fites.find((v) => v > n);
    const perArea = Object.entries(A.AREES).map(([k, a]) => { const tot = A.R.filter((r) => r.area === k).length, fet = A.R.filter((r) => r.area === k && ids.has(r.id)).length; return { k, a, tot, fet }; });
    const colls = (A.BIB.colleccions || []).map((c) => ({ c, tot: c.recursos.length, fet: c.recursos.filter((r) => ids.has(r)).length }));
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <div class="infCap">${avatar(x, 'gran')}<div><h1>${esc(x.nom)}</h1><div class="sub2">${x.edat} ${t('anys2')}</div></div>
        <div class="estrellesG">${estrella}<b>${n}</b><span>${t('estrellesN')(n).replace(/^\d+ /, '')}</span></div></div>
      <div class="actions"><button class="btn" data-inf-edita="${x.id}">${t('editaInfant')}</button>${A.VISTA_OBS ? `<button class="btn" data-go="#/observacio/${x.id}">${t('observacions')}</button>` : ''}${(A.HOOKS.progres || []).map((f) => f(x)).join('')}</div>
      ${(A.HOOKS.progresSec || []).map((f) => f(x)).join('')}
      <div class="sec"><h2>${t('diplomes')}</h2></div>
      <div class="diplomes">${fites.filter((v) => v <= n).map((v) => `<button class="diplomaB" data-diploma-e="${x.id}:${v}">${estrella}<span><b>${t('diploma')}</b>${t('estrellesN')(v)}</span></button>`).join('')}
        ${colls.filter((q) => q.tot && q.fet === q.tot).map((q) => `<button class="diplomaB" data-diploma-c="${x.id}:${q.c.id}">${estrella}<span><b>${t('diploma')}</b>${esc(A.L(q.c.titol))}</span></button>`).join('')}
        ${seg ? `<div class="diplomaB proper">${estrella}<span><b>${t('estrellesN')(seg)}</b>${t('faltenEstr').replace('{n}', seg - n)}</span></div>` : ''}</div>
      <div class="sec"><h2>${t('resPerArea')}</h2></div>
      <div class="barres">${perArea.map((q) => `<div class="barra"><span>${esc(q.a[A.lang])}</span><i><em style="width:${q.tot ? (q.fet / q.tot) * 100 : 0}%;background:${q.a.color}"></em></i><small>${q.fet}/${q.tot}</small></div>`).join('')}</div>
      ${colls.length ? `<div class="sec"><h2>${t('colleccions')}</h2></div><div class="barres">${colls.map((q) => `<div class="barra"><span>${esc(A.L(q.c.titol))}</span><i><em style="width:${q.tot ? (q.fet / q.tot) * 100 : 0}%"></em></i><small>${q.fet}/${q.tot}</small></div>`).join('')}</div>` : ''}
      <div class="sec"><h2>${t('historial')}</h2></div>
      ${fs.length ? `<div class="historial">${fs.map((f) => { const r = A.perId[f.r]; return r ? `<div class="hist">${f.foto ? `<img src="${f.foto}" alt="">` : ''}<div><b data-go="#/r/${r.id}">${esc(A.L(r.titol))}</b><small>${A.quanEs(f.d)}</small>${f.nota ? `<p>${esc(f.nota)}</p>` : ''}</div><button class="mini" data-fet-esb="${f.d}|${f.i}|${f.r}">${t('esborraFet')}</button></div>` : ''; }).join('')}</div>` : `<p class="sub2">${t('capFet')}</p>`}`;
  });
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-inf-nou],[data-inf-edita],[data-inf-actiu],[data-hofet],[data-diploma-e],[data-diploma-c],[data-fet-esb]');
    if (!el) return;
    const d = el.dataset;
    if (d.infNou != null) formInfant(null);
    else if (d.infEdita) formInfant(infant(d.infEdita));
    else if (d.infActiu) { actiu = d.infActiu; desa(); A.render(true); }
    else if (d.hofet) hoHemFet(A.perId[d.hofet]);
    else if (d.diplomaE) { const [i, v] = d.diplomaE.split(':'); diploma(infant(i), t('diplomaEstr').replace('{n}', v)); }
    else if (d.diplomaC) { const [i, c] = d.diplomaC.split(':'); const cc = A.BIB.colleccions.find((q) => q.id === c); diploma(infant(i), t('diplomaColl').replace('{c}', A.L(cc.titol))); }
    else if (d.fetEsb) { const [dd, i, r] = d.fetEsb.split('|'); fets = fets.filter((f) => !(f.d === dd && String(f.i) === i && f.r === r)); desa(); A.render(true); }
  });
  A.INFANTS = { llista: () => infants, infant, deInfant, avatar, docent };
});
