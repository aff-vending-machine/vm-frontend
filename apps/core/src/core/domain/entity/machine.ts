import { toAnyDateTime, toDateTime } from '~/share';
import { MachineSlot } from './machine_slot';

export type Machine = {
  id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  name: string;
  serial_number: string;
  location: string;
  type: string;
  vendor: string;
  slots: MachineSlot[];
  status: string;
  last_active_time: AnyDateTime;
  last_maintenance_time: AnyDateTime;
};

export type CreateMachine = {
  name: string;
  serial_number: string;
  location: string;
  type: string;
  vendor: string;
};

export type UpdateMachine = {
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
  machine.last_active_time = toAnyDateTime(machine.last_active_time);
  machine.last_maintenance_time = toAnyDateTime(machine.last_maintenance_time);

  return machine;
};
