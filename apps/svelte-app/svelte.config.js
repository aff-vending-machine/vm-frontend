// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  // preprocess: vitePreprocess(),
  preprocess: sveltePreprocess({ 
    scss: true, 
    postcss: true, 
    sass: true,
  }),
}
