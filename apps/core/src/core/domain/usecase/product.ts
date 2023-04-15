import { toCountQuery, toQuery } from '~/share';
import { CreateProduct, Product, ProductDataInterface, UpdateProduct, parseProduct } from '..';

export class ProductUsecase {
  private data: ProductDataInterface;

  constructor(data: ProductDataInterface) {
    this.data = data;
  }

  async count(filter?: Record<string, any>): Promise<number> {
    try {
      const query = toCountQuery({ ...filter });
      const data = await this.data.count(query);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async get(id: UniqueID): Promise<Product> {
    try {
      const data = await this.data.findByID(id);
      const result = parseProduct(data);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async list(filter?: Record<string, any>): Promise<Product[]> {
    try {
      const query = toQuery({ ...filter });
      const data = await this.data.find(query);
      const result = data.map(parseProduct);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async create(payload: CreateProduct): Promise<void> {
    try {
      await this.data.create(payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async update(id: UniqueID, payload: UpdateProduct): Promise<void> {
    try {
      await this.data.updateByID(id, payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async delete(id: UniqueID): Promise<void> {
    try {
      await this.data.deleteByID(id);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}
