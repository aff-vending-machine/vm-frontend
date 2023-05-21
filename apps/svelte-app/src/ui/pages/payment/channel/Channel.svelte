<!-- PaymentChannel -->
<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';

  import {
    providePaymentChannelBloc,
    PaymentChannelState,
    PaymentChannel,
    OperationStatus,
  } from '@apps/core';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import FilterBar from './FilterBar.svelte';
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';
  import Viewer from './modals/Viewer.svelte';
  import Action from './tables/Action.svelte';

  import notification from '~/stores/notification';
  import { stateDerived } from '~/utils/helpers/state';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { ColumnType } from '~/utils/types/table';

  const bloc = providePaymentChannelBloc();
  const actionBloc = providePaymentChannelBloc();

  const state = useBlocState<PaymentChannelState>(bloc);
  const statePromise: Readable<Promise<PaymentChannelState>> = derived(state, stateDerived);

  const filters = writable({
    page: 1,
    offset: 0,
    limit: 10,
    sort_by: 'id:asc',
    group_id: '',
    search: ''
  });
  const action = writable<string | null>();
  const channel = writable<PaymentChannel | null>();

  const columns: ColumnType[] = [
    { key: 'id', index: 'id', title: 'ID', sortable: true },
    { key: 'name', index: 'name', title: 'Name', sortable: true },
    { key: 'channel', index: 'channel', title: 'Channel', sortable: true },
    { key: 'vendor', index: 'vendor', title: 'Vendor', sortable: true },
    { key: 'is_enable', index: 'is_enable', title: 'Enable', sortable: true },
    { key: 'actions', title: 'Action', render: () => Action },
  ];

  const reload = async () => {
    await bloc.list($filters);
  };

  const handleAction = (e: CustomEvent) => {
    const { type, source } = e.detail;
    action.set(type || e.type);
    channel.set(source as PaymentChannel);
  };

  const handleSelect = (e: CustomEvent) => {
    const { data } = e.detail;
    action.set('view');
    channel.set(data as PaymentChannel);
  };

  const handleClose = (e: CustomEvent) => {
    action.set(null);
    channel.set(null);
  };

  const handlePageChange = (e: CustomEvent) => {
    const { page } = e.detail;
    $filters.page = page;
    $filters.offset = (page - 1) * $filters.limit;
    reload();
  };

  const handleActionStatus = (status: OperationStatus, successMessage: string, errorMessage: string) => {
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

  onMount(async () => {
    await reload();
  });
</script>

<section class="card">
  <div class="channel-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">Payment Channels</h4>
    </div>
    <div class="mb-4">
      <FilterBar bind:limit={$filters.limit} bind:search={$filters.search} on:filter={reload} />
    </div>
    <div class="w-full table-container">
      <div class="border border-gray-200">
        {#await $statePromise}
          <div class="text-center py-4">Loading...</div>
        {:then $state}
          <Table {columns} source={$state.list} on:select={handleSelect} on:action={handleAction}>
            <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300 ">
              <tr class="bg-gray-50">
                <td class="px-6 py-4" colspan={columns.length + 1}>
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
{#if $channel}
  <Modal on:close={handleClose}>
    {#if $action === 'view'}
      <Viewer channel={$channel} on:edit={handleAction} on:delete={handleAction} on:cancel={handleClose} />
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
