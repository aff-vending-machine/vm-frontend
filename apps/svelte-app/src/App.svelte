<!-- App.svelte -->
<script lang="ts">
  import { Route, Router } from 'svelte-navigator';

  // pages
  import Admin from '~/ui/layouts/Admin.svelte';
  import Root from '~/ui/layouts/Root.svelte';
</script>

<!-- HTML -->
<Router>
  <Route path="admin/*" component={Admin} />
  <Route component={Root} />
</Router>

<!-- style -->
<style lang="scss">
</style>
