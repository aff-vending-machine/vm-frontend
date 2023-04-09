import { BlocState } from '~/share';
import { PaymentChannel } from '~/core/domain';

export type PaymentChannelState = {
  kind: BlocState;
  data?: PaymentChannel;
  list?: Array<PaymentChannel>;
  count?: number;
  error?: Error;
};

export const PaymentChannelInitialState: PaymentChannelState = {
  kind: 'initial',
};
