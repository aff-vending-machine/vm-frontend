import { toQuery } from '~/share';
import { Stock, ReportDataInterface, parseStock, parseTransaction, Transaction } from '..';

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

  async payment(filter?: Record<string, any>): Promise<Transaction[]> {
    try {
      const query = toQuery({ ...filter });
      const list = await this.data.payment(query);
      const result = list.map(parseTransaction);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async downloadStock(filter?: Record<string, any>): Promise<Blob> {
    try {
      const query = toQuery({ ...filter });
      const blob = await this.data.downloadStock(query);

      return Promise.resolve(blob);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async downloadPayment(filter?: Record<string, any>): Promise<Blob> {
    try {
      const query = toQuery({ ...filter });
      const blob = await this.data.downloadPayment(query);

      return Promise.resolve(blob);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}
