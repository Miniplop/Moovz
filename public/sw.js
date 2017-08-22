const CACHE_NAME = 'Moovz';
const DYNAMIC_CACHE_NAME = 'Moovz-dynamic';
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
  const requestedUrl = event.request.url;
  if (requestedUrl.includes('https://cropchat-50ff7.firebaseio.com/')) {
    networkFallingBackToCacheWithUpdate(event);
  } else if (
    requestedUrl.includes('media.tumblr.com') ||
    requestedUrl.includes('thecatapi.com')
  ) {
    cacheFallingBackToNetworkWithUpdate(event)
  } else {
    cacheFallingBackToNetwork(event);
  }
});

const networkFallingBackToCacheWithUpdate = event => event.respondWith(
  caches.open(DYNAMIC_CACHE_NAME).then(cache => {
    return fetch(event.request).then(response => {
      cache.put(event.request, response.clone());
      return response;
    }).catch(() => caches.match(event.request));
  })
);

const cacheFallingBackToNetwork = event => event.respondWith(
  caches.match(event.request)
    .then(response => {
      return response || fetch(event.request);
    })
);

const cacheFallingBackToNetworkWithUpdate = event => event.respondWith(
  caches.match(event.request)
    .then(response => {
      return response ||
        caches.open(DYNAMIC_CACHE_NAME).then(cache => {
          return fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
    })
);
