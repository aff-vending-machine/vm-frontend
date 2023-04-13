export const delayModuleLoad = (module: unknown) => {
  return new Promise(res => setTimeout(() => res(module), getRandomInt(500, 1000)));
}
  
const getRandomInt = (min: number, max: number) => {
  const randomBytes = new Uint32Array(1);
  window.crypto.getRandomValues(randomBytes);
  const randomValue = randomBytes[0] / (0xffffffff + 1); // Normalize to [0, 1]
  return Math.floor(min + randomValue * (max - min + 1));
}