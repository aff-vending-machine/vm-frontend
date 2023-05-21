import { BlocService } from "./bloc_service";
import { OperationStatus } from "~/utils";
import { Base2ndUsecaseService } from "../../usecase/_base";

export abstract class Base2ndBlocService<T, C, U> extends BlocService<T> {
    constructor(private _usecase: Base2ndUsecaseService<T, C, U>) {
        super();
    }

    async count(root_id: UniqueID, filter?: Record<string, any>): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            const data = await this._usecase.count(root_id, filter);
            this.changeState({ status: 'success', count: data });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }

    async create(root_id: UniqueID, data: C): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            await this._usecase.create(root_id, data);
            this.changeState({ status: 'success' });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }

    async get(root_id: UniqueID, id: UniqueID): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            const data = await this._usecase.get(root_id, id);
            this.changeState({ status: 'success', data });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }

    async list(root_id: UniqueID, filter?: Record<string, any>): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            const count = await this._usecase.count(root_id, filter);
            if (count == 0) {
                this.updateState({ status: 'success', count });
                return this.state.status
            }

            const list = await this._usecase.list(root_id, filter);
            this.changeState({ status: 'success', list, count });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }

    async update(root_id: UniqueID, id: UniqueID, payload: any): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            await this._usecase.update(root_id, id, payload);
            this.changeState({ status: 'success' });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }

    async delete(root_id: UniqueID, id: UniqueID): Promise<OperationStatus> {
        try {
            this.changeState({ status: 'loading' });

            await this._usecase.delete(root_id, id);
            this.changeState({ status: 'success' });
        } catch (e: unknown) {
            this.handleError(e);
        }

        return this.state.status
    }
}