<!-- Product -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Readable, derived } from 'svelte/store';

  import type { Product, ProductState } from '@apps/core';
  import { provideProductBloc } from '@apps/core';
  import { useBlocState } from '~/utils/hooks/useBlocState';

  import Table from '~/components/common/tables/Table.svelte';
  import Pagination from '~/components/navigations/paginations/Pagination.svelte';
  import FilterBar from './FilterBar.svelte';
  import ProductEditor from './ProductEditor.svelte';
  import Modal from '~/components/overlays/modals/Modal.svelte';

  const bloc = provideProductBloc();
  const state = useBlocState<ProductState>(bloc);

  let filters = {
    page: 1,
    offset: 0,
    limit: 10,
    sort_by: 'id:asc',
  };

  let columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'product_group.name', header: 'Group', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'sku', header: 'SKU', sortable: true },
    { key: 'image_url', header: 'Image', image: true },
    { key: 'price', header: 'Price', sortable: true },
  ];

  let selectedProduct: Product = null;

  const handleRowClick = (e: CustomEvent) => {
    const { data } = e.detail;
    selectedProduct = data as Product;
  };

  const handleClose = (e: CustomEvent) => {
    selectedProduct = null;
  };

  const handlePageChange = async (e: CustomEvent) => {
    const { page } = e.detail;
    filters.page = page;
    filters.offset = (page - 1) * filters.limit;
    await bloc.list(filters);
  };

  const handleSave = async (e: CustomEvent) => {
    //
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
  <div class="report-page">
    <div class="mb-4">
      <FilterBar />
    </div>
    <div class="w-full">
      <div class="border border-gray-200">
        {#await $statePromise}
          <div class="text-center py-4">Loading...</div>
        {:then $state}
          <Table data={$state.list} {columns} on:row-click={handleRowClick}>
            <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300 ">
              <tr class="bg-gray-50">
                <td class="px-6 py-4" colspan={columns.length}>
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

{#if selectedProduct}
  <Modal on:close={handleClose}>
    <ProductEditor product={selectedProduct} on:save={handleSave} on:cancel={handleClose} />
  </Modal>
{/if}

<style>
  .card {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }
</style>
