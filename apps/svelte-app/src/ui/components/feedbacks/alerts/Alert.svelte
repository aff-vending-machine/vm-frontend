<!-- Alert -->
<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  export let show = false;
  export let type: string;
  export let title: string;
  export let message: string;
  export let timeoutIDs: number[] = [];

  onMount(() => {
    timeoutIDs.push(setTimeout(() => (show = false), 5000));
  });

  onDestroy(() => {
    timeoutIDs.forEach(id => clearTimeout(id));
  });

  const handleClose = () => (show = false);

  const background = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-info-50 text-info-500';
      case 'success':
        return 'bg-success-50 text-success-500';
      case 'warning':
        return 'bg-warning-50 text-warning-500';
      case 'error':
        return 'bg-danger-50 text-danger-500';
    }

    return 'bg-gray-50 text-gray-500';
  };

  const icon = (type: string) => {
    switch (type) {
      case 'info':
        return 'fill-info-500';
      case 'success':
        return 'fill-success-500';
      case 'warning':
        return 'fill-warning-500';
      case 'error':
        return 'fill-danger-500';
    }

    return 'fill-slate-500';
  };

  const progress = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-info-500';
      case 'success':
        return 'bg-success-500';
      case 'warning':
        return 'bg-warning-500';
      case 'error':
        return 'bg-danger-500';
    }

    return 'bg-slate-500';
  };
</script>

<!-- HTML -->
{#if show}
  <div class="fixed top-32 right-16 z-50 flex items-center justify-end p-4 sm:p-0 w-full">
    <div class={`flex flex-col rounded-md shadow-lg min-w-[20rem] animate-alert ${background(type)}`}>
      <div class="flex p-4 text-sm">
        <Icon i={type} class={`mr-3 h-5 w-5 flex-shrink-0 ${icon(type)}`} />
        <div>
          <h4 class="font-bold">{title}</h4>
          {#if !!message}
            <div class="mt-1">
              <p>{message}</p>
            </div>
          {/if}
        </div>
        <button class="ml-auto float-right" on:click|once={handleClose}>
          <Icon i="close" class="w-6 h-6 fill-gray-500 hover:fill-danger-500" />
        </button>
      </div>
      <div class="relative flex h-0.5 w-full overflow-hidden rounded-full bg-secondary-200">
        <div
          role="progressbar"
          aria-valuenow={100}
          aria-valuemin={0}
          aria-valuemax={100}
          style="width: 100%"
          class={`flex h-full animate-fill-in-5 ${progress(type)}`}
        />
      </div>
    </div>
  </div>
{/if}

<!-- style -->
<style lang="scss">
</style>
