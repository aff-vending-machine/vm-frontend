import { Auth } from '..';

export type AuthDataInterface = {
  login(username: string, password: string): Promise<Auth>;
  refreshToken(token: string): Promise<Auth>;
};
