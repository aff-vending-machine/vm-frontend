import { BlocState } from '~/share';
import { TokenData } from '~/core/domain';

export type AuthState = {
  kind: BlocState;
  data?: TokenData;
  error?: Error;
};

export const AuthInitialState: AuthState = {
  kind: 'initial',
};
