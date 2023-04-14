<!-- Overlay -->
<script lang="ts">
  // core
  import type { MachineState } from '@apps/core';
  import { provideMachineBloc } from '@apps/core';
  import { modal } from '~/share/stores';
  import { useBlocState } from '~/share/hooks/useBlocState';

  // components
  import LoadingModal from '~/ui/components/overlays/modals/LoadingModal.svelte';
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

<!-- style -->
<style lang="scss">
</style>
