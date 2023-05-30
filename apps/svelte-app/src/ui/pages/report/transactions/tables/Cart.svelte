<!-- Cart -->
<script lang="ts">
  import { CartItem, TransactionReport } from '@apps/core';

  export let source: TransactionReport;

  $: cart = source['cart'] as CartItem[];
</script>

<!-- HTML -->
<div class="whitespace-nowrap">
  {#each cart as item}
    <span class="font-mono">[{item.code} ({item.name}): {item.price} x {item.quantity} = {item.price * item.quantity}]</span>
    <br />
  {/each}
</div>

<!-- style -->
<style lang="scss">
</style>
