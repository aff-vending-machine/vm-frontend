<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ColumnSortType, ColumnType } from '~/utils/types/table';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  export let column: ColumnType;
  export let width: number;

  let sort: ColumnSortType = { key: null, direction: 'asc' };

  const dispatch = createEventDispatcher();
  let startX: number;
  let startWidth: number;

  const toggleSort = (column: ColumnType) => {
    if (!column.sortable) {
      return;
    }

    if (sort.key === column.key) {
      sort.direction = sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      sort.key = column.key;
      sort.direction = 'asc';
    }

    const sortEvent = new CustomEvent('sort', {
      detail: {
        column: sort.key,
        direction: sort.direction,
      },
    });

    dispatchEvent(sortEvent);
  };

  const handleMouseDown = (event: MouseEvent) => {
    startX = event.clientX;
    startWidth = width;
    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const delta = event.clientX - startX;
    width = startWidth + delta;
    dispatch('resize', { column, width: width });
  };

  const handleMouseUp = () => {
    startX = 0;
    startWidth = 0;
    document.body.removeEventListener('mousemove', handleMouseMove);
    document.body.removeEventListener('mouseup', handleMouseUp);
  };

  $: {
    // Limit minimum width to prevent negative values
    if (width < 50) {
      width = 50;
    }
  }
</script>

<th
  scope="col"
  class="sticky top-0 p-4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
  style="width: {width}px;"
  class:selected={column.key === sort.key}
  on:click={() => toggleSort(column)}
>
  <div class="flex justify-between select-none">
    <span class="font-medium text-gray-900">{column.title}</span>
    {#if column.resizable}
      {#if column.key === sort.key}
        {#if sort.direction === 'asc'}
          <Icon class="w-3 h-3 fill-gray-400" i="sort-down" />
        {:else}
          <Icon class="w-3 h-3 fill-gray-400" i="sort-up" />
        {/if}
      {:else if column.sortable}
        <Icon class="w-3 h-3 fill-gray-400" i="sort" />
      {/if}
    {/if}
  </div>
  {#if column.resizable}
    <div
      class="absolute top-0 bottom-0 cursor-col-resize border-l-2 border-gray-200 w-2 -right-1"
      on:mousedown|stopPropagation={handleMouseDown}
    />
  {/if}
</th>

<style>
</style>
