<!-- ProductGroup -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';

  import { ProductGroup, provideCatalogGroupBloc, GroupState } from '@apps/core';
  import { useBlocState } from '~/utils/hooks/useBlocState';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import { ColumnType } from '~/utils/types/table';
  import { stateDerived } from '~/utils/helpers/state';

  const bloc = provideCatalogGroupBloc();
  const state = useBlocState<GroupState>(bloc);
  const statePromise: Readable<Promise<GroupState>> = derived(state, stateDerived);

  const filters = writable({
    page: 1,
    offset: 0,
    limit: 10,
    sort_by: 'id:asc',
    search: '',
    preloads: 'Products',
  });

  const columns: ColumnType[] = [
    { key: 'id', index: 'id', title: 'ID', sortable: true },
    { key: 'name', index: 'name', title: 'Name', sortable: true },
    { key: 'description', index: 'description', title: 'Description', sortable: true },
    { key: 'is_enable', index: 'is_enable', title: 'Enable', sortable: true },
  ];

  const action = writable<string | null>();
  const group = writable<ProductGroup | null>();

  const reload = async () => {
    await bloc.list($filters);
  };

  const handleAction = (e: CustomEvent) => {
    const { type, source } = e.detail;
    action.set(type || e.type);
    group.set(source as ProductGroup);
  };

  const handleSelect = (e: CustomEvent) => {
    const { data } = e.detail;
    action.set('view');
    group.set(data as ProductGroup);
  };

  const handleClose = (e: CustomEvent) => {
    action.set(null);
    group.set(null);
  };

  const handlePageChange = (e: CustomEvent) => {
    const { page } = e.detail;
    $filters.page = page;
    $filters.offset = (page - 1) * $filters.limit;
    reload();
  };

  onMount(async () => {
    await bloc.list(filters);
  });
</script>

<section class="card">
  <div class="product-group-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">Product Groups</h4>
    </div>
    <div class="w-full table-container">
      <div class="border border-gray-200">
        {#await $statePromise}
          <div class="text-center py-4">Loading...</div>
        {:then $state}
          <Table {columns} source={$state.list} on:sort={reload} on:select={handleSelect} on:action={handleAction}>
            <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300">
              <tr class="bg-gray-50">
                <td class="sticky px-6 py-4" colspan={columns.length}>
                  <Pagination
                    page={$filters.page}
                    itemsPerPage={$filters.limit}
                    totalItems={$state.count}
                    on:page-change={handlePageChange}
                  />
                </td>
              </tr>
            </tfoot>
          </Table>
        {:catch error}
          <div class="text-center text-red-500 py-4">
            {error.message || 'An error occurred while loading the data.'}
          </div>
        {/await}
      </div>
    </div>
  </div>
</section>

<style>
  .card {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }

  @media (max-width: 1023px) {
    .table-container {
      overflow-x: auto;
    }
  }
</style>
