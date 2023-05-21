import { OperationState } from '@apps/core';

export const stateDerived = function <T>(state: OperationState<T>) {
    return new Promise<OperationState<T>>((resolve, reject) => {
        if (state.status === 'success') {
            resolve(state);
        } else if (state.status === 'failure') {
            reject(state.error);
        }
    })
}
