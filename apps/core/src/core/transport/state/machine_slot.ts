import { BlocState } from '~/share';
import { MachineSlot } from '~/core/domain';

export type MachineSlotState = {
  kind: BlocState;
  data?: MachineSlot;
  list?: Array<MachineSlot>;
  count?: number;
  error?: Error;
};

export const MachineSlotInitialState: MachineSlotState = {
  kind: 'initial',
};
