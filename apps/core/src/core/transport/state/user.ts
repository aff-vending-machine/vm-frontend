import { BlocState } from '~/share';
import { User } from '~/core/domain';

export type UserState = {
  kind: BlocState;
  data?: User;
  list?: Array<User>;
  count?: number;
  error?: Error;
};

export const UserInitialState: UserState = {
  kind: 'initial',
};
