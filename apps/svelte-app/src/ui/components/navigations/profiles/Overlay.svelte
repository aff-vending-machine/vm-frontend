<!-- Overlay -->
<script lang="ts">
  // core
  import type { ChangePassword, UserState } from '@apps/core';
  import { provideUserBloc } from '@apps/core';
  import { modal, notification } from '~/share/stores';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { notify } from '~/share/modules/messages/notify';

  // components
  import ChangePasswordModal from '~/ui/designs/users/modals/ChangePasswordModal.svelte';
  import LoadingModal from '~/ui/components/overlays/modals/LoadingModal.svelte';
  import Alert from '~/ui/components/feedbacks/alerts/Alert.svelte';

  const bloc = provideUserBloc();
  const state = useBlocState<UserState>(bloc);

  $: handleChangePassword = async (e: CustomEvent) => {
    try {
      const payload: ChangePassword = {
        old_password: e.detail.current,
        new_password: e.detail.password,
      };
      await bloc.changePassword(payload);
      notify($state.kind, 'change password', $state.error);
    } catch (e) {
      console.log(e);
      notify('error', 'change password', e);
    }
    modal.set({});
  };
</script>

<!-- HTML -->
{#if $modal.event === 'change-password'}
  <ChangePasswordModal on:change-password={handleChangePassword} />
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
