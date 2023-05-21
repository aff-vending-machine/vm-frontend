import { AccountUser, ChangePassword, ChangeRole } from '~/core';
import { BaseAPIService, handleError, handleResponse, Client } from '../_base';

const ROOT_PATH = 'users';

export class AccountUserAPI extends BaseAPIService<AccountUser> {
  constructor() {
    super(ROOT_PATH);
  }

  // ChangeRole // POST 	{users/:id/change-role}
  async changeRoleByID(id: UniqueID, payload: ChangeRole): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/${id}/change-role`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  // ChangePassword // POST 	{users/me/change-password}
  async changePassword(payload: ChangePassword): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/me/change-password`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  // ResetPassword // POST 	{users/:id/reset-password}
  async resetPasswordByID(id: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/${id}/reset-password`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

}
