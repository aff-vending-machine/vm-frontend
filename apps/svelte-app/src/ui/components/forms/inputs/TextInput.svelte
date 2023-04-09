<!-- TextInput -->
<script lang="ts">
  export let name: string;
  export let maxlength: number = 64;
  export let value: string;
  export let disabled: boolean = false;
</script>

<!-- HTML -->
<input
  class="block w-full rounded-md border-gray-300 text-xs shadow-sm 
  focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 
  disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
  type="text"
  {name}
  {maxlength}
  {disabled}
  bind:value
/>

<!-- style -->
<style lang="scss">
</style>
