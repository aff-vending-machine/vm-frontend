<!-- Filter -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // core
  import { limitFilterOptions } from '~/share/modules/options/limit';

  // components  
  import CreateButton from '~/ui/components/elements/buttons/CreateButton.svelte';
  import SelectFilter from '~/ui/components/elements/filters/SelectFilter.svelte';

  export let filter: Record<string, any>;
  
  const dispatch = createEventDispatcher();

  $: handleCreateEvent = () => dispatch('create');
</script>
 
<!-- HTML -->
<div class="flex flex-col md:flex-row w-full justify-between">
  <div class="float-left flex space-x-2">
    <div class="mb-3 mt-6">
      <CreateButton text="Create" on:click={handleCreateEvent} />
    </div>
  </div>
  <div class="float-right flex space-x-2">
    <SelectFilter title="View Row" bind:value={filter.limit} options={limitFilterOptions} on:change />
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
