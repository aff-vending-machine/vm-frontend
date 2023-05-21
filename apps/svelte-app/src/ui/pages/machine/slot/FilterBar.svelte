<script lang="ts">
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import { editOptions, enableOptions, stockOptions } from '~/utils/types/options';
  import Command from './components/Command.svelte';

  export let filter: Record<string, any>;
  export let time: Date;
  export let isSynced: boolean;
  export let isEdited: boolean;
</script>

<div class="flex justify-between border rounded p-4 bg-secondary-50">
  <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
    <Command {time} {isSynced} {isEdited} on:refresh on:save on:cancel on:create />
  </div>
  <div class="flex items-end align-bottom space-x-2">
    <div class="flex flex-col space-y-2">
      <span class="text-xs font-semibold">Slot Search</span>
      <TextInputField id="search" label="Search" bind:value={filter.search} maxlength={3} />
    </div>
    <SelectField id="stock" label="Stock" bind:value={filter.stock} options={stockOptions} unselected={false} />
    <SelectField id="status" label="Status" bind:value={filter.enable} options={enableOptions} unselected={false} />
    <SelectField id="edit" label="Edit" bind:value={filter.edit} options={editOptions} unselected={false} />
  </div>
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
