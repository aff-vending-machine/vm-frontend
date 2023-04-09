<!-- SelectModal -->
<script lang="ts">
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';

  export let key: string;
  export let value: any;

  dayjs.extend(utc);
  dayjs.extend(timezone);
</script>

<!-- HTML -->
<div class="font-bold">{key}:</div>
<div class="text-sm col-span-2 break-all">
  {#if value === undefined || value === null}
    <span>-</span>
  {:else if value instanceof Date}
    <time>{dayjs(value).format('DD MMM YYYY HH:mm:ss ZZ')} ({dayjs.tz.guess()})</time>
  {:else if Array.isArray(value)}
    <span>{value.join(', ')}</span>
  {:else}
    <span>{value}</span>
  {/if}
</div>

<!-- style -->
<style lang="scss">
</style>
