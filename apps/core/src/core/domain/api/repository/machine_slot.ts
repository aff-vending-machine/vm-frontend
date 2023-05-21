import { BulkUpdateMachineSlot, MachineSlot } from '~/core/models';
import { Base2ndAPIService, handleError, handleResponse, Client } from '../_base';

const ROOT_PATH = 'machines';
const SUB_PATH = 'slots'

export class MachineSlotAPI extends Base2ndAPIService<MachineSlot> {
  constructor() {
    super(ROOT_PATH, SUB_PATH);
  }

  async bulkUpdate(machine_id: UniqueID, payload: BulkUpdateMachineSlot): Promise<void> {
    try {
      const { data } = await Client.getPrivate().put<APIProtocol<void>>(`${this.ROOT_PATH}/${machine_id}/${SUB_PATH}/bulk`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
