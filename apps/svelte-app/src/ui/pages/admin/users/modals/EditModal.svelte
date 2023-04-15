<!--EditModal -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  // core
  import type { RoleState } from '@apps/core';
  import { provideRoleBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { access, modal } from '~/share/stores';

  // components
  import FormModal from '~/ui/components/overlays/modals/FormModal.svelte';
  import FormControl from '~/ui/components/forms/inputs/FormControl.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';
  import Select from '~/ui/components/forms/selects/Select.svelte';

  const formId = 'user-edit-form';

  const bloc = provideRoleBloc();
  const state = useBlocState<RoleState>(bloc);

  const id = field('id', $modal.id, []);
  const role = field('role', $modal.source['role'], [required()]);

  const modalForm = form(id, role);

  let roleOptions = [];

  onMount(async () => {
    await bloc.list();

    if ($state.kind === 'load-success') {
      roleOptions = $state.list.map(r => ({
        name: r.name.charAt(0).toUpperCase() + r.name.substring(1),
        value: r.name,
      }));
    }
  });

  const dispatch = createEventDispatcher();
  $: handleChangeRole = async () => {
    try {
      await modalForm.validate();
      const data = modalForm.summary();

      if ($modalForm.errors.length == 0) {
        dispatch('change-role', data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  $: handleChangePassword = async () => {
    modal.update(m => ({ ...m, event: 'change-password' }));
  };

  $: handleResetPassword = async () => {
    try {
      await modalForm.validate();
      const data = modalForm.summary();
      dispatch('reset-password', data);
    } catch (e) {
      console.log(e);
    }
  };
</script>

<!-- HTML -->
<FormModal {formId} disabled={$modalForm.errors.length != 0}>
  <h3 class="text-lg font-medium text-primary-900 mb-4">Edit User</h3>
  <form id={formId} class="grid grid-cols-1 gap-4" on:submit|preventDefault={handleChangeRole}>
    <FormControl name="ID" required>
      <TextInput name="ID" bind:value={$id.value} disabled />
    </FormControl>
    <FormControl name="Username" required>
      <TextInput name="Username" bind:value={$modal.source['username']} disabled />
    </FormControl>
    <FormControl name="Role" required>
      <Select bind:value={$role.value} options={roleOptions} />
    </FormControl>
  </form>
  <div class="flex justify-start gap-3 py-4 mt-4">
    <button
      type="button"
      class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all 
      hover:bg-gray-100 hover:text-primary-500 
      focus:ring focus:ring-gray-100 
      disabled:cursor-not-allowed 
      disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
      on:click|once={handleResetPassword}
    >
      Reset Password
    </button>
    {#if $modal.source["username"] === $access.name}
      <button
        type="button"
        class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all 
        hover:bg-gray-100 hover:text-primary-500 
        focus:ring focus:ring-gray-100 
        disabled:cursor-not-allowed 
        disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
        on:click|once={handleChangePassword}
      >
        Change Password
      </button>
    {/if}
  </div>
</FormModal>

<!-- style -->
<style lang="scss">
</style>
