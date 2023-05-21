import { APIService } from './api_service';
import { Client, handleResponse, handleError } from './supports';

export abstract class Base2ndAPIService<T> extends APIService {
  constructor(ROOT_PATH: string, private SUB_PATH: string) {
    super(ROOT_PATH);
  }

  async find(root_id: UniqueID, params?: Record<string, string>): Promise<T[]> {
    try {
      const { data } = await Client.getPrivate().get<APIProtocol<T[]>>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}`, { params });
      return handleResponse<T[]>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async count(root_id: UniqueID, params?: Record<string, string>): Promise<number> {
    try {
      const { data } = await Client.getPrivate().get<APIProtocol<number>>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}/count`, { params });
      return handleResponse<number>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async findByID(root_id: UniqueID, id: UniqueID): Promise<T> {
    try {
      const { data } = await Client.getPrivate().get<APIProtocol<T>>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}/${id}`);
      return handleResponse<T>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async create(root_id: UniqueID, payload: any): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async updateByID(root_id: UniqueID, id: UniqueID, payload: any): Promise<void> {
    try {
      const { data } = await Client.getPrivate().put<APIProtocol<void>>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}/${id}`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async deleteByID(root_id: UniqueID, id: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().delete<APIProtocol<void>>(`${this.ROOT_PATH}/${root_id}/${this.SUB_PATH}/${id}`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
