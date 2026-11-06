const CACHE_NAME = 'psicopro-v2';
const ASSETS = [
    './',
    './index.html',
    './app.js',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys()
        .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
        .then(() => self.clients.claim()));
});

// Rede primeiro (pega a versão nova do app); sem internet, usa o cache
self.addEventListener('fetch', (e) => {
    if (e.request.method !== 'GET') return;
    e.respondWith(
        fetch(e.request).then(res => {
            if (res && res.ok && new URL(e.request.url).origin === self.location.origin) {
                const copy = res.clone();
                caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
            }
            return res;
        }).catch(() => caches.match(e.request))
    );
});
