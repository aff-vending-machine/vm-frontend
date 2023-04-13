import { handleError, handleResponse, privateClient } from '~/share';
import { Transaction, TransactionDataInterface } from '~/core/domain';

const ROOT_PATH = 'transactions';

export class TransactionRepository implements TransactionDataInterface {
  async find(params?: Record<string, string>): Promise<Transaction[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<Transaction[]>>(`${ROOT_PATH}`, { params });
      return handleResponse<Transaction[]>(data);
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

  async findByID(id: UniqueID): Promise<Transaction> {
    try {
      const { data } = await privateClient.get<APIProtocol<Transaction>>(`${ROOT_PATH}/${id}`);
      return handleResponse<Transaction>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async doneByID(id: UniqueID): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}/${id}`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async cancelByID(id: UniqueID): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}/${id}`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
