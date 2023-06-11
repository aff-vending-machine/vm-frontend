<!-- Editor -->
<script lang="ts">
  import { User } from '@apps/core';
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';

  export let user: User;

  const dispatch = createEventDispatcher();

  const formID = 'user-editor-form';

  const id = field('id', user.id, []);
  const name = field('name', user.username, [required()]);
  const branchId = field('branch_id', user.branch_id, []);

  const productForm = form(id, name, branchId);

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
  <h2 class="text-xl font-bold mb-4">Edit User: {user.username || 'Untitled'}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <TextInputField id="name" label="Name" bind:value={$name.value} error={$name.errors?.at(0)} />

    <!-- <SelectField
      id="branch_id"
      label="Branch"
      bind:value={$branchId.value}
      error={$branchId.errors?.at(0)}
      options={[]}
    /> -->
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" type="submit" form={formID}>Save</Button>
    <Button color="warning" outline on:click={handleCancel}>Cancel</Button>
  </div>
</div>
