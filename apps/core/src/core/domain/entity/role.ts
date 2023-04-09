import { toDateTime } from "~/share";

export type Role = {
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

export type CreateRole = {
  name: string;
  permissions: Permission[];
};

export type UpdateRole = {
  permissions: Permission[];
};

export type DeleteRole = {
  name: string;
};

export const parseRole = (role: Role) => {
  role.created_at = toDateTime(role.created_at);
  role.updated_at = toDateTime(role.updated_at);

  return role;
};
