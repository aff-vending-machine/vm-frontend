<!-- Action -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Machine } from '@apps/core';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  export let source: Machine;

  const dispatch = createEventDispatcher();
  const handleAction = (type: string) => () => dispatch('action', { type, source });
</script>

<!-- HTML -->
<div class="flex justify-center space-x-4">
  <button on:click|stopPropagation={handleAction('view')} class="focus:outline-none">
    <Icon class="w-4 h-4 fill-gray-500 hover:fill-green-500" i="ic-view" />
  </button>
</div>

<!-- style -->
<style lang="scss">
</style>
