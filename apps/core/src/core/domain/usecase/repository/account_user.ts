import { CreateAccountUser, AccountUser, parseAccountUser, ChangePassword, ChangeRole } from "~/core/models";
import { BaseUsecaseService, AccountUserAPI } from "../_base";

export class AccountUserUsecase extends BaseUsecaseService<AccountUser, CreateAccountUser, null> {
  constructor(private service: AccountUserAPI) {
    super(service, parseAccountUser);
  }

  async changeRole(id: UniqueID, payload: ChangeRole): Promise<void> {
    try {
      await this.service.changeRoleByID(id, payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async changePassword(payload: ChangePassword): Promise<void> {
    try {
      await this.service.changePassword(payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async resetPassword(id: UniqueID): Promise<void> {
    try {
      await this.service.resetPasswordByID(id);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}
