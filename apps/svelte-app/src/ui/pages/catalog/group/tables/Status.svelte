<!-- Action -->
<script lang="ts">
  import { ProductGroup } from '@apps/core';
  import { _ } from 'svelte-i18n';

  export let source: ProductGroup;
</script>

<!-- HTML -->

{#if source['is_enable']}
  <span class="text-success-500"> {$_('group.status-on')}</span>
{:else}
  <span class="text-danger-500"> {$_('group.status-off')}</span>
{/if}

<!-- style -->
<style lang="scss">
</style>
