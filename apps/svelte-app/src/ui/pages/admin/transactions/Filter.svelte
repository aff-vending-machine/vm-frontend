<!-- Filter -->
<script lang="ts">
  import { onMount } from 'svelte';

  // core
  import { provideMachineBloc, providePaymentChannelBloc } from '@apps/core';
  import type { MachineState, PaymentChannelState } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { limitFilterOptions } from '~/share/modules/options/limit';

  // components
  import SelectFilter from '~/ui/components/elements/filters/SelectFilter.svelte';
  import SyncTime from '~/ui/components/elements/filters/SyncTime.svelte';
  import { orderStatusOptions } from '~/share/modules/options/order_status';

  export let filter: Record<string, any>;

  const mbloc = provideMachineBloc();
  const mstate = useBlocState<MachineState>(mbloc);

  const pbloc = providePaymentChannelBloc();
  const pstate = useBlocState<PaymentChannelState>(pbloc);

  $: machineOptions = [{ name: 'All', value: null }];
  $: paymentChannelOptions = [{ name: 'All', value: null }];

  onMount(async () => {
    await Promise.all([mbloc.list(), pbloc.list()]);

    if ($mstate.kind === 'load-success') {
      machineOptions = ($mstate.list || []).map(p => ({ name: p.name + ' (' + p.location + ')', value: p.id }));
      machineOptions.splice(0, 0, { name: 'All', value: null });
    }

    if ($pstate.kind === 'load-success') {
      paymentChannelOptions = ($pstate.list || []).map(p => ({ name: p.channel, value: p.channel }));
      paymentChannelOptions.splice(0, 0, { name: 'All', value: null });
    }
  });
</script>

<!-- HTML -->
<div class="flex flex-col md:flex-row w-full justify-between">
  <div class="float-left flex space-x-2">
    <SelectFilter title="Machine" bind:value={filter.machine_id} options={machineOptions} on:change />
    {#if $mstate.kind === 'load-success' && filter.machine_id !== null}
      <SyncTime
        id={filter.machine_id}
        time={$mstate.list.find(m => m.id === filter.machine_id).sync_transaction_time}
        on:sync
      />
    {/if}
  </div>
  <div class="float-right flex space-x-2">
    {#if $pstate.count || 0 > 0}
      <SelectFilter
        title="Payment Channel"
        bind:value={filter.payment_channel}
        options={paymentChannelOptions}
        on:change
      />
    {/if}
    <SelectFilter title="Status" bind:value={filter.order_status} options={orderStatusOptions} on:change />
    <SelectFilter title="View Row" bind:value={filter.limit} options={limitFilterOptions} on:change />
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
