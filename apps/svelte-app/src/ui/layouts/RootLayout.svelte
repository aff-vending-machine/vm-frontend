<!-- Root -->
<script lang="ts">
  import { SvelteComponentDev } from 'svelte/internal';

  export let Component: SvelteComponentDev;
  let params = {...$$props}
  delete params["Component"]
</script>

<!-- HTML -->
<div class="root-layout">
  <slot />
  <svelte:component this={Component.default} {...params} />
</div>

<!-- style -->
<style lang="scss">
</style>
