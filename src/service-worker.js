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
  // console.log('Fetch Event', event);

  // When you open devtools and get your website, it seems that the devtools triggers a fetch of this document.
  // And its request cache is set as 'only-if-cached'.
  // But accroding to MDN, 'The "only-if-cached" mode can only be used if the request's mode is "same-origin".'
  // We need to handle this error.
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;
  event.respondWith(fetch(event.request));
});

self.addEventListener('push', (event) => {
  const title = 'basic-react-project';
  const payload = event.data ? JSON.parse(event.data.text()) : 'Push message no payload';
  event.waitUntil(self.registration.showNotification(title, {
    body: payload.message || 'Push message',
    icon: payload.icon || 'PWA/react.png',
    actions: [
      { action: 'star', title: 'Give me a star on GitHub' },
    ],
  }));
});
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  if (event.action === 'star') {
    clients.openWindow('https://github.com/GravityMsc/basic-react-project');
  }
});
