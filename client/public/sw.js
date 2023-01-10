const CACHE_VERSION = 'v1';

// Service worker installed
self.addEventListener('install', async (e) => {
  console.log('Service Worker installed');
});

// Service worker activated
self.addEventListener('activate', async (e) => {
  console.log('Service Worker activated');

  // Cleanup old caches
  try {
    const cacheNames = await caches.keys();
    for (let name of cacheNames) {
      if (CACHE_VERSION !== name) {
        caches.delete(name);
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
  }

  // Fetch immediately
  e.waitUntil(clients.claim());
});

// Listen for requests
self.addEventListener('fetch', (e) => {
  console.log('Service Worker fetch');

  // e.respondWith(handleRequest(e));
});

// Listen for push
self.addEventListener('push', (e) => {
  const data = e.data.json();

  if (self.Notification.permission !== 'granted') {
    return;
  }

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    image: data.image,
  });
});

async function handleRequest(e) {
  try {
    // Respond
    let response = await caches.match(e.request);
    if (response) {
      return response;
    } else {
      // Cache and respond
      response = await fetch(e.request);
      const cache = await caches.open(CACHE_VERSION);
      cache.put(e.request, response.clone());

      return response;
    }
  } catch (err) {
    return await caches.match(e.request);
  }
}
