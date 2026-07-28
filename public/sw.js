/* KRAFT.TRAINING service worker — offline support */

const VERSION = 'v7';
const PREFIX = 'kraft-training-';
const SHELL_CACHE = PREFIX + 'shell-' + VERSION;
const PAGES_CACHE = PREFIX + 'pages-' + VERSION;
const IMAGES_CACHE = PREFIX + 'images-' + VERSION;
const CURRENT_CACHES = [SHELL_CACHE, PAGES_CACHE, IMAGES_CACHE];

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

function mustBypass(request, url) {
  // Decap AssetProxy / previews — SW cannot re-fetch client blob: URLs
  if (url.protocol === 'blob:' || url.protocol === 'data:') return true;
  if (request.method !== 'GET') return true;
  if (url.origin !== self.location.origin) return true;
  const path = url.pathname;
  if (path === '/sw.js') return true;
  if (path === '/admin' || path.indexOf('/admin/') === 0) return true;
  if (path === '/.netlify' || path.indexOf('/.netlify/') === 0) return true;
  return false;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  let url;
  try {
    url = new URL(request.url);
  } catch (e) {
    return;
  }

  // Bare return = browser default network (never respondWith)
  if (mustBypass(request, url)) return;

  const path = url.pathname;

  if (path.indexOf('/images/') === 0 || request.destination === 'image') {
    event.respondWith(
      staleWhileRevalidate(request, IMAGES_CACHE, event)
        .catch(() => new Response('', { status: 504, statusText: 'Offline' }))
    );
    return;
  }

  if (path.indexOf('/_astro/') === 0) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  if (
    path === '/manifest.json' ||
    path === '/favicon.svg' ||
    path.indexOf('/icon-') === 0 ||
    path === '/apple-touch-icon.png'
  ) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(networkFirst(request, PAGES_CACHE, event));
    return;
  }

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