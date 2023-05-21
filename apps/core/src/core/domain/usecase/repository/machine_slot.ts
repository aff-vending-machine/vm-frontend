import { MachineSlot, CreateMachineSlot, UpdateMachineSlot, parseMachineSlot, BulkUpdateMachineSlot } from '~/core/models';
import { Base2ndUsecaseService, MachineSlotAPI } from '../_base';

export class MachineSlotUsecase extends Base2ndUsecaseService<MachineSlot, CreateMachineSlot, UpdateMachineSlot> {
  constructor(private service: MachineSlotAPI) {
    super(service, parseMachineSlot);
  }

  async bulkUpdate(machine_id: UniqueID, payload: BulkUpdateMachineSlot): Promise<void> {
    try {
      await this.service.bulkUpdate(machine_id, payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}
