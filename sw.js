self.addEventListener("install", function(event) {
  event.waitUntil(preLoad());
  self.skipWaiting();  // Activate the service worker immediately after installation
});

var preLoad = function() {
  console.log("Installing web app");
  return caches.open("offline").then(function(cache) {
    console.log("Caching index and important routes");
    // Cache offline.html, offline.gif and other important assets
    return cache.addAll([
      "/offline.html", 
      "/offline.gif",
      "/index.html",  // Add index.html to be cached
      "/styles.css",   // Replace with actual stylesheet paths
      "/app.js",       // Replace with actual JavaScript file paths
      "/data/logo.png" // Add logo or other static assets
    ]);
  });
};

self.addEventListener("fetch", function(event) {
  event.respondWith(
    checkResponse(event.request).catch(function() {
      return returnFromCache(event.request);
    })
  );
  event.waitUntil(
    addToCache(event.request)
  );
});

var checkResponse = function(request) {
  return fetch(request).then(function(response) {
    if (response.status === 404) {
      return Promise.reject("Not found");
    }
    return response;
  });
};

var returnFromCache = function(request) {
  return caches.open("offline").then(function(cache) {
    return cache.match(request).then(function(matching) {
      return matching || cache.match("/offline.html");  // Return offline.html if the request is not found in the cache
    });
  });
};

var addToCache = function(request) {
  return caches.open("offline").then(function(cache) {
    return fetch(request).then(function(response) {
      if (response.status === 200) {
        cache.put(request, response.clone());  // Cache only successful responses
      }
      return response;
    });
  });
};

// Optionally, add a message to inform the user when the service worker updates
self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== "offline") {
            console.log("Deleting outdated cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
