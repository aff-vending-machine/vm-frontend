import { PaymentTransaction } from '..';

export type TransactionDataInterface = {
  count(query?: Record<string, string>): Promise<number>;
  find(query?: Record<string, string>): Promise<PaymentTransaction[]>;
  findByID(id: UniqueID): Promise<PaymentTransaction>;
  doneByID(id: UniqueID): Promise<void>;
  cancelByID(id: UniqueID): Promise<void>;
};
