<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import Filterbar from '~/ui/components/sections/headers/Filterbar.svelte';
  // import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import { SelectOptionsType } from '~/utils/types/options';

  export let group: string;
  export let search: string;
  export let groupOptions: SelectOptionsType[];

  const dispatch = createEventDispatcher();

  function handleFilter() {
    dispatch('filter', { page: 1 });
  }
  function handleCreate() {
    dispatch('create', { page: 1 });
  }
</script>

<Filterbar>
  <SelectField
    id="group"
    label={$_('field.product-group')}
    bind:value={group}
    options={groupOptions}
    placeholder={$_('field.no-filter')}
    unselected={true}
    on:change={handleFilter}
  />
  <TextInputField class="hidden" id="search" label={$_('field.search')} bind:value={search} on:change={handleFilter} />

  <svelte:fragment slot="right">
    <Button outline class="group" on:click={handleCreate}>
      <Icon i="ic-add" class="h-4 w-4 fill-red-500 group-hover:fill-white" />
      <span class="ml-2">{$_('button.add-product')}</span>
    </Button>
  </svelte:fragment>
</Filterbar>

<style>
  /* Add any necessary styles for the filter bar */
</style>
