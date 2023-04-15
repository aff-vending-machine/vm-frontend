<!-- DeleteModal -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  // core
  import { modal } from '~/share/stores';

  // components
  import FormModal from '~/ui/components/overlays/modals/FormModal.svelte';
  import FormControl from '~/ui/components/forms/inputs/FormControl.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';

  const formId = 'user-delete-form';

  const role = field('role', '', [required(), match($modal.id)]);
  const modalForm = form(role);
  modalForm.validate();

  function match(validate: string) {
    return async (val: string) => {
      return { valid: val === validate, name: 'match' };
    };
  }

  const dispatch = createEventDispatcher();
  const handleDelete = async () => {
    try {
      await modalForm.validate();
      const data = modalForm.summary();

      if ($modalForm.errors.length == 0) {
        dispatch('delete', data);
      }
    } catch (e) {
      console.log(e);
    }
  };
</script>

<!-- HTML -->
<FormModal {formId} disabled={$modalForm.errors.length != 0}>
  <h3 class="text-lg font-medium text-primary-900">Delete Role</h3>
  <p class="text-sm text-gray-700 mb-4">
    Please type "<span class="text-danger-500">{$modal.id}</span>" to confirm.
  </p>
  <form id={formId} class="grid grid-cols-1 gap-4" on:submit|preventDefault={handleDelete}>
    <FormControl name="Role name" required>
      <TextInput name="Role name" maxlength={24} bind:value={$role.value} />
    </FormControl>
  </form>
</FormModal>

<!-- style -->
<style lang="scss">
</style>
