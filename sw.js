// GENERAT per scripts/web.mjs. Versió cbec8d3ded
const CAU = 'xiu-cbec8d3ded';
const FITXERS = ["./","capacitor.js","css/fonts.css","css/xiu.css","fonts/cormorant-garamond-latin-500.woff2","fonts/cormorant-garamond-latin-600.woff2","fonts/cormorant-garamond-latin-ext-500.woff2","fonts/cormorant-garamond-latin-ext-600.woff2","fonts/ephesis-latin-400.woff2","fonts/ephesis-latin-ext-400.woff2","fonts/quicksand-latin-400.woff2","fonts/quicksand-latin-500.woff2","fonts/quicksand-latin-600.woff2","fonts/quicksand-latin-700.woff2","fonts/quicksand-latin-ext-400.woff2","fonts/quicksand-latin-ext-500.woff2","fonts/quicksand-latin-ext-600.woff2","fonts/quicksand-latin-ext-700.woff2","img/apple-touch-icon.png","img/icona-192.png","img/icona-512.png","img/icona-maskable-512.png","img/icona.png","img/logo-curt.svg","img/logo.svg","index.html","js/app.js","js/carrega.js","js/contingut.js","js/fitxes.js","js/fonts.js","js/logo.js","js/moduls/avis.js","js/moduls/docents.js","js/moduls/infants.js","js/moduls/jocs.js","js/moduls/legal.js","js/moduls/veu.js","js/plataforma.js","js/textos-compte.js","js/versio.js","manifest.webmanifest","vendor/jspdf.umd.min.js","vendor/qrcode.js","xoriguer-actualitza.js"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CAU).then((c) => c.addAll(FITXERS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CAU && k !== CONT).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
const CONT = 'xiu-contingut';
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  // contingut.json (el que publica el Gestor): primer la xarxa, perquè es vegin les novetats
  if (u.pathname.endsWith('/contingut/contingut.json')) {
    e.respondWith(fetch(e.request).then((r) => { const c = r.clone(); caches.open(CONT).then((k) => k.put('contingut.json', c)); return r; })
      .catch(() => caches.open(CONT).then((k) => k.match('contingut.json'))));
    return;
  }
  // fitxers del contingut (PDF, fotos, pàgines): es desen la primera vegada que es veuen
  if (u.pathname.includes('/contingut/fitxers/')) {
    e.respondWith(caches.open(CONT).then((k) => k.match(e.request).then((r) => r || fetch(e.request).then((x) => { if (x.ok) k.put(e.request, x.clone()); return x; }))));
    return;
  }
  // l'app: primer la còpia desada (ràpid i sense connexió); si no hi és, la xarxa
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).catch(() => caches.match('./'))));
});
