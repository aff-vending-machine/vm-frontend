<!-- Sort -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  export let field: string;
  export let sort: string;

  const dispatch = createEventDispatcher();
  $: handleSortEvent = () => {
    if (sort != 'desc') {
      dispatch('sort', { field, sort: 'desc' });
    } else {
      dispatch('sort', { field, sort: 'asc' });
    }
  };
</script>

<!-- HTML -->
<button class="inline cursor-pointer" on:click={handleSortEvent}>
  <Icon i="sort" class="ml-1 h-3 w-3 fill-gray-700" />
</button>
