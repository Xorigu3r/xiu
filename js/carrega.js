// D'on surt el contingut de XIU (fitxes, activitats, fotos):
//   · la web publicada (https://xorigu3r.github.io/xiu/contingut/), on el Gestor hi afegeix coses noves;
//   · una còpia desada al dispositiu (la darrera que s'ha baixat), per quan no hi ha connexió;
//   · la còpia que porta l'app de fàbrica (js/contingut.js), per al primer cop sense connexió.
// Es fa servir la més nova. En obrir l'app (i en tornar-hi) es mira si a la web n'hi ha una de més nova:
// si n'hi ha, es desa i l'app es refresca (event «xiu-contingut»).
(function () {
  const REMOT = 'https://xorigu3r.github.io/xiu/';
  const CAP = window.Capacitor;
  const natiu = !!(CAP && CAP.isNativePlatform && CAP.isNativePlatform());
  const web = /^https?:$/.test(location.protocol) && !natiu && !window.xiuEscriptori;
  const BASE = web ? '' : REMOT; // la web llegeix el contingut del seu mateix lloc; l'APK i el .exe, de la web publicada

  function posa(p) { window.XIU_PAQUET_ACTUAL = p; window.XIU_BIB = p.biblioteca; window.XIU_RECURSOS = p.recursos; }
  let p = window.XIU_PAQUET;
  try { const desat = JSON.parse(localStorage.getItem('xiu-paquet') || 'null'); if (desat && desat.actualitzat > p.actualitzat) p = desat; } catch (e) { /* sense còpia */ }
  posa(p);

  /** Adreça d'un fitxer de contingut (foto, PDF, pàgina). */
  window.XIU_URL = (src) => (!src || /^(https?:|data:|blob:)/.test(src) ? src : src.startsWith('contingut/') ? BASE + src : src);

  let mirant = false, darrera = 0;
  async function comprova() {
    if (mirant || Date.now() - darrera < 60000) return; // com a molt, un cop per minut
    mirant = true; darrera = Date.now();
    try {
      const r = await fetch(BASE + 'contingut/contingut.json?t=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) return;
      const n = await r.json(), ara = window.XIU_PAQUET_ACTUAL;
      if (!n.versio || n.versio === ara.versio || n.actualitzat < ara.actualitzat) return;
      try { localStorage.setItem('xiu-paquet', JSON.stringify(n)); } catch (e) { /* ple: es farà servir igualment ara */ }
      posa(n);
      dispatchEvent(new Event('xiu-contingut'));
    } catch (e) { /* sense connexió: ja tenim una còpia */ } finally { mirant = false; }
  }
  window.XIU_COMPROVA = comprova;
  addEventListener('load', () => setTimeout(comprova, 400));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) comprova(); });
})();
