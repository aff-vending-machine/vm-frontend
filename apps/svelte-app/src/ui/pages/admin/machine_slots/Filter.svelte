<!-- Filter -->
<script lang="ts">
  // components
  import SelectFilter from '~/ui/components/elements/filters/SelectFilter.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';
  import { stockOptions } from '~/share/modules/options/stock';
  import { editOptions, enableOptions } from '~/share/modules/options/enable';
  import Command from './filters/Command.svelte';

  // props
  export let filter: Record<string, any>;
  export let time: Date;
  export let isSynced: boolean;
  export let isEdited: boolean;
</script>

<!-- HTML -->
<div class="flex flex-col md:flex-row w-full justify-between">
  <div class="float-left flex space-x-2">
    <div class="flex flex-col space-y-2">
      <Command {time} {isSynced} {isEdited} on:fetch on:save on:cancel on:create />
    </div>
  </div>
  <div class="float-right flex space-x-2">
    <div class="flex flex-col space-y-2">
      <span class="text-xs font-semibold">Slot Search</span>
      <TextInput name="search" bind:value={filter.search} maxlength={3} />
    </div>
    <SelectFilter title="Stock" bind:value={filter.stock} options={stockOptions} />
    <SelectFilter title="Status" bind:value={filter.enable} options={enableOptions} />
    <SelectFilter title="Edit" bind:value={filter.edit} options={editOptions} />
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
