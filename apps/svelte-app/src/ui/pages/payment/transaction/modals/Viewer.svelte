<!-- Viewer -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { PaymentTransaction } from '@apps/core';

  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let transaction: PaymentTransaction;

  const dispatch = createEventDispatcher();
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full md:w-2/3 md:pl-4 space-y-1">
      <h1 class="text-xl font-bold pb-2">{transaction.merchant_order_id}</h1>
    </div>
  </div>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="success" on:click={() => dispatch('delete', { data: transaction })}>{$_('button.confirm')}</Button>
    <Button color="danger" outline on:click={() => dispatch('cancel')}>{$_('button.cancel')}</Button>
  </div>
</div>
