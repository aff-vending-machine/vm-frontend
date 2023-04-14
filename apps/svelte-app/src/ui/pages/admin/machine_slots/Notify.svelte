<!-- Notify -->
<script lang="ts">
  // core
  import { notification } from '~/share/stores';

  // components
  import Alert from '~/ui/components/feedbacks/alerts/Alert.svelte';
</script>

<!-- HTML -->
{#if $notification.enable}
  <Alert
    type={$notification.type}
    title={$notification.title}
    message={$notification.msg}
    bind:show={$notification.enable}
  />
{/if}

<!-- style -->
<style lang="scss">
</style>
