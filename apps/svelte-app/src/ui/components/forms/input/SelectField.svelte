<script lang="ts">
  import { SelectOptionsType } from '~/utils/types/options';
  import { _ } from 'svelte-i18n';

  export let id: string;
  export let label: string;
  export let value: any;
  export let error: string = null;
  export let options: SelectOptionsType[];
  export let placeholder = $_('general.unseleted-options');
  export let unselected = false;
  export let disabled = false;
  export let hidden = false;
</script>

<div class="{$$props.class}{hidden ? ' hidden': ''}">
  <label for={id} class="block mb-1 text-sm font-medium">{label}:</label>
  <select
    {id}
    name={id}
    {disabled}
    bind:value
    on:change
    class="w-full min-w-[120px] px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded"
  >
    {#if unselected}
    <option value="">{placeholder}</option>
    {/if}
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  {#if error}
    <p class="text-red-500 text-sm m-2">{error}</p>
  {/if}
</div>
