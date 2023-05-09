<script>
  import { createEventDispatcher } from 'svelte';

  export let disabled = false;
  export let loading = false;
  export let color = 'primary';
  export let outline = false;
  export let rounded = 'md';

  const dispatch = createEventDispatcher();

  const buttonClasses = () => {
    let classes = '';

    if (disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    } else if (loading) {
      classes += ' opacity-50 cursor-wait';
    } else {
      const bgColor = outline ? 'transparent' : color + '-500';
      const textColor = outline ? color + '-500' : 'white';

      classes += ` bg-${bgColor} hover:bg-${color}-700 text-${textColor} hover:text-white`;
      classes += ' hover:shadow';
      classes += ` border border-${color}-500 hover:border-${color}-700`;
      classes += ` rounded-${rounded}`;
      classes += ` active:bg-${color}-800 active:shadow-none`;
    }

    return classes;
  };

  const handleClick = () => {
    if (disabled || loading) {
      return;
    }

    // Call the click handler if it was passed in as a prop
    dispatch('click');
  };
</script>

<button
  class={`
    inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium outline-none
    disabled:opacity-50 disabled:cursor-not-allowed 
    ${buttonClasses()} ${$$props.class}
  `}
  disabled={disabled || loading}
  on:click={handleClick}
>
  {#if loading}
    <svg
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  {/if}

  <slot />
</button>
