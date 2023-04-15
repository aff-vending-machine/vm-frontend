<!-- TableBloc -->
<script lang="ts">
	import type { Product } from '@apps/core';
  import { ColumnsType, SortsType } from '~/share/modules/tables';
  import Table from '~/ui/components/lists/tables/Table.svelte';

  // props
  export let source: Product[];
  export let sorts: SortsType = {};

  const columns: ColumnsType = [
    { title: 'ID', dataIndex: 'id', sort: 'id' },
    { title: 'Name', dataIndex: 'name', sort: 'name' },
    { title: 'Type', dataIndex: 'type', sort: 'type' },
    { title: 'SKU', dataIndex: 'sku', sort: 'sku' },
    { title: 'Price', dataIndex: 'price', sort: 'price' },
  ];
</script>

<!-- HTML -->
<Table {columns} {sorts} {source} on:sort on:event />

<!-- style -->
<style lang="scss">
</style>
