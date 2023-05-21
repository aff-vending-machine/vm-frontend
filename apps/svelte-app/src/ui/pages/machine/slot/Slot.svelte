<!-- Slot -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, Readable, derived } from 'svelte/store';
  import dayjs from 'dayjs';

  // core
  import {
    GroupState,
    MachineSlot,
    ProductState,
    provideCatalogGroupBloc,
    provideCatalogProductBloc,
    provideMachineBloc,
    provideMachineSlotBloc,
    provideSyncBloc,
    MachineSlotState,
    MachineState,
    SyncState,
    BulkUpdateMachineSlot,
    CreateMachineSlot,
  } from '@apps/core';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { stateDerived } from '~/utils/helpers/state';
  import { SelectOptionsType } from '~/utils/types/options';

  // components
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';
  import FilterBar from './FilterBar.svelte';
  import SlotCard from './components/SlotCard.svelte';
  import SlotEmpty from './components/SlotEmpty.svelte';
  import Creator from './modals/Creator.svelte';
  import Editor from './modals/Editor.svelte';
  import Eraser from './modals/Eraser.svelte';

  // props
  export let id: string;

  // bloc
  const bloc = provideMachineSlotBloc();
  const actionBloc = provideMachineSlotBloc();
  const machineBloc = provideMachineBloc();
  const syncBloc = provideSyncBloc();
  const groupBloc = provideCatalogGroupBloc();
  const productBloc = provideCatalogProductBloc();

  const state = useBlocState<MachineSlotState>(bloc);
  const machineState = useBlocState<MachineState>(machineBloc);
  const groupState = useBlocState<GroupState>(groupBloc);
  const productState = useBlocState<ProductState>(productBloc);
  const statePromise: Readable<Promise<MachineSlotState>> = derived(state, stateDerived);

  const machineId = writable<number | null>();
  const maxRows = writable<number>();
  const maxCols = writable<number>();
  const groupOptions = writable<SelectOptionsType[]>([]);
  const productOptions = writable<SelectOptionsType[]>([]);

  const action = writable<string | null>();
  const slot = writable<MachineSlot | null>();

  const reload = async (list: MachineSlot[]) => {
    if (!list || list.length === 0) {
      return { rows: 0, cols: 0, slots: [] };
    }

    let rows = 0;
    let cols = 0;
    let colIdx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    list.forEach(slots => {
      let index = parseInt(slots.code[1], 10);
      colIdx[index]++;
      if (cols < colIdx[index]) {
        cols = colIdx[index];
      }
      if (rows < index) {
        rows = index;
      }
    });

    maxRows.set(rows);
    maxCols.set(cols);
  };

  const loadMachineData = async () => {
    await machineBloc.get($machineId);
    await bloc.list($machineId, { preloads: 'CatalogProduct' });
  };

  const loadGroupOptions = async () => {
    const status = await groupBloc.list();

    if (status === 'success') {
      const options = $groupState.list.map(g => ({ value: g.id, label: g.name }));
      groupOptions.set(options);
    }
  };

  const loadProductOptions = async () => {
    const status = await productBloc.list();

    if (status === 'success') {
      const options = $productState.list.map(p => ({
        value: p.id,
        label: `${p.name} (${p.sale_price}.-)`,
        filter: p.group_id,
      }));
      productOptions.set(options);
    }
  };

  const handleAction = (e: CustomEvent) => {
    const { type, source } = e.detail;
    action.set(type || e.type);
    slot.set(source as MachineSlot);
  };

  const handleSelect = (e: CustomEvent) => {
    const { data } = e.detail;
    action.set('edit');
    slot.set(data as MachineSlot);
  };

  const handleClose = (e: CustomEvent) => {
    action.set(null);
    slot.set(null);
  };

  const handleCreate = async (e: CustomEvent) => {
    handleClose(e);
    const data = e.detail;
    const slot: MachineSlot = { ...data, id: 0, product: $productState.list.find(p => p.id === data.product_id) };
    local = [...local, slot];
  };

  const handleUpdate = async (e: CustomEvent) => {
    handleClose(e);
    const data = e.detail;
    const idx = local.findIndex(s => s.id === data.id);
    local[idx] = { ...local[idx], ...data };
  };

  const handleDelete = async (e: CustomEvent) => {
    handleClose(e);
    const data = e.detail;
    local = local.filter(s => s.id !== data.id);
  };

  $: fillSlots = (origin: MachineSlot[], filter: any, rows: number, cols: number): MachineSlot[] => {
    let filled = [];
    // filter stock
    if (filter.stock !== null) {
      let [cond, percent] = filter.stock.split(':');
      switch (cond) {
        case '<':
          origin = origin.filter(s => s.stock / s.capacity < percent);
          break;

        case '>':
          origin = origin.filter(s => s.stock / s.capacity > percent);
          break;

        case '<=':
          origin = origin.filter(s => s.stock / s.capacity <= percent);
          break;
      }
    }

    // filter edit
    if (filter.edit !== null) {
      origin = origin.filter(
        s =>
          isEdited(
            s,
            $state.list.find((ss: MachineSlot) => ss.id === s.id),
          ) === filter.edit,
      );
    }

    // filter status
    if (filter.enable !== null) {
      origin = origin.filter(s => s.is_enable === (filter.enable === true));
    }

    // filter search
    if (filter.search !== '') {
      origin = origin.filter(s => [s.code, s.product.name].join('|').indexOf(filter.search) !== -1);
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const code = '0' + (r + 1) + c;
        const slot = origin.find(s => s.code === code);
        if (slot === undefined) {
          filled.push({ id: -1, code });
        } else {
          filled.push(slot);
        }
      }
    }

    return filled;
  };

  const isEdited = (a: any, b: any) => {
    return JSON.stringify(a) !== JSON.stringify(b);
  };

  const isPassed5Seconds = (date?: Date) => {
    if (!date) return true;
    if (dayjs().isAfter(dayjs(date).add(5, 'second'), 'second')) return true;
    return false;
  };

  const handleAdjustStock = (e: CustomEvent) => {
    const { id, stock } = e.detail;
    const idx = local.findIndex((s: MachineSlot) => s.id === id);
    local[idx].stock = stock;
  };

  const handleRefresh = async (e: CustomEvent) => {
    await syncBloc.fetchSlots($machineId);
    await reload($state.list);
  };

  const handleSave = async (e: CustomEvent) => {
    const createdSlots = local.filter(s => s.id === 0);
    createdSlots.forEach(async s => {
      const data: CreateMachineSlot = {
        product_id: s.product_id,
        code: s.code,
        stock: s.stock,
        capacity: s.capacity,
        is_enable: s.is_enable,
      };
      await actionBloc.create($machineId, data);
    });

    const deletedSlot = $state.list.filter(s => local.findIndex(l => l.id === s.id) === -1);
    deletedSlot.forEach(async s => {
      await actionBloc.delete($machineId, s.id);
    });

    const slots: BulkUpdateMachineSlot = local
      .filter(s =>
        isEdited(
          s,
          $state.list.find(ss => s.id === ss.id),
        ),
      )
      .filter(s => s.id !== 0)
      .map(s => ({
        id: s.id,
        product_id: s.product_id,
        stock: s.stock,
        capacity: s.capacity,
        is_enable: s.is_enable,
      }));

    const status = await actionBloc.bulkUpdate($machineId, slots);

    if (status === 'success') {
      await syncBloc.pushSlots($machineId);
      await bloc.list($machineId, { preloads: 'CatalogProduct' });
    }
  };

  const handleCancel = (e: CustomEvent) => {
    local = $state.list.map(s => ({ ...s }));
  };

  onMount(async () => {
    machineId.set(parseInt(id, 10));
    await syncBloc.fetchSlots($machineId);
    await loadMachineData();
    await loadGroupOptions();
    await loadProductOptions();
    await reload($state.list);

    console.log($machineState.data);
    
  });

  $: filter = { search: '', stock: null, enable: null, edit: null };
  $: local = $state.list?.map(s => ({ ...s }));
</script>

<!-- HTML -->
<section class="mx-4">
  <div class="w-full bg-white rounded-xl shadow-xl shadow-primary-100 space-y-4 py-4">
    <div class="px-8 pt-4">
      <h4 class="text-xl font-semibold text-gray-700">Machine: {$machineState.data?.serial_number}</h4>
    </div>
    <div class="p-4">
      <FilterBar
        bind:filter
        time={$machineState.data?.sync_slot_time}
        isEdited={isEdited(local, $state.list)}
        isSynced={isPassed5Seconds($machineState.data?.sync_slot_time)}
        on:refresh={handleRefresh}
        on:save={handleSave}
        on:cancel={handleCancel}
      />
      <div class="hidden md:flex float-right space-x-2 my-1">
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
      {#await $statePromise}
        <div class="text-center py-4">Loading...</div>
      {:then $state}
        <div class="grid max-w-full grid-cols-10-auto gap-2 overflow-auto">
          {#each fillSlots(local, filter, $maxRows, $maxCols) as slot}
            {#if slot.id >= 0}
              <SlotCard
                {slot}
                isEdited={isEdited(
                  slot,
                  $state.list.find(s => s.id === slot.id),
                )}
                on:stock={handleAdjustStock}
                on:select={handleSelect}
              />
            {:else}
              <SlotEmpty
                code={slot.code}
                isExist={$state.list.findIndex(s => s.code === slot.code) !== -1}
                on:create={handleAction}
              />
            {/if}
          {/each}
        </div>
      {:catch error}
        <div class="text-center text-red-500 py-4">
          {error.message || 'An error occurred while loading the data.'}
        </div>
      {/await}
    </div>
  </div>
</section>

<!-- Display modals -->
{#if $slot}
  <Modal on:close={handleClose}>
    {#if $action === 'create'}
      <Creator
        slotcode={$slot.code}
        groupOptions={$groupOptions}
        productOptions={$productOptions}
        on:create={handleCreate}
        on:cancel={handleClose}
      />
    {:else if $action === 'edit'}
      <Editor
        slot={$slot}
        groupOptions={$groupOptions}
        productOptions={$productOptions}
        on:update={handleUpdate}
        on:delete={handleAction}
        on:cancel={handleClose}
      />
    {:else if $action === 'delete'}
      <Eraser slot={$slot} on:delete={handleDelete} on:cancel={handleClose} />
    {/if}
  </Modal>
{/if}

<!-- style -->
<style lang="scss">
</style>