const CACHE_NAME = 'temperature-converter-v1';

self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app resources...');
                return cache.addAll([
                    './',
                    './index.html',
                    './converter.js',
                    './converter.css',
                    './manifest.json',
                    './icon.jpg'
                ]);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});