<script lang="ts">
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import { createEventDispatcher } from 'svelte';
  import DateTimeField from '~/ui/components/forms/input/DateTimeField.svelte';
  import Filterbar from '~/ui/components/sections/headers/Filterbar.svelte';

  export let from: string;
  export let to: string;

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.tz.setDefault('Asia/Bangkok');

  const dispatch = createEventDispatcher();

  const today = new Date();

  function handleFilter(e: CustomEvent) {
    from = dayjs(startDateTime).toISOString();
    to = dayjs(endDateTime).toISOString();
    dispatch('filter', e.detail);
  }

  if (from === '')
    from = dayjs(today)
      .set('millisecond', 0)
      .set('second', 0)
      .set('minute', 0)
      .set('hour', 21)
      .subtract(1, 'day')
      .toISOString();
  if (to === '')
    to = dayjs(today).set('millisecond', 0).set('second', 0).set('minute', 0).set('hour', 21).toISOString();

  $: firstDateTime = dayjs(today).set('year', 2023).startOf('year').toDate();
  $: lastDateTime = dayjs(today).set('minute', 0).set('hour', 21).toDate();
  $: startDateTime = dayjs(from).toDate();
  $: endDateTime = dayjs(to).toDate();
</script>

<Filterbar>
  <DateTimeField
    id="start-date-time"
    label="Start Date"
    rangeFrom={firstDateTime}
    rangeTo={lastDateTime}
    bind:value={startDateTime}
    on:change={handleFilter}
  />
  <DateTimeField
    id="end-date-time"
    label="End Date"
    rangeFrom={startDateTime}
    rangeTo={lastDateTime}
    bind:value={endDateTime}
    on:change={handleFilter}
  />
</Filterbar>
<span class="text-xs float-right my-2">
  *Report from
  <span class="text-secondary-700">{dayjs(startDateTime).format('DD MMMM YYYY HH:mm')}</span>
  to
  <span class="text-secondary-700">{dayjs(endDateTime).format('DD MMMM YYYY HH:mm')}</span>
  ({dayjs(startDateTime).from(dayjs(endDateTime), true)})
</span>

<style>
  /* Add any necessary styles for the filter bar */
</style>
