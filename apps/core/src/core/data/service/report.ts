import { handleError, handleResponse, privateClient } from '~/share';
import { Stock, ReportDataInterface, Payment } from '~/core/domain';

const ROOT_PATH = 'report';

export class ReportRepository implements ReportDataInterface {
  async stock(params?: Record<string, string>): Promise<Stock[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<Stock[]>>(`${ROOT_PATH}/stock`, { params });
      return handleResponse<Stock[]>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async payment(params?: Record<string, string>): Promise<Payment[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<Payment[]>>(`${ROOT_PATH}/payment`, { params });
      return handleResponse<Payment[]>(data);
    } catch (e: unknown) {this.stock
      throw handleError(e);
    }
  }
}
