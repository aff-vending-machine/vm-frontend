<!-- Table -->
<script lang="ts">
  import { ColumnsType, SortsType } from '~/share/modules/tables';
  import TableBody from './TableBody.svelte';
  import TableHeader from './TableHeader.svelte';

  export let columns: ColumnsType;
  export let sorts: SortsType = {};
  export let source: any[];
</script>

<!-- HTML -->
<table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
  <TableHeader {columns} {sorts} on:sort />
  <TableBody {columns} {source} on:select on:event />
</table>

<!-- style -->
<style lang="scss">
</style>
