<!-- MachineViewer -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { Machine } from '@apps/core';

  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let machine: Machine;

  const dispatch = createEventDispatcher();

  function handleEdit() {
    dispatch('edit', { source: machine });
  }
  function handleDelete() {
    dispatch('delete', { source: machine });
  }
  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full md:pl-4 space-y-1">
      <h1 class="text-xl font-bold pb-2">{machine.name}</h1>
      <div class="grid grid-cols-3 gap-4">
        <p class="text-gray-700">serial number:</p>
        <p class="text-gray-700 col-span-2">{machine.serial_number}</p>
        <p class="text-gray-700">location:</p>
        <p class="text-gray-700 col-span-2">{machine.location}</p>
        <p class="text-gray-700">vendor:</p>
        <p class="text-gray-700 col-span-2">{machine.vendor}</p>
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
