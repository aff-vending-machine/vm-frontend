<!-- TableBloc -->
<script lang="ts">
  import type { Machine } from '@apps/core';
  import { ColumnsType, SortsType } from '~/share/modules/tables';
  import Table from '~/ui/components/lists/tables/Table.svelte';
  import Action from './Action.svelte';

  // props
  export let source: Machine[];
  export let sorts: SortsType = {};

  const columns: ColumnsType = [
    { title: 'ID', dataIndex: 'id', sort: 'id' },
    { title: 'Name', dataIndex: 'name', sort: 'name', show: 'xs' },
    { title: 'Serial Number', dataIndex: 'serial_number', sort: 'serial_number', show: 'sm' },
    { title: 'Location', dataIndex: 'location', sort: 'location' },
    { title: 'Type', dataIndex: 'type', sort: 'type', show: 'xl' },
    { title: 'Vendor', dataIndex: 'vendor', sort: 'vendor', show: 'lg' },
    { title: 'Status', dataIndex: 'status', sort: 'status' },
    { title: 'LastActiveTime', dataIndex: 'last_active_time', sort: 'last_active_time', show: 'md' },
    { title: 'Action', show: 'all', render: () => Action },
  ];
</script>

<!-- HTML -->
<Table {columns} {sorts} {source} on:select on:sort on:event />

<!-- style -->
<style lang="scss">
</style>
