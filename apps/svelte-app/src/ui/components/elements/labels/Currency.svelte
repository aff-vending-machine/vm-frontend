<!-- Currency.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let value: number;
  let formattedValue: string;

  export let amount = 0;

  // Function to format the value as currency
  function formatValue() {
    value = parseFloat(amount.toFixed(2));
    if (!Number.isNaN(value)) {
      formattedValue = value.toLocaleString('th-TH', {
        style: 'currency',
        currency: 'THB',
      });
    } else {
      formattedValue = '฿0.00';
    }
  }

  // Run the formatValue function on component mount and whenever the amount changes
  onMount(formatValue);
  $: formatValue();
</script>

<span class="float-right">{formattedValue}</span>
