<!-- Creator -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import { _ } from 'svelte-i18n';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';

  const dispatch = createEventDispatcher();

  const formID = 'group-creator-form';
  const name = field('name', '', [required()]);
  const description = field('description', '', []);
  const groupForm = form(name, description);

  async function handleSubmit() {
    await groupForm.validate();
    if ($groupForm.valid) {
      dispatch('create', groupForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">{$_('group.create-title')}: {$name.value || $_('general.untitled')}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <TextInputField id="name" label={$_('group.field.name')} bind:value={$name.value} error={$name.errors?.at(0)} />
    <TextInputField
      id="description"
      label={$_('group.field.description')}
      bind:value={$description.value}
      error={$name.errors?.at(0)}
    />
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" type="submit" form={formID}>{$_('button.add-group')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
