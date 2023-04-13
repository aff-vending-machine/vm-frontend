import { handleError, handleResponse, privateClient } from '~/share';
import { CreateProduct, Product, ProductDataInterface, UpdateProduct } from '~/core/domain';

const ROOT_PATH = 'products';

export class ProductRepository implements ProductDataInterface {
  async find(params?: Record<string, string>): Promise<Product[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<Product[]>>(`${ROOT_PATH}`, { params });
      return handleResponse<Product[]>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
  
  async count(params?: Record<string, string>): Promise<number> {
    try {
      const { data } = await privateClient.get<APIProtocol<number>>(`${ROOT_PATH}/count`, { params });
      return handleResponse<number>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async findByID(id: UniqueID): Promise<Product> {
    try {
      const { data } = await privateClient.get<APIProtocol<Product>>(`${ROOT_PATH}/${id}`);
      return handleResponse<Product>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async create(payload: CreateProduct): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async updateByID(id: UniqueID, payload: UpdateProduct): Promise<void> {
    try {
      const { data } = await privateClient.put<APIProtocol<void>>(`${ROOT_PATH}/${id}`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async deleteByID(id: UniqueID): Promise<void> {
    try {
      const { data } = await privateClient.delete<APIProtocol<void>>(`${ROOT_PATH}/${id}`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
