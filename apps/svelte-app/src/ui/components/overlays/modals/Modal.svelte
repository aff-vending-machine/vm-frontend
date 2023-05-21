<!-- Modal.svelte -->
<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  const handleClose = () => {
    dispatch('close');
  };

  onMount(() => {
    document.body.classList.add('modal-open');
  });

  onDestroy(() => {
    document.body.classList.remove('modal-open');
  });
</script>

<div class="fixed inset-0 flex items-center justify-center" style="z-index: 100;">
  <div
    class="bg-white p-6 md:rounded-lg shadow-lg relative z-10 w-full max-w-2xl m-0 md:mx-4 max-h-full md:max-h-[calc(100%-16px)] overflow-y-auto"
  >
    <button
      class="absolute top-0 right-0 m-4 text-lg font-semibold leading-none text-gray-900 hover:text-gray-600"
      on:click={handleClose}
    >
      &times;
    </button>
    <slot />
  </div>
  <button class="fixed inset-0 bg-black opacity-50 z-0" on:click={handleClose} />
</div>

<style>
  :global(body.modal-open) {
    overflow: hidden;
  }
</style>
