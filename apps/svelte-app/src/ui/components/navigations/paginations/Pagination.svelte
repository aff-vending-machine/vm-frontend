<!-- Pagination -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { derived, Readable, writable, Writable } from 'svelte/store';
  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import { _ } from 'svelte-i18n';

  export let page = 1;
  export let itemsPerPage: number;
  export let totalItems: number;
  export let maxVisiblePages = 3;

  let currentPage: Writable<number> = writable(page);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const dispatch = createEventDispatcher();

  const setPage = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      currentPage.set(p);
      page = p;
      dispatch('page-change', { page });
    }
  };

  interface PaginationButton {
    type: 'page' | 'ellipsis';
    value?: number;
  }

  const paginationButtons: Readable<PaginationButton[]> = derived([currentPage], ([currentPage]) => {
    const buttons: PaginationButton[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(currentPage - i) <= Math.floor(maxVisiblePages / 2)) {
        buttons.push({ type: 'page', value: i });
      } else if (
        i === currentPage - Math.floor(maxVisiblePages / 2) - 1 ||
        i === currentPage + Math.floor(maxVisiblePages / 2) + 1
      ) {
        buttons.push({ type: 'ellipsis' });
      }
    }
    return buttons;
  });

  function handlePrevious() {
    setPage($currentPage - 1);
  }

  function handleNext() {
    setPage($currentPage + 1);
  }
</script>

<div class="flex items-center justify-between mt-4">
  <p class="text-sm text-gray-700">
    {$_('pagination.message', {
      values: {
        begin: ($currentPage - 1) * itemsPerPage + 1,
        end: Math.min($currentPage * itemsPerPage, totalItems),
        total: totalItems,
      },
    })}
  </p>
  <nav class="flex items-center">
    <Button class="w-24" on:click={handlePrevious} disabled={$currentPage === 1}>
      {$_('pagination.previous')}
    </Button>
    <div class="mx-2 flex flex-wrap gap-1">
      {#each $paginationButtons as button}
        {#if button.type === 'page'}
          <button
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300"
            class:active:bg-primary-200={$currentPage === button.value}
            class:bg-red-200={$currentPage === button.value}
            on:click={() => setPage(button.value)}
          >
            {button.value}
          </button>
        {:else}
          <span class="px-2 py-1 text-sm font-medium text-gray-500">...</span>
        {/if}
      {/each}
    </div>
    <Button class="w-24" on:click={handleNext} disabled={$currentPage === totalPages}>
      {$_('pagination.next')}
    </Button>
  </nav>
</div>
