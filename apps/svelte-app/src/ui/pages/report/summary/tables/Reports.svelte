<!-- Export -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  
  import { Machine } from '@apps/core';
  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let source: Machine;

  const dispatch = createEventDispatcher();
  const handleAction = (type: string) => () => dispatch('action', { type, source });
</script>

<!-- HTML -->
<div class="flex justify-center space-x-2">
  <Button on:click={handleAction('stock')} class="text-xs focus:outline-none" color="secondary">
    {$_('button.stock')}</Button>
  <Button on:click={handleAction('transaction')} class="text-xs focus:outline-none" color="tertiary">
    {$_('button.payment')}</Button>
</div>

<!-- style -->
<style lang="scss">
</style>
