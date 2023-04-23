<!-- Slot -->
<script lang="ts">
  import { press } from '~/share/hooks/usePress';

  // core
  import { createEventDispatcher } from 'svelte';
  import { MachineSlot } from '@apps/core';

  // components

  // props
  export let slot: MachineSlot;
  export let isEdited: boolean;

  // events
  const dispatch = createEventDispatcher();
  const handleIncreaseStockEvent = () => dispatch('stock', { id: slot.id, stock: increasing(slot) });
  const handleDecreaseStockEvent = () => dispatch('stock', { id: slot.id, stock: decreasing(slot) });
  const handleSelectEvent = () => dispatch('select', { id: slot.id, slot });

  // helpers
  const decreasing = (slot: MachineSlot) => (slot.stock - 1 < 0 ? 0 : slot.stock - 1);
  const increasing = (slot: MachineSlot) => (slot.stock + 1 > slot.capacity ? slot.capacity : slot.stock + 1);
  const getColor = (slot: MachineSlot) => {
    let style = 'border ';
    if (isEdited) {
      style = 'text-orange-500 border ';
    }

    if (!slot.is_enable) {
      return style + 'border-red-500 bg-red-50';
    }

    if (slot.capacity == slot.stock) {
      return style + 'border-green-500 bg-green-50';
    }

    if (slot.stock === 0) {
      return style + 'border-gray-500 bg-gray-200';
    }

    if (slot.stock / slot.capacity <= 0.2) {
      return style + 'border-yellow-500 bg-yellow-50';
    }

    return style + 'border-blue-500 bg-blue-50';
  };
</script>

<!-- HTML -->
<button class={`flex flex-col rounded-md items-center p-2 w-28 h-32 ${getColor(slot)}`} on:click={handleSelectEvent}>
  <div class="font-bold">{slot.code}</div>
  <div class="text-xs text-center">
    {slot.product.name}
  </div>
  <div class="text-xs text-center">
    Price: {slot.product.price}
  </div>
  <div class="flex-grow" />
  <div class="flex justify-between items-center p-1 border border-gray-300 rounded-md bg-white w-full">
    <button
      class="
        h-6 w-6 border border-blue-500 bg-blue-300 rounded-sm text-white text-sm
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
