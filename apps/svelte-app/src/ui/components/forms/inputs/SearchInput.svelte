<!-- SearchInput -->
<script lang="ts">
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  export let value: string;
  export let placeholder = 'Type here...';
  export let disabled = false;
</script>

<!-- HTML -->
<div class={`relative flex flex-wrap items-stretch transition-all rounded-lg w-full ${$$props.class}`}>
  <span
    class="text-sm absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all"
  >
    <Icon i="search" class="fill-gray-500 w-4 h-4" />
  </span>
  <input
    type="text"
    class="pl-9 text-xs leading-5 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-1.5 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:transition-shadow"
    {placeholder}
    bind:value
    {disabled}
    on:change
  />
</div>

<!-- style -->
<style lang="scss">
</style>
