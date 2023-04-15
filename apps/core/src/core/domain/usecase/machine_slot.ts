import { toCountQuery, toQuery } from '~/share';
import { BulkUpdateMachineSlot, CreateMachineSlot, MachineSlot, MachineSlotDataInterface, UpdateMachineSlot, parseMachineSlot } from '..';

export class MachineSlotUsecase {
  private data: MachineSlotDataInterface;

  constructor(data: MachineSlotDataInterface) {
    this.data = data;
  }

  async count(machineID: UniqueID, filter?: Record<string, any>): Promise<number> {
    try {
      const query = toCountQuery({ ...filter });
      const data = await this.data.count(machineID, query);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async get(machineID: UniqueID, id: UniqueID): Promise<MachineSlot> {
    try {
      const data = await this.data.findByID(machineID, id);
      const result = parseMachineSlot(data);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async list(machineID: UniqueID, filter?: Record<string, any>): Promise<MachineSlot[]> {
    try {
      const query = toQuery({ ...filter });
      const data = await this.data.find(machineID, query);
      const result = data.map(parseMachineSlot);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async create(machineID: UniqueID, payload: CreateMachineSlot): Promise<void> {
    try {
      await this.data.create(machineID, payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async update(machineID: UniqueID, id: UniqueID, payload: UpdateMachineSlot): Promise<void> {
    try {
      await this.data.updateByID(machineID, id, payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async delete(machineID: UniqueID, id: UniqueID): Promise<void> {
    try {
      await this.data.deleteByID(machineID, id);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async bulkUpdate(machineID: UniqueID, payload: BulkUpdateMachineSlot): Promise<void> {
    try {
      await this.data.bulkUpdate(machineID, payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}
