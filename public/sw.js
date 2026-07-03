/* KRAFT.TRAINING service worker — offline support */

var VERSION = 'v1';
var PREFIX = 'kraft-training-';
var SHELL_CACHE = PREFIX + 'shell-' + VERSION;
var PAGES_CACHE = PREFIX + 'pages-' + VERSION;
var IMAGES_CACHE = PREFIX + 'images-' + VERSION;
var CURRENT_CACHES = [SHELL_CACHE, PAGES_CACHE, IMAGES_CACHE];

/* App shell: all static pages + manifest. Hashed /_astro/ CSS/JS assets
   cannot be listed here (names change every build); they are cached
   cache-first on first request instead. */
var SHELL_URLS = [
  '/',
  '/plan/',
  '/kategorie/aufwaermen/',
  '/kategorie/passspiel/',
  '/kategorie/torabschluss/',
  '/kategorie/spielform/',
  '/kategorie/halle/',
  '/kategorie/kondition/',
  '/manifest.json'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(function (cache) { return cache.addAll(SHELL_URLS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (key) {
          if (key.indexOf(PREFIX) === 0 && CURRENT_CACHES.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

/* Cache-first: for immutable assets (exercise images, hashed build files). */
function cacheFirst(request, cacheName) {
  return caches.match(request).then(function (cached) {
    if (cached) return cached;
    return fetch(request).then(function (response) {
      if (response && response.ok && !response.redirected) {
        var copy = response.clone();
        caches.open(cacheName).then(function (cache) { cache.put(request, copy); });
      }
      return response;
    });
  });
}

/* Stale-while-revalidate: serve from cache, refresh in the background. */
function staleWhileRevalidate(request, cacheName) {
  return caches.match(request).then(function (cached) {
    var network = fetch(request)
      .then(function (response) {
        if (response && response.ok && !response.redirected) {
          var copy = response.clone();
          caches.open(cacheName).then(function (cache) { cache.put(request, copy); });
        }
        return response;
      })
      .catch(function () {
        /* Offline and not cached: fall back to the cached start page
           for navigations so the app shell still loads. */
        if (cached) return cached;
        if (request.mode === 'navigate') return caches.match('/');
        return Response.error();
      });
    return cached || network;
  });
}

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url = new URL(request.url);

  /* Same-origin only. Cross-origin requests (Google Fonts, Netlify
     Identity) are never intercepted, so the SW never fetches anything
     outside the site's CSP. */
  if (url.origin !== self.location.origin) return;

  /* Never handle the SW itself or the admin CMS. */
  if (url.pathname === '/sw.js' || url.pathname.indexOf('/admin') === 0) return;

  if (url.pathname.indexOf('/images/') === 0 || request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGES_CACHE));
    return;
  }

  if (url.pathname.indexOf('/_astro/') === 0) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  /* HTML pages (incl. category/exercise pages) and everything else
     same-origin: stale-while-revalidate. */
  event.respondWith(staleWhileRevalidate(request, PAGES_CACHE));
});
