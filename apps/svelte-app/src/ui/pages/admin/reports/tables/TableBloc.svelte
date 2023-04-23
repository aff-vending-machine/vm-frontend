<!-- TableBloc -->
<script lang="ts">
	import type { Transaction } from '@apps/core';
  import { ColumnsType, SortsType } from '~/share/modules/tables';
  import Table from '~/ui/components/lists/tables/Table.svelte';
  import PaymentChannel from './PaymentChannel.svelte';

  // props
  export let source: Transaction[];
  export let sorts: SortsType = {};

  const columns: ColumnsType = [
    { title: 'ID', dataIndex: 'id', sort: 'id' },
    { title: 'Timestamp', dataIndex: 'ordered_at', sort: 'ordered_at' },
    { title: 'Merchant Order ID', dataIndex: 'merchant_order_id', sort: 'id' },
    { title: 'Channel', dataIndex: 'payment_channel', sort: 'payment_channel', render: () => PaymentChannel },
    { title: 'Machine Name', dataIndex: 'machine_name', sort: 'machine_name', show: 'xs' },
    { title: 'Location', dataIndex: 'location', sort: 'location', show: 'lg' },
    { title: 'Price', dataIndex: 'paid_price', sort: 'paid_price', show: 'lg' },
  ];
</script>

<!-- HTML -->
<Table {columns} {sorts} {source} on:sort on:event />

<!-- style -->
<style lang="scss">
</style>
