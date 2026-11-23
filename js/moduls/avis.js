// XIU · Avís setmanal de la «proposta de la setmana» (app d'Android, amb @capacitor/local-notifications).
// Es pot activar o desactivar a Perfil. Cada dilluns a les 9 h; en tocar-lo s'obre la proposta.
(window.XIU_MODULS ||= []).push((A) => {
  const t = (k) => A.t(k);
  const LN = () => window.Capacitor?.Plugins?.LocalNotifications;
  A.textos({
    ca: { avisos: 'Avisos', avisSetmana: 'Avisa\'m de la proposta de la setmana', avisSetmanaP: 'Cada dilluns a les 9 del matí.', avisT: 'Proposta de la setmana', avisB: '{p} · Toca per veure-la.', avisNoPermes: "Cal donar permís de notificacions a XIU (a la configuració del mòbil)." },
    es: { avisos: 'Avisos', avisSetmana: 'Avísame de la propuesta de la semana', avisSetmanaP: 'Cada lunes a las 9 de la mañana.', avisT: 'Propuesta de la semana', avisB: '{p} · Toca para verla.', avisNoPermes: 'Hay que dar permiso de notificaciones a XIU (en la configuración del móvil).' },
  });
  if (!LN()) return;   // web i escriptori: no
  let actiu = A.ls.get('avis-setmana', false);
  async function programa() {
    try {
      await LN().cancel({ notifications: [{ id: 7001 }] });
      if (!actiu) return;
      const h = A.perId[A.BIB.temporada?.destacat];
      await LN().schedule({ notifications: [{ id: 7001, title: t('avisT'), body: t('avisB').replace('{p}', h ? A.L(h.titol) : 'XIU'), schedule: { on: { weekday: 2, hour: 9, minute: 0 }, allowWhileIdle: true }, extra: { ruta: h ? '#/r/' + h.id : '#/' } }] });
    } catch (e) { console.warn('avís', e); }
  }
  A.HOOKS.perfil.push(() => `<div class="sec"><h2>${t('avisos')}</h2></div><div class="caixa"><label class="interruptor" style="margin-top:0"><input type="checkbox" data-avis-setmana ${actiu ? 'checked' : ''}><span></span><b>${t('avisSetmana')}</b></label><p class="sub2">${t('avisSetmanaP')}</p></div>`);
  document.addEventListener('change', async (e) => {
    if (!e.target.matches('[data-avis-setmana]')) return;
    actiu = e.target.checked;
    if (actiu) { const p = await LN().requestPermissions().catch(() => ({})); if (p.display !== 'granted') { actiu = false; e.target.checked = false; A.avis(t('avisNoPermes')); } }
    A.ls.set('avis-setmana', actiu); programa();
  });
  LN().addListener('localNotificationActionPerformed', (a) => { const r = a?.notification?.extra?.ruta; if (r) A.go(r); });
  programa();   // cada cop que s'obre, amb la proposta de la setmana d'ara
  addEventListener('xiu-contingut', programa);
});
