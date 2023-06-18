<!-- Reference -->
<script lang="ts">
  import { PaymentTransaction } from '@apps/core';

  export let source: PaymentTransaction;

  $: channel = source['channel'].channel as string;
  $: ksherRef = source['reference2'] as string;
  $: link2500Ref = source['reference3'] as string;
  $: defRef = source['reference1'] as string;
</script>

<!-- HTML -->
<div class="whitespace-nowrap">
  {#if channel == 'promptpay'}
    <span>{ksherRef}</span>
  {:else if channel == 'creditcard'}
    <span>{link2500Ref}</span>
  {:else}
    <span>{defRef}</span>
  {/if}
</div>

<!-- style -->
<style lang="scss">
</style>
