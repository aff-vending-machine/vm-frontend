import { toCountQuery, toQuery } from '~/share';
import { Transaction, TransactionDataInterface, parseTransaction } from '..';

export class TransactionUsecase {
  private data: TransactionDataInterface;

  constructor(data: TransactionDataInterface) {
    this.data = data;
  }

  async count(filter?: Record<string, any>): Promise<number> {
    try {
      const query = toCountQuery({ ...filter });
      const data = await this.data.count(query);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async get(id: UniqueID): Promise<Transaction> {
    try {
      const data = await this.data.findByID(id);
      const result = parseTransaction(data);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async list(filter?: Record<string, any>): Promise<Transaction[]> {
    try {
      const query = toQuery({ ...filter });
      const data = await this.data.find(query);
      const result = data.map(parseTransaction);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async done(id: UniqueID): Promise<void> {
    try {
      await this.data.doneByID(id);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async cancel(id: UniqueID): Promise<void> {
    try {
      await this.data.cancelByID(id);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}