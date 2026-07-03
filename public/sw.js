/* KRAFT.TRAINING service worker — offline support */

const VERSION = 'v2';
const PREFIX = 'kraft-training-';
const SHELL_CACHE = PREFIX + 'shell-' + VERSION;
const PAGES_CACHE = PREFIX + 'pages-' + VERSION;
const IMAGES_CACHE = PREFIX + 'images-' + VERSION;
const CURRENT_CACHES = [SHELL_CACHE, PAGES_CACHE, IMAGES_CACHE];

/* App shell: all static pages + manifest. Hashed /_astro/ CSS/JS assets
   cannot be listed here (names change every build); they are cached
   cache-first on first request instead. */
const SHELL_URLS = [
  '/',
  '/plan/',
  '/offline/',
  '/kategorie/aufwaermen/',
  '/kategorie/passspiel/',
  '/kategorie/torabschluss/',
  '/kategorie/spielform/',
  '/kategorie/halle/',
  '/kategorie/kondition/',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    /* Tolerate individual failures: one broken URL must not abort the
       whole shell precache (cache.addAll is all-or-nothing). */
    await Promise.allSettled(
      SHELL_URLS.map((url) => cache.add(new Request(url, { cache: 'reload' })).catch(() => {}))
    );
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => {
      if (key.indexOf(PREFIX) === 0 && CURRENT_CACHES.indexOf(key) === -1) {
        return caches.delete(key);
      }
    }));
    await self.clients.claim();
  })());
});

/* Cache-first: for immutable assets (hashed build files).
   Opens the target cache directly — caches.match() would search caches in
   creation order and always hit SHELL_CACHE first. */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.ok && !response.redirected) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}

/* Stale-while-revalidate: serve from cache, refresh in the background.
   Opens the target cache directly (see cacheFirst). The background
   revalidation is registered with event.waitUntil() so the SW is not
   terminated before the cache.put completes. Rejects if there is no
   cached copy and the network fails, so callers can serve a fallback. */
async function staleWhileRevalidate(request, cacheName, event) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request).then((response) => {
    if (response && response.ok && !response.redirected) {
      return cache.put(request, response.clone()).then(() => response);
    }
    return response;
  });
  if (event) event.waitUntil(network.catch(() => {}));
  if (cached) {
    network.catch(() => {});
    return cached;
  }
  return network;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  /* Same-origin only. Cross-origin requests (Google Fonts, Netlify
     Identity) are never intercepted, so the SW never fetches anything
     outside the site's CSP. */
  if (url.origin !== self.location.origin) return;

  /* Never handle the SW itself or the admin CMS. */
  if (url.pathname.startsWith('/admin') || url.pathname === '/sw.js') return;

  /* Exercise images: stale-while-revalidate, so image updates propagate
     without an SW version bump (filenames are not content-hashed). */
  if (url.pathname.startsWith('/images/') || request.destination === 'image') {
    event.respondWith(
      staleWhileRevalidate(request, IMAGES_CACHE, event)
        .catch(() => new Response('', { status: 504, statusText: 'Offline' }))
    );
    return;
  }

  /* Hashed Astro assets: cache-first (they're immutable via hash). */
  if (url.pathname.startsWith('/_astro/')) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  /* Navigations: stale-while-revalidate on PAGES_CACHE, offline fallback. */
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith((async () => {
      try {
        return await staleWhileRevalidate(request, PAGES_CACHE, event);
      } catch (e) {
        const cache = await caches.open(SHELL_CACHE);
        return (await cache.match('/offline/')) || (await cache.match('/')) || new Response('Offline', { status: 503 });
      }
    })());
    return;
  }

  /* Everything else same-origin: network with an offline error fallback. */
  event.respondWith(fetch(request).catch(() => new Response('', { status: 504 })));
});
