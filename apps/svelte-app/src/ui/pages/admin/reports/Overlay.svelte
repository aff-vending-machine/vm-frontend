<!-- Overlay -->
<script lang="ts">
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import { createEventDispatcher } from 'svelte';

  // core
  import type { ReportState } from '@apps/core';
  import { provideReportBloc } from '@apps/core';
  import { modal, notification } from '~/share/stores';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { notify } from '~/share/modules/messages/notify';

  // components
  import LoadingModal from '~/ui/components/overlays/modals/LoadingModal.svelte';
  import Alert from '~/ui/components/feedbacks/alerts/Alert.svelte';
  import PaymentModal from '~/ui/pages/admin/reports/modals/PaymentModal.svelte';
  import StockModal from '~/ui/pages/admin/reports/modals/StockModal.svelte';

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const bloc = provideReportBloc();
  const state = useBlocState<ReportState>(bloc);

  const dispatch = createEventDispatcher();

  $: handleReportStock = async (e: CustomEvent) => {
    try {
      const datetime = dayjs(e.detail.date).set('hour', 22).set('minute', 0).set('second', 0).set('millisecond', 0);
      await bloc.downloadStock({
        id: e.detail.machine,
        from: datetime.utc().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        to: datetime.utc().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        available: e.detail.available,
      });

      if ($state.kind === 'load-success') {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL($state.file);
        downloadLink.download = 'stock-' + datetime.format('YYYYMMDD') + '.csv';
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
        id: e.detail.machine,
        from: datetime.utc().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        to: datetime.utc().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      });

      if ($state.kind === 'load-success') {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL($state.file);
        downloadLink.download = 'payment-' + datetime.format('YYYYMMDD') + '.csv';
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
  <StockModal on:report={handleReportStock} />
{/if}
{#if $modal.event === 'report-payment'}
  <PaymentModal on:report={handleReportPayment} />
{/if}

{#if $state.kind === 'load-in-progress'}
  <LoadingModal />
{/if}

{#if $notification.enable}
  <Alert
    type={$notification.type}
    title={$notification.title}
    message={$notification.msg}
    bind:show={$notification.enable}
  />
{/if}

<!-- style -->
<style lang="scss">
</style>
