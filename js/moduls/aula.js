// XIU · «Pantalla gran» (jocs i fitxes per projectar a la pissarra digital, amb torns per a tot el grup)
// i «Fem-la pas a pas» (una activitat, pas a pas, en gran i amb veu, sense haver de tocar gaire el mòbil).
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I } = A, t = (k) => A.t(k);
  A.textos({
    ca: { pantallaGran: 'Pantalla gran', surt: 'Surt', tornDe: 'Ara és el torn', seguentTorn: 'Següent torn', pasAPas: 'Fem-la pas a pas', prepara: 'Prepara-ho', pasN: 'Pas {n} de {t}',
      anterior2: 'Anterior', seguentPas2: 'Següent', llegeix: 'Llegeix-ho', veu: 'Veu', fiPas: 'Molt bé! Ho heu fet.', fiPasP: 'Voleu apuntar-ho al progrés?', temps2: 'Temps' },
    es: { pantallaGran: 'Pantalla grande', surt: 'Salir', tornDe: 'Ahora es el turno', seguentTorn: 'Siguiente turno', pasAPas: 'Hagámosla paso a paso', prepara: 'Prepáralo', pasN: 'Paso {n} de {t}',
      anterior2: 'Anterior', seguentPas2: 'Siguiente', llegeix: 'Leerlo', veu: 'Voz', fiPas: '¡Muy bien! Lo habéis hecho.', fiPasP: '¿Queréis anotarlo en el progreso?', temps2: 'Tiempo' },
  });
  const ICG = '<svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
  const ICP = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
  A.HOOKS.accions.push((r) => (r.tipus === 'joc' || r.tipus === 'fitxa' ? `<button class="btn" data-granp>${ICG}${t('pantallaGran')}</button>` : '')
    + (r.tipus === 'activitat' && (A.L(r.desenvolupament) || []).length ? `<button class="btn pri" data-pasapas="${r.id}">${ICP}${t('pasAPas')}</button>` : ''));

  /* ---------- pantalla gran amb torns ---------- */
  const de = (nom) => (A.lang === 'ca' && /^[aeiouàèéíòóúh]/i.test(nom) ? "d'" : 'de ');
  let torns = [], torn = 0;
  function barra() {
    const b = document.getElementById('granBar'); if (!b) return;
    b.innerHTML = `${torns.length ? `<span class="torn">${t('tornDe')} ${de(torns[torn % torns.length])}<b>${esc(torns[torn % torns.length])}</b></span><button class="btn" data-torn>${t('seguentTorn')} ›</button>` : '<span></span>'}<button class="btn pri" data-granp-surt>${t('surt')} ×</button>`;
  }
  function entra() {
    document.body.classList.add('granP');
    const inf = A.INFANTS?.llista() || [];
    torns = inf.map((x) => x.nom).sort(() => Math.random() - 0.5); torn = 0;
    const b = document.createElement('div'); b.id = 'granBar'; document.body.appendChild(b); barra();
    document.documentElement.requestFullscreen?.().catch(() => {});
    (document.getElementById('joc') || document.getElementById('digital'))?.scrollIntoView({ block: 'start' });
  }
  function surt() {
    document.body.classList.remove('granP'); document.getElementById('granBar')?.remove();
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }
  addEventListener('xiu-joc-fet', () => { if (torns.length && document.body.classList.contains('granP')) { torn++; barra(); } });
  A.HOOKS.despres.push(() => { if (document.body.classList.contains('granP') && !document.getElementById('joc') && !document.getElementById('digital')) surt(); });

  /* ---------- pas a pas amb veu ---------- */
  let pas = null;
  function obre(r) {
    const passos = [{ t: t('prepara'), x: A.L(r.preparacio) }, ...(A.L(r.desenvolupament) || []).map((x) => ({ x }))].filter((p) => p.x);
    pas = { r, passos, i: 0, inici: Date.now(), veu: A.ls.get('pas-veu', true), rel: null };
    const m = document.createElement('div'); m.className = 'pasapas'; m.id = 'pasapas'; document.body.appendChild(m);
    pinta(); pas.rel = setInterval(() => { const e = document.getElementById('pasTemps'); if (e) { const s = Math.floor((Date.now() - pas.inici) / 1000); e.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; } }, 1000);
    document.documentElement.requestFullscreen?.().catch(() => {});
  }
  function pinta(llegir = true) {
    const m = document.getElementById('pasapas'); if (!m || !pas) return;
    const { r, passos, i } = pas, fi = i >= passos.length, a = A.AREES[r.area];
    const il = window.XIL ? XIL.portada(r, a) : '';
    m.style.setProperty('--c', a.color);
    m.innerHTML = `<div class="pasCap"><b>${esc(A.L(r.titol))}</b><span>${I.rellotge}<span id="pasTemps">0:00</span> / ${esc(A.L(r.durada))}</span>
        <label class="interruptor"><input type="checkbox" data-pasveu ${pas.veu ? 'checked' : ''}><span></span>${t('veu')}</label><button class="tancaM" data-pastanca>×</button></div>
      <div class="pasCos">${fi ? `<div class="pasIl ok">${I.ok}</div><h2>${t('fiPas')}</h2><p>${t('fiPasP')}</p><div class="actions" style="justify-content:center"><button class="btn pri gran2" data-hofet="${r.id}" data-pastanca>${I.ok}${t('hoHemFet')}</button></div>`
        : `<div class="pasIl">${il}</div><div class="eyebrow">${passos[i].t ? esc(passos[i].t) : t('pasN').replace('{n}', i).replace('{t}', passos.length - 1)}</div><p class="pasTxt">${esc(passos[i].x)}</p>`}</div>
      <div class="pasPeu"><button class="btn" data-pasmou="-1" ${i ? '' : 'disabled'}>‹ ${t('anterior2')}</button>${fi ? '' : `<button class="btn" data-pasllegeix>${I.so || ''}${t('llegeix')}</button>`}
        <button class="btn pri" data-pasmou="1" ${fi ? 'disabled' : ''}>${t('seguentPas2')} ›</button></div>
      <div class="pasPunts">${passos.map((_, k) => `<i class="${k === i ? 'on' : k < i ? 'fet' : ''}"></i>`).join('')}<i class="${fi ? 'on' : ''}"></i></div>`;
    if (llegir && pas.veu && !fi && A.diu) A.diu(passos[i].x);
  }
  function tanca() { if (!pas) return; clearInterval(pas.rel); try { speechSynthesis.cancel(); } catch { /* */ } window.Capacitor?.Plugins?.TextToSpeech?.stop().catch(() => {}); pas = null; document.getElementById('pasapas')?.remove(); if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {}); }
  const mou = (d) => { if (!pas) return; pas.i = Math.max(0, Math.min(pas.passos.length, pas.i + d)); try { speechSynthesis.cancel(); } catch { /* */ } pinta(); };
  document.addEventListener('keydown', (e) => { if (!pas) return; if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); mou(1); } if (e.key === 'ArrowLeft') mou(-1); if (e.key === 'Escape') tanca(); });
  document.addEventListener('change', (e) => { if (e.target.matches('[data-pasveu]') && pas) { pas.veu = e.target.checked; A.ls.set('pas-veu', pas.veu); } });

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-granp],[data-granp-surt],[data-torn],[data-pasapas],[data-pasmou],[data-pasllegeix],[data-pastanca]'); if (!el) return;
    const d = el.dataset;
    if (d.granp != null) entra();
    else if (d.granpSurt != null) surt();
    else if (d.torn != null) { torn++; barra(); }
    else if (d.pasapas) obre(A.perId[d.pasapas]);
    else if (d.pasmou) mou(+d.pasmou);
    else if (d.pasllegeix != null && pas && A.diu) A.diu(pas.passos[pas.i].x);
    if (d.pastanca != null) tanca();
  });
});
