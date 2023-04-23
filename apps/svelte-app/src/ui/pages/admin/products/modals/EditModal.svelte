<!-- EditModal -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';

  // core
  import { modal } from '~/share/stores';

  // components
  import FormModal from '~/ui/components/overlays/modals/FormModal.svelte';
  import FormControl from '~/ui/components/forms/inputs/FormControl.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';
  import NumberInput from '~/ui/components/forms/inputs/NumberInput.svelte';
  import Image from '~/ui/components/elements/images/Image.svelte';

  const dispatch = createEventDispatcher();

  // form
  const formId = 'edit-product-form';
  const id = field('id', $modal.id, []);
  const name = field('name', $modal.source['name'], [required()]);
  const type = field('type', $modal.source['type'], []);
  const imageUrl = field('image_url', $modal.source['image_url'], []);
  const price = field('price', $modal.source['price'], [required(), min(0)]);

  const modalForm = form(id, name, type, imageUrl, price);

  // events
  const handleEdit = async () => {
    await modalForm.validate();
    if ($modalForm.errors.length == 0) {
      dispatch('edit', modalForm.summary());
    }
  };
</script>

<!-- HTML -->
<FormModal {formId} disabled={$modalForm.errors.length != 0}>
  <h3 class="text-lg font-medium text-primary-900 mb-4">
    Edit Product: {$modal.source['id']} ({$modal.source['sku']})
  </h3>
  <form id={formId} class="grid grid-cols-1 gap-4" on:submit|preventDefault={handleEdit}>
    <div>
      <Image class="border h-32 w-32 mx-auto" src={$imageUrl.value} alt={$modal.source['name']} />
    </div>
    <FormControl name="ID" required>
      <TextInput name="id" bind:value={$id.value} disabled />
    </FormControl>
    <FormControl name="SKU" required>
      <TextInput name="sku" bind:value={$modal.source['sku']} disabled />
    </FormControl>
    <FormControl name="Name" required>
      <TextInput name="name" bind:value={$name.value} />
    </FormControl>
    <FormControl name="Type">
      <TextInput name="type" bind:value={$type.value} />
    </FormControl>
    <FormControl name="Image URL">
      <TextInput name="image_url" bind:value={$imageUrl.value} />
    </FormControl>
    <FormControl name="Price" required>
      <NumberInput name="price" bind:value={$price.value} />
    </FormControl>
  </form>
</FormModal>

<!-- style -->
<style lang="scss">
</style>
