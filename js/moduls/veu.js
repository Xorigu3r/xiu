// XIU · «Escolta»: llegeix en veu alta l'enunciat (per als infants que encara no llegeixen) i
// «Què tens a casa?»: cerca activitats pel material que tens a mà.
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I } = A, t = (k) => A.t(k);
  A.textos({
    ca: { escolta: 'Escolta', atura: 'Atura', senseVeu: 'Aquest aparell no pot llegir en veu alta.', material: 'Què tens a casa?', materialS: 'Tria el que tens a mà i et proposem activitats.',
      materialCerca: 'O escriu-ho: pinces, bol, cullera...', materialRes: (n) => n + (n == 1 ? ' activitat' : ' activitats'), materialBuit: 'Tria un o més materials.', materialCap: 'Cap activitat amb aquests materials. Prova de treure\'n algun.',
      materialB: 'Què tens a casa? Cerca pel material' },
    es: { escolta: 'Escuchar', atura: 'Parar', senseVeu: 'Este dispositivo no puede leer en voz alta.', material: '¿Qué tienes en casa?', materialS: 'Elige lo que tienes a mano y te proponemos actividades.',
      materialCerca: 'O escríbelo: pinzas, cuenco, cuchara...', materialRes: (n) => n + (n == 1 ? ' actividad' : ' actividades'), materialBuit: 'Elige uno o más materiales.', materialCap: 'Ninguna actividad con estos materiales. Prueba a quitar alguno.',
      materialB: '¿Qué tienes en casa? Busca por material' },
  });

  /* ---------- veu alta ---------- */
  const TTS = () => window.Capacitor?.Plugins?.TextToSpeech;
  const potParlar = () => 'speechSynthesis' in window || !!TTS();
  let parlant = false;
  function textDe(r) {
    const L = A.L, parts = [L(r.titol) + '.'];
    if (r.tipus === 'fitxa' && r.full?.exercicis) r.full.exercicis.forEach((ex, i) => parts.push(`${i + 1}. ${L(ex.text)}`));
    else if (r.tipus === 'joc') parts.push(document.querySelector('.jocAjuda')?.textContent || '');
    else if (r.tipus === 'activitat') { parts.push(L(r.intencio)); (L(r.desenvolupament) || []).forEach((x, i) => parts.push(`${i + 1}. ${x}`)); }
    if (r.subtitol && r.tipus !== 'activitat') parts.splice(1, 0, L(r.subtitol) + '.');
    return parts.filter(Boolean).join(' ');
  }
  async function parla(text, boto) {
    const llengua = A.lang === 'es' ? 'es-ES' : 'ca-ES';
    const fi = () => { parlant = false; if (boto) boto.innerHTML = I.so + t('escolta'); };
    if (parlant) { try { speechSynthesis.cancel(); } catch { /* */ } try { await TTS()?.stop(); } catch { /* */ } return fi(); }
    parlant = true; if (boto) boto.innerHTML = I.so + t('atura');
    if (TTS()) { try { await TTS().speak({ text, lang: llengua, rate: 0.9 }); } catch { A.avis(t('senseVeu')); } return fi(); }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = llengua; u.rate = 0.9;
    const veu = speechSynthesis.getVoices().find((v) => v.lang.replace('_', '-').toLowerCase().startsWith(llengua.slice(0, 2)));
    if (veu) u.voice = veu;
    u.onend = fi; u.onerror = fi;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }
  I.so = '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>';
  A.HOOKS.accions.push((r) => (potParlar() ? `<button class="btn" data-escolta="${r.id}">${I.so}${t('escolta')}</button>` : ''));

  /* ---------- què tens a casa? ---------- */
  const NO = new Set('amb per una uns unes dels dues dos tres petit petita petits petites gran grans gros grossa grosses grossos molt molts moltes diversos diverses quatre cinc sis algun alguns alguna algunes qualsevol tipus mena cosa coses tot tota tots totes con para una unos unas pequeño pequeña pequeños pequeñas grande grandes varios varias cualquier algún algunos alguna algunas todo toda todos todas cuatro cinco seis resistent resistents diferent diferents natural naturals calent calenta americana conegut coneguts opac opaca sortida forma formes mida mides color'.split(' '));
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const singular = (w) => w.replace(/(es|s)$/, '');
  let triats = new Set(), escrit = '';
  function vocabulari() {
    const n = new Map(), mostra = new Map();
    for (const r of A.R) if (r.tipus === 'activitat') for (const m of A.L(r.materials) || [])
      for (const w of m.split(/[^\p{L}·]+/u)) { const k = singular(norm(w)); if (k.length < 4 || NO.has(norm(w)) || NO.has(k)) continue; n.set(k, (n.get(k) || 0) + 1); if (!mostra.has(k)) mostra.set(k, w.toLowerCase()); }
    return [...n.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k]) => [k, mostra.get(k)]);
  }
  function resultats() {
    const claus = [...triats, ...norm(escrit).split(/[\s,;]+/).filter((w) => w.length > 2).map(singular)];
    if (!claus.length) return `<p class="sub2">${t('materialBuit')}</p>`;
    const rs = A.R.filter((r) => r.tipus === 'activitat').map((r) => { const txt = norm((A.L(r.materials) || []).join(' ')); return { r, n: claus.filter((c) => txt.includes(c)).length }; })
      .filter((q) => q.n).sort((a, b) => b.n - a.n);
    return rs.length ? `<div class="count">${t('materialRes')(rs.length)}</div><div class="grid">${rs.map((q) => A.card(q.r)).join('')}</div>` : `<p class="sub2">${t('materialCap')}</p>`;
  }
  A.vista('material', () => `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
    <section class="pageH"><h1>${t('material')}</h1><div class="scr">${t('materialS')}</div></section>
    <div class="chips matChips">${vocabulari().map(([k, w]) => `<button class="chip ${triats.has(k) ? 'on' : ''}" data-mat="${k}">${esc(w)}</button>`).join('')}</div>
    <label class="search" style="margin-top:14px">${I.search}<input id="matQ" type="search" value="${esc(escrit)}" placeholder="${t('materialCerca')}" autocomplete="off"></label>
    <div id="matRes" style="margin-top:14px">${resultats()}</div>`);
  A.HOOKS.bib.push(() => `<button class="premB matB" data-go="#/material">${I.search}<span><b>${t('material')}</b>${t('materialS')}</span>${I.back}</button>`);

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-escolta],[data-mat]'); if (!el) return;
    if (el.dataset.escolta) parla(textDe(A.perId[el.dataset.escolta]), el);
    else { const k = el.dataset.mat; triats.has(k) ? triats.delete(k) : triats.add(k); el.classList.toggle('on'); document.getElementById('matRes').innerHTML = resultats(); }
  });
  document.addEventListener('input', (e) => { if (e.target.id === 'matQ') { escrit = e.target.value; document.getElementById('matRes').innerHTML = resultats(); } });
  A.parla = parla;
  /** Diu un text (talla el que s'estigués dient). Per a la guia pas a pas. */
  A.diu = async (text) => {
    const llengua = A.lang === 'es' ? 'es-ES' : 'ca-ES';
    parlant = false;
    try { speechSynthesis.cancel(); } catch { /* */ }
    if (TTS()) { try { await TTS().stop(); await TTS().speak({ text, lang: llengua, rate: 0.9 }); } catch { /* */ } return; }
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text); u.lang = llengua; u.rate = 0.9;
    const v = speechSynthesis.getVoices().find((x) => x.lang.replace('_', '-').toLowerCase().startsWith(llengua.slice(0, 2))); if (v) u.voice = v;
    speechSynthesis.speak(u);
  };
});
