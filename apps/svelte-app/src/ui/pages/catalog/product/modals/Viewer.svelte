<!-- ProductViewer -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { CatalogProduct } from '@apps/core';

  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let product: CatalogProduct;

  const dispatch = createEventDispatcher();

  function handleEdit() {
    dispatch('edit', { source: product });
  }

  function handleDelete() {
    dispatch('delete', { source: product });
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/3">
      <img src={product.image_url} alt={product.name} class="w-full h-auto rounded-lg" />
    </div>
    <div class="w-full md:w-2/3 md:pl-4 space-y-1">
      <h1 class="text-xl font-bold pb-2">{product.name}</h1>
      <p class="text-gray-700">{$_('product.columns.sku')}: {product.sku}</p>
      <p class="text-gray-700">{$_('product.columns.group')}: {product.group?.name || '-'}</p>
      <p class="text-gray-700">
        {$_('product.columns.status')}:
        {#if product.is_enable}
          <span class="text-success-500">{$_('product.status-on')}</span>
        {:else}
          <span class="text-danger-500">{$_('product.status-off')}</span>
        {/if}
      </p>
      <p class="text-xl font-semibold pt-4">{product.sale_price?.toFixed(2)} {$_('unit.baht')}</p>
    </div>
  </div>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" on:click={handleEdit}>{$_('button.edit')}</Button>
    <Button color="danger" on:click={handleDelete}>{$_('button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
