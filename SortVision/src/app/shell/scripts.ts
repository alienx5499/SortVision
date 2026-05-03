export const getClientBootstrapScript = (isProdBuild: boolean) => `
  var __SV_BUILD_PROD__ = ${isProdBuild};
  (function() {
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    var debugParam = getQueryParam('cr7');
    var hasDebugParam = debugParam === 'goat';
    var hostname = window.location.hostname.toLowerCase();
    var isProductionDomain =
      hostname.endsWith('.vercel.app') ||
      hostname === 'vercel.app' ||
      hostname.endsWith('.netlify.app') ||
      hostname === 'netlify.app' ||
      hostname.endsWith('.github.io') ||
      hostname === 'github.io' ||
      hostname.endsWith('.sortvision.com') ||
      hostname === 'sortvision.com';

    if (isProductionDomain) {
      return;
    }

    if (hasDebugParam) {
      var script = document.createElement('script');
      script.type = 'module';
      script.src = '/devTools/index.js';
      document.head.appendChild(script);

      var testScript = document.createElement('script');
      testScript.src = '/devTools/test.js';
      document.head.appendChild(testScript);
      return;
    }

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      console.log('%c SortVision DevTools disabled\\n Add the debug parameter to enable', 'background: #FB923C; color: #7C2D12; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; border-left: 3px solid #EA580C;');
    }
  })();

  window.addEventListener('load', function() {
    setTimeout(function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-SZPR3VLNV0', {
        page_title: document.title,
        page_location: window.location.href
      });
    }, 1000);
  });

  if ('serviceWorker' in navigator) {
    var host = window.location.hostname;
    var isLocalHost =
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host.indexOf('192.168.') === 0 ||
      host.indexOf('10.') === 0 ||
      host.indexOf('172.') === 0;
    var isProductionHost = host === 'sortvision.com' || host === 'www.sortvision.com';
    var shouldRegisterServiceWorker = __SV_BUILD_PROD__ && isProductionHost && !isLocalHost;

    if (shouldRegisterServiceWorker) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
          .then(function(registration) {
            var activateUpdate = function(reg) {
              if (reg && reg.waiting) {
                reg.waiting.postMessage({ type: 'SKIP_WAITING' });
              }
            };

            registration.update();
            activateUpdate(registration);

            registration.addEventListener('updatefound', function() {
              var installingWorker = registration.installing;
              if (!installingWorker) return;
              installingWorker.addEventListener('statechange', function() {
                if (installingWorker.state === 'installed') {
                  activateUpdate(registration);
                }
              });
            });

            var hasReloadedForController = false;
            navigator.serviceWorker.addEventListener('controllerchange', function() {
              if (hasReloadedForController) return;
              hasReloadedForController = true;
              window.location.reload();
            });
          })
          .catch(function() {});
      });
    } else {
      window.addEventListener('load', function() {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          registrations.forEach(function(registration) {
            registration.unregister();
          });
        });
        if (window.caches && window.caches.keys) {
          caches.keys().then(function(keys) {
            keys.forEach(function(key) {
              if (key.indexOf('sortvision') !== -1) {
                caches.delete(key);
              }
            });
          });
        }
      });
    }
  }

`;
