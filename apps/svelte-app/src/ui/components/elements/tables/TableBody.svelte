<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ColumnType } from '~/utils/types/table';
  import TableRender from './TableRender.svelte';
  import TableBodyEmpty from './TableBodyEmpty.svelte';

  export let columns: ColumnType[];
  export let columnWidths: Record<string, number>;
  export let source: Record<string, any>[];

  const dispatch = createEventDispatcher();

  const getValue = (key?: string, value?: any) => {
    let data = { ...value };
    key?.split('.').forEach(key => {
      try {
        data = data[key];
      } catch (e) {
        return '-';
      }
    });

    return data;
  };
</script>

<tbody class="border-t border-gray-100 divide-y divide-gray-200">
  {#if !!source && source.length > 0}
    {#each source as data, index}
      <tr
        class="odd:bg-white even:bg-secondary-50 space-x-4 hover:bg-primary-100 cursor-pointer"
        on:click={() => dispatch('select', { index, data })}
      >
        {#each columns as column}
          <td class="px-6 py-4 whitespace-nowrap text-sm" style="width: {columnWidths[column.key] ?? 100}px;">
            <TableRender
              key={column.index}
              type={column.type}
              source={data}
              value={column.render ? column.render(index, data) : getValue(column.index, data)}
              on:action
            />
          </td>
        {/each}
      </tr>
    {/each}
  {:else}
    <TableBodyEmpty span={columns.length} />
  {/if}
</tbody>

<style>
</style>
