import '~/config';
import './i18n';
import '~/assets/css/global.css';

import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
})

export default app
