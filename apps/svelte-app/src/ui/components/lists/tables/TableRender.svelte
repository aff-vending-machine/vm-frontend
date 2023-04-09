<!-- TableRender -->
<script lang="ts">
  import dayjs from 'dayjs';
  import { SvelteComponent } from 'svelte';

  export let key: string;
  export let source: Record<string, any>;
  export let index: number;
  export let render: any;
  export let data: any;
</script>

<!-- HTML -->
{#if typeof render === typeof SvelteComponent}
  <svelte:component this={render} {data} {index} {key} {source} on:event />
{:else if render === undefined || render === null}
  <span>-</span>
{:else if render instanceof Date}
  <time>{dayjs(render).format('DD MMM YYYY HH:mm:ss ZZ')}</time>
{:else if Array.isArray(render)}
  <span>{render.join(', ')}</span>
{:else}
  <span>{render}</span>
{/if}

<!-- style -->
<style lang="scss">
</style>
