<!-- App -->
<script lang="ts" context="module">
  import { waitLocale } from 'svelte-i18n';
  import Router from '~/ui/router/index.svelte';
</script>

<!-- HTML -->
{#await waitLocale()}
  <p>...waiting</p>
{:then}
  <Router />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<!-- style -->
<style lang="scss">
</style>
