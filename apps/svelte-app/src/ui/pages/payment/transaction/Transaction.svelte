<!-- PaymentTransaction -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';
  import { dragscroll } from '@svelte-put/dragscroll';
  import { _ } from 'svelte-i18n';

  import {
    providePaymentTransactionBloc,
    PaymentTransactionState,
    PaymentTransaction,
    provideStoreBranchBloc,
    PaymentChannel,
    OperationStatus,
    PaymentChannelState,
    providePaymentChannelBloc,
    provideMachineBloc,
    MachineState,
    Machine,
    BranchState,
    StoreBranch,
  } from '@apps/core';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';
  import FilterBar from './FilterBar.svelte';
  import Viewer from './modals/Viewer.svelte';
  import Action from './tables/Action.svelte';
  import Cart from './tables/Cart.svelte';
  import Reference from './tables/Reference.svelte';
  import Status from './tables/Status.svelte';

  import notification from '~/stores/notification';
  import { stateDerived } from '~/utils/helpers/state';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { SelectOptionsType } from '~/utils/types/options';
  import { access } from '~/stores/access';
  import { requestRole } from '~/utils/helpers/role';

  const bloc = providePaymentTransactionBloc();
  const actionBloc = providePaymentTransactionBloc();
  const branchBloc = provideStoreBranchBloc();
  const machineBloc = provideMachineBloc();
  const channelBloc = providePaymentChannelBloc();

  const state = useBlocState<PaymentTransactionState>(bloc);
  const branchState = useBlocState<BranchState>(branchBloc);
  const machineState = useBlocState<MachineState>(machineBloc);
  const channelState = useBlocState<PaymentChannelState>(channelBloc);
  const statePromise: Readable<Promise<PaymentTransactionState>> = derived(state, stateDerived);

  const branchOptions = writable<SelectOptionsType[]>([]);
  const machineOptions = writable<SelectOptionsType[]>([]);
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
    branch_id: '',
    machine_id: '',
    channel_id: '',
    order_status: '',
    preloads: 'Branch:Machine:Channel',
  });
  const action = writable<string | null>();
  const transaction = writable<PaymentTransaction | null>();

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

  const loadBranchOptions = async () => {
    const status = await branchBloc.list();

    if (status === 'success') {
      const options = ($branchState.list || []).map((c: StoreBranch) => ({ value: c.id, label: c.name }));
      branchOptions.set(options);
    }
  };

  const loadMachineOptions = async () => {
    const status = await machineBloc.list();

    if (status === 'success') {
      const options = ($machineState.list || []).map((c: Machine) => ({ value: c.id, label: c.name }));
      machineOptions.set(options);
    }
  };

  const loadChannelOptions = async () => {
    const status = await channelBloc.list();

    if (status === 'success') {
      const options = $channelState.list.map((c: PaymentChannel) => ({ value: c.id, label: c.channel }));
      channelOptions.set(options);
    }
  };

  async function handleAction(e: CustomEvent) {
    let status: OperationStatus = 'idle';

    switch (e.detail?.type || e.type) {
      case 'done':
        status = await actionBloc.done(e.detail?.source.id);
        notifyStatus(status, $_('general.transaction'), $_('notify.done-success'), $_('notify.done-error'));
        break;

      case 'cancel':
        status = await actionBloc.cancel(e.detail?.source.id);
        notifyStatus(status, $_('general.transaction'), $_('notify.cancel-success'), $_('notify.cancel-error'));
        break;
    }
  }

  function handleSelect(e: CustomEvent) {
    if (requestRole($access?.role, 'manager')) {
      const { data } = e.detail;
      action.set('view');
      transaction.set(data);
    }
  }

  function handleClose(e: CustomEvent) {
    action.set(null);
    transaction.set(null);
  }

  function handlePageChange(e: CustomEvent) {
    const { page } = e.detail;
    $filters.page = page;
    $filters.offset = (page - 1) * $filters.limit;
    reload();
  }

  onMount(async () => {
    await loadBranchOptions();
    await loadMachineOptions();
    await loadChannelOptions();
    await reload();
  });

  $: columns = [
    { key: 'id', index: 'id', title: $_('transaction.columns.id'), sortable: true },
    { key: 'merchant_order_id', index: 'merchant_order_id', title: $_('transaction.columns.order-id'), sortable: true },
    { key: 'branch', index: 'branch.name', title: $_('transaction.columns.branch'), sortable: true },
    { key: 'machine', index: 'machine.name', title: $_('transaction.columns.machine'), sortable: true },
    { key: 'channel', index: 'channel.channel', title: $_('transaction.columns.payment-channel'), sortable: true },
    {
      key: 'confirmed_paid_at',
      index: 'confirmed_paid_at',
      title: $_('transaction.columns.timestamp'),
      sortable: true,
    },
    {
      key: 'reference',
      index: 'reference',
      title: $_('transaction.columns.reference'),
      sortable: true,
      render: () => Reference,
    },
    {
      key: 'order_price',
      index: 'order_price',
      title: $_('transaction.columns.ordered-price'),
      sortable: true,
      type: 'currency',
    },
    {
      key: 'paid_price',
      index: 'paid_price',
      title: $_('transaction.columns.paid-price'),
      sortable: true,
      type: 'currency',
    },
    { key: 'cart', index: 'cart', title: $_('transaction.columns.cart'), render: () => Cart },
    {
      key: 'status',
      index: 'order_status',
      title: $_('transaction.columns.status'),
      sortable: true,
      render: () => Status,
    },
    { key: 'actions', title: $_('transaction.columns.actions'), render: () => Action },
  ];
</script>

<section class="card">
  <div class="transaction-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">{$_('transaction.title')}</h4>
    </div>
    <div class="mb-4">
      <FilterBar
        bind:from={$filters.from}
        bind:to={$filters.to}
        bind:branch={$filters.branch_id}
        bind:machine={$filters.machine_id}
        bind:channel={$filters.channel_id}
        bind:status={$filters.order_status}
        branchOptions={$branchOptions}
        machineOptions={$machineOptions}
        channelOptions={$channelOptions}
        bind:limit={$filters.limit}
        bind:search={$filters.search}
        on:filter={handlePageChange}
      />
    </div>
    <div class="w-full table-container">
      <div class="border border-gray-200 overflow-x-auto" use:dragscroll={{ event: 'pointer' }}>
        {#await $statePromise}
          <div class="text-center py-4">{$_('general.loading')}</div>
        {:then $state}
          <Table {columns} source={$state.list} on:select={handleSelect} on:action={handleAction}>
            <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300">
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
            {error.message || $_('general.error')}
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
