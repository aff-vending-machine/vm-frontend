<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ColumnsType } from '~/types/table';

  export let data: any[];
  export let columns: ColumnsType[];
  export let columnWidths: Record<string, number> = {};

  const dispatch = createEventDispatcher();

  const handleRowClick = (row: any, index: number) => {
    dispatch('row-click', { data: row, index });
  };
</script>

<tbody class="border-t border-gray-100 divide-y divide-gray-200">
  {#each data as row, i}
    <tr
      class="odd:bg-white even:bg-secondary-50 space-x-4 hover:bg-primary-100 cursor-pointer"
      on:click={_ => handleRowClick(row, i)}
    >
      {#each columns as column}
        <td class="px-6 py-4 whitespace-nowrap text-sm" style="width: {columnWidths[column.key] ?? 100}px;">
          {#if column.image}
            <img src={row[column.key]} alt={row[column.key]} class="w-16 h-auto" />
          {:else}
            {row[column.key]}
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
  {#if data.length === 0}
    <tr class="bg-white">
      <td colspan={columns.length} class="py-16 text-center font-semibold italic text-2xl text-gray-400">~ empty data ~</td>
    </tr>
  {/if}
</tbody>

<style>
</style>
