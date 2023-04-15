<!-- BlankModal -->
<script lang="ts">
  import { modal } from '~/share/stores';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  const handleClose = () => modal.set({});
</script>

<!-- HTML -->
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
    </div>
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
