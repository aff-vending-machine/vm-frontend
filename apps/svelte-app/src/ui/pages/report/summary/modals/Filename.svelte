<!-- Filename -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  import { Machine } from '@apps/core';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';

  export let action: string;
  export let machine: Machine;

  const dispatch = createEventDispatcher();

  const formID = 'filename-form';
  const filename = field('filename', `${machine.name}-${action}`, [required()]);
  const filenameForm = form(filename);

  const handleSubmit = async () => {
    await filenameForm.validate();

    if ($filenameForm.valid) {
      dispatch('download', { action, machine, filename: $filename.value });
    }
  };
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">Export Report: {action}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <TextInputField
      id="filename"
      label="Filename (.csv)"
      bind:value={$filename.value}
      error={$filename.errors?.at(0)}
    />
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" type="submit" form={formID}>Export</Button>
    <Button color="warning" outline on:click={() => dispatch('cancel')}>Cancel</Button>
  </div>
</div>
