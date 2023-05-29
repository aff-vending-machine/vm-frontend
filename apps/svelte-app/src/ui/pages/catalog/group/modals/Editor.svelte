<!-- Editor -->
<script lang="ts">
  import { CatalogGroup } from '@apps/core';
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import { _ } from 'svelte-i18n';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import ToggleField from '~/ui/components/forms/input/ToggleField.svelte';

  export let group: CatalogGroup;

  const dispatch = createEventDispatcher();

  const formID = 'group-editor-form';
  const id = field('id', group.id, [required()]);
  const name = field('name', group.name, [required()]);
  const description = field('description', group.description, []);
  const isEnable = field('is_enable', group.is_enable, [required()]);
  const groupForm = form(id, name, description, isEnable);

  async function handleSubmit() {
    await groupForm.validate();
    if ($groupForm.valid) {
      dispatch('update', groupForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">Update Product Group: {group.name || 'Untitled'}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <TextInputField id="name" label="Name" bind:value={$name.value} error={$name.errors?.at(0)} />
    <TextInputField id="description" label="Description" bind:value={$description.value} error={$description.errors?.at(0)} />
    <ToggleField id="is_enable" label="Active" bind:value={$isEnable.value} />
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" type="submit" form={formID}>{$_('button.save')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
