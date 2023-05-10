<!-- ProductViewer -->
<script lang="ts">
  import { Product } from '@apps/core';
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';

  import Button from '~/components/common/buttons/Button.svelte';

  export let product: Product;

  const dispatch = createEventDispatcher();
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/3">
      <img src={product.image_url} alt={product.name} class="w-full h-auto rounded-lg" />
    </div>
    <div class="w-full md:w-2/3 md:pl-4 space-y-1">
      <h1 class="text-xl font-bold pb-2">{product.name}</h1>
      <p class="text-gray-700">{$_('product.sku')}: {product.sku}</p>
      <p class="text-gray-700">{$_('product.group')}: {product.group?.name || '-'}</p>
      <p class="text-gray-700">
        {$_('product.status')}:
        {#if product.active}
          <span class="text-green-500">{$_('status.active')}</span>
        {:else}
          <span class="text-red-500">{$_('status.disabled')}</span>
        {/if}
      </p>
      <p class="text-xl font-semibold pt-4">{product.price.toFixed(2)} {$_('unit.baht')}</p>
    </div>
  </div>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" on:click={() => dispatch('edit', { data: product })}>Edit</Button>
    <Button color="danger" on:click={() => dispatch('delete', { data: product })}>Delete</Button>
    <Button color="warning" outline on:click={() => dispatch('cancel')}>Cancel</Button>
  </div>
</div>
