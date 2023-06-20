import '~/config';
import './i18n';
import '~/assets/css/global.css';

import App from './App.svelte';

// Get the saved version from local storage
const savedVersion = localStorage.getItem('appVersion');

// Define the current version of your app
const currentVersion = '1.3.21';

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
  localStorage.setItem('appVersion', currentVersion);
}

const app = new App({
  target: document.getElementById('app'),
});

export default app;
