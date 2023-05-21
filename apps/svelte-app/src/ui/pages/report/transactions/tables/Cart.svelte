<!-- Cart -->
<script lang="ts">
  import { TransactionReport } from '@apps/core';

  export let source: TransactionReport;
</script>

<!-- HTML -->
<div class="whitespace-nowrap">
  {#each source['cart'] as item}
    <span class="font-mono">[{item.code}: {item.price} x {item.quantity} = {item.price * item.quantity}]</span>
    <br/>
  {/each}
</div>

<!-- style -->
<style lang="scss">
</style>
