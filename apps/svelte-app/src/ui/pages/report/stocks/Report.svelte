<script lang="ts">
  import Papa from 'papaparse';
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';
  import { dragscroll } from '@svelte-put/dragscroll';

  import { MachineState, StockReport, StockReportState, provideMachineBloc, provideStockReportBloc } from '@apps/core';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { stateDerived } from '~/utils/helpers/state';
  import { ColumnType } from '~/utils/types/table';
  import { parseStockReport } from '~/utils/helpers/parse';

  import FilterBar from './FilterBar.svelte';
  import Currency from '~/ui/components/elements/labels/Currency.svelte';
  import Number from '~/ui/components/elements/labels/Number.svelte';
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';
  import Filename from './modals/Filename.svelte';

  // props
  export let id: string;

  const bloc = provideStockReportBloc();
  const machineBloc = provideMachineBloc();

  const state = useBlocState<StockReportState>(bloc);
  const machineState = useBlocState<MachineState>(machineBloc);
  const statePromise: Readable<Promise<StockReportState>> = derived(state, stateDerived);

  const filters = writable({
    from: '',
    to: '',
    group: true,
  });
  const machineId = writable<number | null>();
  const action = writable<string | null>();

  const columns: ColumnType[] = [
    { key: 'index', title: 'No.', render: index => index + 1 },
    { key: 'code', index: 'code', title: 'Machine Slot', sortable: true },
    { key: 'name', index: 'name', title: 'Product Name', sortable: true },
    { key: 'sale_price', index: 'sale_price', title: 'Sale Price', sortable: true, type: 'currency' },
    { key: 'sold', index: 'sold', title: 'Sold', sortable: true },
    { key: 'creditcard', index: 'total_payments.creditcard', title: 'Credit Card', sortable: true, type: 'currency' },
    { key: 'promptpay', index: 'total_payments.promptpay', title: 'Promptpay', sortable: true, type: 'currency' },
    { key: 'total', index: 'total_price', title: 'Total Price', sortable: true, type: 'currency' },
  ];

  const reload = async () => {
    await bloc.report($machineId, $filters);
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
    let data = source.map(parseStockReport);

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
    await reload();
  });

  $: source = groupFilter($state.list, $filters.group);

  $: totalQuantity = source.reduce((total, row) => total + row.sold, 0);
  $: totalCreditCard = source.reduce((total, row) => total + (row.total_payments?.creditcard || 0), 0);
  $: totalPromptPay = source.reduce((total, row) => total + (row.total_payments?.promptpay || 0), 0);
  $: totalPayment = source.reduce((total, row) => total + row.total_price, 0);

  function groupFilter(list: StockReport[], group: boolean) {
    if (group) {
      return (list || []).reduce((result, data) => {
        const idx = result.findIndex(r => r.name === data.name && r.sale_price === data.sale_price);

        if (idx >= 0) {
          if (!result[idx].code.includes(data.code)) {
            let codes = result[idx].code.split(',');
            codes = codes.concat(data.code).sort();
            result[idx].code = codes.join(',');
          }

          result[idx].sold += data.sold;
          result[idx].total_price = result[idx].sale_price * result[idx].sold;

          for (const [key, value] of Object.entries(data.total_payments)) {
            if (!result[idx].total_payments[key]) {
              result[idx].total_payments[key] = value;
            } else {
              result[idx].total_payments[key] += value;
            }
          }
          if (idx === 0) {
            console.log(result);
          }
        } else {
          result = result.concat(Object.assign({}, { ...data }));
        }

        return result;
      }, [] as StockReport[]);
    } else {
      return list || [];
    }
  }
</script>

<section class="card">
  <div class="report-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">
        Stock Report: <span class="text-secondary-500">{$machineState.data?.name}</span>
      </h4>
    </div>
    <div class="mb-4">
      <FilterBar
        bind:from={$filters.from}
        bind:to={$filters.to}
        bind:group={$filters.group}
        on:filter={reload}
        on:export={handleExport}
      />
    </div>
    <div class="w-full table-container">
      <div class="border border-gray-200" use:dragscroll={{ event: 'pointer' }}>
        {#await $statePromise}
          <div class="text-center py-4">Loading...</div>
        {:then $state}
          <Table {columns} {source} on:sort={reload}>
            <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300">
              <tr class="bg-gray-50">
                <td class="px-6 py-4" colspan={columns.length - 4}>Total</td>
                <td class="px-6 py-4"><Number amount={totalQuantity} /></td>
                <td class="px-6 py-4"><Currency amount={totalCreditCard} /></td>
                <td class="px-6 py-4"><Currency amount={totalPromptPay} /></td>
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
    </div>
  </div>

  
</section>

<!-- Display modals -->
{#if $action}
  <Modal on:close={handleClose}>
    <Filename
      machine={$machineState.data}
      from={$filters.from}
      to={$filters.to}
      group={$filters.group}
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

  @media (max-width: 1023px) {
    .table-container {
      overflow-x: auto;
    }
  }
</style>
