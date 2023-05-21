<!-- SlotCard -->
<script lang="ts">
  import { press } from '~/utils/hooks/usePress';

  // core
  import { createEventDispatcher } from 'svelte';
  import { MachineSlot } from '@apps/core';
  import { tippy } from 'svelte-tippy';
  import 'tippy.js/dist/tippy.css';

  // components

  // props
  export let slot: MachineSlot;
  export let isEdited: boolean;

  // events
  const dispatch = createEventDispatcher();
  const handleIncreaseStockEvent = () => dispatch('stock', { id: slot.id, stock: increasing(slot) });
  const handleDecreaseStockEvent = () => dispatch('stock', { id: slot.id, stock: decreasing(slot) });
  const handleSelectEvent = () => dispatch('select', { data: slot });

  // helpers
  const decreasing = (slot: MachineSlot) => (slot.stock - 1 < 0 ? 0 : slot.stock - 1);
  const increasing = (slot: MachineSlot) => (slot.stock + 1 > slot.capacity ? slot.capacity : slot.stock + 1);
  const getColor = (slot: MachineSlot) => {
    let style = 'border ';
    if (isEdited) {
      style = 'text-orange-500 border ';
    }

    if (!slot.is_enable) {
      return style + 'border-red-500 bg-red-50 hover:bg-red-100';
    }

    if (slot.capacity == slot.stock) {
      return style + 'border-green-500 bg-green-50 hover:bg-green-100';
    }

    if (slot.stock === 0) {
      return style + 'border-gray-500 bg-gray-200 hover:bg-gray-100';
    }

    if (slot.stock / slot.capacity <= 0.2) {
      return style + 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100';
    }

    return style + 'border-blue-500 bg-blue-50 hover:bg-blue-100';
  };
  const truncate = (str: string, n: number, useWordBoundary: boolean) => {
    if (!str) {
      return '';
    }
    if (str.length <= n) {
      return str;
    }
    const subString = str.slice(0, n - 1); // the original check
    return (useWordBoundary ? subString.slice(0, subString.lastIndexOf(' ')) : subString) + '...';
  };
</script>

<!-- HTML -->
<button
  class={`flex flex-col rounded-md items-center p-2 w-28 h-32 ${getColor(slot)}`}
  use:tippy={{ content: `${slot.code}: ${slot.product?.name}`, placement: 'top' }}
  on:click={handleSelectEvent}
>
  <div class="font-bold">{slot.code}</div>
  <div class="text-xs text-center">
    <span class="overflow-hidden text-ellipsis">
      {truncate(slot.product?.name, 20, false)}
    </span>
  </div>
  <div class="text-xs text-center">
    Price: {slot.product?.sale_price}
  </div>
  <div class="flex-grow" />
  <div class="flex justify-between items-center p-1 border border-gray-300 rounded-md bg-white w-full">
    <button
      class="
        h-6 w-6 border border-blue-500 bg-blue-300 rounded-sm text-white text-sm
        hover:border-blue-700 hover:bg-blue-500 
        disabled:border-gray-300 disabled:bg-gray-300
      "
      use:press
      on:click|preventDefault|stopPropagation={handleDecreaseStockEvent}
      on:mouse-press={handleDecreaseStockEvent}
      disabled={slot.stock === 0}
    >
      -
    </button>
    <div class="text-center text-sm mx-auto">{slot.stock}</div>
    <button
      class="
        h-6 w-6 border border-blue-500 bg-blue-300 rounded-sm text-white text-sm
        hover:border-blue-700 hover:bg-blue-500 
      disabled:border-gray-300 disabled:bg-gray-300
      "
      use:press
      on:mouse-press={handleIncreaseStockEvent}
      on:click|preventDefault|stopPropagation={handleIncreaseStockEvent}
      disabled={slot.stock === slot.capacity}
    >
      +
    </button>
  </div>
</button>

<!-- style -->
<style lang="scss">
</style>