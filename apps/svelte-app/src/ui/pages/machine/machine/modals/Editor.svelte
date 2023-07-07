<!-- MachineEditor -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import { _ } from 'svelte-i18n';

  import { Machine } from '@apps/core';
  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';

  export let machine: Machine;

  const dispatch = createEventDispatcher();

  const formID = 'machine-editor-form';
  const id = field('id', machine.id, []);
  const name = field('name', machine.name, [required()]);
  const branchId = field('branch_id', machine.branch?.id, []);
  const location = field('location', machine.location, []);
  const type = field('type', machine.type, []);
  const vendor = field('vendor', machine.vendor, []);
  const status = field('status', machine.status, []);
  const machineForm = form(id, name, branchId, location, type, vendor, status);

  async function handleSubmit() {
    await machineForm.validate();
    if ($machineForm.valid) {
      dispatch('update', machineForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">{$_('machine.edit-title')}: {machine.name || $_('general.untitled')}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <TextInputField id="name" label={$_('machine.field.name')} bind:value={$name.value} error={$name.errors?.at(0)} />

    <!-- <SelectField
      id="branch_id"
      label={$_('machine.field.branch')}
      bind:value={$branchId.value}
      error={$branchId.errors?.at(0)}
      options={[]}
    /> -->

    <TextInputField id="location" label={$_('machine.field.location')} bind:value={$location.value} error={$location.errors?.at(0)} />

    <TextInputField id="type" label={$_('machine.field.type')} bind:value={$type.value} error={$type.errors?.at(0)} />

    <TextInputField id="vendor" label={$_('machine.field.vendor')} bind:value={$vendor.value} error={$vendor.errors?.at(0)} />
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" type="submit" form={formID}>{$_('button.save')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
