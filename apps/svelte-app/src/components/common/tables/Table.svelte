<script lang="ts">
  import { onMount } from 'svelte';
  import { ColumnsType } from '~/types/table';
  import TableHeader from './TableHeader.svelte';
  import TableBody from './TableBody.svelte';
  import TableAction from './TableAction.svelte';

  export let data: any[];
  export let columns: ColumnsType[];
  export let action: boolean = false;

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

<table class="min-w-full border-collapse bg-white">
  <thead class="sticky top-0 bg-gray-50 z-1">
    <tr>
      {#each columns as column}
        <TableHeader {column} width={columnWidths[column.key] ?? 100} on:resize={handleResize} />
      {/each}
      {#if action}
        <TableAction width={160} />
      {/if}
    </tr>
  </thead>
  <TableBody {data} {columns} {columnWidths} {action} on:row-click on:view on:edit on:delete />
  <slot />
</table>

<style>
</style>
