<!-- Report -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // components
  import IconButton from '~/ui/components/elements/buttons/IconButton.svelte';
  import Slot from './Slot.svelte';

  export let id: UniqueID;

  const dispatch = createEventDispatcher();

  const handleReportStockEvent = () => dispatch('event', { event: 'report-stock', id });
  const handleReportPaymentEvent = () => dispatch('event', { event: 'report-payment', id });
</script>

<!-- HTML -->
<Slot title="Report">
  <div class="block">
    <IconButton i="report" on:click={handleReportStockEvent}>Stock</IconButton>
    <IconButton i="report" on:click={handleReportPaymentEvent}>Payment</IconButton>
  </div>
</Slot>

<!-- style -->
<style lang="scss">
</style>
