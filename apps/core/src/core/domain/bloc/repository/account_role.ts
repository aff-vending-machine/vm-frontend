import { AccountRole, CreateAccountRole, UpdateAccountRole } from "~/core/models";
import { AccountRoleUsecase, BaseBlocService } from "../_base";

export class AccountRoleBloc extends BaseBlocService<AccountRole, CreateAccountRole, UpdateAccountRole> {
  constructor(private usecase: AccountRoleUsecase) {
    super(usecase);
  }
}
