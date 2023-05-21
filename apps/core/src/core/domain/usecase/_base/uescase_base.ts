import { toCountQuery, toQuery } from "~/utils";
import { UsecaseService } from "./usecase_service";
import { BaseAPIService } from "../../api/_base";

export abstract class BaseUsecaseService<T, C, U> extends UsecaseService {
  constructor(private _service: BaseAPIService<T>, private _parseModel: (data: T) => T) {
    super();
  }

  async count(filter?: Record<string, any>): Promise<number> {
    try {
      const query = toCountQuery({ ...filter });
      const data = await this._service.count(query);

      return Promise.resolve(data);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async get(id: UniqueID): Promise<T> {
    try {
      const data = await this._service.findByID(id);
      const result = this._parseModel(data);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async list(filter?: Record<string, any>): Promise<T[]> {
    try {
      const query = toQuery({ ...filter });
      const data = await this._service.find(query);
      const result = data.map(this._parseModel);

      return Promise.resolve(result);
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async create(payload: C): Promise<void> {
    try {
      await this._service.create(payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async update(id: UniqueID, payload: U): Promise<void> {
    try {
      await this._service.updateByID(id, payload);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }

  async delete(id: UniqueID): Promise<void> {
    try {
      await this._service.deleteByID(id);

      return Promise.resolve();
    } catch (e: unknown) {
      return Promise.reject(e);
    }
  }
}