<script lang="ts">
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';
  import { dragscroll } from '@svelte-put/dragscroll';
  import Papa from 'papaparse';
  import { _ } from 'svelte-i18n';

  import {
    MachineState,
    PaymentChannel,
    PaymentChannelState,
    TransactionReportState,
    provideMachineBloc,
    providePaymentChannelBloc,
    provideTransactionReportBloc,
  } from '@apps/core';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { stateDerived } from '~/utils/helpers/state';

  import FilterBar from './FilterBar.svelte';
  import Cart from './tables/Cart.svelte';
  import Reference from './tables/Reference.svelte';
  import { SelectOptionsType } from '~/utils/types/options';
  import Currency from '~/ui/components/elements/labels/Currency.svelte';
  import Number from '~/ui/components/elements/labels/Number.svelte';
  import { parseTransactionReport } from '~/utils/helpers/parse';
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';
  import Filename from './modals/Filename.svelte';

  // props
  export let id: string;

  const bloc = provideTransactionReportBloc();
  const machineBloc = provideMachineBloc();
  const channelBloc = providePaymentChannelBloc();

  const state = useBlocState<TransactionReportState>(bloc);
  const machineState = useBlocState<MachineState>(machineBloc);
  const channelState = useBlocState<PaymentChannelState>(channelBloc);
  const channelOptions = writable<SelectOptionsType[]>([]);
  const statePromise: Readable<Promise<TransactionReportState>> = derived(state, stateDerived);

  const filters = writable({
    from: '',
    to: '',
    channel_id: '',
    sort_by: 'confirmed_paid_at:desc',
  });
  const machineId = writable<number | null>();
  const action = writable<string | null>();

  const reload = async () => {
    await bloc.report($machineId, $filters);
  };

  const loadChannelOptions = async () => {
    const status = await channelBloc.list();

    if (status === 'success') {
      const options = $channelState.list.map((c: PaymentChannel) => ({ value: c.id, label: c.channel }));
      channelOptions.set(options);
    }
  };

  function handleExport(e: CustomEvent) {
    action.set(e.detail?.type || e.type);
  }

  function handleClose(e: CustomEvent) {
    action.set(null);
  }

  async function handleDownload(e: CustomEvent) {
    handleClose(e);
    const { filename } = e.detail;
    let data = $state.list.map(parseTransactionReport);

    const csv = Papa.unparse(data);
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', `${filename}.csv`);
    tempLink.click();
  }

  onMount(async () => {
    machineId.set(parseInt(id, 10));
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    const to = urlParams.get('to');

    if (!!from) $filters.from = from;
    if (!!to) $filters.to = to;

    await machineBloc.get($machineId);
    await loadChannelOptions();
    await reload();
  });

  $: columns = [
    { key: 'index', title: $_('report.columns.no'), render: index => index + 1 },
    { key: 'merchant_order_id', index: 'merchant_order_id', title: $_('report.columns.order-id'), sortable: true },
    // { key: 'machine_name', index: 'machine_name', title: '$_('report.columns.machine-name'), sortable: true },
    { key: 'payment_channel', index: 'payment_channel', title: $_('report.columns.payment-channel'), sortable: true },
    { key: 'confirmed_paid_at', index: 'confirmed_paid_at', title: $_('report.columns.timestamp'), sortable: true, type: 'date' },
    { key: 'reference', index: 'reference', title: $_('report.columns.reference'), render: () => Reference },
    { key: 'cart', index: 'cart', title: $_('report.columns.cart'), render: () => Cart },
    { key: 'received_quantity', index: 'received_quantity', title: $_('report.columns.quantity'), sortable: true, type: 'number' },
    { key: 'paid_price', index: 'paid_price', title: $_('report.columns.paid-price'), sortable: true, type: 'currency' },
  ];
  $: totalQuantity = $state.list?.reduce((total, row) => total + row.received_quantity, 0);
  $: totalPayment = $state.list?.reduce((total, row) => total + row.paid_price, 0);
</script>

<section class="card">
  <div class="report-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">
        {$_('report.transaction-title')}: <span class="text-secondary-500">{$machineState.data?.name}</span>
      </h4>
    </div>
    <div class="mb-4">
      <FilterBar
        bind:from={$filters.from}
        bind:to={$filters.to}
        bind:channel={$filters.channel_id}
        channelOptions={$channelOptions}
        on:filter={reload}
        on:export={handleExport}
      />
    </div>
    <div class="w-full">
      <div class="border border-gray-200" use:dragscroll={{ event: 'pointer' }}>
        {#await $statePromise}
          <div class="text-center py-4">{$_('general.loading')}</div>
        {:then $state}
          <Table {columns} source={$state.list} on:sort={reload}>
            <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300">
              <tr class="bg-gray-50">
                <td class="px-6 py-4" colspan={columns.length - 2}>{$_('report.total')}</td>
                <td class="px-6 py-4"><Number amount={totalQuantity} /></td>
                <td class="px-6 py-4"><Currency amount={totalPayment} /></td>
              </tr>
            </tfoot>
          </Table>
        {:catch error}
          <div class="text-center text-red-500 py-4">
            {error.message || $_('general.error')}
          </div>
        {/await}
      </div>
    <!-- </div> -->
  </div>
</section>

<!-- Display modals -->
{#if $action}
  <Modal on:close={handleClose}>
    <Filename
      machine={$machineState.data}
      bind:from={$filters.from}
      bind:to={$filters.to}
      channel={$channelOptions?.find(c => c.value === $filters.channel_id)?.label}
      on:download={handleDownload}
      on:cancel={handleClose}
    />
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
