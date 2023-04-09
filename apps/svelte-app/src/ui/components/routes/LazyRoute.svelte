<!-- LazyRoute.svelte -->
<script>
  import { Route } from 'svelte-navigator';
  import Lazy from './Lazy.svelte';

  export let component;
  export let delayMs = null;

  let props;
  $: {
    const { component, ...restProps } = $$props;
    props = restProps;

    // avoid unused vars
    component;
  }
</script>

<Route {...props}>
  <Lazy {component} {delayMs}>
    <slot />
  </Lazy>
</Route>
