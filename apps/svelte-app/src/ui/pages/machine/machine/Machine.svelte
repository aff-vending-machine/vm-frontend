<!-- Machine -->
<script lang="ts">
  import { navigate } from 'svelte-navigator';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';

  import { provideMachineBloc, MachineState, Machine, UpdateMachine, OperationStatus } from '@apps/core';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import FilterBar from './FilterBar.svelte';
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';
  import MachineEditor from './modals/Editor.svelte';
  import MachineViewer from './modals/Viewer.svelte';
  import MachineEraser from './modals/Eraser.svelte';

  import notification from '~/stores/notification';
  import { stateDerived } from '~/utils/helpers/state';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { MAIN_MACHINE_SLOTS } from '~/utils/constants/links';
  // import Action from './tables/Action.svelte';
  import { ColumnType } from '~/utils/types/table';

  const bloc = provideMachineBloc();
  const actionBloc = provideMachineBloc();

  const state = useBlocState<MachineState>(bloc);
  const statePromise: Readable<Promise<MachineState>> = derived(state, stateDerived);

  const filters = writable({
    page: 1,
    offset: 0,
    limit: 10,
    sort_by: 'id:asc',
    group_id: '',
    search: '',
  });
  const action = writable<string | null>();
  const machine = writable<Machine | null>();

  const columns: ColumnType[] = [
    { key: 'id', index: 'id', title: 'ID', sortable: true },
    { key: 'name', index: 'name', title: 'Name', sortable: true },
    { key: 'serial_number', index: 'serial_number', title: 'Serial Number', sortable: true },
    { key: 'location', index: 'location', title: 'Location', sortable: true },
    { key: 'type', index: 'type', title: 'Type', sortable: true },
    { key: 'vendor', index: 'vendor', title: 'Vendor', sortable: true },
    { key: 'status', index: 'status', title: 'Status', sortable: true },
    // { key: 'action', title: 'Action', render: () => Action },
  ];

  const reload = async () => {
    await bloc.list($filters);
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
    machine.set(source);
  }

  function handleSelect(e: CustomEvent) {
    const { data } = e.detail;
    navigate(MAIN_MACHINE_SLOTS(data.id), { replace: false });
  }

  function handleClose(e: CustomEvent) {
    action.set(null);
    machine.set(null);
  }

  function handlePageChange(e: CustomEvent) {
    const { page } = e.detail;
    $filters.page = page;
    $filters.offset = (page - 1) * $filters.limit;
    reload();
  }

  async function handleUpdate(e: CustomEvent) {
    handleClose(e);
    const payload: UpdateMachine = {
      name: e.detail.name,
    };
    const status = await actionBloc.update(e.detail.id, payload);
    notifyStatus(status, 'Machine updated successfully', 'Machine update failed');
  }

  async function handleDelete(e: CustomEvent) {
    handleClose(e);
    const status = await actionBloc.delete(e.detail.id);
    notifyStatus(status, 'Product deleted successfully', 'Machine deletion failed');
  }

  onMount(async () => {
    await reload();
  });
</script>

<section class="card">
  <div class="machine-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">Machines</h4>
    </div>
    <div class="mb-4">
      <FilterBar bind:limit={$filters.limit} bind:search={$filters.search} on:filter={reload} />
    </div>
    <div class="w-full table-container">
      <div class="border border-gray-200">
        {#await $statePromise}
          <div class="text-center py-4">Loading...</div>
        {:then $state}
          <Table {columns} source={$state.list} on:sort={reload} on:select={handleSelect} on:action={handleAction}>
            <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300 ">
              <tr class="bg-gray-50">
                <td class="px-6 py-4" colspan={columns.length}>
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
{#if $action && $machine}
  <Modal on:close={handleClose}>
    {#if $action === 'view'}
      <MachineViewer machine={$machine} on:edit={handleAction} on:delete={handleAction} on:cancel={handleClose} />
    {:else if $action === 'edit'}
      <MachineEditor machine={$machine} on:update={handleUpdate} on:cancel={handleClose} />
    {:else if $action === 'delete'}
      <MachineEraser machine={$machine} on:delete={handleDelete} on:cancel={handleClose} />
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
