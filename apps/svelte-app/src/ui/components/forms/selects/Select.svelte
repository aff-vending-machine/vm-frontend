<!-- Select -->
<script lang="ts">
  export let value: any;
  export let options: { name: string; value: any }[];
  export let placeholder: string = undefined;
  export let disabled = false;
</script>

<!-- HTML -->
<select
  class="block w-full rounded-md border-gray-300 text-xs shadow-sm 
  focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 
  disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
  bind:value
  {disabled}
  on:change
>
  {#if placeholder != undefined}
    <option selected value="">{placeholder}</option>
  {/if}
  {#each options as option}
    <option value={option.value} selected={value == option.value}>
      {option.name}
    </option>
  {/each}
</select>

<!-- style -->
<style lang="scss">
</style>
