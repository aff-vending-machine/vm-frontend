<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { getDateRows, noop, uuid } from '~/share/modules/datepicker/date-time';

  const dispatch = createEventDispatcher();

  // props
  export let date: Date;
  export let month: number;
  export let year: number;
  export let isAllowed: (date: Date) => boolean;

  // local vars to help in render
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let cells: { value: any; allowed: boolean }[];

  // function helpers
  const onChange = (date: number) => {
    dispatch('datechange', new Date(year, month, date));
  };

  const allow = (year: number, month: number, date: number) => {
    if (!date) return true;
    return isAllowed(new Date(year, month, date));
  };

  $: cells = getDateRows(month, year).map(c => ({
    value: c,
    allowed: allow(year, month, c),
  }));
</script>

<div class="grid grid-cols-7 gap-4">
  {#each weekdays as day}
    <div class="text-center font-semibold text-secondary-500">{day}</div>
  {/each}
  {#each cells as { allowed, value } (uuid())}
    <div class="text-center">
      <button
        type="button"
        class="rounded-full w-8 h-8"
        on:click={allowed && value ? onChange.bind(this, value) : noop}
        class:cell={true}
        class:highlight={allowed && value}
        class:disabled={!allowed}
        class:selected={new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() ===
          new Date(year, month, value).getTime()}
      >
        {value || ''}
      </button>
    </div>
  {/each}
</div>

<style>
  .selected {
    background: #84e791;
  }

  .highlight {
    transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .disabled {
    background: #efefef;
    cursor: not-allowed;
    color: #bfbfbf;
  }

  .highlight:hover {
    background: rgb(238, 176, 60);
    color: #fff;
    cursor: pointer;
    transform: scale(1.3);
  }

  .selected.highlight:hover {
    background: green;
  }
</style>
