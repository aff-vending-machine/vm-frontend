<!-- Modal -->
<script lang="ts">
  // core
	import { CreateProduct, ProductState, UpdateProduct, provideProductBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { modal } from '~/share/stores';

  // components
  import SelectModal from './modals/SelectModal.svelte';
  import EditModal from './modals/EditModal.svelte';
  import { notify } from '~/share/modules/messages';
  import { createEventDispatcher } from 'svelte';
  import CreateModal from './modals/CreateModal.svelte';

  const bloc = provideProductBloc();
  const state = useBlocState<ProductState>(bloc);
    
  const dispatch = createEventDispatcher();

// events

$: handleCreate = async (e: CustomEvent) => {
    try {
      const payload: CreateProduct = {
        sku: e.detail.sku,
        name: e.detail.name,
        type: e.detail.type,
        image_url: e.detail.image_url,
        price: e.detail.price,
      };
      await bloc.create(payload);
      notify($state.kind, 'create product', $state.error);
      dispatch('reload');
    } catch (e) {
      console.log(e);
      notify('error', 'create product', e);
    }
    modal.set({});
  };

$: handleEdit = async (e: CustomEvent) => {
    try {
      const payload: UpdateProduct = {
        name: e.detail.name,
        type: e.detail.type,
        image_url: e.detail.image_url,
        price: e.detail.price,
      };
      await bloc.update(e.detail.id, payload);
      notify($state.kind, 'update product', $state.error);
      dispatch('reload');
    } catch (e) {
      console.log(e);
      notify('error', 'update product', e);
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
