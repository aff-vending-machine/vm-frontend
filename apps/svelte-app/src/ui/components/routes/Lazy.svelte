<!-- Lazy.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  export let component: any;
  export let delayMs = null;

  let loadedComponent = null;
  let timeout: number;
  let showFallback = !delayMs;

  let props: { [index: string]: any };
  $: {
    const { component, delayMs, ...restProps } = $$props;
    props = restProps;

    // avoid unused vars
    component;
    delayMs;
  }

  onMount(() => {
    if (delayMs) {
      timeout = setTimeout(() => {
        showFallback = true;
      }, delayMs);
    }
    component().then((module: { default: any }) => {
      loadedComponent = module.default;
    });
    return () => clearTimeout(timeout);
  });
</script>

{#if loadedComponent}
  <svelte:component this={loadedComponent} {...props} />
{:else if showFallback}
  <slot />
{/if}
