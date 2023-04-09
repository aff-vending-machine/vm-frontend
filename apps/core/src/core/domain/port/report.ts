import { Stock, Payment } from '..';

export type ReportDataInterface = {
  stock(query?: Record<string, string>): Promise<Stock[]>;
  payment(query?: Record<string, string>): Promise<Payment[]>;
};
