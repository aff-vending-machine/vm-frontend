<!-- SelectModal -->
<script lang="ts">
  // core
  import { modal } from '~/share/stores';

  // components
  import BlankModal from '~/ui/components/overlays/modals/BlankModal.svelte';
  import KvRow from '~/ui/components/overlays/modals/KVRow.svelte';
</script>

<!-- HTML -->
<BlankModal show={$modal.event === 'select'}>
  <h3 class="text-lg font-medium text-primary-900 mb-4">Name: {$modal.source['username']}</h3>
  <div class="grid grid-cols-3 gap-4 p-2 border">
    <KvRow key="Userame" value={$modal.source['username']} />
    <KvRow key="Role" value={$modal.source['role']} />
    <KvRow key="Created By" value={$modal.source['created_by']} />
    <KvRow key="Created IP" value={$modal.source['created_ip']} />
    <KvRow key="Created Time" value={$modal.source['created_at']} />
    <KvRow key="Logged In IP" value={$modal.source['loggedin_ip']} />
    <KvRow key="Logged In Time" value={$modal.source['loggedin_at']} />
    <KvRow key="Update Time" value={$modal.source['updated_at']} />
  </div>
</BlankModal>

<!-- style -->
<style lang="scss">
</style>
