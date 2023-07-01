<script lang="ts">
</script>

<div class="flex justify-between flex-col md:flex-row border rounded p-4 bg-secondary-50 space-y-4">
  <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
    <slot />
  </div>
  <div class="flex items-end align-bottom space-x-2">
    <slot name="right" />
  </div>
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
