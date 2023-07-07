<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';
  import { Readable, derived, writable } from 'svelte/store';
  import { dragscroll } from '@svelte-put/dragscroll';
  import { _ } from 'svelte-i18n';

  import { SummaryReportState, provideSummaryReportBloc, provideSyncBloc } from '@apps/core';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import Currency from '~/ui/components/elements/labels/Currency.svelte';
  import { MAIN_REPORT_STOCKS, MAIN_REPORT_TRANSACTIONS } from '~/utils/constants/links';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { stateDerived } from '~/utils/helpers/state';

  import FilterBar from './FilterBar.svelte';
  import Reports from './tables/Reports.svelte';

  const bloc = provideSummaryReportBloc();
  const syncBloc = provideSyncBloc();

  const state = useBlocState<SummaryReportState>(bloc);
  const statePromise: Readable<Promise<SummaryReportState>> = derived(state, stateDerived);

  const filters = writable({
    from: '',
    to: '',
  });

  const reload = async () => {
    const status = await bloc.report($filters);

    if (status === 'success') {
      $state.list.forEach(async data => {
        await syncBloc.pullTransactions(data.id);
      });
    }

    await bloc.report($filters);
  };

  function handleAction(e: CustomEvent) {
    const type = e.detail?.type || e.type;
    const { source } = e.detail;

    switch (type) {
      case 'stock':
        navigate(MAIN_REPORT_STOCKS(source.id) + '?from=' + $filters.from + '&to=' + $filters.to);
        break;

      case 'transaction':
        navigate(MAIN_REPORT_TRANSACTIONS(source.id) + '?from=' + $filters.from + '&to=' + $filters.to);
        break;
    }
  }

  function handleSelect(e: CustomEvent) {
    const { data } = e.detail;
    navigate(MAIN_REPORT_TRANSACTIONS(data.id) + '?from=' + $filters.from + '&to=' + $filters.to);
  }

  onMount(async () => {
    await reload();
  });

  $: columns = [
    { key: 'id', index: 'id', title: $_('report.columns.machine-id'), sortable: true },
    { key: 'name', index: 'name', title: $_('report.columns.machine-name'), sortable: true },
    { key: 'serial_number', index: 'serial_number', title: $_('report.columns.serial-number'), sortable: true },
    { key: 'creditcard', index: 'total_payments.creditcard', title: $_('report.columns.credit-card'), sortable: true, type: 'currency' },
    { key: 'promptpay', index: 'total_payments.promptpay', title: $_('report.columns.promptpay'), sortable: true, type: 'currency' },
    { key: 'total', index: 'total', title: $_('report.columns.total'), sortable: true, type: 'currency' },
    { key: 'report', title: $_('report.columns.reports'), render: () => Reports },
  ];
  $: totalCreditCard = $state.list?.reduce((total, row) => total + row.total_payments['creditcard'], 0);
  $: totalPromptPay = $state.list?.reduce((total, row) => total + row.total_payments['promptpay'], 0);
  $: totalPayment = totalCreditCard + totalPromptPay;
</script>

<section class="card">
  <div class="report-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">{$_('report.title')}</h4>
    </div>
    <div class="mb-4">
      <FilterBar bind:from={$filters.from} bind:to={$filters.to} on:filter={reload} />
    </div>
    <div class="w-full table-container">
      <div class="border border-gray-200" use:dragscroll={{ event: 'pointer' }}>
        {#await $statePromise}
          <div class="text-center py-4">{$_('report.syncing')}</div>
        {:then $state}
          {#if $state.status === 'loading'}
            <div class="text-center py-4">{$_('report.loading')}</div>
          {:else if $state.status === 'success'}
            <Table columns={columns} source={$state.list} on:sort={reload} on:select={handleSelect} on:action={handleAction}>
              <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300">
                <tr class="bg-gray-50">
                  <td class="px-6 py-4" colspan={columns.length - 4}>{$_('report.total')}</td>
                  <td class="px-6 py-4"><Currency amount={totalCreditCard} /></td>
                  <td class="px-6 py-4"><Currency amount={totalPromptPay} /></td>
                  <td class="px-6 py-4"><Currency amount={totalPayment} /></td>
                  <td />
                </tr>
              </tfoot>
            </Table>
          {/if}
        {:catch error}
          <div class="text-center text-red-500 py-4">
            {error.message || $_('report.error')}
          </div>
        {/await}
      </div>
    </div>
  </div>
</section>

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
