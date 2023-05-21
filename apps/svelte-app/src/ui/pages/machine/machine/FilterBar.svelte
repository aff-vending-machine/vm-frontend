<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import { limitOptions } from '~/utils/constants/options';

  export let limit: number;
  export let search: string;

  const dispatch = createEventDispatcher();

  const handleFilter = () => dispatch('filter', { data: {} });
</script>

<div class="flex justify-between border rounded p-4 bg-secondary-50">
  <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
    <SelectField id="limit" label="Limit" bind:value={limit} options={limitOptions} on:change={handleFilter} />
    <TextInputField class="hidden" id="search" label="Search" bind:value={search} on:change={handleFilter} />
  </div>
  <div class="flex items-end align-bottom space-x-2" />
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
