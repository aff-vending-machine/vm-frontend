<!-- View -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // core
  import { MachineSlotState, MachineState, SyncState, provideMachineBloc, provideSyncBloc } from '@apps/core';
  import { provideMachineSlotBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';

  // components
  import Table from './Table.svelte';
  import Notify from './Notify.svelte';
  import { reload } from './_scripts';

  // props
  export let id: string;
  const machineId = parseInt(id, 10);

  // bloc
  const bloc = provideMachineSlotBloc();
  const state = useBlocState<MachineSlotState>(bloc);
  const mbloc = provideMachineBloc();
  const mstate = useBlocState<MachineState>(mbloc);
  const sbloc = provideSyncBloc();
  const sstate = useBlocState<SyncState>(sbloc);

  onMount(async () => {
    // await Promise.all([mbloc.view(machineId), bloc.list(machineId)]);
    await mbloc.view(machineId);
    handleFetch(null);
  });

  // event
  $: handleFetch = async (e: CustomEvent) => {
    await sbloc.fetchSlots(machineId);
    await bloc.list(machineId);
  };
  $: handleSave = async (e: CustomEvent) => {
    const { slots } = e.detail;
    await bloc.bulkUpdate(machineId, slots);
    await sbloc.pushSlots(machineId);
    await bloc.list(machineId);
  };

  // params
  $: loading = $state.kind === 'load-in-progress' || $sstate.kind === 'load-in-progress';
  $: machine = $mstate.data;
  $: error = $state.error || $mstate.error;
  $: layout = reload($state.list);
</script>

<!-- HTML -->
<section class="mx-4">
  <Table {machine} {loading} {error} {layout} on:fetch={handleFetch} on:save={handleSave} />
</section>

<!-- Overlay -->
<Notify />

<!-- style -->
<style lang="scss">
</style>
