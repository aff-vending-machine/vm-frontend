<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ColumnsType } from '~/types/table';

  export let data: any[];
  export let columns: ColumnsType[];
  export let columnWidths: Record<string, number> = {};

  const dispatch = createEventDispatcher();

  const handleRowClick = (row: any) => {
    dispatch('row-click', { row });
  };
</script>

<tbody class="border-t border-gray-100 divide-y divide-gray-200">
  {#each data as row}
    <tr
      class="odd:bg-white even:bg-secondary-50 space-x-4 hover:bg-primary-100 cursor-pointer"
      on:click={_ => handleRowClick(row)}
    >
      {#each columns as column}
        <td class="px-6 py-4 whitespace-nowrap" style="width: {columnWidths[column.key] ?? 100}px;">{row[column.key]}</td>
      {/each}
    </tr>
  {/each}
  {#if data.length === 0}
    <tr class="bg-white">
      <td colspan={columns.length} class="py-8 text-center font-semibold text-xl">Empty</td>
    </tr>
  {/if}
</tbody>

<style>
</style>
