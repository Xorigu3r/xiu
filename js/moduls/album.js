// XIU · Àlbum de records: un PDF bonic amb les fotos i les notes de «Ho hem fet» de cada infant (de l'últim trimestre o de tot).
// El docent en pot fer un per a cada infant de la classe per donar-lo a la família.
(window.XIU_MODULS ||= []).push((A) => {
  const { I } = A, t = (k) => A.t(k);
  A.textos({
    ca: { album: 'Àlbum de records', albumP: 'Les fotos i les notes de «Ho hem fet», en un PDF per guardar o imprimir.', trimestre: 'Últims 3 mesos', totAlbum: 'Tot', albumCap: 'Encara no hi ha res a l\'àlbum: feu servir «Ho hem fet» (amb una foto o una nota) a les propostes.',
      albumTots: 'Àlbums de tota la classe', propostesFetes: '{n} propostes fetes', deFins: '{a} – {b}' },
    es: { album: 'Álbum de recuerdos', albumP: 'Las fotos y las notas de «Lo hemos hecho», en un PDF para guardar o imprimir.', trimestre: 'Últimos 3 meses', totAlbum: 'Todo', albumCap: 'Todavía no hay nada en el álbum: usad «Lo hemos hecho» (con una foto o una nota) en las propuestas.',
      albumTots: 'Álbumes de toda la clase', propostesFetes: '{n} propuestas hechas', deFins: '{a} – {b}' },
  });
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  function pagines(doc, x, desde, primera) {
    const fs = A.INFANTS.deInfant(x.id).filter((f) => A.perId[f.r] && (!desde || new Date(f.d) >= desde)).sort((a, b) => new Date(a.d) - new Date(b.d));
    if (!fs.length) return false;
    const data = (d) => A.quanEs(d);
    // portada
    if (!primera) doc.addPage();
    doc.setFillColor(244, 240, 232); doc.rect(0, 0, 210, 297, 'F');
    doc.setFillColor(...hex(x.color)); doc.circle(105, 100, 30, 'F');
    doc.setTextColor(255, 255, 255); doc.setFont('times', 'bold'); doc.setFontSize(40); doc.text(x.nom.charAt(0).toUpperCase(), 105, 114, { align: 'center' });
    doc.setTextColor(56, 51, 46); doc.setFontSize(30); doc.text(t('album').toUpperCase(), 105, 160, { align: 'center' });
    doc.setFont('times', 'bolditalic'); doc.setFontSize(34); doc.text(x.nom, 105, 178, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(12); doc.setTextColor(120, 102, 84);
    doc.text(t('deFins').replace('{a}', data(fs[0].d)).replace('{b}', data(fs.at(-1).d)), 105, 192, { align: 'center' });
    doc.text(t('propostesFetes').replace('{n}', new Set(fs.map((f) => f.r)).size), 105, 200, { align: 'center' });
    doc.setFont('times', 'bold'); doc.setFontSize(18); doc.setTextColor(56, 51, 46); doc.text('XIU', 105, 270, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.text(t('tag'), 105, 276, { align: 'center' });
    // records: dos per pàgina
    fs.forEach((f, i) => {
      if (i % 2 === 0) { doc.addPage(); doc.setFillColor(251, 249, 245); doc.rect(0, 0, 210, 297, 'F'); }
      const y0 = i % 2 === 0 ? 14 : 154, r = A.perId[f.r], area = A.AREES[r.area];
      doc.setDrawColor(221, 208, 193); doc.setFillColor(255, 255, 255); doc.roundedRect(14, y0, 182, 130, 4, 4, 'FD');
      let y = y0 + 10;
      if (f.foto) {
        const im = new Image(); im.src = f.foto;
        const w = im.naturalWidth || 4, h = im.naturalHeight || 3, max = 84, s = Math.min(160 / w, max / h);
        doc.addImage(f.foto, 'JPEG', 105 - (w * s) / 2, y, w * s, h * s); y += h * s + 8;
      } else y += 6;
      doc.setFillColor(...hex(area.color)); doc.circle(24, y - 1.5, 2, 'F');
      doc.setFont('times', 'bold'); doc.setFontSize(15); doc.setTextColor(56, 51, 46); doc.text(A.L(r.titol), 29, y);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(120, 102, 84); doc.text(`${data(f.d)} · ${area[A.lang]}`, 29, y + 6);
      if (f.nota) { doc.setFont('times', 'italic'); doc.setFontSize(12); doc.setTextColor(56, 51, 46); doc.text(doc.splitTextToSize('«' + f.nota + '»', 160).slice(0, 5), 24, y + 15); }
    });
    return true;
  }
  async function fes(quins, periode) {
    const desde = periode === 'tri' ? new Date(Date.now() - 92 * 864e5) : null;
    const doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', compress: true });
    // les fotos han d'estar carregades per saber-ne la mida
    await Promise.all(quins.flatMap((x) => A.INFANTS.deInfant(x.id).filter((f) => f.foto)).map((f) => { const im = new Image(); im.src = f.foto; return im.decode().catch(() => null); }));
    let alguna = false;
    for (const x of quins) alguna = pagines(doc, x, desde, !alguna) || alguna;
    if (!alguna) return A.avis(t('albumCap'));
    const nom = quins.length === 1 ? `XIU - ${t('album')} - ${quins[0].nom}.pdf` : `XIU - ${t('albumTots')}.pdf`;
    const m = await XP.desaPdf(new Uint8Array(doc.output('arraybuffer')), nom, { desat: t('desat') }); if (m) A.avis(m);
  }
  A.HOOKS.progresSec.push((x) => `<div class="sec"><h2>${t('album')}</h2></div><div class="caixa"><p class="sub2">${t('albumP')}</p>
    <div class="actions"><button class="btn pri" data-album="${x.id}:tri">${I.dl}${t('trimestre')}</button><button class="btn" data-album="${x.id}:tot">${I.dl}${t('totAlbum')}</button></div></div>`);
  A.HOOKS.perfil.push(() => { const inf = A.INFANTS?.llista() || []; return inf.length > 1 && A.INFANTS.docent() ? `<div class="actions" style="margin-top:8px"><button class="btn" data-album="tots:tri">${I.dl}${t('albumTots')} · ${t('trimestre')}</button></div>` : ''; });
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-album]'); if (!el) return;
    const [id, p] = el.dataset.album.split(':'), inf = A.INFANTS.llista();
    el.disabled = true; const h = el.innerHTML; el.textContent = t('fent');
    fes(id === 'tots' ? inf : inf.filter((x) => x.id === id), p).catch((err) => { console.error(err); A.avis(t('errPdf')); }).finally(() => { el.disabled = false; el.innerHTML = h; });
  });
});
