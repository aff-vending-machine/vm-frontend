<!-- DateTimePicker -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { DatePicker } from 'date-picker-svelte';
  import { TimePicker } from 'svelte-time-picker';
  import dayjs from 'dayjs';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';
  import Button from '~/ui/components/elements/buttons/Button.svelte';

  export let value: Date;
  export let id: string = null;
  export let rangeFrom: Date = null;
  export let rangeTo: Date = null;

  const dispatch = createEventDispatcher();

  const selectedTab = writable<'calendar' | 'clock'>('calendar');

  let timeoutID: number;
  let showPicker = false;
  let showTime = 1;
  let datetime = value;
  let time = new Date(0, 0, 0, 22, 0);

  const togglePicker = () => {
    showPicker = !showPicker;
  };

  const canChooseTime = () => {
    showTime = 0;
    timeoutID = setTimeout(() => (showTime = 2), 100);
  };

  function handleTimeChange(e: CustomEvent) {
    let dateChanged = e.detail;
    if (rangeFrom !== null && dayjs(dateChanged).isBefore(rangeFrom, 'hour')) {
      datetime.setHours(time.getHours());
      showTime = 0;
      timeoutID = setTimeout(() => (showTime = 1), 100);
      dispatch('input', { value: datetime });
      return;
    }

    if (rangeTo !== null && dayjs(dateChanged).isAfter(rangeTo, 'hour')) {
      datetime.setHours(time.getHours());
      showTime = 0;
      timeoutID = setTimeout(() => (showTime = 1), 100);
      dispatch('input', { value: datetime });
      return;
    }

    if (time.getHours() !== dateChanged.getHours()) {
      time.setHours(dateChanged.getHours());
      showTime = 0;
      timeoutID = setTimeout(() => (showTime = 1), 100);
      dispatch('input', { value: datetime });
    } else {
      switch (showTime) {
        case 1:
          canChooseTime();
          return;

        case 2:
          timeoutID = setTimeout(() => {
            showTime === 1 ? canChooseTime() : (showTime = 1);
          }, 100);
          return;
      }
    }
  }

  function handleChange() {
    togglePicker();
    value = datetime;
    dispatch('change', { value: datetime });
  }

  onMount(() => {
    // Close picker when clicked outside
    const handleClickOutside = (e: any) => {
      if (!e.target.closest(`.date-time-picker-${id}`)) {
        showPicker = false;
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  });
</script>

<div class={`date-time-picker-${id} relative w-48`}>
  <button class="flex items-center border border-gray-300 bg-white rounded-md cursor-pointer" on:click={togglePicker}>
    <input
      {id}
      class="border-0 px-2 py-1 w-36 text-sm text-gray-700 bg-transparent focus:border-none focus:outline-none box-shadow-none"
      readonly
      type="text"
      value={dayjs(value).format('YYYY-MM-DD HH:mm')}
    />

    <div class="flex pr-2">
      <Icon i="ic-calendar" class="h-3 w-3 fill-gray-700" />
    </div>
  </button>
  {#if showPicker}
    <div class="absolute left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      <div class="flex justify-center space-x-4 p-2">
        <button
          class="px-4 py-2 rounded-md focus:outline-none transition-colors {$selectedTab === 'calendar'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-gray-100'}"
          on:click={() => ($selectedTab = 'calendar')}
          class:selected={$selectedTab === 'calendar'}>Date</button
        >
        <button
          class="px-4 py-2 rounded-md focus:outline-none transition-colors {$selectedTab === 'clock'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-gray-100'}"
          on:click={() => ($selectedTab = 'clock')}
          class:selected={$selectedTab === 'clock'}>Time</button
        >
      </div>

      <div class="shadow-md">
        {#if $selectedTab === 'calendar'}
          <DatePicker bind:value={datetime} min={rangeFrom} max={rangeTo} />
        {:else if showTime !== 0}
          <TimePicker
            bind:date={datetime}
            on:change={handleTimeChange}
            options={{ is24h: true, minutesIncrement: 60, openTo: 'hours' }}
          />
        {:else}
          <TimePicker date={time} options={{ is24h: true }} />
        {/if}
        <div>
          <Button on:click={handleChange} color="secondary" class="w-full uppercase text-xl rounded-none">Done</Button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Add your custom styles here */
  .box-shadow-none:focus {
    box-shadow: none;
  }
</style>
