// XIU · Eines per a l'aula (i també per a casa): programació setmanal, observacions de cada infant (amb informe PDF),
// compartir una proposta amb les famílies (enllaç i codi QR) i imprimir una fitxa per a tota la classe (amb el nom de cada infant).
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I, ls } = A, t = (k) => A.t(k);
  const WEB = 'https://xorigu3r.github.io/xiu/';
  let programa = ls.get('programa', {}), obs = ls.get('observacions', []);
  const desaP = () => ls.set('programa', programa), desaO = () => ls.set('observacions', obs);
  const docent = () => A.perfil && A.perfil.tipus === 'pro';
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const dilluns = (d) => { const x = new Date(d); x.setHours(12, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
  let setmana = dilluns(new Date());
  A.VISTA_OBS = true;
  A.textos({
    ca: {
      programacio: 'Programació', programacioCasa: 'El meu calendari', programacioP: 'Planifica les propostes de cada dia. Afegeix-les des de cada proposta amb «Planifica».',
      planifica: 'Planifica', quinDia: 'Quin dia la vols fer?', afegida: 'Afegida al {d}.', setmanaDe: 'Setmana del {d}', avui: 'Avui', anterior: 'Anterior', seguent2: 'Següent',
      diaBuit: '—', imprimeixSetmana: 'Imprimeix la setmana', treu: 'Treu', dies: ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge'],
      eines: "Eines per a l'aula", einesCasa: 'Organitza-ho', observacio: 'Observacions', obsNova: 'Nova observació', obsArea: 'Àrea', obsNivell: 'Com ho fa',
      nivells: ['Inicia', 'En procés', 'Ho aconsegueix'], obsText: 'Què has observat?', obsData: 'Data', obsCap: 'Encara no hi ha cap observació.',
      informe: 'Informe en PDF', informeT: 'Informe de seguiment', fetes: 'Propostes fetes', comparteix: 'Comparteix amb les famílies', comparteixCasa: "Envia l'enllaç",
      comparteixP: 'Ensenya aquest codi QR o envia l\'enllaç: la proposta s\'obrirà directament a XIU.', copia: "Copia l'enllaç", copiat: 'Enllaç copiat.', envia2: 'Envia',
      perClasse: 'Imprimeix per a la classe', perClasseP: 'Una còpia per a cada infant, amb el seu nom.', senseNoms: 'Còpies sense nom', copies: 'Còpies', fentPdf: 'Preparant el PDF…',
      triaTots: 'Tots', capInfant: 'Afegeix els infants de la classe al teu perfil per posar-hi els noms.', imprimeix: 'Fes el PDF',
    },
    es: {
      programacio: 'Programación', programacioCasa: 'Mi calendario', programacioP: 'Planifica las propuestas de cada día. Añádelas desde cada propuesta con «Planificar».',
      planifica: 'Planificar', quinDia: '¿Qué día la quieres hacer?', afegida: 'Añadida al {d}.', setmanaDe: 'Semana del {d}', avui: 'Hoy', anterior: 'Anterior', seguent2: 'Siguiente',
      diaBuit: '—', imprimeixSetmana: 'Imprimir la semana', treu: 'Quitar', dies: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      eines: 'Herramientas para el aula', einesCasa: 'Organízalo', observacio: 'Observaciones', obsNova: 'Nueva observación', obsArea: 'Área', obsNivell: 'Cómo lo hace',
      nivells: ['Inicia', 'En proceso', 'Lo consigue'], obsText: '¿Qué has observado?', obsData: 'Fecha', obsCap: 'Todavía no hay ninguna observación.',
      informe: 'Informe en PDF', informeT: 'Informe de seguimiento', fetes: 'Propuestas hechas', comparteix: 'Compartir con las familias', comparteixCasa: 'Enviar el enlace',
      comparteixP: 'Enseña este código QR o envía el enlace: la propuesta se abrirá directamente en XIU.', copia: 'Copiar el enlace', copiat: 'Enlace copiado.', envia2: 'Enviar',
      perClasse: 'Imprimir para la clase', perClasseP: 'Una copia para cada niño o niña, con su nombre.', senseNoms: 'Copias sin nombre', copies: 'Copias', fentPdf: 'Preparando el PDF…',
      triaTots: 'Todos', capInfant: 'Añade a los niños y niñas de la clase en tu perfil para poner sus nombres.', imprimeix: 'Hacer el PDF',
    },
  });
  const dataLlarga = (d) => new Date(d).toLocaleDateString(A.lang === 'es' ? 'es-ES' : 'ca-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  const desaPdf = (doc, nom) => XP.desaPdf(new Uint8Array(doc.output('arraybuffer')), nom, { desat: t('desat') }).then((m) => m && A.avis(m)).catch(() => A.avis(t('errPdf')));

  /* ---------- accions a cada proposta ---------- */
  A.HOOKS.accions.push((r) => `<button class="btn" data-planifica="${r.id}">${I.rellotge}${t('planifica')}</button>
    <button class="btn" data-qr="${r.id}">${I.share}${docent() ? t('comparteix') : t('comparteixCasa')}</button>
    ${docent() && r.tipus === 'fitxa' ? `<button class="btn" data-classe="${r.id}">${I.print}${t('perClasse')}</button>` : ''}`);
  A.HOOKS.perfil.push(() => `<div class="sec"><h2>${docent() ? t('eines') : t('einesCasa')}</h2></div>
    <div class="llistaMes"><button data-go="#/programacio">${I.rellotge}<span>${docent() ? t('programacio') : t('programacioCasa')}</span>${I.back}</button></div>`);

  function planifica(r) {
    const m = A.modal(`<h2>${t('planifica')}</h2><p>${esc(A.L(r.titol))}</p><form class="formC" style="text-align:left;margin-top:14px" novalidate>
      <label>${t('quinDia')}<input type="date" name="dia" value="${iso(new Date())}" required></label>
      <div class="actions"><span style="flex:1"></span><button type="button" class="btn" data-tanca>${t('cancelaB')}</button><button class="btn pri" type="submit">${t('planifica')}</button></div></form>`);
    m.onclick = (e) => { if (e.target === m || e.target.closest('[data-tanca]')) m.remove(); };
    m.querySelector('form').onsubmit = (e) => {
      e.preventDefault(); const d = e.target.dia.value; if (!d) return;
      (programa[d] ||= []).includes(r.id) || programa[d].push(r.id); desaP(); m.remove();
      A.avis(t('afegida').replace('{d}', dataLlarga(d + 'T12:00')));
    };
  }
  A.vista('programacio', () => {
    const dies = Array.from({ length: 7 }, (_, i) => { const d = new Date(setmana); d.setDate(d.getDate() + i); return d; });
    const avui = iso(new Date());
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH"><h1>${docent() ? t('programacio') : t('programacioCasa')}</h1><div class="scr">${t('setmanaDe').replace('{d}', setmana.toLocaleDateString(A.lang === 'es' ? 'es-ES' : 'ca-ES', { day: 'numeric', month: 'long' }))}</div><p>${t('programacioP')}</p></section>
      <div class="actions"><button class="btn" data-setm="-1">‹ ${t('anterior')}</button><button class="btn" data-setm="0">${t('avui')}</button><button class="btn" data-setm="1">${t('seguent2')} ›</button><span style="flex:1"></span><button class="btn" data-imp-setm>${I.print}${t('imprimeixSetmana')}</button></div>
      <div class="setmana">${dies.map((d, i) => { const k = iso(d), ids = (programa[k] || []).filter((id) => A.perId[id]);
        return `<div class="dia ${k === avui ? 'avui' : ''} ${i > 4 ? 'cap' : ''}"><div class="diaCap"><b>${t('dies')[i]}</b><span>${d.getDate()}/${d.getMonth() + 1}</span></div>
          ${ids.length ? ids.map((id) => { const r = A.perId[id]; return `<div class="prog" style="--c:${A.AREES[r.area].color}"><span data-go="#/r/${id}"><b>${esc(A.L(r.titol))}</b><small>${A.t(r.tipus)} · ${r.edat}</small></span><button class="mini" data-treu="${k}|${id}" title="${t('treu')}">×</button></div>`; }).join('') : `<p class="buitD">${t('diaBuit')}</p>`}</div>`; }).join('')}</div>`;
  });
  function imprimeixSetmana() {
    const { jsPDF } = window.jspdf, d = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
    d.setFont('times', 'bold'); d.setFontSize(20); d.setTextColor(56, 51, 46);
    d.text(`${docent() ? t('programacio') : t('programacioCasa')} · ${t('setmanaDe').replace('{d}', setmana.toLocaleDateString(A.lang === 'es' ? 'es-ES' : 'ca-ES', { day: 'numeric', month: 'long', year: 'numeric' }))}`, 14, 18);
    const w = (297 - 28) / 5;
    for (let i = 0; i < 5; i++) {
      const dd = new Date(setmana); dd.setDate(dd.getDate() + i);
      const x = 14 + i * w; d.setDrawColor(221, 208, 193); d.roundedRect(x, 26, w - 3, 170, 3, 3);
      d.setFont('helvetica', 'bold'); d.setFontSize(11); d.text(`${t('dies')[i]} ${dd.getDate()}/${dd.getMonth() + 1}`, x + 4, 34);
      let y = 42; d.setFont('helvetica', 'normal'); d.setFontSize(10);
      for (const id of programa[iso(dd)] || []) { const r = A.perId[id]; if (!r) continue; const ls2 = d.splitTextToSize('• ' + A.L(r.titol), w - 10); d.text(ls2, x + 4, y); y += ls2.length * 4.6 + 1; d.setTextColor(120, 102, 84); d.text(`   ${A.AREES[r.area][A.lang]} · ${r.edat}`, x + 4, y); d.setTextColor(56, 51, 46); y += 7; }
    }
    d.setFontSize(9); d.setTextColor(120, 102, 84); d.text('XIU · ' + t('tag'), 14, 203);
    desaPdf(d, `XIU - ${t('programacio')} ${iso(setmana)}.pdf`);
  }

  /* ---------- observacions de cada infant ---------- */
  A.vista('observacio', ([id]) => {
    const x = A.INFANTS?.infant(id); if (!x) return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>`;
    const os = obs.filter((o) => o.i === id);
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <div class="infCap">${A.INFANTS.avatar(x, 'gran')}<div><h1>${esc(x.nom)}</h1><div class="sub2">${t('observacio')}</div></div></div>
      <form data-form="obs" data-i="${id}" class="formC caixa" novalidate><h3>${t('obsNova')}</h3>
        <div class="dos"><label>${t('obsData')}<input type="date" name="d" value="${iso(new Date())}"></label>
        <label>${t('obsArea')}<select name="a">${Object.entries(A.AREES).map(([k, a]) => `<option value="${k}">${esc(a[A.lang])}</option>`).join('')}</select></label></div>
        <div class="lblF">${t('obsNivell')}</div><div class="chips">${t('nivells').map((n, i) => `<label class="chip ${i === 1 ? 'on' : ''}"><input type="radio" name="n" value="${i}" ${i === 1 ? 'checked' : ''} hidden>${n}</label>`).join('')}</div>
        <label>${t('obsText')}<textarea name="txt" rows="3"></textarea></label><div class="err"></div><button class="btn pri" type="submit">${t('desaB')}</button></form>
      <div class="actions"><button class="btn" data-informe="${id}">${I.dl}${t('informe')}</button></div>
      <div class="historial">${os.length ? os.map((o) => `<div class="hist"><span class="nivell n${o.n}">${t('nivells')[o.n]}</span><div><b>${esc(A.AREES[o.a][A.lang])}</b><small>${A.quanEs(o.d + 'T12:00')}</small><p>${esc(o.txt)}</p></div><button class="mini" data-obs-esb="${o.id}">${t('esborraFet')}</button></div>`).join('') : `<p class="sub2">${t('obsCap')}</p>`}</div>`;
  });
  document.addEventListener('change', (e) => { if (e.target.name === 'n' && e.target.form?.dataset.form === 'obs') e.target.form.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c.contains(e.target))); });
  document.addEventListener('submit', (e) => {
    const f = e.target; if (f.dataset.form !== 'obs') return;
    e.preventDefault();
    const v = Object.fromEntries(new FormData(f));
    if (!(v.txt || '').trim()) { f.querySelector('.err').textContent = t('obsText'); return; }
    obs.unshift({ id: Math.random().toString(36).slice(2, 9), i: f.dataset.i, d: v.d || iso(new Date()), a: v.a, n: +v.n, txt: v.txt.trim() }); desaO(); A.render(true);
  });
  function informe(id) {
    const x = A.INFANTS.infant(id), { jsPDF } = window.jspdf, d = new jsPDF({ unit: 'mm', format: 'a4' });
    let y = 20; const nova = (h) => { if (y + h > 280) { d.addPage(); y = 20; } };
    d.setFont('times', 'bold'); d.setFontSize(22); d.setTextColor(56, 51, 46); d.text(t('informeT'), 20, y); y += 10;
    d.setFont('helvetica', 'normal'); d.setFontSize(12); d.text(`${x.nom} · ${x.edat} ${t('anys2')} · ${A.quanEs(new Date())}`, 20, y); y += 12;
    for (const [k, a] of Object.entries(A.AREES)) {
      const os = obs.filter((o) => o.i === id && o.a === k), fets = A.INFANTS.deInfant(id).filter((f) => A.perId[f.r]?.area === k);
      if (!os.length && !fets.length) continue;
      nova(20); d.setFont('helvetica', 'bold'); d.setFontSize(13); d.text(a[A.lang], 20, y); y += 7;
      d.setFont('helvetica', 'normal'); d.setFontSize(10);
      if (fets.length) { const txt = d.splitTextToSize(`${t('fetes')}: ${[...new Set(fets.map((f) => A.L(A.perId[f.r].titol)))].join(', ')}`, 170); nova(txt.length * 5); d.text(txt, 20, y); y += txt.length * 5 + 2; }
      for (const o of os) { const txt = d.splitTextToSize(`${A.quanEs(o.d + 'T12:00')} · ${t('nivells')[o.n]} — ${o.txt}`, 165); nova(txt.length * 5); d.text(txt, 24, y); y += txt.length * 5 + 2; }
      y += 4;
    }
    d.setFontSize(9); d.setTextColor(120, 102, 84); d.text('XIU · ' + t('tag'), 20, 290);
    desaPdf(d, `XIU - ${t('informeT')} - ${x.nom}.pdf`);
  }

  /* ---------- compartir amb les famílies (enllaç i QR) ---------- */
  function comparteix(r) {
    const url = `${WEB}#/r/${r.id}`;
    let qr = '';
    try { const q = window.qrcode(0, 'M'); q.addData(url); q.make(); qr = q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); } catch { /* sense QR */ }
    const m = A.modal(`<h2>${docent() ? t('comparteix') : t('comparteixCasa')}</h2><p>${esc(A.L(r.titol))}</p><div class="qr">${qr}</div><p class="sub2">${t('comparteixP')}</p>
      <input class="enllacQr" value="${esc(url)}" readonly><div class="actions" style="justify-content:center"><button class="btn" data-copia>${t('copia')}</button>${XP.NATIU || navigator.share ? `<button class="btn pri" data-envia>${t('envia2')}</button>` : ''}<button class="btn" data-tanca>×</button></div>`);
    m.onclick = async (e) => {
      if (e.target === m || e.target.closest('[data-tanca]')) m.remove();
      if (e.target.closest('[data-copia]')) { try { await navigator.clipboard.writeText(url); } catch { m.querySelector('.enllacQr').select(); document.execCommand('copy'); } A.avis(t('copiat')); }
      if (e.target.closest('[data-envia]')) {
        const text = `${A.L(r.titol)} · XIU`;
        try { if (XP.NATIU && window.Capacitor.Plugins.Share) await window.Capacitor.Plugins.Share.share({ title: text, text, url }); else await navigator.share({ title: text, text, url }); } catch { /* cancel·lat */ }
      }
    };
  }

  /* ---------- una fitxa per a tota la classe ---------- */
  function perClasse(r) {
    const inf = A.INFANTS ? A.INFANTS.llista() : [];
    const m = A.modal(`<h2>${t('perClasse')}</h2><p>${t('perClasseP')}</p><form class="formC" style="text-align:left;margin-top:14px" novalidate>
      ${inf.length ? `<div class="chips infTria">${inf.map((x) => `<label class="chip on"><input type="checkbox" name="inf" value="${esc(x.nom)}" checked>${A.INFANTS.avatar(x, 'petit')}${esc(x.nom)}</label>`).join('')}</div>` : `<p class="sub2">${t('capInfant')}</p>`}
      <label>${t('senseNoms')}<input type="number" name="buides" min="0" max="40" value="${inf.length ? 0 : 20}"></label>
      <div class="actions"><span style="flex:1"></span><button type="button" class="btn" data-tanca>${t('cancelaB')}</button><button class="btn pri" type="submit">${t('imprimeix')}</button></div></form>`);
    const f = m.querySelector('form');
    m.onclick = (e) => { if (e.target === m || e.target.closest('[data-tanca]')) m.remove(); };
    f.addEventListener('change', (e) => { if (e.target.name === 'inf') e.target.parentElement.classList.toggle('on', e.target.checked); });
    f.onsubmit = async (e) => {
      e.preventDefault();
      const noms = [...f.querySelectorAll('[name=inf]:checked')].map((c) => c.value).concat(Array(Math.max(0, Math.min(40, +f.buides.value || 0))).fill(''));
      if (!noms.length) return;
      const b = f.querySelector('[type=submit]'); b.disabled = true; b.textContent = t('fentPdf');
      try {
        const dades = await window.XFitxa.pdfAula(r, A.AREES[r.area], A.lang, { nom: t('nom'), data: t('data') }, noms);
        const msg = await XP.desaPdf(dades, `XIU - ${A.L(r.titol)} - ${t('perClasse')}.pdf`.replace(/[\\/:*?"<>|]/g, ''), { desat: t('desat') });
        m.remove(); if (msg) A.avis(msg);
      } catch (err) { console.error(err); A.avis(t('errPdf')); b.disabled = false; b.textContent = t('imprimeix'); }
    };
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-planifica],[data-qr],[data-classe],[data-setm],[data-imp-setm],[data-treu],[data-informe],[data-obs-esb]'); if (!el) return;
    const d = el.dataset;
    if (d.planifica) planifica(A.perId[d.planifica]);
    else if (d.qr) comparteix(A.perId[d.qr]);
    else if (d.classe) perClasse(A.perId[d.classe]);
    else if (d.setm != null) { if (d.setm === '0') setmana = dilluns(new Date()); else setmana.setDate(setmana.getDate() + 7 * +d.setm); A.render(true); }
    else if (d.impSetm != null) imprimeixSetmana();
    else if (d.treu) { const [k, id] = d.treu.split('|'); programa[k] = (programa[k] || []).filter((x) => x !== id); if (!programa[k].length) delete programa[k]; desaP(); A.render(true); }
    else if (d.informe) informe(d.informe);
    else if (d.obsEsb) { obs = obs.filter((o) => o.id !== d.obsEsb); desaO(); A.render(true); }
  });
});
