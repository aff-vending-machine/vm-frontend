<!-- Viewer -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { PaymentChannel } from '@apps/core';

  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let channel: PaymentChannel;

  const dispatch = createEventDispatcher();

  function handleDelete() {
    dispatch('delete', { data: channel });
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full md:w-2/3 md:pl-4 space-y-1">
      <h1 class="text-xl font-bold pb-2">{channel.channel}</h1>
    </div>
  </div>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="success" on:click={handleDelete}>{$_('button.confirm')}</Button>
    <Button color="danger" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
