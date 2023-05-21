<!-- Tooltip.svelte -->
<script lang="ts">
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css';
  import 'tippy.js/themes/light.css';

  export let content: string;

  let tooltip;

  function createTooltip() {
    tooltip = tippy('.tooltip', {
      content,
      theme: 'light',
    });
  }

  function destroyTooltip() {
    if (tooltip) {
      tooltip.destroy();
      tooltip = null;
    }
  }

  $: {
    destroyTooltip();
    createTooltip();
  }
</script>

<span class="tooltip" aria-label={content} data-tippy-duration="200" data-tippy-placement="bottom">
  <slot />
</span>
