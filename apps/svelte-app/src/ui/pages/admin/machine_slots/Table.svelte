<!-- Table -->
<script lang="ts">
  // core
  import { MachineSlot, Machine } from '@apps/core';
  import { filterSlots, isEdited, isPassed5Minutes } from './_scripts';

  // components
  import TableLoader from '~/ui/components/feedbacks/loaders/TableLoader.svelte';
  import Filter from './Filter.svelte';
  import Slot from './components/Slot.svelte';
  import NoSlot from './components/NoSlot.svelte';
  import Modal from './Modal.svelte';
  import { modal } from '~/share/stores';
  import { createEventDispatcher } from 'svelte';

  // props
  export let machine: Machine;
  export let loading: boolean;
  export let error: Error;
  export let layout: { rows: number; cols: number; slots: MachineSlot[] };

  // events
  const dispatch = createEventDispatcher();
  $: handleModal = async (e: CustomEvent) => {
    modal.set({ event: e.type, id: e.detail.id, source: { ...e.detail } });
  };
  $: handleStock = (e: CustomEvent) => {
    const { id, stock } = e.detail;

    const idx = localSlots.findIndex(s => s.id === id);
    localSlots[idx].stock = stock;
  };
  $: handleSave = (e: CustomEvent) => {
    const saved = localSlots.filter(s =>
      isEdited(
        s,
        layout.slots.find(ss => s.id === ss.id),
      ),
    );

    dispatch('save', { slots: saved });
  };
  $: handleCancel = (e: CustomEvent) => {
    localSlots = layout.slots?.map(s => ({ ...s }));
  };
  $: handleCreate = (e: CustomEvent) => {
    const { slot } = e.detail;
    localSlots.push(slot);
  };
  $: handleUpdate = (e: CustomEvent) => {
    const { id, slot } = e.detail;

    const idx = localSlots.findIndex(s => s.id === id);
    localSlots[idx] = { ...localSlots[idx], ...slot };
  };
  $: handleDelete = (e: CustomEvent) => {
    const { id } = e.detail;

    const idx = localSlots.findIndex(s => s.id === id);
    localSlots.splice(idx, 1);
  };

  // params
  $: filter = { search: '', stock: null, enable: null };
  $: localSlots = layout.slots?.map(s => ({ ...s }));
</script>

<!-- HTML -->
<div class="w-full bg-white rounded-xl shadow-xl shadow-primary-100 space-y-4 py-4">
  <div class="px-8 pt-4">
    <h4 class="text-xl font-semibold text-gray-700">Machine: {machine?.serial_number}</h4>
  </div>
  <div class="p-4">
    <Filter
      time={machine?.sync_slot_time}
      isEdited={isEdited(localSlots, layout.slots)}
      isSynced={isPassed5Minutes(machine?.sync_slot_time)}
      bind:filter
      on:fetch
      on:save={handleSave}
      on:cancel={handleCancel}
      on:create={handleModal}
    />
    <div class="flex float-right space-x-2">
      <div class="bg-red-100 px-4">
        <span>disable</span>
      </div>
      <div class="bg-gray-100 px-4">
        <span>empty</span>
      </div>
      <div class="bg-yellow-100 px-4">
        <span>≤ 20%</span>
      </div>
      <div class="bg-blue-100 px-4">
        <span>available</span>
      </div>
      <div class="bg-green-100 px-4">
        <span>full</span>
      </div>
    </div>
  </div>
  <div class="border-t border-b border-gray-300 p-4">
    {#if loading}
      <div class="w-full">
        <TableLoader />
      </div>
    {:else if error}
      <div class="text-center">Something Wrong! ({error.message})</div>
    {:else}
      <div class="grid max-w-full grid-cols-10-auto gap-2 overflow-auto">
        {#each filterSlots(localSlots, filter, layout) as slot}
          {#if !!slot.id}
            <Slot
              {slot}
              isEdited={isEdited(
                slot,
                layout.slots.find(s => s.id === slot.id),
              )}
              on:stock={handleStock}
              on:select={handleModal}
            />
          {:else}
            <NoSlot
              code={slot.code}
              isExist={localSlots.findIndex(s => s.code === slot.code) !== -1}
              on:create={handleModal}
            />
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</div>

<!-- Modal -->
<Modal on:create={handleCreate} on:update={handleUpdate} on:delete={handleDelete} />

<!-- style -->
<style lang="scss">
</style>
