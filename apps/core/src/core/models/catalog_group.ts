import { toDateTime } from "~/utils";
import { CatalogProduct } from "./catalog_product";

export type CatalogGroup = {
  id: UniqueID;
  products: CatalogProduct[];
  created_at: DateTime;
  updated_at: DateTime;
  name: string;
  description: string;
  is_enable: boolean;
};

export type CreateCatalogGroup = {
  name: string;
  description: string;
  is_enable: boolean;
};

export type UpdateCatalogGroup = {
  name?: string;
  description?: string;
  is_enable?: boolean;
};

export const parseCatalogGroup = (group: CatalogGroup) => {
  group.created_at = toDateTime(group.created_at);
  group.updated_at = toDateTime(group.updated_at);

  return group;
};
