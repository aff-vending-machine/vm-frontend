<!-- Action -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Transaction } from '@apps/core';
  import ActionButton from '~/ui/components/elements/buttons/ActionButton.svelte';

  export let source: Transaction;

  const dispatch = createEventDispatcher();
  const handleDoneEvent = () => dispatch('event', { event: 'done', id: source.id });
  const handleCancelEvent = () => dispatch('event', { event: 'cancel', id: source.id });
</script>

<!-- HTML -->
<div class="space-x-5">
  <div
    class="inline-flex -space-x-0 divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300 shadow-sm"
  >
  {#if source.order_status === 'PAID'|| source.order_status === 'ORDERED'}
    <ActionButton class="hover:text-blue-500" text="DONE" on:click={handleDoneEvent} />
    <ActionButton class="hover:text-red-500" text="CANCEL" on:click={handleCancelEvent} />
  {/if}
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
