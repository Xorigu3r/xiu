// XIU · «Què fem avui?» (tres preguntes ràpides → una proposta) i «El següent pas» de cada infant (una per àrea, una mica més enllà).
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I } = A, t = (k) => A.t(k);
  A.textos({
    ca: { ctaCompte: 'Crea el teu compte (és gratuït) per afegir-hi els teus infants: XIU et proposarà activitats per a cadascú i en guardarà el progrés.', ctaInfants: 'Afegeix els teus infants i XIU et proposarà activitats per a cadascú, segons la seva edat i el que li agrada.', perGrup: 'Per al vostre grup',
      avuiT: 'Què fem avui?', avuiP: 'Respon tres preguntes i et proposem una sola cosa per fer ara.', avuiB: 'Tria-ho en 10 segons',
      avuiTemps: 'Quant temps teniu?', avuiOn: 'On sou?', avuiCom: 'Com està?', avuiQui: 'Per a qui?', avuiPantalla: 'Millor sense pantalla',
      temps: [['5', '5 minuts'], ['15', 'Un quart d\'hora'], ['30', 'Mitja hora o més']], llocs: [['casa', 'A casa'], ['aula', 'A l\'aula'], ['fora', 'A fora']],
      estats: [['tranquil', 'Tranquil·la, tranquil'], ['mogut', 'Amb ganes de moure\'s'], ['cansat', 'Cansada, cansat']],
      avuiProposta: 'Avui us proposem', unaAltra: 'Una altra', obre: 'Som-hi', tambe: 'També us pot anar bé', avuiCap: 'No hem trobat res amb aquestes respostes. Prova de canviar-ne alguna.',
      seguentPas: 'El següent pas', seguentPasP: 'Una proposta per àrea, una mica més enllà del que ja heu fet.', perA: 'per a {n}', totFet: 'Ho heu fet tot en aquesta àrea! 🎉' },
    es: { ctaCompte: 'Crea tu cuenta (es gratis) para añadir a tus niños y niñas: XIU te propondrá actividades para cada uno y guardará su progreso.', ctaInfants: 'Añade a tus niños y niñas y XIU te propondrá actividades para cada uno, según su edad y lo que le gusta.', perGrup: 'Para vuestro grupo',
      avuiT: '¿Qué hacemos hoy?', avuiP: 'Responde tres preguntas y te proponemos una sola cosa para hacer ahora.', avuiB: 'Elígelo en 10 segundos',
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
  // Bloc 1 de l'Inici: una proposta per a avui (per a l'infant que juga o les edats del perfil); «Una altra» en dona una altra
  let saltHero = 0;
  A.HOOKS.bloc1.push(() => {
    const id = A.ls.get('infant-actiu', null), x = id && A.INFANTS?.infant(id);
    const edats = x ? [x.edat] : (A.perfil?.edats?.length ? A.perfil.edats : A.EDATS);
    const fets = new Set(x ? A.INFANTS.deInfant(x.id).map((f) => f.r) : []), gust = x ? interessos(x) : null;
    const cs = A.R.filter((r) => !r.quotidiana && !A.bloquejat(r) && !fets.has(r.id) && edats.some((e) => Math.abs(edatI(e) - edatI(r.edat)) <= (x ? 0 : 1)))
      .map((r) => ({ r, p: (gust && gust.test(text(r)) ? 3 : 0) + (r.tipus === 'activitat' ? 1 : 0) + ((r.id.length * 13 + Math.floor(Date.now() / 864e5) * 7) % 11) / 10 }))
      .sort((a, b) => b.p - a.p);
    if (!cs.length) return '';
    const r = cs[saltHero % cs.length].r;
    return `<div class="hero avuiHero" data-go="#/r/${r.id}">${A.photo(r)}<div class="txt"><div class="eyebrow">${x ? t('perA').replace('{n}', esc(x.nom)) + ' · ' : ''}${r.edat} ${t('anys')} · ${esc(A.AREES[r.area][A.lang])}</div>
      <h3>${esc(A.L(r.titol))}</h3><p class="scr">${esc(A.L(r.subtitol))}</p>
      <div class="actions"><span class="btn pri">${t('obre')}</span><button class="btn" data-hero-altra>${t('unaAltra')}</button></div></div></div>`;
  });
  document.addEventListener('click', (e) => { if (e.target.closest('[data-hero-altra]')) { e.stopPropagation(); saltHero++; A.render(true); } }, true);
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-avui],[data-avui-altra]'); if (!el) return;
    if (el.dataset.avui) { const [k, v] = el.dataset.avui.split(':'); resp[k] = k === 'qui' && resp.qui === v ? null : v; salt = 0; }
    else salt++;
    A.render(true);
  });
  document.addEventListener('change', (e) => { if (e.target.matches('[data-avui-pantalla]')) { resp.sensePantalla = e.target.checked; salt = 0; A.render(true); } });

  /* ---------- El següent pas de cada infant (tenint en compte els seus interessos) ---------- */
  const PARAULES = { animals: /animal|ocell|peix|conill|gos|gat|drac/, musica: /music|canco|so|ritme|pots/, natura: /natura|fulla|planta|regar|castany|pedr|flor|llavor|tardor/,
    construir: /constru|caixa|apil|encaix|tapes|pots/, pintar: /pint|color|dibuix|mascar|pinzell/, contes: /conte|titell|lletr|paraul|llibre/, cuina: /cuin|recept|fruit|pa |macedonia|panell/,
    moure: /mou|ball|salt|pilota|vest|recerca/, experiments: /experiment|iman|volca|ombr|flota|llum|aigua/ };
  function interessos(x) { const ks = (x.interessos || []).filter((k) => PARAULES[k]); return ks.length ? new RegExp(ks.map((k) => PARAULES[k].source).join('|')) : null; }
  function seguentPas(x) {
    const ie = edatI(x.edat), fets = new Set(A.INFANTS.deInfant(x.id).map((f) => f.r)), gust = interessos(x);
    return Object.keys(A.AREES).map((k) => {
      const c = A.R.filter((r) => r.area === k && !fets.has(r.id) && !A.bloquejat(r) && edatI(r.edat) >= ie - 1)
        .sort((a, b) => ((gust && gust.test(text(b)) ? 1 : 0) - (gust && gust.test(text(a)) ? 1 : 0)) || Math.abs(edatI(a.edat) - ie - 0.3) - Math.abs(edatI(b.edat) - ie - 0.3) || (a.ordre ?? 1e6) - (b.ordre ?? 1e6) || a.id.localeCompare(b.id));
      return { k, r: c[0] || null };
    });
  }
  A.HOOKS.progresSec.push((x) => { const sp = seguentPas(x).filter((q) => q.r);
    return sp.length ? `<div class="sec"><h2>${t('seguentPas')}</h2></div><p class="sub2" style="margin-bottom:10px">${t('seguentPasP')}</p><div class="row">${sp.map((q) => A.card(q.r)).join('')}</div>` : ''; });
  // Bloc 3 de l'Inici: propostes per a cada infant (o per al grup, si és docent)
  A.HOOKS.bloc3.push(() => {
    const inf = A.INFANTS?.llista() || [];
    if (A.perfil?.tipus === 'pro' || !inf.length) {
      const edats = A.perfil?.edats?.length ? A.perfil.edats : null;
      const rs = edats ? A.R.filter((r) => edats.includes(r.edat) && !A.bloquejat(r)).sort((a, b) => (b.novetat ? 1 : 0) - (a.novetat ? 1 : 0)).slice(0, 10) : [];
      return `${!inf.length ? `<div class="caixa ctaInf"><p class="sub2">${A.compte ? t('ctaInfants') : t('ctaCompte')}</p><div class="actions">${A.compte ? `<button class="btn pri" data-inf-nou>+ ${t('afegeixInfant')}</button>` : `<button class="btn pri" data-go="#/compte" data-cmode="registre">${t('creaCompte')}</button><button class="btn" data-go="#/compte" data-cmode="entra">${t('entra')}</button>`}</div></div>` : ''}
        ${rs.length ? `<div class="sec"><h2>${A.perfil?.tipus === 'pro' ? t('perGrup') : t('perATu')} <small>${edats.join(', ')} ${t('anys')}</small></h2></div><div class="row">${rs.map(A.card).join('')}</div>` : ''}`;
    }
    return inf.slice(0, 4).map((x) => { const sp = seguentPas(x).filter((q) => q.r);
      return `<div class="perInf"><div class="perInfCap">${A.INFANTS.avatar(x)}<div><b>${esc(x.nom)}</b><small>${x.edat} ${t('anys')}</small></div><button data-go="#/progres/${x.id}">${t('veureProgres')}</button></div>
        ${sp.length ? `<div class="row">${sp.map((q) => A.card(q.r)).join('')}</div>` : `<p class="sub2">${t('totFet')}</p>`}</div>`; }).join('');
  });
});
