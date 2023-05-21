<!-- Logout -->
<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';

  // core
  import { provideAuthBloc } from '@apps/core';

  const bloc = provideAuthBloc();
  let timeoutId: number;

  onMount(async () => {
    await bloc.logout();
    timeoutId = setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000); // 3-second delay
  });

  onDestroy(() => {
    clearTimeout(timeoutId);
  });
</script>

<!-- HTML -->
<section class="m-16 flex h-screen flex-col pt-8">
  <p>Logging out...</p>
</section>

<!-- style -->
<style lang="scss">
</style>
