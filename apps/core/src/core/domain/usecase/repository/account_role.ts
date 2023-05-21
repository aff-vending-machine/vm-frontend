import { CreateAccountRole, AccountRole, UpdateAccountRole, parseAccountRole } from "~/core/models";
import { BaseUsecaseService, AccountRoleAPI } from "../_base";

export class AccountRoleUsecase extends BaseUsecaseService<AccountRole, CreateAccountRole, UpdateAccountRole> {
  constructor(private service: AccountRoleAPI) {
    super(service, parseAccountRole);
  }
}
