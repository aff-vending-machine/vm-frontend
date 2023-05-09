import { toDateTime } from "~/share";

export type ProductGroup = {
  id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  name: string;
  type: string;
  active: boolean;
};

export type CreateProductGroup = {
  name: string;
  type: string;
  active: boolean;
};

export type UpdateProductGroup = {
  name: string;
  type: string;
  active: boolean;
};

export const parseProductGroup = (productGroup: ProductGroup) => {
  productGroup.created_at = toDateTime(productGroup.created_at);
  productGroup.updated_at = toDateTime(productGroup.updated_at);

  return productGroup;
};
