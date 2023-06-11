<!-- Reference -->
<script lang="ts">
  import { CartItem, TransactionReport } from '@apps/core';

  export let source: TransactionReport;

  $: channel = source['payment_channel'] as string;
  $: ksherRef = source['reference2'] as string;
  $: link2500Ref = source['reference1'] as string;
</script>

<!-- HTML -->
<div class="whitespace-nowrap">
  {#if channel == 'promptpay'}
    <span>{ksherRef}</span>
  {:else if channel == 'creditcard'}
    <span>{link2500Ref}</span>
  {:else}
    <span>{source['reference1']}</span>
  {/if}
</div>

<!-- style -->
<style lang="scss">
</style>
