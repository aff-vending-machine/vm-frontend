import { Bloc } from '~/share';
import { ReportUsecase } from '~/core/domain';
import { ReportInitialState, ReportState } from '..';

export class ReportBloc extends Bloc<ReportState> {
  constructor(private usecase: ReportUsecase) {
    super(ReportInitialState);
  }

  async stock(filter?: Record<string, any>) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      const list = await this.usecase.stock(filter);
      this.updateState({ kind: 'load-success', list });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async payment(filter?: Record<string, any>) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      const list = await this.usecase.payment(filter);
      this.updateState({ kind: 'load-success', list });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async downloadStock(filter?: Record<string, any>) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      const file = await this.usecase.downloadStock(filter);
      this.updateState({ kind: 'load-success', file });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async downloadPayment(filter?: Record<string, any>) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      const file = await this.usecase.downloadPayment(filter);
      this.updateState({ kind: 'load-success', file });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }
}
