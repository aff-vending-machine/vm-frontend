import { BlocState } from '~/share';
import { Stock, Transaction } from '~/core/domain';

export type ReportState = {
  kind: BlocState;
  list?: Array<Stock | Transaction>;
  file?: Blob;
  error?: Error;
};

export const ReportInitialState: ReportState = {
  kind: 'initial',
};
