import { LOCAL_ACCESS_TOKEN, LOCAL_AUTHENTICATED_REMEMBERED, LOCAL_REFRESH_TOKEN, isExpired, parseJWT } from '~/share';
import { AuthDataInterface, TokenData, parseTokenData } from '..';
import { AxiosError } from 'axios';

export class AuthUsecase {
  private data: AuthDataInterface;

  constructor(data: AuthDataInterface) {
    this.data = data;
  }

  async login(username: string, password: string, remember?: boolean): Promise<TokenData> {
    try {
      const data = await this.data.login(username, password);

      localStorage.setItem(LOCAL_ACCESS_TOKEN, data.access_token);

      if (remember) {
        localStorage.setItem(LOCAL_AUTHENTICATED_REMEMBERED, 'TRUE');
        localStorage.setItem(LOCAL_REFRESH_TOKEN, data.refresh_token);
      } else {
        localStorage.removeItem(LOCAL_AUTHENTICATED_REMEMBERED);
      }

      const token: TokenData = parseJWT(data.access_token);
      const result = parseTokenData(token);

      return Promise.resolve(result);
    } catch (e: unknown) {
      const error = Error('username or password is invalid');
      return Promise.reject(error);
    }
  }

  async authenticated(): Promise<TokenData> {
    const accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(LOCAL_REFRESH_TOKEN);

    if (!accessToken) {
      return Promise.reject('no access token');
    }

    let token = parseJWT(accessToken);
    let result = parseTokenData(token);

    if (isExpired(result.iat, result.exp)) {
      if (!refreshToken) {
        return Promise.reject('no refresh token');
      }

      token = parseJWT(refreshToken);
      result = parseTokenData(token);

      if (isExpired(result.iat, result.exp)) {
        return Promise.reject('refresh token is expired');
      }

      try {
        const data = await this.data.refreshToken(refreshToken);

        localStorage.setItem(LOCAL_ACCESS_TOKEN, data.access_token);
        localStorage.setItem(LOCAL_REFRESH_TOKEN, data.refresh_token);

        token = parseJWT(data.access_token);
        result = parseTokenData(token);
      } catch (e: unknown) {
        const err = e as AxiosError;

        // Unauthorized ignore case
        if (err.response?.status == 401) {
          return Promise.reject(Error(''));
        }

        const error = Error('service is not available');
        return Promise.reject(error);
      }
    }

    return Promise.resolve(result);
  }

  async logout(): Promise<void> {
    localStorage.removeItem(LOCAL_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_AUTHENTICATED_REMEMBERED);

    return Promise.resolve();
  }
}
