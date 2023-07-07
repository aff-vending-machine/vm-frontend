<script lang="ts">
  import { _ } from 'svelte-i18n';

  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import Command from './components/Command.svelte';

  export let filter: Record<string, any>;
  export let time: Date;
  export let isSynced: boolean;
  export let isEdited: boolean;
  export let loading: boolean;

  $: stockOptions = [
    { label: $_('options.stock.all'), value: null },
    { label: $_('options.stock.avaialble'), value: '>:0' },
    { label: $_('options.stock.out-of-stocks'), value: '<:.01' },
    { label: $_('options.stock.less-than-20'), value: '<=:.2' },
    { label: $_('options.stock.full-stocks'), value: '>:.99' },
  ];
  $: statusOptions = [
    { label: $_('options.status.all'), value: null },
    { label: $_('options.status.enable'), value: true },
    { label: $_('options.status.disable'), value: false },
  ];
  $: editOptions = [
    { label: $_('options.changed.all'), value: null },
    { label: $_('options.changed.changed'), value: true },
    { label: $_('options.changed.not-changed'), value: false },
  ];
</script>

<div class="flex flex-col md:flex-row justify-between space-y-4 border rounded p-4 bg-secondary-50">
  <div class="flex flex-1">
    <Command {time} {isSynced} {isEdited} {loading} on:refresh on:save on:cancel on:create />
  </div>
  <div class="flex-end grid grid-cols-2 xl:grid-cols-4 gap-4">
    <TextInputField id="search" label={$_('field.search')} bind:value={filter.search} maxlength={3} />
    <SelectField
      id="stock"
      label={$_('field.stock')}
      bind:value={filter.stock}
      options={stockOptions}
      unselected={false}
    />
    <SelectField
      id="status"
      label={$_('field.status')}
      bind:value={filter.enable}
      options={statusOptions}
      unselected={false}
    />
    <SelectField
      id="edit"
      label={$_('field.changed')}
      bind:value={filter.edit}
      options={editOptions}
      unselected={false}
    />
  </div>
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
