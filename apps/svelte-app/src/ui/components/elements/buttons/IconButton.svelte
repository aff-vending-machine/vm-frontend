<!-- IconButton -->
<script lang="ts">
  import Icon from '../icons/Icon.svelte';

  export let i: string;
  export let color: string = 'primary';
  export let disabled: boolean = false;

  const getButtonColor = (color: string) => {
    switch (color) {
      case 'primary':
        return `
          border-primary-100 bg-primary-100 text-primary-600 
          hover:border-primary-200 hover:bg-primary-200
          focus:ring-primary-50
          disabled:border-primary-50 disabled:bg-primary-50 disabled:text-primary-400
        `;
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'primary':
        return 'fill-primary-600';
    }
  };
</script>

<!-- HTML -->
<button
  type="button"
  class={`inline-flex gap-1 rounded-lg border px-3 py-2 text-center text-xs font-medium transition-all focus:ring ${getButtonColor(
    color,
  )} ${$$props.class}`}
  on:click|preventDefault|stopPropagation
  {disabled}
>
  <Icon {i} class={`h-3 w-3 mt-0.5 ${getIconColor(color)}`} />
  <slot />
</button>
