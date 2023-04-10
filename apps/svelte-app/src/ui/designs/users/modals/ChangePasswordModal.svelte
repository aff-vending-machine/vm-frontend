<!-- ChangePasswordModal -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { matchField, required } from 'svelte-forms/validators';

  // core
  import { modal } from '~/share/stores';

  // components
  import FormModal from '~/ui/components/overlays/modals/FormModal.svelte';
  import FormControl from '~/ui/components/forms/inputs/FormControl.svelte';
  import MessageError from '~/ui/components/forms/inputs/MessageError.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';
  import PasswordInput from '~/ui/components/forms/inputs/PasswordInput.svelte';

  const formId = 'user-change-password-form';

  const id = field('id', $modal.id, []);
  const current = field('current', '', [required()]);
  const password = field('password', '', [required(), length(8, 16)]);
  const confirm = field('confirm', '', [required(), matchField(password)]);

  const modalForm = form(id, current, password, confirm);

  function length(min: number, max: number) {
    return async (val: string) => {
      return { valid: val.length >= min && val.length <= max, name: 'length' };
    };
  }

  const dispatch = createEventDispatcher();
  $: handleCreate = async () => {
    try {
      await modalForm.validate();
      const data = modalForm.summary();

      if ($modalForm.errors.length == 0) {
        dispatch('change-password', data);
      }
    } catch (e) {
      console.log(e);
    }
  };
</script>

<!-- HTML -->
<FormModal {formId} show={$modal.event === 'change-password'} disabled={$modalForm.errors.length != 0}>
  <h3 class="text-lg font-medium text-primary-900 mb-4">Change Password</h3>
  <form id={formId} class="grid grid-cols-1 gap-4" on:submit|preventDefault={handleCreate}>
    <FormControl name="ID" required>
      <TextInput name="ID" bind:value={$id.value} disabled />
    </FormControl>
    <FormControl name="Username">
      <TextInput name="Username" bind:value={$modal.source["username"]} disabled />
    </FormControl>
    <FormControl name="Current Password" required>
      <PasswordInput name="Current Password" bind:value={$current.value} />
      <MessageError hasError={$modalForm.hasError('current.required')} message="The current password is required" />
    </FormControl>
    <FormControl name="Password" required>
      <PasswordInput name="Password" bind:value={$password.value} />
      <MessageError hasError={$modalForm.hasError('password.required')} message="The password is required" />
      <MessageError
        hasError={$modalForm.hasError('password.length')}
        message="The password must have at least 8 characters"
      />
    </FormControl>
    <FormControl name="Confirm Password" required>
      <PasswordInput name="Confirm Password" bind:value={$confirm.value} />
      <MessageError
        hasError={$modalForm.hasError('confirm.required')}
        message="The confirmation password is required"
      />
    </FormControl>
    <MessageError hasError={$password.value !== $confirm.value} message="The password do not match" />
  </form>
</FormModal>

<!-- style -->
<style lang="scss">
</style>
