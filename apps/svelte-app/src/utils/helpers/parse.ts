import dayjs from 'dayjs';
import { TransactionReport, StockReport } from '@apps/core';

export type TransactionReportCSV = {
  "Merchant Order ID": string;
  "Machine ID": UniqueID;
  "Machine Name": string;
  "Machine Serial Number": string;
  "Location": string;
  "Cart": string;
  "Payment Channel": string;
  "Confirmed Paid By": string;
  "Ordered At": string;
  "Payment Requested At": string;
  "Confirmed Paid At": string;
  "Received Item At": string;
  "Order Quantity": number;
  "Received Quantity": number;
  "Order Price": number;
  "Paid Price": number;
  "Reference 1": string;
  "Reference 2": string;
  "Reference 3": string;
  "Note": string;
}

export const parseTransactionReport = (transaction: TransactionReport): TransactionReportCSV => ({
  "Merchant Order ID": transaction.merchant_order_id,
  "Machine ID": transaction.machine_id,
  "Machine Name": transaction.machine_name,
  "Machine Serial Number": transaction.machine_serial_number,
  "Location": transaction.location,
  "Cart": transaction.cart.map(item => `[${item.code} (${item.name}): ${item.price} x ${item.quantity} = ${item.price * item.quantity}]`).join(' '),
  "Payment Channel": transaction.payment_channel,
  "Confirmed Paid By": transaction.confirmed_paid_by,
  "Ordered At": dayjs(transaction.ordered_at).format('DD/MM/YYYY HH:mm:ss'),
  "Payment Requested At": dayjs(transaction.payment_requested_at).format('DD/MM/YYYY HH:mm:ss'),
  "Confirmed Paid At": dayjs(transaction.confirmed_paid_at).format('DD/MM/YYYY HH:mm:ss'),
  "Received Item At": dayjs(transaction.received_item_at).format('DD/MM/YYYY HH:mm:ss'),
  "Order Quantity": transaction.order_quantity,
  "Received Quantity": transaction.received_quantity,
  "Order Price": transaction.order_price,
  "Paid Price": transaction.paid_price,
  "Reference 1": "'" + transaction.reference1,
  "Reference 2": "'" + transaction.reference2,
  "Reference 3": "'" + transaction.reference3,
  "Note": transaction.note,
})


export type StockReportCSV = {
  "Slot Code": string;
  "Product Name": string;
  "Sold": number;
  "Product Price": number;
  "Credit Card": number;
  "Promptpay": number;
  "Total": number;
}


export const parseStockReport = (stock: StockReport): StockReportCSV => ({
  "Slot Code": "'" + stock.code,
  "Product Name": stock.name,
  "Sold": stock.sold,
  "Product Price": stock.sale_price,
  "Credit Card": stock.total_payments?.creditcard || 0,
  "Promptpay": stock.total_payments?.promptpay || 0,
  "Total": stock.total_price,
})
