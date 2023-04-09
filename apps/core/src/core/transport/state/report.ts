import { BlocState } from '~/share';
import { Stock, Payment } from '~/core/domain';

export type ReportState = {
  kind: BlocState;
  list?: Array<Stock | Payment>;
  file?: Blob;
  error?: Error;
};

export const ReportInitialState: ReportState = {
  kind: 'initial',
};
