import { Bloc } from '~/share';
import { BulkUpdateMachineSlot, CreateMachineSlot, MachineSlotUsecase, UpdateMachineSlot } from '~/core/domain';
import { MachineSlotInitialState, MachineSlotState } from '..';

export class MachineSlotBloc extends Bloc<MachineSlotState> {
  constructor(private usecase: MachineSlotUsecase) {
    super(MachineSlotInitialState);
  }

  async view(machineID: UniqueID, id: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      const data = await this.usecase.get(machineID, id);
      this.updateState({ kind: 'load-success', data });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async list(machineID: UniqueID, filter?: Record<string, any>) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      const count = await this.usecase.count(machineID, filter);
      if (count == 0) {
        this.updateState({ kind: 'load-success', list: [], count });
        return;
      }

      const list = await this.usecase.list(machineID, filter);
      this.updateState({ kind: 'load-success', list, count });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async create(machineID: UniqueID, payload: CreateMachineSlot) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.create(machineID, payload);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async update(machineID: UniqueID, id: UniqueID, payload: UpdateMachineSlot) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.update(machineID, id, payload);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async delete(machineID: UniqueID, id: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.delete(machineID, id);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async bulkUpdate(machineID: UniqueID, payload: BulkUpdateMachineSlot) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.bulkUpdate(machineID, payload);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

}
