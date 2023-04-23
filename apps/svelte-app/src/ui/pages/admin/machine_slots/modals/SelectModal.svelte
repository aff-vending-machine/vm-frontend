<!-- SelectModal -->
<script lang="ts">
  // core
  import { modal } from '~/share/stores';

  // components
  import KvRow from '~/ui/components/overlays/modals/KVRow.svelte';
  import SelectModal from '~/ui/components/overlays/modals/SelectModal.svelte';
</script>

<!-- HTML -->
<SelectModal>
  <h3 class="text-lg font-medium text-primary-900 mb-4">Machine Slot: {$modal.source['code']}</h3>
  <div class="grid grid-cols-3 gap-4 p-2 border">
    <KvRow key="Machine ID" value={$modal.source['machine_id']} />
    <KvRow key="ID" value={$modal.source['id']} />
    <KvRow key="Code" value={$modal.source['code']} />
    <KvRow key="Stock" value={$modal.source['stock']} />
    <KvRow key="Capacity" value={$modal.source['capacity']} />
    {#if !!$modal.source['product']}
      <KvRow key="Product SKU" value={$modal.source['product'].sku} />
      <KvRow key="Product Name" value={$modal.source['product'].name} />
      <KvRow key="Product Price" value={$modal.source['product'].price} />
    {/if}
    <KvRow key="Active" value={$modal.source['is_enable']} />
    <KvRow key="Created At" value={$modal.source['created_at']} />
    <KvRow key="Updated At" value={$modal.source['updated_at']} />
  </div>
</SelectModal>

<!-- style -->
<style lang="scss">
</style>
