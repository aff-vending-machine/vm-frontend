<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';

  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import Filterbar from '~/ui/components/sections/headers/Filterbar.svelte';
  import { limitOptions } from '~/utils/constants/options';

  export let limit: number;
  export let search: string;

  const dispatch = createEventDispatcher();

  const handleFilter = () => dispatch('filter', { data: {} });
</script>

<Filterbar>
  <SelectField
    id="limit"
    label={$_('field.limit')}
    bind:value={limit}
    options={limitOptions}
    on:change={handleFilter}
  />
  <TextInputField class="hidden" id="search" label={$_('field.search')} bind:value={search} on:change={handleFilter} />
</Filterbar>

<style>
  /* Add any necessary styles for the filter bar */
</style>
