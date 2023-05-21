import { toDateTime } from "~/utils";

export type MachineReport = {
    id: UniqueID;
    name: string;
    serial_number: string;
    total_payments: Record<string, number>;
    total: number;
};

export type StockReport = {
    code: string;
    name: string;
    sold: number;
    sale_price: number;
    total_price: number;
}

export type TransactionReport = {
    merchant_order_id: string;
    machine_id: UniqueID;
    machine_name: string;
    machine_serial_number: string;
    location: string;
    cart: CartItem[] | string;
    payment_channel: string;
    confirmed_paid_by: string;
    ordered_at: DateTime | string;
    payment_requested_at: DateTime | string;
    confirmed_paid_at: DateTime | string;
    received_item_at: DateTime | string;
    order_quantity: number;
    received_quantity: number;
    order_price: number;
    paid_price: number;
    reference1: string;
    reference2: string;
    reference3: string;
    note: string;
}

export type CartItem = {
    code: string;
    name: string;
    image_url: string;
    price: number;
    quantity: number;
    received: number;
}


export const parseMachineReport = (machine: MachineReport) => {
    return machine;
};

export const parseStockReport = (stock: StockReport) => {
    return stock;
};

export const parseTransactionReport = (transaction: TransactionReport) => {
    transaction.ordered_at = toDateTime(transaction.ordered_at);
    transaction.payment_requested_at = toDateTime(transaction.payment_requested_at);
    transaction.confirmed_paid_at = toDateTime(transaction.confirmed_paid_at);
    transaction.received_item_at = toDateTime(transaction.received_item_at);

    return transaction;
};