<!-- Filename -->
<script lang="ts">
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  import { Machine } from '@apps/core';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Bangkok');

  export let machine: Machine;
  export let from: string;
  export let to: string;

  const dispatch = createEventDispatcher();

  const from_ = dayjs(from).format('YYMMDD_HHmm');
  const to_ = dayjs(to).format('YYMMDD_HHmm');

  const formID = 'filename-form'; 
  const filename = field('filename', `${machine.name}-stocks-${from_}-${to_}`, [required()]);
  const filenameForm = form(filename);

  async function handleSubmit() {
    await filenameForm.validate();

    if ($filenameForm.valid) {
      dispatch('download', { machine, filename: $filename.value });
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">Export Report: stocks</h2>
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
    <Button color="warning" outline on:click={handleCancel}>Cancel</Button>
  </div>
</div>
