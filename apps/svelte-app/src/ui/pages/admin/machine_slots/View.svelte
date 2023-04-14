<!-- View -->
<script lang="ts">
  import { onMount } from 'svelte';

  // core
  import { MachineSlotState } from '@apps/core';
  import { provideMachineSlotBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';

  // components
  import Modal from './Modal.svelte';
  import Table from './Table.svelte';
  import Notify from './Notify.svelte';

  export let id: string;

  let machineId = parseInt(id, 10);

  $: rows = 0;
  $: cols = 0;
  $: slots = [];

  const bloc = provideMachineSlotBloc();
  const state = useBlocState<MachineSlotState>(bloc);

  onMount(async () => {
    await handleReload()
  });

  $: handleReload = async () => {
    await bloc.list(machineId);

    if ($state.kind === 'load-success') {
      let maxCol = 0;
      let maxRow = 0;
      let colIdx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      $state.list.forEach(slots => {
        let index = parseInt(slots.code[1], 10);
        colIdx[index]++;
        if (maxCol < colIdx[index]) {
          maxCol = colIdx[index];
        }
        if (maxRow < index) {
          maxRow = index;
        }
      });

      rows = maxRow;
      cols = maxCol;
      slots = $state.list.map(s => ({ ...s }));
    }
  };
</script>

<!-- HTML -->
<section class="mx-4 space-y-8">
  <Table id={machineId} state={$state} slots={slots} cols={cols} rows={rows} on:reload={handleReload} />
</section>

<!-- Overlay -->
<Modal on:reload={handleReload} />
<Notify />

<!-- style -->
<style lang="scss">
</style>
