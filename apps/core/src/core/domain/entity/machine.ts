import { toAnyDateTime, toDateTime } from '~/share';
import { MachineSlot } from './machine_slot';
import { Branch } from './branch';

export type Machine = {
  id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  name: string;
  serial_number: string;
  location: string;
  type: string;
  vendor: string;
  status: string;
  sync_machine_time: AnyDateTime;
  sync_slot_time: AnyDateTime;
  sync_transaction_time: AnyDateTime;
  branch: Branch;
  slots: MachineSlot[];
};

export type CreateMachine = {
  branch_id: UniqueID;
  name: string;
  serial_number: string;
  location: string;
  type: string;
  vendor: string;
};

export type UpdateMachine = {
  branch_id: UniqueID;
  name: string;
  serial_number: string;
  location: string;
  type: string;
  vendor: string;
};

export type ChangeMachineStatus = {
  status: string;
};

export const parseMachine = (machine: Machine) => {
  machine.created_at = toDateTime(machine.created_at);
  machine.updated_at = toDateTime(machine.updated_at);
  machine.sync_machine_time = toAnyDateTime(machine.sync_machine_time);
  machine.sync_slot_time = toAnyDateTime(machine.sync_slot_time);
  machine.sync_transaction_time = toAnyDateTime(machine.sync_transaction_time);

  return machine;
};
