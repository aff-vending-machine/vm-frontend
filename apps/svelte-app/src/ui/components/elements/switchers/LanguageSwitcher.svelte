<script lang="ts">
  import { locale } from 'svelte-i18n';

  function switchLanguage() {
    if ($locale === 'en-US') {
      locale.set('th-TH');
    } else {
      locale.set('en-US');
    }
  }
</script>

<button class={`text-3xl px-2 ${$$props.class}`} on:click={switchLanguage}>
  {#if $locale === 'en-US'} 🇬🇧 {/if}
  {#if $locale === 'th-TH'} 🇹🇭 {/if}
</button>
