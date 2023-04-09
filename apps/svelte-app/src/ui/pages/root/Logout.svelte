<!-- Logout -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';

  // core
  import { provideAuthBloc } from '@apps/core';

  const bloc = provideAuthBloc();

  onMount(async () => {
    await bloc.logout();
    setTimeout(() => navigate('/', { replace: true }), 3000);
  });
</script>

<!-- HTML -->
<section class="m-16 flex h-screen flex-col pt-8">
  <p>Logging out...</p>
</section>

<!-- style -->
<style lang="scss">
</style>
