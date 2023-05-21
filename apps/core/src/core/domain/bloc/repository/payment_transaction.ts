import { PaymentTransaction } from "~/core/models";
import { PaymentTransactionUsecase, BaseBlocService } from "../_base";
import { OperationStatus } from "~/utils";

export class PaymentTransactionBloc extends BaseBlocService<PaymentTransaction, null, null> {
  constructor(private usecase: PaymentTransactionUsecase) {
    super(usecase);
  }

  async done(id: UniqueID): Promise<OperationStatus> {
    try {
      this.updateState({ status: 'loading' });

      await this.usecase.done(id);
      this.updateState({ status: 'success' });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }

  async cancel(id: UniqueID): Promise<OperationStatus> {
    try {
      this.updateState({ status: 'loading' });

      await this.usecase.cancel(id);
      this.updateState({ status: 'success' });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }
}
