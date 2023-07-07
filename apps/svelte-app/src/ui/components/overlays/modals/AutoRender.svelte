<!-- AutoRender -->
<script lang="ts">
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import Image from '~/ui/components/elements/images/Image.svelte';
  import Currency from '~/ui/components/elements/labels/Currency.svelte';

  export let key: string;
  export let value: any;

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault('Asia/Bangkok');

  function isObject(value: any) {
    return value !== null && typeof value === 'object';
  }

  function isImageUrl(url: any): boolean {
    if (typeof url !== 'string') return false;

    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  function isJsonString(str: any): boolean {
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        return type === '[object Object]' || type === '[object Array]';
    } catch (e) {
      return false;
    }
  }

  function isCurrency(str: string): boolean {
    return str.toLowerCase().includes('price');
  }
</script>

<!-- HTML -->
{#if value instanceof Date}
  <time>{dayjs(value).format('LLLL')}</time>
{:else if isObject(value)}
  <div class="grid grid-cols-3 space-y-1">
    {#each Object.entries(value) as [k, v]}
      {#if !!v}
        <div class="font-semibold">{k}</div>
        <div class="col-span-2">{v}</div>
      {/if}
    {/each}
  </div>
{:else if isImageUrl(value)}
  <Image src={value} alt={value} class="w-16 h-auto" />
{:else if isCurrency(key)}
  <Currency amount={value} alignment="left" />
{:else if Array.isArray(value)}
  <span>{value.join(', ')}</span>
{:else if isJsonString(value)}
  <pre>{JSON.stringify(JSON.parse(value), null, 2)}</pre>
{:else}
  <span>{value}</span>
{/if}

<!-- style -->
<style lang="scss">
</style>
