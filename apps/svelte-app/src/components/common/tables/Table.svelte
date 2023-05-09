<script lang="ts">
  import { onMount } from 'svelte';

  import TableHeader from './TableHeader.svelte';
  import TableBody from './TableBody.svelte';
  import { ColumnsType } from '~/types/table';

  export let data: any[];
  export let columns: ColumnsType[];
  let tableWidth: number = 0;
  let columnWidths: Record<string, number> = {};

  const handleResize = (event: CustomEvent) => {
    const { column, width } = event.detail;
    columnWidths = { ...columnWidths, [column]: width };
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

<table class="min-w-full border-collapse bg-white">
  <thead class="sticky top-0 bg-gray-50 z-1">
    <tr>
      {#each columns as column, i}
        <TableHeader
          {column}
          width={columnWidths[column.key] ?? 100}
          resizable={i + 1 < columns.length}
          on:resize={handleResize}
        />
      {/each}
    </tr>
  </thead>
  <TableBody {data} {columns} {columnWidths} on:row-click />
  <slot />
</table>

<style>
</style>
