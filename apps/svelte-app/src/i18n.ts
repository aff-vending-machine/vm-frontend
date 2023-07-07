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

if (localStorage.getItem("app-locale")) {
    locale.set(localStorage.getItem("app-locale"));
}