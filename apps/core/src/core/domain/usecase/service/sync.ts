import { SyncAPI, UsecaseService } from "../_base";

export class SyncUsecase extends UsecaseService {
    constructor(private service: SyncAPI) {
        super();
    }

    async fetchMachine(machineID: UniqueID): Promise<void> {
        try {
            const data = await this.service.fetchMachine(machineID);

            return Promise.resolve(data);
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    async pushMachine(machineID: UniqueID): Promise<void> {
        try {
            const data = await this.service.pushMachine(machineID);

            return Promise.resolve(data);
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    async fetchSlots(machineID: UniqueID): Promise<void> {
        try {
            const data = await this.service.fetchSlots(machineID);

            return Promise.resolve(data);
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    async pushSlots(machineID: UniqueID): Promise<void> {
        try {
            const data = await this.service.pushSlots(machineID);

            return Promise.resolve(data);
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    async pullTransactions(machineID: UniqueID): Promise<void> {
        try {
            const data = await this.service.pullTransactions(machineID);

            return Promise.resolve(data);
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }
}