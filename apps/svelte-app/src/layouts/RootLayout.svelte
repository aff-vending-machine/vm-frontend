<!-- Root -->
<script lang="ts">
  import { SvelteComponent } from 'svelte';
  
  export let Component: typeof SvelteComponent | any;
</script>

<!-- HTML -->
<div class="root-layout">
  <slot />
  <Component />
</div>

<!-- style -->
<style lang="scss">
</style>
