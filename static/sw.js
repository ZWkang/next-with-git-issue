// Set a name for the current cache
var cacheName = "v1";

// Default files to always cache
var cacheFiles = ["/"];

self.addEventListener("install", function(e) {
  console.log("[ServiceWorker] Installed");

  // e.waitUntil Delays the event until the Promise is resolved
  e.waitUntil(
    caches
      .open(cacheName, {
        scope: "./"
      })
      .then(function(cache) {
        console.log("[ServiceWorker] Caching cacheFiles");
        return cache.addAll(cacheFiles);
      })
  );
});

self.addEventListener("activate", function(e) {
  console.log("[ServiceWorker] Activated");

  e.waitUntil(
    // Get all the cache keys (cacheName)
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(thisCacheName) {
          if (thisCacheName !== cacheName) {
            console.log(
              "[ServiceWorker] Removing Cached Files from Cache - ",
              thisCacheName
            );
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  const response = caches
    .match(event.request)
    .then(match => match || fetch(event.request));
  event.respondWith(response);
});
