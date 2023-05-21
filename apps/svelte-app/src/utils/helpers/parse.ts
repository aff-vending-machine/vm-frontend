import dayjs from "dayjs";
import { TransactionReport, CartItem } from "@apps/core";

export const parseDateReport = (transaction: TransactionReport) => {
    transaction.ordered_at = dayjs(transaction.ordered_at).format('DD/MM/YYYY HH:mm:ss');
    transaction.payment_requested_at = dayjs(transaction.payment_requested_at).format('DD/MM/YYYY HH:mm:ss');
    transaction.confirmed_paid_at = dayjs(transaction.confirmed_paid_at).format('DD/MM/YYYY HH:mm:ss');
    transaction.received_item_at = dayjs(transaction.received_item_at).format('DD/MM/YYYY HH:mm:ss');
    transaction.cart = (transaction.cart as CartItem[])
        .map(item => `[${item.code}: ${item.price} x ${item.quantity} = ${item.price * item.quantity}]`)
        .join(' ');

    return transaction;
};