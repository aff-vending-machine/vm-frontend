<!-- Burger -->
<script lang="ts">
  export let active = false;
</script>

<!-- HTML -->
<button class="shelf w-6 h-6" class:active type="button" on:click>
  <div class="relative w-full -mt-0.5">
    <span class="bar -top-2 left-0" />
    <span class="bar left-0" />
    <span class="bar top-2 left-0" />
  </div>
</button>

<!-- style -->
<style lang="scss">
  .bar {
    @apply absolute block h-[3px] w-full origin-right bg-white transition-all;
  }

  .shelf.active .bar:nth-child(1) {
    @apply scale-x-50;
  }

  .shelf.active .bar:nth-child(3) {
    @apply scale-x-75;
  }

  .shelf.active span.bar {
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
</style>
