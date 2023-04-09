<!-- TableLoader -->
<script lang="ts">
</script>

<!-- HTML -->
<div class="p-4 divide-y divide-gray-200 rounded animate-pulse md:p-6">
  {#each [...Array(10).keys()] as _}
    <div class="flex items-center justify-between py-4 even:bg-secondary-50">
      <div class="h-2.5 bg-gray-300 rounded-full w-8" />
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5" />
        <div class="w-32 h-2 bg-gray-200 rounded-full" />
      </div>
      <div class="h-2.5 bg-gray-300 rounded-full w-24" />
      <div class="h-2.5 bg-gray-200 rounded-full w-32" />
      <div class="h-2.5 bg-gray-300 rounded-full w-16" />
    </div>
  {/each}
  <span class="sr-only">Loading...</span>
</div>

<!-- style -->
<style lang="scss">
</style>
