<!-- Root -->
<script lang="ts">
  import { Router, Route } from 'svelte-navigator';

  // pages
  import Home from '~/ui/pages/root/Home.svelte';
  import Login from '~/ui/pages/root/Login.svelte';
  import Logout from '~/ui/pages/root/Logout.svelte';
  import NotFound from '~/ui/pages/root/NotFound.svelte';
</script>

<!-- HTML -->
<Router>
  <Route path="/" component={Home} />
  <Route path="login" component={Login} />
  <Route path="logout" component={Logout} />
  <Route component={NotFound} />
</Router>

<!-- style -->
<style lang="scss">
</style>
