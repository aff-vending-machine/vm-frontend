<!-- Overlay -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // core
  import type { ChangePassword, ChangeRole, CreateUser, UserState } from '@apps/core';
  import { provideUserBloc } from '@apps/core';
  import { modal, notification } from '~/share/stores';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { notify } from '~/share/modules/messages/notify';

  // components
  import CreateModal from '~/ui/designs/users/modals/CreateModal.svelte';
  import EditModal from '~/ui/designs/users/modals/EditModal.svelte';
  import DeleteModal from '~/ui/designs/users/modals/DeleteModal.svelte';
  import SelectModal from '~/ui/designs/users/modals/SelectModal.svelte';
  // import ChangePasswordModal from '~/ui/designs/users/modals/ChangePasswordModal.svelte';
  import LoadingModal from '~/ui/components/overlays/modals/LoadingModal.svelte';
  import Alert from '~/ui/components/feedbacks/alerts/Alert.svelte';

  const bloc = provideUserBloc();
  const state = useBlocState<UserState>(bloc);

  const dispatch = createEventDispatcher();

  $: handleCreate = async (e: CustomEvent) => {
    try {
      const payload: CreateUser = {
        username: e.detail.username,
        role: e.detail.role,
        password: e.detail.password,
      };
      await bloc.create(payload);
      notify($state.kind, 'create user', $state.error);
      dispatch('reload');
    } catch (e) {
      console.log(e);
      notify('error', 'create user', e);
    }
    modal.set({});
  };

  $: handleChangeRole = async (e: CustomEvent) => {
    try {
      const payload: ChangeRole = {
        id: e.detail.id,
      };
      await bloc.changeRole(e.detail.username, payload);
      notify($state.kind, 'change user role', $state.error);
      dispatch('reload');
    } catch (e) {
      console.log(e);
      notify('error', 'change user role', e);
    }
    modal.set({});
  };

  // $: handleChangePassword = async (e: CustomEvent) => {
  //   try {
  //     const payload: ChangePassword = {
  //       old_password: e.detail.current,
  //       new_password: e.detail.password,
  //     };
  //     await bloc.changePassword(payload);
  //     notify($state.kind, 'change password', $state.error);
  //     dispatch('reload');
  //   } catch (e) {
  //     console.log(e);
  //     notify('error', 'change password', e);
  //   }
  //   modal.set({});
  // };

  $: handleResetPassword = async (e: CustomEvent) => {
    try {
      await bloc.resetPassword(e.detail.username);
      notify($state.kind, 'reset password to 00000000', $state.error);
    } catch (e) {
      console.log(e);
      notify('error', 'reset password', e);
    }
    modal.set({});
  };

  $: handleDelete = async (e: CustomEvent) => {
    try {
      await bloc.delete(e.detail.username);
      notify($state.kind, 'delete user', $state.error);
      dispatch('reload');
    } catch (e) {
      console.log(e);
      notify('error', 'create user', e);
    }
    modal.set({});
  };
</script>

<!-- HTML -->
{#if $modal.event === 'select'}
  <SelectModal />
{/if}
{#if $modal.event === 'create'}
  <CreateModal on:create={handleCreate} />
{/if}
{#if $modal.event === 'edit'}
  <EditModal on:change-role={handleChangeRole} on:reset-password={handleResetPassword} />
{/if}
<!-- {#if $modal.event === 'change-password'}
  <ChangePasswordModal on:change-password={handleChangePassword} />
{/if} -->
{#if $modal.event === 'delete'}
  <DeleteModal on:delete={handleDelete} />
{/if}

{#if $state.kind === 'load-in-progress'}
  <LoadingModal />
{/if}

{#if $notification.enable}
  <Alert
    type={$notification.type}
    title={$notification.title}
    message={$notification.msg}
    bind:show={$notification.enable}
  />
{/if}

<!-- style -->
<style lang="scss">
</style>
