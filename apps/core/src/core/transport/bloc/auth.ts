import { Bloc } from '~/share';
import { AuthUsecase } from '~/core/domain';
import { AuthInitialState, AuthState } from '..';

export class AuthBloc extends Bloc<AuthState> {
  constructor(private usecase: AuthUsecase) {
    super(AuthInitialState);
  }

  async login(username: string, password: string, remember?: boolean) {
    try {
      this.changeState({ kind: 'load-in-progress' });

      const data = await this.usecase.login(username, password, remember);
      this.updateState({ kind: 'load-success', data });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async authenticated() {
    try {
      this.changeState({ kind: 'load-in-progress' });

      const data = await this.usecase.authenticated();
      this.updateState({ kind: 'load-success', data });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async logout() {
    try {
      this.changeState({ kind: 'load-in-progress' });
      await this.usecase.logout();
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }
}
