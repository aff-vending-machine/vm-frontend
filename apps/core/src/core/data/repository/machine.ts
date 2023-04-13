import { handleError, handleResponse, privateClient } from '~/share';
import { CreateMachine, Machine, MachineDataInterface, UpdateMachine } from '~/core/domain';

const ROOT_PATH = 'machines';

export class MachineRepository implements MachineDataInterface {
  async find(params?: Record<string, string>): Promise<Machine[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<Machine[]>>(`${ROOT_PATH}`, { params });
      return handleResponse<Machine[]>(data);
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

  async findByID(id: UniqueID): Promise<Machine> {
    try {
      const { data } = await privateClient.get<APIProtocol<Machine>>(`${ROOT_PATH}/${id}`);
      return handleResponse<Machine>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async create(payload: CreateMachine): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async updateByID(id: UniqueID, payload: UpdateMachine): Promise<void> {
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
