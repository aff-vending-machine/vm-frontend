import { toCountQuery, toQuery } from '~/share';
import { CreateRole, Role, RoleDataInterface, UpdateRole, parseRole } from '..';

export class RoleUsecase {
  private data: RoleDataInterface;

  constructor(data: RoleDataInterface) {
    this.data = data;
  }

  async count(filter?: Record<string, any>): Promise<number> {
    try {
      const query = toCountQuery({ ...filter });
      const data = await this.data.count(query);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async get(id: UniqueID): Promise<Role> {
    try {
      const data = await this.data.findByID(id);
      const result = parseRole(data);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async list(filter?: Record<string, any>): Promise<Role[]> {
    try {
      const query = toQuery({ ...filter });
      const data = await this.data.find(query);
      const result = data.map(parseRole);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async create(payload: CreateRole): Promise<void> {
    try {
      await this.data.create(payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async update(id: UniqueID, payload: UpdateRole): Promise<void> {
    try {
      await this.data.updateByID(id, payload);

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
