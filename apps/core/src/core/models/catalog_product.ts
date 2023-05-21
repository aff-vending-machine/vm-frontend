import { toDateTime } from "~/utils";
import { CatalogGroup } from "./catalog_group";

export type CatalogProduct = {
  id: UniqueID;
  group_id: UniqueID;
  group: CatalogGroup;
  created_at: DateTime;
  updated_at: DateTime;
  sku: string;
  name: string;
  description: string;
  image_url: string;
  barcode: string;
  product_price: number;
  sale_price: number;
  is_enable: boolean;
};

export type CreateProduct = {
  group_id: UniqueID;
  sku: string;
  name: string;
  description: string;
  image_url: string;
  barcode: string;
  product_price: number;
  sale_price: number;
  is_enable: boolean;
};

export type UpdateProduct = {
  group_id?: UniqueID;
  name?: string;
  description?: string;
  image_url?: string;
  barcode?: string;
  product_price?: number;
  sale_price?: number;
  is_enable?: boolean;
};

export const parseCatalogProduct = (product: CatalogProduct) => {
  product.created_at = toDateTime(product.created_at);
  product.updated_at = toDateTime(product.updated_at);

  return product;
};
