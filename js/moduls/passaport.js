// XIU · Passaport de les àrees: un segell per a cada àrea i cada edat quan l'infant n'ha fet prou propostes
// (3, o totes si n'hi ha menys). A la pàgina de progrés, i en PDF per imprimir (portada + pàgina de segells).
(window.XIU_MODULS ||= []).push((A) => {
  const { esc } = A, t = (k) => A.t(k);
  A.textos({
    ca: { passaport: 'Passaport de les àrees', passaportP: 'Un segell per a cada àrea i cada edat quan n\'heu fet 3 propostes (o totes, si n\'hi ha menys).', passaportPdf: 'Imprimeix el passaport',
      segellsN: (n) => n + (n == 1 ? ' segell' : ' segells'), passaportDe: 'Passaport de', propostesFetesN: '{f} de {t}' },
    es: { passaport: 'Pasaporte de las áreas', passaportP: 'Un sello para cada área y cada edad cuando hayáis hecho 3 propuestas (o todas, si hay menos).', passaportPdf: 'Imprimir el pasaporte',
      segellsN: (n) => n + (n == 1 ? ' sello' : ' sellos'), passaportDe: 'Pasaporte de', propostesFetesN: '{f} de {t}' },
  });
  const DIB = { exp: 'fulla', llen: 'flor', mot: 'castanya', log: 'estrella', cre: 'poma', aut: 'pedra' };
  function graella(x) {
    const fets = new Set(A.INFANTS.deInfant(x.id).map((f) => f.r));
    return Object.keys(A.AREES).map((k) => A.EDATS.map((e) => {
      const rs = A.R.filter((r) => r.area === k && r.edat === e), f = rs.filter((r) => fets.has(r.id)).length, cal = Math.min(3, rs.length);
      return { k, e, tot: rs.length, f, segell: rs.length > 0 && f >= cal };
    }));
  }
  const segell = (k, on, mida = 34) => `<svg viewBox="-20 -20 40 40" width="${mida}" height="${mida}" class="segell ${on ? 'on' : ''}"><circle r="18" fill="${on ? A.AREES[k].color : 'none'}" stroke="${A.AREES[k].color}" stroke-width="1.6" stroke-dasharray="${on ? '0' : '3 3'}"/>
    ${on ? `<circle r="14.5" fill="none" stroke="#fff" stroke-width="1" opacity=".7"/>${window.XFitxa ? `<g opacity=".95">${XFitxa.dibuix(DIB[k], 8).replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="#fff"').replace(/stroke="#[0-9A-Fa-f]{3,6}"/g, 'stroke="#fff"')}</g>` : ''}` : ''}</svg>`;
  A.HOOKS.progresSec.push((x) => {
    const g = graella(x), n = g.flat().filter((c) => c.segell).length;
    return `<div class="sec"><h2>${t('passaport')} <small>${t('segellsN')(n)}</small></h2><button data-passaport="${x.id}">${t('passaportPdf')}</button></div>
      <p class="sub2" style="margin-bottom:10px">${t('passaportP')}</p>
      <div class="passaport"><div class="pfila cap"><span></span>${A.EDATS.map((e) => `<b>${e}</b>`).join('')}</div>
      ${g.map((fila) => `<div class="pfila"><span>${esc(A.AREES[fila[0].k][A.lang].split(' ')[0])}</span>${fila.map((c) => `<i title="${esc(A.AREES[c.k][A.lang])} · ${c.e} · ${t('propostesFetesN').replace('{f}', c.f).replace('{t}', c.tot)}">${c.tot ? segell(c.k, c.segell) : '<em>·</em>'}</i>`).join('')}</div>`).join('')}</div>`;
  });
  async function pdf(x) {
    const g = graella(x), { jsPDF } = window.jspdf, d = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
    const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    // portada
    d.setFillColor(56, 51, 46); d.rect(0, 0, 210, 297, 'F');
    d.setDrawColor(209, 163, 90); d.setLineWidth(1.2); d.roundedRect(18, 18, 174, 261, 6, 6);
    d.setTextColor(209, 163, 90); d.setFont('times', 'bold'); d.setFontSize(16); d.text('XIU · ' + t('tag').toUpperCase(), 105, 70, { align: 'center' });
    d.setFontSize(40); d.text(t('passaport').split(' ')[0].toUpperCase(), 105, 120, { align: 'center' });
    d.setFontSize(18); d.text(t('passaport').split(' ').slice(1).join(' '), 105, 132, { align: 'center' });
    d.setFillColor(...hex(x.color)); d.circle(105, 175, 18, 'F'); d.setTextColor(255, 255, 255); d.setFontSize(26); d.text(x.nom.charAt(0).toUpperCase(), 105, 184, { align: 'center' });
    d.setTextColor(244, 240, 232); d.setFont('times', 'bolditalic'); d.setFontSize(26); d.text(x.nom, 105, 214, { align: 'center' });
    // segells
    d.addPage(); d.setFillColor(244, 240, 232); d.rect(0, 0, 210, 297, 'F');
    d.setTextColor(56, 51, 46); d.setFont('times', 'bold'); d.setFontSize(20); d.text(`${t('passaportDe')} ${x.nom}`, 105, 22, { align: 'center' });
    d.setFont('helvetica', 'normal'); d.setFontSize(10); d.setTextColor(120, 102, 84); d.text(d.splitTextToSize(t('passaportP'), 170), 105, 30, { align: 'center' });
    const x0 = 58, y0 = 52, cw = 23, ch = 36;
    A.EDATS.forEach((e, j) => { d.setFont('helvetica', 'bold'); d.setFontSize(10); d.setTextColor(56, 51, 46); d.text(e, x0 + j * cw + cw / 2, y0, { align: 'center' }); });
    g.forEach((fila, i) => {
      const y = y0 + 10 + i * ch, a = A.AREES[fila[0].k];
      d.setFont('helvetica', 'bold'); d.setFontSize(9.5); d.setTextColor(...hex(a.color)); d.text(d.splitTextToSize(a[A.lang], 40), 14, y + 10);
      fila.forEach((c, j) => {
        const cx = x0 + j * cw + cw / 2, cy = y + 12;
        if (!c.tot) { d.setTextColor(200, 190, 180); d.text('·', cx, cy + 1, { align: 'center' }); return; }
        d.setDrawColor(...hex(a.color)); d.setLineWidth(0.6);
        if (c.segell) { d.setFillColor(...hex(a.color)); d.circle(cx, cy, 9, 'FD'); d.setDrawColor(255, 255, 255); d.circle(cx, cy, 7.2); d.setTextColor(255, 255, 255); d.setFont('times', 'bold'); d.setFontSize(9); d.text('XIU', cx, cy + 1.5, { align: 'center' }); }
        else { d.setLineDashPattern([1.2, 1.2], 0); d.circle(cx, cy, 9); d.setLineDashPattern([], 0); }
      });
    });
    d.setFontSize(9); d.setTextColor(120, 102, 84); d.setFont('helvetica', 'normal'); d.text(A.quanEs(new Date()), 105, 285, { align: 'center' });
    const m = await XP.desaPdf(new Uint8Array(d.output('arraybuffer')), `XIU - ${t('passaport')} - ${x.nom}.pdf`, { desat: t('desat') }); if (m) A.avis(m);
  }
  document.addEventListener('click', (e) => { const el = e.target.closest('[data-passaport]'); if (el) pdf(A.INFANTS.infant(el.dataset.passaport)).catch(() => A.avis(t('errPdf'))); });
});
