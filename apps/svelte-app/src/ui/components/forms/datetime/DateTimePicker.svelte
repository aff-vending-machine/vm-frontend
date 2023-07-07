<!-- DateTimePicker -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { DatePicker } from 'date-picker-svelte';
  import dayjs from 'dayjs';

  import Icon from '~/ui/components/elements/icons/Icon.svelte';
  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import TimePicker from '~/ui/components/forms/datetime/TimePicker.svelte';

  export let value: Date;
  export let id: string = null;
  export let rangeFrom: Date = null;
  export let rangeTo: Date = null;

  const dispatch = createEventDispatcher();

  const selectedTab = writable<'calendar' | 'time'>('calendar');

  let showPicker = false;
  let dateValue = value;
  let timeValue = value;

  const togglePicker = () => {
    showPicker = !showPicker;
  };

  function handleChange() {
    togglePicker();
    if (isNaN(dateValue.getDate())) {
      dateValue = value;
    }

    if (isNaN(timeValue.getTime())) {
      timeValue = value;
    }

    const mergedValue: Date = new Date(dateValue);

    mergedValue.setHours(timeValue.getHours());
    mergedValue.setMinutes(timeValue.getMinutes());
    mergedValue.setSeconds(timeValue.getSeconds());
    mergedValue.setMilliseconds(0);

    value = mergedValue;

    dispatch('change', { value: mergedValue });
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

<div class="date-time-picker-{id} relative">
  <button
    class="flex items-center border border-gray-300 bg-white rounded-md cursor-pointer w-full"
    on:click={togglePicker}
  >
    <input
      {id}
      class="border-0 px-2 py-1 text-sm w-full text-gray-700 bg-transparent focus:border-none focus:outline-none box-shadow-none"
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
          class="px-4 py-2 rounded-md focus:outline-none transition-colors {$selectedTab === 'time'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-gray-100'}"
          on:click={() => ($selectedTab = 'time')}
          class:selected={$selectedTab === 'time'}>Time</button
        >
      </div>

      <div class="shadow-md">
        {#if $selectedTab === 'calendar'}
          <DatePicker bind:value={dateValue} min={rangeFrom} max={rangeTo} />
        {:else}
          <TimePicker bind:value={timeValue} />
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
