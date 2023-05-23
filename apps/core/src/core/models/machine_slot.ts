import { toDateTime } from '~/utils';
import { CatalogProduct } from './catalog_product';

export type MachineSlot = {
  id: UniqueID;
  machine_id: UniqueID;
  product_id: UniqueID;
  product: CatalogProduct;
  created_at: DateTime;
  updated_at: DateTime;
  code: string;
  stock: number;
  capacity: number;
  is_enable: boolean;
};

export type CreateMachineSlot = {
  product_id: UniqueID;
  code: string;
  stock: number;
  capacity: number;
  is_enable: boolean;
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
  catalog_product_id?: UniqueID;
  stock?: number;
  capacity?: number;
  is_enable?: boolean;
}[];

export const parseMachineSlot = (slot: MachineSlot) => {
  slot.created_at = toDateTime(slot.created_at);
  slot.updated_at = toDateTime(slot.updated_at);

  return slot;
};
