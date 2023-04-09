<!-- Navbar -->
<script lang="ts">
  import Burger from '~/ui/components/elements/icons/Burger.svelte';
  import Profile from '~/ui/components/navigations/profiles/Profile.svelte';

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
    <Profile />
  </li>
  <!-- <li class="flex items-center">
    <button class="flex h-6 w-6 items-center justify-center" on:click>
      <Icon i="gear" class="h-full w-full fill-white" />
    </button>
  </li> -->
</ul>

<!-- style -->
<style lang="scss">
</style>
