<script lang="ts">
  import Papa from 'papaparse';
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';
  import { dragscroll } from '@svelte-put/dragscroll';

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
  import { ColumnType } from '~/utils/types/table';

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

  const columns: ColumnType[] = [
    { key: 'index', title: 'No.', render: index => index + 1 },
    { key: 'merchant_order_id', index: 'merchant_order_id', title: 'Order ID', sortable: true },
    // { key: 'machine_name', index: 'machine_name', title: 'Machine', sortable: true },
    { key: 'payment_channel', index: 'payment_channel', title: 'Payment Channel', sortable: true },
    { key: 'confirmed_paid_at', index: 'confirmed_paid_at', title: 'Timestamp', sortable: true, type: 'date' },
    { key: 'reference', index: 'reference', title: 'Reference', render: () => Reference },
    { key: 'cart', index: 'cart', title: 'Cart', render: () => Cart },
    { key: 'received_quantity', index: 'received_quantity', title: 'Quantity', sortable: true, type: 'number' },
    { key: 'paid_price', index: 'paid_price', title: 'Paid Price', sortable: true, type: 'currency' },
  ];

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

  $: totalQuantity = $state.list?.reduce((total, row) => total + row.received_quantity, 0);
  $: totalPayment = $state.list?.reduce((total, row) => total + row.paid_price, 0);
</script>

<section class="card">
  <div class="report-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">
        Transaction Report: <span class="text-secondary-500">{$machineState.data?.name}</span>
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
          <div class="text-center py-4">Loading...</div>
        {:then $state}
          <Table {columns} source={$state.list} on:sort={reload}>
            <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300">
              <tr class="bg-gray-50">
                <td class="px-6 py-4" colspan={columns.length - 2}>Total</td>
                <td class="px-6 py-4"><Number amount={totalQuantity} /></td>
                <td class="px-6 py-4"><Currency amount={totalPayment} /></td>
              </tr>
            </tfoot>
          </Table>
        {:catch error}
          <div class="text-center text-red-500 py-4">
            {error.message || 'An error occurred while loading the data.'}
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
