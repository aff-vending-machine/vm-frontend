<!-- TableBloc -->
<script lang="ts">
  import type { Product } from '@apps/core';
  import { ColumnsType, SortsType } from '~/share/modules/tables';
  import Table from '~/ui/components/lists/tables/Table.svelte';
  import Image from './Image.svelte';

  // props
  export let source: Product[];
  export let sorts: SortsType = {};

  const columns: ColumnsType = [
    { title: 'ID', dataIndex: 'id', sort: 'id' },
    { title: 'SKU', dataIndex: 'sku', sort: 'sku' },
    { title: 'Name', dataIndex: 'name', sort: 'name' },
    { title: 'Type', dataIndex: 'type', sort: 'type' },
    { title: 'Image URL', dataIndex: 'image_url', render: () => Image },
    { title: 'Price', dataIndex: 'price', sort: 'price' },
  ];
</script>

<!-- HTML -->
<Table {columns} {sorts} {source} on:sort on:select on:event />

<!-- style -->
<style lang="scss">
</style>
