<script lang="ts">
  import { SelectOptionsType } from '~/types/options';

  export let id: string;
  export let label: string;
  export let value: any;
  export let error: string = null;
  export let options: SelectOptionsType[];
  export let placeholder = 'Select an option';
</script>

<div>
  <label for={id} class="block mb-1">{label}:</label>
  <select {id} name={id} bind:value on:input on:change class="w-full min-w-[160px] p-2 border rounded">
    <option value="" disabled>{placeholder}</option>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  {#if error}
    <p class="text-red-500 text-sm">{error}</p>
  {/if}
</div>
