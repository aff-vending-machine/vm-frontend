<script lang="ts">
  import { onMount } from 'svelte';
  import { ColumnType } from '~/utils/types/table';
  import TableHeader from './TableHeader.svelte';
  import TableBody from './TableBody.svelte';

  export let columns: ColumnType[];
  export let source: any[];

  let tableWidth: number = 0;
  let columnWidths: Record<string, number> = {};

  const handleResize = (event: CustomEvent) => {
    const { column, width } = event.detail;
    columnWidths = { ...columnWidths, [column.key]: width };
  };

  onMount(() => {
    const table = document.querySelector('table');
    if (table) {
      tableWidth = table.offsetWidth;
      columnWidths = columns.reduce((acc, value) => {
        acc[value.key] = tableWidth / columns.length;
        return acc;
      }, {});
    }
  });
</script>

<table class="w-full border-collapse bg-white text-gray-500 font-mono select-none">
  <TableHeader {columns} {columnWidths} on:sort on:resize={handleResize} />
  <TableBody {columns} {columnWidths} {source} on:select on:action />
  <slot />
</table>

<style>

</style>
