<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: number;
  export let error: string = null;
</script>

<div>
  <label for={id} class="block mb-1 text-sm font-medium">{label}:</label>
  <input
    type="number"
    {id}
    name={id}
    bind:value
    on:input
    on:change
    class="w-full min-w-[160px] px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded"
  />
  {#if error}
    <p class="text-red-500 text-sm m-2">{error}</p>
  {/if}
</div>
