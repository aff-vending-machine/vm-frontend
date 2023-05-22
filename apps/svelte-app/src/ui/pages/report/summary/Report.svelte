<script lang="ts">
  import Papa from 'papaparse';
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';
  import { Readable, derived, writable } from 'svelte/store';

  import {
    Machine,
    OperationStatus,
    StockReportState,
    SummaryReportState,
    TransactionReportState,
    provideStockReportBloc,
    provideSummaryReportBloc,
    provideSyncBloc,
    provideTransactionReportBloc,
  } from '@apps/core';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import Currency from '~/ui/components/elements/labels/Currency.svelte';
  import { MAIN_REPORT_TRANSACTIONS } from '~/utils/constants/links';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { stateDerived } from '~/utils/helpers/state';
  import { ColumnType } from '~/utils/types/table';

  import FilterBar from './FilterBar.svelte';
  import Export from './tables/Export.svelte';
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';
  import Filename from './modals/Filename.svelte';
  import { parseDateReport } from '~/utils/helpers/parse';

  const bloc = provideSummaryReportBloc();
  const stockBloc = provideStockReportBloc();
  const transactionBloc = provideTransactionReportBloc();
  const syncBloc = provideSyncBloc();

  const state = useBlocState<SummaryReportState>(bloc);
  const stockState = useBlocState<StockReportState>(stockBloc);
  const transactionState = useBlocState<TransactionReportState>(transactionBloc);
  const statePromise: Readable<Promise<SummaryReportState>> = derived(state, stateDerived);

  const filters = writable({
    from: '',
    to: '',
  });
  const action = writable<string | null>();
  const machine = writable<Machine | null>();

  const columns: ColumnType[] = [
    { key: 'id', index: 'id', title: 'Machine ID', sortable: true },
    { key: 'name', index: 'name', title: 'Name', sortable: true },
    { key: 'serial_number', index: 'serial_number', title: 'Serial Number', sortable: true },
    { key: 'creditcard', index: 'total_payments.creditcard', title: 'Credit Card', sortable: true, type: 'currency' },
    { key: 'promptpay', index: 'total_payments.promptpay', title: 'Promptpay', sortable: true, type: 'currency' },
    { key: 'total', index: 'total', title: 'Total', sortable: true, type: 'currency' },
    { key: 'report', title: 'Export Report', render: () => Export },
  ];

  const reload = async () => {
    const status = await bloc.report($filters);

    if (status === 'success') {
      $state.list.forEach(async data => {
        await syncBloc.pullTransactions(data.id);
      });
    }
  };

  function handleAction(e: CustomEvent) {
    action.set(e.detail?.type || e.type);
    machine.set(e.detail?.source);
  }

  function handleSelect(e: CustomEvent) {
    const { data } = e.detail;
    navigate(MAIN_REPORT_TRANSACTIONS(data.id) + '?from=' + $filters.from + '&to=' + $filters.to);
  }

  function handleClose(e: CustomEvent) {
    action.set(null);
    machine.set(null);
  }

  async function handleDownload(e: CustomEvent) {
    handleClose(e);
    const { action, machine, filename } = e.detail;
    let status: OperationStatus;
    let data = [];

    switch (action) {
      case 'stock':
        status = await stockBloc.report(machine.id, $filters);
        if (status === 'success') {
          data = [...$stockState.list];
        }
        break;

      case 'transaction':
        status = await transactionBloc.report(machine.id, $filters);
        if (status === 'success') {
          data = $transactionState.list.map(parseDateReport);
        }
        break;
    }

    const csv = Papa.unparse(data);
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', `${filename}.csv`);
    tempLink.click();
  }

  onMount(async () => {
    await reload();
  });

  $: totalCreditCard = $state.list?.reduce((total, row) => total + row.total_payments['creditcard'], 0);
  $: totalPromptPay = $state.list?.reduce((total, row) => total + row.total_payments['promptpay'], 0);
  $: totalPayment = totalCreditCard + totalPromptPay;
</script>

<section class="card">
  <div class="report-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">Reports</h4>
    </div>
    <div class="mb-4">
      <FilterBar bind:from={$filters.from} bind:to={$filters.to} on:filter={reload} />
    </div>
    <div class="w-full table-container">
      {#await $statePromise}
        <div class="text-center py-4">Loading...</div>
      {:then $state}
        <Table {columns} source={$state.list} on:sort={reload} on:select={handleSelect} on:action={handleAction}>
          <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300 ">
            <tr class="bg-gray-50">
              <td class="px-6 py-4" colspan={columns.length - 4}>Total</td>
              <td class="px-6 py-4"><Currency amount={totalCreditCard} /></td>
              <td class="px-6 py-4"><Currency amount={totalPromptPay} /></td>
              <td class="px-6 py-4"><Currency amount={totalPayment} /></td>
              <td />
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
</section>

<!-- Display modals -->
{#if $machine}
  <Modal on:close={handleClose}>
    <Filename action={$action} machine={$machine} on:download={handleDownload} on:cancel={handleClose} />
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
