<script lang="ts">
  import { SvelteComponent, onMount } from 'svelte';
  import { Router, Route, navigate } from 'svelte-navigator';
  import type { AuthState } from '@apps/core';
  import { provideAuthBloc } from '@apps/core';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { access } from '~/stores/access';
  import Redirect from './Redirect.svelte';
  import routes from './routes';

  const bloc = provideAuthBloc();
  const state = useBlocState<AuthState>(bloc);

  onMount(async () => {
    try {
      await bloc.authenticated();

      if ($state.kind === 'load-success') {
        access.set($state.data);
      }
    } catch (e) {
      console.log(e);
    }

    if (!$access) {
      navigate('/login', { replace: true });
    }
  });
</script>

<Router>
  {#each routes as { path, component, layout: Layout, requiresAuth = false, redirect = false }}
    {#if requiresAuth && $access}
      <Route {path}>
        <Layout Component={component} />
      </Route>
    {:else}
      <Route {path}>
        {#if redirect}
          <Redirect to={redirect} />
        {:else}
        <Layout Component={component} />
        {/if}
      </Route>
    {/if}
  {/each}
</Router>
