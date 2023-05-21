import { TokenData } from "~/core/models";
import { AuthUsecase, BlocService } from "../_base";
import { OperationStatus } from "~/utils";

export class AuthBloc extends BlocService<TokenData> {
  constructor(private usecase: AuthUsecase) {
    super()
  }

  async login(username: string, password: string, remember: boolean = false): Promise<OperationStatus> {
    try {
      this.changeState({ status: 'loading' });

      const data = await this.usecase.login(username, password, remember);
      this.updateState({ status: 'success', data });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }

  async authenticated(): Promise<OperationStatus> {
    try {
      this.changeState({ status: 'loading' });

      const data = await this.usecase.authenticated();
      this.updateState({ status: 'success', data });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }

  async logout(): Promise<OperationStatus> {
    try {
      this.changeState({ status: 'loading' });

      await this.usecase.logout();
      this.updateState({ status: 'success' });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }
}