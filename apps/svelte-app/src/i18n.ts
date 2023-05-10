import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en-US', () => import('./i18n/en.json'));
register('th-TH', () => import('./i18n/th.json'));

init({
    fallbackLocale: 'en-US',
    initialLocale: getLocaleFromNavigator(),
});