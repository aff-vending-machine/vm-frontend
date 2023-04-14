<!-- TableBloc -->
<script lang="ts">
	import type { Transaction } from '@apps/core';
  import { ColumnsType, SortsType } from '~/share/modules/tables';
  import Table from '~/ui/components/lists/tables/Table.svelte';
  import Action from './Action.svelte';
  import OrderStatus from './OrderStatus.svelte';
  import PaymentChannel from './PaymentChannel.svelte';
  import Price from './Price.svelte';

  // props
  export let source: Transaction[];
  export let sorts: SortsType = {};

  const columns: ColumnsType = [
    { title: 'ID', dataIndex: 'id', sort: 'id' },
    { title: 'Merchant Order ID', dataIndex: 'merchant_order_id', sort: 'id' },
    { title: 'Status', dataIndex: 'order_status', sort: 'order_status', render: () => OrderStatus },
    { title: 'Channel', dataIndex: 'payment_channel', sort: 'payment_channel', render: () => PaymentChannel },
    { title: 'Timestamp', dataIndex: 'ordered_at', sort: 'ordered_at' },
    { title: 'Machine Name', dataIndex: 'machine_name', sort: 'machine_name', show: 'xs' },
    { title: 'Location', dataIndex: 'location', sort: 'location', show: 'lg' },
    { title: 'Total Price', render: () => Price },
    { title: 'Action', show: 'all', render: () => Action },
  ];
</script>

<!-- HTML -->
<Table {columns} {sorts} {source} on:sort on:event />

<!-- style -->
<style lang="scss">
</style>
