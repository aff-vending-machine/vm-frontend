<script lang="ts">
  import DateTimePicker from '~/components/forms/datetime/DateTimePicker.svelte';
  import dayjs from 'dayjs';
  import Button from '~/components/common/buttons/Button.svelte';

  const today = new Date();
  let firstDateTime: Date = dayjs(today).set('year', 2023).startOf('year').toDate();
  let lastDateTime: Date = dayjs(today).set('minute', 0).set('hour', 23).toDate();
  let startDateTime: Date = dayjs(today).set('minute', 0).set('hour', 22).subtract(1, 'day').toDate();
  let endDateTime: Date = dayjs(today).set('minute', 0).set('hour', 22).toDate();
</script>

<div class="flex justify-between border rounded p-4 bg-secondary-50">
  <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
    <div class="text-sm">
      <label for="start-date-time">Start Date:</label>
      <DateTimePicker
        id="start-date-time"
        rangeFrom={firstDateTime}
        rangeTo={lastDateTime}
        bind:value={startDateTime}
      />
    </div>

    <div class="text-sm">
      <label for="end-date-time">End Date:</label>
      <DateTimePicker id="end-date-time" rangeFrom={startDateTime} rangeTo={lastDateTime} bind:value={endDateTime} />
    </div>
  </div>
  <div class="flex items-end align-bottom space-x-2">
    <Button>Export</Button>
    <Button outline>Filter</Button>
  </div>
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
