<!-- TableBodyEmpty -->
<script lang="ts">
  import { _ } from 'svelte-i18n';
  
  export let span: number;
</script>

<!-- HTML -->
<tr class="bg-white">
  <td colspan={span} class="py-16 text-center font-semibold italic text-2xl text-gray-400">{$_('table.no-data')}</td>
</tr>

<!-- style -->
<style lang="scss">
</style>
