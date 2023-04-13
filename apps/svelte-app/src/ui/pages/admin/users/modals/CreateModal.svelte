<!-- CreateModal -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { matchField, pattern, required } from 'svelte-forms/validators';

  // core
  import type { RoleState } from '@apps/core';
  import { provideRoleBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { modal } from '~/share/stores';

  // components
  import FormModal from '~/ui/components/overlays/modals/FormModal.svelte';
  import FormControl from '~/ui/components/forms/inputs/FormControl.svelte';
  import MessageError from '~/ui/components/forms/inputs/MessageError.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';
  import PasswordInput from '~/ui/components/forms/inputs/PasswordInput.svelte';
  import Select from '~/ui/components/forms/selects/Select.svelte';

  const formId = 'user-create-form';

  const bloc = provideRoleBloc();
  const state = useBlocState<RoleState>(bloc);

  const username = field('username', '', [required(), length(3, 24), pattern(/^[a-zA-Z0-9_]+$/)]);
  const role = field('role', '', [required()]);
  const password = field('password', '', [required(), length(8, 16)]);
  const confirm = field('confirm', '', [required(), matchField(password)]);
  const modalForm = form(username, role, password, confirm);

  function length(min: number, max: number) {
    return async (val: string) => {
      return { valid: val.length >= min && val.length <= max, name: 'length' };
    };
  }

  let roleOptions = [];

  onMount(async () => {
    await bloc.list();

    if ($state.kind === 'load-success') {
      roleOptions = $state.list.map(r => ({
        name: r.name.charAt(0).toUpperCase() + r.name.substring(1),
        value: r.name,
      }));
      role.set(roleOptions[0].value);
    }
  });

  const dispatch = createEventDispatcher();
  $: handleCreate = async () => {
    try {
      await modalForm.validate();
      const data = modalForm.summary();

      if ($modalForm.errors.length == 0) {
        dispatch('create', data);
      }
    } catch (e) {
      console.log(e);
    }
  };
</script>

<!-- HTML -->
<FormModal {formId} show={$modal.event === 'create'} disabled={$modalForm.errors.length != 0}>
  <h3 class="text-lg font-medium text-primary-900 mb-4">Create User</h3>
  <form id={formId} class="grid grid-cols-1 gap-4" on:submit|preventDefault={handleCreate}>
    <FormControl name="Username" required>
      <TextInput name="Username" maxlength={24} bind:value={$username.value} />
      <MessageError hasError={$modalForm.hasError('username.required')} message="The username is required" />
      <MessageError
        hasError={$modalForm.hasError('username.length')}
        message="The username must be more than 3 and less than 24 characters long"
      />
      <MessageError
        hasError={$modalForm.hasError('username.pattern')}
        message="The username can only consist of alphabetical, number and underscore"
      />
    </FormControl>
    <FormControl name="Role" required>
      <Select bind:value={$role.value} options={roleOptions} />
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
