<!-- TableBody -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ColumnsType, showOnScreen } from '~/share/modules/tables';
  import TableBodyEmpty from './TableBodyEmpty.svelte';
  import TableRender from './TableRender.svelte';

  export let columns: ColumnsType;
  export let source: Record<string, any>[];

  const isEmpty = !source || source.length == 0;

  const dispatch = createEventDispatcher();
  const handleSelectEvent = (id: string, index: number) => () =>
    dispatch('select', { id, index, source: source[index] });
</script>

<!-- HTML -->
<tbody class="divide-y divide-gray-100 border-t border-gray-100">
  {#each source as data, row}
    <tr
      class="odd:bg-white even:bg-secondary-50 space-x-4 hover:bg-primary-100"
      on:click={handleSelectEvent(data[columns[0].dataIndex], row)}
    >
      {#each columns as column}
        <td class={`px-6 py-4 ${showOnScreen(column.show)}`}>
          <TableRender
            render={column.render ? column.render(data[column.dataIndex], row) : data[column.dataIndex]}
            data={data[column.dataIndex]}
            key={column.dataIndex}
            source={data}
            index={row}
            on:event
          />
        </td>
      {/each}
    </tr>
  {/each}
  {#if isEmpty}
    <TableBodyEmpty span={columns.length} />
  {/if}
</tbody>

<!-- style -->
<style lang="scss">
</style>
