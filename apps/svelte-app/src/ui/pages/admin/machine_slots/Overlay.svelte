<!-- Overlay -->
<script lang="ts">
  
  // core
  import type { MachineState } from '@apps/core';
  import { provideMachineBloc } from '@apps/core';
  import { notification } from '~/share/stores';
  import { useBlocState } from '~/share/hooks/useBlocState';

  // components
  import LoadingModal from '~/ui/components/overlays/modals/LoadingModal.svelte';
  import Alert from '~/ui/components/feedbacks/alerts/Alert.svelte';

  const bloc = provideMachineBloc();
  const state = useBlocState<MachineState>(bloc);
</script>

<!-- HTML -->
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
