<!-- Home -->
<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';
  import { _ } from 'svelte-i18n';

  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  let timeoutId: number;

  onMount(() => {
    timeoutId = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 1000); // 1-second delay
  });

  onDestroy(() => {
    clearTimeout(timeoutId);
  });
</script>

<!-- HTML -->
<section class="m-16 flex h-screen flex-col pt-8">
  <Icon i="spinner" class="animate-spin h-5 w-5 mr-3 fill-white" />
  <p>{$_('home.loading')}</p>
</section>

<!-- style -->
<style lang="scss">
</style>
