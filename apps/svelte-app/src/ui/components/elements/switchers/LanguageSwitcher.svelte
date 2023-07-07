<script lang="ts">
  import { locale } from 'svelte-i18n';
  import FlagUs from '../icons/FlagUS.svelte';
  import FlagTh from '../icons/FlagTH.svelte';

  function switchLanguage() {
    if ($locale === 'en-US') {
      locale.set('th-TH');
      localStorage.setItem('app-locale', 'th-TH')
    } else {
      locale.set('en-US');
      localStorage.setItem('app-locale', 'en-US')
    }
  }
</script>

<button class={`text-3xl px-2 ${$$props.class}`} on:click={switchLanguage}>
  {#if $locale === 'en-US'} <FlagUs class="h-4 w-6" /> {/if}
  {#if $locale === 'th-TH'} <FlagTh class="h-4 w-6"/> {/if}
</button>
