<!-- ProductEraser -->
<script lang="ts">
  import { Product } from '@apps/core';
  import { createEventDispatcher } from 'svelte';

  import Button from '~/components/common/buttons/Button.svelte';

  export let product: Product;

  const dispatch = createEventDispatcher();

  async function handleDelete() {}

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">Delete Product: {product.name || 'Untitled'}</h2>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="red" outline on:click={handleCancel}>Cancel</Button>
    <Button color="blue" outline on:click={handleDelete}>Delete</Button>
  </div>
</div>
