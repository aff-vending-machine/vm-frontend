<!-- Slot -->
<script lang="ts">
  export let title: string;
  export let desc: string = "";
</script>

<!-- HTML -->
<div class="flex flex-col space-y-2">
  <span class="text-xs font-semibold">{title}</span>
  <slot />
  <span class="text-xs">{desc}</span>
</div>

<!-- style -->
<style lang="scss">
</style>
