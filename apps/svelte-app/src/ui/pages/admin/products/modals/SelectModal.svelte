<!-- SelectModal -->
<script lang="ts">
  // core
  import { modal } from '~/share/stores';

  // components
  import KvRow from '~/ui/components/overlays/modals/KVRow.svelte';
  import SelectModal from '~/ui/components/overlays/modals/SelectModal.svelte';
  import Image from '~/components/common/images/Image.svelte';
</script>

<!-- HTML -->
<SelectModal>
  <h3 class="text-lg font-medium text-primary-900 mb-4">Product: {$modal.source['name']}</h3>
  <div class="grid grid-cols-3 gap-4 p-2 border">
    <div class="col-span-3">
      <Image class="border h-32 w-32 mx-auto" src={$modal.source['image_url']} alt={$modal.source['name']} />
    </div>
    <KvRow key="ID" value={$modal.source['id']} />
    <KvRow key="SKU" value={$modal.source['sku']} />
    <KvRow key="Name" value={$modal.source['name']} />
    <KvRow key="Type" value={$modal.source['type']} />
    <KvRow key="Image URL" value={$modal.source['image_url']} />
    <KvRow key="Price" value={$modal.source['price']} />
    <KvRow key="Created At" value={$modal.source['created_at']} />
    <KvRow key="Updated At" value={$modal.source['updated_at']} />
  </div>
</SelectModal>

<!-- style -->
<style lang="scss">
</style>
