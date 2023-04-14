import { CreateMachineSlot, MachineSlot, MachineSlotDataInterface, UpdateMachineSlot } from '~/core/domain';
import { handleError, handleResponse, privateClient } from '~/share';

const ROOT_PATH = (id: UniqueID) => `machines/${id}/slots`;

export class MachineSlotRepository implements MachineSlotDataInterface {
  async find(machineID: UniqueID, params?: Record<string, string>): Promise<MachineSlot[]> {
    try {
      const { data } = await privateClient.get<APIProtocol<MachineSlot[]>>(`${ROOT_PATH(machineID)}`, { params });
      return handleResponse<MachineSlot[]>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async count(machineID: UniqueID, params?: Record<string, string>): Promise<number> {
    try {
      const { data } = await privateClient.get<APIProtocol<number>>(`${ROOT_PATH(machineID)}/count`, { params });
      return handleResponse<number>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async findByID(machineID: UniqueID, id: UniqueID): Promise<MachineSlot> {
    try {
      const { data } = await privateClient.get<APIProtocol<MachineSlot>>(`${ROOT_PATH(machineID)}/${id}`);
      return handleResponse<MachineSlot>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async create(machineID: UniqueID, payload: CreateMachineSlot): Promise<void> {
    try {
      const { data } = await privateClient.post<APIProtocol<void>>(`${ROOT_PATH(machineID)}`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async updateByID(machineID: UniqueID, id: UniqueID, payload: UpdateMachineSlot): Promise<void> {
    try {
      const { data } = await privateClient.put<APIProtocol<void>>(`${ROOT_PATH(machineID)}/${id}`, payload);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }

  async deleteByID(machineID: UniqueID, id: UniqueID): Promise<void> {
    try {
      const { data } = await privateClient.delete<APIProtocol<void>>(`${ROOT_PATH(machineID)}/${id}`);
      return handleResponse<void>(data);
    } catch (e: unknown) {
      throw handleError(e);
    }
  }
}
