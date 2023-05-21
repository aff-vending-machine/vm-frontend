<!-- Creator -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';
  import { _ } from 'svelte-i18n';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import NumberInputField from '~/ui/components/forms/input/NumberInputField.svelte';
  import { SelectOptionsType } from '~/utils/types/options';
  import ToggleField from '~/ui/components/forms/input/ToggleField.svelte';

  export let slotcode: string;
  export let groupOptions: SelectOptionsType[];
  export let productOptions: SelectOptionsType[];

  const dispatch = createEventDispatcher();

  const formID = 'slot-creator-form';

  const code = field('code', slotcode, [required()]);
  const group_id = field('group_id', 1, [required()]);
  const product_id = field('product_id', 0, [required()]);
  const stock = field('stock', 0, [required(), min(0)]);
  const capacity = field('capacity', 0, [required(), min(0)]);
  const is_enable = field('is_enable', true, [required()]);

  const slotForm = form(code, group_id, product_id, stock, capacity, is_enable);

  const handleGroup = async () => {
    if (productOptions.findIndex(p => p.filter === $product_id.value) === -1) {
      const firstProduct = productOptions.filter(p => p.filter === $group_id.value)[0];
      product_id.set(firstProduct.value);
    }
  };

  const handleSubmit = async () => {
    await slotForm.validate();
    if ($slotForm.valid) {
      dispatch('create', slotForm.summary());
    }
  };

  onMount(() => {
    handleGroup();
  });
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">Add Slot: {slotcode}</h2>
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
      options={groupOptions}
      unselected={false}
      on:change={handleGroup}
    />
    <SelectField
      id="product_id"
      label="Product"
      bind:value={$product_id.value}
      error={$product_id.errors?.at(0)}
      options={productOptions.filter(p => p.filter === $group_id.value)}
      unselected={false}
    />
    <NumberInputField id="stock" label="Stock" bind:value={$stock.value} error={$stock.errors?.at(0)} />
    <NumberInputField id="capacity" label="Capacity" bind:value={$capacity.value} error={$capacity.errors?.at(0)} />
    <ToggleField id="is_enable" label="Active" bind:value={$is_enable.value} />
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" type="submit" form={formID}>{$_('button.add-slot')}</Button>
    <Button color="warning" outline on:click={() => dispatch('cancel')}>{$_('button.cancel')}</Button>
  </div>
</div>