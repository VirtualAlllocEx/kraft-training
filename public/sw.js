/* KRAFT.TRAINING service worker — offline support */

const VERSION = 'v6';
const PREFIX = 'kraft-training-';
const SHELL_CACHE = PREFIX + 'shell-' + VERSION;
const PAGES_CACHE = PREFIX + 'pages-' + VERSION;
const IMAGES_CACHE = PREFIX + 'images-' + VERSION;
const CURRENT_CACHES = [SHELL_CACHE, PAGES_CACHE, IMAGES_CACHE];

/* App shell: static routes + manifest. Hashed /_astro/ CSS/JS assets
   cannot be listed here (names change every build); they are cached
   cache-first on first request instead. */
const SHELL_URLS = [
  '/',
  '/plan/',
  '/hilfe/',
  '/offline/',
  '/kategorie/aufwaermen/',
  '/kategorie/passspiel/',
  '/kategorie/torabschluss/',
  '/kategorie/spielform/',
  '/kategorie/halle/',
  '/kategorie/kondition/',
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
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

/* Stale-while-revalidate: serve from cache, refresh in the background. */
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

/* Network-first: for navigations. Falls back to PAGES_CACHE, then SHELL
   precache for the requested URL, then /offline/. */
async function networkFirst(request, cacheName, event) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (response && response.ok && !response.redirected) {
      const responseToCache = response.clone();
      if (event) {
        event.waitUntil(cache.put(request, responseToCache).catch(() => {}));
      } else {
        cache.put(request, responseToCache).catch(() => {});
      }
    }
    return response;
  } catch (e) {
    const cached = await cache.match(request);
    if (cached) return cached;

    const shellCache = await caches.open(SHELL_CACHE);
    const shellHit = await shellCache.match(request);
    if (shellHit) return shellHit;

    // trailingSlash: 'always' — try with trailing slash if missing
    try {
      const u = new URL(request.url);
      if (!u.pathname.endsWith('/') && !u.pathname.split('/').pop().includes('.')) {
        const withSlash = await shellCache.match(u.pathname + '/');
        if (withSlash) return withSlash;
        const pageWithSlash = await cache.match(u.pathname + '/');
        if (pageWithSlash) return pageWithSlash;
      }
    } catch (err) { /* ignore */ }

    return (
      (await shellCache.match('/offline/')) ||
      (await shellCache.match('/')) ||
      new Response('Offline', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    );
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  /* blob:/data: — Decap AssetProxy.toBase64 uses fetch(blob:...) for uploads */
  if (url.protocol === 'blob:' || url.protocol === 'data:') return;

  /* Same-origin only. Cross-origin requests (Google Fonts, Netlify
     Identity) are never intercepted. */
  if (url.origin !== self.location.origin) return;

  /* Never handle the SW itself or the admin CMS. */
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/.netlify/') || url.pathname === '/sw.js') return;

  /* Exercise images: stale-while-revalidate. */
  if (url.pathname.startsWith('/images/') || request.destination === 'image') {
    event.respondWith(
      staleWhileRevalidate(request, IMAGES_CACHE, event)
        .catch(() => new Response('', { status: 504, statusText: 'Offline' }))
    );
    return;
  }

  /* Hashed Astro assets: cache-first (immutable via hash). */
  if (url.pathname.startsWith('/_astro/')) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  /* Manifest + icons: prefer cache when offline (also precached in shell). */
  if (
    url.pathname === '/manifest.json' ||
    url.pathname === '/favicon.svg' ||
    url.pathname.startsWith('/icon-') ||
    url.pathname === '/apple-touch-icon.png'
  ) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  /* Navigations: network-first. */
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(networkFirst(request, PAGES_CACHE, event));
    return;
  }

  /* Everything else same-origin: network, then shell/cache fallback. */
  event.respondWith(
    fetch(request).catch(async () => {
      const shellCache = await caches.open(SHELL_CACHE);
      return (
        (await shellCache.match(request)) ||
        new Response('', { status: 504, statusText: 'Offline' })
      );
    })
  );
});
