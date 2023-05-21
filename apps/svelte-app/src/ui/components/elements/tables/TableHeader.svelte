<script lang="ts">
  import { ColumnType } from '~/utils/types/table';
  import TableHeaderField from './TableHeaderField.svelte';

  export let columns: ColumnType[];
  export let columnWidths: Record<string, number>;
</script>

<thead class="sticky top-0 bg-gray-50 z-1">
  <tr>
    {#each columns as column}
      <TableHeaderField {column} width={columnWidths[column.key] ?? 100} on:sort on:resize />
    {/each}
  </tr>
</thead>

<style>
</style>
