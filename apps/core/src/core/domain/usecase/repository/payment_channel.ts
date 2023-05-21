import { CreatePaymentChannel, PaymentChannel, UpdatePaymentChannel, parsePaymentChannel } from "~/core/models";
import { BaseUsecaseService, PaymentChannelAPI } from "../_base";

export class PaymentChannelUsecase extends BaseUsecaseService<PaymentChannel, CreatePaymentChannel, UpdatePaymentChannel> {
  constructor(private service: PaymentChannelAPI) {
    super(service, parsePaymentChannel);
  }
}
