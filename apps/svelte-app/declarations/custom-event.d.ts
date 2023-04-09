declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    'onclick-outside'?: CompositionEventHandler<T>;
  }
}
