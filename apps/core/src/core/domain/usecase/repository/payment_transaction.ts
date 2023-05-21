import { PaymentTransaction, parsePaymentTransaction } from "~/core/models";
import { BaseUsecaseService, PaymentTransactionAPI } from "../_base";

export class PaymentTransactionUsecase extends BaseUsecaseService<PaymentTransaction, null, null> {
  constructor(private service: PaymentTransactionAPI) {
    super(service, parsePaymentTransaction);
  }

  async done(id: UniqueID): Promise<void> {
    try {
      await this.service.done(id);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async cancel(id: UniqueID): Promise<void> {
    try {
      await this.service.cancel(id);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}
