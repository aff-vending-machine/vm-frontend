export const delayModuleLoad = (module: unknown) =>
  new Promise(res => setTimeout(() => res(module), Math.random() * 1000));
