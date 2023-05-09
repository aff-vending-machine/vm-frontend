<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ColumnsType } from '~/types/table';
  import Icon from '~/components/common/icons/Icon.svelte';

  export let data: any[];
  export let columns: ColumnsType[];
  export let columnWidths: Record<string, number> = {};
  export let action: boolean = false;
  export let hasView: boolean = true;
  export let hasEdit: boolean = true;
  export let hasDelete: boolean = true;

  const dispatch = createEventDispatcher();

  const handleActionClick = (type: string, data: any, index: number) => {
    dispatch(type, { data, index });
  };
</script>

<tbody class="border-t border-gray-100 divide-y divide-gray-200">
  {#each data as row, i}
    <tr
      class="odd:bg-white even:bg-secondary-50 space-x-4 hover:bg-primary-100 cursor-pointer"
      on:click={() => handleActionClick('row-click', row, i)}
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

      {#if action}
        <td class="p-2">
          <div class="flex justify-center space-x-4">
            {#if hasView}
              <button on:click={() => handleActionClick('view', row, i)} class="focus:outline-none">
                <Icon class="w-4 h-4 fill-gray-500 hover:fill-green-500" i="ic-view" />
              </button>
            {/if}
            {#if hasEdit}
              <button on:click={() => handleActionClick('edit', row, i)} class="focus:outline-none">
                <Icon class="w-4 h-4 fill-gray-500 hover:fill-green-500" i="ic-edit" />
              </button>
            {/if}
            {#if hasDelete}
              <button on:click={() => handleActionClick('delete', row, i)} class="focus:outline-none">
                <Icon class="w-4 h-4 fill-gray-500 hover:fill-red-500" i="ic-delete" />
              </button>
            {/if}
          </div>
        </td>
      {/if}
    </tr>
  {/each}
  {#if data.length === 0}
    <tr class="bg-white">
      <td colspan={columns.length} class="py-16 text-center font-semibold italic text-2xl text-gray-400">
        ~ empty data ~
      </td>
    </tr>
  {/if}
</tbody>

<style>
</style>
