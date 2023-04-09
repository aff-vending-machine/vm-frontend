import { PaymentChannel, UpdatePaymentChannel } from '..';

export type PaymentChannelDataInterface = {
  count(query?: Record<string, string>): Promise<number>;
  find(query?: Record<string, string>): Promise<PaymentChannel[]>;
  findByID(id: UniqueID): Promise<PaymentChannel>;
  updateByID(id: UniqueID, payload: UpdatePaymentChannel): Promise<void>;
};
