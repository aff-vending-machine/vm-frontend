import { OperationStatus } from "~/utils";
import { BlocService, SyncUsecase } from "../_base";

export class SyncBloc extends BlocService<null> {
  constructor(private usecase: SyncUsecase) {
    super();
  }

  async fetchMachine(machineID: UniqueID): Promise<OperationStatus> {
    try {
      this.updateState({ status: 'loading' });

      await this.usecase.fetchMachine(machineID);
      this.updateState({ status: 'success' });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }

  async pushMachine(machineID: UniqueID): Promise<OperationStatus> {
    try {
      this.updateState({ status: 'loading' });

      await this.usecase.pushMachine(machineID);
      this.updateState({ status: 'success' });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }

  async fetchSlots(machineID: UniqueID): Promise<OperationStatus> {
    try {
      this.updateState({ status: 'loading' });

      await this.usecase.fetchSlots(machineID);
      this.updateState({ status: 'success' });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }

  async pushSlots(machineID: UniqueID): Promise<OperationStatus> {
    try {
      this.updateState({ status: 'loading' });

      await this.usecase.pushSlots(machineID);
      this.updateState({ status: 'success' });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }

  async pullTransactions(machineID: UniqueID): Promise<OperationStatus> {
    try {
      this.updateState({ status: 'loading' });

      await this.usecase.pullTransactions(machineID);
      this.updateState({ status: 'success' });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }
}
