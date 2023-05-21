import { toDateTime, toAnyDateTime } from '~/utils';

export type AccountUser = {
  id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  username: string;
  role: string;
  created_by: string;
  last_login?: AnyDateTime;
};

export type CreateAccountUser = {
  username: string;
  role: string;
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
