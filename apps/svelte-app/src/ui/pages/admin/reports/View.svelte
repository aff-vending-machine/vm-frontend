<!-- View -->
<script lang="ts">
  // core
  import type { ReportState } from '@apps/core';
  import { provideReportBloc } from '@apps/core';
  import { modal } from '~/share/stores';
  import { useBlocState } from '~/share/hooks/useBlocState';

  // components
  import CreateButton from '~/ui/components/elements/buttons/CreateButton.svelte';
  import TableLoader from '~/ui/components/feedbacks/loaders/TableLoader.svelte';
  import Overlay from './Overlay.svelte';

  const bloc = provideReportBloc();
  const state = useBlocState<ReportState>(bloc);

  $: handleReportStockEvent = () => modal.set({ event: 'report-stock' });
  $: handleReportPaymentEvent = () => modal.set({ event: 'report-payment' });
  
</script>

<!-- HTML -->
<section class="mx-4">
  <div class="w-full bg-white rounded-xl shadow-xl shadow-primary-100 space-y-4 py-4">
    <div class="px-8 pt-4">
      <h4 class="text-xl font-semibold text-gray-700">Reports</h4>
    </div>
    <div class="p-4">
      <div class="flex flex-col md:flex-row w-full justify-between">
        <div class="float-left flex space-x-2">
          <div class="mb-3 mt-6">
            <CreateButton text="New Stock Report" i="plus" on:click={handleReportStockEvent} />
          </div>
          <div class="mb-3 mt-6">
            <CreateButton text="New Payment Report" i="plus" on:click={handleReportPaymentEvent} />
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-b border-gray-300 p-4">
      <!-- {#if $state.kind === 'load-in-progress'}
        <div class="w-full">
          <TableLoader />
        </div>
      {:else if $state.kind === 'load-success'}
        <div class="w-full overflow-y-auto">
          
        </div>
      {:else if $state.kind === 'load-failure'}
        <div class="text-center">Something Wrong! ({$state.error?.message})</div>
      {/if} -->
    </div>
  </div>
</section>

<Overlay />

<!-- style -->
<style lang="scss">
</style>
