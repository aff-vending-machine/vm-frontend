<!-- OrderStatus -->
<script lang="ts">
  import { Transaction } from '@apps/core';

  export let source: Transaction;

  $: getColor = (status: string) => {
    switch (status) {
      case 'ORDERED':
        return 'bg-blue-500'
      case 'PAID':
      case 'DONE-BROKEN':
      case 'BROKEN':
        return 'bg-purple-500'
      case 'DONE':
        return 'bg-green-500'
      case 'CANCELLED':
        return 'bg-red-500'
    }
  }

</script>

<!-- HTML -->
<div class="text-center">
  <span class={`py-1 px-3 text-white rounded-xl ${getColor(source['order_status'])}`}>
    {source.order_status}
  </span>
</div>

<!-- style -->
<style lang="scss">
</style>
