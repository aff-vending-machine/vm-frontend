import { PaymentTransaction } from '~/core';
import { BaseAPIService, handleError, handleResponse, Client } from '../_base';

const ROOT_PATH = 'transactions';

export class PaymentTransactionAPI extends BaseAPIService<PaymentTransaction> {
  constructor() {
    super(ROOT_PATH);
  }

  async done(id: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/${id}/done`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async cancel(id: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().post<APIProtocol<void>>(`${ROOT_PATH}/${id}/cancel`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
