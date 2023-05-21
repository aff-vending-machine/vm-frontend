import { MachineReport, StockReport, TransactionReport } from '~/core';
import { APIService, handleError, handleResponse, Client } from '../_base';

const ROOT_PATH = 'report';

export class ReportAPI extends APIService {
  constructor() {
    super(ROOT_PATH)
  }

  async summary(params?: Record<string, string>): Promise<MachineReport[]> {
    try {
      const { data } = await Client.getPrivate().get<APIProtocol<MachineReport[]>>(`${ROOT_PATH}/summary`, { params });
      return handleResponse<MachineReport[]>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async stocks(machine_id: UniqueID, params?: Record<string, string>): Promise<StockReport[]> {
    try {
      const { data } = await Client.getPrivate().get<APIProtocol<StockReport[]>>(`${ROOT_PATH}/${machine_id}/stocks`, { params });
      return handleResponse<StockReport[]>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async transactions(machine_id: UniqueID, params?: Record<string, string>): Promise<TransactionReport[]> {
    try {
      const { data } = await Client.getPrivate().get<APIProtocol<TransactionReport[]>>(`${ROOT_PATH}/${machine_id}/transactions`, { params });
      return handleResponse<TransactionReport[]>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
