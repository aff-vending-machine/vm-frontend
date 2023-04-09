import { BlocState } from '~/share';
import { Machine } from '~/core/domain';

export type MachineState = {
  kind: BlocState;
  data?: Machine;
  list?: Array<Machine>;
  count?: number;
  error?: Error;
};

export const MachineInitialState: MachineState = {
  kind: 'initial',
};
