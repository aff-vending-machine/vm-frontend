import { toDateTime } from "~/share";

export type Product = {
  id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  name: string;
  type: string;
  sku: string;
  price: number;
};

export type CreateProduct = {
  name: string;
  type: string;
  sku: string;
  price: number;
  barcode: string;
};

export type UpdateProduct = {
  name: string;
  type: string;
  sku: string;
  price: number;
  barcode: string;
};

export const parseProduct = (product: Product) => {
  product.created_at = toDateTime(product.created_at);
  product.updated_at = toDateTime(product.updated_at);

  return product;
};
