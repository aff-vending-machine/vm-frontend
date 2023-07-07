<!-- Command -->
<script lang="ts">
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import { createEventDispatcher } from 'svelte';
  import { _, locale } from 'svelte-i18n';
  import 'dayjs/locale/th'

  // components
  import Button from '~/ui/components/elements/buttons/Button.svelte';

  // props
  export let time: Date;
  export let isSynced: boolean;
  export let isEdited: boolean;
  export let loading: boolean;

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat)
  dayjs.tz.setDefault('Asia/Bangkok');

  // events
  const dispatch = createEventDispatcher();
  const handleRefresh = () => dispatch('refresh');
  const handleSave = () => dispatch('save');
  const handleCancel = () => dispatch('cancel');

  // helpers
  const showTime = (date?: Date) => {
    if (!date) return $_('field.never');
    return dayjs(date).locale($locale.split("-")[0]).fromNow();
  };
</script>

<!-- HTML -->
<div class="flex flex-col space-y-2">
  <span class="text-xs font-semibold">{$_('field.instructions')}</span>
  <div class="block space-x-2">
    <Button i="sync" disabled={!isSynced} {loading} on:click={handleRefresh}>{$_('button.refresh')}</Button>
    <Button i="save" disabled={!isEdited} {loading} on:click={handleSave}>{$_('button.save')}</Button>
    <Button i="cancel" disabled={!isEdited} {loading} on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
  <span class="text-xs">{$_('field.last-time-sync')}: {showTime(time)}</span>
</div>

<!-- style -->
<style lang="scss">
</style>
