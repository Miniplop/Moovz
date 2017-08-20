const CACHE_NAME = 'Moovz';
const urls = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/static/js/bundle.js',
  '/favicon.ico',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urls)
      })
  );
});

self.addEventListener('fetch', event => {
  cacheFallingBackToNetwork(event)
});

const cacheFallingBackToNetwork = event => event.respondWith(
  caches.match(event.request)
    .then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
);
