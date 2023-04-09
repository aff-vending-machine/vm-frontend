<!-- Dropdown -->
<script lang="ts">
  // core
  import { clickOutside } from '~/share/hooks/useClickOutside';
  import { access, modal } from '~/share/stores';
  import Icon from '~/ui/components/elements/icons/Icon.svelte';
  import Overlay from './Overlay.svelte';

  export let show = false;

  $: handleClickOutside = () => {
    show = false;
  };

  $: handleChangePassword = (id: UniqueID) => async () => {
    show = false;
    modal.update(m => ({ ...m, event: 'change-password', id }));
  };
</script>

<!-- HTML -->
{#if show}
  <div
    use:clickOutside
    on:click-outside={handleClickOutside}
    class="absolute right-0 z-10 mt-2 w-60 rounded-lg border border-gray-100 bg-white text-left text-sm shadow-lg animate-slide-down"
  >
    <div class="py-3 px-4">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            <Icon i="user" class="h-1/2 w-1/2 fill-gray-700" />
          </div>
          <span class="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-green-400 ring ring-white" />
        </div>
        <div class="text-sm ml-2">
          <div class="font-medium text-gray-700">{$access.sub}</div>
          <div class="text-gray-400">{$access.role}</div>
        </div>
      </div>
    </div>
    <div class="p-1">
      <button
        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
        on:click={handleChangePassword(0)}
      >
        <Icon class="h-4 w-4 fill-slate-500" i="key" />
        Change Password
      </button>
    </div>
    <div class="p-1">
      <a href="/logout" class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
        <Icon class="h-4 w-4 fill-slate-500" i="logout" />
        Log out
      </a>
    </div>
  </div>
{/if}

<!-- Modal -->
<Overlay />

<!-- style -->
<style lang="scss">
</style>
