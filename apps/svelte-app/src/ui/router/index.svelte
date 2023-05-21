<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route, navigate } from 'svelte-navigator';

  import type { AuthState, TokenData } from '@apps/core';
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

      if ($state.status === 'success') {
        access.set($state.data as TokenData);
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
      <Route {path} primary={false} let:params>
        {#await component then Component}
          <Layout {Component} {...params} />
        {/await}
      </Route>
    {:else}
      <Route {path} primary={false} let:params>
        {#if redirect}
          <Redirect to={redirect} />
        {:else if !requiresAuth}
          {#await component then Component}
            <Layout {Component} {...params} />
          {/await}
        {/if}
      </Route>
    {/if}
  {/each}
</Router>
