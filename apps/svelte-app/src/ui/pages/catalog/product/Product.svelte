<!-- Product -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';
  import { dragscroll } from '@svelte-put/dragscroll';
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
  import { SelectOptionsType } from '~/utils/types/options';
  import { stateDerived } from '~/utils/helpers/state';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { ColumnType } from '~/utils/types/table';
  import notification from '~/stores/notification';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';
  import FilterBar from './FilterBar.svelte';

  import Creator from './modals/Creator.svelte';
  import Editor from './modals/Editor.svelte';
  import Viewer from './modals/Viewer.svelte';
  import Eraser from './modals/Eraser.svelte';
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

  const notifyStatus = (status: OperationStatus, name: string, actionSucess: string, actionError: string) => {
    switch (status) {
      case 'success':
        reload();
        notification.add('success', $_('notify.success', { values: { name, action: actionSucess } }));
        break;

      case 'failure':
        notification.add('danger', $_('notify.error', { values: { name, action: actionError } }));
        break;
    }
  };

  function handleAction(e: CustomEvent) {
    action.set(e.detail?.type || e.type);
    product.set(e.detail?.source);
  }

  function handleSelect(e: CustomEvent) {
    const { data } = e.detail;
    action.set('view');
    product.set(data);
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
    notifyStatus(status, $_('general.product'), $_('notify.create-success'), $_('notify.create-error'));
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
    notifyStatus(status, $_('general.product'), $_('notify.update-success'), $_('notify.update-error'));
  }

  async function handleDelete(e: CustomEvent) {
    handleClose(e);
    const status = await actionBloc.delete(e.detail.id);
    notifyStatus(status, $_('general.product'), $_('notify.delete-success'), $_('notify.delete-error'));
  }

  onMount(async () => {
    await reload();
    await loadGroupOptions();
  });

  $: columns = [
    { key: 'id', index: 'id', title: $_('product.columns.id'), sortable: true },
    { key: 'group', index: 'group.name', title: $_('product.columns.group'), sortable: true },
    { key: 'name', index: 'name', title: $_('product.columns.name'), sortable: true },
    { key: 'sku', index: 'sku', title: $_('product.columns.sku'), sortable: true },
    { key: 'image_url', index: 'image_url', title: $_('product.columns.image'), type: 'image' },
    { key: 'sale_price', index: 'sale_price', title: $_('product.columns.price'), sortable: true },
    { key: 'action', title: $_('product.columns.actions'), render: () => Action },
  ];
</script>

<section class="card">
  <div class="product-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">{$_('product.title')}</h4>
    </div>
    <div class="mb-4">
      <FilterBar
        bind:group={$filters.group_id}
        bind:search={$filters.search}
        groupOptions={$groupOptions}
        on:create={handleAction}
        on:filter={handlePageChange}
      />
    </div>
    <div class="w-full table-container">
      <div class="border border-gray-200 overflow-x-auto" use:dragscroll={{ event: 'pointer' }}>
        {#await $statePromise}
          <div class="text-center py-4">{$_('general.loading')}</div>
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
            {error.message || $_('general.error')}
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
      <Creator total={$state.count} groupOptions={$groupOptions} on:create={handleCreate} on:cancel={handleClose} />
    {:else if $action === 'view'}
      <Viewer product={$product} on:edit={handleAction} on:delete={handleAction} on:cancel={handleClose} />
    {:else if $action === 'edit'}
      <Editor product={$product} groupOptions={$groupOptions} on:update={handleUpdate} on:cancel={handleClose} />
    {:else if $action === 'delete'}
      <Eraser product={$product} on:delete={handleDelete} on:cancel={handleClose} />
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
