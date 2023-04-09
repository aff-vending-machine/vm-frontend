<!-- TableBloc -->
<script lang="ts">
  import type { Role } from '@apps/core';
  import { ColumnsType, SortsType } from '~/share/modules/tables';
  import Table from '~/ui/components/lists/tables/Table.svelte';
  import Action from './Action.svelte';
  import Permission from './Permission.svelte';

  // props
  export let source: Role[];
  export let sorts: SortsType = {};

  const columns: ColumnsType = [
    { title: 'No.', render: (_: string, index: number) => index + 1 },
    { title: 'Role', dataIndex: 'name', show: 'all' },
    { title: 'Permissions', dataIndex: 'permissions', render: () => Permission },
    { title: 'Action', dataIndex: 'name', show: 'all', render: () => Action },
  ];
</script>

<!-- HTML -->
<Table {columns} {sorts} {source} on:sort on:event />
