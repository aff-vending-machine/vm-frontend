import { toDateTime, toAnyDateTime } from '~/share';

export type User = {
  id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  username: string;
  role: string;
  created_by: string;
  last_login?: AnyDateTime;
};

export type CreateUser = {
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

export const parseUser = (user: User) => {
  user.created_at = toDateTime(user.created_at);
  user.updated_at = toDateTime(user.updated_at);
  user.last_login = toAnyDateTime(user.last_login);

  return user;
};
