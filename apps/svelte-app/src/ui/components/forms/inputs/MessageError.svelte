<!-- MessageError -->
<script lang="ts">
  export let hasError = false;
  export let message: string;
</script>

<!-- HTML -->
{#if hasError}
  <p class="mt-1 text-xs text-danger-500">{message}</p>
{/if}

<!-- style -->
<style lang="scss">
</style>
