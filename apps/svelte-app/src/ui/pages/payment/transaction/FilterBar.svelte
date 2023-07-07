<script lang="ts">
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import { createEventDispatcher } from 'svelte';

  import DateTimeField from '~/ui/components/forms/input/DateTimeField.svelte';
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import { limitOptions, statusOptions } from '~/utils/constants/options';
  import { SelectOptionsType } from '~/utils/types/options';
  import Filterbar from '~/ui/components/sections/headers/Filterbar.svelte';

  export let limit: number;
  export let search: string;
  export let from: string;
  export let to: string;
  export let branch: string;
  export let machine: string;
  export let channel: string;
  export let status: string;
  export let branchOptions: SelectOptionsType[];
  export let machineOptions: SelectOptionsType[];
  export let channelOptions: SelectOptionsType[];

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Bangkok');

  const dispatch = createEventDispatcher();

  const today = new Date();

  function handleFilter(e: CustomEvent) {
    from = dayjs(startDateTime).toISOString();
    to = dayjs(endDateTime).toISOString();
    dispatch('filter', { ...e.detail, page: 1 });
  }

  if (from === '') from = dayjs(today).startOf('month').subtract(1, 'day').set('hour', 21).toISOString();
  if (to === '')
    to = dayjs(today).set('millisecond', 0).set('second', 0).set('minute', 0).set('hour', 21).toISOString();

  $: firstDateTime = dayjs(today).set('year', 2023).startOf('year').toDate();
  $: lastDateTime = dayjs(today).add(1, 'day').set('minute', 0).set('hour', 0).toDate();
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
  <SelectField
    id="branch_id"
    label="Branch"
    bind:value={branch}
    options={branchOptions}
    placeholder="no filter"
    on:change={handleFilter}
  />
  <SelectField
    id="machine_id"
    label="Machine"
    bind:value={machine}
    options={machineOptions}
    placeholder="no filter"
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
  <SelectField
    id="order_status"
    label="Status"
    bind:value={status}
    options={statusOptions}
    placeholder="no filter"
    on:change={handleFilter}
  />
  <SelectField id="limit" label="Limit" bind:value={limit} options={limitOptions} on:change={handleFilter} />
  <TextInputField class="hidden" id="search" label="Search" bind:value={search} on:change={handleFilter} />
</Filterbar>

<style>
  /* Add any necessary styles for the filter bar */
</style>
