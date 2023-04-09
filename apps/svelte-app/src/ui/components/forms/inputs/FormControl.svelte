<!-- FormControl -->
<script lang="ts">
  export let name: string;
  export let required = false;
</script>

<!-- HTML -->
<div class="mx-auto w-full">
  <div>
    <label
      for={name}
      class={`mb-1 block text-sm font-medium text-gray-700 ${
        required ? "after:ml-0.5 after:text-danger-500 after:content-['*']" : ''
      }`}
    >
      {name}
      <sapn class="text-xs font-normal text-gray-400">{required ? '' : '(optional)'}</sapn>
    </label>
    <div class={$$props.class}>
      <slot />
    </div>
  </div>
</div>

<!-- style -->
<style lang="scss">
</style>
