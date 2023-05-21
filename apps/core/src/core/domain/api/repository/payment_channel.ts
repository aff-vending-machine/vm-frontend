import { PaymentChannel } from '~/core';
import { BaseAPIService, handleError, handleResponse, Client } from '../_base';

const ROOT_PATH = 'channels';

export class PaymentChannelAPI extends BaseAPIService<PaymentChannel> {
  constructor() {
    super(ROOT_PATH);
  }

  async enable(id: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().put<APIProtocol<void>>(`${ROOT_PATH}/${id}/enable`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async disable(id: UniqueID): Promise<void> {
    try {
      const { data } = await Client.getPrivate().put<APIProtocol<void>>(`${ROOT_PATH}/${id}/disable`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
