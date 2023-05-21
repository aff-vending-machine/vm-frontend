<script lang="ts">
  import DateTimePicker from '../datetime/DateTimePicker.svelte';

  export let id: string;
  export let label: string;
  export let value: Date;
  export let rangeFrom: Date = null;
  export let rangeTo: Date = null;
  export let error: string = null;
</script>

<div>
  <label for={id} class="block mb-1 text-sm font-medium">{label}:</label>
  <DateTimePicker {id} {rangeFrom} {rangeTo} bind:value on:change on:input />
  {#if error}
    <p class="text-red-500 text-sm m-2">{error}</p>
  {/if}
</div>
