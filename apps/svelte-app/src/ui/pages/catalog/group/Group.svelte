<!-- Group -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';
  import { dragscroll } from '@svelte-put/dragscroll';
  import { _ } from 'svelte-i18n';

  import { provideCatalogGroupBloc, GroupState, CatalogGroup, OperationStatus, CreateCatalogGroup, UpdateCatalogGroup } from '@apps/core';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { stateDerived } from '~/utils/helpers/state';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';
  import FilterBar from './FilterBar.svelte';

  import Creator from './modals/Creator.svelte';
  import Editor from './modals/Editor.svelte';
  import Viewer from './modals/Viewer.svelte';
  import Eraser from './modals/Eraser.svelte';
  import Action from './tables/Action.svelte';
  import Status from './tables/Status.svelte';
  import notification from '~/stores/notification';

  const bloc = provideCatalogGroupBloc();
  const actionBloc = provideCatalogGroupBloc();
  const state = useBlocState<GroupState>(bloc);
  const statePromise: Readable<Promise<GroupState>> = derived(state, stateDerived);

  const filters = writable({
    page: 1,
    offset: 0,
    limit: 10,
    sort_by: 'id:asc', 
  });
  const action = writable<string | null>();
  const group = writable<CatalogGroup | null>();

  const reload = async () => {
    await bloc.list($filters);
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
    group.set(e.detail?.source);
  }

  function handleSelect(e: CustomEvent) {
    const { data } = e.detail;
    action.set('view');
    group.set(data);
  }

  function handleClose(e: CustomEvent) {
    action.set(null);
    group.set(null);
  }

  function handlePageChange(e: CustomEvent) {
    const { page } = e.detail;
    $filters.page = page;
    $filters.offset = (page - 1) * $filters.limit;
    reload();
  }

  async function handleCreate(e: CustomEvent) {
    handleClose(e);
    const payload: CreateCatalogGroup = {
      name: e.detail.name,
      description: e.detail.description,
      is_enable: true,
    };
    const status = await actionBloc.create(payload);
    notifyStatus(status, $_('general.group'), $_('notify.create-success'), $_('notify.create-error'));
  }

  async function handleUpdate(e: CustomEvent) {
    handleClose(e);
    const payload: UpdateCatalogGroup = {
      name: e.detail.name,
      description: e.detail.description,
      is_enable: true,
    };

    const status = await actionBloc.update(e.detail.id, payload);
    notifyStatus(status, $_('general.group'), $_('notify.update-success'), $_('notify.update-error'));
  }

  async function handleDelete(e: CustomEvent) {
    handleClose(e);
    const status = await actionBloc.delete(e.detail.id);
    notifyStatus(status, $_('general.group'), $_('notify.delete-success'), $_('notify.delete-error'));
  }

  onMount(async () => {
    await bloc.list($filters);
  });

  $: columns = [
    { key: 'id', index: 'id', title: $_('group.columns.id'), sortable: true },
    { key: 'name', index: 'name', title: $_('group.columns.name'), sortable: true },
    { key: 'description', index: 'description', title: $_('group.columns.description'), sortable: true },
    { key: 'is_enable', index: 'is_enable', title: $_('group.columns.status'), sortable: true, render: () => Status },
    { key: 'action', title: $_('group.columns.actions'), render: () => Action },
  ];
</script>

<section class="card">
  <div class="product-group-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">{$_('group.title')}</h4>
    </div>
    <div class="mb-4">
      <FilterBar
        on:create={handleAction}
        on:filter={handlePageChange}
      />
    </div>
    <div class="w-full table-container">
      <div class="border border-gray-200 overflow-x-auto" use:dragscroll={{ event: 'pointer' }}>
        {#await $statePromise}
          <div class="text-center py-4">{$_('group.loading')}</div>
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
            {error.message || $_('group.error')}
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
      <Creator
        on:create={handleCreate}
        on:cancel={handleClose}
      />
    {:else if $action === 'view'}
      <Viewer group={$group} on:edit={handleAction} on:delete={handleAction} on:cancel={handleClose} />
    {:else if $action === 'edit'}
      <Editor group={$group} on:update={handleUpdate} on:cancel={handleClose} />
    {:else if $action === 'delete'}
      <Eraser group={$group} on:delete={handleDelete} on:cancel={handleClose} />
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
