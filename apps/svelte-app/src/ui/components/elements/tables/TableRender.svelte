<!-- TableRender -->
<script lang="ts">
  import dayjs from 'dayjs';
  import { SvelteComponent } from 'svelte';
  import Image from '~/ui/components/elements/images/Image.svelte';
  import Currency from '~/ui/components/elements/labels/Currency.svelte';
  import Number from '~/ui/components/elements/labels/Number.svelte';

  export let key: string;
  export let type: string;
  export let value: any;
  export let source: any;
</script>

<!-- HTML -->
{#if typeof value === typeof SvelteComponent}
  <svelte:component this={value} {key} value={source[key]} {source} on:action />
{:else if value === undefined || value === null}
  <span>-</span>
{:else if value instanceof Date || (!!type && type === 'date')}
  <time>{dayjs(value).format('DD MMM YYYY HH:mm:ss')}</time>
{:else if !!type && type === 'image'}
  <Image src={value} alt={value} class="w-16 h-auto" />
{:else if !!type && type === 'currency'}
  <Currency amount={value} />
{:else if !!type && type === 'number'}
  <Number amount={value} />
{:else if Array.isArray(value)}
  <span>{value.join(', ')}</span>
{:else}
  <span>{value}</span>
{/if}

<!-- style -->
<style lang="scss">
</style>
