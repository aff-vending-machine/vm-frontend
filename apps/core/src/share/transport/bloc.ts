type Subscription<T> = (state: T) => void;

export abstract class Bloc<T> {
  private internalState: T;
  private listeners: Subscription<T>[] = [];

  constructor(initalState: T) {
    this.internalState = initalState;
  }

  public get state(): T {
    return this.internalState;
  }
  
  updateState(state: T) {
    this.internalState = { ...this.internalState, ...state };

    if (this.listeners.length > 0) {
      this.listeners.forEach(listener => listener(this.state));
    }
  }

  changeState(state: T) {
    this.internalState = state;

    if (this.listeners.length > 0) {
      this.listeners.forEach(listener => listener(this.state));
    }
  }

  subscribe(listener: Subscription<T>) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Subscription<T>) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}