<script lang="ts">
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';
  import DateTimeField from '~/ui/components/forms/input/DateTimeField.svelte';
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import { SelectOptionsType } from '~/utils/types/options';
  import Filterbar from '~/ui/components/sections/headers/Filterbar.svelte';

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

  function handleFilter(e: CustomEvent) {
    from = dayjs(startDateTime).toISOString();
    to = dayjs(endDateTime).toISOString();
    dispatch('filter', e.detail);
  }

  function handleExport(e: CustomEvent) {
    dispatch('export');
  }
</script>

<Filterbar>
  <DateTimeField
    id="start-date-time"
    label={$_('field.start-date')}
    rangeFrom={firstDateTime}
    rangeTo={lastDateTime}
    bind:value={startDateTime}
    on:change={handleFilter}
  />
  <DateTimeField
    id="end-date-time"
    label={$_('field.end-date')}
    rangeFrom={startDateTime}
    rangeTo={lastDateTime}
    bind:value={endDateTime}
    on:change={handleFilter}
  />
  <SelectField
    id="channel_id"
    label={$_('field.payment-channel')}
    bind:value={channel}
    options={channelOptions}
    placeholder="no filter"
    on:change={handleFilter}
  />

  <svelte:fragment slot="right">
    <Button outline class="group" on:click={handleExport}>
      <Icon i="ic-export" class="h-4 w-4 fill-red-500 group-hover:fill-white" />
      <span class="ml-2">{$_('button.export')}</span>
    </Button>
  </svelte:fragment>
</Filterbar>

<style>
  /* Add any necessary styles for the filter bar */
</style>
