import { BlocState } from '~/share';
import { Product } from '~/core/domain';

export type ProductState = {
  kind: BlocState;
  data?: Product;
  list?: Array<Product>;
  count?: number;
  error?: Error;
};

export const ProductInitialState: ProductState = {
  kind: 'initial',
};
