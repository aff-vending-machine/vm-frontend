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
    { title: 'Username', dataIndex: 'username', show: 'all', sort: true },
    { title: 'Role', dataIndex: 'role', sort: true },
    { title: 'Login Time', dataIndex: 'loggedin_at', sort: true },
    { title: 'Created By', dataIndex: 'created_by', sort: true },
    { title: 'Action', show: 'all', render: () => Action },
  ];
</script>

<!-- HTML -->
<Table {columns} {sorts} {source} on:sort on:event />

<!-- style -->
<style lang="scss">
</style>
