import api from './api';

async function registerServiceWorker() {
  if (!navigator.serviceWorker) {
    console.log('Service worker not supported by your browser');
    return;
  } else if (await navigator.serviceWorker.getRegistration()) {
    console.log('Service worker already registered');
    return;
  }

  console.log('Registering service worker...');
  await navigator.serviceWorker.register('/sw.js');
  console.log('Service Worker registered');
}

async function subscribeNotification() {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    console.log('Service worker not registered');
    return;
  }

  let subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    return;
  }

  const publicKey =
    'your-public-key';
  try {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicKey,
    });
    console.log('Push registered in browser');

    await api.subscribe(subscription);
    console.log('Push sent to server');
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

export { registerServiceWorker, subscribeNotification };
