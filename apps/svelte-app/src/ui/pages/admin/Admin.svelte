<!-- Admin -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';

  // components
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  onMount(() => {
    navigate('/admin/reports', { replace: true });
  });
</script>

<!-- HTML -->
<section class="m-16 flex h-screen flex-col pt-8">
  <Icon i="loading" class="animate-spin h-5 w-5 mr-3 fill-white" />
  <p>Loading</p>
</section>

<!-- style -->
<style lang="scss">
</style>
