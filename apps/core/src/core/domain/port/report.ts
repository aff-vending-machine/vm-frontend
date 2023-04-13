import { Stock, Transaction } from '..';

export type ReportDataInterface = {
  stock(query?: Record<string, string>): Promise<Stock[]>;
  payment(query?: Record<string, string>): Promise<Transaction[]>;
  downloadStock(query?: Record<string, string>): Promise<Blob>;
  downloadPayment(query?: Record<string, string>): Promise<Blob>;
};
