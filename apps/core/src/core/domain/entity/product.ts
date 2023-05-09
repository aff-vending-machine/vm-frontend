import { toDateTime } from "~/share";
import { ProductGroup } from "./product_group";

export type Product = {
  id: UniqueID;
  group_id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  sku: string;
  name: string;
  image_url: string;
  price: number;
  active: boolean;
  group: ProductGroup;
};

export type CreateProduct = {
  group_id: UniqueID;
  sku: string;
  name: string;
  image_url: string;
  price: number;
  active: boolean;
};

export type UpdateProduct = {
  group_id: UniqueID;
  name: string;
  image_url: string;
  price: number;
  active: boolean;
};

export const parseProduct = (product: Product) => {
  product.created_at = toDateTime(product.created_at);
  product.updated_at = toDateTime(product.updated_at);

  return product;
};
