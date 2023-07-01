<!-- User -->
<script lang="ts">
  import { access } from '~/stores/access';
  import { navigate } from 'svelte-navigator';
  import { dragscroll } from '@svelte-put/dragscroll';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { Readable, derived, writable } from 'svelte/store';

  import {
    provideAccountUserBloc,
    UserState,
    User,
    OperationStatus,
    provideAccountRoleBloc,
    RoleState,
    AccountRole,
    provideStoreBranchBloc,
    BranchState,
    StoreBranch,
    CreateAccountUser,
  } from '@apps/core';
  import { SelectOptionsType } from '~/utils/types/options';
  import { stateDerived } from '~/utils/helpers/state';
  import { useBlocState } from '~/utils/hooks/useBlocState';
  import { MAIN_ACCOUNT_USER_ID } from '~/utils/constants/links';
  import { ColumnType } from '~/utils/types/table';
  import notification from '~/stores/notification';

  import Table from '~/ui/components/elements/tables/Table.svelte';
  import Pagination from '~/ui/components/navigations/paginations/Pagination.svelte';
  import Modal from '~/ui/components/overlays/modals/Modal.svelte';
  import FilterBar from './FilterBar.svelte';

  import Editor from './modals/Editor.svelte';
  import Viewer from './modals/Viewer.svelte';
  import Eraser from './modals/Eraser.svelte';
  import Action from './tables/Action.svelte';
  import Creator from './modals/Creator.svelte';
  import { requestRole } from '~/utils/helpers/role';

  const bloc = provideAccountUserBloc();
  const actionBloc = provideAccountUserBloc();
  const roleBloc = provideAccountRoleBloc();
  const branchBloc = provideStoreBranchBloc();

  const state = useBlocState<UserState>(bloc);
  const roleState = useBlocState<RoleState>(roleBloc);
  const branchState = useBlocState<BranchState>(branchBloc);
  const statePromise: Readable<Promise<UserState>> = derived(state, stateDerived);

  const roleOptions = writable<SelectOptionsType[]>([]);
  const branchOptions = writable<SelectOptionsType[]>([]);
  const filters = writable({
    page: 1,
    offset: 0,
    limit: 10,
    sort_by: 'id:asc',
    role_id: '',
    branch_id: '',
    search: '',
    preloads: 'Role:Branch',
  });
  const action = writable<string | null>();
  const user = writable<User | null>();

  const columns: ColumnType[] = [
    { key: 'id', index: 'id', title: 'ID', sortable: true },
    { key: 'name', index: 'username', title: 'Name', sortable: true },
    { key: 'role', index: 'role.name', title: 'Role', sortable: true },
    { key: 'branch', index: 'branch.name', title: 'Branch', sortable: true },
    { key: 'created_by', index: 'created_by', title: 'Created By', sortable: true },
    { key: 'action', title: 'Action', render: () => Action },
  ];

  const reload = async () => {
    await bloc.list($filters);
  };

  const loadRoleOptions = async () => {
    const status = await roleBloc.list();

    if (status === 'success') {
      const options = $roleState.list.map((r: AccountRole) => ({ value: r.id, label: r.name }));
      roleOptions.set(options);
    }
  };

  const loadBranchOptions = async () => {
    const status = await branchBloc.list();

    if (status === 'success') {
      const options = $branchState.list.map((r: StoreBranch) => ({ value: r.id, label: r.name }));
      branchOptions.set(options);
    }
  };

  const notifyStatus = (status: OperationStatus, successMessage: string, errorMessage: string) => {
    switch (status) {
      case 'success':
        reload();
        notification.add('success', successMessage);
        break;

      case 'failure':
        notification.add('danger', errorMessage);
        break;
    }
  };

  function handleAction(e: CustomEvent) {
    action.set(e.detail?.type || e.type);
    user.set(e.detail?.source);
  }

  function handleSelect(e: CustomEvent) {
    const { data } = e.detail;
    navigate(MAIN_ACCOUNT_USER_ID(data.id), { replace: false });
  }

  function handleClose(e: CustomEvent) {
    action.set(null);
    user.set(null);
  }

  function handlePageChange(e: CustomEvent) {
    const { page } = e.detail;
    $filters.page = page;
    $filters.offset = (page - 1) * $filters.limit;
    reload();
  }

  async function handleCreate(e: CustomEvent) {
    handleClose(e);
    const payload: CreateAccountUser = {
      branch_id: e.detail.branch_id,
      role_id: e.detail.role_id,
      username: e.detail.username,
      password: e.detail.password,
    };
    const status = await actionBloc.create(payload);
    notifyStatus(status, 'User created successfully', 'User creation failed');
  }

  async function handleUpdate(e: CustomEvent) {
    handleClose(e);
  }

  async function handleDelete(e: CustomEvent) {
    handleClose(e);
    const status = await actionBloc.delete(e.detail.id);
    notifyStatus(status, 'User deleted successfully', 'User deletion failed');
  }

  onMount(async () => {
    await reload();
    await loadRoleOptions();
    await loadBranchOptions();
  });

  $: getRoleOptions = () =>{
    return $roleOptions.filter(r => requestRole($access?.role, r.label))
  }
  $: getUsers = (list: User[]) =>{
    return list.filter(u => requestRole($access?.role, u.role.name))
  }
</script>

<section class="card">
  <div class="user-page">
    <div class="mb-4 p-4">
      <h4 class="text-xl font-medium">Users</h4>
    </div>
    <div class="mb-4">
      <FilterBar
        bind:role={$filters.role_id}
        bind:branch={$filters.branch_id}
        bind:search={$filters.search}
        roleOptions={getRoleOptions()}
        branchOptions={$branchOptions}
        on:create={handleAction}
        on:filter={reload}
      />
    </div>
    <div class="w-full table-container">
      <div class="border border-gray-200 overflow-x-auto" use:dragscroll={{ event: 'pointer' }}>
        {#await $statePromise}
          <div class="text-center py-4">Loading...</div>
        {:then $state}
          <Table {columns} source={getUsers($state.list)} on:sort={reload} on:select={handleSelect} on:action={handleAction}>
            <tfoot class="sticky bottom-0 z-1 font-bold border-y border-gray-300">
              <tr class="bg-gray-50">
                <td class="px-6 py-4" colspan={columns.length}>
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
            {error.message || 'An error occurred while loading the data.'}
          </div>
        {/await}
      </div>
    </div>
  </div>
</section>

<!-- Display modals -->
{#if $action}
  <Modal on:close={handleClose}>
    {#if $action === 'create'}
      <Creator
        branch={$access.branch_id || 0}
        roleOptions={getRoleOptions()}
        branchOptions={$branchOptions}
        on:create={handleCreate}
        on:cancel={handleClose}
      />
    {:else if $action === 'view'}
      <Viewer user={$user} on:edit={handleAction} on:delete={handleAction} on:cancel={handleClose} />
    {:else if $action === 'edit'}
      <Editor user={$user} on:update={handleUpdate} on:cancel={handleClose} />
    {:else if $action === 'delete'}
      <Eraser user={$user} on:delete={handleDelete} on:cancel={handleClose} />
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
