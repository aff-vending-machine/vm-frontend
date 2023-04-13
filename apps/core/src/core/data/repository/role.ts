import { handleError, handleResponse, privateClient } from '~/share';
import { CreateRole, Role, RoleDataInterface, UpdateRole } from '~/core/domain';

const ROOT_PATH = 'roles';

export class RoleRepository implements RoleDataInterface {
  async find(params?: Record<string, string>): Promise<Role[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<Role[]>>(`${ROOT_PATH}`, { params });
      return handleResponse<Role[]>(data);
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

  async findByID(id: UniqueID): Promise<Role> {
    try {
      const { data } = await privateClient.get<APIProtocol<Role>>(`${ROOT_PATH}/${id}`);
      return handleResponse<Role>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async create(payload: CreateRole): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async updateByID(id: UniqueID, payload: UpdateRole): Promise<void> {
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
