import { PaymentChannel, CreatePaymentChannel, UpdatePaymentChannel } from "~/core/models";
import { PaymentChannelUsecase, BaseBlocService } from "../_base";

export class PaymentChannelBloc extends BaseBlocService<PaymentChannel, CreatePaymentChannel, UpdatePaymentChannel> {
  constructor(private usecase: PaymentChannelUsecase) {
    super(usecase);
  }
}
