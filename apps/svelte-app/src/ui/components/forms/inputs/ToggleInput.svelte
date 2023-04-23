<!-- ToggleInput -->
<script lang="ts">
  export let name: string;
  export let value: boolean;
  export let disabled = false;
</script>

<!-- HTML -->
<div class={$$props.class}>
  <label for={name} class="relative inline-flex cursor-pointer items-center">
    <input type="checkbox" id={name} class="peer sr-only" bind:checked={value} {disabled} on:change />
    <div
      class="h-6 w-10 rounded-full bg-gray-300 
    after:absolute after:top-1 after:left-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] 
    hover:bg-gray-400 
    peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white
    peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"
    />
  </label>
</div>

<!-- style -->
<style lang="scss">
</style>
