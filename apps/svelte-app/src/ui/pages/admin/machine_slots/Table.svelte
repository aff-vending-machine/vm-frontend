<!-- Table -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  // core
  import {
    MachineSlot,
    MachineSlotState,
    MachineState,
    provideMachineBloc,
    SyncState,
    provideSyncBloc,
  } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';

  // components
  import Slot from './Slot.svelte';
  import NoSlot from './NoSlot.svelte';
  import TableLoader from '~/ui/components/feedbacks/loaders/TableLoader.svelte';
  import Filter from './Filter.svelte';
  import { notify } from '~/share/modules/messages/notify';

  export let id: UniqueID;
  export let state: MachineSlotState;
  export let rows: number;
  export let cols: number;
  export let slots: MachineSlot[];

  const dispatch = createEventDispatcher();

  const mbloc = provideMachineBloc();
  const mstate = useBlocState<MachineState>(mbloc);

  const sbloc = provideSyncBloc();
  const sstate = useBlocState<SyncState>(sbloc);

  $: filter = {
    search: '',
    stock: null,
    enable: null,
  };

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

  onMount(async () => {
    mbloc.view(id);
  });

  $: handleStock = (e: CustomEvent) => {
    const { id, stock } = e.detail;

    const idx = slots.findIndex(s => s.id === id);
    slots[idx].stock = stock;
  };

  $: handleFetchSlots = async (_: CustomEvent) => {
    await sbloc.fetchSlots(id);
    notify($sstate.kind, 'fetch slots', $sstate.error);

    if ($sstate.kind === 'load-success') {
      dispatch('reload');
    }
  };

  $: handlePushSlots = async (_: CustomEvent) => {
    await sbloc.pushSlots(id);
    notify($sstate.kind, 'push slots', $sstate.error);
  };

  $: getBase = (code: string): MachineSlot => {
    return state.list.find(s => s.code === code);
  };
</script>

<!-- HTML -->
<div class="w-full bg-white rounded-xl shadow-xl shadow-primary-100 space-y-4 py-4">
  <div class="px-8 pt-4">
    {#if state.kind === 'load-success'}
      <h4 class="text-xl font-semibold text-gray-700">Machine: {$mstate.data.serial_number}</h4>
    {/if}
  </div>
  <div class="p-4">
    <Filter bind:filter on:fetch={handleFetchSlots} on:save={handlePushSlots} on:reload on:event />
  </div>
  <div class="border-t border-b border-gray-300 p-4">
    {#if state.kind === 'load-in-progress' || $sstate.kind === 'load-in-progress'}
      <div class="w-full">
        <TableLoader />
      </div>
    {:else if state.kind === 'load-success'}
      <div class="grid max-w-full grid-cols-10-auto gap-2 overflow-auto">
        {#each fill(slots) as slot}
          {#if slot === null}
            <NoSlot />
          {:else}
            <Slot {slot} base={getBase(slot.code)} on:stock={handleStock} on:select />
          {/if}
        {/each}
      </div>
    {:else if state.kind === 'load-failure'}
      <div class="text-center">Something Wrong! ({state.error?.message})</div>
    {/if}
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
