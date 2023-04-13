declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    'onclick-outside'?: CompositionEventHandler<T>;
    'onmouse-press'?: CompositionEventHandler<T>;
  }
}
