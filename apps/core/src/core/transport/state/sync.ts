import { BlocState } from '~/share';

export type SyncState = {
  kind: BlocState;
  error?: Error;
};

export const SyncInitialState: SyncState = {
  kind: 'initial',
};
