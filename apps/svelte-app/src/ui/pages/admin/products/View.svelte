<!-- View -->
<script lang="ts">
  // core
  import type { ProductState } from '@apps/core';
  import { provideProductBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { modal } from '~/share/stores';

  // components
  import Table from './Table.svelte';
  import Notify from './Notify.svelte';
  import Modal from './Modal.svelte';

  // props

  // bloc
  const bloc = provideProductBloc();
  const state = useBlocState<ProductState>(bloc);

  let filter = {
    page: 1,
    offset: 0,
    limit: 10,
    sort_by: 'id:asc',
  };

  $: handleEvent = (e: CustomEvent) => modal.set(e.detail);
  $: handleReload = (e: CustomEvent) => bloc.list(filter);
  $: handleSelect = (e: CustomEvent) => modal.set({ ...e.detail, event: 'select' });
  $: handleCreate = (e: CustomEvent) => modal.set({ event: 'create' });
</script>

<!-- HTML -->
<section class="mx-4">
  <Table
    bind:filter
    state={$state}
    on:reload={handleReload}
    on:create={handleCreate}
    on:select={handleSelect}
    on:event={handleEvent}
  />
</section>

<!-- Overlay -->
<Notify />
<Modal on:reload={handleReload} />

<!-- style -->
<style lang="scss">
</style>
