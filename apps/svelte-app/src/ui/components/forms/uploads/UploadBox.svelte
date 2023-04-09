<!-- UploadBox -->
<script lang="ts">
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  export let name: string;
  export let value: string;
  export let accept = '*';
  export let file: File;
  let files: any;

  $: if (files) {
    file = files[0];
  } else {
    file = null;
  }
</script>

<!-- HTML -->
<div class="mx-auto max-w-md">
  <label
    class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300"
  >
    <div class="space-y-1 text-center">
      <div class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
        <Icon i="upload" class="h-6 w-6 fill-primary-700" />
      </div>
      <div class="text-gray-600">
        <span class="font-medium text-primary-500 hover:text-primary-700">Click to upload</span> or drag and drop
      </div>
      <p class="text-sm text-gray-500">Firmware image file</p>
      {#if value.length > 0}
        <div class="flex rounded-md bg-slate-50 px-4 py-2 text-sm text-primary-500">
          <Icon i="file-check" class="w-4 h-4 fill-secondary-500" />
          <div class="ml-2">
            {value.split('\\').pop()}
          </div>
        </div>
      {/if}
    </div>
    <input id={name} {name} type="file" class="sr-only" bind:value bind:files {accept} />
  </label>
</div>

<!-- style -->
<style lang="scss">
</style>
