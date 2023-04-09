import { toDateTime } from "~/share";

export type PaymentChannel = {
  id: UniqueID;
  created_at: DateTime;
  updated_at: DateTime;
  name: string;
  channel: string;
  document_url: string;
  logo_url: string;
  vendor: string;
  active: boolean;
};

export type UpdatePaymentChannel = {
  name: string;
  channel: PaymentChannel;
  document_url: string;
  logo_url: string;
  vendor: string;
  active: boolean;
};

export type ActivePaymentChannel = {
  active: boolean;
};

export const parsePaymentChannel = (channel: PaymentChannel) => {
  channel.created_at = toDateTime(channel.created_at);
  channel.updated_at = toDateTime(channel.updated_at);

  return channel;
};
