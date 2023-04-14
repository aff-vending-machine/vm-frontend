<!-- StockModal -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import dayjs from 'dayjs';
  import isBetween from 'dayjs/plugin/isBetween';

  // core
  import { modal } from '~/share/stores';

  // components
  import FormModal from '~/ui/components/overlays/modals/FormModal.svelte';
  import FormControl from '~/ui/components/forms/inputs/FormControl.svelte';
  import Select from '~/ui/components/forms/selects/Select.svelte';
  import DatePicker from '~/ui/components/forms/pickers/DatePicker.svelte';

  export let machineOptions: Options;

  dayjs.extend(isBetween);

  const dispatch = createEventDispatcher();

  const formId = 'report-stock-form';
  const id = field('id', $modal.id, []);
  const date = field('date', new Date(), [required()]);
  const modalForm = form(id, date);

  const handleReport = async () => {
    await modalForm.validate();
    if ($modalForm.errors.length == 0) {
      dispatch('report', modalForm.summary());
    }
  };

  const handleDateChange = (e: CustomEvent) => date.set(e.detail);
  const isAllowed = (date: Date) => dayjs(date).isBetween('2023-04-01', new Date(), 'day', '[]');
</script>

<!-- HTML -->
<FormModal {formId} disabled={$modalForm.errors.length != 0}>
  <h3 class="text-lg font-medium text-primary-900 mb-4">New Stock Report</h3>
  <form id={formId} class="grid grid-cols-1 gap-4" on:submit|preventDefault={handleReport}>
    <FormControl name="Machine" required>
      <Select bind:value={$id.value} options={machineOptions} />
    </FormControl>
    <FormControl name="Date" required>
      <DatePicker selected={$date.value} on:datechange={handleDateChange} {isAllowed} />
    </FormControl>
  </form>
</FormModal>

<!-- style -->
<style lang="scss">
</style>
