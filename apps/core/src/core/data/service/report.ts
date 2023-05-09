import { handleError, handleResponse, privateClient } from '~/share';
import { Stock, ReportDataInterface, PaymentTransaction } from '~/core/domain';

const ROOT_PATH = 'report';

export class ReportRepository implements ReportDataInterface {
  async machine(params?: Record<string, string>): Promise<Stock[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<Stock[]>>(`${ROOT_PATH}/stock`, { params });
      return handleResponse<Stock[]>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async stock(params?: Record<string, string>): Promise<Stock[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<Stock[]>>(`${ROOT_PATH}/stock`, { params });
      return handleResponse<Stock[]>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async payment(params?: Record<string, string>): Promise<PaymentTransaction[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<PaymentTransaction[]>>(`${ROOT_PATH}/payment`, { params });
      return handleResponse<PaymentTransaction[]>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
  async downloadStock(params?: Record<string, string>): Promise<Blob> {
    try {
      const { data } = await privateClient.get(`${ROOT_PATH}/stock/download`, { params, responseType: 'blob' });
      return new Blob([data], { type: 'text/csv' });
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async downloadPayment(params?: Record<string, string>): Promise<Blob> {
    try {
      const { data } = await privateClient.get(`${ROOT_PATH}/payment/download`, { params, responseType: 'blob'});
      return new Blob([data], { type: 'text/csv' });
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
