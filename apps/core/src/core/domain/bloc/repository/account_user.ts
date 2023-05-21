import { AccountUser, CreateAccountUser } from "~/core/models";
import { AccountUserUsecase, BaseBlocService } from "../_base";

export class AccountUserBloc extends BaseBlocService<AccountUser, CreateAccountUser, null> {
  constructor(private usecase: AccountUserUsecase) {
    super(usecase);
  }
}
