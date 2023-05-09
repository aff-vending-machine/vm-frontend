<script lang="ts">
  import dayjs from 'dayjs';
  import { createEventDispatcher } from 'svelte';
  import Button from '~/components/common/buttons/Button.svelte';
  import Icon from '~/components/common/icons/Icon.svelte';
  import DateTimeField from '~/components/forms/input/DateTimeField.svelte';

  const dispatch = createEventDispatcher();

  const today = new Date();
  let firstDateTime: Date = dayjs(today).set('year', 2023).startOf('year').toDate();
  let lastDateTime: Date = dayjs(today).set('minute', 0).set('hour', 23).toDate();
  let startDateTime: Date = dayjs(today).set('minute', 0).set('hour', 22).subtract(1, 'day').toDate();
  let endDateTime: Date = dayjs(today).set('minute', 0).set('hour', 22).toDate();
</script>

<div class="flex justify-between border rounded p-4 bg-secondary-50">
  <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
    <DateTimeField
      id="start-date-time"
      label="Start Date"
      rangeFrom={firstDateTime}
      rangeTo={lastDateTime}
      bind:value={startDateTime}
    />

    <DateTimeField
      id="end-date-time"
      label="End Date"
      rangeFrom={startDateTime}
      rangeTo={lastDateTime}
      bind:value={endDateTime}
    />
  </div>
  <div class="flex items-end align-bottom space-x-2">
    <Button outline class="group" on:click={() => dispatch('export', { data: {} })}>
      <Icon i="ic-export" class="h-4 w-4 fill-red-500 group-hover:fill-white" />
      <span class="ml-2">Export</span>
    </Button>
  </div>
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
