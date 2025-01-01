self.addEventListener("install", function (event) {
  event.waitUntil(preLoad());
});

const preLoad = function () {
  console.log("Installing web app");
  return caches.open("offline").then(function (cache) {
    console.log("Caching offline page and resources");
    return cache.addAll(["/offline.html", "/offline.gif"]);
  });
};

self.addEventListener("fetch", function (event) {
  event.respondWith(
    checkResponse(event.request).catch(function () {
      return returnFromCache(event.request);
    })
  );
});

const checkResponse = function (request) {
  return fetch(request).then(function (response) {
    if (!response || response.status !== 200 || response.type !== "basic") {
      // Reject requests with invalid responses
      return Promise.reject("Response not valid");
    }
    // Cache the successful response
    addToCache(request, response.clone());
    return response;
  });
};

const returnFromCache = function (request) {
  return caches.open("offline").then(function (cache) {
    return cache.match(request).then(function (matching) {
      return (
        matching || cache.match("/offline.html") // Fallback to offline page
      );
    });
  });
};

const addToCache = function (request, response) {
  return caches.open("offline").then(function (cache) {
    cache.put(request, response); // Add the request-response pair to the cache
  });
};
