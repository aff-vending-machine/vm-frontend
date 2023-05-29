<!-- Eraser -->
<script lang="ts">
  import { CatalogGroup } from '@apps/core';
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import { _ } from 'svelte-i18n';

  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let group: CatalogGroup;

  const dispatch = createEventDispatcher();

  const formID = 'group-eraser-form';
  const id = field('id', group.id, [required()]);
  const groupForm = form(id);

  async function handleSubmit() {
    await groupForm.validate();
    if ($groupForm.valid) {
      dispatch('delete', groupForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">Delete Product Group: {group.name || 'Untitled'}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <p class="text-center my-4 text-lg">
      Are You Sure! Want to Delete"<span class="text-red-500">{group.name}</span>"?
    </p>
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="danger" type="submit" form={formID}>{$_('button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
