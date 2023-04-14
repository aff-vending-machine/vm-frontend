<!-- View -->
<script lang="ts">
  // core
  import type { MachineState } from '@apps/core';
  import { provideMachineBloc } from '@apps/core';
  import { useBlocState } from '~/share/hooks/useBlocState';
  import { modal } from '~/share/stores';

  // components
  import Notify from './Notify.svelte';
  import Table from './Table.svelte';

  const bloc = provideMachineBloc();
  const state = useBlocState<MachineState>(bloc);

  $: handleEvent = (e: CustomEvent) => modal.set(e.detail);
  $: handleReload = (e: CustomEvent) => bloc.list(e.detail);
</script>

<!-- HTML -->
<section class="mx-4 space-y-8">
  <Table state={$state} on:reload={handleReload} on:event={handleEvent} />
</section>

<!-- Overlay -->
<Notify />

<!-- style -->
<style lang="scss">
</style>
