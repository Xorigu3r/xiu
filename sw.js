// GENERAT per scripts/web.mjs. Versió 994dfaf10b
const CAU = 'xiu-994dfaf10b';
const FITXERS = ["./","capacitor.js","css/fonts.css","css/xiu.css","fonts/cormorant-garamond-latin-500.woff2","fonts/cormorant-garamond-latin-600.woff2","fonts/cormorant-garamond-latin-ext-500.woff2","fonts/cormorant-garamond-latin-ext-600.woff2","fonts/ephesis-latin-400.woff2","fonts/ephesis-latin-ext-400.woff2","fonts/quicksand-latin-400.woff2","fonts/quicksand-latin-500.woff2","fonts/quicksand-latin-600.woff2","fonts/quicksand-latin-700.woff2","fonts/quicksand-latin-ext-400.woff2","fonts/quicksand-latin-ext-500.woff2","fonts/quicksand-latin-ext-600.woff2","fonts/quicksand-latin-ext-700.woff2","img/apple-touch-icon.png","img/icona-192.png","img/icona-512.png","img/icona-maskable-512.png","img/icona.png","img/logo-curt.svg","img/logo.svg","index.html","js/app.js","js/contingut.js","js/fitxes.js","js/fonts.js","js/logo.js","js/plataforma.js","manifest.webmanifest","vendor/jspdf.umd.min.js"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CAU).then((c) => c.addAll(FITXERS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CAU).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
// primer la còpia desada (ràpid i sense connexió); si no hi és, la xarxa
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).catch(() => caches.match('./'))));
});
