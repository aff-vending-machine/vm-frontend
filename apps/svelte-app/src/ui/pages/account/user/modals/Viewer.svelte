<!-- Viewer -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { User } from '@apps/core';

  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let user: User;

  const dispatch = createEventDispatcher();

  function handleEdit() {
    dispatch('edit', { source: user });
  }
  function handleDelete() {
    dispatch('delete', { source: user });
  }
  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full md:pl-4 space-y-1">
      <h1 class="text-xl font-bold pb-2">{user.username}</h1>
      <div class="grid grid-cols-3 gap-4">
        <p class="text-gray-700">role:</p>
        <p class="text-gray-700 col-span-2">{user.role}</p>
      </div>
      <p ></p>
    </div>
  </div>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" on:click={handleEdit}>{$_('button.edit')}</Button>
    <Button color="danger" on:click={handleDelete}>{$_('button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
