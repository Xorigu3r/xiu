// XIU · Diari de l'aula (docents): en dos tocs, què hem fet avui (surt sol del que s'ha apuntat i de la programació),
// una nota i una foto; després s'envia a les famílies (amb els enllaços per repetir-ho a casa) o se'n fa el PDF de la setmana.
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I, ls } = A, t = (k) => A.t(k);
  const WEB = 'https://xorigu3r.github.io/xiu/';
  A.textos({
    ca: { diari: "Diari de l'aula", diariS: 'Què hem fet avui', diariP: 'Tria què heu fet, afegeix-hi unes paraules i envia-ho a les famílies.', diariB: "Escriu el diari d'avui en dos tocs",
      avuiHem: 'Què hem fet', avuiHemP: 'Surt sol del que heu apuntat avui i de la programació. Toca per treure o posar.', notaDia: 'Unes paraules sobre el dia', notaDiaP: 'Avui hem...',
      comDia: 'Com ha anat', dies2: ['Un dia molt bonic', 'Tranquil', 'Molt actiu', 'Hem après coses noves'], fotoDia: 'Una foto (opcional)', desaDia: 'Desa el dia', diaDesat: 'Dia desat.',
      envia3: 'Envia a les famílies', setmanaPdf: 'PDF de la setmana', capDia: 'Encara no hi ha cap dia escrit.', perCasa: 'Per fer-ho a casa:', avuiHemFet: 'Avui hem fet:', copiatD: 'Text copiat: enganxa\'l al grup o al correu de les famílies.', altres: 'Altres propostes', esborraDia: 'Esborra' },
    es: { diari: 'Diario del aula', diariS: 'Qué hemos hecho hoy', diariP: 'Elige qué habéis hecho, añade unas palabras y envíalo a las familias.', diariB: 'Escribe el diario de hoy en dos toques',
      avuiHem: 'Qué hemos hecho', avuiHemP: 'Sale solo de lo que habéis anotado hoy y de la programación. Toca para quitar o poner.', notaDia: 'Unas palabras sobre el día', notaDiaP: 'Hoy hemos...',
      comDia: 'Cómo ha ido', dies2: ['Un día muy bonito', 'Tranquilo', 'Muy activo', 'Hemos aprendido cosas nuevas'], fotoDia: 'Una foto (opcional)', desaDia: 'Guardar el día', diaDesat: 'Día guardado.',
      envia3: 'Enviar a las familias', setmanaPdf: 'PDF de la semana', capDia: 'Todavía no hay ningún día escrito.', perCasa: 'Para hacerlo en casa:', avuiHemFet: 'Hoy hemos hecho:', copiatD: 'Texto copiado: pégalo en el grupo o en el correo de las familias.', altres: 'Otras propuestas', esborraDia: 'Borrar' },
  });
  let diari = ls.get('diari', []), foto = null, triats = null, estat = 0, notaTmp = '';
  const iso = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const desa = () => { try { localStorage.setItem('xiu-diari', JSON.stringify(diari)); } catch { A.avis(t('pleMemoria') || 'Sense espai'); } };
  const docent = () => A.perfil?.tipus === 'pro';
  function suggerits() {
    const avui = new Date().toDateString(), fets = (A.ls.get('fets', []) || []).filter((f) => new Date(f.d).toDateString() === avui).map((f) => f.r);
    const prog = (A.ls.get('programa', {})[iso()] || []);
    return [...new Set([...fets, ...prog])].filter((id) => A.perId[id]);
  }
  A.vista('diari', () => {
    const sug = suggerits(); if (!triats) triats = new Set(sug);
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH"><h1>${t('diari')}</h1><div class="scr">${A.quanEs(new Date())}</div><p>${t('diariP')}</p></section>
      <form data-form="diari" class="formC caixa" novalidate>
        <div class="lblF">${t('avuiHem')}</div><p class="sub2">${t('avuiHemP')}</p>
        <div class="chips diariChips">${[...new Set([...sug, ...triats])].map((id) => `<button type="button" class="chip ${triats.has(id) ? 'on' : ''}" data-dtria="${id}">${esc(A.L(A.perId[id].titol))}</button>`).join('')}
          <select data-dafeg><option value="">+ ${t('altres')}</option>${A.R.filter((r) => !sug.includes(r.id) && !triats.has(r.id)).map((r) => `<option value="${r.id}">${esc(A.L(r.titol))}</option>`).join('')}</select></div>
        <div class="lblF">${t('comDia')}</div><div class="chips">${t('dies2').map((x, i) => `<button type="button" class="chip ${estat === i ? 'on' : ''}" data-destat="${i}">${esc(x)}</button>`).join('')}</div>
        <label>${t('notaDia')}<textarea name="nota" rows="3" placeholder="${t('notaDiaP')}">${esc(notaTmp)}</textarea></label>
        <label class="btn fotoB"><span>${t('fotoDia')}</span><input type="file" name="foto" accept="image/*" hidden></label><img class="fotoPrev" ${foto ? `src="${foto}"` : 'hidden'} alt="">
        <button class="btn pri gran" type="submit">${t('desaDia')}</button></form>
      <div class="actions"><button class="btn" data-dsetmana>${I.dl}${t('setmanaPdf')}</button></div>
      <div class="historial">${diari.length ? diari.map((d, i) => `<div class="hist">${d.foto ? `<img src="${d.foto}" alt="">` : ''}<div><b>${A.quanEs(d.d + 'T12:00')}</b><small>${esc(t('dies2')[d.e] || '')}</small>
          <p>${esc(d.ids.map((id) => A.perId[id] ? A.L(A.perId[id].titol) : '').filter(Boolean).join(' · '))}</p>${d.nota ? `<p><i>${esc(d.nota)}</i></p>` : ''}
          <div class="actions" style="margin-top:6px"><button class="btn" data-denvia="${i}">${I.share}${t('envia3')}</button><button class="mini" data-desb="${i}">${t('esborraDia')}</button></div></div></div>`).join('') : `<p class="sub2">${t('capDia')}</p>`}</div>`;
  });
  function text(d) {
    const rs = d.ids.map((id) => A.perId[id]).filter(Boolean);
    return [`XIU · ${t('diari')} · ${A.quanEs(d.d + 'T12:00')}`, '', rs.length ? `${t('avuiHemFet')} ${rs.map((r) => A.L(r.titol)).join(', ')}.` : '', d.nota || '', '',
      rs.length ? t('perCasa') : '', ...rs.map((r) => `• ${A.L(r.titol)}: ${WEB}#/r/${r.id}`)].filter((x, i, a) => x || (i && a[i - 1])).join('\n').trim();
  }
  async function envia(d) {
    const txt = text(d);
    try {
      if (XP.NATIU && window.Capacitor.Plugins.Share) return await window.Capacitor.Plugins.Share.share({ title: t('diari'), text: txt });
      if (navigator.share) return await navigator.share({ title: t('diari'), text: txt });
    } catch { return; }
    try { await navigator.clipboard.writeText(txt); A.avis(t('copiatD')); } catch { A.avis(txt.slice(0, 120)); }
  }
  async function setmana() {
    const des = new Date(Date.now() - 6 * 864e5), ds = diari.filter((d) => new Date(d.d + 'T12:00') >= des).reverse();
    if (!ds.length) return A.avis(t('capDia'));
    const { jsPDF } = window.jspdf, doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
    let y = 22; const nova = (h) => { if (y + h > 282) { doc.addPage(); y = 20; } };
    doc.setFont('times', 'bold'); doc.setFontSize(22); doc.setTextColor(56, 51, 46); doc.text(t('diari'), 20, y); y += 12;
    for (const d of ds) {
      const rs = d.ids.map((id) => A.perId[id]).filter(Boolean);
      nova(30); doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.setTextColor(56, 51, 46); doc.text(A.quanEs(d.d + 'T12:00'), 20, y);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(120, 102, 84); doc.text(t('dies2')[d.e] || '', 190, y, { align: 'right' }); y += 7;
      if (d.foto) { const im = new Image(); im.src = d.foto; await im.decode().catch(() => null); const s = Math.min(80 / (im.naturalWidth || 4), 55 / (im.naturalHeight || 3)); nova(im.naturalHeight * s + 4); doc.addImage(d.foto, 'JPEG', 20, y, im.naturalWidth * s, im.naturalHeight * s); y += im.naturalHeight * s + 4; }
      doc.setTextColor(56, 51, 46); doc.setFontSize(11);
      if (rs.length) { const l = doc.splitTextToSize(`${t('avuiHemFet')} ${rs.map((r) => A.L(r.titol)).join(', ')}.`, 170); nova(l.length * 5); doc.text(l, 20, y); y += l.length * 5 + 2; }
      if (d.nota) { doc.setFont('times', 'italic'); doc.setFontSize(12); const l = doc.splitTextToSize(d.nota, 170); nova(l.length * 5.5); doc.text(l, 20, y); y += l.length * 5.5 + 2; }
      y += 6; doc.setDrawColor(221, 208, 193); doc.line(20, y - 3, 190, y - 3);
    }
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(120, 102, 84); doc.text('XIU · ' + t('tag'), 20, 290);
    const m = await XP.desaPdf(new Uint8Array(doc.output('arraybuffer')), `XIU - ${t('diari')} ${iso()}.pdf`, { desat: t('desat') }); if (m) A.avis(m);
  }
  A.HOOKS.iniciDalt.push(() => (docent() ? `<button class="premB diariB" data-go="#/diari">${I.rellotge}<span><b>${t('diari')}</b>${t('diariB')}</span>${I.back}</button>` : ''));
  A.HOOKS.perfil.push(() => (docent() ? `<div class="llistaMes" style="margin-top:8px"><button data-go="#/diari">${I.rellotge}<span>${t('diari')}</span>${I.back}</button></div>` : ''));
  document.addEventListener('change', async (e) => {
    if (e.target.matches('[data-dafeg]') && e.target.value) { triats.add(e.target.value); return A.render(true); }
    if (e.target.name === 'foto' && e.target.form?.dataset.form === 'diari' && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]), im = new Image(); im.src = url; await im.decode();
      const s = Math.min(1, 640 / Math.max(im.naturalWidth, im.naturalHeight)), cv = document.createElement('canvas'); cv.width = im.naturalWidth * s; cv.height = im.naturalHeight * s;
      cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height); foto = cv.toDataURL('image/jpeg', 0.72); URL.revokeObjectURL(url);
      const p = e.target.form.parentElement.querySelector('.fotoPrev'); p.src = foto; p.hidden = false;
    }
  });
  document.addEventListener('input', (e) => { if (e.target.name === 'nota' && e.target.form?.dataset.form === 'diari') notaTmp = e.target.value; });
  document.addEventListener('submit', (e) => {
    if (e.target.dataset.form !== 'diari') return; e.preventDefault();
    diari.unshift({ d: iso(), ids: [...triats], nota: e.target.nota.value.trim(), e: estat, foto }); diari = diari.slice(0, 120); desa();
    foto = null; triats = null; notaTmp = ''; A.avis(t('diaDesat')); A.render(true);
  });
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-dtria],[data-destat],[data-denvia],[data-desb],[data-dsetmana]'); if (!el) return;
    const d = el.dataset;
    if (d.dtria) { triats.has(d.dtria) ? triats.delete(d.dtria) : triats.add(d.dtria); el.classList.toggle('on'); }
    else if (d.destat) { estat = +d.destat; el.parentElement.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c === el)); }
    else if (d.denvia) envia(diari[+d.denvia]);
    else if (d.desb) { diari.splice(+d.desb, 1); desa(); A.render(true); }
    else if (d.dsetmana != null) setmana().catch(() => A.avis(t('errPdf')));
  });
});
