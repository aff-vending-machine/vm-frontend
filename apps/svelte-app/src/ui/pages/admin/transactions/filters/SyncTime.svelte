<!-- SyncTime -->
<script lang="ts">
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

  // components
  import IconButton from '~/ui/components/elements/buttons/IconButton.svelte';
  import Slot from './Slot.svelte';

  export let time: Date;

  dayjs.extend(relativeTime);

  const showTime = (date?: Date) => {
    if (!date) {
      return 'never';
    }

    return dayjs(date).fromNow();
  };

  const isDisable = (date?: Date) => {
    if (!date) return false;
    if (dayjs().isAfter(dayjs(date).add(5, 'minute'), 'minute')) return false;
    return true;
  };

  const handleSync = () => {};
</script>

<!-- HTML -->
<Slot title="Sync" desc={'Last time: ' + showTime(time)}>
  <div class="block">
    <IconButton i="sync" disabled={isDisable(time)} on:click={handleSync}>Sync</IconButton>
  </div>
</Slot>

<!-- style -->
<style lang="scss">
</style>
