import { Bloc } from '~/share';
import { SyncUsecase } from '~/core/domain';
import { SyncInitialState, SyncState } from '..';

export class SyncBloc extends Bloc<SyncState> {
  constructor(private usecase: SyncUsecase) {
    super(SyncInitialState);
  }

  async fetchMachine(machineID: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.fetchMachine(machineID);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async pushMachine(machineID: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.pushMachine(machineID);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async fetchSlots(machineID: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.fetchSlots(machineID);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async pushSlots(machineID: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.pushSlots(machineID);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async pullTransactions(machineID: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.pullTransactions(machineID);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }
}
