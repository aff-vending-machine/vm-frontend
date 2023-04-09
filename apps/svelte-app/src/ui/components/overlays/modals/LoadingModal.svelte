<!-- LoadingModal -->
<script lang="ts">
  import Icon from '~/ui/components/elements/icons/Icon.svelte';
</script>

<!-- HTML -->
<div class="fixed inset-0 z-50 bg-white/50">
  <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
    <Icon i="loading" class="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary-600" />
    <span class="sr-only">Loading...</span>
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
