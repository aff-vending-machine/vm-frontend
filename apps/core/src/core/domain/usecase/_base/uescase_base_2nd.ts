import { toCountQuery, toQuery } from "~/utils";
import { UsecaseService } from "./usecase_service";
import { Base2ndAPIService } from "../../api/_base";

export abstract class Base2ndUsecaseService<T, C, U> extends UsecaseService {
  constructor(private _service: Base2ndAPIService<T>, private _parseModel: (data: T) => T) {
    super();
  }

  async count(root_id: UniqueID, filter?: Record<string, any>): Promise<number> {
    try {
      const query = toCountQuery({ ...filter });
      const data = await this._service.count(root_id, query);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async get(root_id: UniqueID, id: UniqueID): Promise<T> {
    try {
      const data = await this._service.findByID(root_id, id);
      const result = this._parseModel(data);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async list(root_id: UniqueID, filter?: Record<string, any>): Promise<T[]> {
    try {
      const query = toQuery({ ...filter });
      const data = await this._service.find(root_id, query);
      const result = data.map(this._parseModel);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async create(root_id: UniqueID, payload: C): Promise<void> {
    try {
      await this._service.create(root_id, payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async update(root_id: UniqueID, id: UniqueID, payload: U): Promise<void> {
    try {
      await this._service.updateByID(root_id, id, payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async delete(root_id: UniqueID, id: UniqueID): Promise<void> {
    try {
      await this._service.deleteByID(root_id, id);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}