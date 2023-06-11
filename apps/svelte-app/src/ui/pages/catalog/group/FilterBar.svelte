<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { access } from '~/stores/access';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';
  import { requestRole } from '~/utils/helpers/role';

  const dispatch = createEventDispatcher();

  function handleCreate() {
    dispatch('create', { page: 1 });
  }
</script>

<div class="flex justify-between border rounded p-4 bg-secondary-50">
  <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4" />
  <div class="flex items-end align-bottom space-x-2">
    {#if requestRole($access?.role, 'admin')}
      <Button outline class="group" on:click={handleCreate}>
        <Icon i="ic-add" class="h-4 w-4 fill-red-500 group-hover:fill-white" />
        <span class="ml-2">{$_('button.add-group')}</span>
      </Button>
    {/if}
  </div>
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
