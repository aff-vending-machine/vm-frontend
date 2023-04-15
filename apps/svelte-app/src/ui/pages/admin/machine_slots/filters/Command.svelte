<!-- Filter -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

  // components
  import IconButton from '~/ui/components/elements/buttons/IconButton.svelte';

  // props
  export let time: Date;
  export let isSynced: boolean;
  export let isEdited: boolean;

  dayjs.extend(relativeTime);

  // events
  const dispatch = createEventDispatcher();
  const handleFetch = () => dispatch('fetch');
  const handleSave = () => dispatch('save');
  const handleCancel = () => dispatch('cancel');
  const handleCreate = () => dispatch('create');

  // helpers
  const showTime = (date?: Date) => {
    if (!date) return 'never';
    return dayjs(date).fromNow();
  };
</script>

<!-- HTML -->
<div class="flex flex-col space-y-2">
  <span class="text-xs font-semibold">Instructions</span>
  <div class="block">
    <IconButton i="sync" disabled={!isSynced} on:click={handleFetch}>Fetch</IconButton>
    <IconButton i="save" disabled={!isEdited} on:click={handleSave}>Save</IconButton>
    <IconButton i="cancel" disabled={!isEdited} on:click={handleCancel}>Cancel</IconButton>
    <IconButton i="plus" on:click={handleCreate}>Create</IconButton>
  </div>
  <span class="text-xs">Last time sync: {showTime(time)}</span>
</div>

<!-- style -->
<style lang="scss">
</style>
