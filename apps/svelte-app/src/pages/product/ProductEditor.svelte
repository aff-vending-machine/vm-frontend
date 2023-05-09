<!-- ProductEditor -->
<script lang="ts">
  import { Product } from '@apps/core';
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';

  import Image from '~/components/common/images/Image.svelte';
  import Button from '~/components/common/buttons/Button.svelte';
  import SelectField from '~/components/forms/input/SelectField.svelte';
  import TextInputField from '~/components/forms/input/TextInputField.svelte';
  import NumberInputField from '~/components/forms/input/NumberInputField.svelte';

  export let product: Product;

  const dispatch = createEventDispatcher();

  const formID = 'product-editor-form';

  const id = field('id', product.id, []);
  const group_id = field('group_id', product.group_id, [required()]);
  const name = field('name', product.name, [required()]);
  const sku = field('sku', product.sku, [required()]);
  const imageUrl = field('image_url', product.image_url, []);
  const price = field('price', product.price, [required(), min(0)]);

  const productForm = form(id, name, group_id, imageUrl, price);

  async function handleSubmit() {
    await productForm.validate();
    if ($productForm.valid) {
      dispatch('save', productForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">Edit Product: {product.name || 'Untitled'}</h2>
  <div class="m-4 flex justify-center">
    <Image class="border h-32 w-32 mx-auto" src={$imageUrl.value} alt={$name.value} />
  </div>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <SelectField
      id="group_id"
      label="Group"
      bind:value={$group_id.value}
      error={$group_id.errors?.at(0)}
      options={[]}
    />

    <TextInputField id="name" label="Name" bind:value={$name.value} error={$name.errors?.at(0)} />

    <TextInputField id="sku" label="SKU" bind:value={$sku.value} error={$name.errors?.at(0)} />

    <TextInputField id="image_url" label="Image URL" bind:value={$imageUrl.value} error={$imageUrl.errors?.at(0)} />

    <NumberInputField id="price" label="Price" bind:value={$price.value} error={$price.errors?.at(0)} />
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="red" outline on:click={handleCancel}>Cancel</Button>
    <Button color="blue" type="submit" form={formID}>Save</Button>
  </div>
</div>
