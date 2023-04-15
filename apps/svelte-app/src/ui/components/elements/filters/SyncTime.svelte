<!-- SyncTime -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

  // components
  import IconButton from '~/ui/components/elements/buttons/IconButton.svelte';

  export let id: UniqueID;
  export let time: Date;

  dayjs.extend(relativeTime);

  const dispatch = createEventDispatcher();

  const showTime = (date?: Date) => {
    if (!date) {
      return 'never';
    }

    return dayjs(date).fromNow();
  };

  const isDisable = (date?: Date) => {
    if (!date) return false;
    if (dayjs().isAfter(dayjs(date).add(4, 'minute'), 'minute')) return false;
    return true;
  };

  const handleSync = () => dispatch('sync', { id });
</script>

<!-- HTML -->
<div class="flex flex-col space-y-2">
  <span class="text-xs font-semibold">Sync</span>
  <div class="block">
    <IconButton i="sync" disabled={isDisable(time)} on:click={handleSync}>Sync</IconButton>
  </div>
  <span class="text-xs">Last time: {showTime(time)}</span>
</div>

<!-- style -->
<style lang="scss">
</style>
