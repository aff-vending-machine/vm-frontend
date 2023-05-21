import { toDateTime } from "~/utils";

export type AccountRole = {
  id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  name: string;
  permissions: Permission[];
};

export type Permission = {
  scope: string;
  level: number;
};

export type CreateAccountRole = {
  name: string;
  permissions: Permission[];
};

export type UpdateAccountRole = {
  permissions?: Permission[];
};

export const parseAccountRole = (role: AccountRole) => {
  role.created_at = toDateTime(role.created_at);
  role.updated_at = toDateTime(role.updated_at);

  return role;
};
