const CACHE_NAME = 'bit-ida-yap-v3';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './manifest.json',
  './btc-logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // 웹소켓이나 외부 API(Upbit, Alternative) 요청은 캐싱하지 않고 네트워크로 직접 요청
  if (e.request.url.includes('api.upbit.com') || e.request.url.includes('alternative.me') || e.request.url.includes('min-api.cryptocompare.com') || e.request.url.includes('translate.googleapis.com')) {
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request).catch(() => {
        // 네트워크 실패 시 조용히 실패 처리
      });
    })
  );
});
