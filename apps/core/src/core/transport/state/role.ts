import { BlocState } from '~/share';
import { Role } from '~/core/domain';

export type RoleState = {
  kind: BlocState;
  data?: Role;
  list?: Array<Role>;
  count?: number;
  error?: Error;
};

export const RoleInitialState: RoleState = {
  kind: 'initial',
};
