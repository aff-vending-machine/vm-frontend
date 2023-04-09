import { toDateTime } from '~/share';

export type Stock = {
  code: string;
  stock: number;
  capacity: number;
  sold: number;
  from: DateTime;
  to: DateTime;
  price: number;
};

export const parseStock = (stock: Stock) => {
  stock.from = toDateTime(stock.from);
  stock.to = toDateTime(stock.to);

  return stock;
};
