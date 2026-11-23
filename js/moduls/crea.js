// XIU · «Crea la teva fitxa»: tries què vols treballar (comptar, sèries, repassar, trobar, dibuixar), l'edat i fins a 4 exercicis,
// i XIU fa una fitxa nova al moment amb els seus dibuixos: per fer a la pantalla, imprimir o (docents) imprimir per a la classe.
// Les fitxes creades es desen en aquest aparell («Les meves fitxes») i s'obren com qualsevol altra proposta (#/r/meva-...).
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I } = A, t = (k) => A.t(k);
  A.textos({
    ca: { crea: 'Crea la teva fitxa', creaS: 'Una fitxa nova, al moment', creaP: 'Tria què voleu treballar i XIU la fa amb els seus dibuixos. Per fer a la pantalla o imprimir.',
      creaB: 'Crea una fitxa nova al moment', exercici: 'Exercici', afegeixEx: '+ Afegeix un exercici', treuEx: 'Treu', titolFitxa: 'Títol', perEdat2: 'Per a quina edat?', creaFes: 'Fes la fitxa',
      lesMeves: 'Les meves fitxes', lesMevesCap: 'Encara no n\'has creat cap.', esborraMeva: 'Esborra-la', esborraMevaQ: 'Vols esborrar aquesta fitxa?', creada: 'Fitxa creada', desaMeva: 'Desada a «Les meves fitxes».',
      altraSemblant: 'Una altra de semblant', quantsFins: 'Fins a', dibuix: 'Dibuix', barrejat: 'Barrejats', grups: 'Grups', files: 'Files', elements2: 'Elements', quines: 'Què es repassa', objectiu: 'Què s\'ha de trobar',
      enunciat: 'Què han de dibuixar?', enunciatP: 'Dibuixa la teva família', creadaPer: 'Feta amb «Crea la teva fitxa»',
      tipusEx: { compta: 'Comptar', serie: 'Sèries', ressegueix: 'Repassar', encercla: 'Trobar i encerclar', dibuixa: 'Dibuixar' },
      txtEx: { compta: 'Compta els dibuixos i encercla el nombre correcte.', serie: 'Continua la sèrie: què ve ara?', ressegueix: 'Repassa amb el dit seguint els punts.', encercla: 'Troba i encercla totes les {x}.' } },
    es: { crea: 'Crea tu ficha', creaS: 'Una ficha nueva, al momento', creaP: 'Elige qué queréis trabajar y XIU la hace con sus dibujos. Para hacer en la pantalla o imprimir.',
      creaB: 'Crea una ficha nueva al momento', exercici: 'Ejercicio', afegeixEx: '+ Añadir un ejercicio', treuEx: 'Quitar', titolFitxa: 'Título', perEdat2: '¿Para qué edad?', creaFes: 'Hacer la ficha',
      lesMeves: 'Mis fichas', lesMevesCap: 'Todavía no has creado ninguna.', esborraMeva: 'Borrarla', esborraMevaQ: '¿Quieres borrar esta ficha?', creada: 'Ficha creada', desaMeva: 'Guardada en «Mis fichas».',
      altraSemblant: 'Otra parecida', quantsFins: 'Hasta', dibuix: 'Dibujo', barrejat: 'Mezclados', grups: 'Grupos', files: 'Filas', elements2: 'Elementos', quines: 'Qué se repasa', objectiu: 'Qué hay que encontrar',
      enunciat: '¿Qué tienen que dibujar?', enunciatP: 'Dibuja a tu familia', creadaPer: 'Hecha con «Crea tu ficha»',
      tipusEx: { compta: 'Contar', serie: 'Series', ressegueix: 'Repasar', encercla: 'Encontrar y rodear', dibuixa: 'Dibujar' },
      txtEx: { compta: 'Cuenta los dibujos y rodea el número correcto.', serie: 'Continúa la serie: ¿qué viene ahora?', ressegueix: 'Repasa con el dedo siguiendo los puntos.', encercla: 'Encuentra y rodea todas las {x}.' } },
  });
  const ELS = ['estrella', 'flor', 'bola', 'castanya', 'fulla', 'pedra', 'poma'], SER = { estrella: 'e', flor: 'l', bola: 'b', castanya: 'c', fulla: 'f', pedra: 'p', poma: 'm' };
  const NOMS = { ca: { estrella: 'estrelles', flor: 'flors', bola: 'boles', castanya: 'castanyes', fulla: 'fulles', pedra: 'pedres', poma: 'pomes' }, es: { estrella: 'estrellas', flor: 'flores', bola: 'bolas', castanya: 'castañas', fulla: 'hojas', pedra: 'piedras', poma: 'manzanas' } };
  const CARS = ['A', 'E', 'I', 'O', 'U', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const rnd = (n) => Math.floor(Math.random() * n), tria = (a) => a[rnd(a.length)], barreja = (a) => [...a].sort(() => Math.random() - 0.5);
  const nou = (tipus) => ({ tipus, fins: 5, element: 'barrejat', grups: 3, elements: 2, files: 2, cars: 'A', objectiu: 'A', text: '' });
  let estat = A.ls.get('crea-estat', null) || { edat: (A.perfil?.edats || [])[0] || '3-4', titol: '', exs: [nou('compta'), nou('serie')] };
  let meves = A.ls.get('creades', []);
  const desa = () => { A.ls.set('crea-estat', estat); A.ls.set('creades', meves); };
  function injecta() { const p = A.perId; for (const r of meves) p[r.id] = r; }
  injecta();
  addEventListener('xiu-contingut', () => setTimeout(() => { injecta(); }, 0));

  /* ---------- d'un exercici triat a l'exercici de la fitxa ---------- */
  const bil = (ca, es) => ({ ca, es });
  function exercici(e) {
    const tx = (k, x) => bil((XIU_TX.ca.txtEx[k] || '').replace('{x}', x?.ca || ''), (XIU_TX.es.txtEx[k] || '').replace('{x}', x?.es || ''));
    if (e.tipus === 'compta') {
      const grups = Array.from({ length: Math.max(1, Math.min(4, +e.grups)) }, () => {
        const n = 1 + rnd(+e.fins), ops = barreja([n, ...barreja([...Array(Math.max(+e.fins, 3) + 1).keys()].slice(1).filter((x) => x !== n)).slice(0, 2)]).sort((a, b) => a - b);
        return { element: e.element === 'barrejat' ? tria(ELS) : e.element, n, opcions: ops };
      });
      return { tipus: 'compta', text: tx('compta'), grups };
    }
    if (e.tipus === 'serie') {
      const k = Math.max(2, Math.min(3, +e.elements));
      const files = Array.from({ length: Math.max(1, Math.min(3, +e.files)) }, () => {
        const pat = barreja(ELS).slice(0, k).map((x) => SER[x]).join(''), llarg = k === 2 ? 5 : 6;
        return (pat.repeat(4).slice(0, llarg) + '?');
      });
      return { tipus: 'serie', text: tx('serie'), files };
    }
    if (e.tipus === 'ressegueix') return { tipus: 'ressegueix', text: tx('ressegueix'), caracters: String(e.cars || 'A').slice(0, 8) };
    if (e.tipus === 'encercla') {
      const obj = e.objectiu || 'A', esNum = /\d/.test(obj), alt = (esNum ? CARS.filter((c) => /\d/.test(c)) : ['A', 'E', 'I', 'O', 'U', 'M', 'P', 'L', 'S']).filter((c) => c !== obj);
      const els = barreja([obj, obj, obj, obj, ...Array.from({ length: 8 }, () => tria(alt))]);
      return { tipus: 'encercla', text: bil(`Troba i encercla tots els «${obj}».`, `Encuentra y rodea todos los «${obj}».`), elements: els, objectiu: obj };
    }
    return { tipus: 'dibuixa', text: bil(e.text || XIU_TX.ca.enunciatP, e.text || XIU_TX.es.enunciatP) };
  }
  const XIU_TX = { ca: {}, es: {} };
  // els textos dels dos idiomes (per fer la fitxa bilingüe)
  for (const l of ['ca', 'es']) XIU_TX[l] = { txtEx: ({ ca: { compta: 'Compta els dibuixos i encercla el nombre correcte.', serie: 'Continua la sèrie: què ve ara?', ressegueix: 'Repassa amb el dit seguint els punts.' }, es: { compta: 'Cuenta los dibujos y rodea el número correcto.', serie: 'Continúa la serie: ¿qué viene ahora?', ressegueix: 'Repasa con el dedo siguiendo los puntos.' } })[l], enunciatP: l === 'ca' ? 'Dibuixa la teva família' : 'Dibuja a tu familia' };
  const AREA = { compta: 'log', serie: 'log', encercla: 'llen', ressegueix: 'mot', dibuixa: 'cre' };
  function fesFitxa() {
    const exs = estat.exs.slice(0, 4).map(exercici);
    const id = 'meva-' + Date.now().toString(36);
    const tipusN = [...new Set(estat.exs.map((e) => A.t('tipusEx')[e.tipus]))].join(' · ');
    const titol = estat.titol.trim() || tipusN;
    return { id, tipus: 'fitxa', meva: true, edat: estat.edat, area: AREA[estat.exs[0].tipus] || 'log', perfil: ['fam', 'pro'], durada: '10 min',
      titol: bil(titol, titol), subtitol: bil('Feta amb «Crea la teva fitxa»', 'Hecha con «Crea tu ficha»'), full: { exercicis: exs } };
  }

  /* ---------- pantalla ---------- */
  const sel = (i, camp, opcions, v) => `<select data-crea="${i}:${camp}">${opcions.map(([k, n]) => `<option value="${k}" ${String(v) === String(k) ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select>`;
  const nomEl = (k) => (k === 'barrejat' ? t('barrejat') : NOMS[A.lang === 'es' ? 'es' : 'ca'][k]);
  function params(e, i) {
    switch (e.tipus) {
      case 'compta': return `<label>${t('quantsFins')}${sel(i, 'fins', [[3, 3], [5, 5], [9, 9]], e.fins)}</label><label>${t('dibuix')}${sel(i, 'element', ['barrejat', ...ELS].map((k) => [k, nomEl(k)]), e.element)}</label><label>${t('grups')}${sel(i, 'grups', [[2, 2], [3, 3], [4, 4]], e.grups)}</label>`;
      case 'serie': return `<label>${t('elements2')}${sel(i, 'elements', [[2, 2], [3, 3]], e.elements)}</label><label>${t('files')}${sel(i, 'files', [[1, 1], [2, 2], [3, 3]], e.files)}</label>`;
      case 'ressegueix': return `<label class="ample">${t('quines')}<div class="chips">${CARS.map((c) => `<button class="chip ${String(e.cars).includes(c) ? 'on' : ''}" data-crea-car="${i}:${c}">${c}</button>`).join('')}</div></label>`;
      case 'encercla': return `<label class="ample">${t('objectiu')}<div class="chips">${CARS.map((c) => `<button class="chip ${e.objectiu === c ? 'on' : ''}" data-crea-obj="${i}:${c}">${c}</button>`).join('')}</div></label>`;
      default: return `<label class="ample">${t('enunciat')}<input data-crea="${i}:text" value="${esc(e.text)}" placeholder="${esc(t('enunciatP'))}"></label>`;
    }
  }
  A.vista('crea', () => `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
    <section class="pageH"><h1>${t('crea')}</h1><div class="scr">${t('creaS')}</div><p>${t('creaP')}</p></section>
    <div class="creaF">
      <div class="dos"><label>${t('titolFitxa')} <small>(${t('opcional')})</small><input data-crea="-:titol" value="${esc(estat.titol)}" maxlength="40"></label>
        <label>${t('perEdat2')}${sel('-', 'edat', A.EDATS.map((e) => [e, e + ' ' + t('anys')]), estat.edat)}</label></div>
      ${estat.exs.map((e, i) => `<div class="creaEx"><div class="creaExCap"><b>${t('exercici')} ${i + 1}</b>${estat.exs.length > 1 ? `<button class="mini" data-crea-treu="${i}">${t('treuEx')}</button>` : ''}</div>
        <div class="chips">${Object.entries(t('tipusEx')).map(([k, n]) => `<button class="chip ${e.tipus === k ? 'on' : ''}" data-crea-tipus="${i}:${k}">${n}</button>`).join('')}</div>
        <div class="creaParams">${params(e, i)}</div></div>`).join('')}
      ${estat.exs.length < 4 ? `<button class="btn" data-crea-afegeix>${t('afegeixEx')}</button>` : ''}
      <button class="btn pri gran" data-crea-fes>${I.estrella}${t('creaFes')}</button></div>
    <div class="sec"><h2>${t('lesMeves')}</h2></div>
    ${meves.length ? `<div class="grid">${meves.map(A.card).join('')}</div>` : `<p class="sub2">${t('lesMevesCap')}</p>`}`);
  // a les fitxes creades: «Una altra de semblant» i «Esborra-la»
  A.HOOKS.accions.push((r) => (r.meva ? `<button class="btn" data-crea-semblant="${r.id}">${I.refresca || ''}${t('altraSemblant')}</button><button class="btn mal" data-crea-esb="${r.id}">${t('esborraMeva')}</button>` : ''));
  A.HOOKS.bib.push(() => `<button class="premB matB" data-go="#/crea">${I.estrella}<span><b>${t('crea')}</b>${t('creaB')}</span>${I.back}</button>`);
  A.HOOKS.perfil.push(() => `<div class="llistaMes" style="margin-top:8px"><button data-go="#/crea">${I.estrella}<span>${t('crea')}</span>${I.back}</button></div>`);

  const canvia = () => { desa(); A.render(true); };
  document.addEventListener('change', (e) => {
    const d = e.target.dataset.crea; if (!d) return;
    const [i, camp] = d.split(':');
    if (i === '-') estat[camp] = e.target.value; else estat.exs[+i][camp] = e.target.value;
    desa(); if (camp !== 'titol' && camp !== 'text') A.render(true);
  });
  document.addEventListener('input', (e) => { const d = e.target.dataset.crea; if (d && (d.endsWith(':titol') || d.endsWith(':text'))) { const [i, camp] = d.split(':'); if (i === '-') estat[camp] = e.target.value; else estat.exs[+i][camp] = e.target.value; desa(); } });
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-crea-tipus],[data-crea-car],[data-crea-obj],[data-crea-treu],[data-crea-afegeix],[data-crea-fes],[data-crea-semblant],[data-crea-esb]'); if (!el) return;
    const d = el.dataset;
    if (d.creaTipus) { const [i, k] = d.creaTipus.split(':'); estat.exs[+i] = nou(k); return canvia(); }
    if (d.creaCar) { const [i, c] = d.creaCar.split(':'), x = estat.exs[+i]; x.cars = x.cars.includes(c) ? x.cars.replace(c, '') || c : (x.cars + c).slice(0, 8); return canvia(); }
    if (d.creaObj) { const [i, c] = d.creaObj.split(':'); estat.exs[+i].objectiu = c; return canvia(); }
    if (d.creaTreu) { estat.exs.splice(+d.creaTreu, 1); return canvia(); }
    if (d.creaAfegeix != null) { estat.exs.push(nou('dibuixa')); return canvia(); }
    if (d.creaFes != null || d.creaSemblant) {
      let r;
      if (d.creaSemblant) { const vell = A.perId[d.creaSemblant]; r = { ...JSON.parse(JSON.stringify(vell)), id: 'meva-' + Date.now().toString(36) };
        const exsV = r.full.exercicis; r.full.exercicis = exsV.map((x) => exercici(x.tipus === 'compta' ? { tipus: 'compta', fins: Math.max(...x.grups.map((g) => Math.max(...g.opcions))), element: new Set(x.grups.map((g) => g.element)).size > 1 ? 'barrejat' : x.grups[0].element, grups: x.grups.length }
          : x.tipus === 'serie' ? { tipus: 'serie', elements: new Set(x.files[0].replace('?', '')).size, files: x.files.length } : x.tipus === 'ressegueix' ? { tipus: 'ressegueix', cars: x.caracters }
          : x.tipus === 'encercla' ? { tipus: 'encercla', objectiu: x.objectiu } : { tipus: 'dibuixa', text: x.text.ca })); }
      else r = fesFitxa();
      meves.unshift(r); meves = meves.slice(0, 40); desa(); injecta();
      A.avis(t('desaMeva')); A.go('#/r/' + r.id); return;
    }
    if (d.creaEsb && confirm(t('esborraMevaQ'))) { meves = meves.filter((r) => r.id !== d.creaEsb); desa(); A.go('#/crea'); }
  });
});
