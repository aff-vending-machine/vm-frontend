<!-- View -->
<script lang="ts">
  import { onMount } from 'svelte';

  // core
  import { MachineSlot, MachineSlotState, MachineState, provideMachineBloc } from '@apps/core';
  import { provideMachineSlotBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';

  // components
  import Overlay from './Overlay.svelte';
  import { each } from 'svelte/internal';
  import Toggle from '~/ui/components/forms/toggles/Toggle.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';

  export let id: string;

  let machineId = parseInt(id, 10);

  let rows = 0;
  let cols = 0;

  const mbloc = provideMachineBloc();
  const mstate = useBlocState<MachineState>(mbloc);

  const bloc = provideMachineSlotBloc();
  const state = useBlocState<MachineSlotState>(bloc);

  onMount(() => {
    mbloc.view(machineId);
    bloc.list(machineId);

    if ($state.kind === 'load-success') {
      let maxCol = 0;
      let maxRow = 0;
      let colIdx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      $state.list.forEach(slots => {
        let index = parseInt(slots.code[1], 10);
        colIdx[index]++;
        if (maxCol < colIdx[index]) {
          maxCol = colIdx[index];
        }
        if (maxRow < index) {
          maxRow = index;
        }
      });

      rows = maxRow;
      cols = maxCol;
    }
  });

  $: handleChangeFilter = () => {
    bloc.list(machineId);
  };

  $: fill = (slots: MachineSlot[]): MachineSlot[][] => {
    let newSlots = [];

    for (let r = 0; r < 10; r++) {
      newSlots[r] = [];
      for (let c = 0; c < 10; c++) {
        let slot = slots.find(s => s.code === '0' + r + c);
        if (slot === undefined) {
          newSlots[r].push(null);
        } else {
          newSlots[r].push(slot);
        }
      }
    }

    return newSlots;
  };

  $: minus = (slot: MachineSlot) => () => {
    let idx = $state.list.findIndex(s => s.id === slot.id);

    if ($state.list[idx].stock > 0) {
      $state.list[idx].stock = $state.list[idx].stock - 1;
    }
  };

  $: plus = (slot: MachineSlot) => () => {
    let idx = $state.list.findIndex(s => s.id === slot.id);

    if ($state.list[idx].stock < $state.list[idx].capacity) {
      $state.list[idx].stock = $state.list[idx].stock + 1;
    }
  };

  $: disable = (slot: MachineSlot) => () => {
    let idx = $state.list.findIndex(s => s.id === slot.id);
    $state.list[idx].is_enable = false;
  }

  $: update = () => {

  }

  $: reset = () => {
    
  }

</script>

<!-- HTML -->
<section class="mx-4">
  <div class="w-full bg-white rounded-xl shadow-xl shadow-primary-100 space-y-4 py-4">
    <div class="px-8 pt-4">
      {#if $state.kind === 'load-success'}
        <h4 class="text-xl font-semibold text-gray-700">Machine: {$mstate.data.serial_number}</h4>
      {/if}
    </div>
    <div class="px-8 pt-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" on:click={update}>SAVE</button>
      <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" on:click={reset}>CANCEL</button>
    </div>
    <div class="border-t border-b border-gray-300 p-4">
      {#if $state.kind === 'load-in-progress'}
        <div class="w-full">
          <!-- <TableLoader /> -->
        </div>
      {:else if $state.kind === 'load-success'}
        <div class=" overflow-x-auto">
          <div class="flex flex-col space-y-4">
            {#each fill($state.list) as slots}
              <div class="flex flex-row space-x-4">
                {#each slots as slot}
                  {#if slot === null}
                    <div />
                  {:else}
                    <div class="flex flex-col border border-blue-500 rounded-md justify-center items-center px-4">
                      <div class="font-bold">Slot no. {slot.code}</div>
                      <div class="text-xs py-2">{slot.product.name}</div>
                      <div class="text-xs py-2">Status
                        <Toggle class="inline-block" id={slot.code} text="" checked on:change={disable(slot)}/>
                      </div>
                      <div class="text-xs text-center">
                        Price: <input type ="number" min="0" class=" text-xs bg-gray-200 text-center rounded-[10px] w-16" value={slot.product.price}/>
                      </div>
                      <div class="mt-2">{slot.stock}/{slot.capacity}</div>
                      <div class="mx-4 py-1">
                        <button class="bg-gray-300 px-3 py-2  text-center 
                        text-xs font-medium text-white hover:bg-gray-300" on:click={minus(slot)}>-</button>
                        <button class="bg-gray-300 px-3 py-2 text-center 
                        text-xs font-medium text-white hover:bg-gray-300 " on:click={plus(slot)}>+</button>
                      </div>
                    </div>
                  {/if}
                {/each}
              </div>
            {/each}
          </div>
        </div>
      {:else if $state.kind === 'load-failure'}
        <div class="text-center">Something Wrong! ({$state.error?.message})</div>
      {/if}
    </div>
  </div>
</section>

<!-- Modal -->
<Overlay on:reload={handleChangeFilter} />

<!-- style -->
<style lang="scss">
</style>
