<!-- UserViewer -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { User } from '@apps/core';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import AutoRender from '~/ui/components/overlays/modals/AutoRender.svelte';

  export let user: User;

  const dispatch = createEventDispatcher();

  function handleDelete() {
    dispatch('delete', { source: user });
  }
  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full mr-2" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full md:pl-4 space-y-1">
      <h1 class="text-xl font-bold pb-2">{user.username}</h1>
      <div class="grid grid-cols-3 space-y-1 p-4 w-full max-h-[32rem] overflow-y-auto">
        {#each Object.entries(user) as [key, value]}
          {#if !!value}
            <div class="font-semibold">{key}</div>
            <div class="col-span-2"><AutoRender {key} {value} /></div>
          {/if}
        {/each}
      </div>
      <p ></p>
    </div>
  </div>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="danger" on:click={handleDelete}>{$_('button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
