import { toQuery } from '~/share';
import { Stock, ReportDataInterface, parseStock, parsePayment, Payment } from '..';

export class ReportUsecase {
  private data: ReportDataInterface;

  constructor(data: ReportDataInterface) {
    this.data = data;
  }

  async stock(filter?: Record<string, any>): Promise<Stock[]> {
    try {
      const query = toQuery({ ...filter });
      const list = await this.data.stock(query);
      const result = list.map(parseStock);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async payment(filter?: Record<string, any>): Promise<Payment[]> {
    try {
      const query = toQuery({ ...filter });
      const list = await this.data.payment(query);
      const result = list.map(parsePayment);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}
