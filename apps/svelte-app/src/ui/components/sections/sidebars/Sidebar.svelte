<!-- Sidebar -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { SidebarItemType } from '~/utils/types/sidebar';

  // components
  import Icon from '~/ui/components/elements/icons/Icon.svelte';
  import Navbar from './Navbar.svelte';

  export let title: string;
  export let list: SidebarItemType[];

  const dispatch = createEventDispatcher();
  const handleClose = () => dispatch('close');
</script>

<!-- HTML -->
<div class="mx-auto max-w-md">
  <button class="float-right p-4 xl:hidden" on:click={handleClose}>
    <Icon i="close" class="w-4 h-4 fill-gray-500 hover:fill-danger-500" />
  </button>
  <div class="flex h-20 max-w-md items-center justify-center">
    <h3 class="text-xl font-bold outline-none">{title}</h3>
  </div>
  <Navbar {list} />
</div>

<!-- style -->
<style lang="scss">
</style>
