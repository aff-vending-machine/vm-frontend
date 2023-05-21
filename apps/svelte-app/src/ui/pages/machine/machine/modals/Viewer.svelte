<!-- MachineViewer -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { Machine } from '@apps/core';

  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let machine: Machine;

  const dispatch = createEventDispatcher();
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full md:w-2/3 md:pl-4 space-y-1">
      <h1 class="text-xl font-bold pb-2">{machine.name}</h1>
    </div>
  </div>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" on:click={() => dispatch('edit', { data: machine })}>{$_('button.edit')}</Button>
    <Button color="danger" on:click={() => dispatch('delete', { data: machine })}>{$_('button.delete')}</Button>
    <Button color="warning" outline on:click={() => dispatch('cancel')}>{$_('button.cancel')}</Button>
  </div>
</div>
