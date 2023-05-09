<script lang="ts">
  import SelectField from '~/components/forms/input/SelectField.svelte';
  import TextInputField from '~/components/forms/input/TextInputField.svelte';
  import { limitOptions } from '~/utils/constants/options';

  export let limit: number;
  export let search: string;
</script>

<div class="flex justify-between border rounded p-4 bg-secondary-50">
  <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
    <SelectField id="limit" label="Limit" value={limit} options={limitOptions} placeholder="no filter" />
    <TextInputField id="search" label="Search" value={search} />
  </div>
  <div class="flex items-end align-bottom space-x-2" />
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
