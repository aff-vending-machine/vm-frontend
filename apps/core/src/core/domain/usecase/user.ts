import { toQuery } from '~/share';
import { ChangePassword, ChangeRole, CreateUser, User, UserDataInterface, parseUser } from '..';

export class UserUsecase {
  private data: UserDataInterface;

  constructor(data: UserDataInterface) {
    this.data = data;
  }

  async count(filter?: Record<string, any>): Promise<number> {
    try {
      const query = toQuery({ ...filter });
      const data = await this.data.count(query);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async get(id: UniqueID): Promise<User> {
    try {
      const data = await this.data.findByID(id);
      const result = parseUser(data);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async list(filter?: Record<string, any>): Promise<User[]> {
    try {
      const query = toQuery({ ...filter });
      const data = await this.data.find(query);
      const result = data.map(parseUser);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async create(payload: CreateUser): Promise<void> {
    try {
      await this.data.create(payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async changeRole(id: UniqueID, payload: ChangeRole): Promise<void> {
    try {
      await this.data.changeRoleByID(id, payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async changePassword(payload: ChangePassword): Promise<void> {
    try {
      await this.data.changePassword(payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async resetPassword(id: UniqueID): Promise<void> {
    try {
      await this.data.resetPasswordByID(id);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async delete(id: UniqueID): Promise<void> {
    try {
      await this.data.deleteByID(id);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}
