import { toAnyDateTime, toDateTime } from '~/utils';
import { MachineSlot } from './machine_slot';
import { StoreBranch } from './store_branch';

export type Machine = {
  id: UniqueID;
  branch_id: UniqueID;
  branch: StoreBranch;
  slots: MachineSlot[];
  created_at: DateTime;
  updated_at: DateTime;
  name: string;
  serial_number: string;
  location: string;
  type: string;
  vendor: string;
  status: string;
  register_count: number;
  sync_time: AnyDateTime;
  sync_slot_time: AnyDateTime;
  sync_channel_time: AnyDateTime;
  sync_transaction_time: AnyDateTime;
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
  branch_id?: UniqueID;
  name?: string;
  location?: string;
  type?: string;
  vendor?: string;
};

export type ChangeMachineStatus = {
  status: string;
};

export const parseMachine = (machine: Machine) => {
  machine.created_at = toDateTime(machine.created_at);
  machine.updated_at = toDateTime(machine.updated_at);
  machine.sync_time = toAnyDateTime(machine.sync_time);
  machine.sync_slot_time = toAnyDateTime(machine.sync_slot_time);
  machine.sync_channel_time = toAnyDateTime(machine.sync_channel_time);
  machine.sync_transaction_time = toAnyDateTime(machine.sync_transaction_time);

  return machine;
};
