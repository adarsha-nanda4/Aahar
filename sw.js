// Install event: Cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline").then((cache) => {
      console.log("Caching offline page and resources");
      return cache.addAll(["/offline.html", "/offline.gif"]);
    })
  );
});

// Activate event: Cleanup old caches if necessary
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== "offline") {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Respond with cached resources or fetch from the network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache valid responses
        if (response && response.status === 200 && response.type === "basic") {
          addToCache(event.request, response.clone());
        }
        return response;
      })
      .catch(() => {
        // Return offline.html if resource not available
        return returnFromCache(event.request);
      })
  );
});

// Function to add responses to cache
const addToCache = (request, response) => {
  return caches.open("offline").then((cache) => {
    cache.put(request, response);
  });
};

// Function to return cached response or fallback to offline.html
const returnFromCache = (request) => {
  return caches.open("offline").then((cache) => {
    return cache.match(request).then((matching) => {
      return (
        matching || cache.match("/offline.html") // Fallback to offline page
      );
    });
  });
};
