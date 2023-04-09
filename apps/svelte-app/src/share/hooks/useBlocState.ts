import type { Bloc } from '@apps/core';
import { onDestroy, onMount } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export const useBlocState = <S>(bloc: Bloc<S>): Writable<S> => {
  const state: Writable<S> = writable(bloc.state);

  const stateSubscription = (newState: S) => {
    state.set(newState);
  };

  onMount(() => {
    bloc.subscribe(stateSubscription);
  });

  onDestroy(() => {
    bloc.unsubscribe(stateSubscription);
  });

  return state;
};