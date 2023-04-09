import { Bloc } from '~/share';
import { ChangePassword, ChangeRole, CreateUser, UserUsecase } from '~/core/domain';
import { UserInitialState, UserState } from '..';

export class UserBloc extends Bloc<UserState> {
  constructor(private usecase: UserUsecase) {
    super(UserInitialState);
  }

  async view(id: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      const data = await this.usecase.get(id);
      this.updateState({ kind: 'load-success', data });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async list(filter?: Record<string, any>) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      const count = await this.usecase.count(filter);
      if (count == 0) {
        this.updateState({ kind: 'load-success', list: [], count });
        return;
      }

      const list = await this.usecase.list(filter);
      this.updateState({ kind: 'load-success', list, count });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async create(payload: CreateUser) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.create(payload);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async changeRole(id: UniqueID, payload: ChangeRole) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.changeRole(id, payload);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async changePassword(payload: ChangePassword) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.changePassword(payload);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async resetPassword(id: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.resetPassword(id);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async delete(id: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.delete(id);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }
}
