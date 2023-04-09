export { };

declare global {
  type APIProtocol<T> = {
    code: number,
    status: 'done' | 'error',
    data?: T,
    message?: string,
  }
}
