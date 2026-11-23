// XIU · «Què fem avui?» (tres preguntes ràpides → una proposta) i «El següent pas» de cada infant (una per àrea, una mica més enllà).
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I } = A, t = (k) => A.t(k);
  A.textos({
    ca: { avuiT: 'Què fem avui?', avuiP: 'Respon tres preguntes i et proposem una sola cosa per fer ara.', avuiB: 'Tria-ho en 10 segons',
      avuiTemps: 'Quant temps teniu?', avuiOn: 'On sou?', avuiCom: 'Com està?', avuiQui: 'Per a qui?', avuiPantalla: 'Millor sense pantalla',
      temps: [['5', '5 minuts'], ['15', 'Un quart d\'hora'], ['30', 'Mitja hora o més']], llocs: [['casa', 'A casa'], ['aula', 'A l\'aula'], ['fora', 'A fora']],
      estats: [['tranquil', 'Tranquil·la, tranquil'], ['mogut', 'Amb ganes de moure\'s'], ['cansat', 'Cansada, cansat']],
      avuiProposta: 'Avui us proposem', unaAltra: 'Una altra', obre: 'Som-hi', tambe: 'També us pot anar bé', avuiCap: 'No hem trobat res amb aquestes respostes. Prova de canviar-ne alguna.',
      seguentPas: 'El següent pas', seguentPasP: 'Una proposta per àrea, una mica més enllà del que ja heu fet.', perA: 'per a {n}', totFet: 'Ho heu fet tot en aquesta àrea! 🎉' },
    es: { avuiT: '¿Qué hacemos hoy?', avuiP: 'Responde tres preguntas y te proponemos una sola cosa para hacer ahora.', avuiB: 'Elígelo en 10 segundos',
      avuiTemps: '¿Cuánto tiempo tenéis?', avuiOn: '¿Dónde estáis?', avuiCom: '¿Cómo está?', avuiQui: '¿Para quién?', avuiPantalla: 'Mejor sin pantalla',
      temps: [['5', '5 minutos'], ['15', 'Un cuarto de hora'], ['30', 'Media hora o más']], llocs: [['casa', 'En casa'], ['aula', 'En el aula'], ['fora', 'Fuera']],
      estats: [['tranquil', 'Tranquilo, tranquila'], ['mogut', 'Con ganas de moverse'], ['cansat', 'Cansado, cansada']],
      avuiProposta: 'Hoy os proponemos', unaAltra: 'Otra', obre: 'Vamos', tambe: 'También os puede ir bien', avuiCap: 'No hemos encontrado nada con estas respuestas. Prueba a cambiar alguna.',
      seguentPas: 'El siguiente paso', seguentPasP: 'Una propuesta por área, un poco más allá de lo que ya habéis hecho.', perA: 'para {n}', totFet: '¡Lo habéis hecho todo en esta área! 🎉' },
  });
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const text = (r) => norm([A.L(r.titol), A.L(r.subtitol), ...(A.L(r.materials) || []), ...(A.L(r.treballa) || [])].join(' '));
  const minuts = (r) => parseInt(A.L(r.durada), 10) || (r.tipus === 'activitat' ? 15 : 5);
  const FORA = /natura|fulla|pedr|regar|planta|jardi|parc|sorra|branq|pinya|castany/, MOU = /vest|regar|pilota|music|ball|moure|salt|cuin|pintur|trasvas|pinc/, CALMA = /massatge|conte|titell|llum|ombra|sensorial|bossa|panera|heuristic/;
  const edatI = (e) => A.EDATS.indexOf(e);
  const fetPer = (r, x) => !!x && A.INFANTS?.deInfant(x.id).some((f) => f.r === r.id);
  let resp = { temps: '15', lloc: 'casa', estat: 'tranquil', qui: null, sensePantalla: false }, salt = 0;
  function candidates() {
    const x = resp.qui && A.INFANTS?.infant(resp.qui), edats = x ? [x.edat] : (A.perfil?.edats?.length ? A.perfil.edats : null);
    return A.R.filter((r) => !A.bloquejat(r) && !(resp.sensePantalla && (r.tipus === 'joc' || r.tipus === 'fitxa')))
      .map((r) => {
        const tx = text(r), m = minuts(r);
        let p = 0;
        if (edats) { const d = Math.min(...edats.map((e) => Math.abs(edatI(e) - edatI(r.edat)))); p += d === 0 ? 6 : d === 1 ? 2 : -6; }
        p += m <= +resp.temps ? 3 : m <= +resp.temps * 1.5 ? 0 : -5;
        if (resp.lloc === 'fora') p += FORA.test(tx) ? 4 : r.tipus === 'activitat' ? -1 : -4;
        if (resp.lloc === 'aula') p += r.perfil.includes('pro') ? 2 : -2;
        if (resp.estat === 'mogut') p += MOU.test(tx) || r.area === 'mot' || r.area === 'aut' ? 3 : r.tipus === 'fitxa' ? -2 : 0;
        if (resp.estat === 'tranquil') p += CALMA.test(tx) || r.area === 'llen' || r.area === 'log' ? 2 : 0;
        if (resp.estat === 'cansat') p += CALMA.test(tx) || m <= 10 ? 3 : -2;
        if (x && !fetPer(r, x)) p += 2;
        return { r, p: p + ((r.id.length * 7 + salt * 13) % 10) / 20 };
      }).sort((a, b) => b.p - a.p);
  }
  const xip = (camp, v, txt) => `<button class="chip ${resp[camp] === v ? 'on' : ''}" data-avui="${camp}:${v}">${txt}</button>`;
  A.vista('avui', () => {
    const cs = candidates(), llista = cs.slice(salt % Math.max(1, Math.min(cs.length, 6)));
    const prim = llista[0]?.r, altres = llista.slice(1, 3).map((q) => q.r), inf = A.INFANTS?.llista() || [];
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH"><h1>${t('avuiT')}</h1><div class="scr">${t('avuiB')}</div><p>${t('avuiP')}</p></section>
      <div class="avuiQ"><div class="lbl">${t('avuiTemps')}</div><div class="chips">${t('temps').map(([v, x]) => xip('temps', v, x)).join('')}</div>
        <div class="lbl">${t('avuiOn')}</div><div class="chips">${t('llocs').map(([v, x]) => xip('lloc', v, x)).join('')}</div>
        <div class="lbl">${t('avuiCom')}</div><div class="chips">${t('estats').map(([v, x]) => xip('estat', v, x)).join('')}</div>
        ${inf.length ? `<div class="lbl">${t('avuiQui')}</div><div class="chips">${inf.map((x) => `<button class="chip ${resp.qui === x.id ? 'on' : ''}" data-avui="qui:${x.id}">${esc(x.nom)}</button>`).join('')}</div>` : ''}
        <label class="interruptor"><input type="checkbox" data-avui-pantalla ${resp.sensePantalla ? 'checked' : ''}><span></span><b>${t('avuiPantalla')}</b></label></div>
      ${prim ? `<div class="sec"><h2>${t('avuiProposta')}</h2><button data-avui-altra>${I.refresca || ''}${t('unaAltra')}</button></div>
        <div class="hero" data-go="#/r/${prim.id}">${A.photo(prim)}<div class="txt"><div class="eyebrow">${prim.edat} ${t('anys')} · ${esc(A.AREES[prim.area][A.lang])} · ${esc(A.L(prim.durada))}</div>
          <h3>${esc(A.L(prim.titol))}</h3><p class="scr">${esc(A.L(prim.subtitol))}</p><div class="actions"><span class="btn pri">${t('obre')}</span></div></div></div>
        ${altres.length ? `<div class="sec"><h2>${t('tambe')}</h2></div><div class="grid">${altres.map(A.card).join('')}</div>` : ''}` : `<p class="sub2">${t('avuiCap')}</p>`}`;
  });
  A.HOOKS.iniciDalt.push(() => `<button class="premB avuiB" data-go="#/avui">${I.estrella}<span><b>${t('avuiT')}</b>${t('avuiP')}</span>${I.back}</button>`);
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-avui],[data-avui-altra]'); if (!el) return;
    if (el.dataset.avui) { const [k, v] = el.dataset.avui.split(':'); resp[k] = k === 'qui' && resp.qui === v ? null : v; salt = 0; }
    else salt++;
    A.render(true);
  });
  document.addEventListener('change', (e) => { if (e.target.matches('[data-avui-pantalla]')) { resp.sensePantalla = e.target.checked; salt = 0; A.render(true); } });

  /* ---------- El següent pas de cada infant ---------- */
  function seguentPas(x) {
    const ie = edatI(x.edat), fets = new Set(A.INFANTS.deInfant(x.id).map((f) => f.r));
    return Object.keys(A.AREES).map((k) => {
      const c = A.R.filter((r) => r.area === k && !fets.has(r.id) && !A.bloquejat(r) && edatI(r.edat) >= ie - 1)
        .sort((a, b) => Math.abs(edatI(a.edat) - ie - 0.3) - Math.abs(edatI(b.edat) - ie - 0.3) || (a.ordre ?? 1e6) - (b.ordre ?? 1e6) || a.id.localeCompare(b.id));
      return { k, r: c[0] || null };
    });
  }
  A.HOOKS.progresSec.push((x) => { const sp = seguentPas(x).filter((q) => q.r);
    return sp.length ? `<div class="sec"><h2>${t('seguentPas')}</h2></div><p class="sub2" style="margin-bottom:10px">${t('seguentPasP')}</p><div class="row">${sp.map((q) => A.card(q.r)).join('')}</div>` : ''; });
  A.HOOKS.inici.push(() => {
    const id = A.ls.get('infant-actiu', null), x = id && A.INFANTS?.infant(id); if (!x) return '';
    const sp = seguentPas(x).filter((q) => q.r); if (!sp.length) return '';
    return `<div class="sec"><h2>${t('seguentPas')} <small>${t('perA').replace('{n}', esc(x.nom))}</small></h2><button data-go="#/progres/${x.id}">${t('veureProgres')}</button></div><div class="row">${sp.map((q) => A.card(q.r)).join('')}</div>`;
  });
});
