import { Stock, Payment } from '..';

export type ReportDataInterface = {
  stock(query?: Record<string, string>): Promise<Stock[]>;
  payment(query?: Record<string, string>): Promise<Payment[]>;
  downloadStock(query?: Record<string, string>): Promise<Blob>;
  downloadPayment(query?: Record<string, string>): Promise<Blob>;
};
