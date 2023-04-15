<!-- Modal -->
<script lang="ts">
  // core
  import { modal } from '~/share/stores';

  // components
  import LoadingModal from '~/ui/components/overlays/modals/LoadingModal.svelte';
  import SelectModal from './modals/SelectModal.svelte';

</script>

<!-- HTML -->
{#if $modal.event === 'select'}
  <SelectModal />
{/if}
{#if $modal.event === 'create'}
  {$modal.event}
  <SelectModal />
{/if}

<!-- style -->
<style lang="scss">
</style>
