import { MachineSlot, CreateMachineSlot, UpdateMachineSlot, BulkUpdateMachineSlot } from "~/core/models";
import { MachineSlotUsecase, Base2ndBlocService } from "../_base";
import { OperationStatus } from "~/utils";

export class MachineSlotBloc extends Base2ndBlocService<MachineSlot, CreateMachineSlot, UpdateMachineSlot> {
  constructor(private usecase: MachineSlotUsecase) {
    super(usecase);
  }

  async bulkUpdate(machineID: UniqueID, payload: BulkUpdateMachineSlot): Promise<OperationStatus> {
    try {
      this.updateState({ status: 'loading' });

      await this.usecase.bulkUpdate(machineID, payload);
      this.updateState({ status: 'success' });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }

}
