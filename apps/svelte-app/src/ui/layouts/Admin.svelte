<!-- Admin -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate, Route, Router } from 'svelte-navigator';

  // core
  import type { AuthState } from '@apps/core';
  import { provideAuthBloc } from '@apps/core';
  import { access } from '~/share/stores';
  import { sidebar } from '~/share/modules/navbars';
  import { useBlocState } from '~/share/hooks/useBlocState';

  // pages
  import Admin from '~/ui/pages/admin/Admin.svelte';
  import MachineView from '~/ui/pages/admin/machines/View.svelte';
  import MachineSlotView from '~/ui/pages/admin/machine_slots/View.svelte';
  import ReportView from '~/ui/pages/admin/reports/View.svelte';
  import UserView from '~/ui/pages/admin/users/View.svelte';
  import RoleView from '~/ui/pages/admin/roles/View.svelte';

  // components
  import Sidebar from '~/ui/components/sections/sidebars/Sidebar.svelte';
  import Header from '~/ui/components/sections/headers/Header.svelte';
  import Footer from '~/ui/components/sections/footers/Footer.svelte';

  const bloc = provideAuthBloc();
  const state = useBlocState<AuthState>(bloc);

  let active = false;

  onMount(async () => {
    try {
      await bloc.authenticated();

      switch ($state.kind) {
        case 'load-success':
          access.set($state.data);
          break;

        case 'load-failure':
          console.log($state.error);
          navigate('/login', { replace: true });
          break;
      }
    } catch (e) {
      console.log(e);
      navigate('/login', { replace: true });
    }
  });

  $: handleCloseSidebar = () => {
    active = false;
  };
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
      <Router>
        <Route path="machines" component={MachineView} />
        <Route path="machines/:id/slots" let:params  ><MachineSlotView id={params.id} /></Route>
        <Route path="reports" component={ReportView} />
        <Route path="users" component={UserView} />
        <Route path="roles" component={RoleView} />
        <Route><Admin /></Route>
      </Router>
    </main>
    <aside
      class="aside z-50 my-4 p-0 block w-full max-w-[16rem] 
              flex-wrap items-center justify-between overflow-y-auto 
              rounded-2xl border-0 bg-white antialiased shadow-xl
              transition-transform duration-200 -translate-x-full 
              2xl:left-0 2xl:ml-6 2xl:translate-x-0"
      class:active
    >
      <Sidebar title="Vending Machine" list={sidebar} on:close={handleCloseSidebar} />
    </aside>
  </div>
  <footer class="p-4 shadow">
    <div class="2xl:ml-72">
      <Footer />
    </div>
  </footer>
</div>

<!-- style -->
<style lang="scss">
  .aside {
    @apply fixed inset-y-0;
  }
  .aside.active {
    @apply left-0 ml-6 translate-x-0;
  }
</style>
