// service-worker.js

self.addEventListener('push', event => {
    const options = {
      body: event.data ? event.data.text() : 'You have a new notification!',
      icon: '/icon.png',
      badge: '/badge.png'
    };
  
    event.waitUntil(
      self.registration.showNotification('New Notification', options)
    );
  });
  