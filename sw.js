const CACHE_NAME = 'bit-ida-yap-v6';
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
  // 외부 API 요청은 캐싱하지 않고 네트워크로 직접 요청
  if (e.request.url.includes('api.upbit.com') || e.request.url.includes('alternative.me') || e.request.url.includes('min-api.cryptocompare.com') || e.request.url.includes('translate.googleapis.com')) {
    return;
  }

  // 네트워크 우선 전략: 항상 최신 파일을 가져오고, 오프라인일 때만 캐시 사용
  e.respondWith(
    fetch(e.request).then((networkResponse) => {
      // 네트워크 성공 시 캐시도 갱신
      if (networkResponse && networkResponse.status === 200) {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseClone);
        });
      }
      return networkResponse;
    }).catch(() => {
      // 네트워크 실패(오프라인) 시 캐시에서 제공
      return caches.match(e.request);
    })
  );
});
