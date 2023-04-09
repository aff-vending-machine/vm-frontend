<!-- CreateButton -->
<script lang="ts">
  import Icon from '../icons/Icon.svelte';

  export let text: string;
  export let i: string = 'plus';
  export let disabled: boolean = false;
</script>

<!-- HTML -->
<button
  type="button"
  class={`inline-flex items-center gap-1.5 
    rounded-lg border border-secondary-100 bg-secondary-100 px-5 py-2 text-center text-xs font-medium text-secondary-600 transition-all
    hover:border-secondary-200 hover:bg-secondary-200 
    focus:ring-secondary-50 focus:ring 
    disabled:border-secondary-50 disabled:bg-secondary-50 disabled:text-secondary-400
  ${$$props.class}`}
  on:click|preventDefault|stopPropagation
  {disabled}
>
  <Icon {i} class="h-4 w-4 fill-secondary-600" />
  {text}
</button>
