<script lang="ts">
  import DateTimePicker from '~/components/forms/datetime/DateTimePicker.svelte';
  import dayjs from 'dayjs';
  import Button from '~/components/common/buttons/Button.svelte';
  import SelectField from '~/components/forms/input/SelectField.svelte';
  import TextInputField from '~/components/forms/input/TextInputField.svelte';

  export let group: string;
  export let search: string;

  const today = new Date();
  let firstDateTime: Date = dayjs(today).set('year', 2023).startOf('year').toDate();
  let lastDateTime: Date = dayjs(today).set('minute', 0).set('hour', 23).toDate();
  let startDateTime: Date = dayjs(today).set('minute', 0).set('hour', 22).subtract(1, 'day').toDate();
  let endDateTime: Date = dayjs(today).set('minute', 0).set('hour', 22).toDate();
</script>

<div class="flex justify-between border rounded p-4 bg-secondary-50">
  <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
    <SelectField id="group" label="Group" value={group} options={[]} placeholder="no filter" />

    <TextInputField id="search" label="Search" value={search}/>
  </div>
  <div class="flex items-end align-bottom space-x-2">
    <Button>Create</Button>
    <Button>Filter</Button>
  </div>
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
