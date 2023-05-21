import { AxiosError } from "axios";
import { OperationState } from "~/utils";
import { Bloc } from "./supports";

export abstract class BlocService<T> extends Bloc<OperationState<T>> {
    constructor() {
        super(new OperationState<T>("idle"));
    }

    handleError(e: unknown): void {
        const err = e as AxiosError;

        // Unauthorized ignore case
        if (err.response?.status == 401) {
            this.changeState({ status: 'failure', error: Error('Unauthorized') });
            return;
        }

        console.log(err.message);
        this.changeState({ status: 'failure', error: Error('service is not available') });
    }
}
