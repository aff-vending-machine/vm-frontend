import { handleError, handleResponse, privateClient } from '~/share';
import { ChangePassword, ChangeRole, CreateUser, User, UserDataInterface } from '~/core/domain';

const ROOT_PATH = 'users';

export class UserRepository implements UserDataInterface {
  async find(params?: Record<string, string>): Promise<User[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<User[]>>(`${ROOT_PATH}`, { params });
      return handleResponse<User[]>(data);
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

  async findByID(id: UniqueID): Promise<User> {
    try {
      const { data } = await privateClient.get<APIProtocol<User>>(`${ROOT_PATH}/${id}`);
      return handleResponse<User>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async create(payload: CreateUser): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async changeRoleByID(id: UniqueID, payload: ChangeRole): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}/${id}/change-role`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async changePassword(payload: ChangePassword): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}/me/change-password`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async resetPasswordByID(id: UniqueID): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}/${id}/reset-password`);
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
