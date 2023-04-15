<!-- Table -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  // core
  import { SyncState, TransactionState, provideSyncBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { sortToObj } from '~/share/utils/sort';
  import { notify } from '~/share/modules/messages/notify';

  // components
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import TableLoader from '~/ui/components/feedbacks/loaders/TableLoader.svelte';
  import Filter from './Filter.svelte';
  import TableBloc from './tables/TableBloc.svelte';

  export let state: TransactionState;
  export let filter: Record<string, any>;

  const dispatch = createEventDispatcher();

  const sbloc = provideSyncBloc();
  const sstate = useBlocState<SyncState>(sbloc);

  onMount(async () => {
    dispatch('reload', filter);
  });

  $: handleChangePage = (e: CustomEvent) => {
    filter.page = e.detail.page;
    filter.offset = (filter.page - 1) * filter.limit;
    dispatch('reload', filter);
  };

  $: handleSortFilter = (e: CustomEvent) => {
    filter.sort_by = e.detail.field + ':' + e.detail.sort;
    dispatch('reload', filter);
  };

  $: handleChangeFilter = () => {
    dispatch('reload', filter);
  };

  $: handleSyncTransactions = async (e: CustomEvent) => {
    const { id } = e.detail;

    await sbloc.pullTransactions(id);
    notify($sstate.kind, 'pull transactions', $sstate.error);

    if ($sstate.kind === 'load-success') {
      dispatch('reload', filter);
    }
  };
</script>

<!-- HTML -->
<div class="w-full bg-white rounded-xl shadow-xl shadow-primary-100 space-y-4 py-4">
  <div class="px-8 pt-4">
    <h4 class="text-xl font-semibold text-gray-700">Transactions</h4>
  </div>
  <div class="p-4">
    <Filter bind:filter on:change={handleChangeFilter} on:sync={handleSyncTransactions} on:event />
  </div>
  <div class="border-t border-b border-gray-300 p-4">
    {#if state.kind === 'load-in-progress' || $sstate.kind === 'load-in-progress'}
      <div class="w-full">
        <TableLoader />
      </div>
    {:else if state.kind === 'load-success'}
      <div class="w-full overflow-y-auto">
        <TableBloc sorts={sortToObj(filter.sort_by)} source={state.list} on:sort={handleSortFilter} on:event />
      </div>
    {:else if state.kind === 'load-failure'}
      <div class="text-center">Something Wrong! ({state.error?.message})</div>
    {/if}
  </div>
  <div class="w-full px-8">
    <Pagination
      class="flex flex-row justify-between"
      bind:page={filter.page}
      bind:limit={filter.limit}
      bind:count={state.count}
      on:change={handleChangePage}
    />
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
