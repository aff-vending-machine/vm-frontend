<!-- Header -->
<script lang="ts">
  import Breadcrumb from '~/ui/components/navigations/breadcrumbs/Breadcrumb.svelte';
  // import SearchInput from '~/ui/components/forms/inputs/SearchInput.svelte';
  import Navbar from './Navbar.svelte';

  export let active: boolean;
  // export let text = '';
</script>

<!-- HTML -->
<div class="flex flex-row justify-between space-x-2">
  <Breadcrumb path={location.pathname} />
  <div class="flex justify-between space-x-8">
    <!-- <SearchInput bind:value={text} /> -->
    <Navbar bind:active />
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
