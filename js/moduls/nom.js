// XIU · «El meu nom»: una fitxa per repassar el nom de cada infant (lletres puntejades), per fer amb el dit o imprimir.
// Per a la classe, un sol PDF amb la fitxa de cada infant. Ruta: #/nom/<id de l'infant>
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I } = A, t = (k) => A.t(k);
  A.textos({
    ca: { elMeuNom: 'El meu nom', nomFitxa: 'Fitxa del seu nom', nomFitxaP: 'Repassa les lletres del teu nom amb el dit. Després, prova d\'escriure\'l sol.', nomClasse: 'Fitxes amb el nom de tota la classe',
      nomEscriu: 'Ara escriu-lo tu:', majuscules: 'MAJÚSCULES', minuscules2: 'minúscules', nomCap: 'Afegeix els infants al teu perfil per fer la fitxa del seu nom.' },
    es: { elMeuNom: 'Mi nombre', nomFitxa: 'Ficha de su nombre', nomFitxaP: 'Repasa las letras de tu nombre con el dedo. Después, prueba a escribirlo solo.', nomClasse: 'Fichas con el nombre de toda la clase',
      nomEscriu: 'Ahora escríbelo tú:', majuscules: 'MAYÚSCULAS', minuscules2: 'minúsculas', nomCap: 'Añade a los niños y niñas en tu perfil para hacer la ficha de su nombre.' },
  });
  let estil = A.ls.get('nom-estil', 'maj');
  const textNom = (n) => (estil === 'maj' ? n.toLocaleUpperCase(A.lang) : n);
  /** La fitxa (A4, 210×297 mm) en SVG. `digital`: sense capçalera de paper, per fer-la a la pantalla. */
  function svgNom(x, digital) {
    const F = window.XIU_FONTS || {}, C = window.XFitxa.C, nom = textNom(x.nom.trim()).slice(0, 14);
    const mida = Math.min(46, 170 / Math.max(3, nom.length * 0.66)), ff = F.text || 'Quicksand, sans-serif';
    const fila = (y, op, punt) => `<line x1="14" y1="${y}" x2="196" y2="${y}" stroke="${C.sorra}" stroke-width=".4"/><line x1="14" y1="${y - mida * 0.7}" x2="196" y2="${y - mida * 0.7}" stroke="${C.sorra}" stroke-width=".25" stroke-dasharray="1.5 2"/>
      ${punt ? `<text x="105" y="${y}" text-anchor="middle" font-family="${ff}" font-weight="600" font-size="${mida}" fill="none" stroke="${C.guia}" stroke-width=".9" stroke-dasharray="${op}" stroke-linecap="round" letter-spacing="${mida * 0.08}">${esc(nom)}</text>` : ''}`;
    const cap = digital ? '' : `<text x="14" y="24" font-family="${F.titols || 'Georgia, serif'}" font-size="12" fill="${C.tinta}" letter-spacing=".6">${esc(t('elMeuNom').toUpperCase())}</text>
      <text x="14" y="34" font-family="${F.manuscrita || 'cursive'}" font-size="9" fill="${C.tinta}">${esc(t('nomFitxaP'))}</text><line x1="0" y1="41" x2="210" y2="41" stroke="${C.talp}" stroke-width=".3"/>`;
    const y0 = digital ? 22 : 64;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${digital ? 0 : 0} 210 ${digital ? 236 : 297}" ${digital ? '' : 'width="210mm" height="297mm"'}>
      ${digital ? '' : `<rect width="210" height="297" fill="${C.paper}"/>`}${cap}
      <circle cx="${digital ? 196 : 190}" cy="${digital ? 10 : 22}" r="6" fill="${x.color}"/><text x="${digital ? 196 : 190}" y="${digital ? 12.6 : 24.6}" text-anchor="middle" font-family="${F.titols || 'Georgia'}" font-size="8" fill="#fff">${esc(x.nom.charAt(0).toUpperCase())}</text>
      ${fila(y0 + mida, '0.1 2.2', true)}${fila(y0 + mida * 2.4, '0.1 2.6', true)}${fila(y0 + mida * 3.8, '0.1 3.4', true)}
      <text x="14" y="${y0 + mida * 4.6}" font-family="${ff}" font-size="5" fill="${C.marro}">${esc(t('nomEscriu'))}</text>${fila(y0 + mida * 5.6, '', false)}${fila(y0 + mida * 6.9, '', false)}
      ${digital ? '' : `<text x="105" y="288" text-anchor="middle" font-family="${F.titols || 'Georgia'}" font-size="6" fill="${C.marro}">XIU · ${esc(t('tag'))}</text>`}</svg>`;
  }
  async function pdf(infants) {
    const css = await window.XFitxa.fontsCss(), W = 2480, H = 3508, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d'), doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', compress: true });
    for (const [i, x] of infants.entries()) {
      const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgNom(x, false).replace('>', `><style>${css}</style>`)); await img.decode();
      await new Promise((ok) => setTimeout(ok, 30));
      ctx.fillStyle = '#F4F0E8'; ctx.fillRect(0, 0, W, H); ctx.drawImage(img, 0, 0, W, H);
      if (i) doc.addPage(); doc.addImage(cv.toDataURL('image/jpeg', 0.85), 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }
    const nom = infants.length === 1 ? `XIU - ${t('elMeuNom')} - ${infants[0].nom}.pdf` : `XIU - ${t('nomClasse')}.pdf`;
    const m = await XP.desaPdf(new Uint8Array(doc.output('arraybuffer')), nom, { desat: t('desat') }); if (m) A.avis(m);
  }
  A.vista('nom', ([id]) => {
    const x = A.INFANTS?.infant(id);
    if (!x) return `<button class="back" data-enrere>${I.back}${t('tornar')}</button><p class="sub2">${t('nomCap')}</p>`;
    const colors = ['#38332E', '#C9785B', '#8FA68A', '#D1A35A', '#8EA2B4'].map((c, j) => `<button class="color${j ? '' : ' on'}" data-c="${c}" style="background:${c}" aria-label="color"></button>`).join('');
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH"><h1>${t('elMeuNom')}</h1><div class="scr">${esc(x.nom)}</div><p>${t('nomFitxaP')}</p></section>
      <div class="actions"><div class="lang" style="display:inline-flex"><button class="${estil === 'maj' ? 'on' : ''}" data-nomestil="maj">${t('majuscules')}</button><button class="${estil === 'min' ? 'on' : ''}" data-nomestil="min">${t('minuscules2')}</button></div>
        <button class="btn pri" data-nompdf="${x.id}">${I.dl}${t('pdf')}</button></div>
      <div class="digital" id="digital" style="--c:${x.color}"><section class="ex" data-tipus="dibuixa" data-i="0"><div class="exT">${esc(t('ambElDit'))}</div>
        <div class="exC"><div class="pis" data-k="0" data-p="dibuix" style="aspect-ratio:210/236;--ar:.89">${svgNom(x, true)}</div></div>
        <div class="exF"><span class="colors">${colors}</span><button class="mini" data-esborra>${t('esborra')}</button></div></section></div>`;
  });
  // botons: a la pàgina de progrés de cada infant i a «La meva classe»
  A.HOOKS.progres = A.HOOKS.progres || [];
  A.HOOKS.progres.push((x) => `<button class="btn" data-go="#/nom/${x.id}">${I.dit}${t('nomFitxa')}</button>`);
  A.HOOKS.perfil.push(() => { const inf = A.INFANTS?.llista() || []; return inf.length > 1 && A.INFANTS.docent() ? `<div class="actions" style="margin-top:8px"><button class="btn" data-nompdf="tots">${I.print}${t('nomClasse')}</button></div>` : ''; });
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-nomestil],[data-nompdf]'); if (!el) return;
    if (el.dataset.nomestil) { estil = el.dataset.nomestil; A.ls.set('nom-estil', estil); A.render(true); return; }
    const id = el.dataset.nompdf, inf = A.INFANTS.llista();
    el.disabled = true; const txt = el.innerHTML; el.textContent = t('fent');
    pdf(id === 'tots' ? inf : inf.filter((q) => q.id === id)).catch((err) => { console.error(err); A.avis(t('errPdf')); }).finally(() => { el.disabled = false; el.innerHTML = txt; });
  });
});
