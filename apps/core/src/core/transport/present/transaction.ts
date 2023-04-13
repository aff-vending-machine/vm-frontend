import { TransactionRepository } from '~/core/data';
import { TransactionUsecase } from '~/core/domain';
import { TransactionBloc } from '..';

const TransactionDomain = (() => {
  let domain: TransactionUsecase;
  return {
    getInstance: () => {
      if (domain == null) {
        domain = new TransactionUsecase(new TransactionRepository());
      }
      return domain;
    },
  };
})();

export const provideTransactionBloc = (): TransactionBloc => new TransactionBloc(TransactionDomain.getInstance());
