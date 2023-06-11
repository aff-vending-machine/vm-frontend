<!-- Creator -->
<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { field, form } from 'svelte-forms';
  import { matchField, required } from 'svelte-forms/validators';
  import { _ } from 'svelte-i18n';
  import { Unsubscriber } from 'svelte/store';

  import Button from '~/ui/components/elements/buttons/Button.svelte';
  import PasswordInputField from '~/ui/components/forms/input/PasswordInputField.svelte';
  import SelectField from '~/ui/components/forms/input/SelectField.svelte';
  import TextInputField from '~/ui/components/forms/input/TextInputField.svelte';
  import { SelectOptionsType } from '~/utils/types/options';

  export let branch: UniqueID;
  export let roleOptions: SelectOptionsType[];
  export let branchOptions: SelectOptionsType[];

  const dispatch = createEventDispatcher();

  const formID = 'user-creator-form';
  const username = field('username', '', [required()]);
  const password = field('password', '', [required()]);
  const confirmed = field('confirmed', '', [required(), matchField(password)]);
  const roleID = field('role_id', roleOptions[0].value, [required()]);
  const branchID = field('branch_id', getCurrentBranchID(branch), [required()]);
  const userForm = form(username, password, confirmed, roleID, branchID);

  async function handleSubmit() {
    await userForm.validate();
    if ($userForm.valid) {
      dispatch('create', userForm.summary());
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }

  function getCurrentBranchID(id: UniqueID) {
    const index = branchOptions.findIndex(opts => opts.value === id);
    if (index !== -1) return index;
    return 0;
  }

  function getBranchOptions(rid: UniqueID, options: SelectOptionsType[]) {
    if (isAdminRole(rid)) {
      return [{ value: 0, label: 'All Branches' }, ...options];
    }

    return options;
  }

  function isAdminRole(rid: UniqueID) {
    const role = roleOptions.find(opts => opts.value === rid);
    if (!role) {
      return false;
    }

    return role.label === 'admin' || role.label === 'super-admin';
  }

  var unsub: Unsubscriber;
  onMount(() => {
    unsub = roleID.subscribe(role => {
      if (isAdminRole(role.value)) {
        branchID.set(0);
      } else if ($branchID.value === 0) {
        branchID.set(branchOptions[0].value);
      }
    });
  });

  onDestroy(() => {
    if (unsub) {
      unsub();
    }
  });
</script>

<div class="h-full overflow-y-auto mr-2" style="z-index: 999;">
  <h2 class="text-xl font-bold mb-4">Add User: {$username.value || 'Untitled'}</h2>
  <form
    id={formID}
    on:submit|preventDefault={handleSubmit}
    class="space-y-4 p-2 border border-gray-200 rounded-md text-sm"
  >
    <TextInputField id="username" label="Name" bind:value={$username.value} error={$username.errors?.at(0)} />
    <PasswordInputField id="password" label="Password" bind:value={$password.value} error={$password.errors?.at(0)} />
    <PasswordInputField
      id="confirmed"
      label="Confirmed Password"
      bind:value={$confirmed.value}
      error={$confirmed.errors?.at(0)}
    />
    <SelectField
      id="role_id"
      label="Role"
      bind:value={$roleID.value}
      error={$roleID.errors?.at(0)}
      options={roleOptions}
      unselected={false}
    />
    <SelectField
      id="branch_id"
      label="Branch"
      bind:value={$branchID.value}
      error={$branchID.errors?.at(0)}
      options={getBranchOptions($roleID.value, branchOptions)}
      unselected={false}
      hidden={isAdminRole($roleID.value)}
    />
  </form>

  <div class="flex justify-end space-x-4 mt-4">
    <Button color="secondary" type="submit" form={formID}>{$_('button.add-user')}</Button>
    <Button color="warning" outline on:click={handleCancel}>{$_('button.cancel')}</Button>
  </div>
</div>
