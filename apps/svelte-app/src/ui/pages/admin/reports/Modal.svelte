<!-- Modal -->
<script lang="ts">
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import { createEventDispatcher, onMount } from 'svelte';

  // core
  import { MachineState, ReportState, provideMachineBloc } from '@apps/core';
  import { provideReportBloc } from '@apps/core';
  import { modal } from '~/share/stores';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { notify } from '~/share/modules/messages/notify';

  // components
  import PaymentModal from '~/ui/pages/admin/reports/modals/PaymentModal.svelte';
  import StockModal from '~/ui/pages/admin/reports/modals/StockModal.svelte';

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const dispatch = createEventDispatcher();

  const bloc = provideReportBloc();
  const state = useBlocState<ReportState>(bloc);

  const mbloc = provideMachineBloc();
  const mstate = useBlocState<MachineState>(mbloc);

  $: machineOptions = [];

  onMount(async () => {
    await Promise.all([mbloc.list()]);

    if ($mstate.kind === 'load-success') {
      machineOptions = ($mstate.list || []).map(p => ({ name: p.name + ' (' + p.location + ')', value: p.id }));
    }
  });

  $: handleReportStock = async (e: CustomEvent) => {
    try {
      const datetime = dayjs(e.detail.date).set('hour', 22).set('minute', 0).set('second', 0).set('millisecond', 0);
      await bloc.downloadStock({
        id: e.detail.id,
        from: datetime.utc().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        to: datetime.utc().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        available: e.detail.available,
      });

      if ($state.kind === 'load-success') {
        const name = $mstate.list.find(m => m.id === e.detail.id).name;
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL($state.file);
        downloadLink.download = name + '-stock-' + datetime.format('YYYYMMDD') + '.csv';
        document.body.appendChild(downloadLink);

        downloadLink.click();

        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(downloadLink.href);
      }

      notify($state.kind, 'report stock', $state.error);
      dispatch('reload');
    } catch (e) {
      console.log(e);
      notify('error', 'report stock', e);
    }
    modal.set({});
  };

  $: handleReportPayment = async (e: CustomEvent) => {
    try {
      const datetime = dayjs(e.detail.date).set('hour', 22).set('minute', 0).set('second', 0).set('millisecond', 0);
      await bloc.downloadPayment({
        id: e.detail.id,
        from: datetime.utc().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        to: datetime.utc().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      });

      if ($state.kind === 'load-success') {
        const name = $mstate.list.find(m => m.id === e.detail.id).name;
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL($state.file);
        downloadLink.download = name + '-payment-' + datetime.format('YYYYMMDD') + '.csv';
        document.body.appendChild(downloadLink);

        downloadLink.click();

        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(downloadLink.href);
      }

      notify($state.kind, 'report payment', $state.error);
      dispatch('reload');
    } catch (e) {
      console.log(e);
      notify('error', 'report payment', e);
    }
    modal.set({});
  };
</script>

<!-- HTML -->
{#if $modal.event === 'report-stock'}
  <StockModal {machineOptions} on:report={handleReportStock} />
{:else if $modal.event === 'report-payment'}
  <PaymentModal {machineOptions} on:report={handleReportPayment} />
{/if}

<!-- style -->
<style lang="scss">
</style>
