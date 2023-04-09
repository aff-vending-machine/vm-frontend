import { Auth, AuthDataInterface } from '~/core/domain';
import { handleResponse, publicClient } from '~/share';

const ROOT_PATH = 'auth';

export class AuthService implements AuthDataInterface {
  async login(username: string, password: string): Promise<Auth> {
    const { data } = await publicClient.post<APIProtocol<Auth>>(`${ROOT_PATH}/login`, { username, password });
    return handleResponse<Auth>(data);
  }
  async refreshToken(token: string): Promise<Auth> {
    const { data } = await publicClient.get<APIProtocol<Auth>>(`${ROOT_PATH}/token`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return handleResponse<Auth>(data);
  }
}
