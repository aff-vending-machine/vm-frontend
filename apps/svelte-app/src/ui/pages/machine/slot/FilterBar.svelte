<script lang="ts">
  import { _ } from 'svelte-i18n';
  
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import { editOptions, enableOptions, stockOptions } from '~/utils/types/options';
  import Command from './components/Command.svelte';

  export let filter: Record<string, any>;
  export let time: Date;
  export let isSynced: boolean;
  export let isEdited: boolean;
  export let loading: boolean;
</script>

<div class="flex flex-col md:flex-row justify-between space-y-4 border rounded p-4 bg-secondary-50">
  <div class="flex flex-1">
    <Command {time} {isSynced} {isEdited} {loading} on:refresh on:save on:cancel on:create />
  </div>
  <div class="flex-end grid grid-cols-2 xl:grid-cols-4 gap-4">
    <TextInputField id="search" label={$_('slot.search')} bind:value={filter.search} maxlength={3} />
    <SelectField id="stock" label={$_('slot.stock')} bind:value={filter.stock} options={stockOptions} unselected={false} />
    <SelectField id="status" label={$_('slot.status')} bind:value={filter.enable} options={enableOptions} unselected={false} />
    <SelectField id="edit" label={$_('slot.changed')} bind:value={filter.edit} options={editOptions} unselected={false} />
  </div>
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
