<!-- CreateModal -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';

  // core
  import { modal } from '~/share/stores';

  // components
  import FormModal from '~/ui/components/overlays/modals/FormModal.svelte';
  import FormControl from '~/ui/components/forms/inputs/FormControl.svelte';
  import MessageError from '~/ui/components/forms/inputs/MessageError.svelte';
  import TextInput from '~/ui/components/forms/inputs/TextInput.svelte';
  import { permissionLevelOptions, permissionOptions } from '~/share/modules/options/permission';

  const formId = 'role-create-form';

  const role = field('role', '', [required()]);
  const permissions = field('permissions', getDefault(), []);
  const modalForm = form(role, permissions);

  function getDefault() {
    return permissionOptions.reduce((r, p) => ({ [p.toLowerCase()]: 0, ...r }), {});
  }

  const dispatch = createEventDispatcher();
  const handleCreate = async () => {
    try {
      await modalForm.validate();
      const data = modalForm.summary();

      if ($modalForm.errors.length == 0) {
        dispatch('create', data);
      }
    } catch (e) {
      console.log(e);
    }
  };
</script>

<!-- HTML -->

<FormModal {formId} show={$modal.event === 'create'} disabled={$modalForm.errors.length != 0}>
  <h3 class="text-lg font-medium text-primary-900 mb-4">Create Role</h3>
  <form id={formId} class="grid grid-cols-1 gap-4" on:submit|preventDefault={handleCreate}>
    <FormControl name="Role name" required>
      <TextInput name="Role name" maxlength={32} bind:value={$role.value} />
      <MessageError hasError={$modalForm.hasError('role.required')} message="The role name is required" />
    </FormControl>
    <FormControl name="Permissions">
      <div class="flex flex-col space-y-3 m-4">
        {#each permissionOptions as key}
          <div class="grid grid-cols-6 gap-6">
            <div>
              <b>{key}</b>
            </div>
            {#each permissionLevelOptions as level, value}
              <div class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  id={key + level}
                  name={key}
                  class="h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm cursor-pointer
                  focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 
                  disabled:cursor-not-allowed disabled:text-gray-400"
                  bind:group={$permissions.value[key.toLowerCase()]}
                  {value}
                />
                <label for={key + level} class="text-sm font-medium text-gray-700 pl-2 cursor-pointer">{level}</label>
              </div>
            {/each}
          </div>
        {/each}
      </div></FormControl
    >
  </form>
</FormModal>

<!-- style -->
<style lang="scss">
</style>
