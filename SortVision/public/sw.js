// SortVision Service Worker
const CACHE_NAME = 'sortvision-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/splash.svg',
  '/manifest.json',
  '/mobile.css',
  '/src/main.jsx',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  try {
    // Skip non-HTTP(S) requests and unsupported URL schemes
    const requestURL = new URL(event.request.url);
    if (!['http:', 'https:'].includes(requestURL.protocol)) {
      return;
    }

    event.respondWith(
      caches
        .match(event.request)
        .then(response => {
          // Cache hit - return response
          if (response) {
            return response;
          }

          // Clone the request
          const fetchRequest = event.request.clone();

          return fetch(fetchRequest)
            .then(response => {
              // Check if valid response
              if (
                !response ||
                response.status !== 200 ||
                response.type !== 'basic'
              ) {
                return response;
              }

              // Clone the response
              const responseToCache = response.clone();

              // Wrap cache operations in try-catch
              try {
                caches
                  .open(CACHE_NAME)
                  .then(cache => {
                    if (cache && responseToCache) {
                      return cache
                        .put(event.request, responseToCache)
                        .catch(err => console.warn('Cache put error:', err));
                    }
                  })
                  .catch(err => console.warn('Cache open error:', err));
              } catch (error) {
                console.warn('Cache operation error:', error);
              }

              return response;
            })
            .catch(error => {
              console.warn('Fetch error:', error);
              throw error;
            });
        })
        .catch(error => {
          console.warn('Cache match error:', error);
          throw error;
        })
    );
  } catch (error) {
    console.warn('Service worker general error:', error);
    return;
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
