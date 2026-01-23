// SortVision Service Worker
// Provides offline capabilities and caching for better performance

const CACHE_NAME = 'sortvision-v1.0.1';
const STATIC_CACHE = 'sortvision-static-v1.0.1';
const DYNAMIC_CACHE = 'sortvision-dynamic-v1.0.1';

// Check if we're in development mode
const isDev =
  self.location.hostname === 'localhost' ||
  self.location.hostname === '127.0.0.1' ||
  self.location.hostname.includes('localhost') ||
  self.location.hostname.startsWith('192.168.') ||
  self.location.hostname.startsWith('10.') ||
  self.location.hostname.startsWith('172.');

// Debug logging function
const debugLog = (message, ...args) => {
  if (isDev) {
    console.log(message, ...args);
  }
};

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/favicon.svg',
  '/splash.svg',
  '/manifest.json',
  '/mobile.css',
  '/sw.js',
];

// Install event - cache static files
self.addEventListener('install', event => {
  debugLog('🔧 Service Worker installing...');
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cache => {
        debugLog('📦 Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        debugLog('✅ Static files cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        if (isDev) {
          console.error('❌ Failed to cache static files:', error);
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  debugLog('🚀 Service Worker activating...');
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              debugLog('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        debugLog('✅ Service Worker activated');
        // Clear all caches to prevent MIME type issues
        return caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              if (
                cacheName.includes('sortvision') &&
                cacheName !== STATIC_CACHE &&
                cacheName !== DYNAMIC_CACHE
              ) {
                debugLog('🗑️ Clearing problematic cache:', cacheName);
                return caches.delete(cacheName);
              }
            })
          );
        });
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Determine caching strategy based on file type
  const isStaticAsset =
    url.pathname.includes('/_next/static/') ||
    url.pathname.includes('/devTools/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.ico');

  const isNavigationRequest = request.mode === 'navigate';

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      // For static assets, use Cache First strategy
      if (isStaticAsset && cachedResponse) {
        debugLog('📦 Serving static asset from cache:', request.url);
        return cachedResponse;
      }

      // For navigation requests, try cache first, then network
      if (isNavigationRequest && cachedResponse) {
        debugLog('📦 Serving navigation from cache:', request.url);
        return cachedResponse;
      }

      // For other requests, use Network First strategy
      return fetch(request)
        .then(response => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();

          // Cache the response
          const cacheToUse = isStaticAsset ? STATIC_CACHE : DYNAMIC_CACHE;
          caches.open(cacheToUse).then(cache => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(error => {
          if (isDev) {
            console.error('❌ Fetch failed:', error);
          }

          // For navigation requests, return cached version or offline page
          if (isNavigationRequest) {
            return (
              caches.match('/') ||
              new Response(
                '<html><body><h1>SortVision Offline</h1><p>You are offline. Please check your connection.</p></body></html>',
                { headers: { 'Content-Type': 'text/html' } }
              )
            );
          }

          // For static assets, return cached version if available
          if (isStaticAsset && cachedResponse) {
            debugLog(
              '📦 Serving static asset from cache (network failed):',
              request.url
            );
            return cachedResponse;
          }

          throw error;
        });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  debugLog('🔄 Background sync triggered:', event.tag);

  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any pending offline actions here
      Promise.resolve()
    );
  }
});

// Push notifications (for future features)
self.addEventListener('push', event => {
  debugLog('📱 Push notification received');

  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'Open SortVision',
        icon: '/favicon.svg',
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon.svg',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification('SortVision', options));
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  debugLog('🔔 Notification clicked:', event.action);

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(self.clients.openWindow('/'));
  }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
  debugLog('💬 Message received in service worker:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

debugLog('🎯 SortVision Service Worker loaded successfully!');
