import { Bloc } from '~/share';
import { PaymentChannelUsecase, UpdatePaymentChannel } from '~/core/domain';
import { PaymentChannelInitialState, PaymentChannelState } from '..';

export class PaymentChannelBloc extends Bloc<PaymentChannelState> {
  constructor(private usecase: PaymentChannelUsecase) {
    super(PaymentChannelInitialState);
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

  async update(id: UniqueID, payload: UpdatePaymentChannel) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.update(id, payload);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }
}
