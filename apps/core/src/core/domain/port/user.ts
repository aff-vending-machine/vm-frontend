import { ChangePassword, ChangeRole, CreateUser, User } from '..';

export type UserDataInterface = {
  count(query?: Record<string, string>): Promise<number>;
  find(query?: Record<string, string>): Promise<User[]>;
  findByID(id: UniqueID): Promise<User>;
  create(payload: CreateUser): Promise<void>;
  changeRoleByID(id: UniqueID, payload: ChangeRole): Promise<void>;
  changePassword(payload: ChangePassword): Promise<void>;
  resetPasswordByID(id: UniqueID): Promise<void>;
  deleteByID(id: UniqueID): Promise<void>;
};
