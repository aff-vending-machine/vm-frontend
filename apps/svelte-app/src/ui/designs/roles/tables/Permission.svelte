<!-- Action -->
<script lang="ts">
  import { Permission } from '@apps/core';

  export let data: Permission[];

  const getPermissionColor = (level: number) => {
    switch (level) {
      case 0:
        return 'text-red-500';
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-green-500';
      case 3:
        return 'text-blue-500';
      case 4:
        return 'text-purple-500';
    }
  };
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
<div>
  <div class="grid grid-cols-2 gap-4 max-w-xs">
    {#each data as permission}
      <div class={getPermissionColor(permission.level)}>{permission.scope}</div>
      <div class={getPermissionColor(permission.level)}>{getPermissionText(permission.level)}</div>
    {/each}
  </div>
</div>
