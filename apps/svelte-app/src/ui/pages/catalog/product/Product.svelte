<!-- Product -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';
  import { _ } from 'svelte-i18n';

  import {
    CatalogGroup,
    CreateProduct,
    GroupState,
    OperationStatus,
    Product,
    ProductState,
    UpdateProduct,
    provideCatalogGroupBloc,
    provideCatalogProductBloc,
  } from '@apps/core';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import Table from '~/ui/components/elements/tables/Table.svelte';
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import FilterBar from './FilterBar.svelte';
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';

  import ProductCreator from './modals/Creator.svelte';
  import ProductEditor from './modals/Editor.svelte';
  import ProductViewer from './modals/Viewer.svelte';
  import ProductEraser from './modals/Eraser.svelte';
  import { SelectOptionsType } from '~/utils/types/options';
  import { stateDerived } from '~/utils/helpers/state';
  import notification from '~/stores/notification';
  import { ColumnType } from '~/utils/types/table';
  import Action from './tables/Action.svelte';

  const bloc = provideCatalogProductBloc();
  const actionBloc = provideCatalogProductBloc();
  const groupBloc = provideCatalogGroupBloc();

  const state = useBlocState<ProductState>(bloc);
  const groupState = useBlocState<GroupState>(groupBloc);
  const statePromise: Readable<Promise<ProductState>> = derived(state, stateDerived);

  const groupOptions = writable<SelectOptionsType[]>([]);
  const filters = writable({
    page: 1,
    offset: 0,
    limit: 10,
    sort_by: 'id:asc',
    group_id: '',
    search: '',
    preloads: 'Group',
  });
  const action = writable<string | null>();
  const product = writable<Product | null>();

  const columns: ColumnType[] = [
    { key: 'id', index: 'id', title: 'ID', sortable: true },
    { key: 'group', index: 'group.name', title: 'Group', sortable: true },
    { key: 'name', index: 'name', title: 'Name', sortable: true },
    { key: 'sku', index: 'sku', title: 'SKU', sortable: true },
    { key: 'image_url', index: 'image_url', title: 'Image', type: 'image' },
    { key: 'sale_price', index: 'sale_price', title: 'Price', sortable: true },
    { key: 'action', title: 'Action', render: () => Action },
  ];


  const reload = async () => {
    await bloc.list($filters);
  };

  const loadGroupOptions = async () => {
    const status = await groupBloc.list();

    if (status === 'success') {
      const options = $groupState.list.map((g: CatalogGroup) => ({ value: g.id, label: g.name }));
      groupOptions.set(options);
    }
  };

  const notifyStatus = (status: OperationStatus, successMessage: string, errorMessage: string) => {
    switch (status) {
      case 'success':
        reload();
        notification.add('success', successMessage);
        break;

      case 'failure':
        notification.add('danger', errorMessage);
        break;
    }
  };

  function handleAction(e: CustomEvent) {
    const { type, source } = e.detail;
    action.set(type || e.type);
    product.set(source as Product);
  }

  function handleSelect(e: CustomEvent) {
    const { data } = e.detail;
    action.set('view');
    product.set(data as Product);
  }

  function handleClose(e: CustomEvent) {
    action.set(null);
    product.set(null);
  }

  function handlePageChange(e: CustomEvent) {
    const { page } = e.detail;
    $filters.page = page;
    $filters.offset = (page - 1) * $filters.limit;
    reload();
  }

  async function handleCreate(e: CustomEvent) {
    handleClose(e);
    const payload: CreateProduct = {
      group_id: e.detail.group_id,
      sku: e.detail.sku,
      name: e.detail.name,
      image_url: e.detail.image_url,
      product_price: e.detail.price,
      sale_price: e.detail.price,
      description: '',
      barcode: '',
      is_enable: true,
    };
    const status = await actionBloc.create(payload);
    notifyStatus(status, 'Product created successfully', 'Product creation failed');
  }

  async function handleUpdate(e: CustomEvent) {
    handleClose(e);
    const payload: UpdateProduct = {
      group_id: e.detail.group_id,
      name: e.detail.name,
      image_url: e.detail.image_url,
      product_price: e.detail.price,
      sale_price: e.detail.price,
      is_enable: e.detail.is_enable,
    };
    const status = await actionBloc.update(e.detail.id, payload);
    notifyStatus(status, 'Product updated successfully', 'Product update failed');
  }

  async function handleDelete(e: CustomEvent) {
    handleClose(e);
    const status = await actionBloc.delete(e.detail.id);
    notifyStatus(status, 'Product deleted successfully', 'Product deletion failed');
  }

  onMount(async () => {
    await reload();
    await loadGroupOptions();
  });
</script>

<section class="card">
  <div class="product-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">Products</h4>
    </div>
    <div class="mb-4">
      <FilterBar
        bind:group={$filters.group_id}
        bind:search={$filters.search}
        groupOptions={$groupOptions}
        on:create={handleAction}
        on:filter={reload}
      />
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

<!-- Display modals -->
{#if $action}
  <Modal on:close={handleClose}>
    {#if $action === 'create'}
      <ProductCreator
        total={$state.count}
        groupOptions={$groupOptions}
        on:create={handleCreate}
        on:cancel={handleClose}
      />
    {:else if $action === 'view'}
      <ProductViewer product={$product} on:edit={handleAction} on:delete={handleAction} on:cancel={handleClose} />
    {:else if $action === 'edit'}
      <ProductEditor product={$product} groupOptions={$groupOptions} on:update={handleUpdate} on:cancel={handleClose} />
    {:else if $action === 'delete'}
      <ProductEraser product={$product} on:delete={handleDelete} on:cancel={handleClose} />
    {/if}
  </Modal>
{/if}

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
