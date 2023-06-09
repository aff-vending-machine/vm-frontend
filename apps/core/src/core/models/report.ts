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
    total_payments: Record<string, number>;
    total_price: number;
}

export type TransactionReport = {
    merchant_order_id: string;
    machine_id: UniqueID;
    machine_name: string;
    machine_serial_number: string;
    location: string;
    cart: CartItem[];
    payment_channel: string;
    confirmed_paid_by: string;
    ordered_at: DateTime;
    payment_requested_at: DateTime;
    confirmed_paid_at: DateTime;
    received_item_at: DateTime;
    order_quantity: number;
    received_quantity: number;
    order_price: number;
    paid_price: number;
    raw_reference: string;
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

export const parseStockReportCSV = (stock: StockReport) => {
    return {
        code: stock.code,
        name: stock.name,
        sold: stock.sold,
        sale_price: stock.sale_price,
        creditcard: stock.total_payments['creditcard'] || 0,
        promptpay: stock.total_payments['promptpay'] || 0,
        total_price: stock.total_price,
    };
};

export const parseTransactionReport = (transaction: TransactionReport) => {
    transaction.ordered_at = toDateTime(transaction.ordered_at);
    transaction.payment_requested_at = toDateTime(transaction.payment_requested_at);
    transaction.confirmed_paid_at = toDateTime(transaction.confirmed_paid_at);
    transaction.received_item_at = toDateTime(transaction.received_item_at);

    return transaction;
};

export const parseTransactionReportCSV = (transaction: TransactionReport) => {
    transaction.ordered_at = toDateTime(transaction.ordered_at);
    transaction.payment_requested_at = toDateTime(transaction.payment_requested_at);
    transaction.confirmed_paid_at = toDateTime(transaction.confirmed_paid_at);
    transaction.received_item_at = toDateTime(transaction.received_item_at);

    return transaction;
};