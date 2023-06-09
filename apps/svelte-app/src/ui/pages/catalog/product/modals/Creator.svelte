<!-- ProductCreator -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';
  import { _ } from 'svelte-i18n';

  import Image from '~/ui/components/elements/images/Image.svelte';
  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import NumberInputField from '~/ui/components/forms/input/NumberInputField.svelte';
  import { genSKU } from '~/utils/helpers/genSKU';
  import { SelectOptionsType } from '~/utils/types/options';

  export let total: number = 0;
  export let groupOptions: SelectOptionsType[];

  const dispatch = createEventDispatcher();

  const formID = 'product-creator-form';
  const group_id = field('group_id', 1, [required()]);
  const name = field('name', '', [required()]);
  const sku = field('sku', genSKU(total), [required()]);
  const image_url = field('image_url', '', []);
  const price = field('price', 1, [required(), min(1)]);
  const productForm = form(name, group_id, sku, image_url, price);

  async function handleSubmit() {
    await productForm.validate();
    if ($productForm.valid) {
      dispatch('create', productForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">{$_('product.create-title')}: {$name.value || $_('general.untitled')}</h2>
  <div class="m-4 flex justify-center">
    <Image class="border h-32 w-32 mx-auto object-contain" src={$image_url.value} alt={$name.value} />
  </div>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <SelectField
      id="group_id"
      label={$_('product.field.group')}
      bind:value={$group_id.value}
      error={$group_id.errors?.at(0)}
      options={groupOptions}
      unselected={false}
    />
    <TextInputField id="name" label={$_('product.field.name')} bind:value={$name.value} error={$name.errors?.at(0)} />
    <TextInputField id="sku" label={$_('product.field.sku')} bind:value={$sku.value} error={$name.errors?.at(0)} />
    <TextInputField
      id="image_url"
      label={$_('product.field.image')}
      bind:value={$image_url.value}
      error={$image_url.errors?.at(0)}
    />
    <NumberInputField
      id="price"
      label={$_('product.field.price')}
      bind:value={$price.value}
      error={$price.errors?.at(0)}
      min={1}
    />
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" type="submit" form={formID}>{$_('button.add-product')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
