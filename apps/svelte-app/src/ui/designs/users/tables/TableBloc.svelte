<!-- TableBloc -->
<script lang="ts">
  import type { User } from '@apps/core';
  import { ColumnsType, SortsType } from '~/share/modules/tables';
  import Table from '~/ui/components/lists/tables/Table.svelte';
  import Action from './Action.svelte';

  // props
  export let source: User[];
  export let sorts: SortsType = {};

  const columns: ColumnsType = [
    { title: 'No.', render: (_, index: number) => index + 1 },
    { title: 'Username', dataIndex: 'username', show: 'all', sort: 'username' },
    { title: 'Role', dataIndex: 'role', sort: "role_id" },
    { title: 'Login Time', dataIndex: 'last_login', sort: 'last_login' },
    { title: 'Created By', dataIndex: 'created_by', sort: 'created_by' },
    { title: 'Action', show: 'all', render: () => Action },
  ];
</script>

<!-- HTML -->
<Table {columns} {sorts} {source} on:sort on:event />

<!-- style -->
<style lang="scss">
</style>
