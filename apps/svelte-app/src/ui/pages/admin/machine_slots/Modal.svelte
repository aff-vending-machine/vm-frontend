<!-- Modal -->
<script lang="ts">
  // core
  import { CreateMachineSlot, MachineSlotState, UpdateMachineSlot, provideMachineSlotBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { modal } from '~/share/stores';
  import { notify } from '~/share/modules/messages';

  // components
  import SelectModal from './modals/SelectModal.svelte';
  import CreateModal from './modals/CreateModal.svelte';
  import EditModal from './modals/EditModal.svelte';
  import { createEventDispatcher } from 'svelte';

  const bloc = provideMachineSlotBloc();
  const state = useBlocState<MachineSlotState>(bloc);
    
  const dispatch = createEventDispatcher();

  // events
  $: handleCreate = async (e: CustomEvent) => {
    try {
      const payload: CreateMachineSlot = {
        product_id: e.detail.product_id,
        code: e.detail.code,
        stock: e.detail.stock,
        capacity: e.detail.capacity,
      };
      await bloc.create(e.detail.machine_id, payload);
      notify($state.kind, 'create machine slot', $state.error);
      dispatch('reload');
    } catch (e) {
      console.log(e);
      notify('error', 'create machine slot', e);
    }
    modal.set({});
  };

$: handleEdit = async (e: CustomEvent) => {
    try {
      const payload = {
        product: e.detail.product,
        stock: e.detail.stock,
        capacity: e.detail.capacity,
        is_enable: e.detail.is_enable,
      };
      dispatch('update', {id: e.detail.id, slot: payload });
    } catch (e) {
      console.log(e);
    }
    modal.set({});
  };
</script>

<!-- HTML -->
{#if $modal.event === 'select'}
<SelectModal />
{/if}
{#if $modal.event === 'create'}
<CreateModal on:create={handleCreate}  />
{/if}
{#if $modal.event === 'edit'}
<EditModal on:edit={handleEdit}  />
{/if}

<!-- style -->
<style lang="scss">
</style>
