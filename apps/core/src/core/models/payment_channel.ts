import { toDateTime } from "~/utils";

export type PaymentChannel = {
  id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  name: string;
  channel: string;
  vendor: string;
  is_enable: boolean;
  host: string;
  merchant_id: string;
  merchant_name: string;
  biller_code: string;
  biller_id: string;
  token: string;
  store_id: string;
  terminal_id: string;
};

export type CreatePaymentChannel = {
  name: string;
  channel: string;
  vendor: string;
  is_enable: boolean;
  host?: string;
  merchant_id?: string;
  merchant_name?: string;
  biller_code?: string;
  biller_id?: string;
  token?: string;
  store_id?: string;
  terminal_id?: string;
};

export type UpdatePaymentChannel = {
  name?: string;
  channel?: string;
  vendor?: string;
  is_enable?: boolean;
  host?: string;
  merchant_id?: string;
  merchant_name?: string;
  biller_code?: string;
  biller_id?: string;
  token?: string;
  store_id?: string;
  terminal_id?: string;
};

export type ChangePaymentChannelStatus = {
  is_enable: boolean;
};

export const parsePaymentChannel = (channel: PaymentChannel) => {
  channel.created_at = toDateTime(channel.created_at);
  channel.updated_at = toDateTime(channel.updated_at);

  return channel;
};
