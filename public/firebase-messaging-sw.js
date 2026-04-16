// Empty service worker to silence 404 errors for Firebase messaging if not used
self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    return self.clients.claim();
});
