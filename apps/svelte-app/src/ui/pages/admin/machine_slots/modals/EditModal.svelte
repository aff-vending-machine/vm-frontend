<!-- EditModal -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';

  // core
  import { ProductState, provideProductBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { modal } from '~/share/stores';

  // components
  import FormModal from '~/ui/components/overlays/modals/FormModal.svelte';
  import FormControl from '~/ui/components/forms/inputs/FormControl.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';
  import NumberInput from '~/ui/components/forms/inputs/NumberInput.svelte';
  import Select from '~/ui/components/forms/selects/Select.svelte';
  import ToggleInput from '~/ui/components/forms/inputs/ToggleInput.svelte';

  const dispatch = createEventDispatcher();

  const bloc = provideProductBloc();
  const state = useBlocState<ProductState>(bloc);

  // form
  const formId = 'edit-machine-slot-form';
  const id = field('id', $modal.id, []);  
  const product = field('product', $modal.source['product'], []);
  const stock = field('stock', $modal.source['stock'], [required(), min(0)]);
  const capacity = field('capacity', $modal.source['capacity'], [required(), min(0)]);
  const active = field('is_enable', $modal.source['is_enable'], []);

  const modalForm = form(id, product, stock, capacity, active);

  // events
  const handleEdit = async () => {
    await modalForm.validate();
    if ($modalForm.errors.length == 0) {
      dispatch('edit', modalForm.summary());
    }
  };

  let productOptions = [];

  onMount(async () => {
    await bloc.list();

    if ($state.kind === 'load-success') {
      productOptions = $state.list.map(r => ({
        name: `${r.name} (SKU: ${r.sku}, Price: ${r.price})`,
        value: r,
      }));

      product.set($state.list.find(p => p.id === $modal.source['product'].id) || productOptions[0].value);
    }
  });
</script>

<!-- HTML -->
<FormModal {formId} disabled={$modalForm.errors.length != 0}>
  <h3 class="text-lg font-medium text-primary-900 mb-4">
    Edit Machine Slot: {$modal.source['code']} ({$modal.source['product']?.name || '-'})
  </h3>
  <form id={formId} class="grid grid-cols-1 gap-4" on:submit|preventDefault={handleEdit}>
    <FormControl name="Code" required>
      <TextInput name="code" bind:value={$modal.source['code']} disabled />
    </FormControl>
    <FormControl name="Product" required>
      <Select bind:value={$product.value} options={productOptions} />
    </FormControl>
    <FormControl name="Stock" required>
      <NumberInput name="stock" bind:value={$stock.value} min={0} max={$capacity.value} maxlength={2} />
    </FormControl>
    <FormControl name="Capacity" required>
      <NumberInput name="capacity" bind:value={$capacity.value} min={$stock.value} max={999} maxlength={3} />
    </FormControl>
    <FormControl name="Active" mention={false}>
      <ToggleInput name="is_enable" bind:value={$active.value} />
    </FormControl>
  </form>
</FormModal>

<!-- style -->
<style lang="scss">
</style>
