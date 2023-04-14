import { handleError, handleResponse, privateClient } from '~/share';
import { SyncDataInterface } from '~/core/domain';

const ROOT_PATH = 'sync';

export class SyncRepository implements SyncDataInterface {
  async fetchMachine(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/fetch`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async pushMachine(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/push`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async fetchSlots(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/slots/fetch`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async pushSlots(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/slots/push`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async pullTransactions(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/transactions/pull`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
