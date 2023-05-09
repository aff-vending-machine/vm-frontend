<!-- ProductViewer -->
<script lang="ts">
  import { Product } from '@apps/core';
  import { createEventDispatcher } from 'svelte';

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
      <p class="text-gray-700">SKU: {product.sku}</p>
      <p class="text-gray-700">Group: {product.group?.name || '-'}</p>
      <p class="text-gray-700">
        Status:
        {#if product.active}
          <span class="text-green-500">active</span>
        {:else}
          <span class="text-red-500">disabled</span>
        {/if}
      </p>
      <p class="text-xl font-semibold pt-4">{product.price.toFixed(2)} Baht</p>
    </div>
  </div>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="blue" outline on:click={() => dispatch('edit', { data: product })}>Edit</Button>
    <Button color="red" outline on:click={() => dispatch('delete', { data: product })}>Delete</Button>
    <Button color="red" outline on:click={() => dispatch('cancel')}>Cancel</Button>
  </div>
</div>
