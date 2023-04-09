<!-- FormModal -->
<script lang="ts">
  import { modal } from '~/share/stores';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  export let formId: string;
  export let show = false;
  export let disabled = false;

  const handleClose = () => modal.set({});
</script>

<!-- HTML -->
{#if show}
  <div class="fixed inset-0 z-10 bg-gray-700/50" />
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
    <div class="mx-auto overflow-hidden rounded-lg bg-white shadow-xl sm:w-full sm:max-w-xl">
      <div class="relative p-6">
        <button
          class="absolute top-4 right-4 rounded-lg p-1 text-center font-medium transition-all"
          on:click={handleClose}
        >
          <Icon i="close" class="w-6 h-6 fill-gray-500 hover:fill-danger-500" />
        </button>
        <slot />
      </div>
      <div class="flex justify-end gap-3 bg-secondary-50 px-6 py-3">
        <button
          type="button"
          class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all 
          hover:bg-gray-100 hover:text-danger-500 
          focus:ring focus:ring-gray-100 
          disabled:cursor-not-allowed 
          disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
          on:click|once={handleClose}
        >
          Cancel
        </button>
        <button
          form={formId}
          type="submit"
          class="rounded-lg border border-primary-500 bg-primary-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all 
          hover:border-primary-700 hover:bg-primary-700 
          focus:ring focus:ring-primary-200 
          disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
          {disabled}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- style -->
<style lang="scss">
</style>
