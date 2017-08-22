const CACHE_NAME = 'Moovz';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('cache open');
      })
  );
});
