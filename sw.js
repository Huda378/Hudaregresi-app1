const CACHE_NAME = 'regresi-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Fungsi interpretasi korelasi
function interpretasiKorelasi(r) {
  if (r === 0) return "Tidak ada korelasi";
  const absR = Math.abs(r);
  if ((r > -0.3 && r < 0) || (r > 0 && r <= 0.3)) return "Lemah";
  else if ((r >= -0.7 && r <= -0.3) || (r > 0.3 && r <= 0.7)) return "Sedang/Cukup";
  else if ((r >= -1 && r < -0.7) || (r > 0.7 && r < 1)) return "Kuat";
  else if (r === -1 || r === 1) return "Sempurna";
  else return "Tidak terdefinisi";
}

// Fungsi interpretasi determinasi
function interpretasiDeterminan(r2) {
  if (r2 === 0) return "Tidak ada korelasi";
  else if (r2 > 0 && r2 <= 0.25) return "Sangat lemah";
  else if (r2 > 0.25 && r2 < 0.5) return "Lemah";
  else if (r2 >= 0.5 && r2 < 0.75) return "Sedang";
  else if (r2 >= 0.75 && r2 < 0.9) return "Kuat";
  else if (r2 >= 0.9 && r2 < 1) return "Sangat kuat";
  else if (r2 === 1) return "Sempurna";
  else return "Tidak terdefinisi";
}
