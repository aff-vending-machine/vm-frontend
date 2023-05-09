<script lang="ts">
  import Table from '~/components/common/tables/Table.svelte';
  import FilterBar from './FilterBar.svelte';
  import { navigate } from 'svelte-navigator';
  import { MAIN_REPORT_ID } from '~/utils/constants/links';

  let data = [];

  const totalCreditCard = data.reduce((sum, row) => sum + row.totalCreditCard, 0);
  const totalPromptPay = data.reduce((sum, row) => sum + row.totalPromptPay, 0);
  const totalPayment = data.reduce((sum, row) => sum + row.totalPayment, 0);

  let columns = [
    { key: 'name', header: 'Machine Name', sortable: true },
    { key: 'serial_number', header: 'Serial Number', sortable: true },
    { key: 'creditcard', header: 'Credit Card', sortable: true },
    { key: 'promptpay', header: 'Promptpay', sortable: true },
    { key: 'total', header: 'Total', sortable: true },
  ];

  const handleRowClick = (e: CustomEvent) => {
    const { id } = e.detail;
    navigate(MAIN_REPORT_ID(id));
  };
</script>

<section class="card">
  <div class="report-page">
    <div class="mb-4">
      <FilterBar />
    </div>
    <div class="w-full">
      <div class="overflow-y-auto custom-scrollbar max-h-[calc(4rem*10)] border border-gray-200">
        <Table {data} {columns} on:row-click={handleRowClick}>
          <tfoot class="sticky bottom-0 z-1 font-bold border-y-4 border-double border-gray-300 ">
            <tr class="bg-gray-50">
              <td class="px-6 py-4" colspan={2}>Total</td>
              <td class="px-6 py-4">{totalCreditCard}</td>
              <td class="px-6 py-4">{totalPromptPay}</td>
              <td class="px-6 py-4">{totalPayment}</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  </div>
</section>

<style>
  .card {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 0.5em;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(107, 114, 128, 0.5); /* Adjust color and opacity */
    border-radius: 0.25rem;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: rgba(229, 231, 235, 0.5); /* Adjust color and opacity */
    border-radius: 0.25rem;
  }
</style>
