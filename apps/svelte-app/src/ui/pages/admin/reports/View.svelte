<!-- View -->
<script lang="ts">
  import { onMount } from 'svelte';

  // core
  import { provideMachineBloc, providePaymentChannelBloc, provideTransactionBloc } from '@apps/core';
  import type { MachineState, PaymentChannelState, TransactionState } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { limitFilterOptions } from '~/share/modules/options/limit';
  import { orderStatusOptions } from '~/share/modules/options/order_status';
  import { modal } from '~/share/stores';
  import { sortToObj } from '~/share/utils/sort';

  // components
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import CreateButton from '~/ui/components/elements/buttons/CreateButton.svelte';
  import Select from '~/ui/components/forms/selects/Select.svelte';
  import TableLoader from '~/ui/components/feedbacks/loaders/TableLoader.svelte';
  import Overlay from './Overlay.svelte';
  import TableBloc from './tables/TableBloc.svelte';

  const bloc = provideTransactionBloc();
  const state = useBlocState<TransactionState>(bloc);

  const mbloc = provideMachineBloc();
  const mstate = useBlocState<MachineState>(mbloc);

  const pbloc = providePaymentChannelBloc();
  const pstate = useBlocState<PaymentChannelState>(pbloc);

  $: filter = {
    page: 1,
    offset: 0,
    limit: 10,
    machine_id: null,
    payment_channel: null,
    order_status: null,
    sort_by: 'ordered_at:desc',
  };

  $: machineOptions = [{ name: 'All', value: null }];
  $: paymentChannelOptions = [{ name: 'All', value: null }];

  onMount(async () => {
    await Promise.all([ 
        mbloc.list(),
        pbloc.list(),
        bloc.list(filter),
    ])

    if ($mstate.kind === 'load-success') {
      machineOptions = ($mstate.list || []).map(p => ({ name: p.name, value: p.id }));
      machineOptions.splice(0, 0, { name: 'All', value: null });
    }

    if ($pstate.kind === 'load-success') {
      paymentChannelOptions = ($pstate.list || []).map(p => ({ name: p.channel, value: p.channel }));
      paymentChannelOptions.splice(0, 0, { name: 'All', value: null });
    }
  });

  $: handleReportStockEvent = () => modal.set({ event: 'report-stock' });
  $: handleReportPaymentEvent = () => modal.set({ event: 'report-payment' });
  $: handleEvent = (e: CustomEvent) => modal.set(e.detail);

  $: handleChangePage = (e: CustomEvent) => {
    filter.page = e.detail.page;
    filter.offset = (filter.page - 1) * filter.limit;
    bloc.list(filter);
  };

  $: handleSortFilter = (e: CustomEvent) => {
    filter.sort_by = e.detail.field + ':' + e.detail.sort;
    bloc.list(filter);
  };

  $: handleChangeFilter = () => {
    bloc.list(filter);
  };
</script>

<!-- HTML -->
<section class="mx-4">
  <div class="w-full bg-white rounded-xl shadow-xl shadow-primary-100 space-y-4 py-4">
    <div class="px-8 pt-4">
      <h4 class="text-xl font-semibold text-gray-700">Report</h4>
    </div>
    <div class="p-4">
      <div class="flex flex-col md:flex-row w-full justify-between">
        <div class="float-left flex space-x-2">
          <div class="mb-3 xl:w-24 text-center">
            <span class="text-xs font-semibold">View row</span>
            <Select bind:value={filter.limit} options={limitFilterOptions} on:change={handleChangeFilter} />
          </div>
          <div class="mb-3 mt-6">
            <CreateButton text="New Stock Report" i="plus" on:click={handleReportStockEvent} />
          </div>
          <div class="mb-3 mt-6">
            <CreateButton text="New Payment Report" i="plus" on:click={handleReportPaymentEvent} />
          </div>
        </div>
        <div class="float-right flex space-x-2">
          <div class="mb-3 text-center">
            <span class="text-xs font-semibold">Machine</span>
            <Select bind:value={filter.machine_id} options={machineOptions} on:change={handleChangeFilter} />
          </div>
          <div class="mb-3 text-center">
            <span class="text-xs font-semibold">Status</span>
            <Select bind:value={filter.order_status} options={orderStatusOptions} on:change={handleChangeFilter} />
          </div>
          <div class="mb-3 text-center">
            <span class="text-xs font-semibold">Payment Channel</span>
            <Select
              bind:value={filter.payment_channel}
              options={paymentChannelOptions}
              on:change={handleChangeFilter}
            />
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-b border-gray-300 p-4">
      {#if $state.kind === 'load-in-progress'}
        <div class="w-full">
          <TableLoader />
        </div>
      {:else if $state.kind === 'load-success'}
        <div class="w-full overflow-y-auto">
          <TableBloc
            sorts={sortToObj(filter.sort_by)}
            source={$state.list}
            on:sort={handleSortFilter}
            on:event={handleEvent}
          />
        </div>
      {:else if $state.kind === 'load-failure'}
        <div class="text-center">Something Wrong! ({$state.error?.message})</div>
      {/if}
    </div>
    <div class="w-full px-8">
      <Pagination
        class="flex flex-row justify-between"
        bind:page={filter.page}
        bind:limit={filter.limit}
        bind:count={$state.count}
        on:change={handleChangePage}
      />
    </div>
  </div>
</section>

<Overlay on:reload={handleChangeFilter} />

<!-- style -->
<style lang="scss">
</style>
