<!-- PaymentTransaction -->
<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';

  import {
    providePaymentTransactionBloc,
    PaymentTransactionState,
    PaymentTransaction,
    PaymentChannel,
    OperationStatus,
    PaymentChannelState,
    providePaymentChannelBloc,
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
  import Status from './tables/Status.svelte';
  import { SelectOptionsType } from '~/utils/types/options';

  const bloc = providePaymentTransactionBloc();
  const actionBloc = providePaymentTransactionBloc();
  const channelBloc = providePaymentChannelBloc();

  const state = useBlocState<PaymentTransactionState>(bloc);
  const channelState = useBlocState<PaymentChannelState>(channelBloc);
  const statePromise: Readable<Promise<PaymentTransactionState>> = derived(state, stateDerived);

  const channelOptions = writable<SelectOptionsType[]>([]);

  const filters = writable({
    page: 1,
    offset: 0,
    limit: 100,
    sort_by: 'id:desc',
    group_id: '',
    search: '',
    from: '',
    to: '',
    channel_id: '',
    order_status: '',
    preloads: 'Branch:Machine:Channel',
  });
  const action = writable<string | null>();
  const transaction = writable<PaymentTransaction | null>();

  const columns: ColumnType[] = [
    { key: 'id', index: 'id', title: 'ID', sortable: true },
    { key: 'merchant_order_id', index: 'merchant_order_id', title: 'Order ID', sortable: true },
    { key: 'branch', index: 'branch.name', title: 'Branch', sortable: true },
    { key: 'machine', index: 'machine.name', title: 'Machine', sortable: true },
    { key: 'channel', index: 'channel.channel', title: 'Payment Channel', sortable: true },
    { key: 'confirmed_paid_at', index: 'confirmed_paid_at', title: 'Timestamp', sortable: true },
    { key: 'order_price', index: 'order_price', title: 'Order Price', sortable: true },
    { key: 'paid_price', index: 'paid_price', title: 'Paid Price', sortable: true },
    { key: 'status', index: 'order_status', title: 'Status', sortable: true, render: () => Status },
    { key: 'actions', title: 'Action', render: () => Action },
  ];

  const reload = async () => {
    await bloc.list($filters);
  };

  const loadChannelOptions = async () => {
    const status = await channelBloc.list();

    if (status === 'success') {
      const options = $channelState.list.map((c: PaymentChannel) => ({ value: c.id, label: c.channel }));
      channelOptions.set(options);
    }
  };

  const handleAction = async (e: CustomEvent) => {
    const { type, source } = e.detail;
    let status: OperationStatus = 'idle';

    switch (type) {
      case 'done':
        status = await actionBloc.done(source.id);
        handleActionStatus(status, 'Transaction done successfully', 'Transaction done failed');
        break;

      case 'cancel':
        status = await actionBloc.cancel(source.id);
        handleActionStatus(status, 'Transaction cancelled successfully', 'Transaction cancelled failed');
        break;
    }
  };

  const handleSelect = (e: CustomEvent) => {
    const { data } = e.detail;
    action.set('view');
    transaction.set(data as PaymentTransaction);
  };

  const handleClose = (e: CustomEvent) => {
    action.set(null);
    transaction.set(null);
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
    await loadChannelOptions();
    await reload();
  });
</script>

<section class="card">
  <div class="transaction-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">Payment Transactions</h4>
    </div>
    <div class="mb-4">
      <FilterBar
        bind:from={$filters.from}
        bind:to={$filters.to}
        bind:channel={$filters.channel_id}
        bind:status={$filters.order_status}
        channelOptions={$channelOptions}
        bind:limit={$filters.limit}
        bind:search={$filters.search}
        on:filter={reload}
      />
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
{#if $transaction}
  <Modal on:close={handleClose}>
    {#if $action === 'view'}
      <Viewer transaction={$transaction} on:edit={handleAction} on:delete={handleAction} on:cancel={handleClose} />
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