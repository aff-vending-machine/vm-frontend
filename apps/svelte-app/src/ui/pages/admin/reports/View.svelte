<!-- View -->
<script lang="ts">
  // core
  import { provideTransactionBloc } from '@apps/core';
  import type { TransactionState } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { modal } from '~/share/stores';

  // components
  import Table from './Table.svelte';
  import Modal from './Modal.svelte';
  import Notify from './Notify.svelte';

  const bloc = provideTransactionBloc();
  const state = useBlocState<TransactionState>(bloc);

  let filter = {
    page: 1,
    offset: 0,
    limit: 10,
    machine_id: null,
    payment_channel: null,
    order_status: 'DONE',
    sort_by: 'ordered_at:desc',
  };

  $: handleEvent = (e: CustomEvent) => modal.set(e.detail);
  $: handleReload = (e: CustomEvent) => bloc.list(e.detail);
</script>

<!-- HTML -->
<section class="mx-4 space-y-8">
  <Table bind:filter state={$state} on:reload={handleReload} on:event={handleEvent} />
</section>

<Modal on:reload={handleReload} />
<Notify />

<!-- style -->
<style lang="scss">
</style>
