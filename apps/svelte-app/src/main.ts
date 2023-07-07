import '~/config';
import './i18n';
import '~/assets/css/global.css';

import App from './App.svelte';

localStorage.removeItem('appVersion');

// Get the saved version from local storage
const savedVersion = localStorage.getItem('app-version');

// Define the current version of your app
const currentVersion = import.meta.env.VITE_APP_VERSION || '1.3.25';

// Check if the saved version matches the current version
if (savedVersion !== currentVersion) {
  // Clear the cache
  if ('caches' in window) {
    caches.keys().then(function (cacheNames) {
      cacheNames.forEach(function (cacheName) {
        caches.delete(cacheName);
      });
    });
  }

  // Save the current version in local storage
  localStorage.setItem('app-version', currentVersion);
}

const app = new App({
  target: document.getElementById('app'),
});

export default app;
