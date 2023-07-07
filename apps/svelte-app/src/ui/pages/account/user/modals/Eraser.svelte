<!-- UserEraser -->
<script lang="ts">
  import { User } from '@apps/core';
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import { _ } from 'svelte-i18n';

  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let user: User;

  const dispatch = createEventDispatcher();

  const formID = 'user-eraser-form';
  const id = field('id', user.id, [required()]);
  const userForm = form(id);

  async function handleSubmit() {
    await userForm.validate();
    if ($userForm.valid) {
      dispatch('delete', userForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">{$_('user.delete-title')}: {user.username || $_('general.untitled')}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <p class="text-center my-4 text-lg">
      {$_('general.delete-message')} "<span class="text-red-500">{user.username}</span>"?
    </p>
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="danger" type="submit" form={formID}>{$_('button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
