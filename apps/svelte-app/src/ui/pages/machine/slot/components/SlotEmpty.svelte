<!-- NoSlot -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // props
  export let code: string;
  export let isExist: boolean;

  // events
  const dispatch = createEventDispatcher();
  const handleCreateEvent = () => dispatch('create', { source: { code } });
</script>

<!-- HTML -->
<button
  class="flex flex-col items-center rounded-md p-2 w-32 h-36 border border-gray-300 bg-transaction"
  on:click={!isExist && handleCreateEvent}
>
  <div class="font-bold text-gray-300">{code}</div>
</button>

<!-- style -->
<style lang="scss">
</style>
