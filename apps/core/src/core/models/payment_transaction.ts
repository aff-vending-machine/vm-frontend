import { toDateTime, toAnyDateTime } from '~/utils';
import { Machine } from './machine';
import { StoreBranch } from './store_branch';
import { PaymentChannel } from './payment_channel';

export type PaymentTransaction = {
  id: UniqueID;
  branch_id: UniqueID;
  branch: StoreBranch;
  machine_id: UniqueID;
  machine: Machine;
  channel_id: UniqueID;
  channel: PaymentChannel;
  created_at: DateTime;
  updated_at: DateTime;
  merchant_order_id: string;
  raw_cart: string;
  note: string;
  order_quantity: number;
  order_price: number;
  order_status: string;
  ordered_at: DateTime;
  payment_requested_at: AnyDateTime;
  reference1: AnyString;
  reference2: AnyString;
  reference3: AnyString;
  cancelled_by: AnyString;
  cancelled_at: AnyDateTime;
  confirmed_paid_by: AnyString;
  confirmed_paid_at: AnyDateTime;
  ref_error: AnyString;
  refund_at: AnyDateTime;
  refund_price: number;
  received_item_at: AnyDateTime;
  received_quantity: number;
  paid_price: number;
  is_error: boolean;
  error: AnyString;
  error_at: AnyDateTime;
};

export const parsePaymentTransaction = (payment: PaymentTransaction) => {
  payment.created_at = toDateTime(payment.created_at);
  payment.updated_at = toDateTime(payment.updated_at);
  payment.ordered_at = toDateTime(payment.ordered_at);
  payment.payment_requested_at = toAnyDateTime(payment.payment_requested_at);
  payment.cancelled_at = toAnyDateTime(payment.cancelled_at);
  payment.confirmed_paid_at = toAnyDateTime(payment.confirmed_paid_at);
  payment.refund_at = toAnyDateTime(payment.refund_at);
  payment.received_item_at = toAnyDateTime(payment.received_item_at);
  payment.error_at = toAnyDateTime(payment.error_at);

  return payment;
};
