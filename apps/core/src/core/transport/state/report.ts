import { BlocState } from '~/share';
import { Stock, PaymentTransaction } from '~/core/domain';

export type ReportState = {
  kind: BlocState;
  list?: Array<Stock | PaymentTransaction>;
  file?: Blob;
  error?: Error;
};

export const ReportInitialState: ReportState = {
  kind: 'initial',
};
