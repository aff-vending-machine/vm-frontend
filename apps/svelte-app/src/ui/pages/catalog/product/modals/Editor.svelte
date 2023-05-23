<!-- ProductEditor -->
<script lang="ts">
  import { CatalogProduct } from '@apps/core';
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';
  import { _ } from 'svelte-i18n';

  import Image from '~/ui/components/elements/images/Image.svelte';
  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import NumberInputField from '~/ui/components/forms/input/NumberInputField.svelte';
  import ToggleField from '~/ui/components/forms/input/ToggleField.svelte';
  import { SelectOptionsType } from '~/utils/types/options';

  export let product: CatalogProduct;
  export let groupOptions: SelectOptionsType[];

  const dispatch = createEventDispatcher();

  const formID = 'product-editor-form';
  const id = field('id', product.id, [required()]);
  const sku = field('sku', product.sku, [required()]);
  const group_id = field('group_id', product.group_id, [required()]);
  const name = field('name', product.name, [required()]);
  const image_url = field('image_url', product.image_url, []);
  const price = field('price', product.sale_price, [required(), min(0)]);
  const is_enable = field('is_enable', product.is_enable, [required()]);
  const productForm = form(id, sku, name, group_id, image_url, price, is_enable);

  async function handleSubmit() {
    await productForm.validate();
    if ($productForm.valid) {
      dispatch('update', productForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">Update Product: {product.name || 'Untitled'}</h2>
  <div class="m-4 flex justify-center">
    <Image class="border h-32 w-32 mx-auto" src={$image_url.value} alt={$name.value} />
  </div>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <TextInputField id="sku" label="SKU" bind:value={$sku.value} disabled />
    <SelectField
      id="group_id"
      label="Group"
      bind:value={$group_id.value}
      error={$group_id.errors?.at(0)}
      options={groupOptions}
      unselected={false}
    />
    <TextInputField id="name" label="Name" bind:value={$name.value} error={$name.errors?.at(0)} />
    <TextInputField id="image_url" label="Image URL" bind:value={$image_url.value} error={$image_url.errors?.at(0)} />
    <NumberInputField id="price" label="Price" bind:value={$price.value} error={$price.errors?.at(0)} />
    <ToggleField id="is_enable" label="Active" bind:value={$is_enable.value} />
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" type="submit" form={formID}>{$_('button.save')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
