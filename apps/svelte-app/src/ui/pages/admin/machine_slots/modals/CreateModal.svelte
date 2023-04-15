<!-- CreateModal -->
<script lang="ts">
  // core
  import { modal } from '~/share/stores';

  // components
  import BlankModal from '~/ui/components/overlays/modals/BlankModal.svelte';
  import KvRow from '~/ui/components/overlays/modals/KVRow.svelte';
</script>

<!-- HTML -->
<BlankModal>
  <!-- <h3 class="text-lg font-medium text-primary-900 mb-4">Slot Number: {$modal.source['code']}</h3> -->
  <div class="grid grid-cols-3 gap-4 p-2 border">
    <!-- <KvRow key="ID" value={$modal.source['id']} />
    <KvRow key="Name" value={$modal.source['name']} />
    <KvRow key="Serial Number" value={$modal.source['serial_number']} />
    <KvRow key="Location" value={$modal.source['location']} />
    <KvRow key="Type" value={$modal.source['type']} />
    <KvRow key="Vendor" value={$modal.source['vendor']} />
    <KvRow key="Status" value={$modal.source['status']} />
    <KvRow key="Last Active Time" value={$modal.source['last_active_time']} />
    <KvRow key="Last Maintenance Time" value={$modal.source['last_maintenance_time']} /> -->
  </div>
</BlankModal>

<!-- style -->
<style lang="scss">
</style>
