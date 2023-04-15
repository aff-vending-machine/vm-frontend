import { BulkUpdateMachineSlot, CreateMachineSlot, MachineSlot, UpdateMachineSlot } from '..';

export type MachineSlotDataInterface = {
  count(machineID: UniqueID, query?: Record<string, string>): Promise<number>;
  find(machineID: UniqueID, query?: Record<string, string>): Promise<MachineSlot[]>;
  findByID(machineID: UniqueID, id: UniqueID): Promise<MachineSlot>;
  create(machineID: UniqueID, payload: CreateMachineSlot): Promise<void>;
  updateByID(machineID: UniqueID, id: UniqueID, payload: UpdateMachineSlot): Promise<void>;
  deleteByID(machineID: UniqueID, id: UniqueID): Promise<void>;
  bulkUpdate(machineID: UniqueID, payload: BulkUpdateMachineSlot): Promise<void>;
};
