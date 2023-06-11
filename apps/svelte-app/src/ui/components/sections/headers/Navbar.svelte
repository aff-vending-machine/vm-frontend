<!-- Navbar -->
<script lang="ts">
  import { LogOut } from 'lucide-svelte';
  import { navigate } from 'svelte-navigator';

  import { LOGOUT } from '~/utils/constants/links';
  import LanguageSwitcher from '~/ui/components/elements/switchers/LanguageSwitcher.svelte';
  import Burger from '~/ui/components/elements/icons/Burger.svelte';
  import { access } from '~/stores/access';

  export let active = false;

  function handleClick() {
    active = !active;
  }

  function handleLogoutClick() {
    navigate(LOGOUT);
  }
</script>

<!-- HTML -->
<ul class="flex space-x-4 list-none md-max:w-full">
  <li class="flex items-center 2xl:hidden">
    <Burger bind:active on:click={handleClick} />
  </li>
  <li class="flex items-center pr-4">
    <span class="text-white mx-2">{$access.name}</span>
    <LanguageSwitcher />
    <button class="p-2 cursor-pointer" on:click={handleLogoutClick}>
      <LogOut color="white" />
    </button>
  </li>
</ul>

<!-- style -->
<style lang="scss">
</style>
