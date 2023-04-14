import { SyncDataInterface } from '..';

export class SyncUsecase {
  private data: SyncDataInterface;

  constructor(data: SyncDataInterface) {
    this.data = data;
  }

  async fetchMachine(machineID: UniqueID): Promise<void> {
    try {
      const data = await this.data.fetchMachine(machineID);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async pushMachine(machineID: UniqueID): Promise<void> {
    try {
      const data = await this.data.pushMachine(machineID);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async fetchSlots(machineID: UniqueID): Promise<void> {
    try {
      const data = await this.data.fetchSlots(machineID);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async pushSlots(machineID: UniqueID): Promise<void> {
    try {
      const data = await this.data.pushSlots(machineID);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async pullTransactions(machineID: UniqueID): Promise<void> {
    try {
      const data = await this.data.pullTransactions(machineID);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}
