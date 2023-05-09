import { BlocState } from '~/share';
import { PaymentTransaction } from '~/core/domain';

export type TransactionState = {
  kind: BlocState;
  data?: PaymentTransaction;
  list?: Array<PaymentTransaction>;
  count?: number;
  error?: Error;
};

export const TransactionInitialState: TransactionState = {
  kind: 'initial',
};
