<!-- Navbar -->
<script lang="ts">
  import { SidebarItemType } from '~/share/modules/navbars';
  import { access } from '~/share/stores';
  import { getRoleLevel } from '~/share/utils/role';
  import NavbarItem from './NavbarItem.svelte';

  export let list: SidebarItemType[];
</script>

<!-- HTML -->
<ul class="flex flex-col pl-0 mb-0">
  {#each list as item}
    {#if $access != null && getRoleLevel(item.role) <= getRoleLevel($access.role)}
      <li class="mt-0.5 w-full">
        <NavbarItem title={item.title} icon={item.icon} href={item.link} />
      </li>
    {/if}
  {/each}
</ul>

<!-- style -->
<style lang="scss">
</style>
