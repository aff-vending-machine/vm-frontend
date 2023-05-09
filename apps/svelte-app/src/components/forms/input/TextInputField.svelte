<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: string;
  export let error: string = null;
</script>

<div>
  <label for={id} class="block mb-1">{label}:</label>
  <input type="text" {id} name={id} bind:value on:input on:change class="w-full p-2 border rounded" />
  {#if error}
    <p class="text-red-500 text-sm">{error}</p>
  {/if}
</div>
