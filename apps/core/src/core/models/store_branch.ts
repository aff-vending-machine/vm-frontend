import { toDateTime } from "~/utils";

export type StoreBranch = {
    id: UniqueID;
    created_at: DateTime;
    updated_at: DateTime;
    name: string;
    location: string;
    is_enable: boolean;
};

export type CreateStoreBranch = {
    name: string;
    location: string;
    is_enable: boolean;
  };
  
  export type UpdateStoreBranch = {
    name?: string;
    location?: string;
    is_enable?: boolean;
  };
  
export const parseStoreBranch = (branch: StoreBranch) => {
  branch.created_at = toDateTime(branch.created_at);
  branch.updated_at = toDateTime(branch.updated_at);

  return branch;
};
