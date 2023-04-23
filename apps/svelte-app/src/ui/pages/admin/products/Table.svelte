<!-- Table -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  // core
  import { ProductState } from '@apps/core';
  import { sortToObj } from '~/share/utils/sort';

  // components
  import TableLoader from '~/ui/components/feedbacks/loaders/TableLoader.svelte';  
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import TableBloc from './tables/TableBloc.svelte';
  import Filter from './Filter.svelte';
  // props
  export let filter: Record<string, any>;
  export let state: ProductState;

  const dispatch = createEventDispatcher();

  onMount(async () => {
    dispatch('reload', filter);
  });

  // events
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
  // params
</script>

<!-- HTML -->
<div class="w-full bg-white rounded-xl shadow-xl shadow-primary-100 space-y-4 py-4">
  <div class="px-8 pt-4">
    <h4 class="text-xl font-semibold text-gray-700">Products</h4>
  </div>
  <div class="p-4">
    <Filter bind:filter on:create on:change={handleChangeFilter} />
  </div>
  <div class="border-t border-b border-gray-300 p-4">
    {#if state.kind === 'load-in-progress'}
      <div class="w-full">
        <TableLoader />
      </div>
    {:else if state.kind === 'load-success'}
      <div class="w-full overflow-y-auto">
        <TableBloc sorts={sortToObj(filter.sort_by)} source={state.list} on:sort={handleSortFilter} on:select on:event />
      </div>
    {:else if state.kind === 'load-failure'}
      <div class="text-center">Something Wrong! ({state.error?.message})</div>
    {/if}
  </div>
  <div class="w-full px-8">
    <Pagination
      class="flex flex-row justify-between"
      page={filter.page}
      limit={filter.limit}
      count={state.count}
      on:change={handleChangePage}
    />
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
