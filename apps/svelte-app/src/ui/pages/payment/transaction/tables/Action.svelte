<!-- Action -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { PaymentTransaction } from '@apps/core';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  export let source: PaymentTransaction;

  const dispatch = createEventDispatcher();
  const handleAction = (type: string) => () => dispatch('action', { type, source });

  $: disabled = source.order_status === 'DONE' || source.order_status === 'CANCELLED';
</script>

<!-- HTML -->
<div class="flex justify-center space-x-4">
  {#if !disabled}
    <button on:click|stopPropagation={handleAction('done')} class="focus:outline-none" {disabled}>
      <Icon
        class="w-8 h-8 {disabled ? 'fill-gray-500 hover:fill-gray-500' : 'fill-green-500 hover:fill-green-700'}"
        i="ic-done"
      />
    </button>
    <button on:click|stopPropagation={handleAction('cancel')} class="focus:outline-none" {disabled}>
      <Icon
        class="w-8 h-8 {disabled ? 'fill-gray-500 hover:fill-gray-500' : 'fill-red-500 hover:fill-red-700'}"
        i="ic-cancel"
      />
    </button>
  {/if}
</div>

<!-- style -->
<style lang="scss">
</style>
