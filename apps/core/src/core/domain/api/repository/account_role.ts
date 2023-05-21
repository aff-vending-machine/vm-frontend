import { AccountRole } from '~/core';
import { BaseAPIService } from '../_base';

const ROOT_PATH = 'roles';

export class AccountRoleAPI extends BaseAPIService<AccountRole> {
  constructor() {
    super(ROOT_PATH);
  }
}
