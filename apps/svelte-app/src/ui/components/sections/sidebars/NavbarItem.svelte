<!-- NavbarItem -->
<script lang="ts">
  import Icon from '~/ui/components/elements/icons/Icon.svelte';

  export let title: string;
  export let icon: string;
  export let href: string;

  const panelStyle = () => (location.pathname.includes(href) ? 'bg-primary-500' : '');
  const iconStyle = () => (location.pathname.includes(href) ? 'fill-white' : 'fill-black');
  const textStyle = () => (location.pathname.includes(href) ? 'text-white text-lg' : '');
</script>

<!-- HTML -->
<a
  class={`py-3 text-md my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors ${panelStyle()}`}
  {href}
>
  <div class="mr-2 flex items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
    <Icon class={`relative top-0 leading-normal h-5 w-5 ${iconStyle()}`} i={icon} />
  </div>
  <span class={`ml-1 duration-300 opacity-100 pointer-events-none ${textStyle()}`}>{title}</span>
</a>

<!-- style -->
<style lang="scss">
</style>
