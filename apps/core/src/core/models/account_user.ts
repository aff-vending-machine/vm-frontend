import { toDateTime, toAnyDateTime } from '~/utils';
import { StoreBranch } from './store_branch';
import { AccountRole } from './account_role';

export type AccountUser = {
  id: UniqueID;
  branch?: StoreBranch;
  branch_id?: UniqueID;
  role: AccountRole;
  role_id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  username: string;
  created_by: string;
  last_login?: AnyDateTime;
};

export type CreateAccountUser = {
  branch_id?: UniqueID;
  role_id: UniqueID;
  username: string;
  password: string;
};

export type ChangeRole = {
  id: UniqueID;
};

export type ChangePassword = {
  old_password: string;
  new_password: string;
};

export const parseAccountUser = (user: AccountUser) => {
  user.created_at = toDateTime(user.created_at);
  user.updated_at = toDateTime(user.updated_at);
  user.last_login = toAnyDateTime(user.last_login);

  return user;
};
