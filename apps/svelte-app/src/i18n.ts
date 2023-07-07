import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';

register('en-US', () => import('~/assets/locales/en.json'));
register('th-TH', () => import('~/assets/locales/th.json'));

const initialLocale = getLocaleFromNavigator();


// Set the initial locale
init({
    fallbackLocale: 'en-US',
    initialLocale,
})
// starts loading 'en-US'

if (sessionStorage.getItem("app-locale")) {
    locale.set(sessionStorage.getItem("app-locale"));
}