import { toQuery } from '~/share';
import { PaymentChannel, PaymentChannelDataInterface, UpdatePaymentChannel, parsePaymentChannel } from '..';

export class PaymentChannelUsecase {
  private data: PaymentChannelDataInterface;

  constructor(data: PaymentChannelDataInterface) {
    this.data = data;
  }

  async count(filter?: Record<string, any>): Promise<number> {
    try {
      const query = toQuery({ ...filter });
      const data = await this.data.count(query);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async get(id: UniqueID): Promise<PaymentChannel> {
    try {
      const data = await this.data.findByID(id);
      const result = parsePaymentChannel(data);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async list(filter?: Record<string, any>): Promise<PaymentChannel[]> {
    try {
      const query = toQuery({ ...filter });
      const data = await this.data.find(query);
      const result = data.map(parsePaymentChannel);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async update(id: UniqueID, payload: UpdatePaymentChannel): Promise<void> {
    try {
      await this.data.updateByID(id, payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}
