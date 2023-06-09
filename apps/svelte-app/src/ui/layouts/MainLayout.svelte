<!-- Main -->
<script lang="ts">
  import { SvelteComponentDev } from 'svelte/internal';

  // core
  import notification from '~/stores/notification';
  import { sidebar } from '~/utils/types/sidebar';

  // components
  import Notification from '~/ui/components/overlays/notifications/Notification.svelte';
  import Sidebar from '~/ui/components/sections/sidebars/Sidebar.svelte';
  import Header from '~/ui/components/sections/headers/Header.svelte';
  import Footer from '~/ui/components/sections/footers/Footer.svelte';

  export let Component: SvelteComponentDev;

  let active = false;
  let params = { ...$$props };
  delete params['Component'];

  function handleClose() {
    active = false;
  }
</script>

<!-- HTML -->
<div class="flex min-h-screen flex-col">
  <header class="bg-primary-500 p-4">
    <div class="2xl:ml-72">
      <Header bind:active />
    </div>
  </header>
  <div class="flex flex-1 flex-row">
    <div class="bg-primary-500 h-48 w-full absolute -z-10" />
    <main class="flex-1 p-4 2xl:ml-72 mt-4 w-0">
      <slot />
      <svelte:component this={Component.default} {...params} />
    </main>
    {#if active}
      <div class="bg-gray-500 top-0 opacity-50 h-full w-full absolute z-10 2xl:w-0 2xl:h-0" />
    {/if}
    <aside
      class="aside fixed inset-y-0 z-50 my-4 p-0 block w-full max-w-[16rem] 
              flex-wrap items-center justify-between overflow-y-auto 
              rounded-2xl border-0 bg-white antialiased shadow-xl
              transition-transform duration-200 -translate-x-full 
              2xl:left-0 2xl:ml-6 2xl:translate-x-0"
      class:active
    >
      <Sidebar title="Vending Machine" list={sidebar} on:close={handleClose} />
    </aside>
  </div>
  <footer class="p-4 shadow">
    <div class="2xl:ml-72">
      <Footer />
    </div>
  </footer>
</div>

<!-- Display notifications -->
<div class="notification-container fixed top-4 right-4 z-50">
  {#each $notification as { id, type, message }}
    <Notification {type} {message} on:remove={() => notification.remove(id)} />
  {/each}
</div>

<!-- style -->
<style>
  .aside.active {
    left: 0px;
    margin-left: 1.5rem /* 24px */;
    --tw-translate-x: 0px;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
      skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .notification-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
