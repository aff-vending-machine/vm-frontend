<!-- Overlay -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // core
  import type { CreateRole, RoleState, UpdateRole } from '@apps/core';
  import { provideRoleBloc } from '@apps/core';
  import { modal, notification } from '~/share/stores';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { notify } from '~/share/modules/messages/notify';

  // components
  import CreateModal from '~/ui/pages/admin/roles/modals/CreateModal.svelte';
  import EditModal from '~/ui/pages/admin/roles/modals/EditModal.svelte';
  import DeleteModal from '~/ui/pages/admin/roles/modals/DeleteModal.svelte';
  import SelectModal from '~/ui/pages/admin/roles/modals/SelectModal.svelte';
  import LoadingModal from '~/ui/components/overlays/modals/LoadingModal.svelte';
  import Alert from '~/ui/components/feedbacks/alerts/Alert.svelte';

  const bloc = provideRoleBloc();
  const state = useBlocState<RoleState>(bloc);

  const dispatch = createEventDispatcher();

  $: handleCreate = async (e: CustomEvent) => {
    try {
      const payload: CreateRole = {
        name: e.detail.role,
        permissions: Object.entries<number>(e.detail.permissions).map(([k, v]) => ({
          scope: k,
          level: v,
        })),
      };

      await bloc.create(payload);
      notify($state.kind, 'create role', $state.error);
      dispatch('reload');
    } catch (e) {
      console.log(e);
      notify('error', 'create role', e);
    }
    modal.set({});
  };

  $: handleEdit = async (e: CustomEvent) => {
    try {
      const payload: UpdateRole = {
        permissions: Object.entries<number>(e.detail.permissions).map(([k, v]) => ({
          scope: k,
          level: v,
        })),
      };
      await bloc.update(e.detail.role, payload);
      notify($state.kind, 'edit role', $state.error);
      dispatch('reload');
    } catch (e) {
      console.log(e);
      notify('error', 'edit role', e);
    }
    modal.set({});
  };

  $: handleDelete = async (e: CustomEvent) => {
    try {
      await bloc.delete(e.detail.role);
      notify($state.kind, 'delete role', $state.error);
      dispatch('reload');
    } catch (e) {
      console.log(e);
      notify('error', 'delete role', e);
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
  <EditModal on:edit={handleEdit} />
{/if}
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
