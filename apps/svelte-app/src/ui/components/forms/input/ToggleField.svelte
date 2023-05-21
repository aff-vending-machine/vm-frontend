<script lang="ts">
  export let id: string;
  export let label: string;
  export let labelOn: string = 'Enable';
  export let labelOff: string = 'Disable';
  export let value: boolean;
  export let disabled: boolean = false;
</script>

<div>
  <span class="block mb-1 text-sm font-medium">{label}:</span>
  <label for={id}>
    <input
      type="checkbox"
      {id}
      {disabled}
      name={id}
      bind:checked={value}
      on:change
      class="w-4 h-4 border border-gray-300 rounded focus:ring-indigo-500 text-indigo-600"
    />
    <span class="ml-2 text-sm">{value ? labelOn : labelOff}</span>
  </label>
</div>
