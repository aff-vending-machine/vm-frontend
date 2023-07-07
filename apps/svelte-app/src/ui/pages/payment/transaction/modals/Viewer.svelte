<!-- TransactionViewer -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { PaymentTransaction } from '@apps/core';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import AutoRender from '~/ui/components/overlays/modals/AutoRender.svelte';

  export let transaction: PaymentTransaction;

  const dispatch = createEventDispatcher();

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full mr-2" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full md:pl-4 space-y-1">
      <h1 class="text-xl font-bold pb-2">{transaction.merchant_order_id}</h1>
      <div class="grid grid-cols-3 space-y-1 p-4 w-full max-h-[32rem] overflow-y-auto">
        {#each Object.entries(transaction) as [key, value]}
          {#if !!value}
            <div class="font-semibold">{key}</div>
            <div class="col-span-2"><AutoRender {key} {value} /></div>
          {/if}
        {/each}
      </div>
    </div>
  </div>

  <div class="flex justify-end space-x-4 mt-4">
    <!-- <Button color="success" on:click={handleDelete}>{$_('button.confirm')}</Button> -->
    <Button color="danger" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
