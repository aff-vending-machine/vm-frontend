<!-- MachineEraser -->
<script lang="ts">
  import { Machine } from '@apps/core';
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import { _ } from 'svelte-i18n';

  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let machine: Machine;

  const dispatch = createEventDispatcher();

  const formID = 'machine-eraser-form';
  const id = field('id', machine.id, [required()]);
  const machineForm = form(id);

  async function handleSubmit() {
    await machineForm.validate();
    if ($machineForm.valid) {
      dispatch('delete', machineForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">{$_('machine.delete-title')}: {machine.name || $_('machine.untitled')}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <p class="text-center my-4 text-lg">
      {$_('machine.delete-message')} "<span class="text-red-500">{machine.name}</span>"?
    </p>
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="danger" type="submit" form={formID}>{$_('button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
