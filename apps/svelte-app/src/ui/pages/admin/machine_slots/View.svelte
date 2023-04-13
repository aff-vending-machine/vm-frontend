<!-- View -->
<script lang="ts">
  import { onMount } from 'svelte';

  // core
  import { MachineSlot, MachineSlotState, MachineState, provideMachineBloc } from '@apps/core';
  import { provideMachineSlotBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { stockOptions } from '~/share/modules/options/stock';
  import { enableOptions } from '~/share/modules/options/enable';
  import { modal } from '~/share/stores';

  // components
  import Select from '~/ui/components/forms/selects/Select.svelte';
  import CreateButton from '~/ui/components/elements/buttons/CreateButton.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';
  import Overlay from './Overlay.svelte';
  import Slot from './Slot.svelte';
  import NoSlot from './NoSlot.svelte';

  export let id: string;

  let machineId = parseInt(id, 10);

  $: rows = 0;
  $: cols = 0;
  $: localSlotList = [];

  const mbloc = provideMachineBloc();
  const mstate = useBlocState<MachineState>(mbloc);

  const bloc = provideMachineSlotBloc();
  const state = useBlocState<MachineSlotState>(bloc);

  $: filter = {
    search: '',
    stock: null,
    enable: null,
  };

  onMount(async () => {
    mbloc.view(machineId);
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
      localSlotList = $state.list.map(s => ({ ...s }));
    }
  });

  $: handleReload = () => bloc.list(machineId);

  $: fill = (slots: MachineSlot[]): MachineSlot[] => {
    let newSlots = [];

    // filter stock
    if (filter.stock !== null) {
      let [cond, percent] = filter.stock.split(':');
      switch (cond) {
        case '<':
          slots = slots.filter(s => s.stock / s.capacity < percent);
          break;

        case '>':
          slots = slots.filter(s => s.stock / s.capacity > percent);
          break;

        case '<=':
          slots = slots.filter(s => s.stock / s.capacity <= percent);
          break;
      }
    }

    // filter status
    if (filter.enable !== null) {
      slots = slots.filter(s => s.is_enable === (filter.enable === true));
    }

    // filter search
    if (filter.search !== '') {
      slots = slots.filter(s => s.code.indexOf(filter.search) !== -1);
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let slot = slots.find(s => s.code === '0' + (r + 1) + c);
        if (slot === undefined) {
          newSlots.push(null);
        } else {
          newSlots.push(slot);
        }
      }
    }

    return newSlots;
  };

  $: getBase = (code: string): MachineSlot => {
    return $state.list.find(s => s.code === code);
  };

  $: handleEditEvent = (e: CustomEvent) => {
    const { id, slot } = e.detail;

    modal.set({ event: 'edit', id, source: slot });
  };

  $: handleStock = (e: CustomEvent) => {
    const { id, stock } = e.detail;

    const idx = localSlotList.findIndex(s => s.id === id);
    localSlotList[idx].stock = stock;
  };

  $: handleSync = (_: MouseEvent) => {
    bloc.syncGet();
  };

  $: handleUpdate = (_: MouseEvent) => {
    bloc.syncSet();
  };

  $: handleReset = (_: MouseEvent) => {
    localSlotList = $state.list.map(s => ({ ...s }));
  };

  $: handleCreate = (_: MouseEvent) => {
    modal.set({ event: 'create' });
  };
</script>

<!-- HTML -->
<section class="mx-4">
  <div class="w-full bg-white rounded-xl shadow-xl shadow-primary-100 space-y-4 py-4">
    <div class="px-8 pt-4">
      {#if $state.kind === 'load-success'}
        <h4 class="text-xl font-semibold text-gray-700">Machine: {$mstate.data.serial_number}</h4>
      {/if}
    </div>
    <div class="p-4">
      <div class="flex flex-col md:flex-row w-full justify-between">
        <div class="float-left flex space-x-2">
          <div class="mb-3 text-center">
            <CreateButton text="Sync" on:click={handleSync} />
          </div>
          <div class="mb-3 text-center">
            <CreateButton text="Save" on:click={handleUpdate} />
          </div>
          <div class="mb-3 text-center">
            <CreateButton text="Cancel" on:click={handleReset} />
          </div>
          <div class="mb-3 text-center">
            <CreateButton text="Create" on:click={handleCreate} />
          </div>
        </div>
        <div class="float-right flex space-x-2">
          <div class="mb-3 text-center">
            <span class="text-xs font-semibold">Slot Search</span>
            <TextInput name="search" bind:value={filter.search} maxlength={3} />
          </div>
          <div class="mb-3 text-center">
            <span class="text-xs font-semibold">Stock</span>
            <Select bind:value={filter.stock} options={stockOptions} />
          </div>
          <div class="mb-3 text-center">
            <span class="text-xs font-semibold">Status</span>
            <Select bind:value={filter.enable} options={enableOptions} />
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-b border-gray-300 p-4">
      {#if $state.kind === 'load-in-progress'}
        <div class="w-full">
          <!-- <TableLoader /> -->
        </div>
      {:else if $state.kind === 'load-success'}
        <div class="grid max-w-full grid-cols-10-auto gap-2 overflow-auto">
          {#each fill(localSlotList) as slot}
            {#if slot === null}
              <NoSlot />
            {:else}
              <Slot {slot} base={getBase(slot.code)} on:stock={handleStock} on:select={handleEditEvent} />
            {/if}
          {/each}
        </div>
      {:else if $state.kind === 'load-failure'}
        <div class="text-center">Something Wrong! ({$state.error?.message})</div>
      {/if}
    </div>
  </div>
</section>

<!-- Modal -->
<Overlay on:reload={handleReload} />

<!-- style -->
<style lang="scss">
</style>
