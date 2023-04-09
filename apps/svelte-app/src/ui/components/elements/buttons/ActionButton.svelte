<!-- ActionButton -->
<script lang="ts">
  export let text: string;
  export let disabled: boolean = false;
</script>

<!-- HTML -->
<button
  type="button"
  class={`bg-white px-3 py-2 text-center 
  text-xs font-medium text-gray-500 hover:bg-gray-100 
  ${$$props.class}
  disabled:bg-gray-300 disabled:hover:text-gray-500 disabled:cursor-not-allowed`}
  on:click|preventDefault|stopPropagation
  {disabled}
>
  {text}
</button>
