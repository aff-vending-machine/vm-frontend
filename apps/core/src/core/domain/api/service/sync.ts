import { APIService, handleError, handleResponse, Client } from '../_base';

const ROOT_PATH = 'sync';

export class SyncAPI extends APIService {
  constructor() {
    super(ROOT_PATH)
  }

async fetchMachine(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/fetch`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async pushMachine(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/push`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async fetchChannels(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/channels/fetch`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async pushChannels(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/channels/push`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async fetchSlots(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/slots/fetch`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async pushSlots(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/slots/push`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async pullTransactions(machineID: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/${machineID}/transactions/pull`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
