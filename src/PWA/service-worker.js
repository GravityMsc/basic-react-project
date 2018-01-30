/* eslint-disable */
// Service Worker 立即激活
self.addEventListener('install', (event) => {
  console.log('Install Service Worker', event);
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', (event) => {
  console.log('Activated Service Worker', event);
  event.waitUntil(self.clients.claim());
});

// Fetch Event (For future caching purpose)
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});

