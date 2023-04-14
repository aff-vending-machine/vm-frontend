<!-- Filter -->
<script lang="ts">
  // core
  import { limitFilterOptions } from '~/share/modules/options/limit';

  // components
  import SelectFilter from '~/ui/components/elements/filters/SelectFilter.svelte';

  export let filter: Record<string, any>;
</script>

<!-- HTML -->
<div class="flex flex-col md:flex-row w-full justify-between">
  <div class="float-left flex space-x-2" />
  <div class="float-right flex space-x-2">
    <SelectFilter title="View Row" bind:value={filter.limit} options={limitFilterOptions} on:change />
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
