<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';

  export let to = '';

  let timeoutId: number;

  onMount(() => {
    timeoutId = setTimeout(() => {
      navigate(to, { replace: true });
    }, 1000); // a second delay
    
  });

  onDestroy(() => {
    clearTimeout(timeoutId);
  })
</script>