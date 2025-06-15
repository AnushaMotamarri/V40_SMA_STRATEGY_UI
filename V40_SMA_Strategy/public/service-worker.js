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

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 👇 Use Network First for API requests (e.g., /sma/all or /api/*)
  if (url.pathname.startsWith('/sma')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Optionally cache the API response if desired
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
          return networkResponse;
        })
        .catch(() => caches.match(request)) // fallback to cache on failure
    );
    return;
  }

  // ✅ Use Cache First for everything else (static files)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });
        return response;
      });
    })
  );
});

