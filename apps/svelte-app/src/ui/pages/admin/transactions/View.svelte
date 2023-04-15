<!-- View -->
<script lang="ts">
  // core
  import { provideTransactionBloc } from '@apps/core';
  import type { TransactionState } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { modal } from '~/share/stores';

  // components
  import Notify from './Notify.svelte';
  import Table from './Table.svelte';

  const bloc = provideTransactionBloc();
  const state = useBlocState<TransactionState>(bloc);

  let filter = {
    page: 1,
    offset: 0,
    limit: 10,
    machine_id: null,
    payment_channel: null,
    order_status: null,
    sort_by: 'ordered_at:desc',
  };

  $: handleEvent = async (e: CustomEvent) => {
    switch (e.detail.event) {
      case 'done':
        await bloc.done(e.detail.id);
        await bloc.list(e.detail);
        return;

      case 'cancel':
        await bloc.cancel(e.detail.id);
        await bloc.list(e.detail);
        return;
    }

    modal.set(e.detail);
  };
  $: handleReload = (e: CustomEvent) => bloc.list(e.detail);
</script>

<!-- HTML -->
<section class="mx-4 space-y-8">
  <Table bind:filter state={$state} on:reload={handleReload} on:event={handleEvent} />
</section>

<!-- Overlay -->
<Notify />

<!-- style -->
<style lang="scss">
</style>
