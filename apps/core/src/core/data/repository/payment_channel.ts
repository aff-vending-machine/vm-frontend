import { handleError, handleResponse, privateClient } from '~/share';
import { PaymentChannel, PaymentChannelDataInterface, UpdatePaymentChannel } from '~/core/domain';

const ROOT_PATH = 'payment_channels';

export class PaymentChannelRepository implements PaymentChannelDataInterface {
  async find(params?: Record<string, string>): Promise<PaymentChannel[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<PaymentChannel[]>>(`${ROOT_PATH}`, { params });
      return handleResponse<PaymentChannel[]>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }  
  
  async count(params?: Record<string, string>): Promise<number> {
    try {
      const { data } = await privateClient.get<APIProtocol<number>>(`${ROOT_PATH}/count`, { params });
      return handleResponse<number>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async findByID(id: UniqueID): Promise<PaymentChannel> {
    try {
      const { data } = await privateClient.get<APIProtocol<PaymentChannel>>(`${ROOT_PATH}/${id}`);
      return handleResponse<PaymentChannel>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async updateByID(id: UniqueID, payload: UpdatePaymentChannel): Promise<void> {
    try {
      const { data } = await privateClient.put<APIProtocol<void>>(`${ROOT_PATH}/${id}`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async deleteByID(id: UniqueID): Promise<void> {
    try {
      const { data } = await privateClient.delete<APIProtocol<void>>(`${ROOT_PATH}/${id}`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
