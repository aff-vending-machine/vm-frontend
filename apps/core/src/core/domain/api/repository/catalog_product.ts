import { CatalogProduct } from '~/core';
import { BaseAPIService } from '../_base';

const ROOT_PATH = 'products';

export class CatalogProductAPI extends BaseAPIService<CatalogProduct> {
  constructor() {
    super(ROOT_PATH);
  }
}
