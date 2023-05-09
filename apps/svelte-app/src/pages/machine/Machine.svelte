<!-- Machine -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Readable, derived } from 'svelte/store';

  import type { Machine, MachineState } from '@apps/core';
  import { provideMachineBloc } from '@apps/core';
  import { useBlocState } from '~/utils/hooks/useBlocState';

  import Table from '~/components/common/tables/Table.svelte';
  import Pagination from '~/components/navigations/paginations/Pagination.svelte';
  import FilterBar from './FilterBar.svelte';
  import Modal from '~/components/overlays/modals/Modal.svelte';
  import MachineEditor from './MachineEditor.svelte';

  const bloc = provideMachineBloc();
  const state = useBlocState<MachineState>(bloc);

  let filters = {
    page: 1,
    offset: 0,
    limit: 10,
    sort_by: 'id:asc',
    search: '',
  };

  let columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'serial_number', header: 'Serial Number', sortable: true },
    { key: 'location', header: 'Location', sortable: true },
    { key: 'type', header: 'Type', sortable: true },
    { key: 'vendor', header: 'Vendor', sortable: true },
    { key: 'status', header: 'Status', sortable: true },
  ];

  let selectedAction: string = null;
  let selectedMachine: Machine = null;

  const handleAction = (e: CustomEvent) => {
    const { data } = e.detail;
    selectedAction = e.type;
    selectedMachine = data as Machine;
  };

  const handleClose = (e: CustomEvent) => {
    selectedAction = null;
    selectedMachine = null;
  };

  const handlePageChange = async (e: CustomEvent) => {
    const { page } = e.detail;
    filters.page = page;
    filters.offset = (page - 1) * filters.limit;
    await bloc.list(filters);
  };

  const handleSave = async (e: CustomEvent) => {
    selectedAction = null;
    selectedMachine = null;
  };

  const statePromise: Readable<Promise<MachineState>> = derived(state, $state => {
    return new Promise<MachineState>((resolve, reject) => {
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
  <div class="machine-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">Machines</h4>
    </div>
    <div class="mb-4">
      <FilterBar bind:limit={filters.limit} bind:search={filters.search} />
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

{#if selectedMachine}
  <Modal on:close={handleClose}>
    <!-- {#if selectedAction === 'create'}
      <MachineCreator on:save={handleSave} on:cancel={handleClose} />
    {:else if selectedAction === 'view'}
      <MachineViewer
        machine={selectedMachine}
        on:edit={handleAction}
        on:delete={handleAction}
        on:cancel={handleClose}
      />
    {:else if selectedAction === 'edit'} -->
    <MachineEditor machine={selectedMachine} on:save={handleSave} on:cancel={handleClose} />
    <!-- {:else if selectedAction === 'delete'}
      <MachineEraser machine={selectedMachine} on:delete={handleDelete} on:cancel={handleClose} />
    {/if} -->
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
