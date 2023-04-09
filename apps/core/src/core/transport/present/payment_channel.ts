import { PaymentChannelRepository } from '~/core/data';
import { PaymentChannelUsecase } from '~/core/domain';
import { PaymentChannelBloc } from '..';

const PaymentChannelDomain = (() => {
  let domain: PaymentChannelUsecase;
  return {
    getInstance: () => {
      if (domain == null) {
        domain = new PaymentChannelUsecase(new PaymentChannelRepository());
      }
      return domain;
    },
  };
})();

export const providePaymentChannelBloc = (): PaymentChannelBloc =>
  new PaymentChannelBloc(PaymentChannelDomain.getInstance());
