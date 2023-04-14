<!-- Filter -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // components
  import SelectFilter from '~/ui/components/elements/filters/SelectFilter.svelte';
  import IconButton from '~/ui/components/elements/buttons/IconButton.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';
  import { stockOptions } from '~/share/modules/options/stock';
  import { enableOptions } from '~/share/modules/options/enable';

  export let filter: Record<string, any>;

  const dispatch = createEventDispatcher();

  const handleFetch = () => dispatch('fetch');
  const handleSave = () => dispatch('reload');
  const handleCancel = () => dispatch('reload');
  const handleCreate = () => dispatch('event', { event: 'create' });
</script>

<!-- HTML -->
<div class="flex flex-col md:flex-row w-full justify-between">
  <div class="float-left flex space-x-2">
    <div class="mb-3 text-center">
      <IconButton i="sync" on:click={handleFetch}>Fetch</IconButton>
    </div>
    <div class="mb-3 text-center">
      <IconButton i="save" on:click={handleSave}>Save</IconButton>
    </div>
    <div class="mb-3 text-center">
      <IconButton i="cancel" on:click={handleCancel}>Cancel</IconButton>
    </div>
    <div class="mb-3 text-center">
      <IconButton i="plus" on:click={handleCreate}>Create</IconButton>
    </div>
  </div>
  <div class="float-right flex space-x-2">
    <div class="mb-3 text-center">
      <span class="text-xs font-semibold">Slot Search</span>
      <TextInput name="search" bind:value={filter.search} maxlength={3} />
    </div>
    <SelectFilter title="Stock" bind:value={filter.stock} options={stockOptions} />
    <SelectFilter title="Status" bind:value={filter.enable} options={enableOptions} />
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
