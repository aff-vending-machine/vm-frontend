<!-- UserView -->
<script lang="ts">
  import { onMount } from 'svelte';

  // core
  import type { UserState } from '@apps/core';
  import { provideUserBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { limitFilterOptions } from '~/share/modules/options/limit';
  import { access, modal } from '~/share/stores';
  import { sortToObj } from '~/share/utils/sort';
  import { roleFilterOptions } from '~/share/modules/options/role';

  // components
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import Select from '~/ui/components/forms/selects/Select.svelte';
  import CreateButton from '~/ui/components/elements/buttons/CreateButton.svelte';
  import TableLoader from '~/ui/components/feedbacks/loaders/TableLoader.svelte';
  import Overlay from './Overlay.svelte';
  import TableBloc from './tables/TableBloc.svelte';

  const bloc = provideUserBloc();
  const state = useBlocState<UserState>(bloc);

  let filter = {
    page: 1,
    offset: 0,
    limit: 10,
    role: '',
    sort_by: 'created_at:desc',
  };

  onMount(() => {
    bloc.list(filter);
  });

  $: handleCreateEvent = () => modal.set({ event: 'create' });
  $: handleEvent = (e: CustomEvent) => modal.set(e.detail);

  $: handleChangePage = (e: CustomEvent) => {
    filter.page = e.detail.page;
    filter.offset = (filter.page - 1) * filter.limit;
    bloc.list(filter);
  };

  $: handleSortFilter = (e: CustomEvent) => {
    filter.sort_by = e.detail.field + ":" + e.detail.sort;
    bloc.list(filter);
  };

  $: handleChangeFilter = () => {
    bloc.list(filter);
  };
</script>

<!-- HTML -->
<section class="mx-4">
  <div class="w-full bg-white rounded-xl shadow-xl shadow-primary-100 space-y-4 py-4">
    <div class="px-8 pt-4">
      <h4 class="text-xl font-semibold text-gray-700">User</h4>
    </div>
    <div class="p-4">
      <div class="flex flex-col md:flex-row w-full justify-between">
        <div class="float-left flex space-x-2">
          <div class="mb-3 xl:w-24 text-center">
            <span class="text-xs font-semibold">View row</span>
            <Select bind:value={filter.limit} options={limitFilterOptions} on:change={handleChangeFilter} />
          </div>
          {#if $access != null && $access.role !== 'staff'}
            <div class="mb-3 mt-6">
              <CreateButton text="Create" on:click={handleCreateEvent} />
            </div>
          {/if}
        </div>
        <div class="float-right flex space-x-2">
          <div class="mb-3 xl:min-w-24 text-center">
            <span class="text-xs font-semibold">Role</span>
            <Select bind:value={filter.role} options={roleFilterOptions} on:change={handleChangeFilter} />
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-b border-gray-300 p-4">
      {#if $state.kind === 'load-in-progress'}
        <div class="w-full">
          <TableLoader />
        </div>
      {:else if $state.kind === 'load-success'}
        <div class="w-full overflow-y-auto">
          <TableBloc
            sorts={sortToObj(filter.sort_by)}
            source={$state.list}
            on:sort={handleSortFilter}
            on:event={handleEvent}
          />
        </div>
      {:else if $state.kind === 'load-failure'}
        <div class="text-center">Something Wrong! ({$state.error?.message})</div>
      {/if}
    </div>
    <div class="w-full px-8">
      <Pagination
        class="flex flex-row justify-between"
        bind:page={filter.page}
        bind:limit={filter.limit}
        bind:count={$state.count}
        on:change={handleChangePage}
      />
    </div>
  </div>
</section>

<!-- Modal -->
<Overlay on:reload={handleChangeFilter} />

<!-- style -->
<style lang="scss">
</style>
