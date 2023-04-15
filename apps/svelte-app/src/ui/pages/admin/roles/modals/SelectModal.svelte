<!-- SelectModal -->
<script lang="ts">
  // core
  import { modal } from '~/share/stores';

  // components
  import BlankModal from '~/ui/components/overlays/modals/BlankModal.svelte';
  import KvRow from '~/ui/components/overlays/modals/KVRow.svelte';
  
  const getPermissionText = (level: number) => {
    switch (level) {
      case 0:
        return '(none) no permission';
      case 1:
        return '(viewer) read';
      case 2:
        return '(owner) read and owner write';
      case 3:
        return '(editor) read and write';
      case 4:
        return '(admin) anything';
    }
  };
</script>

<!-- HTML -->
<BlankModal>
  <h3 class="text-lg font-medium text-primary-900 mb-4">Role: {$modal.source['name']}</h3>
  <div class="grid grid-cols-3 gap-4 p-2 border">
    <KvRow key="Name" value={$modal.source['name']} />
    {#each $modal.source['permissions'] as permission}
      <KvRow key={permission['scope']} value={getPermissionText(permission['level'])} />
    {/each}
  </div>
</BlankModal>

<!-- style -->
<style lang="scss">
</style>
