<!-- GroupViewer -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { CatalogGroup } from '@apps/core';

  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let group: CatalogGroup;

  const dispatch = createEventDispatcher();

  function handleEdit() {
    dispatch('edit', { source: group });
  }

  function handleDelete() {
    dispatch('delete', { source: group });
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full md:pl-4 space-y-1">
      <h1 class="text-xl font-bold pb-2">{group.name}</h1>
      <p class="text-gray-700 italic">"{group.description}"</p>
      <p class="text-gray-700">
        {$_('group.columns.status')}:
        {#if group.is_enable}
          <span class="text-success-500">{$_('group.status-on')}</span>
        {:else}
          <span class="text-danger-500">{$_('group.status-off')}</span>
        {/if}
      </p>
    </div>
  </div>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" on:click={handleEdit}>{$_('button.edit')}</Button>
    <Button color="danger" on:click={handleDelete}>{$_('button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
