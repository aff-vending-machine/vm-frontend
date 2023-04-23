import { toDateTime } from "~/share";

export type Product = {
  id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  sku: string;
  name: string;
  type: string;
  image_url: string;
  price: number;
};

export type CreateProduct = {
  sku: string;
  name: string;
  type: string;
  image_url: string;
  price: number;
};

export type UpdateProduct = {
  name: string;
  type: string;
  image_url: string;
  price: number;
};

export const parseProduct = (product: Product) => {
  product.created_at = toDateTime(product.created_at);
  product.updated_at = toDateTime(product.updated_at);

  return product;
};
