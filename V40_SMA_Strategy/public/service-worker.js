const CACHE_NAME = 'my-app-cache-v1';
const FILES_TO_CACHE = [
  '/', // root
  '/index.html',
  '/styles.css',
  '/main.js',
  '/logo.png',
  // Add any static files you want to pre-cache
];

// ✅ Install event — cache static files
self.addEventListener('install', (event) => {
  
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ✅ Activate event — cleanup old caches if needed
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// ✅ Fetch event — serve from cache or fetch & cache
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only cache GET requests (skip POST, etc.)
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((response) => {
          // Clone response before caching
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // You can return a fallback response here
          console.error('[SW] Fetch failed for:', request.url);
        });
    })
  );
});
