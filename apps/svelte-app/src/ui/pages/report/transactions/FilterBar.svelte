<script lang="ts">
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import { createEventDispatcher } from 'svelte';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';
  import DateTimeField from '~/ui/components/forms/input/DateTimeField.svelte';
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import { SelectOptionsType } from '~/utils/types/options';

  export let from: string;
  export let to: string;
  export let channel: string;
  export let channelOptions: SelectOptionsType[];

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Bangkok');

  const dispatch = createEventDispatcher();

  const today = new Date();

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
  $: lastDateTime = dayjs(today).set('minute', 0).set('hour', 23).toDate();
  $: startDateTime = dayjs(from).toDate();
  $: endDateTime = dayjs(to).toDate();

  const handleFilter = (e: CustomEvent) => {
    from = dayjs(startDateTime).toISOString();
    to = dayjs(endDateTime).toISOString();
    dispatch('filter', e.detail);
  };
</script>

<div class="flex justify-between border rounded p-4 bg-secondary-50">
  <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
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
    <SelectField
      id="channel_id"
      label="Payment Channel"
      bind:value={channel}
      options={channelOptions}
      placeholder="no filter"
      on:change={handleFilter}
    />
  </div>
  <div class="flex items-end align-bottom space-x-2">
    <Button outline class="group" on:click={() => dispatch('export')}>
      <Icon i="ic-export" class="h-4 w-4 fill-red-500 group-hover:fill-white" />
      <span class="ml-2">Export</span>
    </Button>
  </div>
</div>

<style>
  /* Add any necessary styles for the filter bar */
</style>
