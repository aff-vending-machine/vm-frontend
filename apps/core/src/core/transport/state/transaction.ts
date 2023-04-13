import { BlocState } from '~/share';
import { Transaction } from '~/core/domain';

export type TransactionState = {
  kind: BlocState;
  data?: Transaction;
  list?: Array<Transaction>;
  count?: number;
  error?: Error;
};

export const TransactionInitialState: TransactionState = {
  kind: 'initial',
};
