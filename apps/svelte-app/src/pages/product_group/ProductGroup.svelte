<!-- ProductGroup -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Readable, derived } from 'svelte/store';

  import type { Product, ProductState } from '@apps/core';
  import { provideProductBloc } from '@apps/core';
  import { useBlocState } from '~/utils/hooks/useBlocState';

  import Table from '~/components/common/tables/Table.svelte';
  import Pagination from '~/components/navigations/paginations/Pagination.svelte';

  const bloc = provideProductBloc();
  const state = useBlocState<ProductState>(bloc);

  let filters = {
    page: 1,
    offset: 0,
    limit: 10,
    sort_by: 'id:asc',
    group: '',
    search: '',
  };

  let columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Group', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'sku', header: 'SKU', sortable: true },
    { key: 'image_url', header: 'Image', image: true },
    { key: 'price', header: 'Price', sortable: true },
  ];

  let selectedAction: string = null;
  let selectedProduct: Product = null;

  const handleAction = (e: CustomEvent) => {
    const { data } = e.detail;
    selectedAction = e.type;
    selectedProduct = data as Product;
  };

  const handlePageChange = async (e: CustomEvent) => {
    const { page } = e.detail;
    filters.page = page;
    filters.offset = (page - 1) * filters.limit;
    await bloc.list(filters);
  };

  const statePromise: Readable<Promise<ProductState>> = derived(state, $state => {
    return new Promise<ProductState>((resolve, reject) => {
      if ($state.kind === 'load-success') {
        resolve($state);
      } else if ($state.kind === 'load-failure') {
        reject($state.error);
      }
    });
  });

  onMount(async () => {
    await bloc.list(filters);
  });
</script>

<section class="card">
  <div class="product-group-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">Product Groups</h4>
    </div>
    <div class="w-full">
      <div class="border border-gray-200">
        {#await $statePromise}
          <div class="text-center py-4">Loading...</div>
        {:then $state}
          <Table
            data={$state.list}
            {columns}
            action
            on:view={handleAction}
            on:edit={handleAction}
            on:delete={handleAction}
          >
            <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300 ">
              <tr class="bg-gray-50">
                <td class="px-6 py-4" colspan={columns.length + 1}>
                  <Pagination
                    page={filters.page}
                    itemsPerPage={filters.limit}
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
</style>
