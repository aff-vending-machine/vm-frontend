import { CreateRole, Role, UpdateRole } from '..';

export type RoleDataInterface = {
  count(query?: Record<string, string>): Promise<number>;
  find(query?: Record<string, string>): Promise<Role[]>;
  findByID(id: UniqueID): Promise<Role>;
  create(payload: CreateRole): Promise<void>;
  updateByID(id: UniqueID, payload: UpdateRole): Promise<void>;
  deleteByID(id: UniqueID): Promise<void>;
};
