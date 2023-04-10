<!-- Pagination -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  export let page = 1;
  export let limit = 10;
  export let count = 0;
  let goto = 1;

  $: total = Math.ceil(count / limit);
  $: bound = (index: number) => index == 0 || (index == page && (page == 1 || page == total));

  const dispatch = createEventDispatcher();
  const handleGoToPage = () => {
    if (goto > total) {
      goto = total;
    }
    if (goto == 0) {
      goto = 1;
    }

    dispatch('change', { page: goto });
  };
  const handlePreviousPage = () => {
    dispatch('change', { page: page - 1 });
  };
  const handleNextPage = () => {
    dispatch('change', { page: page + 1 });
  };

  $: if (page > total) {
    goto = total;
    handleGoToPage();
  }
</script>

<!-- HTML -->
<nav class={$$props.class} aria-label="pagination">
  <div />
  <ul class="inline-flex items-center space-x-1 rounded-md text-sm">
    <li>
      <button
        class="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50 disabled:bg-slate-300"
        on:click={handlePreviousPage}
        disabled={bound(1)}
      >
        <Icon i="chevron-left" class="h-5 w-5 fill-slate-500" />
        <span>Previous</span>
      </button>
    </li>
    <li>
      <span class="inline-flex items-center rounded-md bg-white px-4 py-2 text-gray-500">
        Page <b class="mx-1">{page}</b> of <b class="ml-1">{total} </b>
      </span>
    </li>

    <li>
      <button
        class="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50 disabled:bg-slate-300"
        on:click={handleNextPage}
        disabled={bound(total)}
      >
        <span>Next</span>
        <Icon i="chevron-right" class="h-5 w-5 fill-slate-500" />
      </button>
    </li>
  </ul>
  <div class="inline-flex space-x-2">
    <input
      class="block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
      type="number"
      min={1}
      max={total}
      bind:value={goto}
    />
    <button
      class="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50 disabled:bg-slate-300"
      on:click={handleGoToPage}
    >
      <span>Go</span>
    </button>
  </div>
</nav>

<!-- style -->
<style lang="scss">
</style>
