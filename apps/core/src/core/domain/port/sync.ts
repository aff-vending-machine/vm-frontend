
export type SyncDataInterface = {
    fetchMachine(machineID: UniqueID): Promise<void>;
    pushMachine(machineID: UniqueID): Promise<void>;
    fetchSlots(machineID: UniqueID): Promise<void>;
    pushSlots(machineID: UniqueID): Promise<void>;
    pullTransactions(machineID: UniqueID): Promise<void>
};
