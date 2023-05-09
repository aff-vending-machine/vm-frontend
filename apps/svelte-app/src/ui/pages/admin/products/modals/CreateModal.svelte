<!-- CreateModal -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { min, required } from 'svelte-forms/validators';

  // components
  import FormModal from '~/ui/components/overlays/modals/FormModal.svelte';
  import FormControl from '~/ui/components/forms/inputs/FormControl.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';
  import NumberInput from '~/ui/components/forms/inputs/NumberInput.svelte';
  import Image from '~/components/common/images/Image.svelte';

  const dispatch = createEventDispatcher();

  // form
  const formId = 'create-product-form';
  const sku = field('sku', '', [required()]);
  const name = field('name', '', [required()]);
  const type = field('type', '', []);
  const imageUrl = field('image_url', '', []);
  const price = field('price', 0, [required(), min(0)]);

  const modalForm = form(sku, name, type, imageUrl, price);

  // events
  const handleCreate = async () => {
    await modalForm.validate();
    if ($modalForm.errors.length == 0) {
      dispatch('create', modalForm.summary());
    }
  };
</script>

<!-- HTML -->
<FormModal {formId} disabled={$modalForm.errors.length != 0}>
  <h3 class="text-lg font-medium text-primary-900 mb-4">Create New Product</h3>
  <form id={formId} class="grid grid-cols-1 gap-4" on:submit|preventDefault={handleCreate}>
    <div>
      <Image class="border h-32 w-32 mx-auto" src={$imageUrl.value} />
    </div>
    <FormControl name="SKU" required>
      <TextInput name="sku" bind:value={$sku.value} />
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
