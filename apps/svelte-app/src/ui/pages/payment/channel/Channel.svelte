<!-- PaymentChannel -->
<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';
  import { dragscroll } from '@svelte-put/dragscroll';

  import { providePaymentChannelBloc, PaymentChannelState, PaymentChannel, OperationStatus, UpdatePaymentChannel } from '@apps/core';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import FilterBar from './FilterBar.svelte';
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';
  import Viewer from './modals/Viewer.svelte';
  import Action from './tables/Action.svelte';

  import { stateDerived } from '~/utils/helpers/state';
  import { useBlocState } from '~/utils/hooks/useBlocState';

  const bloc = providePaymentChannelBloc();
  const actionBloc = providePaymentChannelBloc();

  const state = useBlocState<PaymentChannelState>(bloc);
  const statePromise: Readable<Promise<PaymentChannelState>> = derived(state, stateDerived);

  const filters = writable({
    page: 1,
    offset: 0,
    limit: 10,
    sort_by: 'id:asc',
    group_id: '',
    search: '',
  });
  const action = writable<string | null>();
  const channel = writable<PaymentChannel | null>();


  const reload = async () => {
    await bloc.list($filters);
  };

  function handleAction(e: CustomEvent) {
    action.set(e.detail?.type || e.type);
    channel.set(e.detail?.source);
  }

  function handleSelect(e: CustomEvent) {
    const { data } = e.detail;
    action.set('view');
    channel.set(data);
  }

  function handleClose(e: CustomEvent) {
    action.set(null);
    channel.set(null);
  }

  function handlePageChange(e: CustomEvent) {
    const { page } = e.detail;
    $filters.page = page;
    $filters.offset = (page - 1) * $filters.limit;
    reload();
  }

  onMount(async () => {
    await reload();
  });

  $: columns = [
    { key: 'id', index: 'id', title: $_('channel.columns.id'), sortable: true },
    { key: 'name', index: 'name', title: $_('channel.columns.name'), sortable: true },
    { key: 'channel', index: 'channel', title: $_('channel.columns.channel'), sortable: true },
    { key: 'vendor', index: 'vendor', title: $_('channel.columns.vendor'), sortable: true },
    { key: 'is_enable', index: 'is_enable', title: $_('channel.columns.status'), sortable: true },
    { key: 'actions', title: $_('channel.columns.actions'), render: () => Action },
  ];
</script>

<section class="card">
  <div class="channel-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">{$_('channel.title')}</h4>
    </div>
    <div class="mb-4">
      <FilterBar bind:limit={$filters.limit} bind:search={$filters.search} on:filter={reload} />
    </div>
    <div class="w-full table-container">
      <div class="border border-gray-200 overflow-x-auto" use:dragscroll={{ event: 'pointer' }}>
        {#await $statePromise}
          <div class="text-center py-4">{$_('general.loading')}</div>
        {:then $state}
          <Table {columns} source={$state.list} on:select={handleSelect} on:action={handleAction}>
            <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300 ">
              <tr class="bg-gray-50">
                <td class="px-6 py-4" colspan={columns.length + 1}>
                  <Pagination
                    page={$filters.page}
                    itemsPerPage={$filters.limit}
                    totalItems={$state.count}
                    on:page-change={handlePageChange}
                  />
                </td>
              </tr>
            </tfoot>
          </Table>
        {:catch error}
          <div class="text-center text-red-500 py-4">
            {error.message || $_('general.error')}
          </div>
        {/await}
      </div>
    </div>
  </div>
</section>

<!-- Display modals -->
{#if $action && $channel}
  <Modal on:close={handleClose}>
    {#if $action === 'view'}
      <Viewer channel={$channel} on:edit={handleAction} on:delete={handleAction} on:cancel={handleClose} />
    {/if}
  </Modal>
{/if}

<style>
  .card {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }

  @media (max-width: 1023px) {
    .table-container {
      overflow-x: auto;
    }
  }
</style>
