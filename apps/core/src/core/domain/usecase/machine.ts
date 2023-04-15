import { toCountQuery, toQuery } from '~/share';
import { CreateMachine, Machine, MachineDataInterface, UpdateMachine, parseMachine } from '..';

export class MachineUsecase {
  private data: MachineDataInterface;

  constructor(data: MachineDataInterface) {
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

  async get(id: UniqueID): Promise<Machine> {
    try {
      const data = await this.data.findByID(id);
      const result = parseMachine(data);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async list(filter?: Record<string, any>): Promise<Machine[]> {
    try {
      const query = toQuery({ ...filter });
      const data = await this.data.find(query);
      const result = data.map(parseMachine);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async create(payload: CreateMachine): Promise<void> {
    try {
      await this.data.create(payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async update(id: UniqueID, payload: UpdateMachine): Promise<void> {
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
