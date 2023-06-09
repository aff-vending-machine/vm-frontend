<!-- Editor -->
<script lang="ts">
  import { MachineSlot } from '@apps/core';
  import { createEventDispatcher, onMount } from 'svelte';
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

  export let slot: MachineSlot;
  export let groupOptions: SelectOptionsType[];
  export let productOptions: SelectOptionsType[];

  const dispatch = createEventDispatcher();

  const formID = 'slot-editor-form';

  const id = field('id', slot.id, [required()]);
  const code = field('code', slot.code, [required()]);
  const group_id = field('group_id', slot.product?.group_id, [required()]);
  const productID = field('product_id', slot.product_id, []);
  const stock = field('stock', slot.stock, [required(), min(0)]);
  const capacity = field('capacity', slot.capacity, [required(), min(0)]);
  const is_enable = field('is_enable', slot.is_enable, [required()]);

  const slotForm = form(id, code, group_id, productID, stock, capacity, is_enable);

  async function handleSubmit() {
    await slotForm.validate();
    if ($slotForm.valid) {
      dispatch('update', slotForm.summary());
    }
  }

  async function handleGroup() {
    if (productOptions.findIndex(p => p.value === $productID.value) === -1) {
      const firstProduct = productOptions.filter(p => p.filter === $group_id.value)[0];
      productID.set(firstProduct.value);
    }
  }

  function handleDelete() {
    dispatch('delete', { source: slot });
  }

  function handleCancel() {
    dispatch('cancel');
  }

  onMount(() => {
    handleGroup();
  });
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">{$_('slot.update-title')}: {slot.code} ({slot.product?.name || '-'})</h2>
  <div class="m-4 flex justify-center">
    <Image
      class="border h-32 w-32 mx-auto object-contain"
      src={productOptions.find(p => p.value === $productID.value).more?.image}
      alt="images"
    />
  </div>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <TextInputField id="code" label={$_('slot.field.code')} bind:value={$code.value} disabled />
    <SelectField
      id="group_id"
      label={$_('slot.field.product-group')}
      bind:value={$group_id.value}
      error={$group_id.errors?.at(0)}
      options={groupOptions}
      unselected={false}
      on:change={handleGroup}
    />
    <SelectField
      id="product_id"
      label={$_('slot.field.product')}
      bind:value={$productID.value}
      error={$productID.errors?.at(0)}
      options={productOptions.filter(p => p.filter === $group_id.value)}
      unselected={false}
    />
    <NumberInputField
      id="stock"
      label={$_('slot.field.stock')}
      bind:value={$stock.value}
      error={$stock.errors?.at(0)}
    />
    <NumberInputField
      id="capacity"
      label={$_('slot.field.capacity')}
      bind:value={$capacity.value}
      error={$capacity.errors?.at(0)}
    />
    <ToggleField id="is_enable" label={$_('slot.field.active')} bind:value={$is_enable.value} />
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" type="submit" form={formID}>{$_('button.save')}</Button>
    <Button color="danger" outline on:click={handleDelete}>{$_('button.delete')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
