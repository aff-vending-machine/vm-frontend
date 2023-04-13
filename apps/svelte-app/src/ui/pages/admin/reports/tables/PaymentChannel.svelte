<!-- Price -->
<script lang="ts">
  import { Transaction } from '@apps/core';

  export let source: Transaction;

  $: getColor = (channel: string) => {
    switch (channel) {
      case 'promptpay':
        return 'text-blue-500';
      case 'creditcard':
        return 'text-purple-500';
    }
  };
</script>

<!-- HTML -->
<div>
  <span class={getColor(source['payment_channel'])}>
    {source.payment_channel}
  </span>
</div>

<!-- style -->
<style lang="scss">
</style>
