import { toDateTime } from '~/share';
import { Product } from './product';

export type MachineSlot = {
  id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  machine_id: UniqueID;
  product_id: UniqueID;
  code: string;
  stock: number;
  capacity: number;
  product: Product;
  is_enable: boolean;
};

export type CreateMachineSlot = {
  product_id: UniqueID;
  code: string;
  stock: number;
  capacity: number;
};

export type UpdateMachineSlot = {
  product_id?: UniqueID;
  stock?: number;
  capacity?: number;
  is_enable?: boolean;
};

export type BulkUpdateMachineSlot = {
  id?: UniqueID;
  product_id?: UniqueID;
  stock?: number;
  capacity?: number;
  is_enable?: boolean;
}[];

export const parseMachineSlot = (slot: MachineSlot) => {
  slot.created_at = toDateTime(slot.created_at);
  slot.updated_at = toDateTime(slot.updated_at);

  return slot;
};
