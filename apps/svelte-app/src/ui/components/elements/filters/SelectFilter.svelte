<!-- SelectFilter -->
<script lang="ts">
  import Select from '~/ui/components/forms/selects/Select.svelte';
  import Slot from '../../../pages/admin/transactions/filters/Slot.svelte';

  export let title: string;
  export let desc: string = "";
  export let value: any;
  export let options: Options;
</script>

<!-- HTML -->
<div class="flex flex-col space-y-2">
  <span class="text-xs font-semibold">{title}</span>
  <Select bind:value {options} on:change />
  <span class="text-xs">{desc}</span>
</div>

<!-- style -->
<style lang="scss">
</style>
