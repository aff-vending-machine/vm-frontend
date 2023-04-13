<!-- Overlay -->
<script lang="ts">
  // core
  import type { MachineState } from '@apps/core';
  import { provideMachineBloc } from '@apps/core';
  import { modal, notification } from '~/share/stores';
  import { useBlocState } from '~/share/hooks/useBlocState';

  // components
  import LoadingModal from '~/ui/components/overlays/modals/LoadingModal.svelte';
  import Alert from '~/ui/components/feedbacks/alerts/Alert.svelte';
  import SelectModal from './modals/SelectModal.svelte';

  const bloc = provideMachineBloc();
  const state = useBlocState<MachineState>(bloc);

  $: handleEdit = async (e: CustomEvent) => {
    try {
      
    } catch (e) {
      console.log(e);
    }
    modal.set({});
  };
</script>

<!-- HTML -->
{#if $modal.event === 'edit'}
  <SelectModal on:edit={handleEdit} />
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
