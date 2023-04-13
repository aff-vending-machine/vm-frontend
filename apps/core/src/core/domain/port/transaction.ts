import { Transaction } from '..';

export type TransactionDataInterface = {
  count(query?: Record<string, string>): Promise<number>;
  find(query?: Record<string, string>): Promise<Transaction[]>;
  findByID(id: UniqueID): Promise<Transaction>;
  doneByID(id: UniqueID): Promise<void>;
  cancelByID(id: UniqueID): Promise<void>;
};
