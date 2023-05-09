<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '~/components/common/buttons/Button.svelte';
  import Icon from '~/components/common/icons/Icon.svelte';
  import SelectField from '~/components/forms/input/SelectField.svelte';
  import TextInputField from '~/components/forms/input/TextInputField.svelte';

  export let group: string;
  export let search: string;

  const dispatch = createEventDispatcher();
</script>

<div class="flex justify-between border rounded p-4 bg-secondary-50">
  <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
    <SelectField id="group" label="Group" value={group} options={[]} placeholder="no filter" />
    <TextInputField id="search" label="Search" value={search} />
  </div>
  <div class="flex items-end align-bottom space-x-2">
    <Button outline class="group" on:click={() => dispatch('create', { data: {} })}>
      <Icon i="ic-add" class="h-4 w-4 fill-red-500 group-hover:fill-white" />
      <span class="ml-2">Add Product</span>
    </Button>
  </div>
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
