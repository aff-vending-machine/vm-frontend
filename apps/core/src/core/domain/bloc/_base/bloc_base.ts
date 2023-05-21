import { BlocService } from "./bloc_service";
import { OperationStatus } from "~/utils";
import { BaseUsecaseService } from "../../usecase/_base";

export abstract class BaseBlocService<T, C, U> extends BlocService<T> {
    constructor(private _usecase: BaseUsecaseService<T, C, U>) {
        super();
    }

    async count(filter?: Record<string, any>): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            const data = await this._usecase.count(filter);
            this.changeState({ status: 'success', count: data });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }

    async create(data: C): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            await this._usecase.create(data);
            this.changeState({ status: 'success' });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }

    async get(id: UniqueID): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            const data = await this._usecase.get(id);
            this.changeState({ status: 'success', data });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }

    async list(filter?: Record<string, any>): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            const count = await this._usecase.count(filter);
            if (count == 0) {
                this.updateState({ status: 'success', count });
                return this.state.status
            }

            const list = await this._usecase.list(filter);
            this.changeState({ status: 'success', list, count });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }

    async update(id: UniqueID, payload: any): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            await this._usecase.update(id, payload);
            this.changeState({ status: 'success' });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }

    async delete(id: UniqueID): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            await this._usecase.delete(id);
            this.changeState({ status: 'success' });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }
}