<!-- DatePicker -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import dayjs from 'dayjs';

  // core
  import { getMonthName } from '~/share/modules/datepicker/date-time';

  // components
  import Calender from './Calender.svelte';
  import Icon from '../../elements/icons/Icon.svelte';

  const dispatch = createEventDispatcher();

  // props
  export let isAllowed = (_: Date) => true;
  export let selected = new Date();

  // state
  let date: number, month: number, year: number;

  // so that these change with props
  $: {
    date = selected.getDate();
    month = selected.getMonth();
    year = selected.getFullYear();
  }

  const next = () => {
    if (month === 11) {
      month = 0;
      year = year + 1;
      return;
    }
    month = month + 1;
  };

  const prev = () => {
    if (month === 0) {
      month = 11;
      year -= 1;
      return;
    }
    month -= 1;
  };

  const isMonthAllowed = (month: number) => {
    if (month === -1) {
      month = 11;
      year -= 1;
      return;
    } else if (month === 13) {
      month = 1;
      year = year + 1;
      return;
    }

    const date = dayjs().month(month).year(year)

    return isAllowed(date.toDate())
  }

  const onDateChange = (d: CustomEvent) => {
    dispatch('datechange', d.detail);
  };
</script>

<!-- HTML -->
<div class={$$props.class}>
  <input class="hidden" type="text" value={selected.toDateString()} />
  <div class="flex flex-col border rounded-md border-gray-400">
    <div class="flex justify-between items-center m-4 pb-2 border-b border-gray-400">
      <div class="float-left mx-2 text-lg font-bold">{getMonthName(month)} {year}</div>
      <div class="float-right">
        <button class="mx-2 px-3 py-2" type="button" on:click={prev} disabled={!isMonthAllowed(month - 1)}>
          <Icon class="fill-primary-500 w-4 h-4" i="left-long"  />
        </button>
        <button class="mx-2 px-3 py-2" type="button" on:click={next} disabled={!isMonthAllowed(month - 1)}>
          <Icon class="fill-primary-500 w-4 h-4" i="right-long" />
        </button>
      </div>
    </div>
    <Calender {month} {year} date={selected} {isAllowed} on:datechange={onDateChange} />
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
