<!-- MachineEditor -->
<script lang="ts">
  import { Machine } from '@apps/core';
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';

  import Image from '~/components/common/images/Image.svelte';
  import Button from '~/components/common/buttons/Button.svelte';
  import SelectField from '~/components/forms/input/SelectField.svelte';
  import TextInputField from '~/components/forms/input/TextInputField.svelte';
  import NumberInputField from '~/components/forms/input/NumberInputField.svelte';

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

  const productForm = form(id, name, branchId, location, type, vendor, status);

  async function handleSubmit() {
    await productForm.validate();
    if ($productForm.valid) {
      dispatch('save', productForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">Edit Machine: {machine.name || 'Untitled'}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <TextInputField id="name" label="Name" bind:value={$name.value} error={$name.errors?.at(0)} />

    <SelectField
      id="branch_id"
      label="Branch"
      bind:value={$branchId.value}
      error={$branchId.errors?.at(0)}
      options={[]}
    />

    <TextInputField id="location" label="Location" bind:value={$location.value} error={$location.errors?.at(0)} />

    <TextInputField id="type" label="Type" bind:value={$type.value} error={$type.errors?.at(0)} />

    <TextInputField id="vendor" label="Vendor" bind:value={$vendor.value} error={$vendor.errors?.at(0)} />
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="red" outline on:click={handleCancel}>Cancel</Button>
    <Button color="blue" type="submit" form={formID}>Save</Button>
  </div>
</div>
