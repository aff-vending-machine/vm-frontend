<!-- Navbar -->
<script lang="ts">
  import { access } from '~/stores/access';
  import NavbarItem from './NavbarItem.svelte';
  import { requestRole } from '~/utils/helpers/role';
  import { SidebarItemType } from '~/utils/types/sidebar';

  export let list: SidebarItemType[];
</script>

<!-- HTML -->
<ul class="flex flex-col pl-0 mb-0">
  {#each list as item}
    {#if requestRole($access?.role, item.role)}
      <li class="mt-0.5 w-full">
        <NavbarItem title={item.title} icon={item.icon} href={item.link} />
      </li>
    {/if}
  {/each}
</ul>

<!-- style -->
<style lang="scss">
</style>
