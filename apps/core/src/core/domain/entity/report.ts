import { toDateTime } from '~/share';

export type MachineReport = {
    id: UniqueID;
    name: string;
    serial_number: string;
    payments: PaymentReport[];
};

export type PaymentReport = {
    name: string;
    amount: number;
}
