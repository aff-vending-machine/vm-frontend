import { ProductRepository } from '~/core/data';
import { ProductUsecase } from '~/core/domain';
import { ProductBloc } from '..';

const ProductDomain = (() => {
  let domain: ProductUsecase;
  return {
    getInstance: () => {
      if (domain == null) {
        domain = new ProductUsecase(new ProductRepository());
      }
      return domain;
    },
  };
})();

export const provideProductBloc = (): ProductBloc => new ProductBloc(ProductDomain.getInstance());
