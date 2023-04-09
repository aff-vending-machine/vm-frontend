<!-- Profile -->
<script lang="ts">
  import Icon from '~/ui/components/elements/icons/Icon.svelte';
  import Dropdown from './Dropdown.svelte';

  let show = false;

  $: handleClick = () => {
    show = !show;
  };
</script>

<!-- HTML -->
<div class="flex justify-center">
  <div class="relative inline-block">
    <button class="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full" on:click={handleClick}>
      <Icon i="gear" class="h-full w-full fill-white" />
    </button>
    <Dropdown bind:show />
  </div>
</div>
