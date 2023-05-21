<!-- Navbar -->
<script lang="ts">
  import LanguageSwitcher from '~/ui/components/elements/switchers/LanguageSwitcher.svelte';
  import Burger from '~/ui/components/elements/icons/Burger.svelte';

  export let active = false;
</script>

<!-- HTML -->
<ul class="flex space-x-4 list-none md-max:w-full">
  <li class="flex items-center 2xl:hidden">
    <Burger
      bind:active
      on:click={() => {
        active = !active;
      }}
    />
  </li>
  <li class="flex items-center pr-4">
    <LanguageSwitcher />
  </li>
</ul>

<!-- style -->
<style lang="scss">
</style>
