<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  export let type = 'info';
  export let message = '';

  let timeout: number;

  const dispatch = createEventDispatcher();

  const remove = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch('remove');
    }, 5000);
  };

  $: bgColor = `bg-${type}-100`;
  $: iconColor = `fill-${type}-400`;
  $: txtColor = `text-${type}-700`;
  $: pgbColor = `bg-${type}-500`;

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<div class="flex flex-col rounded-md shadow-lg min-w-[20rem] animate-alert {bgColor} border border-white">
  <div class="flex p-4 text-sm">
    <Icon i="ic-{type}" class="mr-3 h-5 w-5 flex-shrink-0 {iconColor}" />
    <p class={txtColor}>{message}</p>
    <button class="ml-auto float-right" on:click|once={remove}>
      <Icon i="close" class="w-4 h-4 fill-gray-500 hover:fill-danger-500" />
    </button>
  </div>
  <div class="relative flex h-0.5 w-full overflow-hidden rounded-full bg-secondary-200">
    <div
      role="progressbar"
      aria-valuenow={100}
      aria-valuemin={0}
      aria-valuemax={100}
      class="flex h-full w-full animate-fill-in-5 {pgbColor}"
    />
  </div>
</div>

<style>
</style>
