import { CreateMachine, Machine, UpdateMachine } from '..';

export type MachineDataInterface = {
  count(query?: Record<string, string>): Promise<number>;
  find(query?: Record<string, string>): Promise<Machine[]>;
  findByID(id: UniqueID): Promise<Machine>;
  create(payload: CreateMachine): Promise<void>;
  updateByID(id: UniqueID, payload: UpdateMachine): Promise<void>;
  deleteByID(id: UniqueID): Promise<void>;
};
