<!-- TableHeader -->
<script lang="ts">
  import { ColumnsType, showOnScreen, SortsType } from '~/share/modules/tables';
  import Sort from '~/ui/components/lists/tables/Sort.svelte';

  export let columns: ColumnsType = [];
  export let sorts: SortsType = {};
</script>

<!-- HTML -->
<thead class="bg-gray-50">
  <tr>
    {#each columns as column}
      <th scope="col" class={`p-4 font-medium text-gray-900 ${showOnScreen(column.show)}`}>
        <span class="inline-flex w-full flex-nowrap justify-between">
          {column.title}
          {#if column.sort}
            <Sort field={column.sort} sort={sorts[column.sort]} on:sort />
          {/if}
        </span>
      </th>
    {/each}
  </tr>
</thead>

<!-- style -->
<style lang="scss">
</style>
