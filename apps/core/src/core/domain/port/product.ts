import { CreateProduct, Product, UpdateProduct } from '..';

export type ProductDataInterface = {
  count(query?: Record<string, string>): Promise<number>;
  find(query?: Record<string, string>): Promise<Product[]>;
  findByID(id: UniqueID): Promise<Product>;
  create(payload: CreateProduct): Promise<void>;
  updateByID(id: UniqueID, payload: UpdateProduct): Promise<void>;
  deleteByID(id: UniqueID): Promise<void>;
};
