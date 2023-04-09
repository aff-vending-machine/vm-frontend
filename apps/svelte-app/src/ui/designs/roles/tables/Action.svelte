<!-- Action -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Role } from '@apps/core';
  import ActionButton from '~/ui/components/elements/buttons/ActionButton.svelte';

  export let source: Role;

  const dispatch = createEventDispatcher();
  const handleEditEvent = () => dispatch('event', { event: 'edit', id: source.name, source });
  const handleDeleteEvent = () => dispatch('event', { event: 'delete', id: source.name, source });
</script>

<!-- HTML -->
<div class="space-x-5">
  <div
    class="inline-flex -space-x-0 divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300 shadow-sm"
  >
    <ActionButton class="hover:text-blue-500" text="EDIT" on:click={handleEditEvent} />
    <ActionButton class="hover:text-red-500" text="DELETE" on:click={handleDeleteEvent} />
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
