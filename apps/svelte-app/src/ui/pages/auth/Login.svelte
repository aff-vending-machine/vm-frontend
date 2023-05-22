<!-- Login -->
<script lang="ts">
  import { navigate } from 'svelte-navigator';

  // core
  import type { AuthState, TokenData } from '@apps/core';
  import { provideAuthBloc } from '@apps/core';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { access } from '~/stores/access';

  // components
  // import Toggle from '~/ui/components/forms/toggles/Toggle.svelte';
  // import LoadingModal from '~/ui/components/overlays/modals/LoadingModal.svelte';

  const bloc = provideAuthBloc();
  const state = useBlocState<AuthState>(bloc);

  let username = '';
  let password = '';
  let remember = true;

  access.subscribe(token => {
    if (token) {
      navigate('/main', { replace: true });
    }
  });

  async function handleSubmit() {
    const status = await bloc.login(username, password, remember);

    if (status === 'success') {
      access.set($state.data as TokenData);
    }
  }
</script>

<!-- HTML -->
<section>
  <div
    class="relative flex items-center min-h-screen p-0 overflow-hidden bg-gradient-to-tr from-primary-900 to-primary-400"
  >
    <div class="container z-1 mx-auto">
      <div class="flex flex-col items-center justify-center mx-4">
        <div class="relative flex flex-col bg-white border shadow-2xl rounded-2xl w-full max-w-xl">
          <div class="p-8 pb-0 mb-0">
            <h4 class="font-bold">Sign In</h4>
            <p class="mb-0">Enter your username and password to sign in</p>
          </div>
          <div class="flex-auto p-6">
            <form id="login-form" on:submit|preventDefault={handleSubmit}>
              <div class="mb-4">
                <input
                  type="username"
                  placeholder="Username"
                  class="focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                  bind:value={username}
                  disabled={$state.status === 'loading'}
                />
              </div>
              <div class="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  class="focus:shadow-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                  bind:value={password}
                  disabled={$state.status === 'loading'}
                />
              </div>
              <div class="flex items-center text-left">
                <!-- <Toggle
                  id="remember-me"
                  bind:checked={remember}
                  disabled={$state.status === 'loading'}
                  text="Remember me"
                /> -->
              </div>
              <div class="text-center">
                {#if $state.status === 'loading'}
                  <button
                    type="button"
                    class="inline-block w-full align-middle
                    px-16 py-3.5 mt-6 mb-0 
                    font-bold text-center text-sm text-white leading-normal tracking-wide 
                    bg-primary-500 border-0 shadow-md rounded-lg cursor-pointer 
                    transition-all ease-in 
                    hover:-translate-y-px hover:shadow-sm
                    active:opacity-85"
                  >
                    Sign in
                  </button>
                {:else}
                  <button
                    type="submit"
                    class="inline-block w-full align-middle
                    px-16 py-3.5 mt-6 mb-0 
                    font-bold text-center text-sm text-white leading-normal tracking-wide 
                    bg-primary-500 border-0 shadow-md rounded-lg cursor-pointer 
                    transition-all ease-in 
                    hover:-translate-y-px hover:shadow-sm
                    active:opacity-85"
                  >
                    Sign in
                  </button>
                {/if}
              </div>
            </form>
            <div class="mt-4 text-center">
              {#if $state.status === 'failure'}
                <p class="text-sm text-danger-500">{$state.error?.message || ''}</p>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{#if $state.status === 'loading'}
  <!-- <LoadingModal /> -->
{/if}

<!-- style -->
<style lang="scss">
</style>
