<!-- Price -->
<script lang="ts">
  import { Transaction } from '@apps/core';

  export let source: Transaction;
</script>

<!-- HTML -->
<div>
    {source.order_price}/{source.paid_price}
</div>

<!-- style -->
<style lang="scss">
</style>
