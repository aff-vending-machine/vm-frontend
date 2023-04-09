import { toDateTime } from '~/share';

export type TokenType = 'access_token' | 'refresh_token'

export type Auth = {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
};

export type AuthUser = {
  id: UniqueID;
  role: string;
};

export type TokenData = {
  jti: string;
  sub: string;
  iat: Date;
  exp: Date;
  aud: string;
  iss: string;
  type: TokenType;
  name: string;
  role: string;
};

export const parseTokenData = (token: TokenData) => {
  token.iat = toDateTime(token.iat, true)
  token.exp = toDateTime(token.exp, true)

  return token;
}