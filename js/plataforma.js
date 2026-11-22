// El que depèn de la plataforma: desar i compartir PDF, i el botó enrere d'Android.
//  - Windows / Linux (Electron): window.xiuEscriptori (escriptori/preload.js), amb el diàleg natiu de desar.
//  - Android (Capacitor): Filesystem (Documents/XIU) + Share.
//  - Web: descàrrega normal.
(function () {
  const ESC = window.xiuEscriptori || null;
  const CAP = window.Capacitor;
  const NATIU = !!(CAP && CAP.isNativePlatform && CAP.isNativePlatform());
  const FS = NATIU ? CAP.Plugins.Filesystem : null;
  const SHARE = NATIU ? CAP.Plugins.Share : null;

  const b64 = (u8) => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };

  /** Desa el PDF. Retorna un text per avisar l'usuari, o null si s'ha cancel·lat. */
  async function desaPdf(dades, nom, textos) {
    if (ESC) {
      const cami = await ESC.desaPdf(nom, dades);
      return cami ? textos.desat.replace('{p}', cami) : null;
    }
    if (NATIU) {
      const path = `XIU/${nom}`;
      await FS.writeFile({ path, data: b64(dades), directory: 'DOCUMENTS', recursive: true });
      return textos.desat.replace('{p}', 'Documents/' + path);
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([dades], { type: 'application/pdf' })); a.download = nom;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 60000);
    return null;
  }

  async function comparteix(dades, nom) {
    if (NATIU) {
      const r = await FS.writeFile({ path: nom, data: b64(dades), directory: 'CACHE' });
      await SHARE.share({ title: nom, files: [r.uri] });
      return;
    }
    const f = new File([dades], nom, { type: 'application/pdf' });
    if (navigator.canShare && navigator.canShare({ files: [f] })) {
      try { await navigator.share({ files: [f], title: nom }); } catch (e) { if (e.name !== 'AbortError') throw e; }
    }
  }

  /** Botó enrere d'Android: `enrere()` retorna false si ja som a l'inici (llavors es tanca l'app). */
  function botoEnrere(enrere) {
    if (!NATIU || !CAP.Plugins.App) return;
    CAP.Plugins.App.addListener('backButton', () => { if (!enrere()) CAP.Plugins.App.exitApp(); });
  }

  window.XP = { ESC, NATIU, desaPdf, comparteix, botoEnrere, potCompartir: () => NATIU || !!navigator.canShare };
})();
