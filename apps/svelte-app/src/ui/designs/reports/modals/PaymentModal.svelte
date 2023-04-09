<!-- StockModal -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
  import dayjs from 'dayjs';
  import isBetween from 'dayjs/plugin/isBetween';

  // core
  import { MachineState, provideMachineBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { modal } from '~/share/stores';

  // components
  import FormModal from '~/ui/components/overlays/modals/FormModal.svelte';
  import FormControl from '~/ui/components/forms/inputs/FormControl.svelte';
  import Select from '~/ui/components/forms/selects/Select.svelte';
  import DatePicker from '~/ui/components/forms/pickers/DatePicker.svelte';

  dayjs.extend(isBetween);

  const formId = 'report-payment-form';

  const bloc = provideMachineBloc();
  const state = useBlocState<MachineState>(bloc);

  const machine = field('machine', '', []);
  const date = field('date', new Date(), [required()]);
  const modalForm = form(machine, date);

  let machineOptions = [];

  onMount(async () => {
    await bloc.list();

    if ($state.kind === 'load-success') {
      machineOptions = $state.list.map(r => ({
        name: r.name,
        value: r.id,
      }));
      machine.set(machineOptions[0].value);
    }
  });

  const dispatch = createEventDispatcher();
  const handleReport = async () => {
    try {
      await modalForm.validate();
      const data = modalForm.summary();

      if ($modalForm.errors.length == 0) {
        dispatch('report', data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDateChange = (e: CustomEvent) => {
    date.set(e.detail);
  };

  const isAllowed = (date: Date) => {
    return dayjs(date).isBetween('2023-04-01', new Date(), 'day', '[]');
  };
</script>

<!-- HTML -->
<FormModal {formId} show={$modal.event === 'report-payment'} disabled={$modalForm.errors.length != 0}>
  <h3 class="text-lg font-medium text-primary-900 mb-4">New Payment Report</h3>
  <form id={formId} class="grid grid-cols-1 gap-4" on:submit|preventDefault={handleReport}>
    <FormControl name="Machine" required>
      <Select bind:value={$machine.value} options={machineOptions} />
    </FormControl>
    <FormControl name="Date" required>
      <DatePicker selected={$date.value} on:datechange={handleDateChange} {isAllowed} />
    </FormControl>
  </form>
</FormModal>

<!-- style -->
<style lang="scss">
</style>
