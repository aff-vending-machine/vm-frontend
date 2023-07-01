<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { access } from '~/stores/access';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import Filterbar from '~/ui/components/sections/headers/Filterbar.svelte';
  import { requestRole } from '~/utils/helpers/role';
  // import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import { SelectOptionsType } from '~/utils/types/options';

  export let role: string;
  export let branch: string;
  export let search: string;
  export let roleOptions: SelectOptionsType[];
  export let branchOptions: SelectOptionsType[];

  const dispatch = createEventDispatcher();

  function handleFilter() {
    dispatch('filter');
  }
  function handleCreate() {
    dispatch('create');
  }
</script>

<Filterbar>
  {#if requestRole($access?.role, 'admin')}
    <SelectField
      id="role"
      label="Role"
      bind:value={role}
      options={roleOptions}
      placeholder="no filter"
      on:change={handleFilter}
    />
    <SelectField
      id="branch"
      label="Branch"
      bind:value={branch}
      options={branchOptions}
      placeholder="no filter"
      on:change={handleFilter}
    />
    <TextInputField class="hidden" id="search" label="Search" bind:value={search} on:change={handleFilter} />
  {/if}
  <svelte:fragment slot="right">
    {#if requestRole($access?.role, 'manager')}
      <Button outline class="group" on:click={handleCreate}>
        <Icon i="ic-add" class="h-4 w-4 fill-red-500 group-hover:fill-white" />
        <span class="ml-2">{$_('button.add-user')}</span>
      </Button>
    {/if}
  </svelte:fragment>
</Filterbar>

<style>
  /* Add any necessary styles for the filter bar */
</style>
