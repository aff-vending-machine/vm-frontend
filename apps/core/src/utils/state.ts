export type OperationStatus = 'idle' | 'loading' | 'success' | 'failure';

export class OperationState<T> {
    status: OperationStatus;
    data?: T;
    list?: T[];
    count?: number;
    error?: Error;

    constructor(status: OperationStatus, data?: T | T[], error?: Error) {
        this.status = status;
        this.error = error;

        if (Array.isArray(data)) {
            this.list = data;
            this.count = data.length;
        } else {
            this.data = data;
        }

    }
}