import { CatalogGroup } from '~/core';
import { BaseAPIService } from '../_base';

const ROOT_PATH = 'groups';

export class CatalogGroupAPI extends BaseAPIService<CatalogGroup> {
  constructor() {
    super(ROOT_PATH);
  }
}
